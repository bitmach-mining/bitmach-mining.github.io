/* BitMach 10-Year Master Model — faithful browser port (Core Platform, Layers 1–4).
   Reproduces the audited Excel exactly: at default inputs NPV = R45,538.6m, IRR = 38.5%.
   Chain: Scenario_Control -> Case_Ramp_Annual -> Load_Tariff -> BTC/DR/AI_DC -> Revenue_Bridge -> Financing_DCF. */
(function (global) {
  const YEARS = [2026,2027,2028,2029,2030,2031,2032,2033,2034,2035];

  const RAMP_CASES = {
    full: {
      label: 'Full Platform Acceleration',
      grootvlei:[20,100,200,200,200,200,200,200,200,200],
      amsaVB:[20,350,350,350,350,350,350,350,350,350],
      newcastle:[0,450,450,450,450,450,450,450,450,450],
      saldanha:[0,350,350,350,350,350,350,350,350,350],
      komati:[0,100,650,850,1050,1050,1050,1050,1050,1050]
    },
    institutional: {
      label: 'Institutional Growth',
      grootvlei:[20,80,120,160,200,200,200,200,200,200],
      amsaVB:[20,100,200,280,350,350,350,350,350,350],
      newcastle:[0,0,150,300,450,450,450,450,450,450],
      saldanha:[0,0,0,150,300,350,350,350,350,350],
      komati:[0,20,130,300,500,650,850,950,1050,1050]
    },
    phase1: {
      label: 'Phase 1 Underwriting',
      grootvlei:[10,20,30,40,50,60,70,80,90,100],
      amsaVB:[10,20,40,60,80,100,120,140,160,180],
      newcastle:[0,0,0,50,100,150,200,250,300,350],
      saldanha:[0,0,0,0,50,100,150,200,250,300],
      komati:[0,0,20,40,80,120,180,240,300,400]
    }
  };
  const NEW_SOLAR=[20,230,350,600,200,100,0,0,0,0];
  const HOST_SHARE=[0,0.05,0.10,0.15,0.20,0.25,0.30,0.30,0.30,0.30];
  const RESERVED_L5=[0,0,5,50,100,250,250,250,250,250];
  const BLOCK_SUBSIDY=[3.125,3.125,1.5625,1.5625,1.5625,1.5625,0.78125,0.78125,0.78125,0.78125];

  function defaults() {
    return {
      rampCase:'full', fx:17, discountRate:0.15, terminalMultiple:8, taxRate:0.27,
      btcPriceStart:75000, btcPriceGrowth:0.12, networkHashGrowth:0.12,
      btcFeesInitial:0.15, btcFeeGrowth:0.075,
      uptime:0.98, miningHoursDay:19, essentialHoursDay:24,
      tariff2026:1.2, tariffAfterDR:0.8, tariffStabilised:0.6, tariffOptimised:0.5,
      essentialPremium:0.3, aiResaleTariff:2.5, aiResaleEscalation:0.02, hostingFee:0.75,
      idrStandby:80, ddmpIncentive:3, eventRate:2, eventHours:25,
      minerHashrate:700, minerEfficiency:12.5, auxLoad:0.05,
      miningCapexPerMw:20, electricalCapexPerMw:5, solarCapexPerMw:7, aiHostCapexPerMw:40,
      contingency:0.1, aiHostPartnerShare:0.5,
      debtShare:0.55, equityShare:0.35, partnerShare:0.10,
      debtRate:0.13, debtTenor:7, debtGrace:1, networkHashStart:900000000
    };
  }

  function irrCalc(cf) {
    function npvAt(r){ return cf.reduce((a,c,i)=> a + c/Math.pow(1+r,i), 0); }
    let lo=-0.95, hi=10, flo=npvAt(lo), fhi=npvAt(hi);
    if (flo*fhi>0) return NaN;
    for (let k=0;k<300;k++){ const m=(lo+hi)/2, fm=npvAt(m);
      if (Math.abs(fm)<1e-9) return m;
      if (flo*fm<0){hi=m;fhi=fm;} else {lo=m;flo=fm;} }
    return (lo+hi)/2;
  }

  function compute(inp) {
    const I = Object.assign(defaults(), inp||{});
    const n = YEARS.length;
    const ramp = RAMP_CASES[I.rampCase] || RAMP_CASES.full;

    const closing = YEARS.map((y,i)=> ramp.grootvlei[i]+ramp.amsaVB[i]+ramp.newcastle[i]+ramp.saldanha[i]+ramp.komati[i]);
    const opening = closing.map((v,i)=> i===0?0:closing[i-1]);

    const hostMw = closing.map((mw,i)=> Math.max(0, Math.min(mw*0.3 - RESERVED_L5[i], mw*HOST_SHARE[i])));
    const essentialMw = closing.map((mw,i)=> RESERVED_L5[i]+hostMw[i]);
    const miningMw = closing.map((mw,i)=> Math.max(0, mw - essentialMw[i]));
    const miningGWh = miningMw.map(mw=> mw*I.miningHoursDay*365*I.uptime/1000);
    const hostGWh = hostMw.map(mw=> mw*I.essentialHoursDay*365*I.uptime/1000);

    const intTariff = YEARS.map((y,i)=> i===0?I.tariff2026 : i===1?I.tariffAfterDR : i===2?I.tariffStabilised : I.tariffOptimised);
    const essTariff = intTariff.map(t=> t+I.essentialPremium);
    const aiResale = YEARS.map((y)=> I.aiResaleTariff*Math.pow(1+I.aiResaleEscalation, y-2026));
    const miningPowerCost = miningGWh.map((g,i)=> g*intTariff[i]);
    const hostPowerCost = hostGWh.map((g,i)=> g*essTariff[i]);
    const aiResaleRev = hostGWh.map((g,i)=> g*aiResale[i]);
    const tariffRelief = miningGWh.map((g,i)=> Math.max(0, I.tariff2026 - intTariff[i])*g);

    const btcPrice = YEARS.map((y)=> I.btcPriceStart*Math.pow(1+I.btcPriceGrowth, y-2026));
    const networkHash = YEARS.map((y)=> I.networkHashStart*Math.pow(1+I.networkHashGrowth, y-2026));
    const fees = YEARS.map((y)=> Math.min(1, I.btcFeesInitial + I.btcFeeGrowth*(y-2026)));
    const btcPerBlock = BLOCK_SUBSIDY.map((s,i)=> s*(1+fees[i]));
    const networkBtcYr = btcPerBlock.map(b=> b*144*365);
    const effHash = miningMw.map(mw=> mw/(1+I.auxLoad)*1000000/(I.minerHashrate*I.minerEfficiency)*I.minerHashrate*(I.miningHoursDay/24)*I.uptime);
    const btcMined = effHash.map((h,i)=> networkHash[i]>0 ? h/networkHash[i]*networkBtcYr[i] : 0);
    const btcRevenue = btcMined.map((b,i)=> b*btcPrice[i]*I.fx/1000000);

    const idrRev = miningMw.map(mw=> mw*1000*I.idrStandby*12/1000000);
    const newEligible = miningMw.map((mw,i)=> i===0?Math.max(0,mw):Math.max(0,mw-miningMw[i-1]));
    const ddmpRev = newEligible.map((nm,i)=> i===0 ? nm*I.ddmpIncentive/2 : nm*I.ddmpIncentive/2 + newEligible[i-1]*I.ddmpIncentive/2);
    const eventRev = miningMw.map(mw=> mw*I.eventHours*I.eventRate/1000);
    const drRev = idrRev.map((v,i)=> v+ddmpRev[i]+eventRev[i]);
    const layer3 = YEARS.map((y,i)=> drRev[i]*0.3);

    const hostingRev = hostMw.map(mw=> mw*I.hostingFee*12);
    const hostingOpex = hostingRev.map(v=> v*0.15);

    const revL14 = YEARS.map((y,i)=> btcRevenue[i]+drRev[i]+layer3[i]+aiResaleRev[i]+hostingRev[i]);

    const newMw = closing.map((mw,i)=> i===0?Math.max(0,mw):Math.max(0,mw-closing[i-1]));
    const newMiningMw = miningMw.map((mw,i)=> i===0?Math.max(0,mw):Math.max(0,mw-miningMw[i-1]));
    const newHostMw = hostMw.map((mw,i)=> i===0?Math.max(0,mw):Math.max(0,mw-hostMw[i-1]));
    const miningCapex = newMiningMw.map(mw=> mw*I.miningCapexPerMw);
    const electricalCapex = newMw.map(mw=> mw*I.electricalCapexPerMw);
    const solarCapex = NEW_SOLAR.map(mw=> mw*I.solarCapexPerMw);
    const aiHostCapex = newHostMw.map(mw=> mw*I.aiHostCapexPerMw);
    const grossCapexL14 = YEARS.map((y,i)=> miningCapex[i]+electricalCapex[i]+solarCapex[i]+aiHostCapex[i]);
    let cum=0; const cumCapex = grossCapexL14.map(v=>{cum+=v; return cum*(1+I.contingency);});

    const miningOpex = miningMw.map(mw=> mw*0.4);
    const overhead = YEARS.map((y)=> 100*Math.pow(1.05, y-2026));
    const opexL14 = YEARS.map((y,i)=> miningPowerCost[i]+hostPowerCost[i]+overhead[i]+miningOpex[i]+hostingOpex[i]);
    const ebitda = YEARS.map((y,i)=> revL14[i]-opexL14[i]);
    const unleveredFCF = YEARS.map((y,i)=> ebitda[i]*(1-I.taxRate)-grossCapexL14[i]);
    const terminalValue = ebitda[n-1]*I.terminalMultiple;
    const fcfInclTerminal = unleveredFCF.slice();
    fcfInclTerminal[n-1] = unleveredFCF[n-1] + terminalValue;

    const npv = fcfInclTerminal.reduce((a,cf,i)=> a + cf/Math.pow(1+I.discountRate, i+1), 0);
    const irr = irrCalc(fcfInclTerminal);
    const pvTerminal = I.terminalMultiple*(ebitda[n-1]/Math.pow(1+I.discountRate, YEARS[n-1]-2025));
    const pvExplicit = npv - pvTerminal;
    const terminalPct = npv!==0 ? pvTerminal/npv : 0;
    const grossCapexTotal = grossCapexL14.reduce((a,b)=>a+b,0);
    const moic = grossCapexTotal>0 ? fcfInclTerminal.reduce((a,b)=>a+b,0)/(cumCapex[n-1]) : 0;

    const mix2035 = { btc:btcRevenue[n-1], dr:drRev[n-1]+layer3[n-1], aidc:aiResaleRev[n-1]+hostingRev[n-1], total:revL14[n-1] };
    const capexBridge = {
      mining:miningCapex.reduce((a,b)=>a+b,0),
      electrical:electricalCapex.reduce((a,b)=>a+b,0),
      solar:solarCapex.reduce((a,b)=>a+b,0),
      aihost:aiHostCapex.reduce((a,b)=>a+b,0)
    };
    capexBridge.contingency = cumCapex[n-1] - (capexBridge.mining+capexBridge.electrical+capexBridge.solar+capexBridge.aihost);

    return {
      inputs:I, YEARS, ramp, closing, opening, miningMw, hostMw, essentialMw,
      btcPrice, networkHash, btcMined, btcRevenue, drRev, layer3, aiResaleRev, hostingRev, tariffRelief, intTariff,
      revL14, opexL14, ebitda, grossCapexL14, cumCapex, unleveredFCF, fcfInclTerminal,
      terminalValue, npv, irr, pvTerminal, pvExplicit, terminalPct, moic, mix2035, capexBridge,
      rev2035:revL14[n-1], ebitda2035:ebitda[n-1], capex10y:cumCapex[n-1], peakMw:Math.max.apply(null,closing)
    };
  }

  global.BitMachModel = { compute, defaults, irrCalc, YEARS, RAMP_CASES };
})(typeof window!=='undefined' ? window : globalThis);
