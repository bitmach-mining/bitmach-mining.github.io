/* Content + control definitions for the BitMach interactive model dashboard.
   The live engine lives in model.js (window.BitMachModel). */
window.BITMACH_DASH = {
  meta: {
    asOf: 'May 2026',
    caseName: 'Core Platform Acceleration Case (Layers 1–4)',
    phase1Split: '10 MW Grootvlei + 10 MW AMSA Vanderbijlpark'
  },

  // Control groups. Each control maps to a key on the engine input object.
  // type: 'range' (slider) or 'select'. fmt: how to render the live value.
  controlGroups: [
    {
      title: 'Bitcoin anchor',
      blurb: 'Layer 1. The interruptible mining load that monetises power from day one.',
      controls: [
        { key:'btcPriceStart', label:'BTC price — start', min:40000, max:150000, step:2500, unit:'USD', fmt:'usd0' },
        { key:'btcPriceGrowth', label:'BTC price growth', min:0, max:0.25, step:0.01, fmt:'pct0' },
        { key:'networkHashGrowth', label:'Network hash growth', min:0.05, max:0.30, step:0.01, fmt:'pct0',
          hint:'Higher network growth dilutes BitMach’s share of block rewards.' }
      ]
    },
    {
      title: 'Energy & tariff path',
      blurb: 'The platform’s single biggest value lever. Lower power cost is earned through demand-response proof.',
      controls: [
        { key:'tariff2026', label:'Interruptible tariff — 2026', min:0.5, max:1.6, step:0.05, unit:'R/kWh', fmt:'rkwh' },
        { key:'tariffAfterDR', label:'Tariff after DR proof', min:0.4, max:1.4, step:0.05, unit:'R/kWh', fmt:'rkwh' },
        { key:'tariffStabilised', label:'Stabilised tariff', min:0.4, max:1.2, step:0.05, unit:'R/kWh', fmt:'rkwh' },
        { key:'tariffOptimised', label:'Optimised net tariff (2029+)', min:0.35, max:1.0, step:0.05, unit:'R/kWh', fmt:'rkwh' },
        { key:'uptime', label:'Technical uptime', min:0.85, max:0.99, step:0.01, fmt:'pct0' }
      ]
    },
    {
      title: 'AI / data-centre layer',
      blurb: 'Layer 4. Power resale and hosting on power-secure sites — GPUs are partner-funded, never owned here.',
      controls: [
        { key:'aiResaleTariff', label:'AI/DC resale tariff', min:1.0, max:3.5, step:0.1, unit:'R/kWh', fmt:'rkwh' },
        { key:'hostingFee', label:'Hosting fee', min:0.25, max:1.5, step:0.05, unit:"R'm/MW/mo", fmt:'num2' }
      ]
    },
    {
      title: 'Demand response & grid services',
      blurb: 'Layer 2. Value from presenting controllable, dispatchable load to a constrained grid.',
      controls: [
        { key:'idrStandby', label:'IDR standby payment', min:0, max:150, step:5, unit:'R/kW-mo', fmt:'num0' },
        { key:'eventRate', label:'Event curtailment rate', min:0, max:5, step:0.5, unit:'R/kWh', fmt:'num1' }
      ]
    },
    {
      title: 'Hardware',
      blurb: 'Fleet economics. Efficiency (J/TH) drives both hashrate-per-MW and power draw.',
      controls: [
        { key:'minerEfficiency', label:'Miner efficiency', min:11, max:14, step:0.1, unit:'J/TH', fmt:'num1', invert:true,
          hint:'Lower J/TH is better — more hashrate for the same power.' },
        { key:'miningCapexPerMw', label:'Mining capex', min:12, max:30, step:1, unit:"R'm/MW", fmt:'num0' }
      ]
    },
    {
      title: 'Valuation & funding',
      blurb: 'How the platform’s cash flows are discounted and how the build is financed.',
      controls: [
        { key:'discountRate', label:'Discount rate', min:0.10, max:0.25, step:0.005, fmt:'pct1' },
        { key:'terminalMultiple', label:'Terminal EBITDA multiple', min:4, max:12, step:0.5, unit:'×', fmt:'mult',
          hint:'Applied to 2035 EBITDA. This is the dominant value driver — about four-fifths of NPV.' },
        { key:'fx', label:'FX rate', min:14, max:22, step:0.5, unit:'ZAR/USD', fmt:'num1' },
        { key:'equityShare', label:'Equity share of core capex', min:0.20, max:0.60, step:0.01, fmt:'pct0' },
        { key:'debtRate', label:'Debt interest rate', min:0.08, max:0.18, step:0.005, fmt:'pct1' }
      ]
    }
  ],

  // Presets reproduce the audited scenario set exactly (Sensitivities tab, section B).
  presets: [
    { key:'base',  label:'Base case',
      note:'The audited Core Platform reference case: R1.20/kWh starting tariff stepping to R0.50, BTC +12%/yr, 8× terminal multiple, 15% discount.',
      overrides:{} },
    { key:'upside', label:'Upside',
      note:'Tariff relief earned faster (toward R0.50), stronger Bitcoin, better hardware and a richer AI/DC resale price.',
      overrides:{ btcPriceStart:95000, btcPriceGrowth:0.15, networkHashGrowth:0.10, tariffAfterDR:0.7, tariffStabilised:0.5, tariffOptimised:0.45, aiResaleTariff:2.8, minerEfficiency:12.0, terminalMultiple:9 } },
    { key:'btcbear', label:'BTC bear',
      note:'Bitcoin disappoints: network hash grows +25%/yr while price grows only +5%/yr. Tests reliance on the mining anchor.',
      overrides:{ networkHashGrowth:0.25, btcPriceGrowth:0.05 } },
    { key:'noeskom', label:'No Eskom deal',
      note:'The lender’s case: no agreed demand-response tariff relief — the interruptible tariff stays at R0.80/kWh for the whole horizon.',
      overrides:{ tariffAfterDR:0.8, tariffStabilised:0.8, tariffOptimised:0.8 } },
    { key:'aiunder', label:'AI/DC under-prices',
      note:'AI/DC resale clears at R1.50/kWh instead of R2.50 — tests the AI hosting thesis.',
      overrides:{ aiResaleTariff:1.5 } },
    { key:'rand', label:'Rand strengthens',
      note:'The Rand strengthens to R15/USD, lowering the ZAR value of USD-priced Bitcoin revenue.',
      overrides:{ fx:15 } },
    { key:'combined', label:'Combined downside',
      note:'Several stresses at once: hash +22%, BTC +6%, tariff stuck at R0.80, AI/DC resale R1.80 and DR standby halved. This is where the platform breaks.',
      overrides:{ networkHashGrowth:0.22, btcPriceGrowth:0.06, tariffAfterDR:0.8, tariffStabilised:0.8, tariffOptimised:0.8, aiResaleTariff:1.8, idrStandby:40 } }
  ],

  rampCases: [
    { key:'full', label:'Full acceleration', sub:'2.4 GW by 2030 — fastest milestone-gated path' },
    { key:'institutional', label:'Institutional', sub:'2.4 GW by 2034 — steadier capital cadence' },
    { key:'phase1', label:'Phase 1-led', sub:'1.33 GW by 2035 — conservative, proof-led ramp' }
  ],

  siteLabels: { grootvlei:'Grootvlei', amsaVB:'AMSA Vanderbijlpark', newcastle:'AMSA Newcastle', saldanha:'Saldanha', komati:'Komati / Eskom nodes' },
  siteColors: { grootvlei:'var(--red)', amsaVB:'var(--red-soft)', newcastle:'var(--good)', saldanha:'var(--warn)', komati:'var(--slate)' },

  milestones: [
    { gate:'1', timing:'Q1-26', cap:'20 MW',   unlock:'R0.6bn',  cond:'Phase 1 funded & energised (10 MW Grootvlei + 10 MW AMSA).' },
    { gate:'2', timing:'Q2-26', cap:'160 MW',  unlock:'R3.2bn',  cond:'DR proven to Eskom / NTCSA; tariff path to ≤ R0.80/kWh.' },
    { gate:'3', timing:'Q3–Q4 26', cap:'550 MW', unlock:'R8.8bn', cond:'AMSA / Grootvlei scale; first AI/DC 5 MW contracted.' },
    { gate:'4', timing:'Q1–Q2 27', cap:'1,200 MW', unlock:'R14.0bn', cond:'Additional node; essential-load approvals for AI/DC.' },
    { gate:'5', timing:'Q3–Q4 27', cap:'2,000 MW', unlock:'R20.0bn', cond:'Net tariff ≤ R0.50/kWh; grid-stabilisation value recognised.' },
    { gate:'6', timing:'2028', cap:'2,400 MW', unlock:'R20.0bn', cond:'AI/DC client base ≥ 100 MW (creditworthy offtake).' }
  ],

  // Phase 1 underwriting (audited Phase 1 model — static, this is a separate monthly model)
  phase1: {
    intro:'Phase 1 is the 20 MW proof of execution that unlocks the platform. It is underwritten in a separate monthly model on a deliberately conservative, BTC-only “Debt Case” — demand-response and AI/DC upside switched off.',
    headline:[
      { label:'Peak funding requirement', value:'R535.5m', sub:'Total external funding before cash turns positive' },
      { label:'Unlevered IRR', value:'19.7%', sub:'Incl. continuation value of the proven platform' },
      { label:'Equity IRR', value:'31.5%', sub:'Levered, after the capital stack' },
      { label:'Year-1 EBITDA', value:'R100.7m', sub:'Positive operating contribution from first full year' },
      { label:'36-month BTC mined', value:'426.5 BTC', sub:'Debt Case, optional layers off' },
      { label:'Break-even BTC price', value:'$42,463', sub:'Year-1 operating break-even' }
    ],
    stack:[
      { name:'Sponsor equity', amount:68, label:'R68.0m', terms:'Drawn first · ~US$4m @ R17' },
      { name:'Antalpha (asset-backed)', amount:238, label:'R238.0m', terms:'10% USD · 24-mo bullet · Bitmain collateral' },
      { name:'DMTN Tranche 1', amount:250, label:'R250.0m', terms:'12.25% · 5-yr · converts to equity at IPO' }
    ],
    coverage:'On a standalone BTC-only basis, trailing-12M DSCR dips to ~0.50× in Year 3 as the 2028 halving and rising difficulty compress mining EBITDA. Mitigants are built into the structure: the 24-month Antalpha bullet is refinanced or converted before the thin period, the DMTN equitises at IPO, a ~R27m debt-service reserve is funded at close, and demand-response and tariff-relief upside sit in the Sponsor and Upside cases.'
  },

  docs:[
    { title:'10-year Core Platform model', desc:'The audited master model behind every number on this page — scenario control, revenue bridge, capex, DCF and sensitivities.', href:'assets/docs/BitMach_10Y_Core_Platform_Model_v7.xlsx', cta:'Download model' },
    { title:'Phase 1 underwriting model', desc:'The audited 20 MW monthly model: capital stack, funding waterfall, DSCR and coverage analysis.', href:'assets/docs/BitMach_Phase1_Underwriting_Model_v2.xlsx', cta:'Download model' },
    { title:'Investor memorandum', desc:'Platform narrative, layered revenue stack, risk architecture and deployment pipeline.', href:'assets/docs/BitMach_Investor_Memo_LATEST.pdf', cta:'Open memorandum' },
    { title:'Investor presentation', desc:'Branded overview of contracted access, phased deployment and platform economics.', href:'assets/docs/Bitmach_Investor_Pres_LATEST.pdf', cta:'Open presentation' }
  ],
  modelDownloadUrl:'assets/docs/BitMach_10Y_Core_Platform_Model_v7.xlsx',
  phase1ModelUrl:'assets/docs/BitMach_Phase1_Underwriting_Model_v2.xlsx',
  contactEmail:'carel@bitmachbtc.com'
};
