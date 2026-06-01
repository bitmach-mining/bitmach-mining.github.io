/* BitMach interactive model dashboard controller.
   Every control feeds window.BitMachModel.compute() and the whole page recomputes live. */
(function () {
  const D = window.BITMACH_DASH;
  const M = window.BitMachModel;
  const BASE = M.compute({});          // audited base case, for "vs base" deltas
  const $ = (s, r) => (r||document).querySelector(s);
  const el = (tag, cls, html) => { const n=document.createElement(tag); if(cls) n.className=cls; if(html!=null) n.innerHTML=html; return n; };

  const state = { inputs: {}, preset: 'base', tab: 'valuation' };

  // ---------- formatting ----------
  const fmtRbn = v => (v>=0?'':'−') + 'R' + Math.abs(v/1000).toFixed(1) + 'bn';
  const fmtRm  = v => 'R' + Math.round(v).toLocaleString() + 'm';
  const fmtPct = (v,d=1) => (v*100).toFixed(d) + '%';
  const fmtMw  = v => v>=1000 ? (v/1000).toFixed(2).replace(/\.00$/,'')+' GW' : Math.round(v)+' MW';
  const fmtUsd0= v => '$'+Math.round(v).toLocaleString();
  function fmtControl(v, fmt){
    switch(fmt){
      case 'usd0': return '$'+Math.round(v).toLocaleString();
      case 'pct0': return (v*100).toFixed(0)+'%';
      case 'pct1': return (v*100).toFixed(1)+'%';
      case 'rkwh': return 'R'+v.toFixed(2)+'/kWh';
      case 'mult': return v.toFixed(1).replace(/\.0$/,'')+'×';
      case 'num0': return Math.round(v).toLocaleString();
      case 'num1': return v.toFixed(1);
      case 'num2': return v.toFixed(2);
      default: return String(v);
    }
  }

  // ---------- live model ----------
  function scenario(){ return Object.assign({}, state.inputs); }
  function run(){ return M.compute(scenario()); }

  // ---------- build controls ----------
  function buildControls(){
    const host = $('#controlGroups');
    host.innerHTML = '';
    D.controlGroups.forEach(group => {
      const g = el('div','ctl-group');
      g.appendChild(el('div','ctl-group-title', group.title));
      g.appendChild(el('div','ctl-group-blurb', group.blurb));
      group.controls.forEach(c => {
        const wrap = el('div','ctl');
        const row = el('div','ctl-row');
        row.appendChild(el('label', null, c.label + (c.unit?` <span class="ctl-unit">${c.unit}</span>`:'')));
        const val = el('span','ctl-val'); val.id = 'val_'+c.key;
        row.appendChild(val);
        wrap.appendChild(row);
        const input = el('input','ctl-range');
        input.type='range'; input.id='ctl_'+c.key;
        input.min=c.min; input.max=c.max; input.step=c.step;
        input.addEventListener('input', () => {
          state.inputs[c.key] = parseFloat(input.value);
          state.preset = null;
          render();
        });
        wrap.appendChild(input);
        if (c.hint) wrap.appendChild(el('div','ctl-hint', c.hint));
        g.appendChild(wrap);
      });
      host.appendChild(g);
    });
  }

  function buildPresets(){
    const host = $('#presetRow'); host.innerHTML='';
    D.presets.forEach(p => {
      const b = el('button','preset-btn'+(p.key===state.preset?' active':''), p.label);
      b.addEventListener('click', () => applyPreset(p.key));
      host.appendChild(b);
    });
  }

  function buildRampSelect(){
    const host = $('#rampSelect'); host.innerHTML='';
    D.rampCases.forEach(rc => {
      const b = el('button','ramp-btn'+(rc.key===(state.inputs.rampCase||'full')?' active':''),
        `<strong>${rc.label}</strong><span>${rc.sub}</span>`);
      b.addEventListener('click', () => { state.inputs.rampCase=rc.key; state.preset=state.preset; renderHeroKpis(); renderTab(); });
      host.appendChild(b);
    });
  }

  function applyPreset(key){
    const p = D.presets.find(x=>x.key===key); if(!p) return;
    state.inputs = Object.assign({}, M.defaults(), { rampCase: state.inputs.rampCase||'full' }, p.overrides);
    state.preset = key;
    syncControls();
    render();
  }

  function syncControls(){
    D.controlGroups.forEach(g => g.controls.forEach(c => {
      const input = $('#ctl_'+c.key);
      if (input) input.value = (state.inputs[c.key]!=null ? state.inputs[c.key] : M.defaults()[c.key]);
    }));
  }

  // ---------- hero + kpis ----------
  function renderHero(r){
    $('#heroNpv').textContent = fmtRbn(r.npv);
    $('#heroIrr').textContent = Number.isFinite(r.irr) ? fmtPct(r.irr,1) : 'n/a';
    $('#heroEbitda').textContent = fmtRbn(r.ebitda2035);
    $('#heroMw').textContent = fmtMw(r.peakMw);
    // deltas vs base
    setDelta('#dNpv', r.npv - BASE.npv, fmtRbn);
    setDelta('#dIrr', Number.isFinite(r.irr)? r.irr - BASE.irr : NaN, v=>(v>=0?'+':'−')+fmtPct(Math.abs(v),1));
    setDelta('#dEbitda', r.ebitda2035 - BASE.ebitda2035, fmtRbn);
    setDelta('#dMw', r.peakMw - BASE.peakMw, v=> (v>=0?'+':'−')+fmtMw(Math.abs(v)));
    const badge = $('#scenarioBadge');
    const p = D.presets.find(x=>x.key===state.preset);
    badge.textContent = p ? p.label : 'Custom scenario';
    badge.className = 'scenario-badge'+(state.preset && state.preset!=='base' && state.preset!=='upside' ? ' warn':'');
    $('#presetNote').textContent = p ? p.note : 'You’ve adjusted the controls — every figure on this page reflects your inputs, computed the same way as the downloadable model.';
  }
  function setDelta(sel, v, f){
    const n=$(sel); if(!n) return;
    if (!Number.isFinite(v) || Math.abs(v)<1e-9){ n.textContent='—'; n.className='delta flat'; return; }
    n.textContent = (v>0?'▲ ':'▼ ') + f(v).replace(/^[+−-]/,'');
    n.className = 'delta '+(v>0?'up':'down');
  }

  function renderKpis(r){
    const cards = [
      { label:'NPV / enterprise value', value:fmtRbn(r.npv), sub:`At ${fmtPct(r.inputs.discountRate,1)} discount, ${fmtControl(r.inputs.terminalMultiple,'mult')} terminal` , hi:true },
      { label:'Unlevered IRR', value:Number.isFinite(r.irr)?fmtPct(r.irr,1):'n/a', sub:'Incl. 2035 terminal value' },
      { label:'2035 revenue', value:fmtRbn(r.rev2035), sub:'Layers 1–4, owned GPUs excluded' },
      { label:'2035 EBITDA', value:fmtRbn(r.ebitda2035), sub:`${fmtPct(r.ebitda2035/r.rev2035,0)} EBITDA margin` },
      { label:'10-year core capex', value:fmtRbn(r.capex10y), sub:'Mining, electrical, solar, AI/DC hosting' },
      { label:'Terminal value share', value:fmtPct(r.terminalPct,0), sub:'Of total NPV — the dominant driver' },
      { label:'Gross MoIC', value:r.moic.toFixed(2)+'×', sub:'Unlevered FCF + terminal ÷ capex' },
      { label:'Peak connected load', value:fmtMw(r.peakMw), sub:'Incl. ~250 MW Layer-5 headroom' }
    ];
    $('#kpiGrid').innerHTML = cards.map(c=>`
      <article class="kpi-card ${c.hi?'highlight':''}">
        <div class="label">${c.label}</div>
        <div class="value">${c.value}</div>
        <div class="sub">${c.sub}</div>
      </article>`).join('');
  }

  // ---------- tabs ----------
  const TABS = [
    { key:'valuation', label:'Valuation' },
    { key:'revenue', label:'Revenue & EBITDA' },
    { key:'capacity', label:'Capacity & capex' },
    { key:'phase1', label:'Phase 1 proof' },
    { key:'heatmap', label:'Sensitivity grid' }
  ];
  function buildTabs(){
    const host=$('#tabHeader'); host.innerHTML='';
    TABS.forEach(t=>{
      const b=el('button','tab-btn'+(t.key===state.tab?' active':''), t.label);
      b.addEventListener('click',()=>{ state.tab=t.key; buildTabs(); renderTab(); });
      host.appendChild(b);
    });
  }
  function renderTab(){
    const r=run();
    const host=$('#tabBody');
    if (state.tab==='valuation') host.innerHTML = tabValuation(r);
    else if (state.tab==='revenue') host.innerHTML = tabRevenue(r);
    else if (state.tab==='capacity') { host.innerHTML = tabCapacity(r); buildRampSelect(); }
    else if (state.tab==='phase1') host.innerHTML = tabPhase1(r);
    else if (state.tab==='heatmap') host.innerHTML = tabHeatmap(r);
  }

  // ---- chart helpers (inline SVG/divs, themed) ----
  function hbars(items, opts){
    opts=opts||{};
    const max = opts.max!=null ? opts.max : Math.max.apply(null, items.map(i=>Math.abs(i.value)));
    return `<div class="hbars">${items.map(i=>`
      <div class="hbar-row ${i.active?'active':''}">
        <div class="hbar-key">${i.key}</div>
        <div class="hbar-rail"><div class="hbar-fill ${i.cls||''}" style="width:${max>0?Math.abs(i.value)/max*100:0}%"></div></div>
        <div class="hbar-val">${i.display}</div>
      </div>`).join('')}</div>`;
  }
  function stackedYearBars(r, series){
    // series: [{key, color, get(r,i)}] stacked per year; returns columns chart
    const totals = r.YEARS.map((y,i)=> series.reduce((a,s)=>a+Math.max(0,s.get(r,i)),0));
    const max = Math.max.apply(null, totals)*1.05;
    return `<div class="ybars">${r.YEARS.map((y,i)=>{
      const segs = series.map(s=>{
        const v=Math.max(0,s.get(r,i)); const h=max>0?v/max*100:0;
        return `<div class="ybar-seg" style="height:${h}%;background:${s.color}" title="${s.label}: ${fmtRbn(v)}"></div>`;
      }).join('');
      return `<div class="ybar-col"><div class="ybar-stack">${segs}</div><div class="ybar-x">${String(y).slice(2)}</div></div>`;
    }).join('')}</div>
    <div class="chart-legend">${series.map(s=>`<span class="lg"><span class="sw" style="background:${s.color}"></span>${s.label}</span>`).join('')}</div>`;
  }

  // ---- Valuation tab ----
  function tabValuation(r){
    // NPV waterfall: explicit PV + terminal PV = NPV
    const wf = hbars([
      { key:'PV of cash flows 2026–35', value:r.pvExplicit, display:fmtRbn(r.pvExplicit), cls:'teal' },
      { key:'PV of terminal value', value:r.pvTerminal, display:fmtRbn(r.pvTerminal), cls:'red' },
      { key:'NPV / enterprise value', value:r.npv, display:fmtRbn(r.npv), cls:'silver', active:true }
    ], { max:r.npv*1.02 });

    // live discount-rate ladder
    const drRates=[0.12,0.15,0.18,0.20,0.25];
    const drRuns=drRates.map(dr=>({dr, npv:M.compute(Object.assign({},scenario(),{discountRate:dr})).npv}));
    const drMax=Math.max.apply(null,drRuns.map(x=>x.npv));
    const drBars=hbars(drRuns.map(x=>({
      key:fmtPct(x.dr,0), value:x.npv, display:fmtRbn(x.npv),
      cls: Math.abs(x.dr-r.inputs.discountRate)<1e-9?'red':'', active:Math.abs(x.dr-r.inputs.discountRate)<1e-9
    })),{max:drMax});

    // live terminal-multiple ladder
    const tmM=[5,6,7,8,9,10];
    const tmRuns=tmM.map(m=>({m, npv:M.compute(Object.assign({},scenario(),{terminalMultiple:m})).npv}));
    const tmMax=Math.max.apply(null,tmRuns.map(x=>x.npv));
    const tmBars=hbars(tmRuns.map(x=>({
      key:x.m+'×', value:x.npv, display:fmtRbn(x.npv),
      cls: Math.abs(x.m-r.inputs.terminalMultiple)<1e-9?'red':'', active:Math.abs(x.m-r.inputs.terminalMultiple)<1e-9
    })),{max:tmMax});

    return `
    <div class="grid">
      <section class="panel span-7">
        <h3>How the valuation is built</h3>
        <p class="panel-sub">Enterprise value is the present value of ten years of platform cash flow plus a terminal value on 2035 EBITDA. Both move live as you change the controls.</p>
        ${wf}
        <div class="composition-note">
          <div><span class="dot teal"></span>Explicit cash flow is <strong>${fmtPct(1-r.terminalPct,0)}</strong> of value</div>
          <div><span class="dot red"></span>Terminal value is <strong>${fmtPct(r.terminalPct,0)}</strong> of value</div>
        </div>
        <p class="fine">About four-fifths of NPV sits in the terminal multiple at base case — the single biggest valuation judgement. The ladder on the right lets an investor re-rate it directly.</p>
      </section>
      <section class="panel span-5">
        <h3>NPV vs discount rate <span class="live-pill">live</span></h3>
        <p class="panel-sub">Your current rate is highlighted. Every bar is a full re-run of the model.</p>
        ${drBars}
      </section>
      <section class="panel span-7">
        <h3>The mix that produces ${fmtRbn(r.npv)}</h3>
        <p class="panel-sub">Layers 1–4 only. Owned-GPU inference (Layer 5) is excluded and ring-fenced as a separate SPV option.</p>
        ${revMixBar(r)}
      </section>
      <section class="panel span-5">
        <h3>NPV vs terminal multiple <span class="live-pill">live</span></h3>
        <p class="panel-sub">The dominant driver. Hold this multiple defensible.</p>
        ${tmBars}
      </section>
    </div>`;
  }

  function revMixBar(r){
    const segs=[
      { name:'AI/DC resale + hosting', v:r.mix2035.aidc, c:'var(--red)' },
      { name:'Bitcoin anchor', v:r.mix2035.btc, c:'var(--red-soft)' },
      { name:'DR & grid services', v:r.mix2035.dr, c:'var(--slate)' }
    ];
    const tot=r.mix2035.total;
    return `<div class="mixbar">${segs.map(s=>`<span class="mixseg" style="width:${s.v/tot*100}%;background:${s.c}" title="${s.name}"></span>`).join('')}</div>
    <div class="mixlegend">${segs.map(s=>`<div class="mixrow"><span class="sw" style="background:${s.c}"></span><span>${s.name}</span><strong>${fmtPct(s.v/tot,0)}</strong><em>${fmtRbn(s.v)}</em></div>`).join('')}</div>`;
  }

  // ---- Revenue tab ----
  function tabRevenue(r){
    const series=[
      { key:'btc', label:'BTC anchor', color:'var(--red-soft)', get:(r,i)=>r.btcRevenue[i] },
      { key:'dr', label:'DR + grid services', color:'var(--slate)', get:(r,i)=>r.drRev[i]+r.layer3[i] },
      { key:'aidc', label:'AI/DC resale + hosting', color:'var(--red)', get:(r,i)=>r.aiResaleRev[i]+r.hostingRev[i] }
    ];
    const ebSeries=[{ key:'eb', label:'EBITDA', color:'var(--good)', get:(r,i)=>r.ebitda[i] }];
    return `
    <div class="grid">
      <section class="panel span-7">
        <h3>Revenue by layer, 2026–2035 <span class="live-pill">live</span></h3>
        <p class="panel-sub">The platform diversifies away from a pure Bitcoin position as DR and AI/DC layers come on. Dip around 2032 is the Bitcoin halving.</p>
        ${stackedYearBars(r, series)}
      </section>
      <section class="panel span-5">
        <h3>2035 revenue mix</h3>
        <p class="panel-sub">${fmtRbn(r.rev2035)} total.</p>
        ${revMixBar(r)}
      </section>
      <section class="panel span-7">
        <h3>EBITDA build <span class="live-pill">live</span></h3>
        <p class="panel-sub">Strong operating leverage once capacity is deployed; 2035 EBITDA of ${fmtRbn(r.ebitda2035)} at a ${fmtPct(r.ebitda2035/r.rev2035,0)} margin.</p>
        ${stackedYearBars(r, ebSeries)}
      </section>
      <section class="panel span-5">
        <h3>Bitcoin anchor assumptions</h3>
        ${matrix([
          ['BTC price — start', fmtUsd0(r.inputs.btcPriceStart)],
          ['BTC price — 2035', fmtUsd0(r.btcPrice[9])],
          ['BTC price growth', fmtPct(r.inputs.btcPriceGrowth,0)+' p.a.'],
          ['Network hash growth', fmtPct(r.inputs.networkHashGrowth,0)+' p.a.'],
          ['BTC mined — 2026', Math.round(r.btcMined[0]).toLocaleString()+' BTC'],
          ['BTC mined — 2035', Math.round(r.btcMined[9]).toLocaleString()+' BTC']
        ])}
        <p class="fine">Halvings (2028, 2032) and rising network difficulty are modelled explicitly, partly offset by a growing transaction-fee contribution.</p>
      </section>
    </div>`;
  }

  // ---- Capacity & capex tab ----
  function tabCapacity(r){
    const siteKeys=['grootvlei','amsaVB','newcastle','saldanha','komati'];
    const max=Math.max.apply(null,r.closing)*1.05;
    const ramp=`<div class="ybars wide">${r.YEARS.map((y,i)=>{
      const segs=siteKeys.map(k=>{
        const v=r.ramp[k][i]; const h=max>0?v/max*100:0;
        return v>0?`<div class="ybar-seg" style="height:${h}%;background:${D.siteColors[k]}" title="${D.siteLabels[k]}: ${v} MW"></div>`:'';
      }).join('');
      return `<div class="ybar-col"><div class="ybar-stack">${segs}</div><div class="ybar-x">${String(y).slice(2)}</div></div>`;
    }).join('')}</div>
    <div class="chart-legend">${siteKeys.map(k=>`<span class="lg"><span class="sw" style="background:${D.siteColors[k]}"></span>${D.siteLabels[k]}</span>`).join('')}</div>`;

    const cb=r.capexBridge;
    const capexItems=[
      { key:'Mining infrastructure', value:cb.mining, display:fmtRbn(cb.mining), cls:'red' },
      { key:'AI/DC hosting infrastructure', value:cb.aihost, display:fmtRbn(cb.aihost), cls:'red-soft' },
      { key:'Electrical / site', value:cb.electrical, display:fmtRbn(cb.electrical), cls:'slate' },
      { key:'Solar PV', value:cb.solar, display:fmtRbn(cb.solar), cls:'warn' },
      { key:'Contingency', value:cb.contingency, display:fmtRbn(cb.contingency), cls:'teal' }
    ];

    return `
    <div class="grid">
      <section class="panel span-12">
        <div class="panel-head-row">
          <div><h3>Connected-load ramp by site <span class="live-pill">live</span></h3>
          <p class="panel-sub">Switch the ramp case below to test how fast capacity scales. Each step is milestone-gated, not funded upfront.</p></div>
        </div>
        <div id="rampSelect" class="ramp-select"></div>
        ${ramp}
      </section>
      <section class="panel span-7">
        <h3>10-year capex bridge <span class="live-pill">live</span></h3>
        <p class="panel-sub">${fmtRbn(r.capex10y)} total. Owned GPUs are excluded entirely — AI/DC hosting is power-secure capacity only, partner- or customer-funded.</p>
        ${hbars(capexItems)}
      </section>
      <section class="panel span-5">
        <h3>Milestone-gated capital</h3>
        <div class="milestones">
          ${D.milestones.map(m=>`<div class="ms-row"><span class="ms-gate">${m.gate}</span><div class="ms-body"><div class="ms-top"><strong>${m.cap}</strong><span class="ms-unlock">${m.unlock}</span></div><div class="ms-cond">${m.cond}</div><div class="ms-timing">${m.timing}</div></div></div>`).join('')}
        </div>
      </section>
    </div>`;
  }

  // ---- Phase 1 tab ----
  function tabPhase1(){
    const p=D.phase1;
    const maxAmt=Math.max.apply(null,p.stack.map(s=>s.amount));
    return `
    <div class="grid">
      <section class="panel span-12">
        <h3>Phase 1 — the 20 MW proof of execution <span class="static-pill">audited Phase 1 model</span></h3>
        <p class="panel-sub">${p.intro}</p>
      </section>
      ${p.headline.map(h=>`
        <section class="panel span-4 mini">
          <div class="mini-label">${h.label}</div>
          <div class="mini-value">${h.value}</div>
          <div class="mini-sub">${h.sub}</div>
        </section>`).join('')}
      <section class="panel span-7">
        <h3>Phase 1 capital stack</h3>
        <div class="cap-stack">${p.stack.map(s=>`
          <div class="cap-row">
            <div class="cap-top"><span>${s.name}</span><strong>${s.label}</strong></div>
            <div class="cap-rail"><div class="cap-fill" style="width:${s.amount/maxAmt*100}%"></div></div>
            <div class="cap-terms">${s.terms}</div>
          </div>`).join('')}</div>
        <div class="cap-total">Peak funding requirement <strong>R535.5m</strong> · funded DSRA R27.2m</div>
      </section>
      <section class="panel span-5">
        <h3>Coverage &amp; structure</h3>
        <p class="fine">${p.coverage}</p>
      </section>
    </div>`;
  }

  // ---- Heatmap tab: BTC price growth × interruptible tariff, coloured by NPV ----
  function tabHeatmap(r){
    const growths=[0.04,0.08,0.12,0.16,0.20];
    const tariffs=[0.5,0.6,0.7,0.8,1.0,1.2];
    const cells=tariffs.map(t=> growths.map(g=>{
      const npv=M.compute(Object.assign({},scenario(),{btcPriceGrowth:g, tariffAfterDR:t, tariffStabilised:t, tariffOptimised:t})).npv;
      return npv;
    }));
    const flat=cells.flat(); const lo=Math.min.apply(null,flat), hi=Math.max.apply(null,flat);
    function bg(v){
      if(v<=0) return 'rgba(255,107,107,0.45)';
      const t=(v-Math.max(0,lo))/(hi-Math.max(0,lo)||1);
      return `rgba(45,212,191,${0.10+t*0.45})`;
    }
    const head=`<div class="heat-corner">Tariff ↓ / BTC growth →</div>`+growths.map(g=>`<div class="heat-h">${fmtPct(g,0)}</div>`).join('');
    const rows=tariffs.map((t,ti)=>`<div class="heat-rh">R${t.toFixed(2)}</div>`+growths.map((g,gi)=>{
      const v=cells[ti][gi];
      const cur = Math.abs(g-r.inputs.btcPriceGrowth)<0.001 && Math.abs(t-r.inputs.tariffOptimised)<0.001;
      return `<div class="heat-c ${cur?'cur':''}" style="background:${bg(v)}">${fmtRbn(v)}</div>`;
    }).join('')).join('');
    return `
    <div class="grid">
      <section class="panel span-12">
        <h3>NPV sensitivity — Bitcoin growth × tariff <span class="live-pill">live</span></h3>
        <p class="panel-sub">The two assumptions that matter most, crossed. Each cell is a complete re-run of the model at that pair, holding your other inputs fixed. Greener is higher NPV; red is value-destructive.</p>
        <div class="heatmap" style="grid-template-columns:120px repeat(${growths.length},1fr)">
          ${head}${rows}
        </div>
        <p class="fine">Read it as a stress map: even with the tariff stuck high, a healthy Bitcoin market carries the case — and even with weak Bitcoin, earned tariff relief keeps NPV positive. The platform only breaks when both go against it at once.</p>
      </section>
    </div>`;
  }

  function matrix(rows){
    return `<div class="matrix">${rows.map(([k,v])=>`<div class="mx-row"><div class="mx-k">${k}</div><div class="mx-v">${v}</div></div>`).join('')}</div>`;
  }

  function renderHeroKpis(){ const r=run(); renderHero(r); renderKpis(r); }

  // ---------- master render ----------
  function render(){
    const r=run();
    buildPresets();
    syncControls();
    // live value labels
    D.controlGroups.forEach(g=>g.controls.forEach(c=>{
      const v=$('#val_'+c.key); if(v) v.textContent=fmtControl(state.inputs[c.key]!=null?state.inputs[c.key]:M.defaults()[c.key], c.fmt);
    }));
    renderHero(r);
    renderKpis(r);
    renderTab();
    setLinks();
  }

  function setLinks(){
    ['#dlModelTop','#dlModelSide'].forEach(s=>{const n=$(s); if(n) n.href=D.modelDownloadUrl;});
    const p1=$('#dlPhase1'); if(p1) p1.href=D.phase1ModelUrl;
  }

  function init(){
    state.inputs = Object.assign({}, M.defaults());
    state.preset='base';
    buildControls();
    buildTabs();
    $('#resetBtn').addEventListener('click', ()=>applyPreset('base'));
    const dl=$('#docList'); if(dl) dl.innerHTML=D.docs.map(d=>`
      <a class="doc-card" href="${d.href}" target="_blank" rel="noopener">
        <div class="doc-title">${d.title}</div>
        <div class="doc-desc">${d.desc}</div>
        <span class="doc-cta">${d.cta} →</span>
      </a>`).join('');
    $('#asOf').textContent = D.meta.asOf;
    $('#footMeta').textContent = D.meta.caseName + ' · figures match the downloadable model · for discussion purposes only';
    render();
  }

  if (document.readyState!=='loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
