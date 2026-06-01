window.BITMACH_DATA = {
  controls: {
    fx: 17,
    openingCash: 0,
    btcPriceStart: 95000,
    btcGrowth: 0.12,
    networkHashStart: 900000000,
    networkHashGrowth: 0.12,
    blockSubsidy: 3.125,
    feeFactor: 0.10,
    blocksPerDay: 144,
    taxRate: 0.27,
    uptime: 0.95,
    generalInflation: 0.05,
    salaryInflation: 0.05,
    gridTariffInflation: 0.05,
    phase1TotalMw: 20,
    amsaShare: 0.50,
    grootvleiHours: 18,
    amsaEskomHours: 10,
    amsaSolarHours: 9,
    amsaSolarMwYear1: 10,
    grootvleiTariff: 1.20,
    amsaTariff: 1.00,
    solarCapexPerMw: 7000,
    solarOmPct: 0.02,
    solarCodMonth: 5,
    minerHashrate: 700,
    minerEfficiency: 12.5,
    minerPriceUsd: 5915,
    auxLoad: 0.05,
    slotsPerContainer: 240,
    containerCostUsd: 350000,
    minerMaintenancePerYear: 2000,
    oceanFreightUsdPerContainer: 8000,
    portClearingPerContainer: 150,
    inlandTruckingPerContainer: 120,
    craneRiggingPerContainer: 100,
    cargoInsurancePct: 0.01,
    importDutyPct: 0.05,
    initialSparesPct: 0.02,
    toolsInitialPerSite: 750,
    officeSetup: 600,
    softwareSetup: 1500,
    legalSetup: 1200,
    staffHardwarePerFte: 35,
    fixedCorporateFte: 6,
    corporateSalaryPerFteYear: 1000,
    siteMgmtFtePerSite: 2,
    siteMgmtSalaryPerFteYear: 700,
    techniciansFtePerMw: 0.35,
    technicianSalaryPerFteYear: 350,
    electriciansFtePerMw: 0.08,
    electricianSalaryPerFteYear: 450,
    benefitsLoad: 0.20,
    travelPctPayroll: 0.06,
    siteMobilizationTravel: 250,
    saasPerFteMonth: 3.5,
    siteSoftwarePerSiteMonth: 40,
    legalRetainerMonth: 75,
    officeRentMonth: 90,
    fileStorageMonth: 25,
    toolsConsumablesPerMwMonth: 8,
    securityInsurancePerSiteMonth: 120,
    otherUtilitiesPerMwMonth: 20,
    drStartMonth: 7,
    drPrice: 0.25,
    drHoursDay: 1.5,
    drPaidUtilisation: 0.5,
    hyperscalerStartMonth: 13,
    hyperscalerMwSold: 2,
    hyperscalerHoursDay: 16,
    hyperscalerPriceUsdMWh: 145,
    annualAiStartYear: 2027,
    annualAiMwShare: 0.10,
    annualAiPriceUsdMWh: 145,
    annualDrPrice: 0.25,
    annualDrHoursDay: 1.5,
    electricalSiteFixedShare: 0.25,
    harmonicMitigationPct: 0.05,
    lightingAllowancePct: 0.01,
    instrumentationAllowancePct: 0.01,
    earthingLightningPct: 0.02,
    civilDrainageFencingPct: 0.03,
    brownfieldSimilarityFactor: 1,
    minerOrderLeadMonths: 2,
    minerDepositPct: 0.6,
    minerVendorFinPct: 0.4,
    minerVendorTenorMonths: 6,
    minerVendorInterestPa: 0.06,
    epcOrderLeadMonths: 2,
    epcDepositPct: 0.15,
    epcProgressPct: 0.35,
    epcInstallPct: 0.30,
    epcCommissionPct: 0.10,
    epcRetentionPct: 0.10,
    epcVendorTenorMonths: 12,
    epcVendorInterestPa: 0.12,
    equityShare: 0.35,
    seniorDebtRatePa: 0.1225,
    seniorDebtTenorMonths: 60,
    seniorDebtGraceMonths: 12,
    seniorDebtArrangementFee: 0.01,
    minCashBuffer: 0,
    containerOrderLeadMonths: 2,
    containerDepositPct: 0.2,
    containerProgressPct: 0.3,
    containerFinalPct: 0.5,
    rampFactor: 1.0,
    includeDR: false,
    includeAI: false,
    comparisonMode: false
  },
  phase1: {
    months: ['Jan-26','Feb-26','Mar-26','Apr-26','May-26','Jun-26','Jul-26','Aug-26','Sep-26','Oct-26','Nov-26','Dec-26'],
    days: [31,28,31,30,31,30,31,31,30,31,30,31],
    grootvleiClose: [0,0,5,10,15,15,15,15,15,15,15,15],
    amsaClose: [0,0,0,0,5,5,5,5,5,5,5,5],
    solarClose: [0,0,0,0,10,10,10,10,10,10,10,10]
  },
  ramp: {
    years: [2026,2027,2028,2029,2030,2031,2032,2033,2034,2035],
    siteCompute: {
      grootvlei: [10,250,300,320,330,335,340,345,348,350],
      amsaVB:    [10,400,500,550,560,570,580,585,595,600],
      newcastle: [0,250,400,450,470,480,485,490,495,500],
      saldanha:  [0,200,350,380,390,405,410,415,418,420],
      komati:    [0,250,450,500,500,510,515,525,524,530]
    },
    siteSolar: {
      amsaVB:    [10,180,250,260,270,280,290,300,300,300],
      newcastle: [0,0,50,90,110,130,140,150,160,170],
      saldanha:  [0,0,0,50,70,90,100,110,120,130],
      komati:    [0,0,0,20,30,40,50,60,70,80]
    }
  },
  siteLabels: {
    grootvlei: 'Grootvlei',
    amsaVB: 'AMSA Vanderbijlpark',
    newcastle: 'AMSA Newcastle',
    saldanha: 'Saldanha',
    komati: 'Komati / mobile'
  },
  electricalBasis: {
    quotedPackages: [7142.5, 1449.2, 358.4, 49215.6998, 204.22016, 28884.25938, 873.42903, 2500],
    quotedLabel: 'T2603-24 Hamar 20 MW Grootvlei electrical EPC summary sheet (25 Mar 2026).'
  },
  tabs: [
    { key: 'overview', label: 'Overview' },
    { key: 'strategy', label: 'Platform' },
    { key: 'phase1', label: 'Phase 1' },
    { key: 'funding', label: 'Funding' },
    { key: 'platform', label: '10Y platform' },
    { key: 'assumptions', label: 'Sensitivity' }
  ],
  presets: {
    bear: {
      label: 'Downside',
      description: 'Lender-style stress: weaker Bitcoin, no agreed Eskom tariff relief, under-priced AI/DC resale and a slower ramp. Mirrors the audited downside drivers.',
      overrides: {
        btcPriceStart: 60000,
        btcGrowth: 0.06,
        networkHashGrowth: 0.22,
        uptime: 0.92,
        grootvleiTariff: 1.20,
        amsaTariff: 1.00,
        minerHashrate: 680,
        minerEfficiency: 13.2,
        minerPriceUsd: 6500,
        solarCapexPerMw: 8000,
        drPrice: 0.18,
        annualAiPriceUsdMWh: 110,
        equityShare: 0.40,
        seniorDebtRatePa: 0.14,
        rampFactor: 0.90,
        includeDR: false,
        includeAI: false
      }
    },
    base: {
      label: 'Base case',
      description: 'Core Platform reference case: 20 MW Phase 1 (10 MW Grootvlei + 10 MW AMSA), conservative R1.20/kWh starting tariff, optional DR and AI/DC layers off by default.',
      overrides: {}
    },
    bull: {
      label: 'Upside',
      description: 'Tariff relief earned (toward R0.60–R0.80/kWh), stronger Bitcoin, improved hardware and the optional DR and AI/DC layers switched on.',
      overrides: {
        btcPriceStart: 110000,
        btcGrowth: 0.15,
        networkHashGrowth: 0.10,
        uptime: 0.97,
        grootvleiTariff: 0.80,
        amsaTariff: 0.60,
        minerHashrate: 720,
        minerEfficiency: 12.0,
        minerPriceUsd: 5600,
        solarCapexPerMw: 6500,
        drPrice: 0.35,
        annualAiPriceUsdMWh: 180,
        equityShare: 0.30,
        seniorDebtRatePa: 0.11,
        rampFactor: 1.10,
        includeDR: true,
        includeAI: true
      }
    }
  },
  metadata: {
    asOf: 'May 2026',
    activeCasePack: 'Core Platform Acceleration Case (Layers 1–4)',
    activePhase1Split: '10 MW Grootvlei / 10 MW AMSA Vanderbijlpark',
    alternativePhase1Split: 'Layer 5 (owned GPU inference) is excluded from the core case and ring-fenced as a separate SPV option.',
    contractsHorizon: 'Milestone-gated rollout from a 20 MW proof to ~2.4 GW across named Eskom and industrial nodes.',
    managementMessage: 'Headline economics are the audited Core Platform (Layers 1–4) outputs. The interactive controls are an independent live explorer for Phase 1 and ramp sensitivities — useful for intuition, not a re-run of the full master model.'
  },
  strategy: {
    meetingRecommendations: [
      'Anchor on the audited Core Platform economics (Layers 1–4); keep Layer 5 owned inference as a separate SPV option.',
      'Lead with the 20 MW Phase 1 proof of execution, then the milestone-gated ramp to ~2.4 GW.',
      'Show the tariff path as the single largest value lever, treated conservatively until DR proof.',
      'Be transparent that most of the platform NPV is the 2035 terminal value at 8× EBITDA — the Sensitivity tab shows the full 5×–10× range.',
      'Let investors test downside, base and upside through the live explorer, separate from the audited headline.'
    ],
    executionSignals: [
      {
        title: 'Initial operating footprint',
        value: '20 MW',
        body: 'Phase 1 is 10 MW at Grootvlei (Cooling Tower 5 self-build) and 10 MW at AMSA Vanderbijlpark, proving deployment and curtailment at both a power-station and an industrial node.'
      },
      {
        title: 'Deployment approach',
        value: 'Brownfield',
        body: 'Existing industrial infrastructure and modular containerised architecture support faster commissioning than a conventional greenfield build.'
      },
      {
        title: 'Scenario discipline',
        value: 'Layers 1–4',
        body: 'Underwritten economics exclude Layer 5 owned GPUs and treat the starting tariff conservatively; upside layers are shown separately.'
      },
      {
        title: 'Scale pathway',
        value: '2.4 GW',
        body: 'A milestone-gated 10-year ramp where each capacity step is released against operating proof rather than funded upfront.'
      }
    ],
    revenueStack: [
      {
        title: 'Underwritten in the core case',
        stage: 'Layers 1–4',
        bullets: [
          'Layer 1 — Bitcoin mining as the day-one interruptible anchor load',
          'Layer 2 — demand response and grid services after Phase 1 proof',
          'Layer 3 — energy-market and tariff-relief value as an energy-cost reduction',
          'Layer 4 — AI/DC power resale and hosting, with GPUs partner-funded'
        ]
      },
      {
        title: 'Strategic upside',
        stage: 'Outside the core case',
        bullets: [
          'Layer 5 — owned inference / GPU fleet via a separate, ring-fenced SPV',
          'Deeper tariff-relief recognition below R0.60/kWh as grid value is proven',
          'Replication across further Eskom-linked and industrial nodes',
          'HydroHash listing optionality and a public-markets capital pathway'
        ]
      }
    ],
    roadmap: [
      {
        phase: 'Phase 1',
        timing: '0–6 months',
        title: 'Proof of execution',
        bullets: [
          '20 MW across Grootvlei (10 MW) and AMSA Vanderbijlpark (10 MW)',
          'Commission, stabilise and validate curtailment telemetry on live infrastructure',
          'Eskom CEO committed to attend the Phase 1 ribbon-cutting at Grootvlei'
        ]
      },
      {
        phase: 'Phase 2',
        timing: '3–12 months',
        title: 'DR proof & node scale',
        bullets: [
          'Validate Eskom / NTCSA response and step the tariff path toward ≤ R0.80/kWh',
          'Scale Grootvlei and AMSA, integrate solar at Vanderbijlpark',
          'First AI/DC essential-load customer ≥ 5 MW'
        ]
      },
      {
        phase: 'Phase 3',
        timing: '12–36 months',
        title: 'Platform build-out',
        bullets: [
          'Energise Newcastle, Saldanha, Komati and mobile curtailment nodes',
          'Ramp to ~2.4 GW with an AI/DC customer base ≥ 100 MW',
          'Evaluate the Layer 5 owned-inference SPV decision'
        ]
      }
    ],
    siteRoadmap: [
      {
        name: 'Grootvlei',
        timing: 'Phase 1 now',
        role: 'Self-build, brownfield, dispatchable facility at Cooling Tower 5 with sub-minute, Eskom-controlled curtailment.',
        chips: ['10 MW Phase 1', 'Long-run 500–800 MW', 'Eskom power-station node']
      },
      {
        name: 'AMSA Vanderbijlpark',
        timing: 'Phase 1 now',
        role: 'Industrial node with a developed solar-blending pathway and the anchor energy-digital campus model.',
        chips: ['10 MW Phase 1', 'First commercial ~70 MW', 'Scale >300 MW']
      },
      {
        name: 'AMSA Newcastle',
        timing: 'Next',
        role: 'Medium-term solar-enabled energy-digital campus designed for platform replication.',
        chips: ['Expansion node', 'Solar-enabled', 'Replicable']
      },
      {
        name: 'Saldanha / Komati / mobile',
        timing: 'Later pipeline',
        role: 'Additional named nodes and mobile curtailment capacity extending the platform nationally.',
        chips: ['Named pipeline', 'Mobile nodes', 'Platform depth']
      }
    ],
    moatBullets: [
      'The scarce asset is access to controllable, grid-connected power — not the ASIC or the GPU.',
      'Brownfield and industrial nodes with existing power infrastructure shorten time-to-commissioning.',
      'Interruptible load is a grid-stabilising asset Eskom can dispatch in seconds, not a grid-draining liability.',
      'The same power platform monetises four revenue layers, diversifying away from a pure Bitcoin position.'
    ],
    capitalLadder: [
      'Phase 1 capital: R68m sponsor equity + R238m Antalpha asset-backed facility + R250m DMTN (IPO-convertible).',
      'Each scale tranche is released only against milestone proof — commissioning, DR validation, customer offtake.',
      'AI/DC hosting capex is gated on contracted essential-load customers; GPUs are partner- or customer-funded.',
      'HydroHash / public-market optionality exists as an acceleration path, not a requirement for the core case.'
    ],
    sourceRegister: [
      { title: '10-year Core Platform model (audited)', date: 'May 2026', use: 'Authoritative source for the headline economics and sensitivity outputs on this page.', href: 'assets/docs/BitMach_10Y_Core_Platform_Model_v7.xlsx' },
      { title: 'Phase 1 underwriting model (audited)', date: 'May 2026', use: 'Capital stack, funding waterfall, DSCR and coverage analysis for the 20 MW proof.', href: 'assets/docs/BitMach_Phase1_Underwriting_Model_v2.xlsx' },
      { title: 'Investor memorandum', date: 'May 2026', use: 'Platform narrative, capital structure and investment proposition.', href: 'assets/docs/BitMach_Investor_Memo_LATEST.pdf' },
      { title: 'Investor presentation', date: 'May 2026', use: 'Platform overview, capital stack and deployment framing.', href: 'assets/docs/Bitmach_Investor_Pres_LATEST.pdf' },
      { title: 'Grootvlei concept design', date: 'Feb 2026', use: 'Phase 1 technical configuration and brownfield integration basis.', href: 'assets/docs/Bitmach_Grootvlei_Concept Design v0.5.pdf' }
    ]
  },
  sourceNotes: ['carel@bitmachbtc.com', 'Headline figures: audited 10-year master model (Core Platform, Layers 1–4)'],
  presentationFrame: {
    phase1CapexUsd: 30000000,
    publishedStructure: 'Phase 1 capital stack: R68m equity + R238m Antalpha (asset-backed) + R250m DMTN (IPO-convertible); peak funding R535.5m.'
  },
  modelDownloadUrl: 'assets/docs/BitMach_10Y_Core_Platform_Model_v7.xlsx',
  phase1ModelUrl: 'assets/docs/BitMach_Phase1_Underwriting_Model_v2.xlsx',
  // ---- AUTHORITATIVE audited Core Platform outputs (static, from the audited master model) ----
  audited: {
    asOf: 'May 2026',
    headline: {
      npv: 'R45.5bn', irr: '38.5%', load2035: '2.4 GW', capex10y: 'R85.9bn',
      rev2035: 'R29.0bn', ebitda2035: 'R18.6bn'
    },
    snapshot: {
      columns: ['2026', '2027', '2028', '2029', '2035'],
      rows: [
        { metric: 'Connected load', vals: ['40 MW', '1,350 MW', '2,000 MW', '2,200 MW', '2,400 MW'] },
        { metric: 'Core revenue', vals: ['R0.8bn', 'R27.9bn', 'R28.1bn', 'R31.1bn', 'R29.0bn'] },
        { metric: 'Core EBITDA', vals: ['R0.3bn', 'R19.6bn', 'R18.1bn', 'R21.4bn', 'R18.6bn'] },
        { metric: 'Cumulative capex', vals: ['R1.3bn', 'R40.5bn', 'R63.9bn', 'R75.9bn', 'R85.9bn'] }
      ]
    },
    revenueMix: [
      { name: 'AI/DC power resale & hosting', pct: 56, color: 'var(--red)' },
      { name: 'Bitcoin mining anchor', pct: 36, color: 'var(--red-soft)' },
      { name: 'Demand response & grid services', pct: 8, color: 'var(--slate)' }
    ],
    capexBridge: {
      total: 'R85.9bn', max: 36.4,
      items: [
        { name: 'Mining infrastructure', value: 36.4, label: 'R36.4bn' },
        { name: 'AI/DC hosting infrastructure', value: 19.2, label: 'R19.2bn' },
        { name: 'Electrical / site', value: 12.0, label: 'R12.0bn' },
        { name: 'Solar PV', value: 10.5, label: 'R10.5bn' },
        { name: 'Contingency', value: 7.8, label: 'R7.8bn' }
      ]
    },
    discountLadder: {
      base: 45.5, max: 61.6,
      points: [
        { rate: '12%', npv: 'R61.6bn', value: 61.6 },
        { rate: '15%', npv: 'R45.5bn', value: 45.5, base: true },
        { rate: '18%', npv: 'R33.4bn', value: 33.4 },
        { rate: '20%', npv: 'R27.0bn', value: 27.0 },
        { rate: '25%', npv: 'R15.1bn', value: 15.1 }
      ]
    },
    terminalMultiple: {
      base: 45.5, max: 54.8,
      points: [
        { mult: '5×', npv: 'R31.7bn', value: 31.7 },
        { mult: '6×', npv: 'R36.3bn', value: 36.3 },
        { mult: '7×', npv: 'R40.9bn', value: 40.9 },
        { mult: '8×', npv: 'R45.5bn', value: 45.5, base: true },
        { mult: '9×', npv: 'R50.1bn', value: 50.1 },
        { mult: '10×', npv: 'R54.8bn', value: 54.8 }
      ]
    },
    valuationComposition: {
      explicit: 8.7, terminal: 36.9, total: 45.5, terminalPct: 80.9,
      note: 'About four-fifths of the R45.5bn NPV is the 2035 terminal value at 8× EBITDA. This is normal for long-life infrastructure, but it is the number a sharp investor will reach for — so it is shown openly here.'
    },
    downside: {
      note: 'Each case is the full Core Platform model re-run at the stated inputs (indicative, not live-linked). The lender-relevant case — interruptible tariff held at R0.80/kWh with no agreed DR deal — still returns a positive NPV and ~29% IRR.',
      rows: [
        { scenario: 'Base case', change: 'As modelled', npv: 'R45.5bn', irr: '38.5%' },
        { scenario: 'No Eskom DR / tariff deal', change: 'Interruptible tariff held at R0.80/kWh', npv: 'R25.7bn', irr: '29.3%' },
        { scenario: 'AI/DC under-prices', change: 'AI/DC resale at R1.50/kWh (vs R2.50)', npv: 'R26.3bn', irr: '29.9%' },
        { scenario: 'Rand strengthens', change: 'FX to R15/USD', npv: 'R37.4bn', irr: '33.6%' },
        { scenario: 'BTC bear', change: 'Network hash +25%/yr & BTC price +5%/yr', npv: 'R9.0bn', irr: '20.3%' },
        { scenario: 'Combined downside', change: 'Hash +22%, BTC +6%, tariff R0.80, resale R1.80, DR halved', npv: '−R25.2bn', irr: 'n/a', stress: true }
      ]
    },
    phase1: {
      metrics: [
        { label: 'Peak funding requirement', value: 'R535.5m' },
        { label: 'Sponsor equity', value: 'R68.0m' },
        { label: 'Debt drawn', value: 'R467.5m' },
        { label: 'Unlevered IRR', value: '19.7%' },
        { label: 'Equity IRR', value: '31.5%' },
        { label: '36-month BTC output', value: '426.5 BTC' },
        { label: 'Break-even BTC price', value: '$42,463' },
        { label: 'Funded DSRA', value: 'R27.2m' }
      ],
      stack: [
        { name: 'Sponsor equity', amount: 68, label: 'R68.0m', terms: 'Drawn first; ~US$4m sponsor commitment' },
        { name: 'Antalpha (asset-backed)', amount: 238, label: 'R238.0m', terms: '10% USD, 24-month bullet, Bitmain hardware collateral' },
        { name: 'DMTN Tranche 1', amount: 250, label: 'R250.0m', terms: '12.25%, 5-year, convertible to equity at IPO' }
      ]
    }
  }
};
