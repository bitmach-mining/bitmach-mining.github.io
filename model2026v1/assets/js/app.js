(function () {
  const data = window.BITMACH_DATA;
  const tabs = data.tabs;
  const controls = {
    phase1Mw: document.getElementById('phase1MwRange'),
    amsaShare: document.getElementById('amsaShareRange'),
    solarMw: document.getElementById('solarMwRange'),
    btc: document.getElementById('btcRange'),
    btcGrowth: document.getElementById('btcGrowthRange'),
    networkGrowth: document.getElementById('networkGrowthRange'),
    uptime: document.getElementById('uptimeRange'),
    grootvleiTariff: document.getElementById('grootvleiTariffRange'),
    amsaTariff: document.getElementById('amsaTariffRange'),
    hashrate: document.getElementById('hashrateRange'),
    efficiency: document.getElementById('efficiencyRange'),
    minerPrice: document.getElementById('minerPriceRange'),
    solarCapex: document.getElementById('solarCapexRange'),
    drPrice: document.getElementById('drPriceRange'),
    aiPrice: document.getElementById('aiPriceRange'),
    debtRate: document.getElementById('debtRateRange'),
    equityShare: document.getElementById('equityShareRange'),
    rampFactor: document.getElementById('rampFactorRange'),
    includeDR: document.getElementById('drToggle'),
    includeAI: document.getElementById('aiToggle'),
    comparisonMode: document.getElementById('comparisonModeToggle')
  };

  const valueSpans = {
    phase1Mw: document.getElementById('phase1MwValue'),
    amsaShare: document.getElementById('amsaShareValue'),
    solarMw: document.getElementById('solarMwValue'),
    btc: document.getElementById('btcValue'),
    btcGrowth: document.getElementById('btcGrowthValue'),
    networkGrowth: document.getElementById('networkGrowthValue'),
    uptime: document.getElementById('uptimeValue'),
    grootvleiTariff: document.getElementById('grootvleiTariffValue'),
    amsaTariff: document.getElementById('amsaTariffValue'),
    hashrate: document.getElementById('hashrateValue'),
    efficiency: document.getElementById('efficiencyValue'),
    minerPrice: document.getElementById('minerPriceValue'),
    solarCapex: document.getElementById('solarCapexValue'),
    drPrice: document.getElementById('drPriceValue'),
    aiPrice: document.getElementById('aiPriceValue'),
    debtRate: document.getElementById('debtRateValue'),
    equityShare: document.getElementById('equityShareValue'),
    rampFactor: document.getElementById('rampFactorValue')
  };

  const presetButtons = document.getElementById('presetButtons');
  const presetDescription = document.getElementById('presetDescription');
  const kpiGrid = document.getElementById('kpiGrid');
  const tabHeader = document.getElementById('tabHeader');
  const tabContent = document.getElementById('tabContent');
  const snapshotGrid = document.getElementById('snapshotGrid');
  const comparisonSection = document.getElementById('comparisonSection');
  const sourceNotesFooter = document.getElementById('sourceNotesFooter');

  const state = {
    presetKey: 'base',
    tabKey: 'overview',
    snapshots: [],
    comparisonMode: false
  };

  init();

  function init() {
    setDownloadLinks();
    buildPresetButtons();
    buildTabs();
    applyPreset(state.presetKey, true);
    hydrateFromUrl();
    bindEvents();
    sourceNotesFooter.textContent = data.sourceNotes.join(' • ');
    render();
  }

  function setDownloadLinks() {
    document.getElementById('modelDownloadTop').href = data.modelDownloadUrl;
    document.getElementById('modelDownloadSide').href = data.modelDownloadUrl;
  }

  function buildPresetButtons() {
    presetButtons.innerHTML = '';
    Object.entries(data.presets).forEach(([key, preset]) => {
      const button = document.createElement('button');
      button.className = `segment-btn ${key === state.presetKey ? 'active' : ''}`;
      button.textContent = preset.label;
      button.addEventListener('click', () => {
        state.presetKey = key;
        applyPreset(key);
      });
      presetButtons.appendChild(button);
    });
    updatePresetButtons();
  }

  function buildTabs() {
    tabHeader.innerHTML = '';
    tabs.forEach((tab) => {
      const button = document.createElement('button');
      button.className = `tab-btn ${tab.key === state.tabKey ? 'active' : ''}`;
      button.textContent = tab.label;
      button.addEventListener('click', () => {
        state.tabKey = tab.key;
        buildTabs();
        render();
      });
      tabHeader.appendChild(button);
    });
  }

  function bindEvents() {
    Object.values(controls).forEach((control) => {
      const eventName = control.type === 'checkbox' ? 'change' : 'input';
      control.addEventListener(eventName, () => {
        state.comparisonMode = controls.comparisonMode.checked;
        render();
      });
    });

    document.getElementById('resetBtn').addEventListener('click', () => {
      applyPreset(state.presetKey);
    });

    document.getElementById('shareScenarioBtn').addEventListener('click', async () => {
      writeUrlState();
      try {
        await navigator.clipboard.writeText(window.location.href);
        const btn = document.getElementById('shareScenarioBtn');
        const original = btn.textContent;
        btn.textContent = 'Scenario link copied';
        setTimeout(() => { btn.textContent = original; }, 1500);
      } catch (err) {
        console.warn(err);
      }
    });

    document.getElementById('saveSnapshotBtn').addEventListener('click', () => {
      const scenario = getScenario();
      const metrics = computeMetrics(scenario);
      state.snapshots.unshift({
        id: `${Date.now()}`,
        label: `${data.presets[state.presetKey].label}`,
        createdAt: new Date().toLocaleString(),
        summary: snapshotSummary(metrics),
        scenario: scenario
      });
      state.snapshots = state.snapshots.slice(0, 8);
      state.comparisonMode = true;
      controls.comparisonMode.checked = true;
      render();
    });

    document.getElementById('clearSnapshotsBtn').addEventListener('click', () => {
      state.snapshots = [];
      render();
    });
  }

  function applyPreset(key, skipRender) {
    const values = Object.assign({}, data.controls, data.presets[key].overrides || {});
    setControlValue(controls.phase1Mw, values.phase1TotalMw);
    setControlValue(controls.amsaShare, values.amsaShare);
    setControlValue(controls.solarMw, values.amsaSolarMwYear1);
    setControlValue(controls.btc, values.btcPriceStart);
    setControlValue(controls.btcGrowth, values.btcGrowth);
    setControlValue(controls.networkGrowth, values.networkHashGrowth);
    setControlValue(controls.uptime, values.uptime);
    setControlValue(controls.grootvleiTariff, values.grootvleiTariff);
    setControlValue(controls.amsaTariff, values.amsaTariff);
    setControlValue(controls.hashrate, values.minerHashrate);
    setControlValue(controls.efficiency, values.minerEfficiency);
    setControlValue(controls.minerPrice, values.minerPriceUsd);
    setControlValue(controls.solarCapex, values.solarCapexPerMw);
    setControlValue(controls.drPrice, values.drPrice);
    setControlValue(controls.aiPrice, values.annualAiPriceUsdMWh);
    setControlValue(controls.debtRate, values.seniorDebtRatePa);
    setControlValue(controls.equityShare, values.equityShare);
    setControlValue(controls.rampFactor, values.rampFactor);
    controls.includeDR.checked = Boolean(values.includeDR);
    controls.includeAI.checked = Boolean(values.includeAI);
    controls.comparisonMode.checked = state.comparisonMode;
    presetDescription.textContent = data.presets[key].description;
    updatePresetButtons();
    if (!skipRender) render();
  }

  function setControlValue(control, value) {
    if (control.type === 'checkbox') {
      control.checked = Boolean(value);
    } else {
      control.value = value;
    }
  }

  function updatePresetButtons() {
    Array.from(presetButtons.children).forEach((btn, index) => {
      const key = Object.keys(data.presets)[index];
      btn.classList.toggle('active', key === state.presetKey);
    });
  }

  function hydrateFromUrl() {
    const hash = window.location.hash.replace(/^#/, '');
    if (!hash) return;
    try {
      const params = new URLSearchParams(hash);
      if (params.get('preset') && data.presets[params.get('preset')]) {
        state.presetKey = params.get('preset');
        applyPreset(state.presetKey, true);
      }
      if (params.get('tab') && tabs.some((tab) => tab.key === params.get('tab'))) {
        state.tabKey = params.get('tab');
      }
      const numberMap = [
        ['mw', controls.phase1Mw],
        ['amsa', controls.amsaShare],
        ['solar', controls.solarMw],
        ['btc', controls.btc],
        ['btcg', controls.btcGrowth],
        ['hashg', controls.networkGrowth],
        ['uptime', controls.uptime],
        ['gvlt', controls.grootvleiTariff],
        ['amsat', controls.amsaTariff],
        ['hashrate', controls.hashrate],
        ['eff', controls.efficiency],
        ['price', controls.minerPrice],
        ['solarcapex', controls.solarCapex],
        ['drprice', controls.drPrice],
        ['aiprice', controls.aiPrice],
        ['debt', controls.debtRate],
        ['equity', controls.equityShare],
        ['ramp', controls.rampFactor]
      ];
      numberMap.forEach(([param, control]) => {
        const value = params.get(param);
        if (value !== null && value !== '') control.value = value;
      });
      if (params.get('dr') !== null) controls.includeDR.checked = params.get('dr') === '1';
      if (params.get('ai') !== null) controls.includeAI.checked = params.get('ai') === '1';
      if (params.get('compare') !== null) {
        state.comparisonMode = params.get('compare') === '1';
        controls.comparisonMode.checked = state.comparisonMode;
      }
      buildTabs();
      updatePresetButtons();
      presetDescription.textContent = data.presets[state.presetKey].description;
    } catch (err) {
      console.warn('Unable to parse scenario hash', err);
    }
  }

  function writeUrlState() {
    const scenario = getScenario();
    const params = new URLSearchParams();
    params.set('preset', state.presetKey);
    params.set('tab', state.tabKey);
    params.set('mw', String(scenario.phase1TotalMw));
    params.set('amsa', scenario.amsaShare.toFixed(2));
    params.set('solar', String(scenario.amsaSolarMwYear1));
    params.set('btc', String(scenario.btcPriceStart));
    params.set('btcg', scenario.btcGrowth.toFixed(2));
    params.set('hashg', scenario.networkHashGrowth.toFixed(2));
    params.set('uptime', scenario.uptime.toFixed(2));
    params.set('gvlt', scenario.grootvleiTariff.toFixed(2));
    params.set('amsat', scenario.amsaTariff.toFixed(2));
    params.set('hashrate', String(scenario.minerHashrate));
    params.set('eff', scenario.minerEfficiency.toFixed(1));
    params.set('price', String(scenario.minerPriceUsd));
    params.set('solarcapex', String(scenario.solarCapexPerMw));
    params.set('drprice', scenario.drPrice.toFixed(2));
    params.set('aiprice', String(scenario.annualAiPriceUsdMWh));
    params.set('debt', scenario.seniorDebtRatePa.toFixed(3));
    params.set('equity', scenario.equityShare.toFixed(2));
    params.set('ramp', scenario.rampFactor.toFixed(2));
    params.set('dr', scenario.includeDR ? '1' : '0');
    params.set('ai', scenario.includeAI ? '1' : '0');
    params.set('compare', state.comparisonMode ? '1' : '0');
    window.location.hash = params.toString();
  }

  function getScenario() {
    const scenario = Object.assign({}, data.controls);
    scenario.phase1TotalMw = parseFloat(controls.phase1Mw.value);
    scenario.amsaShare = clamp(parseFloat(controls.amsaShare.value), 0.10, 0.60);
    scenario.amsaSolarMwYear1 = parseFloat(controls.solarMw.value);
    scenario.btcPriceStart = parseFloat(controls.btc.value);
    scenario.btcGrowth = parseFloat(controls.btcGrowth.value);
    scenario.networkHashGrowth = parseFloat(controls.networkGrowth.value);
    scenario.uptime = parseFloat(controls.uptime.value);
    scenario.grootvleiTariff = parseFloat(controls.grootvleiTariff.value);
    scenario.amsaTariff = parseFloat(controls.amsaTariff.value);
    scenario.minerHashrate = parseFloat(controls.hashrate.value);
    scenario.minerEfficiency = parseFloat(controls.efficiency.value);
    scenario.minerPriceUsd = parseFloat(controls.minerPrice.value);
    scenario.solarCapexPerMw = parseFloat(controls.solarCapex.value);
    scenario.drPrice = parseFloat(controls.drPrice.value);
    scenario.annualDrPrice = scenario.drPrice;
    scenario.hyperscalerPriceUsdMWh = parseFloat(controls.aiPrice.value);
    scenario.annualAiPriceUsdMWh = parseFloat(controls.aiPrice.value);
    scenario.seniorDebtRatePa = parseFloat(controls.debtRate.value);
    scenario.equityShare = parseFloat(controls.equityShare.value);
    scenario.seniorDebtShare = 1 - scenario.equityShare;
    scenario.rampFactor = parseFloat(controls.rampFactor.value);
    scenario.includeDR = controls.includeDR.checked;
    scenario.includeAI = controls.includeAI.checked;
    scenario.includeAnnualDR = controls.includeDR.checked;
    scenario.includeAnnualAI = controls.includeAI.checked;
    scenario.comparisonMode = controls.comparisonMode.checked;
    return scenario;
  }

  function computeMetrics(s, options = {}) {
    const controls = prepareControls(s);
    const monthly = computePhase1(controls);
    const annual = computeAnnualModel(controls);
    const year1Revenue = sum(monthly.map((row) => row.revenue));
    const year1BtcRevenue = sum(monthly.map((row) => row.btcRevenue));
    const year1DrRevenue = sum(monthly.map((row) => row.drRevenue));
    const year1AiRevenue = sum(monthly.map((row) => row.aiRevenue));
    const year1Opex = sum(monthly.map((row) => row.opex));
    const year1EnergyCost = sum(monthly.map((row) => row.energyCost));
    const year1OpexExEnergy = year1Opex - year1EnergyCost;
    const year1Ebitda = sum(monthly.map((row) => row.ebitda));
    const year1CapexCash = sum(monthly.map((row) => row.capexCash));
    const year1CapexBasis = sum(monthly.map((row) => row.capexBasis));
    const year1CashBurn = sum(monthly.map((row) => row.unleveredCF));
    const year1Btc = sum(monthly.map((row) => row.btcMined));
    const year1Electricity = sum(monthly.map((row) => row.totalEskomEnergy));
    const year1TotalEnergy = sum(monthly.map((row) => row.totalEnergy));
    const year1SolarEnergy = sum(monthly.map((row) => row.totalSolarEnergy));
    const year1SolarShare = year1TotalEnergy > 0 ? year1SolarEnergy / year1TotalEnergy : 0;
    const peakFunding = Math.max.apply(null, monthly.map((row) => row.peakFunding));
    const equityDraw = sum(monthly.map((row) => row.equityDraw));
    const debtDraw = sum(monthly.map((row) => row.debtGrossDraw));
    const debtFees = sum(monthly.map((row) => row.debtFee));
    const yearEndCash = monthly.length ? monthly[monthly.length - 1].cashClose : 0;
    const yearEndDebt = monthly.length ? monthly[monthly.length - 1].debtClose : 0;
    const breakEvenUsd = ((year1Opex - sum(monthly.map((row) => row.drRevenue + row.aiRevenue))) / Math.max(year1Btc, 1)) / controls.fx * 1000;
    const firstLiveMonth = monthly.find((row) => row.totalAvgMw > 0);
    const firstPositiveMonth = monthly.find((row) => row.totalAvgMw > 0 && row.ebitda > 0);
    const irr10 = irr(annual.map((row) => row.cashflow));
    const cumulativeRevenue = sum(annual.map((row) => row.revenue));
    const cumulativeBtcRevenue = sum(annual.map((row) => row.btcRevenue));
    const cumulativeDrRevenue = sum(annual.map((row) => row.drRevenue));
    const cumulativeAiRevenue = sum(annual.map((row) => row.aiRevenue));
    const cumulativeEbitda = sum(annual.map((row) => row.ebitda));
    const cumulativeCapex = sum(annual.map((row) => row.capex));
    const maxAnnualMw = Math.max.apply(null, annual.map((row) => row.totalMw));
    const maxAnnualSolarMw = Math.max.apply(null, annual.map((row) => row.solarMw));
    const finalYear = annual[annual.length - 1];
    const cashYield = year1CapexBasis > 0 ? year1Ebitda / year1CapexBasis : 0;
    const phase1SimplePaybackYears = year1Ebitda > 0 ? year1CapexBasis / year1Ebitda : NaN;
    const siteStats = buildSiteStats(monthly, annual, controls);
    const sensitivity = options.includeSensitivity === false ? null : buildSensitivityGrid(s, controls);

    return {
      scenario: controls,
      monthly,
      annual,
      siteStats,
      sensitivity,
      summary: {
        year1Revenue,
        year1BtcRevenue,
        year1DrRevenue,
        year1AiRevenue,
        year1Opex,
        year1EnergyCost,
        year1OpexExEnergy,
        year1Ebitda,
        year1CapexCash,
        year1CapexBasis,
        year1CashBurn,
        year1Btc,
        year1Electricity,
        year1TotalEnergy,
        year1SolarEnergy,
        year1SolarShare,
        peakFunding,
        equityDraw,
        debtDraw,
        debtFees,
        yearEndCash,
        yearEndDebt,
        breakEvenUsd,
        irr10,
        cumulativeRevenue,
        cumulativeBtcRevenue,
        cumulativeDrRevenue,
        cumulativeAiRevenue,
        cumulativeEbitda,
        cumulativeCapex,
        maxAnnualMw,
        maxAnnualSolarMw,
        finalYear,
        cashYield,
        phase1SimplePaybackYears,
        firstLiveMonth: firstLiveMonth ? firstLiveMonth.month : null,
        firstPositiveMonth: firstPositiveMonth ? firstPositiveMonth.month : null,
        phase1GrootvleiMw: monthly.length ? monthly[monthly.length - 1].gClose : 0,
        phase1AmsaMw: monthly.length ? monthly[monthly.length - 1].aClose : 0,
        phase1SolarMw: monthly.length ? monthly[monthly.length - 1].sClose : 0,
        phase1CapexGapVsDeckUsd: (year1CapexBasis / 1000 / controls.fx) - (data.presentationFrame.phase1CapexUsd / 1000000)
      }
    };
  }

  function prepareControls(s) {
    const c = Object.assign({}, s);
    c.minerPower = c.minerHashrate * c.minerEfficiency;
    c.containerGrossMw = ((c.slotsPerContainer * c.minerPower) / 1000000) * (1 + c.auxLoad);
    const quotedSubtotal = sum(data.electricalBasis.quotedPackages);
    c.allInElectrical20Mw = (quotedSubtotal + quotedSubtotal * (c.harmonicMitigationPct + c.lightingAllowancePct + c.instrumentationAllowancePct + c.earthingLightningPct + c.civilDrainageFencingPct)) * c.brownfieldSimilarityFactor;
    c.electricalSiteFixedCost = c.allInElectrical20Mw * c.electricalSiteFixedShare;
    c.electricalVariablePerMw = c.allInElectrical20Mw * (1 - c.electricalSiteFixedShare) / 20;
    return c;
  }

  function computePhase1(c) {
    const base = data.phase1;
    const gTarget = c.phase1TotalMw * (1 - c.amsaShare);
    const aTarget = c.phase1TotalMw * c.amsaShare;
    const sTarget = c.amsaSolarMwYear1;
    const gClose = scaleSchedule(base.grootvleiClose, 15, gTarget);
    const aClose = scaleSchedule(base.amsaClose, 5, aTarget);
    const sClose = scaleSchedule(base.solarClose, 10, sTarget);
    const monthly = [];

    const btcUsdSeries = [];
    const btcZarSeries = [];
    const networkSeries = [];
    let btcPrice = c.btcPriceStart;
    let networkHash = c.networkHashStart;
    const btcMonthlyGrowth = Math.pow(1 + c.btcGrowth, 1 / 12);
    const hashMonthlyGrowth = Math.pow(1 + c.networkHashGrowth, 1 / 12);
    for (let i = 0; i < base.months.length; i += 1) {
      btcUsdSeries.push(btcPrice);
      btcZarSeries.push(btcPrice * c.fx);
      networkSeries.push(networkHash);
      btcPrice *= btcMonthlyGrowth;
      networkHash *= hashMonthlyGrowth;
    }

    let gOpen = 0;
    let aOpen = 0;
    let sOpen = 0;
    let gContainersOpen = 0;
    let aContainersOpen = 0;
    let fteOpen = c.fixedCorporateFte;

    for (let i = 0; i < base.months.length; i += 1) {
      const days = base.days[i];
      const g = gClose[i];
      const a = aClose[i];
      const s = sClose[i];
      const gAvg = (gOpen + g) / 2;
      const aAvg = (aOpen + a) / 2;
      const sAvg = (sOpen + s) / 2;
      const totalAvgMw = gAvg + aAvg;
      const newMw = Math.max(g - gOpen, 0) + Math.max(a - aOpen, 0);
      const newSolarMw = Math.max(s - sOpen, 0);
      const gActive = gAvg > 0 ? 1 : 0;
      const aActive = aAvg > 0 ? 1 : 0;
      const activeSites = gActive + aActive;
      const siteStarts = (gOpen === 0 && g > 0 ? 1 : 0) + (aOpen === 0 && a > 0 ? 1 : 0);
      const gContainersClose = ceilDiv(g, c.containerGrossMw);
      const aContainersClose = ceilDiv(a, c.containerGrossMw);
      const newContainers = Math.max(gContainersClose - gContainersOpen, 0) + Math.max(aContainersClose - aContainersOpen, 0);
      const gSiteFte = gActive * c.siteMgmtFtePerSite + g * c.techniciansFtePerMw + g * c.electriciansFtePerMw;
      const aSiteFte = aActive * c.siteMgmtFtePerSite + a * c.techniciansFtePerMw + a * c.electriciansFtePerMw;
      const closingFte = c.fixedCorporateFte + gSiteFte + aSiteFte;
      const newFte = Math.max(closingFte - fteOpen, 0);
      const gAvgMiners = gAvg / (1 + c.auxLoad) * 1000000 / c.minerPower;
      const aAvgMiners = aAvg / (1 + c.auxLoad) * 1000000 / c.minerPower;
      const gHash = gAvgMiners * c.minerHashrate * (c.grootvleiHours / 24) * c.uptime;
      const aHash = aAvgMiners * c.minerHashrate * ((c.amsaEskomHours + c.amsaSolarHours) / 24) * c.uptime;
      const totalHash = gHash + aHash;
      const gEskomMWh = gAvg * c.grootvleiHours * days * c.uptime;
      const aTotalMWh = aAvg * (c.amsaEskomHours + c.amsaSolarHours) * days * c.uptime;
      const aSolarMWh = Math.min(aAvg, sAvg) * c.amsaSolarHours * days * c.uptime;
      const aEskomMWh = aTotalMWh - aSolarMWh;
      const totalEnergy = gEskomMWh + aTotalMWh;
      const totalEskomEnergy = gEskomMWh + aEskomMWh;
      const networkBtcMonth = days * c.blocksPerDay * c.blockSubsidy * (1 + c.feeFactor);
      const gBtc = networkSeries[i] > 0 ? gHash / networkSeries[i] * networkBtcMonth : 0;
      const aBtc = networkSeries[i] > 0 ? aHash / networkSeries[i] * networkBtcMonth : 0;
      const btcMined = gBtc + aBtc;
      const btcRevenue = btcMined * btcZarSeries[i] / 1000;
      const drRevenue = c.includeDR && (i + 1) >= c.drStartMonth ? totalAvgMw * c.drHoursDay * days * c.drPaidUtilisation * c.drPrice : 0;
      const aiRevenue = c.includeAI && (i + 1) >= c.hyperscalerStartMonth ? c.hyperscalerMwSold * c.hyperscalerHoursDay * days * c.hyperscalerPriceUsdMWh * c.fx / 1000 : 0;
      const revenue = btcRevenue + drRevenue + aiRevenue;
      const energyCost = gEskomMWh * c.grootvleiTariff + aEskomMWh * c.amsaTariff + sAvg * c.solarCapexPerMw * c.solarOmPct / 12;
      const corporatePayroll = c.fixedCorporateFte * c.corporateSalaryPerFteYear / 12;
      const siteMgmtPayroll = activeSites * c.siteMgmtFtePerSite * c.siteMgmtSalaryPerFteYear / 12;
      const technicianPayroll = totalAvgMw * c.techniciansFtePerMw * c.technicianSalaryPerFteYear / 12;
      const electricianPayroll = totalAvgMw * c.electriciansFtePerMw * c.electricianSalaryPerFteYear / 12;
      const grossPayroll = corporatePayroll + siteMgmtPayroll + technicianPayroll + electricianPayroll;
      const salariesBenefits = grossPayroll * (1 + c.benefitsLoad);
      const travel = grossPayroll * c.travelPctPayroll + siteStarts * c.siteMobilizationTravel;
      const software = closingFte * c.saasPerFteMonth + activeSites * c.siteSoftwarePerSiteMonth + c.fileStorageMonth;
      const opex = energyCost + salariesBenefits + travel + software + c.legalRetainerMonth + c.officeRentMonth + totalAvgMw * c.toolsConsumablesPerMwMonth + activeSites * c.securityInsurancePerSiteMonth + totalAvgMw * c.otherUtilitiesPerMwMonth;
      const ebitda = revenue - opex;

      const asicBasis = newMw / (1 + c.auxLoad) * 1000000 / c.minerPower * c.minerPriceUsd * c.fx / 1000;
      const containerBasis = newContainers * c.containerCostUsd * c.fx / 1000;
      const epcBasis = siteStarts * c.electricalSiteFixedCost + newMw * c.electricalVariablePerMw;
      const solarBasis = newSolarMw * c.solarCapexPerMw;
      const sparesBasis = asicBasis * c.initialSparesPct;
      const toolsBasis = siteStarts * c.toolsInitialPerSite;
      const staffHardwareBasis = newFte * c.staffHardwarePerFte;
      const freightBasis = newContainers * c.oceanFreightUsdPerContainer * c.fx / 1000;
      const portBasis = newContainers * c.portClearingPerContainer;
      const inlandBasis = newContainers * c.inlandTruckingPerContainer;
      const craneBasis = newContainers * c.craneRiggingPerContainer;
      const insuranceBasis = (asicBasis + containerBasis) * c.cargoInsurancePct;
      const dutyBasis = (asicBasis + containerBasis) * c.importDutyPct;
      const setupBasis = i === 0 ? c.officeSetup + c.softwareSetup + c.legalSetup : 0;
      const capexBasis = asicBasis + containerBasis + epcBasis + solarBasis + sparesBasis + toolsBasis + staffHardwareBasis + freightBasis + portBasis + inlandBasis + craneBasis + insuranceBasis + dutyBasis + setupBasis;

      monthly.push({
        month: base.months[i],
        days,
        gClose: g,
        aClose: a,
        sClose: s,
        gAvg,
        aAvg,
        sAvg,
        totalAvgMw,
        newMw,
        newSolarMw,
        activeSites,
        siteStarts,
        newContainers,
        closingFte,
        newFte,
        gContainersClose,
        aContainersClose,
        btcPriceUsd: btcUsdSeries[i],
        btcMined,
        btcRevenue,
        drRevenue,
        aiRevenue,
        revenue,
        energyCost,
        opex,
        ebitda,
        gHash,
        aHash,
        totalHash,
        gEskomMWh,
        aEskomMWh,
        totalEskomEnergy,
        totalEnergy,
        totalSolarEnergy: aSolarMWh,
        asicBasis,
        containerBasis,
        epcBasis,
        solarBasis,
        sparesBasis,
        toolsBasis,
        staffHardwareBasis,
        freightBasis,
        portBasis,
        inlandBasis,
        craneBasis,
        insuranceBasis,
        dutyBasis,
        setupBasis,
        capexBasis
      });

      gOpen = g;
      aOpen = a;
      sOpen = s;
      gContainersOpen = gContainersClose;
      aContainersOpen = aContainersClose;
      fteOpen = closingFte;
    }

    const asicBases = monthly.map((row) => row.asicBasis);
    const containerBases = monthly.map((row) => row.containerBasis);
    const epcBases = monthly.map((row) => row.epcBasis);
    const solarBases = monthly.map((row) => row.solarBasis);
    const freightBases = monthly.map((row) => row.freightBasis);
    const portBases = monthly.map((row) => row.portBasis);
    const inlandBases = monthly.map((row) => row.inlandBasis);
    const insuranceBases = monthly.map((row) => row.insuranceBasis);
    const dutyBases = monthly.map((row) => row.dutyBasis);
    const minerOrigin = monthly.map((row) => row.asicBasis * c.minerVendorFinPct);
    const epcOrigin = monthly.map((row) => row.epcBasis * c.epcRetentionPct);

    let cashOpen = c.openingCash;
    let debtOpen = 0;
    let cumulativeBurn = 0;
    let peakFunding = 0;
    let debtAtGrace = 0;

    monthly.forEach((row, i) => {
      let minerPrincipal = 0;
      let minerInterest = 0;
      for (let j = 0; j < monthly.length; j += 1) {
        if (i >= j && i < j + c.minerVendorTenorMonths) {
          const principalPerMonth = minerOrigin[j] / c.minerVendorTenorMonths;
          minerPrincipal += principalPerMonth;
          minerInterest += (minerOrigin[j] - principalPerMonth * (i - j)) * c.minerVendorInterestPa / 12;
        }
      }
      const minerCash = shiftValue(asicBases, c.minerOrderLeadMonths, i) * c.minerDepositPct + minerPrincipal + minerInterest;

      let epcPrincipal = 0;
      let epcInterest = 0;
      for (let j = 0; j < monthly.length; j += 1) {
        if (i > j && i <= j + c.epcVendorTenorMonths) {
          const principalPerMonth = epcOrigin[j] / c.epcVendorTenorMonths;
          epcPrincipal += principalPerMonth;
          epcInterest += (epcOrigin[j] - principalPerMonth * (i - j - 1)) * c.epcVendorInterestPa / 12;
        }
      }
      const epcCash = shiftValue(epcBases, c.epcOrderLeadMonths, i) * c.epcDepositPct
        + (c.epcOrderLeadMonths > 0 ? shiftValue(epcBases, c.epcOrderLeadMonths - 1, i) * c.epcProgressPct : 0)
        + epcBases[i] * c.epcInstallPct
        + (i > 0 ? epcBases[i - 1] * c.epcCommissionPct : 0)
        + epcPrincipal + epcInterest;

      const containerCash = shiftValue(containerBases, c.containerOrderLeadMonths, i) * c.containerDepositPct
        + shiftValue(containerBases, Math.max(c.containerOrderLeadMonths - 1, 0), i) * c.containerProgressPct
        + containerBases[i] * c.containerFinalPct;

      const solarCash = shiftValue(solarBases, 2, i) * 0.2 + shiftValue(solarBases, 1, i) * 0.5 + solarBases[i] * 0.3;
      const capexCash = minerCash + containerCash + epcCash + solarCash
        + row.sparesBasis + row.toolsBasis + row.staffHardwareBasis
        + shiftValue(freightBases, 1, i) + shiftValue(portBases, 1, i) + shiftValue(inlandBases, 1, i)
        + row.craneBasis + shiftValue(insuranceBases, 1, i) + shiftValue(dutyBases, 1, i) + row.setupBasis;

      const unleveredCF = row.revenue - row.opex - capexCash;
      const requiredFunding = Math.max(c.minCashBuffer - (cashOpen + unleveredCF), 0);
      const equityDraw = requiredFunding * c.equityShare / (c.equityShare + c.seniorDebtShare);
      const debtGrossDraw = c.seniorDebtShare > 0 ? (requiredFunding - equityDraw) / (1 - c.seniorDebtArrangementFee) : 0;
      const debtFee = debtGrossDraw * c.seniorDebtArrangementFee;
      const netFunding = equityDraw + debtGrossDraw - debtFee;
      const cashClose = cashOpen + unleveredCF + netFunding;
      cumulativeBurn += unleveredCF;
      peakFunding = Math.max(peakFunding, Math.max(0, -cumulativeBurn));

      const monthNumber = i + 1;
      const debtInterest = (debtOpen + debtGrossDraw / 2) * c.seniorDebtRatePa / 12;
      let debtPrincipal = 0;
      let debtClose = 0;
      if (monthNumber <= c.seniorDebtGraceMonths) {
        debtClose = debtOpen + debtGrossDraw + debtInterest;
        if (monthNumber === c.seniorDebtGraceMonths) debtAtGrace = debtClose;
      } else {
        const amortMonths = c.seniorDebtTenorMonths - c.seniorDebtGraceMonths;
        debtPrincipal = amortMonths > 0 ? Math.min(debtAtGrace / amortMonths, debtOpen + debtGrossDraw) : (debtOpen + debtGrossDraw);
        debtClose = debtOpen + debtGrossDraw - debtPrincipal;
      }

      row.minerCash = minerCash;
      row.minerPrincipal = minerPrincipal;
      row.minerInterest = minerInterest;
      row.epcCash = epcCash;
      row.epcPrincipal = epcPrincipal;
      row.epcInterest = epcInterest;
      row.containerCash = containerCash;
      row.solarCash = solarCash;
      row.capexCash = capexCash;
      row.unleveredCF = unleveredCF;
      row.requiredFunding = requiredFunding;
      row.equityDraw = equityDraw;
      row.debtGrossDraw = debtGrossDraw;
      row.debtFee = debtFee;
      row.netFunding = netFunding;
      row.cashOpen = cashOpen;
      row.cashClose = cashClose;
      row.cumulativeBurn = cumulativeBurn;
      row.peakFunding = peakFunding;
      row.debtOpen = debtOpen;
      row.debtInterest = debtInterest;
      row.debtPrincipal = debtPrincipal;
      row.debtClose = debtClose;

      cashOpen = cashClose;
      debtOpen = debtClose;
    });

    return monthly;
  }

  function computeAnnualModel(c) {
    const annual = [];
    const years = data.ramp.years;
    const siteNames = ['grootvlei', 'amsaVB', 'newcastle', 'saldanha', 'komati'];
    const solarNames = ['amsaVB', 'newcastle', 'saldanha', 'komati'];
    let price = c.btcPriceStart;
    let network = c.networkHashStart;
    let prevTotalMw = 0;
    let prevSolarMw = 0;
    let prevSiteCompute = { grootvlei: 0, amsaVB: 0, newcastle: 0, saldanha: 0, komati: 0 };

    years.forEach((year, i) => {
      const compute = {};
      const solar = {};
      siteNames.forEach((name) => {
        const baseValue = data.ramp.siteCompute[name][i];
        compute[name] = i === 0 ? baseValue : baseValue * c.rampFactor;
      });
      solarNames.forEach((name) => {
        const baseValue = data.ramp.siteSolar[name][i];
        solar[name] = i === 0 ? baseValue : baseValue * c.rampFactor;
      });

      if (i === 0) {
        compute.grootvlei = c.phase1TotalMw * (1 - c.amsaShare);
        compute.amsaVB = c.phase1TotalMw * c.amsaShare;
        solar.amsaVB = c.amsaSolarMwYear1;
      }

      const totalMw = sum(siteNames.map((name) => compute[name]));
      const solarMw = sum(solarNames.map((name) => solar[name]));
      const activeSites = sum(siteNames.map((name) => (compute[name] > 0 ? 1 : 0)));
      const installedMiners = totalMw / (1 + c.auxLoad) * 1000000 / c.minerPower;

      let effectiveHashrate = compute.grootvlei / (1 + c.auxLoad) * 1000000 / c.minerPower * c.minerHashrate * (c.grootvleiHours / 24) * c.uptime;
      ['amsaVB', 'newcastle', 'saldanha', 'komati'].forEach((name) => {
        effectiveHashrate += compute[name] / (1 + c.auxLoad) * 1000000 / c.minerPower * c.minerHashrate * ((c.amsaEskomHours + c.amsaSolarHours) / 24) * c.uptime;
      });

      const btcMined = network > 0 ? effectiveHashrate / network * (c.blocksPerDay * 365 * c.blockSubsidy * (1 + c.feeFactor)) : 0;
      const btcRevenue = btcMined * price * c.fx / 1000;
      const drRevenue = c.includeAnnualDR ? totalMw * c.annualDrHoursDay * 365 * c.annualDrPrice : 0;
      const aiRevenue = c.includeAnnualAI && year >= c.annualAiStartYear ? totalMw * c.annualAiMwShare * 24 * 365 * c.annualAiPriceUsdMWh * c.fx / 1000 : 0;
      const revenue = btcRevenue + drRevenue + aiRevenue;

      const gvlEnergyCost = compute.grootvlei * c.grootvleiHours * 365 * c.uptime * c.grootvleiTariff;
      const amsaVBEnergyCost = (compute.amsaVB * (c.amsaEskomHours + c.amsaSolarHours) * 365 * c.uptime - Math.min(compute.amsaVB, solar.amsaVB) * c.amsaSolarHours * 365 * c.uptime) * c.amsaTariff;
      const otherEnergyCost = ['newcastle', 'saldanha', 'komati'].reduce((sumValue, name) => sumValue + ((compute[name] * (c.amsaEskomHours + c.amsaSolarHours) * 365 * c.uptime - Math.min(compute[name], solar[name]) * c.amsaSolarHours * 365 * c.uptime) * c.grootvleiTariff), 0);
      const solarOm = solarMw * c.solarCapexPerMw * c.solarOmPct;
      const totalEnergyCost = gvlEnergyCost + amsaVBEnergyCost + otherEnergyCost + solarOm;

      const siteStaffPayroll = activeSites * c.siteMgmtFtePerSite * c.siteMgmtSalaryPerFteYear + totalMw * c.techniciansFtePerMw * c.technicianSalaryPerFteYear + totalMw * c.electriciansFtePerMw * c.electricianSalaryPerFteYear;
      const salariesBenefits = c.fixedCorporateFte * c.corporateSalaryPerFteYear + siteStaffPayroll * (1 + c.benefitsLoad);
      const totalFte = c.fixedCorporateFte + activeSites * c.siteMgmtFtePerSite + totalMw * c.techniciansFtePerMw + totalMw * c.electriciansFtePerMw;
      const adminCost = salariesBenefits / (1 + c.benefitsLoad) * c.travelPctPayroll + totalFte * c.saasPerFteMonth * 12 + activeSites * c.siteSoftwarePerSiteMonth * 12 + c.fileStorageMonth * 12 + c.officeRentMonth * 12 + c.legalRetainerMonth * 12;
      const securityToolsUtilities = activeSites * c.securityInsurancePerSiteMonth * 12 + totalMw * c.toolsConsumablesPerMwMonth * 12 + totalMw * c.otherUtilitiesPerMwMonth * 12;
      const opex = totalEnergyCost + salariesBenefits + adminCost + securityToolsUtilities;
      const ebitda = revenue - opex;

      const newMw = i === 0 ? totalMw : Math.max(totalMw - prevTotalMw, 0);
      const newSolarMw = i === 0 ? solarMw : Math.max(solarMw - prevSolarMw, 0);
      const newContainers = ceilDiv(newMw, c.containerGrossMw);
      const siteStarts = sum(siteNames.map((name) => (prevSiteCompute[name] === 0 && compute[name] > 0 ? 1 : 0)));
      const minerCapex = newMw / (1 + c.auxLoad) * 1000000 / c.minerPower * c.minerPriceUsd * c.fx / 1000;
      const containerCapex = newContainers * c.containerCostUsd * c.fx / 1000;
      const electricalCapex = siteStarts * c.electricalSiteFixedCost + newMw * c.electricalVariablePerMw;
      const solarCapex = newSolarMw * c.solarCapexPerMw;
      const logisticsCapex = newContainers * c.oceanFreightUsdPerContainer * c.fx / 1000
        + newContainers * (c.portClearingPerContainer + c.inlandTruckingPerContainer + c.craneRiggingPerContainer)
        + (minerCapex + containerCapex) * (c.cargoInsurancePct + c.importDutyPct + c.initialSparesPct)
        + activeSites * c.toolsInitialPerSite * 0.25;
      const capex = minerCapex + containerCapex + electricalCapex + solarCapex + logisticsCapex;
      const cashflow = ebitda - capex;

      annual.push({
        year,
        totalMw,
        solarMw,
        installedMiners,
        effectiveHashrate,
        btcMined,
        btcRevenue,
        drRevenue,
        aiRevenue,
        revenue,
        totalEnergyCost,
        opex,
        ebitda,
        newMw,
        newSolarMw,
        newContainers,
        siteStarts,
        minerCapex,
        containerCapex,
        electricalCapex,
        solarCapex,
        logisticsCapex,
        capex,
        cashflow,
        btcPriceUsd: price,
        networkHash: network,
        compute,
        solar
      });

      price *= (1 + c.btcGrowth);
      network *= (1 + c.networkHashGrowth);
      prevTotalMw = totalMw;
      prevSolarMw = solarMw;
      prevSiteCompute = Object.assign({}, compute);
    });

    return annual;
  }

  function buildSiteStats(monthly, annual, controls) {
    const year1 = annual[0];
    return [
      {
        name: 'Grootvlei',
        mw: year1.compute.grootvlei,
        tariff: controls.grootvleiTariff,
        note: 'Phase 1 anchor site on the 6.6 kV pilot basis.',
        chips: [
          `${formatMw(year1.compute.grootvlei)} compute`,
          `${formatCurrencyZar(controls.grootvleiTariff, 2)}/kWh`,
          `${controls.grootvleiHours.toFixed(0)} h/day`
        ]
      },
      {
        name: 'AMSA Vanderbijlpark',
        mw: year1.compute.amsaVB,
        tariff: controls.amsaTariff,
        note: 'Blended Eskom + solar leg in the Phase 1 operating model.',
        chips: [
          `${formatMw(year1.compute.amsaVB)} compute`,
          `${formatMw(year1.solar.amsaVB)} solar`,
          `${formatCurrencyZar(controls.amsaTariff, 2)}/kWh`
        ]
      },
      {
        name: '10Y platform',
        mw: annual[annual.length - 1].totalMw,
        tariff: controls.grootvleiTariff,
        note: 'Long-range ramp using the current 10-year site schedule with scenario scaling.',
        chips: [
          `${formatMw(annual[annual.length - 1].totalMw)} compute`,
          `${formatMw(annual[annual.length - 1].solarMw)} solar`,
          `${formatPercent(irr(annual.map((row) => row.cashflow)) * 100, 1)} IRR`
        ]
      }
    ];
  }

  function buildSensitivityGrid(baseScenario, controls) {
    const btcFactors = [0.8, 0.9, 1.0, 1.1, 1.2];
    const tariffShifts = [-0.15, -0.075, 0, 0.075, 0.15];
    const btcLevels = btcFactors.map((factor) => roundTo(baseScenario.btcPriceStart * factor, 2500));
    const tariffLevels = tariffShifts.map((shift) => clamp(round(baseScenario.grootvleiTariff + shift, 2), 0.45, 1.50));
    const cells = tariffLevels.map((tariff) => {
      return btcLevels.map((btc) => {
        const scenario = Object.assign({}, baseScenario, {
          btcPriceStart: btc,
          grootvleiTariff: tariff,
          amsaTariff: clamp(round(baseScenario.amsaTariff + (tariff - baseScenario.grootvleiTariff), 2), 0.35, 1.30)
        });
        const summary = computeMetrics(scenario, { includeSensitivity: false }).summary;
        return {
          irr: Number.isFinite(summary.irr10) ? summary.irr10 * 100 : NaN,
          ebitda: summary.year1Ebitda,
          breakEven: summary.breakEvenUsd
        };
      });
    });
    return { btcLevels, tariffLevels, cells };
  }

  function render() {
    state.comparisonMode = controls.comparisonMode.checked;
    const scenario = getScenario();
    const metrics = computeMetrics(scenario);
    updateValueLabels(scenario, metrics);
    renderHero(metrics);
    renderKpis(metrics);
    renderActiveTab(metrics);
    renderSnapshots();
    comparisonSection.classList.toggle('hidden', !state.comparisonMode || state.snapshots.length === 0);
    writeUrlState();
  }

  function renderHero(metrics) {
    document.getElementById('scenarioBadge').textContent = data.presets[state.presetKey].label;
    document.getElementById('heroIrr').textContent = formatPercent(metrics.summary.irr10 * 100, 1);
    document.getElementById('heroFunding').textContent = formatCurrencyZarShort(metrics.summary.peakFunding);
    document.getElementById('heroBtc').textContent = `${metrics.summary.year1Btc.toFixed(1)} BTC`;
    document.getElementById('heroBreakeven').textContent = formatCurrencyUsd(metrics.summary.breakEvenUsd, 0);
  }

  function renderKpis(metrics) {
    const splitValue = `${formatMw(metrics.summary.phase1GrootvleiMw)} / ${formatMw(metrics.summary.phase1AmsaMw)}`;
    const paybackText = Number.isFinite(metrics.summary.phase1SimplePaybackYears)
      ? `${metrics.summary.phase1SimplePaybackYears.toFixed(1)} yrs`
      : 'NM';
    const cards = [
      {
        label: '10Y unlevered IRR',
        value: formatPercent(metrics.summary.irr10 * 100, 1),
        sub: 'Updated master-model base case return screen.',
        highlight: true
      },
      {
        label: 'Phase 1 split',
        value: splitValue,
        sub: `Active workbook case • AMSA solar ${formatMw(metrics.summary.phase1SolarMw)} in Year 1.`,
        highlight: false
      },
      {
        label: 'Phase 1 payback',
        value: paybackText,
        sub: 'Simple Phase 1 CAPEX basis divided by Year-1 EBITDA.',
        highlight: false
      },
      {
        label: 'Year‑1 EBITDA',
        value: formatCurrencyZarShort(metrics.summary.year1Ebitda),
        sub: 'High-level operating earnings after energy and recurring opex.',
        highlight: false
      },
      {
        label: 'Peak funding need',
        value: formatCurrencyZarShort(metrics.summary.peakFunding),
        sub: `Equity ${formatCurrencyZarShort(metrics.summary.equityDraw)} • debt ${formatCurrencyZarShort(metrics.summary.debtDraw)}.`,
        highlight: false
      },
      {
        label: 'First live revenue month',
        value: metrics.summary.firstLiveMonth || '—',
        sub: `${metrics.summary.firstPositiveMonth ? `EBITDA positive from ${metrics.summary.firstPositiveMonth}.` : 'Profitability becomes visible after energisation.'}`,
        highlight: false
      },
      {
        label: 'Break-even BTC',
        value: formatCurrencyUsd(metrics.summary.breakEvenUsd, 0),
        sub: 'Conservative operating break-even lens on Phase 1 cost structure.',
        highlight: false
      },
      {
        label: 'Year‑1 energy cost',
        value: formatCurrencyZarShort(metrics.summary.year1EnergyCost),
        sub: `${formatPercent(metrics.summary.year1SolarShare * 100, 1)} solar share in the active Phase 1 operating mix.`,
        highlight: false
      }
    ];

    kpiGrid.innerHTML = cards.map((card) => `
      <article class="kpi-card ${card.highlight ? 'highlight' : ''}">
        <div class="label">${card.label}</div>
        <div class="value">${card.value}</div>
        <div class="sub">${card.sub}</div>
      </article>
    `).join('');
  }

  function renderActiveTab(metrics) {
    switch (state.tabKey) {
      case 'strategy':
        tabContent.innerHTML = renderStrategyTab(metrics);
        break;
      case 'phase1':
        tabContent.innerHTML = renderPhase1Tab(metrics);
        break;
      case 'funding':
        tabContent.innerHTML = renderFundingTab(metrics);
        break;
      case 'platform':
        tabContent.innerHTML = renderPlatformTab(metrics);
        break;
      case 'assumptions':
        tabContent.innerHTML = renderAssumptionsTab(metrics);
        break;
      case 'overview':
      default:
        tabContent.innerHTML = renderOverviewTab(metrics);
        break;
    }
  }

  function renderOverviewTab(metrics) {
    const revenueStacks = data.strategy.revenueStack.map((stack) => `
      <div class="site-card">
        <h5>${stack.title}</h5>
        <div class="microcopy">${stack.stage}</div>
        <ul class="muted-list">
          ${stack.bullets.map((bullet) => `<li>${bullet}</li>`).join('')}
        </ul>
      </div>
    `).join('');

    return `
      <div class="tab-panel-grid">
        <div class="panel-card span-5">
          <h4>Quick investment view</h4>
          <div class="gauge" style="background: conic-gradient(var(--red) 0deg, var(--red) ${Math.max(0, Math.min(360, Math.round(((Number.isFinite(metrics.summary.irr10) ? metrics.summary.irr10 * 100 : 0) / 35) * 360)))}deg, rgba(255,255,255,0.08) ${Math.max(0, Math.min(360, Math.round(((Number.isFinite(metrics.summary.irr10) ? metrics.summary.irr10 * 100 : 0) / 35) * 360)))}deg 360deg);">
            <div class="gauge-content">
              <div class="mini-label">10Y IRR</div>
              <div class="big">${formatPercent(metrics.summary.irr10 * 100, 1)}</div>
            </div>
          </div>
          <div class="badge-row">
            <div class="badge good">${data.metadata.activeCasePack}</div>
            <div class="badge">${data.metadata.activePhase1Split}</div>
            <div class="badge ${metrics.scenario.includeAI ? 'warn' : 'good'}">Optionality ${metrics.scenario.includeAI || metrics.scenario.includeDR ? 'partly on' : 'off by default'}</div>
          </div>
          <p>
            This dashboard now behaves more like an investor committee cover page than a spreadsheet front end. It is built to answer: what is underwritten today, what is optionality, how quickly can Phase 1 be commissioned, and why does the scale path make sense?
          </p>
        </div>

        <div class="panel-card span-7">
          <h4>Growth & execution advantage</h4>
          <div class="roadmap">
            ${data.strategy.executionSignals.map((item) => `
              <div class="roadmap-step">
                <div class="phase-number">${item.title}</div>
                <div class="big">${item.value}</div>
                <p>${item.body}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="panel-card span-6 chart-area">
          <h4>5-year operating view</h4>
          ${renderGroupedBars(metrics.annual.slice(0, 5), [
            { key: 'revenue', label: 'Revenue', color: 'silver' },
            { key: 'ebitda', label: 'EBITDA', color: 'teal' },
            { key: 'capex', label: 'Capex', color: 'orange' }
          ])}
        </div>

        <div class="panel-card span-6">
          <h4>Energy stack bridge</h4>
          <div class="matrix-list">
            <div class="matrix-row"><div class="key">Phase 1 compute split</div><div>${formatMw(metrics.summary.phase1GrootvleiMw)} Grootvlei • ${formatMw(metrics.summary.phase1AmsaMw)} AMSA</div></div>
            <div class="matrix-row"><div class="key">AMSA solar in Year 1</div><div>${formatMw(metrics.summary.phase1SolarMw)}</div></div>
            <div class="matrix-row"><div class="key">Year-1 Eskom energy</div><div>${formatLargeNumber(Math.round(metrics.summary.year1Electricity))} MWh</div></div>
            <div class="matrix-row"><div class="key">Solar share of Year-1 energy</div><div>${formatPercent(metrics.summary.year1SolarShare * 100, 1)}</div></div>
            <div class="matrix-row"><div class="key">First live revenue month</div><div>${metrics.summary.firstLiveMonth || '—'}</div></div>
            <div class="matrix-row"><div class="key">EBITDA positive from</div><div>${metrics.summary.firstPositiveMonth || '—'}</div></div>
            <div class="matrix-row"><div class="key">Break-even BTC</div><div>${formatCurrencyUsd(metrics.summary.breakEvenUsd, 0)}</div></div>
          </div>
        </div>

        <div class="panel-card span-6">
          <h4>Underwritten today vs optional later</h4>
          <div class="site-grid two-up">
            ${revenueStacks}
          </div>
        </div>

        <div class="panel-card span-6">
          <h4>Site snapshot</h4>
          <div class="site-grid two-up">
            ${metrics.siteStats.map((site) => `
              <div class="site-card">
                <h5>${site.name}</h5>
                <div class="site-metric"><span>Current scale</span><strong>${formatMw(site.mw)}</strong></div>
                <div class="microcopy">${site.note}</div>
                <div>${site.chips.map((chip) => `<span class="site-chip">${chip}</span>`).join('')}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="panel-card span-12">
          <h4>Management message</h4>
          <p>${data.metadata.managementMessage}</p>
          <div class="badge-row">
            <div class="badge good">Default to conservative underwritten case</div>
            <div class="badge">Detailed model kept internal</div>
            <div class="badge warn">Strategic optionality kept separate from debt-style base case</div>
            <div class="badge">Contracts / capacity messaging visible in the first screen</div>
          </div>
        </div>
      </div>
    `;
  }

  function renderStrategyTab(metrics) {
    return `
      <div class="tab-panel-grid">
        <div class="panel-card span-6">
          <h4>What the Nedbank meeting pushed us to do</h4>
          <ul class="muted-list">
            ${data.strategy.meetingRecommendations.map((item) => `<li>${item}</li>`).join('')}
          </ul>
        </div>

        <div class="panel-card span-6">
          <h4>Why aggressive scale is rational</h4>
          <div class="matrix-list">
            <div class="matrix-row"><div class="key">Contracted power access</div><div>Current investor materials frame 500 MW+ of contracted industrial-grade power and first-four-year capacity secured through 2030.</div></div>
            <div class="matrix-row"><div class="key">Discrete step changes</div><div>Large jumps in MW are deliberate: sites come in meaningful predefined blocks and are deployed all-or-nothing per node.</div></div>
            <div class="matrix-row"><div class="key">Execution speed</div><div>Deployment materials describe modular assets that reach revenue in weeks to months, not in traditional multi-year infrastructure cycles.</div></div>
            <div class="matrix-row"><div class="key">Immediate economics</div><div>Latest investor materials explicitly frame Phase 1 as year-one profitable with hard-currency bitcoin revenue from day one of operations.</div></div>
          </div>
        </div>

        <div class="panel-card span-12">
          <h4>Phased deployment roadmap</h4>
          <div class="roadmap">
            ${data.strategy.roadmap.map((step) => `
              <div class="roadmap-step">
                <div class="phase-number">${step.phase} • ${step.timing}</div>
                <div class="big">${step.title}</div>
                <ul class="muted-list">
                  ${step.bullets.map((bullet) => `<li>${bullet}</li>`).join('')}
                </ul>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="panel-card span-6">
          <h4>Named site roadmap</h4>
          <div class="site-grid two-up">
            ${data.strategy.siteRoadmap.map((site) => `
              <div class="site-card">
                <h5>${site.name}</h5>
                <div class="microcopy">${site.timing}</div>
                <p>${site.role}</p>
                <div>${site.chips.map((chip) => `<span class="site-chip">${chip}</span>`).join('')}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="panel-card span-6">
          <h4>Moat and execution defensibility</h4>
          <ul class="muted-list">
            ${data.strategy.moatBullets.map((bullet) => `<li>${bullet}</li>`).join('')}
          </ul>
        </div>

        <div class="panel-card span-6">
          <h4>Capital ladder</h4>
          <div class="matrix-list">
            ${data.strategy.capitalLadder.map((item, idx) => `
              <div class="matrix-row"><div class="key">Step ${idx + 1}</div><div>${item}</div></div>
            `).join('')}
          </div>
        </div>

        <div class="panel-card span-6">
          <h4>Source & case-pack register</h4>
          <div class="matrix-list">
            <div class="matrix-row"><div class="key">As of</div><div>${data.metadata.asOf}</div></div>
            <div class="matrix-row"><div class="key">Active case pack</div><div>${data.metadata.activeCasePack}</div></div>
            <div class="matrix-row"><div class="key">Active Phase 1 split</div><div>${data.metadata.activePhase1Split}</div></div>
            <div class="matrix-row"><div class="key">Alternative split</div><div>${data.metadata.alternativePhase1Split}</div></div>
            <div class="matrix-row"><div class="key">Contracts horizon</div><div>${data.metadata.contractsHorizon}</div></div>
          </div>
          <ul class="muted-list top-gap">
            ${data.strategy.sourceRegister.map((src) => `<li><strong>${src.date}</strong> • ${src.title} — ${src.use}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;
  }

  function renderPhase1Tab(metrics) {
    return `
      <div class="tab-panel-grid">
        <div class="panel-card span-6 chart-area">
          <h4>Monthly deployment</h4>
          ${renderMonthlyDeployment(metrics.monthly)}
        </div>
        <div class="panel-card span-6 chart-area">
          <h4>Monthly financial profile</h4>
          ${renderMonthlyFinancials(metrics.monthly)}
        </div>
        <div class="panel-card span-12">
          <h4>Phase 1 monthly detail</h4>
          ${renderMonthlyTable(metrics.monthly)}
        </div>
      </div>
    `;
  }

  function renderFundingTab(metrics) {
    const totalFunding = metrics.summary.equityDraw + metrics.summary.debtDraw;
    const eqPct = totalFunding > 0 ? (metrics.summary.equityDraw / totalFunding) * 100 : 0;
    const debtPct = totalFunding > 0 ? (metrics.summary.debtDraw / totalFunding) * 100 : 0;
    return `
      <div class="tab-panel-grid">
        <div class="panel-card span-6">
          <h4>Model-driven external funding</h4>
          <div class="capital-stack-visual">
            <span class="cap-seg equity" style="width:${eqPct}%"></span>
            <span class="cap-seg mezz" style="width:${debtPct}%"></span>
          </div>
          <div class="legend">
            <div class="legend-row"><span class="left"><span class="dot equity"></span>Equity draw</span><strong>${formatCurrencyZarShort(metrics.summary.equityDraw)}</strong></div>
            <div class="legend-row"><span class="left"><span class="dot mezz"></span>Senior debt draw</span><strong>${formatCurrencyZarShort(metrics.summary.debtDraw)}</strong></div>
            <div class="legend-row"><span class="left"><span class="dot asset"></span>Debt fees</span><strong>${formatCurrencyZarShort(metrics.summary.debtFees)}</strong></div>
          </div>
          <p class="microcopy">This panel uses the workbook’s formula-driven 35 / 65 funding shares and monthly draw logic, not the deck’s separate asset-backed / mezzanine presentation frame.</p>
        </div>
        <div class="panel-card span-6">
          <h4>Funding metrics</h4>
          <div class="matrix-list">
            <div class="matrix-row"><div class="key">Peak funding need</div><div>${formatCurrencyZarShort(metrics.summary.peakFunding)}</div></div>
            <div class="matrix-row"><div class="key">Year‑1 capex cash spend</div><div>${formatCurrencyZarShort(metrics.summary.year1CapexCash)}</div></div>
            <div class="matrix-row"><div class="key">Year‑1 cash burn before funding</div><div>${formatCurrencyZarShort(metrics.summary.year1CashBurn)}</div></div>
            <div class="matrix-row"><div class="key">Year‑end cash</div><div>${formatCurrencyZarShort(metrics.summary.yearEndCash)}</div></div>
            <div class="matrix-row"><div class="key">Year‑end debt balance</div><div>${formatCurrencyZarShort(metrics.summary.yearEndDebt)}</div></div>
            <div class="matrix-row"><div class="key">Debt rate / grace</div><div>${formatPercent(metrics.scenario.seniorDebtRatePa * 100, 1)} • ${metrics.scenario.seniorDebtGraceMonths} months</div></div>
          </div>
        </div>
        <div class="panel-card span-7 chart-area">
          <h4>Monthly cash and debt path</h4>
          ${renderCashDebtChart(metrics.monthly)}
        </div>
        <div class="panel-card span-5">
          <h4>Model frame vs presentation frame</h4>
          <p>
            The current workbook drives the interactive funding outputs. The investor presentation still frames Phase 1 as ${formatCurrencyUsdShort(data.presentationFrame.phase1CapexUsd)} with a separate asset-backed / mezzanine / equity structure.
          </p>
          <div class="badge-row">
            <div class="badge ${Math.abs(metrics.summary.phase1CapexGapVsDeckUsd) <= 3 ? 'good' : 'warn'}">Model capex basis ${formatCurrencyUsdShort(metrics.summary.year1CapexBasis / 1000 / metrics.scenario.fx * 1000000)}</div>
            <div class="badge">${data.presentationFrame.publishedStructure}</div>
          </div>
          <p class="microcopy">This split is intentional: the website uses the model for numbers and the deck for investor framing only.</p>
        </div>
      </div>
    `;
  }

  function renderPlatformTab(metrics) {
    return `
      <div class="tab-panel-grid">
        <div class="panel-card span-7 chart-area">
          <h4>10Y compute ramp by site</h4>
          ${renderRampStack(metrics.annual)}
        </div>
        <div class="panel-card span-5 chart-area">
          <h4>10Y annual cash flow</h4>
          ${renderSingleBars(metrics.annual, 'cashflow', 'red')}
        </div>
        <div class="panel-card span-6 chart-area">
          <h4>10Y solar ramp</h4>
          ${renderSingleBars(metrics.annual, 'solarMw', 'orange', 'MW')}
        </div>
        <div class="panel-card span-6">
          <h4>10Y summary</h4>
          <div class="matrix-list">
            <div class="matrix-row"><div class="key">Cumulative revenue</div><div>${formatCurrencyZarShort(metrics.summary.cumulativeRevenue)}</div></div>
            <div class="matrix-row"><div class="key">Cumulative EBITDA</div><div>${formatCurrencyZarShort(metrics.summary.cumulativeEbitda)}</div></div>
            <div class="matrix-row"><div class="key">Cumulative capex</div><div>${formatCurrencyZarShort(metrics.summary.cumulativeCapex)}</div></div>
            <div class="matrix-row"><div class="key">End-state compute MW</div><div>${formatMw(metrics.summary.maxAnnualMw)}</div></div>
            <div class="matrix-row"><div class="key">End-state solar MW</div><div>${formatMw(metrics.summary.maxAnnualSolarMw)}</div></div>
            <div class="matrix-row"><div class="key">Final year EBITDA</div><div>${formatCurrencyZarShort(metrics.summary.finalYear.ebitda)}</div></div>
          </div>
        </div>
      </div>
    `;
  }

  function renderAssumptionsTab(metrics) {
    const quotedSubtotal = sum(data.electricalBasis.quotedPackages);
    return `
      <div class="tab-panel-grid">
        <div class="panel-card span-6">
          <h4>Core operating assumptions</h4>
          <div class="matrix-list">
            <div class="matrix-row"><div class="key">BTC start / growth</div><div>${formatCurrencyUsd(metrics.scenario.btcPriceStart, 0)} • ${formatPercent(metrics.scenario.btcGrowth * 100, 1)}</div></div>
            <div class="matrix-row"><div class="key">Network hash start / growth</div><div>${formatLargeNumber(metrics.scenario.networkHashStart)} TH/s • ${formatPercent(metrics.scenario.networkHashGrowth * 100, 1)}</div></div>
            <div class="matrix-row"><div class="key">Uptime</div><div>${formatPercent(metrics.scenario.uptime * 100, 1)}</div></div>
            <div class="matrix-row"><div class="key">Miner hashrate / efficiency</div><div>${metrics.scenario.minerHashrate.toFixed(0)} TH • ${metrics.scenario.minerEfficiency.toFixed(1)} J/TH</div></div>
            <div class="matrix-row"><div class="key">Tariffs</div><div>GVL ${formatCurrencyZar(metrics.scenario.grootvleiTariff, 2)} / AMSA ${formatCurrencyZar(metrics.scenario.amsaTariff, 2)} per kWh</div></div>
            <div class="matrix-row"><div class="key">Funding split</div><div>${formatPercent(metrics.scenario.equityShare * 100, 0)} equity / ${formatPercent((1 - metrics.scenario.equityShare) * 100, 0)} senior debt</div></div>
          </div>
        </div>
        <div class="panel-card span-6">
          <h4>Electrical EPC basis</h4>
          <p>${data.electricalBasis.quotedLabel}</p>
          <div class="matrix-list">
            <div class="matrix-row"><div class="key">Quoted subtotal</div><div>${formatCurrencyZarShort(quotedSubtotal)}</div></div>
            <div class="matrix-row"><div class="key">All-in 20 MW electrical EPC</div><div>${formatCurrencyZarShort(metrics.scenario.allInElectrical20Mw)}</div></div>
            <div class="matrix-row"><div class="key">Site-fixed portion</div><div>${formatCurrencyZarShort(metrics.scenario.electricalSiteFixedCost)}</div></div>
            <div class="matrix-row"><div class="key">Variable portion / MW</div><div>${formatCurrencyZarShort(metrics.scenario.electricalVariablePerMw)}</div></div>
          </div>
        </div>
        <div class="panel-card span-7 chart-area">
          <h4>BTC × tariff sensitivity</h4>
          ${renderSensitivityHeatmap(metrics.sensitivity)}
        </div>
        <div class="panel-card span-5">
          <h4>Source, version & case-pack</h4>
          <div class="matrix-list">
            <div class="matrix-row"><div class="key">As of</div><div>${data.metadata.asOf}</div></div>
            <div class="matrix-row"><div class="key">Active case pack</div><div>${data.metadata.activeCasePack}</div></div>
            <div class="matrix-row"><div class="key">Phase 1 split</div><div>${data.metadata.activePhase1Split}</div></div>
            <div class="matrix-row"><div class="key">Alternative planning case</div><div>${data.metadata.alternativePhase1Split}</div></div>
          </div>
          <ul class="muted-list top-gap">
            ${data.strategy.sourceRegister.map((src) => `<li><strong>${src.date}</strong> • ${src.title} — ${src.use}</li>`).join('')}
          </ul>
          <a class="secondary-btn full top-gap" href="${data.modelDownloadUrl}" target="_blank" rel="noopener">Open detailed model</a>
        </div>
      </div>
    `;
  }

  function renderSnapshots() {
    snapshotGrid.innerHTML = state.snapshots.map((snap) => `
      <div class="snapshot-card">
        <h4>${snap.label}</h4>
        <div class="meta">${snap.createdAt}</div>
        <div class="stats">
          <div><span>10Y IRR</span><strong>${formatPercent(snap.summary.irr, 1)}</strong></div>
          <div><span>Peak funding</span><strong>${formatCurrencyZarShort(snap.summary.funding)}</strong></div>
          <div><span>Year‑1 EBITDA</span><strong>${formatCurrencyZarShort(snap.summary.ebitda)}</strong></div>
          <div><span>Break-even BTC</span><strong>${formatCurrencyUsd(snap.summary.breakEven, 0)}</strong></div>
        </div>
      </div>
    `).join('');
  }

  function snapshotSummary(metrics) {
    return {
      irr: metrics.summary.irr10 * 100,
      funding: metrics.summary.peakFunding,
      ebitda: metrics.summary.year1Ebitda,
      breakEven: metrics.summary.breakEvenUsd
    };
  }

  function updateValueLabels(scenario) {
    valueSpans.phase1Mw.textContent = formatMw(scenario.phase1TotalMw);
    valueSpans.amsaShare.textContent = formatPercent(scenario.amsaShare * 100, 0);
    valueSpans.solarMw.textContent = formatMw(scenario.amsaSolarMwYear1);
    valueSpans.btc.textContent = formatCurrencyUsd(scenario.btcPriceStart, 0);
    valueSpans.btcGrowth.textContent = formatPercent(scenario.btcGrowth * 100, 1);
    valueSpans.networkGrowth.textContent = formatPercent(scenario.networkHashGrowth * 100, 1);
    valueSpans.uptime.textContent = formatPercent(scenario.uptime * 100, 1);
    valueSpans.grootvleiTariff.textContent = `${formatCurrencyZar(scenario.grootvleiTariff, 2)}`;
    valueSpans.amsaTariff.textContent = `${formatCurrencyZar(scenario.amsaTariff, 2)}`;
    valueSpans.hashrate.textContent = `${scenario.minerHashrate.toFixed(0)} TH`;
    valueSpans.efficiency.textContent = `${scenario.minerEfficiency.toFixed(1)} J/TH`;
    valueSpans.minerPrice.textContent = formatCurrencyUsd(scenario.minerPriceUsd, 0);
    valueSpans.solarCapex.textContent = `${formatCurrencyZarShort(scenario.solarCapexPerMw).replace('R', 'R')}/MW`;
    valueSpans.drPrice.textContent = `${formatCurrencyZar(scenario.drPrice, 2)}`;
    valueSpans.aiPrice.textContent = `${formatCurrencyUsd(scenario.annualAiPriceUsdMWh, 0)}`;
    valueSpans.debtRate.textContent = formatPercent(scenario.seniorDebtRatePa * 100, 1);
    valueSpans.equityShare.textContent = formatPercent(scenario.equityShare * 100, 0);
    valueSpans.rampFactor.textContent = `${scenario.rampFactor.toFixed(2)}x`;
  }

  function renderGroupedBars(rows, series) {
    const maxValue = Math.max.apply(null, rows.flatMap((row) => series.map((item) => Math.abs(row[item.key]))));
    return `
      <div class="bar-chart grouped-chart">
        ${rows.map((row) => `
          <div class="group-block">
            <div class="group-title">${row.year}</div>
            ${series.map((item) => `
              <div class="bar-row compact">
                <div class="small-label">${item.label}</div>
                <div class="bar-rail"><div class="bar-fill ${item.color}" style="width:${maxValue > 0 ? (Math.abs(row[item.key]) / maxValue) * 100 : 0}%"></div></div>
                <div class="small-value">${formatCurrencyZarShort(row[item.key])}</div>
              </div>
            `).join('')}
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderSingleBars(rows, key, color, units) {
    const maxValue = Math.max.apply(null, rows.map((row) => Math.abs(row[key])));
    return `
      <div class="bar-chart">
        ${rows.map((row) => `
          <div class="bar-row">
            <div class="small-label">${row.year}</div>
            <div class="bar-rail"><div class="bar-fill ${color}" style="width:${maxValue > 0 ? (Math.abs(row[key]) / maxValue) * 100 : 0}%"></div></div>
            <div class="small-value">${units === 'MW' ? formatMw(row[key]) : formatCurrencyZarShort(row[key])}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderRampStack(rows) {
    const maxValue = Math.max.apply(null, rows.map((row) => row.totalMw));
    const siteOrder = ['grootvlei', 'amsaVB', 'newcastle', 'saldanha', 'komati'];
    const colors = {
      grootvlei: '#ff365e',
      amsaVB: '#cbd5e1',
      newcastle: '#2dd4bf',
      saldanha: '#ffb454',
      komati: '#64748b'
    };
    return `
      <div class="bar-chart">
        ${rows.map((row) => `
          <div class="bar-row stack-row">
            <div class="small-label">${row.year}</div>
            <div class="bar-rail stack-rail">
              ${siteOrder.map((site) => `<span class="stack-segment" style="width:${maxValue > 0 ? (row.compute[site] / maxValue) * 100 : 0}%; background:${colors[site]}"></span>`).join('')}
            </div>
            <div class="small-value">${formatMw(row.totalMw)}</div>
          </div>
        `).join('')}
        <div class="legend top-gap">
          ${siteOrder.map((site) => `<div class="legend-row"><span class="left"><span class="dot" style="background:${colors[site]}"></span>${data.siteLabels[site]}</span></div>`).join('')}
        </div>
      </div>
    `;
  }

  function renderMonthlyDeployment(rows) {
    const maxValue = Math.max.apply(null, rows.map((row) => row.gClose + row.aClose));
    return `
      <div class="bar-chart">
        ${rows.map((row) => `
          <div class="bar-row stack-row">
            <div class="small-label">${row.month}</div>
            <div class="bar-rail stack-rail">
              <span class="stack-segment" style="width:${maxValue > 0 ? (row.gClose / maxValue) * 100 : 0}%; background:#ff365e"></span>
              <span class="stack-segment" style="width:${maxValue > 0 ? (row.aClose / maxValue) * 100 : 0}%; background:#cbd5e1"></span>
              <span class="stack-segment overlay" style="width:${maxValue > 0 ? (row.sClose / maxValue) * 100 : 0}%; background:rgba(45,212,191,0.55)"></span>
            </div>
            <div class="small-value">${formatMw(row.gClose + row.aClose)}</div>
          </div>
        `).join('')}
        <div class="legend top-gap">
          <div class="legend-row"><span class="left"><span class="dot" style="background:#ff365e"></span>Grootvlei</span></div>
          <div class="legend-row"><span class="left"><span class="dot" style="background:#cbd5e1"></span>AMSA</span></div>
          <div class="legend-row"><span class="left"><span class="dot" style="background:#2dd4bf"></span>AMSA solar</span></div>
        </div>
      </div>
    `;
  }

  function renderMonthlyFinancials(rows) {
    const maxValue = Math.max.apply(null, rows.flatMap((row) => [Math.abs(row.revenue), Math.abs(row.opex), Math.abs(row.capexCash)]));
    return `
      <div class="bar-chart grouped-chart">
        ${rows.map((row) => `
          <div class="group-block">
            <div class="group-title">${row.month}</div>
            <div class="bar-row compact"><div class="small-label">Revenue</div><div class="bar-rail"><div class="bar-fill silver" style="width:${maxValue > 0 ? (Math.abs(row.revenue) / maxValue) * 100 : 0}%"></div></div><div class="small-value">${formatCurrencyZarShort(row.revenue)}</div></div>
            <div class="bar-row compact"><div class="small-label">Opex</div><div class="bar-rail"><div class="bar-fill dark" style="width:${maxValue > 0 ? (Math.abs(row.opex) / maxValue) * 100 : 0}%"></div></div><div class="small-value">${formatCurrencyZarShort(row.opex)}</div></div>
            <div class="bar-row compact"><div class="small-label">Capex</div><div class="bar-rail"><div class="bar-fill orange" style="width:${maxValue > 0 ? (Math.abs(row.capexCash) / maxValue) * 100 : 0}%"></div></div><div class="small-value">${formatCurrencyZarShort(row.capexCash)}</div></div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderMonthlyTable(rows) {
    return `
      <div class="table-wrap">
        <table class="metrics-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Avg MW</th>
              <th>BTC mined</th>
              <th>Revenue</th>
              <th>Opex</th>
              <th>Capex cash</th>
              <th>Unlevered CF</th>
              <th>Funding</th>
              <th>Ending cash</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map((row) => `
              <tr>
                <td>${row.month}</td>
                <td>${formatMw(row.totalAvgMw)}</td>
                <td>${row.btcMined.toFixed(1)}</td>
                <td>${formatCurrencyZarShort(row.revenue)}</td>
                <td>${formatCurrencyZarShort(row.opex)}</td>
                <td>${formatCurrencyZarShort(row.capexCash)}</td>
                <td class="${row.unleveredCF < 0 ? 'neg' : ''}">${formatCurrencyZarShort(row.unleveredCF)}</td>
                <td>${formatCurrencyZarShort(row.netFunding)}</td>
                <td>${formatCurrencyZarShort(row.cashClose)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderCashDebtChart(rows) {
    const maxValue = Math.max.apply(null, rows.flatMap((row) => [Math.abs(row.cashClose), Math.abs(row.debtClose)]));
    return `
      <div class="bar-chart grouped-chart">
        ${rows.map((row) => `
          <div class="group-block">
            <div class="group-title">${row.month}</div>
            <div class="bar-row compact"><div class="small-label">Cash</div><div class="bar-rail"><div class="bar-fill teal" style="width:${maxValue > 0 ? (Math.abs(row.cashClose) / maxValue) * 100 : 0}%"></div></div><div class="small-value">${formatCurrencyZarShort(row.cashClose)}</div></div>
            <div class="bar-row compact"><div class="small-label">Debt</div><div class="bar-rail"><div class="bar-fill red" style="width:${maxValue > 0 ? (Math.abs(row.debtClose) / maxValue) * 100 : 0}%"></div></div><div class="small-value">${formatCurrencyZarShort(row.debtClose)}</div></div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderValueBridge(metrics) {
    const s = metrics.summary;
    const items = [
      { label: 'Year‑1 revenue', value: s.year1Revenue, color: 'silver' },
      { label: 'Less opex', value: -s.year1Opex, color: 'dark' },
      { label: 'Year‑1 EBITDA', value: s.year1Ebitda, color: 'teal' },
      { label: 'Less capex cash', value: -s.year1CapexCash, color: 'orange' },
      { label: 'Cash burn', value: s.year1CashBurn, color: 'red' }
    ];
    const maxValue = Math.max.apply(null, items.map((item) => Math.abs(item.value)));
    return `
      <div class="bar-chart">
        ${items.map((item) => `
          <div class="bar-row">
            <div class="small-label">${item.label}</div>
            <div class="bar-rail"><div class="bar-fill ${item.color}" style="width:${maxValue > 0 ? (Math.abs(item.value) / maxValue) * 100 : 0}%"></div></div>
            <div class="small-value ${item.value < 0 ? 'neg' : ''}">${formatCurrencyZarShort(item.value)}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderSensitivityHeatmap(sensitivity) {
    const finiteCells = sensitivity.cells.flatMap((row) => row.map((cell) => cell.irr)).filter((value) => Number.isFinite(value));
    const maxAbs = finiteCells.length ? Math.max.apply(null, finiteCells.map((value) => Math.abs(value))) : 0;
    const columnHeaders = sensitivity.btcLevels
      .map((btc) => `<div class="heat-label">${formatCurrencyUsd(btc, 0)}</div>`)
      .join('');
    const rows = sensitivity.tariffLevels.map((tariff, rowIndex) => {
      const cells = sensitivity.cells[rowIndex].map((cell) => {
        const finiteIrr = Number.isFinite(cell.irr);
        const ratio = finiteIrr && maxAbs > 0 ? Math.abs(cell.irr) / maxAbs : 0;
        const bg = !finiteIrr
          ? 'rgba(255,255,255,0.05)'
          : cell.irr >= 0
            ? `rgba(45,212,191,${0.10 + ratio * 0.35})`
            : `rgba(255,107,107,${0.10 + ratio * 0.35})`;
        return `<div class="heat-cell" style="background:${bg}">${formatPercent(cell.irr, 1)}<span>${formatCurrencyZarShort(cell.ebitda)}</span></div>`;
      }).join('');
      return `<div class="heat-label">${formatCurrencyZar(tariff, 2)}</div>${cells}`;
    }).join('');
    return `
      <div class="heatmap">
        <div class="heat-label"></div>
        ${columnHeaders}
        ${rows}
      </div>
    `;
  }

  function updateSourceFooter() {
    sourceNotesFooter.textContent = data.sourceNotes.join(' • ');
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function ceilDiv(value, divisor) {
    return value > 0 ? Math.ceil(value / divisor - 1e-12) : 0;
  }

  function shiftValue(array, lookAhead, index) {
    const target = index + lookAhead;
    return target >= 0 && target < array.length ? array[target] : 0;
  }

  function scaleSchedule(base, baseTarget, target) {
    return base.map((value) => value * target / baseTarget);
  }

  function sum(values) {
    return values.reduce((acc, value) => acc + value, 0);
  }

  function round(value, decimals) {
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
  }

  function roundTo(value, step) {
    return Math.round(value / step) * step;
  }

  function irr(cashflows) {
    function npv(rate) {
      return cashflows.reduce((acc, cf, index) => acc + cf / Math.pow(1 + rate, index), 0);
    }
    let low = -0.9999;
    let high = 10;
    let fLow = npv(low);
    let fHigh = npv(high);
    if (!Number.isFinite(fLow) || !Number.isFinite(fHigh)) return NaN;
    if (fLow * fHigh > 0) {
      for (let i = 0; i < 30; i += 1) {
        high *= 2;
        fHigh = npv(high);
        if (fLow * fHigh <= 0) break;
      }
      if (fLow * fHigh > 0) return NaN;
    }
    for (let i = 0; i < 200; i += 1) {
      const mid = (low + high) / 2;
      const fMid = npv(mid);
      if (Math.abs(fMid) < 1e-8) return mid;
      if (fLow * fMid <= 0) {
        high = mid;
        fHigh = fMid;
      } else {
        low = mid;
        fLow = fMid;
      }
    }
    return (low + high) / 2;
  }

  function formatCurrencyUsd(value, digits) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: digits,
      minimumFractionDigits: digits
    }).format(value);
  }

  function formatCurrencyZar(value, digits) {
    return `R${Number(value).toFixed(digits)}`;
  }

  function formatCurrencyZarShort(kValue) {
    const actual = kValue * 1000;
    const sign = actual < 0 ? '-' : '';
    const abs = Math.abs(actual);
    if (abs >= 1e9) return `${sign}R${(abs / 1e9).toFixed(1)}bn`;
    if (abs >= 1e6) return `${sign}R${(abs / 1e6).toFixed(1)}m`;
    if (abs >= 1e3) return `${sign}R${(abs / 1e3).toFixed(0)}k`;
    return `${sign}R${abs.toFixed(0)}`;
  }

  function formatCurrencyUsdShort(value) {
    const sign = value < 0 ? '-' : '';
    const abs = Math.abs(value);
    if (abs >= 1e9) return `${sign}$${(abs / 1e9).toFixed(1)}bn`;
    if (abs >= 1e6) return `${sign}$${(abs / 1e6).toFixed(1)}m`;
    if (abs >= 1e3) return `${sign}$${(abs / 1e3).toFixed(0)}k`;
    return `${sign}$${abs.toFixed(0)}`;
  }

  function formatPercent(value, digits) {
    return Number.isFinite(value) ? `${Number(value).toFixed(digits)}%` : 'NM';
  }

  function formatMw(value) {
    return `${Number(value).toFixed(value % 1 === 0 ? 0 : 1)} MW`;
  }

  function formatLargeNumber(value) {
    if (value >= 1e9) return (value / 1e9).toFixed(2).replace(/\.00$/, '') + 'bn';
    if (value >= 1e6) return (value / 1e6).toFixed(1).replace(/\.0$/, '') + 'm';
    return value.toLocaleString('en-US');
  }
})();
