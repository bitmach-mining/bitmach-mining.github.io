window.bitmachData = {
  asOf: 'May 2026',
  heroPills: [
    '2 GW+ contracted power access',
    '20 MW Phase 1 proof of execution',
    'R45.5bn platform NPV (15%)',
    '38.5% unlevered IRR',
    '2.4 GW connected load by 2035'
  ],
  // Headline Core Platform (Layers 1-4) metrics
  metrics: [
    { label: '2035 connected load', value: '2.4 GW', note: 'Core Platform ramp, incl. ~250 MW reserved for the Layer 5 option' },
    { label: '2035 revenue', value: 'R29.0bn', note: 'Layers 1–4, owned-GPU inference excluded' },
    { label: '2035 EBITDA', value: 'R18.6bn', note: 'Strong operating leverage once capacity is deployed' },
    { label: '10-year core capex', value: 'R85.9bn', note: 'Mining, electrical, solar and AI/DC hosting — no owned GPUs' },
    { label: 'Unlevered IRR', value: '38.5%', note: 'Core Platform, incl. terminal value, 15% discount' },
    { label: 'NPV / enterprise value', value: 'R45.5bn', note: '15% unlevered discount rate' },
    { label: 'Phase 1 deployment', value: '20 MW', note: '10 MW Grootvlei + 10 MW AMSA Vanderbijlpark' },
    { label: 'Contracted access', value: '~2 GW', note: 'Grid-connected industrial power via Eskom and AMSA' }
  ],
  // Five-layer revenue stack
  revenueStack: {
    intro: 'A single power-infrastructure asset that monetises progressively higher-value compute layers over time. Layers 1–4 are underwritten in this case; Layer 5 (owned inference) is held as a separate, optional venture.',
    layers: [
      { n: '1', name: 'Bitcoin mining', source: 'Liquid, interruptible anchor load — monetises the electrons', timing: 'Day one', core: true },
      { n: '2', name: 'Demand response & grid services', source: 'Monetises the flexibility created by interruptible load', timing: 'Early, after proof', core: true },
      { n: '3', name: 'Energy-market & tariff-relief value', source: 'Monetises imbalance and improves constrained-node economics', timing: 'Early to medium term', core: true },
      { n: '4', name: 'AI / data-centre resale & hosting', source: 'Monetises power-secure sites — without BitMach owning GPUs', timing: 'Within the acceleration case', core: true },
      { n: '5', name: 'Owned inference / token / API', source: 'Monetises an infrastructure premium only if the case justifies GPU ownership', timing: 'Later stage — separate SPV', core: false }
    ]
  },
  // Phase 1 capital structure (audited underwriting model)
  phase1: {
    intro: 'Phase 1 is not intended to prove every revenue layer at full maturity. It proves the infrastructure primitives that unlock the platform: connection, commissioning, curtailment telemetry, miner operations, site controls, the Eskom / NTCSA operating interface, and investor-visible operating assets. The Eskom CEO has personally committed to attend the Phase 1 ribbon-cutting at Grootvlei.',
    metrics: [
      { label: 'Peak funding requirement', value: 'R535.5m' },
      { label: 'Sponsor equity', value: 'R68.0m' },
      { label: 'Debt drawn', value: 'R467.5m' },
      { label: 'Unlevered IRR', value: '19.7%' },
      { label: 'Equity IRR', value: '31.5%' },
      { label: '36-month BTC output', value: '426.5 BTC' }
    ],
    stack: [
      { name: 'Sponsor equity', amount: 68, label: 'R68.0m', terms: 'Drawn first; USD ~$4m sponsor commitment' },
      { name: 'Antalpha (asset-backed)', amount: 238, label: 'R238.0m', terms: '10% USD, 24-month bullet, Bitmain hardware collateral' },
      { name: 'DMTN Tranche 1', amount: 250, label: 'R250.0m', terms: '12.25%, 5-year, convertible to equity at IPO' }
    ],
    note: 'Phase 1 carries a funded R27.2m debt-service reserve and first-ranking ASIC security. It is structured around a 24-month Antalpha bullet that is refinanced or converted ahead of the Year-3 Bitcoin-halving thin period, with the DMTN equitising at listing. Phase 1 establishes the operating proof; the platform value sits in the 10-year Core Platform case.'
  },
  // Core Platform 10-year snapshot (from master model)
  platformSnapshot: {
    note: 'The 2027 step-up reflects the milestone-gated ramp to roughly 1.35 GW once Phase 1 proof unlocks scale capital; revenue softens around the 2032 Bitcoin halving before the AI/DC and grid-services layers carry the mix.',
    columns: ['2026', '2027', '2028', '2029', '2035'],
    rows: [
      { metric: 'Connected load', vals: ['40 MW', '1,350 MW', '2,000 MW', '2,200 MW', '2,400 MW'] },
      { metric: 'Core revenue', vals: ['R0.8bn', 'R27.9bn', 'R28.1bn', 'R31.1bn', 'R29.0bn'] },
      { metric: 'Core EBITDA', vals: ['R0.3bn', 'R19.6bn', 'R18.1bn', 'R21.4bn', 'R18.6bn'] },
      { metric: 'Cumulative core capex', vals: ['R1.3bn', 'R40.5bn', 'R63.9bn', 'R75.9bn', 'R85.9bn'] }
    ]
  },
  // 2035 revenue mix (Layers 1-4)
  revenueMix: {
    note: 'Illustrating the intended transition from a merchant Bitcoin position to a diversified, infrastructure-style revenue base. Tariff-relief value is treated as an energy-cost reduction, not a revenue layer.',
    segments: [
      { name: 'AI/DC power resale & hosting', pct: 56, color: 'var(--accent)' },
      { name: 'Bitcoin mining anchor', pct: 36, color: '#ff6b85' },
      { name: 'Demand response & grid services', pct: 8, color: '#b6b7be' }
    ]
  },
  // 10-year capex bridge
  capexBridge: {
    total: 'R85.9bn',
    max: 36.4,
    items: [
      { name: 'Mining infrastructure', value: 36.4, label: 'R36.4bn' },
      { name: 'AI/DC hosting infrastructure', value: 19.2, label: 'R19.2bn' },
      { name: 'Electrical / site infrastructure', value: 12.0, label: 'R12.0bn' },
      { name: 'Solar PV', value: 10.5, label: 'R10.5bn' },
      { name: 'Contingency', value: 7.8, label: 'R7.8bn' }
    ]
  },
  // Milestone-gated capacity ramp
  ramp: {
    max: 2400,
    legend: [
      { name: 'Grootvlei', color: 'var(--site-grootvlei)' },
      { name: 'AMSA Vanderbijlpark', color: 'var(--site-vb)' },
      { name: 'AMSA Newcastle', color: 'var(--site-newcastle)' },
      { name: 'Saldanha', color: 'var(--site-saldanha)' },
      { name: 'Komati / mobile nodes', color: 'var(--site-komati)' }
    ],
    years: [
      { year: '2026', total: 40,   solar: 20,  segments: [20, 20, 0, 0, 0] },
      { year: '2027', total: 1350, solar: 300, segments: [250, 400, 250, 200, 250] },
      { year: '2028', total: 2000, solar: 450, segments: [300, 500, 400, 350, 450] },
      { year: '2029', total: 2200, solar: 520, segments: [320, 550, 450, 380, 500] },
      { year: '2035', total: 2400, solar: 600, segments: [350, 600, 500, 420, 530] }
    ]
  },
  milestones: [
    { tag: 'Phase 1', timing: '0–3 months', capacity: '20 MW', text: '10 MW Grootvlei + 10 MW AMSA commissioned; curtailment telemetry live.' },
    { tag: 'DR proof', timing: '3–6 months', capacity: '160–320 MW', text: 'Eskom / NTCSA response validated; tariff path to ≤ R0.80/kWh.' },
    { tag: 'Node scale', timing: '6–12 months', capacity: '550–700 MW', text: 'Grootvlei and AMSA scale-out, solar integration and operating proof.' },
    { tag: 'AI/DC start', timing: '12–18 months', capacity: '1.0–1.35 GW', text: 'Essential-load framework and first AI/DC customer ≥ 5 MW.' },
    { tag: 'Add. nodes', timing: '18–24 months', capacity: '2.0 GW', text: 'Newcastle, Saldanha and Komati energisation and grid access.' },
    { tag: 'AI/DC base', timing: '24–36 months', capacity: '2.2–2.4 GW', text: 'AI/DC customer base ≥ 100 MW; partner-funded hardware.' }
  ],
  revenueArchitecture: {
    underwritten: {
      title: 'Underwritten in this case',
      intro: 'The Core Platform case underwrites only revenue that can be traced to contracted power and proven, milestone-linked mechanisms.',
      items: [
        'Bitcoin mining from commissioned, interruptible capacity',
        'Demand-response and grid-services value, milestone-linked after proof',
        'Energy-market and tariff-relief value as a staged energy-cost reduction',
        'AI/DC power resale and hosting on power-secure sites — GPUs partner-funded',
        'Contracted access at Grootvlei and AMSA, with brownfield electrical integration'
      ]
    },
    upside: {
      title: 'Strategic upside, not required',
      intro: 'Additional value is visible but intentionally kept outside the core return until the platform has earned the right to pursue it.',
      items: [
        'Layer 5 owned-inference / GPU fleet via a separate, ring-fenced SPV',
        'Deeper tariff-relief recognition below R0.60/kWh as grid value is proven',
        'Replication across further Eskom-linked and industrial nodes',
        'Solar-enabled energy-digital campuses at Vanderbijlpark and Newcastle',
        'HydroHash listing optionality and a public-markets capital pathway'
      ]
    }
  },
  sites: [
    {
      name: 'Eskom Grootvlei Power Station',
      title: 'Phase 1 anchor node — Cooling Tower 5',
      metrics: ['Phase 1: 10 MW', 'Long-run access: 500–800 MW', 'Self-build, sub-minute curtailment'],
      body: 'Grootvlei is the first grid-connected power-station deployment. A self-build, brownfield, dispatchable facility at Cooling Tower 5 — engineered for sub-minute response, ramp-to-zero capability, SCADA integration and Eskom-controlled curtailment. Brownfield infrastructure supports rapid rollout and a credible path to scale without a greenfield transmission allocation.'
    },
    {
      name: 'AMSA Vanderbijlpark',
      title: 'Industrial energy hub with solar blend',
      metrics: ['Phase 1: 10 MW', 'First commercial tranche: ~70 MW', 'Scale pathway: >300 MW'],
      body: 'Vanderbijlpark adds industrial site access, existing substations and a developed solar pathway that materially lowers blended energy cost over time. It is the second leg of the Phase 1 proof and the anchor example of the future solar-enabled energy-digital campus model.'
    },
    {
      name: 'AMSA Newcastle',
      title: 'Future solar-enabled campus',
      metrics: ['Expansion node', 'Solar-enabled energy-digital campus', 'Designed for platform replication'],
      body: 'Newcastle is positioned as a medium-term solar-enabled energy-digital campus able to host substantial future capacity. It matters because the platform roadmap is built around replicable industrial nodes rather than one-off sites.'
    },
    {
      name: 'Additional platform nodes',
      title: 'Next-stage replication',
      metrics: ['Saldanha', 'Komati', 'Mobile curtailment nodes'],
      body: 'The long-range ramp already contemplates additional named nodes and mobile curtailment capacity. These sites extend the model from a proof phase into a broader national energy-digital platform once capital is committed to execution.'
    }
  ],
  // Tariff / energy-cost pathway (the key value lever)
  energyPathway: [
    { title: 'Initial Phase 1', value: 'R1.20/kWh', note: 'Conservative interruptible-load assumption in line with the Eskom pilot range — the starting point for first operating proof.' },
    { title: 'After DR proof', value: 'R0.80/kWh', note: 'Target path once curtailment response is validated and the operating profile improves.' },
    { title: 'Scale case', value: 'R0.60/kWh', note: 'Deeper system-value recognition and multi-node scale lower the blended energy cost further.' },
    { title: 'Advanced grid-stability', value: 'R0.50/kWh', note: 'Net target once the platform materially supports the grid through tariff-relief and balancing value.' }
  ],
  // Valuation context
  valuation: {
    intro: 'Read as an infrastructure-platform case, not a GPU-owning inference case. The 2035 terminal value applies to Core Platform EBITDA only; no value is attributed to owned inference. As with most infrastructure DCFs, value is sensitive to the discount rate, so the range is shown transparently.',
    base: 45.5,
    max: 61.6,
    points: [
      { rate: '12%', npv: 'R61.6bn', value: 61.6 },
      { rate: '15% (base)', npv: 'R45.5bn', value: 45.5, base: true },
      { rate: '20%', npv: 'R27.0bn', value: 27.0 },
      { rate: '25%', npv: 'R15.1bn', value: 15.1 }
    ]
  },
  // Downside scenarios (stress-tested)
  downside: {
    intro: 'The model was re-run on the Core Platform at stressed inputs. The case most relevant to lenders — no binding Eskom demand-response or tariff agreement, with the interruptible tariff held at R0.80/kWh — still produces a positive NPV and a ~29% IRR. The combined-stress case is shown to mark where the platform breaks.',
    rows: [
      { scenario: 'Base case', change: 'As modelled', npv: 'R45.5bn', irr: '38.5%' },
      { scenario: 'No Eskom DR / tariff deal', change: 'Interruptible tariff held at R0.80/kWh', npv: 'R25.7bn', irr: '29.3%' },
      { scenario: 'AI/DC under-prices', change: 'AI/DC resale at R1.50/kWh (vs R2.50)', npv: 'R26.3bn', irr: '29.9%' },
      { scenario: 'BTC bear', change: 'Network hash +25%/yr & BTC price +5%/yr', npv: 'R9.0bn', irr: '20.3%' },
      { scenario: 'Combined downside', change: 'Hash +22%, BTC +6%, tariff R0.80, resale R1.80, DR halved', npv: '−R25.2bn', irr: 'n/a' }
    ]
  },
  timeline: [
    { step: '01', title: 'Capital committed', text: 'Release procurement, EPC scope and site mobilisation.' },
    { step: '02', title: 'Brownfield mobilisation', text: 'Prepare site area, integrate electrical scope and stage deliveries.' },
    { step: '03', title: 'Installation & energisation', text: 'Deploy modular blocks, energise capacity and complete commissioning checks.' },
    { step: '04', title: 'First hash & revenue', text: 'Monetise commissioned power immediately and scale in discrete increments.' }
  ],
  // Risk framework (risk + mitigant)
  riskFramework: [
    { risk: 'Deployment risk', mitigant: 'Phase 1 sized at 20 MW and scaled through milestone gates rather than funded upfront.' },
    { risk: 'Tariff risk', mitigant: 'Initial tariffs treated conservatively; lower-tariff paths require DR proof and Eskom / NTCSA recognition.' },
    { risk: 'BTC market risk', mitigant: 'BTC is the anchor load, but the model progressively diversifies into DR, tariff relief and AI/DC hosting.' },
    { risk: 'AI/DC customer risk', mitigant: 'AI/DC revenue requires customer contracts and essential-load approvals; GPUs are not owned in the core case.' },
    { risk: 'Layer 5 GPU risk', mitigant: 'Owned inference is moved outside core economics and assessed separately via a venture / SPV structure.' },
    { risk: 'Regulatory & grid risk', mitigant: 'Milestone gates require telemetry, grid-interface proof, tariff recognition and site approvals before larger capital release.' }
  ],
  docs: [
    {
      title: '10-year Core Platform model',
      description: 'Audited Core Platform Acceleration model (Layers 1–4): scenario control, revenue bridge, capex bridge, DCF, milestone gates and sensitivities.',
      href: 'assets/docs/BitMach_10Y_Core_Platform_Model_v7.xlsx',
      cta: 'Download model'
    },
    {
      title: 'Phase 1 underwriting model',
      description: 'Audited 36-month 20 MW underwriting model with the full capital stack, funding waterfall, DSCR and coverage analysis.',
      href: 'assets/docs/BitMach_Phase1_Underwriting_Model_v2.xlsx',
      cta: 'Download model'
    },
    {
      title: 'Investor memorandum',
      description: 'High-level infrastructure investment framing, layered revenue stack, risk architecture and deployment pipeline.',
      href: 'assets/docs/BitMach_Investor_Memo_LATEST.pdf',
      cta: 'Open memorandum'
    },
    {
      title: 'Investor presentation',
      description: 'Branded investor presentation covering contracted access, phased deployment and the platform financial highlights.',
      href: 'assets/docs/Bitmach_Investor_Pres_LATEST.pdf',
      cta: 'Open presentation'
    }
  ]
};
