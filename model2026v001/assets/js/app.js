/* BitMach four-layer narrative — controller.
   The page is organised as a walk through the four revenue layers; each layer carries the slider(s)
   that drive it, inline. Engine (model.js) is validated to reproduce the audited Excel exactly.
   Build-once/update split: sliders are created once; only charts + numbers refresh on input. */
(function () {
  const D = window.BITMACH, M = window.BitMachModel, YEARS = M.YEARS;
  const $ = (s,r)=>(r||document).querySelector(s);
  const E = (t,c,h)=>{ const n=document.createElement(t); if(c)n.className=c; if(h!=null)n.innerHTML=h; return n; };
  const state = { ui:Object.assign({}, D.baseUi), extra:{}, preset:'base' };

  function toEngine(ui, extra){
    const t = ui.longRunTariff;
    return Object.assign({
      rampCase:ui.rampCase||'full', btcPriceGrowth:ui.btcPriceGrowth, networkHashGrowth:ui.networkHashGrowth,
      aiResaleTariff:ui.aiResaleTariff, discountRate:ui.discountRate, terminalMultiple:ui.terminalMultiple, fx:ui.fx,
      tariff2026:1.2, tariffAfterDR:Math.max(0.8,t), tariffStabilised:Math.max(0.6,t), tariffOptimised:t
    }, extra||{});
  }
  function run(){ return M.compute(toEngine(state.ui, state.extra)); }
  const BASE = M.compute(toEngine(D.baseUi, {}));

  // formatting
  const Rbn = v => (v<0?'−':'')+'R'+Math.abs(v/1000).toFixed(1)+'bn';
  const Pct = (v,d=1)=>(v*100).toFixed(d)+'%';
  const Mw  = v => v>=1000 ? (v/1000).toFixed(2).replace(/\.?0+$/,'')+' GW' : Math.round(v)+' MW';
  function fmt(v,f){ return f==='pctpa'?(v*100).toFixed(0)+'% p.a.':f==='pct1'?(v*100).toFixed(1)+'%':f==='rkwh'?'R'+v.toFixed(2)+'/kWh':f==='mult'?v.toFixed(1).replace(/\.0$/,'')+'×':String(v); }

  // ---------------- SVG charts ----------------
  function niceMax(v){ const p=Math.pow(10,Math.floor(Math.log10(v))); const n=v/p; const s=n<=1?1:n<=2?2:n<=2.5?2.5:n<=5?5:10; return s*p; }
  function chart(series, opts){
    opts=opts||{};
    const W=opts.W||820, H=opts.H||300, padL=opts.padL||52, padR=16, padT=16, padB=34;
    const plotW=W-padL-padR, plotH=H-padT-padB, n=YEARS.length;
    const totals=YEARS.map((y,i)=> series.reduce((a,s)=>a+(s.values[i]||0),0));
    const maxY = niceMax(Math.max.apply(null,totals)||1);
    const X=i=> padL+plotW*i/(n-1), Y=v=> padT+plotH-plotH*v/maxY;
    let defs='',grid='',areas='',tops='',ann='';
    for(let k=0;k<=4;k++){ const val=maxY*k/4, yy=Y(val);
      grid+=`<line x1="${padL}" y1="${yy.toFixed(1)}" x2="${W-padR}" y2="${yy.toFixed(1)}" class="cg"/>`;
      grid+=`<text x="${padL-8}" y="${(yy+4).toFixed(1)}" class="cyt">R${(val/1000).toFixed(0)}bn</text>`; }
    let cum=YEARS.map(()=>0);
    series.forEach((s,si)=>{
      const lower=cum.slice(), upper=YEARS.map((_,i)=> cum[i]+(s.values[i]||0)); cum=upper;
      let d='M '+X(0).toFixed(1)+' '+Y(upper[0]).toFixed(1);
      for(let i=1;i<n;i++) d+=' L '+X(i).toFixed(1)+' '+Y(upper[i]).toFixed(1);
      for(let i=n-1;i>=0;i--) d+=' L '+X(i).toFixed(1)+' '+Y(lower[i]).toFixed(1);
      d+=' Z';
      defs+=`<linearGradient id="g${opts.id}_${si}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${s.hex}" stop-opacity="0.9"/><stop offset="100%" stop-color="${s.hex}" stop-opacity="0.4"/></linearGradient>`;
      areas+=`<path d="${d}" fill="url(#g${opts.id}_${si})"/>`;
      let tl='M '+X(0).toFixed(1)+' '+Y(upper[0]).toFixed(1);
      for(let i=1;i<n;i++) tl+=' L '+X(i).toFixed(1)+' '+Y(upper[i]).toFixed(1);
      tops+=`<path d="${tl}" fill="none" stroke="${s.hex}" stroke-width="1.6" opacity="0.95"/>`;
    });
    (opts.annotations||[]).forEach(a=>{ const i=YEARS.indexOf(a.year); if(i<0)return; const xx=X(i);
      ann+=`<line x1="${xx.toFixed(1)}" y1="${padT}" x2="${xx.toFixed(1)}" y2="${padT+plotH}" class="cann"/>`;
      ann+=`<text x="${xx.toFixed(1)}" y="${padT+10}" class="cannt">${a.label}</text>`; });
    let xl=''; YEARS.forEach((y,i)=>{ if(i%2===0||i===n-1) xl+=`<text x="${X(i).toFixed(1)}" y="${H-12}" class="cxt">${y}</text>`; });
    return `<svg viewBox="0 0 ${W} ${H}" class="svgchart" preserveAspectRatio="xMidYMid meet"><defs>${defs}</defs>${grid}${ann}${areas}${tops}${xl}</svg>`;
  }
  function colChart(series, opts){ // stacked columns (for the ramp)
    const W=820,H=300,padL=52,padR=16,padT=14,padB=34,plotW=W-padL-padR,plotH=H-padT-padB,n=YEARS.length;
    const totals=YEARS.map((y,i)=> series.reduce((a,s)=>a+(s.values[i]||0),0));
    const maxY=niceMax(Math.max.apply(null,totals)||1), bw=plotW/n*0.6;
    let svg='';
    for(let k=0;k<=4;k++){ const val=maxY*k/4, yy=padT+plotH-plotH*val/maxY;
      svg+=`<line x1="${padL}" y1="${yy.toFixed(1)}" x2="${W-padR}" y2="${yy.toFixed(1)}" class="cg"/>`;
      svg+=`<text x="${padL-8}" y="${(yy+4).toFixed(1)}" class="cyt">${maxY>=1000?(val/1000).toFixed(1).replace(/\.0$/,'')+'GW':val+'MW'}</text>`; }
    YEARS.forEach((y,i)=>{ const cx=padL+plotW*(i+0.5)/n; let acc=0;
      series.forEach(s=>{ const v=s.values[i]||0; if(v<=0)return; const h=plotH*v/maxY, yt=padT+plotH-plotH*(acc+v)/maxY;
        svg+=`<rect x="${(cx-bw/2).toFixed(1)}" y="${yt.toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(0,h).toFixed(1)}" fill="${s.hex}" rx="1.5"/>`; acc+=v; });
      if(i%2===0||i===n-1) svg+=`<text x="${cx.toFixed(1)}" y="${H-12}" class="cxt">${y}</text>`; });
    return `<svg viewBox="0 0 ${W} ${H}" class="svgchart" preserveAspectRatio="xMidYMid meet">${svg}</svg>`;
  }
  function layerValues(r,id){
    if(id==='l1') return r.btcRevenue.slice();
    if(id==='l2') return r.drRev.slice();
    if(id==='l3') return r.layer3.slice();
    return r.aiResaleRev.map((v,i)=>v+r.hostingRev[i]);
  }
  function bars(items,max){ const m=max!=null?max:Math.max.apply(null,items.map(i=>Math.abs(i.v)));
    return `<div class="bars">${items.map(i=>`<div class="brow${i.on?' on':''}"><div class="bk">${i.k}</div><div class="brail"><div class="bfill" style="width:${m>0?Math.max(0,Math.abs(i.v))/m*100:0}%;background:${i.c||'rgba(255,255,255,0.2)'}"></div></div><div class="bv">${i.d}</div></div>`).join('')}</div>`; }

  // ---------------- sliders (built once) ----------------
  function makeSlider(key){
    const def=D.sliderDefs[key];
    const w=E('div','sld');
    const row=E('div','sld-row'); row.appendChild(E('span','sld-label',def.label));
    const val=E('span','sld-val'); val.id='sv_'+key; row.appendChild(val); w.appendChild(row);
    const inp=E('input','range'); inp.type='range'; inp.id='sr_'+key; inp.min=def.min; inp.max=def.max; inp.step=def.step;
    inp.value=state.ui[key];
    inp.addEventListener('input',()=>{ state.ui[key]=parseFloat(inp.value); state.extra={}; state.preset=null; update(); });
    w.appendChild(inp);
    if(def.hint) w.appendChild(E('div','sld-hint',def.hint));
    return w;
  }
  function refreshSliders(){
    Object.keys(D.sliderDefs).forEach(key=>{
      const inp=$('#sr_'+key); if(inp && document.activeElement!==inp) inp.value=state.ui[key];
      const v=$('#sv_'+key); if(v) v.textContent=fmt(state.ui[key], D.sliderDefs[key].fmt);
    });
  }

  // ---------------- scenario strip (built once) ----------------
  function buildScenario(){
    const host=$('#scenStrip'); host.innerHTML='';
    D.presets.forEach(p=>{ const b=E('button','scen'+(p.key===state.preset?' on':''),p.label); b.onclick=()=>applyPreset(p.key); host.appendChild(b); });
  }
  function applyPreset(key){ const p=D.presets.find(x=>x.key===key); if(!p)return;
    state.ui=Object.assign({}, D.baseUi, p.ui||{}); state.extra=p.extra||{}; state.preset=key; update(); }

  // ---------------- update (no slider rebuild) ----------------
  function update(){
    const r=run();
    // scenario active state + note
    document.querySelectorAll('.scen').forEach((b,i)=> b.classList.toggle('on', D.presets[i].key===state.preset));
    const p=D.presets.find(x=>x.key===state.preset);
    $('#scenNote').textContent = p ? D.scenarioNotes[p.key] : 'Custom scenario — every figure reflects your inputs, computed exactly as the downloadable model does.';
    refreshSliders();

    // hero: headline + stacked chart
    $('#hvVal').textContent=Rbn(r.npv);
    $('#hvIrr').textContent=Number.isFinite(r.irr)&&r.irr>0?Pct(r.irr,1):'n/a';
    $('#hvRev').textContent=Rbn(r.rev2035);
    $('#hvMw').textContent=Mw(r.peakMw);
    const heroSeries=D.layers.map(L=>({hex:L.hex, values:layerValues(r,L.id)}));
    $('#heroChart').innerHTML=chart(heroSeries,{id:'hero',H:340,annotations:[{year:2028,label:'Halving'},{year:2032,label:'Halving'}]});
    $('#heroLegend').innerHTML=D.layers.map(L=>`<span class="lg"><span class="sw" style="background:${L.hex}"></span>${L.tag} · ${L.name}</span>`).join('');

    // four layer chapters: per-layer chart + stats
    D.layers.forEach(L=>{
      const vals=layerValues(r,L.id), v2035=vals[9], share=v2035/r.rev2035, cum=vals.reduce((a,b)=>a+b,0);
      const sc=$('#chart_'+L.id);
      if(sc) sc.innerHTML=chart([{hex:L.hex,values:vals}],{id:L.id,H:230,annotations:L.annotations});
      const st=$('#stats_'+L.id);
      if(st) st.innerHTML=`
        <div class="stat"><div class="stat-v" style="color:${L.hex}">${Rbn(v2035)}</div><div class="stat-l">2035 revenue</div></div>
        <div class="stat"><div class="stat-v">${Pct(share,0)}</div><div class="stat-l">of 2035 mix</div></div>
        <div class="stat"><div class="stat-v">${Rbn(cum)}</div><div class="stat-l">10-yr cumulative</div></div>`;
      if(L.showRelief){ const rel=$('#relief_'+L.id); if(rel) rel.innerHTML=
        `<span class="rel-plus">+</span><div><div class="rel-h">The hidden dividend — tariff relief</div><p>At today’s lever the interruptible tariff settles near <strong>R${r.inputs.tariffOptimised.toFixed(2)}/kWh</strong>, down from R1.20. That relief is not booked as revenue — it lands as margin on every mining megawatt, worth <strong>${Rbn(r.tariffRelief[9])}</strong> in 2035 alone.</p></div>`; }
    });

    // valuation
    $('#vBridge').innerHTML=
      `<div class="vbridge">
        <div class="vb-step"><div class="vb-v">${Rbn(r.rev2035)}</div><div class="vb-l">2035 revenue</div></div>
        <div class="vb-arr">→</div>
        <div class="vb-step"><div class="vb-v">${Rbn(r.ebitda2035)}</div><div class="vb-l">2035 EBITDA · ${Pct(r.ebitda2035/r.rev2035,0)} margin</div></div>
        <div class="vb-arr">→</div>
        <div class="vb-step hi"><div class="vb-v">${Rbn(r.npv)}</div><div class="vb-l">NPV at ${Pct(r.inputs.discountRate,1)}, ${fmt(r.inputs.terminalMultiple,'mult')} exit</div></div>
      </div>`;
    $('#vTransp').innerHTML=
      `<div class="transp"><div class="transp-bar"><span style="width:${(1-r.terminalPct)*100}%;background:#2dd4bf"></span><span style="width:${r.terminalPct*100}%;background:#ff234f"></span></div>
       <div class="transp-leg"><span><span class="dot" style="background:#2dd4bf"></span>Explicit cash flow ${Pct(1-r.terminalPct,0)}</span><span><span class="dot" style="background:#ff234f"></span>Terminal value ${Pct(r.terminalPct,0)}</span></div></div>`;
    const drs=[0.12,0.15,0.18,0.20,0.25];
    $('#vDiscount').innerHTML=bars(drs.map(d=>{ const npv=M.compute(Object.assign(toEngine(state.ui,state.extra),{discountRate:d})).npv;
      return {k:Pct(d,0),v:npv,d:Rbn(npv),on:Math.abs(d-r.inputs.discountRate)<1e-9,c:Math.abs(d-r.inputs.discountRate)<1e-9?'linear-gradient(90deg,#ff234f,#ff6d88)':'rgba(255,255,255,0.18)'}; }), Math.max.apply(null,drs.map(d=>M.compute(Object.assign(toEngine(state.ui,state.extra),{discountRate:d})).npv)));
    const tms=[5,6,7,8,9,10];
    $('#vTerminal').innerHTML=bars(tms.map(m=>{ const npv=M.compute(Object.assign(toEngine(state.ui,state.extra),{terminalMultiple:m})).npv;
      return {k:m+'×',v:npv,d:Rbn(npv),on:Math.abs(m-r.inputs.terminalMultiple)<1e-9,c:Math.abs(m-r.inputs.terminalMultiple)<1e-9?'linear-gradient(90deg,#ff234f,#ff6d88)':'rgba(255,255,255,0.18)'}; }), Math.max.apply(null,tms.map(m=>M.compute(Object.assign(toEngine(state.ui,state.extra),{terminalMultiple:m})).npv)));

    // scale: ramp + capex
    const keys=['grootvlei','amsaVB','newcastle','saldanha','komati'];
    $('#rampChart').innerHTML=colChart(keys.map(k=>({hex:D.siteColors[k],values:r.ramp[k]})),{});
    $('#rampLegend').innerHTML=keys.map(k=>`<span class="lg"><span class="sw" style="background:${D.siteColors[k]}"></span>${D.siteLabels[k]}</span>`).join('');
    const cb=r.capexBridge;
    $('#capexBridge').innerHTML=bars([
      {k:'Mining infrastructure',v:cb.mining,d:Rbn(cb.mining),c:'linear-gradient(90deg,#ff234f,#ff6d88)'},
      {k:'AI/DC hosting',v:cb.aihost,d:Rbn(cb.aihost),c:'linear-gradient(90deg,#f7931a,#ffb454)'},
      {k:'Electrical / site',v:cb.electrical,d:Rbn(cb.electrical),c:'linear-gradient(90deg,#6ea8fe,#9cc3ff)'},
      {k:'Solar PV',v:cb.solar,d:Rbn(cb.solar),c:'linear-gradient(90deg,#2dd4bf,#5fe3d2)'},
      {k:'Contingency',v:cb.contingency,d:Rbn(cb.contingency),c:'rgba(255,255,255,0.22)'}
    ]);
    $('#capexTotal').textContent=Rbn(r.capex10y);
  }

  // ---------------- init (build static DOM once) ----------------
  function init(){
    buildScenario();
    // ramp selector (static)
    const rs=$('#rampSelect');
    D.rampCases.forEach(rc=>{ const b=E('button','ramp'+(rc.key===state.ui.rampCase?' on':''),`<strong>${rc.label}</strong><span>${rc.sub}</span>`);
      b.onclick=()=>{ state.ui.rampCase=rc.key; document.querySelectorAll('.ramp').forEach((x,i)=>x.classList.toggle('on',D.rampCases[i].key===rc.key)); update(); }; rs.appendChild(b); });
    // per-layer slider mounts
    D.layers.forEach(L=>{ const host=$('#ctl_'+L.id); if(host){ L.sliders.forEach(k=> host.appendChild(makeSlider(k))); } });
    // valuation sliders
    const vh=$('#ctl_val'); D.valuationSliders.forEach(k=> vh.appendChild(makeSlider(k)));
    // phase1 (static)
    $('#p1Intro').textContent=D.phase1.intro;
    $('#p1Metrics').innerHTML=D.phase1.metrics.map(m=>`<div class="p1-tile"><div class="p1-l">${m.label}</div><div class="p1-v">${m.value}</div><div class="p1-s">${m.sub}</div></div>`).join('');
    const mx=Math.max.apply(null,D.phase1.stack.map(s=>s.amount));
    $('#p1Stack').innerHTML=D.phase1.stack.map(s=>`<div class="cap-row"><div class="cap-top"><span>${s.name}</span><strong>${s.label}</strong></div><div class="cap-rail"><div class="cap-fill" style="width:${s.amount/mx*100}%"></div></div><div class="cap-terms">${s.terms}</div></div>`).join('');
    $('#p1Coverage').textContent=D.phase1.coverage;
    $('#milestones').innerHTML=D.milestones.map(m=>`<div class="ms"><span class="ms-g">${m.gate}</span><div class="ms-b"><div class="ms-t"><strong>${m.cap}</strong><span>${m.unlock}</span></div><div class="ms-c">${m.cond}</div><div class="ms-time">${m.timing}</div></div></div>`).join('');
    $('#docList').innerHTML=D.docs.map(d=>`<a class="doc-card" href="${d.href}" target="_blank" rel="noopener"><div class="doc-t">${d.title}</div><div class="doc-d">${d.desc}</div><span class="doc-c">${d.cta} →</span></a>`).join('');
    // links + meta
    const a=$('#dlTop'); if(a)a.href=D.modelDownloadUrl; const b2=$('#dlP1'); if(b2)b2.href=D.phase1ModelUrl;
    const rb=$('#resetBtn'); if(rb) rb.onclick=()=>applyPreset('base');
    $('#asOf').textContent=D.meta.asOf;
    $('#footMeta').textContent=D.meta.caseName+' · figures match the downloadable model · for discussion purposes only';
    update();
  }
  if(document.readyState!=='loading') init(); else document.addEventListener('DOMContentLoaded', init);
})();
