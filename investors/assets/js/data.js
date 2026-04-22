window.bitmachData = {
  heroPills: [
    '500MW+ contracted access',
    '20MW Phase 1',
    '15MW Grootvlei / 5MW AMSA',
    '~12-week commissioning path',
    'Immediate power monetisation'
  ],
  metrics: [
    { label: 'Phase 1 deployment', value: '20 MW', note: 'Current proof-of-execution envelope' },
    { label: 'Base-case site split', value: '15 / 5 MW', note: 'Grootvlei / AMSA Vanderbijlpark' },
    { label: 'Model base capex', value: 'R505.4m', note: 'Current simplified Phase 1 case' },
    { label: 'Peak funding need', value: 'R470.9m', note: 'Maximum external funding before cash turns positive' },
    { label: '36-month BTC output', value: '649.4 BTC', note: 'Base case, optional layers off' },
    { label: 'Implied payback', value: '1.98 yrs', note: 'Model base case' },
    { label: 'Year 1 EBITDA', value: 'R135.9m', note: 'Positive operating contribution in the first year' },
    { label: 'Technical uptime', value: '98%', note: 'Current model operating assumption' }
  ],
  operatingProfile: [
    { label: 'Grootvlei operating window', value: '22 h/day' },
    { label: 'AMSA grid leg', value: '12 h/day' },
    { label: 'AMSA solar leg', value: '9 h/day' },
    { label: 'Phase 1 solar placeholder', value: '10 MW' },
    { label: 'Year 1 Grootvlei tariff', value: 'R1.00/kWh' },
    { label: 'Year 1 AMSA tariff', value: 'R0.90/kWh' }
  ],
  summaryRows: [
    { metric: 'Revenue (ZAR m)', y1: '247.0', y2: '386.5', y3: '402.9' },
    { metric: 'Cash opex (ZAR m)', y1: '111.1', y2: '153.7', y3: '147.5' },
    { metric: 'EBITDA (ZAR m)', y1: '135.9', y2: '232.8', y3: '255.5' },
    { metric: 'Capex (ZAR m)', y1: '505.4', y2: '0.0', y3: '0.0' },
    { metric: 'Unlevered cash flow (ZAR m)', y1: '(369.6)', y2: '232.8', y3: '255.5' }
  ],
  yearCards: [
    { year: 'Year 1', revenue: 'R247.0m', opex: 'R111.1m', ebitda: 'R135.9m', footer: 'Capex: R505.4m | CF: (R369.6m)' },
    { year: 'Year 2', revenue: 'R386.5m', opex: 'R153.7m', ebitda: 'R232.8m', footer: 'Capex: R0.0m | CF: R232.8m' },
    { year: 'Year 3', revenue: 'R402.9m', opex: 'R147.5m', ebitda: 'R255.5m', footer: 'Capex: R0.0m | CF: R255.5m' }
  ],
  revenueArchitecture: {
    underwritten: {
      title: 'Underwritten today',
      intro: 'The current base case focuses on revenue that can be traced directly to commissioned megawatts and contracted energy access.',
      items: [
        'Bitcoin production from commissioned capacity',
        'Contracted site access at Grootvlei and AMSA Vanderbijlpark',
        'Site-specific energy-stack economics with electricity as the primary variable cost',
        'Measured capex deployment and brownfield electrical integration',
        'Real-time operating visibility once capacity is energised'
      ]
    },
    upside: {
      title: 'Layered upside',
      intro: 'Additional value layers are visible, but intentionally kept outside the underwritten case until the core operating base is established.',
      items: [
        'Demand-response and broader grid services monetisation',
        'Solar blending and tariff optimisation over time',
        'Hyperscaler / AI compute tenancy on the same infrastructure',
        'Expansion into AMSA Newcastle, Saldanha and further Eskom-linked nodes',
        'Structured capital layered onto stabilised cashflow-generating assets'
      ]
    }
  },
  ramp: {
    max: 1200,
    legend: [
      { name: 'Grootvlei', color: 'var(--site-grootvlei)' },
      { name: 'AMSA Vanderbijlpark', color: 'var(--site-vb)' },
      { name: 'AMSA Newcastle', color: 'var(--site-newcastle)' },
      { name: 'Saldanha', color: 'var(--site-saldanha)' },
      { name: 'Komati', color: 'var(--site-komati)' }
    ],
    years: [
      { year: '2026', total: 20, solar: 10, segments: [15, 5, 0, 0, 0] },
      { year: '2027', total: 180, solar: 180, segments: [40, 40, 20, 20, 60] },
      { year: '2028', total: 470, solar: 300, segments: [60, 120, 80, 80, 130] },
      { year: '2029', total: 700, solar: 420, segments: [80, 200, 150, 120, 150] },
      { year: '2030', total: 1200, solar: 540, segments: [100, 220, 220, 220, 440] }
    ]
  },
  sites: [
    {
      name: 'Eskom Grootvlei Power Station',
      title: 'Phase 1 anchor node',
      metrics: ['Phase 1: 15MW', 'Long-run access: 500–800MW', 'Base-case operating window: 22h/day'],
      body: 'Grootvlei provides the first grid-connected generation-node deployment in the current Phase 1 case. Brownfield electrical infrastructure supports rapid initial rollout and a credible path to scale without relying on a greenfield transmission allocation.'
    },
    {
      name: 'AMSA Vanderbijlpark',
      title: 'Industrial energy hub with solar blend',
      metrics: ['Phase 1: 5MW', 'Solar: 70MW Year 1 → 180MW in 24 months', 'Year 1 grid leg: R0.90/kWh'],
      body: 'Vanderbijlpark adds industrial site access, existing substations and a pathway to materially lower blended energy cost through solar. It is the second leg of the Phase 1 deployment and a major driver of medium-term margin expansion.'
    },
    {
      name: 'AMSA Newcastle',
      title: 'Future solar-enabled campus',
      metrics: ['Expansion node', 'Solar-enabled energy-digital campus', 'Designed for platform replication'],
      body: 'Newcastle is positioned as a medium-term solar-enabled energy-digital campus with the ability to host substantial future capacity. It is relevant because the platform roadmap is built around replicable industrial nodes rather than one-off sites.'
    },
    {
      name: 'Additional platform nodes',
      title: 'Next-stage replication',
      metrics: ['Saldanha', 'Komati', 'Further Eskom-linked nodes'],
      body: 'The long-range platform ramp already contemplates additional named nodes. These sites extend the model from a proof phase into a broader national energy-digital platform once capital is committed to execution.'
    }
  ],
  energyPathway: [
    {
      title: 'Current contracted economics',
      value: 'R0.90–R1.00/kWh',
      note: 'Current contracted tariff band in the base case. Electricity is the primary return driver.'
    },
    {
      title: 'Solar-blended pathway',
      value: 'R0.65–R0.75/kWh',
      note: 'On-site solar weighted against grid consumption lowers blended energy cost as AMSA solar capacity scales.'
    },
    {
      title: 'Strategic tariff optimisation',
      value: '<R0.60/kWh',
      note: 'Further improvement can come from flexible-demand classification and broader energy-stack optimisation over time.'
    }
  ],
  timeline: [
    { step: '01', title: 'Capital committed', text: 'Release procurement, EPC scope and site mobilisation.' },
    { step: '02', title: 'Brownfield mobilisation', text: 'Prepare site area, integrate electrical scope and stage deliveries.' },
    { step: '03', title: 'Installation & energisation', text: 'Deploy modular blocks, energise capacity and complete commissioning checks.' },
    { step: '04', title: 'First hash & revenue', text: 'Monetise commissioned power immediately and scale in discrete increments.' }
  ],
  defensiblePoints: [
    'Contracted site access takes years and significant capital to replicate.',
    'Brownfield infrastructure reuse shortens deployment time and lowers execution friction.',
    'Scaled industrial connection points create a harder-to-replicate starting position.',
    'Modular deployment allows capital to be phased and performance to be measured site by site.',
    'The platform can separate underwritten revenue from strategic compute optionality.'
  ],
  docs: [
    {
      title: 'Phase 1 simplified model',
      description: 'Current 36-month 20MW underwriting model used for the dashboard base case.',
      href: 'assets/docs/BitMach_Phase1_20MW_Simplified_3Y_Model_2026-04-22.xlsx',
      cta: 'Download model'
    },
    {
      title: 'Investor memorandum',
      description: 'High-level infrastructure investment framing, risk architecture and deployment pipeline.',
      href: 'assets/docs/BitMach_Investor_Memo_LATEST.pdf',
      cta: 'Open memorandum'
    },
    {
      title: 'Investor presentation',
      description: 'Latest branded investor presentation covering contracted access, phased deployment and financial highlights.',
      href: 'assets/docs/Bitmach_Investor_Pres_LATEST.pdf',
      cta: 'Open presentation'
    }
  ]
};
