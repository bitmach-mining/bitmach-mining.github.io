/* BitMach — content model organised AROUND the four revenue layers.
   Engine = model.js (window.BitMachModel), validated to reproduce the audited Excel to the rand.
   Design principle: the page IS the four layers. Each layer carries only the slider(s) that drive it. */
window.BITMACH = {
  meta: { asOf:'May 2026', caseName:'Core Platform Acceleration Case · Layers 1–4', contact:'carel@bitmachbtc.com' },

  // the single intro thesis
  thesis: 'BitMach contracts industrial-scale power and earns from it four different ways — on the very same megawatts. Each layer stacks margin on the one before. Here is how all four play out across the next decade, and what they are worth together.',

  /* ---- The four layers. Each owns the levers that move it. ---- */
  layers: [
    {
      id:'l1', tag:'Layer 1', name:'Bitcoin mining anchor', color:'var(--l1)', hex:'#f7931a',
      what:'The interruptible load that turns contracted megawatts into cash from day one.',
      plays:'Mining is live the moment power is energised, so it carries the platform through the early years while the other layers are still being proven. It runs ~19 hours a day and can be shed in seconds — and that flexibility is exactly what makes the load valuable to a constrained grid. Two Bitcoin halvings (2028 and 2032) step the block reward down; rising network difficulty and a growing fee share are modelled explicitly.',
      sliders:['btcPriceGrowth','networkHashGrowth'],
      annotations:[{year:2028,label:'Halving'},{year:2032,label:'Halving'}],
      footnote:'Revenue scales with BitMach’s share of global hashrate, the Bitcoin price and the Rand.'
    },
    {
      id:'l2', tag:'Layer 2', name:'Demand response & grid services', color:'var(--l2)', hex:'#2dd4bf',
      what:'Payments for putting controllable, dispatchable load in front of a grid that needs flexibility.',
      plays:'Once demand-response capability is proven to Eskom and NTCSA, the same flexible mining load earns standby capacity and event payments. But the bigger prize is indirect: as that grid value is recognised, the interruptible tariff is negotiated down from R1.20 toward R0.50/kWh. BitMach does not book that relief as revenue — it lands as margin on every mining megawatt. That tariff advantage, not the chip, is the real moat.',
      sliders:['longRunTariff'],
      annotations:[{year:2026,label:'DR proven'}],
      footnote:'The tariff lever below drives both this layer’s revenue and the hidden tariff-relief dividend.',
      showRelief:true
    },
    {
      id:'l3', tag:'Layer 3', name:'Energy-market & balancing value', color:'var(--l3)', hex:'#6ea8fe',
      what:'Incremental value from participating in energy and balancing markets as they mature.',
      plays:'The same dispatchable capacity that earns standby payments can be offered into energy and balancing markets. It is the smallest of the four layers and deliberately modelled conservatively — upside that compounds quietly on capacity the platform already has, rather than a line the case depends on.',
      sliders:[],
      annotations:[],
      footnote:'Modelled as a fraction of demand-response value — no separate assumption to tune.'
    },
    {
      id:'l4', tag:'Layer 4', name:'AI / data-centre power & hosting', color:'var(--l4)', hex:'#ff234f',
      what:'Reselling power and hosting services to AI and data-centre customers on power-secure sites.',
      plays:'This is the growth engine. As essential-load approvals land and AI/DC customers contract capacity from 2027, power resale and hosting scale to become the largest layer — about 56% of revenue by 2035. Critically, BitMach owns the power, electrical and cooling platform, not the GPUs. The chips are funded by partners and customers; owned inference (Layer 5) is held entirely separately as an optional SPV.',
      sliders:['aiResaleTariff'],
      annotations:[{year:2027,label:'First AI/DC'}],
      footnote:'Power resale plus hosting fees. No GPU capex sits in this case.'
    }
  ],

  /* ---- Slider definitions (only the levers that genuinely move the model) ---- */
  sliderDefs:{
    btcPriceGrowth:    { label:'BTC price growth',          min:0,    max:0.20, step:0.01,  fmt:'pctpa', hint:'Long-run annual Bitcoin price growth.' },
    networkHashGrowth: { label:'Network difficulty growth', min:0.05, max:0.30, step:0.01,  fmt:'pctpa', hint:'Faster network growth dilutes BitMach’s share of rewards.' },
    longRunTariff:     { label:'Long-run power tariff',      min:0.50, max:1.20, step:0.05,  fmt:'rkwh',  hint:'The tariff BitMach negotiates down to. R0.50 = full relief · R0.80 = no Eskom deal · R1.20 = none.' },
    aiResaleTariff:    { label:'AI/DC resale price',         min:1.50, max:3.00, step:0.10,  fmt:'rkwh',  hint:'Price charged to AI / data-centre customers for power.' },
    discountRate:      { label:'Discount rate',              min:0.10, max:0.25, step:0.005, fmt:'pct1',  hint:'Rate used to discount future cash flows.' },
    terminalMultiple:  { label:'Terminal EBITDA multiple',   min:5,    max:10,   step:0.5,   fmt:'mult',  hint:'Applied to 2035 EBITDA — the dominant value driver.' }
  },
  valuationSliders:['discountRate','terminalMultiple'],

  baseUi:{ btcPriceGrowth:0.12, networkHashGrowth:0.12, longRunTariff:0.50, aiResaleTariff:2.5, discountRate:0.15, terminalMultiple:8, fx:17, rampCase:'full' },

  /* ---- Scenarios (reproduce the audited downside set to the rand) ---- */
  presets:[
    { key:'base',     label:'Base case',        ui:{} },
    { key:'bull',     label:'Bull',             ui:{ btcPriceGrowth:0.15, networkHashGrowth:0.10, aiResaleTariff:2.7, terminalMultiple:8.5 } },
    { key:'btcbear',  label:'BTC bear',         ui:{ networkHashGrowth:0.25, btcPriceGrowth:0.05 } },
    { key:'noeskom',  label:'No Eskom deal',    ui:{ longRunTariff:0.80 } },
    { key:'combined', label:'Combined downside',ui:{ networkHashGrowth:0.22, btcPriceGrowth:0.06, longRunTariff:0.80, aiResaleTariff:1.80 }, extra:{ idrStandby:40 } }
  ],
  scenarioNotes:{
    base:'The audited reference case.',
    bull:'Stronger Bitcoin, a richer AI/DC price and a slightly higher exit — attractive but within the deal as structured.',
    btcbear:'Bitcoin disappoints: difficulty +25%/yr against +5%/yr price.',
    noeskom:'The lender’s stress — no tariff relief; mining power stays at R0.80/kWh throughout.',
    combined:'Weak Bitcoin, no tariff deal, AI/DC under-pricing and halved standby payments — where the platform stops creating value.'
  },

  rampCases:[
    { key:'full', label:'Full acceleration', sub:'2.4 GW by 2030' },
    { key:'institutional', label:'Institutional', sub:'2.4 GW by 2034' },
    { key:'phase1', label:'Phase 1-led', sub:'1.33 GW by 2035' }
  ],
  siteLabels:{ grootvlei:'Grootvlei', amsaVB:'AMSA Vanderbijlpark', newcastle:'AMSA Newcastle', saldanha:'Saldanha', komati:'Komati / Eskom nodes' },
  siteColors:{ grootvlei:'#ff234f', amsaVB:'#f7931a', newcastle:'#2dd4bf', saldanha:'#6ea8fe', komati:'#8090a3' },

  milestones:[
    { gate:'1', timing:'Q1-26', cap:'20 MW', unlock:'R0.6bn', cond:'Phase 1 funded & energised.' },
    { gate:'2', timing:'Q2-26', cap:'160 MW', unlock:'R3.2bn', cond:'DR proven; tariff path to ≤ R0.80/kWh.' },
    { gate:'3', timing:'Q3–Q4 26', cap:'550 MW', unlock:'R8.8bn', cond:'AMSA/Grootvlei scale; first AI/DC 5 MW.' },
    { gate:'4', timing:'Q1–Q2 27', cap:'1,200 MW', unlock:'R14.0bn', cond:'Essential-load approvals for AI/DC.' },
    { gate:'5', timing:'Q3–Q4 27', cap:'2,000 MW', unlock:'R20.0bn', cond:'Net tariff ≤ R0.50/kWh recognised.' },
    { gate:'6', timing:'2028', cap:'2,400 MW', unlock:'R20.0bn', cond:'AI/DC client base ≥ 100 MW.' }
  ],

  phase1:{
    intro:'Before any scale capital is released, the initial 20 MW is underwritten on its own — deliberately conservative, Bitcoin-only, with demand-response and AI/DC upside switched off. This is that case, from the audited Phase 1 model.',
    metrics:[
      { label:'Peak funding', value:'R535.5m', sub:'External funding before cash turns positive' },
      { label:'Unlevered IRR', value:'19.7%', sub:'Incl. continuation value' },
      { label:'Equity IRR', value:'31.5%', sub:'Levered, after the stack' },
      { label:'Year-1 EBITDA', value:'R100.7m', sub:'From the first full year' },
      { label:'36-mo BTC mined', value:'426.5 BTC', sub:'Bitcoin-only Debt Case' },
      { label:'Break-even BTC', value:'$42,463', sub:'Year-1 operating' }
    ],
    stack:[
      { name:'Sponsor equity', amount:68, label:'R68.0m', terms:'Drawn first · ~US$4m @ R17' },
      { name:'Antalpha (asset-backed)', amount:238, label:'R238.0m', terms:'10% USD · 24-mo bullet · Bitmain collateral' },
      { name:'DMTN Tranche 1', amount:250, label:'R250.0m', terms:'12.25% · 5-yr · converts at IPO' }
    ],
    coverage:'On a standalone Bitcoin-only basis, trailing-12-month DSCR dips to ~0.50× in Year 3 as the 2028 halving and rising difficulty compress mining EBITDA. The structure carries this: the 24-month Antalpha bullet is refinanced or converted before the thin period, the DMTN equitises at IPO, a ~R27m debt-service reserve is funded at close, and demand-response and tariff-relief upside sit in reserve.'
  },

  docs:[
    { title:'10-year Core Platform model', desc:'The audited master model behind every number here.', href:'assets/docs/BitMach_10Y_Core_Platform_Model_v7.xlsx', cta:'Download model' },
    { title:'Phase 1 underwriting model', desc:'The audited 20 MW monthly model: stack, waterfall, DSCR.', href:'assets/docs/BitMach_Phase1_Underwriting_Model_v2.xlsx', cta:'Download model' },
    { title:'Investor memorandum', desc:'Platform narrative and risk architecture.', href:'assets/docs/BitMach_Investor_Memo_LATEST.pdf', cta:'Open memorandum' },
    { title:'Investor presentation', desc:'Branded overview of access, deployment and economics.', href:'assets/docs/Bitmach_Investor_Pres_LATEST.pdf', cta:'Open presentation' }
  ],
  modelDownloadUrl:'assets/docs/BitMach_10Y_Core_Platform_Model_v7.xlsx',
  phase1ModelUrl:'assets/docs/BitMach_Phase1_Underwriting_Model_v2.xlsx'
};
