window.BITMACH_DATA = {
  controls: {
    fx: 17,
    openingCash: 0,
    btcPriceStart: 75000,
    btcGrowth: 0.10,
    networkHashStart: 900000000,
    networkHashGrowth: 0.15,
    blockSubsidy: 3.125,
    feeFactor: 0.10,
    blocksPerDay: 144,
    taxRate: 0.27,
    uptime: 0.95,
    generalInflation: 0.05,
    salaryInflation: 0.05,
    gridTariffInflation: 0.05,
    phase1TotalMw: 20,
    amsaShare: 0.25,
    grootvleiHours: 18,
    amsaEskomHours: 10,
    amsaSolarHours: 9,
    amsaSolarMwYear1: 10,
    grootvleiTariff: 1.00,
    amsaTariff: 0.90,
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
    hyperscalerPriceUsdMWh: 130,
    annualAiStartYear: 2027,
    annualAiMwShare: 0.10,
    annualAiPriceUsdMWh: 130,
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
    seniorDebtRatePa: 0.13,
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
    amsaClose: [0,0,0,0,0,5,5,5,5,5,5,5],
    solarClose: [0,0,0,0,10,10,10,10,10,10,10,10]
  },
  ramp: {
    years: [2026,2027,2028,2029,2030,2031,2032,2033,2034,2035],
    siteCompute: {
      grootvlei: [15,40,60,80,100,120,140,160,180,200],
      amsaVB: [5,40,120,200,220,230,240,250,250,250],
      newcastle: [0,20,80,150,220,300,360,430,500,500],
      saldanha: [0,20,80,120,220,300,360,430,500,500],
      komati: [0,60,130,150,440,450,500,530,570,550]
    },
    siteSolar: {
      amsaVB: [10,180,250,250,250,250,250,250,250,250],
      newcastle: [0,0,50,100,150,200,250,250,250,250],
      saldanha: [0,0,0,50,100,150,200,250,250,250],
      komati: [0,0,0,20,40,60,80,100,120,150]
    }
  },
  siteLabels: {
    grootvlei: 'Grootvlei',
    amsaVB: 'AMSA Vanderbijlpark',
    newcastle: 'AMSA Newcastle',
    saldanha: 'Saldanha',
    komati: 'Komati'
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
      description: 'Lower BTC, higher tariffs, slower network economics and no optional upside.',
      overrides: {
        btcPriceStart: 60000,
        btcGrowth: 0.05,
        networkHashGrowth: 0.20,
        uptime: 0.92,
        grootvleiTariff: 1.10,
        amsaTariff: 1.00,
        minerHashrate: 680,
        minerEfficiency: 13.2,
        minerPriceUsd: 6500,
        solarCapexPerMw: 8000,
        drPrice: 0.20,
        annualAiPriceUsdMWh: 120,
        equityShare: 0.40,
        seniorDebtRatePa: 0.14,
        rampFactor: 0.85,
        includeDR: false,
        includeAI: false
      }
    },
    base: {
      label: 'Base case',
      description: 'Underwritten Phase 1 reference case with optional demand-response and AI / HPC layers switched off by default.',
      overrides: {}
    },
    bull: {
      label: 'Upside',
      description: 'Higher BTC, improved energy economics, stronger hardware performance and optional expansion layers switched on.',
      overrides: {
        btcPriceStart: 95000,
        btcGrowth: 0.15,
        networkHashGrowth: 0.10,
        uptime: 0.97,
        grootvleiTariff: 0.90,
        amsaTariff: 0.80,
        minerHashrate: 720,
        minerEfficiency: 12.0,
        minerPriceUsd: 5600,
        solarCapexPerMw: 6500,
        drPrice: 0.35,
        annualAiPriceUsdMWh: 150,
        equityShare: 0.30,
        seniorDebtRatePa: 0.11,
        rampFactor: 1.10,
        includeDR: true,
        includeAI: true
      }
    }
  },
  metadata: {
    asOf: '22 Apr 2026',
    activeCasePack: 'Investor base case',
    activePhase1Split: '15 MW Grootvlei / 5 MW AMSA Vanderbijlpark',
    alternativePhase1Split: 'Alternative planning case: 10 MW Grootvlei / 10 MW AMSA Vanderbijlpark.',
    contractsHorizon: 'Phased rollout across multiple industrial and brownfield nodes.',
    managementMessage: 'Base-case economics are anchored to Phase 1 contracted energy access and modular brownfield deployment, with additional revenue layers shown separately as expansion upside.'
  },
  strategy: {
    meetingRecommendations: [
      'Lead with Phase 1 underwritten economics and keep optional upside clearly separated.',
      'Show site-by-site deployment logic, named nodes and modular scale rather than a single abstract ramp.',
      'Highlight energy cost, capex cadence, funding need, payback and return sensitivity in one place.',
      'Allow investors to test downside, base and upside cases through transparent scenario controls.',
      'Present the platform as energy-linked digital infrastructure with Bitcoin as the first compute layer.'
    ],
    executionSignals: [
      {
        title: 'Initial operating footprint',
        value: '20 MW',
        body: 'Base case begins with 15 MW at Grootvlei and 5 MW at AMSA Vanderbijlpark, with AMSA solar introduced in year one.'
      },
      {
        title: 'Deployment approach',
        value: 'Brownfield, modular',
        body: 'Existing industrial infrastructure and modular containerised architecture support faster commissioning than a conventional greenfield build.'
      },
      {
        title: 'Scenario discipline',
        value: 'Base case first',
        body: 'Underwritten economics are shown without demand-response or AI / HPC revenue unless the user elects to switch those layers on.'
      },
      {
        title: 'Scale pathway',
        value: '10-year ramp',
        body: 'The long-range model allows investors to test how value changes as compute capacity expands across additional named nodes.'
      }
    ],
    revenueStack: [
      {
        title: 'Underwritten today',
        stage: 'Base case',
        bullets: [
          'Bitcoin production as the Phase 1 anchor revenue stream',
          'Site-specific energy economics at Grootvlei and AMSA',
          'Optional layers remain off by default in the underwritten case'
        ]
      },
      {
        title: 'Operational optimisation',
        stage: 'Operating enhancement',
        bullets: [
          'Demand-response and grid-stabilisation value',
          'Tariff optimisation via flexibility recognition',
          'AMSA solar blending reducing effective energy cost'
        ]
      },
      {
        title: 'Strategic upside',
        stage: 'Expansion layers',
        bullets: [
          'AI / HPC conversion on selected platform capacity',
          'Additional flexibility value as market structures evolve',
          'Nasdaq / GEM optionality and larger public-market capital'
        ]
      }
    ],
    roadmap: [
      {
        phase: 'Phase 1',
        timing: '0–12 months',
        title: 'Proof of execution',
        bullets: [
          '20 MW initial deployment anchored by Grootvlei and AMSA Vanderbijlpark',
          'Commission, stabilise and validate operating economics on live infrastructure',
          'Generate immediate Bitcoin revenue and establish funding proof points'
        ]
      },
      {
        phase: 'Phase 2',
        timing: '6–24 months',
        title: 'Scale-up',
        bullets: [
          'Expand proven Grootvlei and AMSA sites',
          'Add solar blending and operational optimisation where commercial terms support it',
          'Use operating track record to support additional capital formation'
        ]
      },
      {
        phase: 'Phase 3',
        timing: '24+ months',
        title: 'Platform build-out',
        bullets: [
          'Extend the node footprint across additional industrial and brownfield sites',
          '500 MW to 2 GW national platform ambition',
          'Layer higher-value compute workloads over the same underlying energy infrastructure'
        ]
      }
    ],
    siteRoadmap: [
      {
        name: 'Grootvlei',
        timing: 'Now',
        role: 'Brownfield power-station node and base-case anchor site.',
        chips: ['15 MW base case', 'Phase 1 anchor', 'Eskom brownfield node']
      },
      {
        name: 'AMSA Vanderbijlpark',
        timing: 'Now',
        role: 'Industrial node supporting Phase 1 compute capacity with a solar-blending pathway.',
        chips: ['5 MW base case', '10 MW solar year 1', 'Industrial node']
      },
      {
        name: 'AMSA Newcastle',
        timing: 'Next',
        role: 'Follow-on industrial expansion node for medium-term scale-up.',
        chips: ['Follow-on node', 'Substation infrastructure', 'Expansion optionality']
      },
      {
        name: 'Saldanha / Hoed Vlei',
        timing: 'Later pipeline',
        role: 'Additional named nodes in the longer-term platform pipeline.',
        chips: ['Named pipeline', 'Future rollout', 'Platform depth']
      }
    ],
    moatBullets: [
      'Brownfield and industrial nodes with existing power infrastructure reduce time-to-commissioning.',
      'Modular deployment allows site capacity to be added in discrete blocks rather than all at once.',
      'Energy cost, flexibility and site access support differentiated compute economics.',
      'The platform can extend from Bitcoin mining into higher-value digital workloads over time.'
    ],
    capitalLadder: [
      'Initial equity capital establishes operating proof points.',
      'Equipment finance and project-level debt can support scale once sites are live.',
      'Additional institutional capital can follow demonstrated operating performance and energised assets.',
      'Public-market optionality exists as an acceleration path, not a requirement for the base case.'
    ],
    sourceRegister: [
      { title: 'Detailed 12-month + 10-year model', date: 'Apr 2026', use: 'Primary scenario engine used by the dashboard.', href: 'assets/docs/BitMach_Master_Model_Phase1_12M_10Y_v2.xlsx' },
      { title: 'Phase 1 investor model', date: 'Apr 2026', use: 'Supplementary cleaner operating model included in the investor pack.', href: 'assets/docs/BitMach_Clean_Phase1_Model_v0.1.xlsx' },
      { title: 'Investor memorandum', date: 'Apr 2026', use: 'Platform narrative, capital structure and investment proposition.', href: 'assets/docs/BitMach_Investor_Memo_LATEST.pdf' },
      { title: 'Investor presentation', date: 'Apr 2026', use: 'Current platform overview, capital stack and deployment framing.', href: 'assets/docs/Bitmach_Investor_Pres_LATEST.pdf' },
      { title: 'Grootvlei concept design', date: 'Feb 2026', use: 'Phase 1 technical configuration and brownfield integration basis.', href: 'assets/docs/Bitmach_Grootvlei_Concept Design v0.5.pdf' }
    ]
  },
  sourceNotes: ['carel@bitmachbtc.com'],
  presentationFrame: {
    phase1CapexUsd: 32000000,
    publishedStructure: 'Illustrative Phase 1 reference structure: USD 14m asset-backed, USD 14m mezzanine / DMTN, USD 4m equity.'
  },
  modelDownloadUrl: 'assets/docs/BitMach_Master_Model_Phase1_12M_10Y_v2.xlsx'
};
