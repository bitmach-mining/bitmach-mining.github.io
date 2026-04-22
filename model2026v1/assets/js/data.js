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
    { key: 'strategy', label: 'Strategy' },
    { key: 'phase1', label: 'Phase 1' },
    { key: 'funding', label: 'Funding' },
    { key: 'platform', label: '10Y platform' },
    { key: 'assumptions', label: 'Assumptions' }
  ],
  presets: {
    bear: {
      label: 'Bear case',
      description: 'Conservative downside: softer BTC, higher tariffs, slower network economics, more equity and no optional upside.',
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
      description: 'Directly anchored to the current master model base case. Demand-response and AI / hyperscaler upside remain off by default.',
      overrides: {}
    },
    bull: {
      label: 'Bull case',
      description: 'Stronger BTC, lower tariff path, better hardware efficiency and optional upside switched on.',
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
    activeCasePack: 'Updated master model base case',
    activePhase1Split: '15 MW Grootvlei / 5 MW AMSA Vanderbijlpark',
    alternativePhase1Split: '10 MW Grootvlei / 10 MW AMSA Vanderbijlpark remains an alternative planning case',
    contractsHorizon: 'Capacity, site agreements and electrons secured through 2030 in current management messaging.',
    managementMessage: 'Ring-fenced Phase 1 infrastructure deployment with measurable energy access, controlled capex, visible commissioning milestones, real-time operating transparency and explicit optionality layered on top.'
  },
  strategy: {
    meetingRecommendations: [
      'Keep the detailed model internal and move the online dashboard to a simplified KPI-led investor pack.',
      'Show megawatts ramp, named site rollout, revenue streams, capex profile, energy-cost drivers, payback and indicative returns.',
      'Position the investor-facing pack as a business plan for equity and family-office audiences, not as a raw DCF workbook export.',
      'Make site mapping, moat, revenue stack and contracts-to-2030 explicit so the scale path feels planned rather than promotional.',
      'Explain step-changes in capacity as discrete site deployments: nodes come in meaningful blocks and are deployed all-or-nothing per site.'
    ],
    executionSignals: [
      {
        title: 'Contracted access',
        value: '500 MW+',
        body: 'Latest investor materials frame BitMach as having access to 500 MW+ of contracted industrial-grade power, while the April review pack also describes 350 MW as contractually committed across Phases 1–3.'
      },
      {
        title: 'Funding is the gate',
        value: 'Secured to 2030',
        body: 'The April 2026 meeting summary says first-four-year capacity is already secured through 2030 and that funding, not site access, is now the gating item.'
      },
      {
        title: 'Execution speed',
        value: 'Weeks to months',
        body: 'Infrastructure-memo materials position deployments as modular assets that move from capital to revenue in weeks to months, with immediate post-commissioning revenue visibility.'
      },
      {
        title: 'Management execution case',
        value: '12-week target',
        body: 'Per your brief, this dashboard now carries the investor narrative that Phase 1 capital-to-commissioning can be compressed into roughly 12 weeks once capital is committed.'
      }
    ],
    revenueStack: [
      {
        title: 'Underwritten today',
        stage: 'Debt / base case',
        bullets: [
          'Bitcoin production as the Phase 1 anchor revenue stream',
          'Site-specific energy economics at Grootvlei and AMSA',
          'Optionality remains off by default in the conservative case'
        ]
      },
      {
        title: 'Operational optimisation',
        stage: 'Phase 2 value creation',
        bullets: [
          'Demand-response and grid-stabilisation value',
          'Tariff optimisation via flexibility recognition',
          'AMSA solar blending reducing effective energy cost'
        ]
      },
      {
        title: 'Strategic upside',
        stage: 'Sponsor / strategic case',
        bullets: [
          'Hyperscaler electricity resale and AI / HPC hosting',
          'Ancillary-services style monetisation as reforms develop',
          'Nasdaq / GEM optionality and larger public-market capital'
        ]
      }
    ],
    roadmap: [
      {
        phase: 'Phase 1',
        timing: '0–6 months',
        title: 'Proof of execution',
        bullets: [
          '15 MW Grootvlei + 5 MW AMSA in the active workbook base case',
          'Demonstrate operational execution and demand-response capability',
          'Immediate Bitcoin monetisation once live'
        ]
      },
      {
        phase: 'Phase 2',
        timing: '6–24 months',
        title: 'Scale initiation',
        bullets: [
          'Expand proven Grootvlei and AMSA sites',
          'Introduce AMSA solar blending and tariff optimisation path',
          'R250m DMTN / mezzanine scale-up frame in current deck materials'
        ]
      },
      {
        phase: 'Phase 3',
        timing: '24+ months',
        title: 'Institutional scale',
        bullets: [
          'AMSA Newcastle plus additional Eskom / industrial nodes',
          '500 MW to 2 GW national platform ambition',
          'AI / HPC and larger infrastructure capital layered on top'
        ]
      }
    ],
    siteRoadmap: [
      {
        name: 'Grootvlei',
        timing: 'Now',
        role: 'Brownfield Eskom generation node and Phase 1 anchor site.',
        chips: ['15 MW base case', 'Grid-powered', 'Proof-of-execution site']
      },
      {
        name: 'AMSA Vanderbijlpark',
        timing: 'Now',
        role: 'Industrial node with solar-blending pathway and contingent profit-share structure.',
        chips: ['5 MW base case', '70 MW solar year 1', 'Blended-energy economics']
      },
      {
        name: 'AMSA Newcastle',
        timing: 'Next',
        role: 'Solar-enabled energy-digital campus opportunity for the medium-term scale phase.',
        chips: ['Future campus', 'Substations in place', 'Hundreds of MW potential']
      },
      {
        name: 'Saldanha / Hoed Vlei',
        timing: 'Later pipeline',
        role: 'Named expansion nodes in the April 2026 meeting summary; used to evidence explicit site mapping and moat.',
        chips: ['Named nodes', 'Roadmap visibility', 'Moat by site']
      }
    ],
    moatBullets: [
      'Site-specific foundations, cabling and switchboard integrations create practical exclusivity once deployment is installed.',
      'Brownfield nodes deploy faster than greenfield competitors facing transmission queues and permitting delay.',
      'BitMach is being positioned as energy-linked digital infrastructure, not a standalone bitcoin-mining story.',
      'The dashboard defaults to the current underwritten case and keeps optionality explicitly marked.'
    ],
    capitalLadder: [
      'HNWI / family-office equity funds the initial proof phase.',
      'Operational demonstration de-risks the platform for infrastructure and pension capital.',
      'Equipment finance and vendor terms support the hardware layer.',
      'Public-market liquidity and GEM remain acceleration options, not day-one funding assumptions.'
    ],
    sourceRegister: [
      { title: 'Nedbank model meeting transcript', date: '21 Apr 2026', use: 'Investor-facing simplification, KPI scope, moat and scale narrative.' },
      { title: 'Dashboard diagnostic', date: '13 Apr 2026', use: 'Structure the dashboard as an investor decision system, not a spreadsheet front end.' },
      { title: 'Investor presentation', date: '13–17 Apr 2026', use: 'Current contracted-access, IRR, profitability and phased-deployment framing.' },
      { title: 'Nedbank model memo', date: '31 Mar 2026', use: 'Layered infrastructure framing, tariff realism, capital ladder and optionality separation.' }
    ]
  },
  sourceNotes: [
    'As of 22 Apr 2026 • Updated master model base case',
    'Numbers driven by BitMach_Master_Model_v3_ElectricalCapex_Financing.xlsx',
    'Narrative and positioning anchored to the 21 Apr 2026 Nedbank meeting transcript, 13 Apr 2026 dashboard diagnostic, the 31 Mar 2026 Nedbank memo and the latest Apr 2026 investor materials.'
  ],
  presentationFrame: {
    phase1CapexUsd: 32000000,
    publishedStructure: 'Investor deck frame: USD 14m asset-backed, USD 14m mezzanine / DMTN, USD 4m equity.'
  },
  modelDownloadUrl: 'assets/docs/BitMach_Master_Model_v3_ElectricalCapex_Financing.xlsx'
};
