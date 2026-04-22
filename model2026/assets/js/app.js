(function () {
  const data = window.BITMACH_DATA;
  const phaseButtons = document.getElementById('phaseButtons');
  const presetButtons = document.getElementById('presetButtons');
  const tabHeader = document.getElementById('tabHeader');
  const tabContent = document.getElementById('tabContent');
  const kpiGrid = document.getElementById('kpiGrid');
  const snapshotGrid = document.getElementById('snapshotGrid');
  const comparisonSection = document.getElementById('comparisonSection');

  const controls = {
    totalMw: document.getElementById('totalMwRange'),
    btc: document.getElementById('btcRange'),
    gridTariff: document.getElementById('gridTariffRange'),
    solarShare: document.getElementById('solarShareRange'),
    uptimeHours: document.getElementById('uptimeRange'),
    jPerTh: document.getElementById('efficiencyRange'),
    pricePerTh: document.getElementById('pricePerThRange'),
    difficultyGrowth: document.getElementById('difficultyGrowthRange'),
    btcGrowth: document.getElementById('btcGrowthRange'),
    drRebate: document.getElementById('drRebateRange'),
    drParticipation: document.getElementById('drParticipationRange'),
    amsaShare: document.getElementById('amsaMixRange'),
    newcastleShare: document.getElementById('newcastleMixRange'),
    aiUpside: document.getElementById('aiToggle'),
    comparisonMode: document.getElementById('comparisonModeToggle')
  };

  const valueSpans = {
    totalMw: document.getElementById('totalMwValue'),
    btc: document.getElementById('btcValue'),
    gridTariff: document.getElementById('gridTariffValue'),
    solarShare: document.getElementById('solarShareValue'),
    uptimeHours: document.getElementById('uptimeValue'),
    jPerTh: document.getElementById('efficiencyValue'),
    pricePerTh: document.getElementById('pricePerThValue'),
    difficultyGrowth: document.getElementById('difficultyGrowthValue'),
    btcGrowth: document.getElementById('btcGrowthValue'),
    drRebate: document.getElementById('drRebateValue'),
    drParticipation: document.getElementById('drParticipationValue'),
    amsaShare: document.getElementById('amsaMixValue'),
    newcastleShare: document.getElementById('newcastleMixValue')
  };

  let state = {
    phaseKey: 'phase2',
    presetKey: 'base',
    tabKey: 'overview',
    investorMode: false,
    comparisonMode: false,
    snapshots: [],
    urlOverrides: null
  };

  hydrateFromUrl();
  applyPreset(state.phaseKey, state.presetKey, true);
  applyUrlOverrides();
  renderStructure();
  bindEvents();
  render();

  function hydrateFromUrl() {
    try {
      const params = new URLSearchParams(window.location.hash.replace(/^#/, ''));
      if (params.get('phase') && data.phasePresets[params.get('phase')]) state.phaseKey = params.get('phase');
      if (params.get('preset') && data.scenarioPresets[params.get('preset')]) state.presetKey = params.get('preset');
      state.tabKey = params.get('tab') || state.tabKey;
      state.urlOverrides = {
        totalMw: params.get('mw'),
        btcUsd: params.get('btc'),
        gridTariff: params.get('tariff'),
        solarShare: params.get('solar'),
        uptimeHours: params.get('uptime'),
        jPerTh: params.get('eff'),
        pricePerTh: params.get('pth'),
        difficultyGrowth: params.get('diff'),
        btcGrowth: params.get('btcg'),
        drRebate: params.get('dr'),
        drParticipation: params.get('drp'),
        amsaShare: params.get('amsa'),
        newcastleShare: params.get('newc'),
        aiUpside: params.get('ai')
      };
    } catch (err) {
      console.warn('Could not read URL state', err);
    }
  }

  function writeUrlState() {
    const current = getScenarioState();
    const params = new URLSearchParams();
    params.set('phase', state.phaseKey);
    params.set('preset', state.presetKey);
    params.set('tab', state.tabKey);
    params.set('mw', current.totalMw.toFixed(0));
    params.set('btc', current.btcUsd.toFixed(0));
    params.set('tariff', current.gridTariff.toFixed(2));
    params.set('solar', current.solarShare.toFixed(2));
    params.set('uptime', current.uptimeHours.toFixed(0));
    params.set('eff', current.jPerTh.toFixed(1));
    params.set('pth', current.pricePerTh.toFixed(2));
    params.set('diff', current.difficultyGrowth.toFixed(2));
    params.set('btcg', current.btcGrowth.toFixed(2));
    params.set('dr', current.drRebate.toFixed(2));
    params.set('drp', current.drParticipation.toFixed(2));
    params.set('amsa', current.amsaShare.toFixed(2));
    params.set('newc', current.newcastleShare.toFixed(2));
    params.set('ai', current.aiUpside ? '1' : '0');
    window.location.hash = params.toString();
  }


  function applyUrlOverrides() {
    if (!state.urlOverrides) return;
    const o = state.urlOverrides;
    if (o.totalMw) controls.totalMw.value = o.totalMw;
    if (o.btcUsd) controls.btc.value = o.btcUsd;
    if (o.gridTariff) controls.gridTariff.value = o.gridTariff;
    if (o.solarShare) controls.solarShare.value = o.solarShare;
    if (o.uptimeHours) controls.uptimeHours.value = o.uptimeHours;
    if (o.jPerTh) controls.jPerTh.value = o.jPerTh;
    if (o.pricePerTh) controls.pricePerTh.value = o.pricePerTh;
    if (o.difficultyGrowth) controls.difficultyGrowth.value = o.difficultyGrowth;
    if (o.btcGrowth) controls.btcGrowth.value = o.btcGrowth;
    if (o.drRebate) controls.drRebate.value = o.drRebate;
    if (o.drParticipation) controls.drParticipation.value = o.drParticipation;
    if (o.amsaShare) controls.amsaShare.value = o.amsaShare;
    if (o.newcastleShare) controls.newcastleShare.value = o.newcastleShare;
    if (o.aiUpside !== null && o.aiUpside !== undefined) controls.aiUpside.checked = o.aiUpside === '1';
  }

  function renderStructure() {
    renderPhaseButtons();
    renderPresetButtons();
    renderTabs();
  }

  function renderPhaseButtons() {
    phaseButtons.innerHTML = '';
    Object.values(data.phasePresets).forEach((phase) => {
      const btn = document.createElement('button');
      btn.className = `segment-btn ${phase.key === state.phaseKey ? 'active' : ''}`;
      btn.textContent = phase.label;
      btn.addEventListener('click', () => {
        state.phaseKey = phase.key;
        applyPreset(state.phaseKey, state.presetKey, false);
        renderStructure();
        render();
      });
      phaseButtons.appendChild(btn);
    });
  }

  function renderPresetButtons() {
    presetButtons.innerHTML = '';
    Object.values(data.scenarioPresets).forEach((preset) => {
      const btn = document.createElement('button');
      btn.className = `segment-btn ${preset.key === state.presetKey ? 'active' : ''}`;
      btn.textContent = preset.label;
      btn.addEventListener('click', () => {
        state.presetKey = preset.key;
        applyPreset(state.phaseKey, state.presetKey, false);
        renderStructure();
        render();
      });
      presetButtons.appendChild(btn);
    });
  }

  function renderTabs() {
    tabHeader.innerHTML = '';
    data.tabs.forEach((tab) => {
      const btn = document.createElement('button');
      btn.className = `tab-btn ${tab.key === state.tabKey ? 'active' : ''}`;
      btn.textContent = tab.label;
      btn.addEventListener('click', () => {
        state.tabKey = tab.key;
        renderTabs();
        render();
      });
      tabHeader.appendChild(btn);
    });
  }

  function bindEvents() {
    Object.entries(controls).forEach(([key, control]) => {
      const eventName = control.type === 'checkbox' ? 'change' : 'input';
      control.addEventListener(eventName, () => {
        if (key === 'comparisonMode') {
          state.comparisonMode = control.checked;
        }
        render();
      });
    });

    document.getElementById('resetBtn').addEventListener('click', () => {
      applyPreset(state.phaseKey, state.presetKey, false);
      render();
    });

    document.getElementById('investorModeBtn').addEventListener('click', () => {
      state.investorMode = !state.investorMode;
      document.body.classList.toggle('investor-mode', state.investorMode);
    });

    document.getElementById('shareScenarioBtn').addEventListener('click', async () => {
      writeUrlState();
      try {
        await navigator.clipboard.writeText(window.location.href);
        document.getElementById('shareScenarioBtn').textContent = 'Scenario link copied';
        setTimeout(() => { document.getElementById('shareScenarioBtn').textContent = 'Copy scenario link'; }, 1600);
      } catch (err) {
        console.warn(err);
      }
    });

    document.getElementById('saveSnapshotBtn').addEventListener('click', () => {
      const metrics = computeScenario();
      state.snapshots.unshift({
        id: `${Date.now()}`,
        label: `${data.phasePresets[state.phaseKey].label} • ${data.scenarioPresets[state.presetKey].label}`,
        createdAt: new Date().toLocaleString(),
        metrics
      });
      state.snapshots = state.snapshots.slice(0, 6);
      state.comparisonMode = true;
      controls.comparisonMode.checked = true;
      renderSnapshots();
      render();
    });

    document.getElementById('clearSnapshotsBtn').addEventListener('click', () => {
      state.snapshots = [];
      renderSnapshots();
      render();
    });
  }

  function applyPreset(phaseKey, presetKey, skipRender) {
    const phase = data.phasePresets[phaseKey];
    const preset = data.scenarioPresets[presetKey];
    const range = phase.mwRange;
    controls.totalMw.min = range[0];
    controls.totalMw.max = range[1];
    controls.totalMw.step = range[2];
    controls.totalMw.value = phase.mw;
    controls.btc.value = preset.btcUsd;
    controls.gridTariff.value = preset.gridTariff;
    controls.solarShare.value = phase.solarShare;
    controls.uptimeHours.value = preset.uptimeHours;
    controls.jPerTh.value = preset.jPerTh;
    controls.pricePerTh.value = preset.pricePerTh;
    controls.difficultyGrowth.value = preset.difficultyGrowth;
    controls.btcGrowth.value = preset.btcGrowth;
    controls.drRebate.value = preset.drRebate;
    controls.drParticipation.value = preset.drParticipation;
    controls.amsaShare.value = phase.amsaShare;
    controls.newcastleShare.value = phase.newcastleShare;
    controls.aiUpside.checked = phase.aiUpside || preset.aiUpside;
    controls.comparisonMode.checked = state.comparisonMode;
    if (!skipRender) render();
  }

  function getScenarioState() {
    const normalizedMix = normalizeMix(parseFloat(controls.amsaShare.value), parseFloat(controls.newcastleShare.value));
    return {
      phaseKey: state.phaseKey,
      presetKey: state.presetKey,
      totalMw: parseFloat(controls.totalMw.value),
      btcUsd: parseFloat(controls.btc.value),
      gridTariff: parseFloat(controls.gridTariff.value),
      solarShare: parseFloat(controls.solarShare.value),
      uptimeHours: parseFloat(controls.uptimeHours.value),
      jPerTh: parseFloat(controls.jPerTh.value),
      pricePerTh: parseFloat(controls.pricePerTh.value),
      difficultyGrowth: parseFloat(controls.difficultyGrowth.value),
      btcGrowth: parseFloat(controls.btcGrowth.value),
      drRebate: parseFloat(controls.drRebate.value),
      drParticipation: parseFloat(controls.drParticipation.value),
      amsaShare: normalizedMix.amsa,
      newcastleShare: normalizedMix.newcastle,
      grootvleiShare: normalizedMix.grootvlei,
      aiUpside: controls.aiUpside.checked
    };
  }

  function normalizeMix(amsa, newcastle) {
    const a = clamp(amsa, 0, 1);
    const n = clamp(newcastle, 0, 0.6);
    const cappedN = Math.min(n, 1 - a);
    const g = Math.max(0, 1 - a - cappedN);
    return { amsa: a, newcastle: cappedN, grootvlei: g };
  }

  function computeScenario() {
    const c = data.constants;
    const s = getScenarioState();

    const tariffs = {
      grootvlei: s.gridTariff,
      amsa: (s.gridTariff * (1 - s.solarShare)) + (c.solarTariff * s.solarShare) + 0.03,
      newcastle: (s.gridTariff * (1 - clamp(s.solarShare + 0.15, 0, 0.85))) + (c.solarTariff * clamp(s.solarShare + 0.15, 0, 0.85))
    };

    const blendedTariff = (s.grootvleiShare * tariffs.grootvlei) + (s.amsaShare * tariffs.amsa) + (s.newcastleShare * tariffs.newcastle);
    const annualEnergyKwh = s.totalMw * 1000 * s.uptimeHours * c.daysPerYear;
    const effectivePowerW = s.totalMw * 1000000 * (1 - c.parasiticLossPct) * (s.uptimeHours / 24);
    const hashrateTh = effectivePowerW / s.jPerTh;
    const hashrateEh = hashrateTh / 1000000;
    const shareOfNetwork = hashrateTh / c.globalHashrateTh;
    const annualBtcMined = shareOfNetwork * (c.blockRewardNow * c.blocksPerHour * 24 * c.daysPerYear) * (1 + c.preHalvingFeesPct);
    const btcRevenueZar = annualBtcMined * s.btcUsd * c.fx;

    const hardwareCapexUsdPerMw = (1000000 / s.jPerTh) * s.pricePerTh;
    const totalCapexUsd = s.totalMw * (hardwareCapexUsdPerMw + c.baseCapexInfraPerMwUsd);
    const totalCapexZar = totalCapexUsd * c.fx;

    const staffCost = s.totalMw * c.staffPerMw * c.staffCostZar;
    const siteOpsCost = s.totalMw * c.siteOpsPerMwZar;
    const maintenanceCost = totalCapexZar * c.maintenancePctCapex;
    const demandResponseRevenue = annualEnergyKwh * s.drParticipation * s.drRebate;
    const aiUpsideRevenue = s.aiUpside ? Math.max(0, s.totalMw - 20) * 2200000 : 0;
    const otherOpex = staffCost + siteOpsCost + maintenanceCost;
    const energyCost = annualEnergyKwh * blendedTariff;
    const ebitdaZar = btcRevenueZar + demandResponseRevenue + aiUpsideRevenue - energyCost - otherOpex;
    const breakEvenBtcUsd = ((energyCost + otherOpex - demandResponseRevenue) / Math.max(annualBtcMined, 1)) / c.fx;
    const cashYieldPct = clamp((ebitdaZar / Math.max(totalCapexZar, 1)) * 100, -10, 70);

    const irrIndicative = clamp(
      18.5
      + ((s.btcUsd - 60000) / 1000) * 0.18
      + (1.0 - blendedTariff) * 18
      + (s.solarShare * 6)
      + ((13.5 - s.jPerTh) * 1.2)
      + (s.aiUpside ? 4 : 0)
      - ((s.difficultyGrowth - 0.15) * 30),
      8,
      45
    );

    const referenceEvUsd = s.phaseKey === 'phase2'
      ? c.notionalPlatformEvUsd
      : Math.max(totalCapexUsd * 1.15, c.notionalPlatformEvUsd * (s.totalMw / 100) * (s.phaseKey === 'phase3' ? 1.15 : 0.8));

    const dsraInterestZar = c.phase1CapitalStack.mezzUsd * c.fx * c.dmtnRate * 0.25;

    const years = buildYearSeries(s, blendedTariff, otherOpex, demandResponseRevenue, aiUpsideRevenue, hashrateTh);

    return {
      ...s,
      blendedTariff,
      tariffs,
      annualEnergyKwh,
      hashrateEh,
      annualBtcMined,
      btcRevenueZar,
      demandResponseRevenue,
      aiUpsideRevenue,
      totalCapexUsd,
      totalCapexZar,
      staffCost,
      siteOpsCost,
      maintenanceCost,
      otherOpex,
      energyCost,
      ebitdaZar,
      breakEvenBtcUsd,
      cashYieldPct,
      irrIndicative,
      shareOfNetwork,
      referenceEvUsd,
      dsraInterestZar,
      years,
      capStack: {
        assetBackedUsd: totalCapexUsd * c.phase1CapitalStack.assetBackedPct,
        equityUsd: totalCapexUsd * c.phase1CapitalStack.equityPct,
        mezzUsd: totalCapexUsd * c.phase1CapitalStack.mezzPct
      }
    };
  }

  function buildYearSeries(stateInput, blendedTariff, otherOpex, baseDRRevenue, baseAiUpsideRevenue, hashrateTh) {
    const c = data.constants;
    const years = [];
    let btcPrice = stateInput.btcUsd * c.fx;
    let globalHashrate = c.globalHashrateTh;
    let tariff = blendedTariff;
    for (let year = 1; year <= 5; year += 1) {
      const blockReward = year < 3 ? c.blockRewardNow : c.blockRewardPostHalving;
      const feePct = year < 3 ? c.preHalvingFeesPct : c.postHalvingFeesPct;
      const btcMined = (hashrateTh / globalHashrate) * (blockReward * c.blocksPerHour * 24 * c.daysPerYear) * (1 + feePct);
      const revenue = btcMined * btcPrice;
      const drRevenue = year === 1 ? 0 : baseDRRevenue;
      const aiRevenue = year < 3 ? 0 : baseAiUpsideRevenue;
      const energyCost = stateInput.totalMw * 1000 * stateInput.uptimeHours * c.daysPerYear * tariff;
      const ebitda = revenue + drRevenue + aiRevenue - energyCost - otherOpex;
      years.push({ year, revenue, drRevenue, aiRevenue, energyCost, ebitda, btcMined, btcPrice, tariff });
      btcPrice *= (1 + stateInput.btcGrowth);
      globalHashrate *= (1 + stateInput.difficultyGrowth);
      tariff *= 1.03;
    }
    return years;
  }

  function render() {
    const metrics = computeScenario();
    updateControlValueLabels(metrics);
    renderHero(metrics);
    renderKpis(metrics);
    renderActiveTab(metrics);
    renderSnapshots();
    comparisonSection.classList.toggle('hidden', !state.comparisonMode || state.snapshots.length === 0);
    writeUrlState();
  }

  function renderHero(metrics) {
    document.getElementById('scenarioBadge').textContent = `${data.phasePresets[state.phaseKey].label} • ${data.scenarioPresets[state.presetKey].label}`;
    document.getElementById('heroIrr').textContent = `${formatPercent(metrics.irrIndicative, 1)} IRR`;
    document.getElementById('heroBreakeven').textContent = formatCurrencyUsd(metrics.breakEvenBtcUsd, 0);
    document.getElementById('heroTariff').textContent = `${formatCurrencyZar(metrics.blendedTariff, 2)}/kWh`;
    document.getElementById('heroMw').textContent = `${metrics.totalMw.toFixed(0)} MW`;
  }

  function renderKpis(metrics) {
    const cards = [
      {
        label: 'Indicative IRR band',
        value: `${formatPercent(metrics.irrIndicative, 1)}`,
        sub: 'Calibrated to the latest April 2026 investor materials. Kept conservative by default.',
        highlight: true
      },
      {
        label: 'Annual EBITDA (indicative)',
        value: formatCurrencyZarShort(metrics.ebitdaZar),
        sub: 'BTC mining + flexible-load value less blended energy and operating cost.',
        highlight: false
      },
      {
        label: 'Annual BTC mined',
        value: `${metrics.annualBtcMined.toFixed(1)} BTC`,
        sub: `Approx. ${metrics.hashrateEh.toFixed(2)} EH/s across ${metrics.totalMw.toFixed(0)} MW.`,
        highlight: false
      },
      {
        label: 'Break-even BTC price',
        value: formatCurrencyUsd(metrics.breakEvenBtcUsd, 0),
        sub: 'Approximate operating break-even, aligned to the conservative public debt framing.',
        highlight: false
      },
      {
        label: 'Blended tariff',
        value: `${formatCurrencyZar(metrics.blendedTariff, 2)}/kWh`,
        sub: `Grootvlei ${formatCurrencyZar(metrics.tariffs.grootvlei, 2)}, AMSA ${formatCurrencyZar(metrics.tariffs.amsa, 2)}, Newcastle ${formatCurrencyZar(metrics.tariffs.newcastle, 2)}.`,
        highlight: false
      },
      {
        label: 'Total capex basis',
        value: formatCurrencyUsdShort(metrics.totalCapexUsd),
        sub: 'Interactive capex basis using hardware price per TH plus container / cooling / electrical infrastructure.',
        highlight: false
      },
      {
        label: 'Reference EV view',
        value: formatCurrencyUsdShort(metrics.referenceEvUsd),
        sub: 'Reference valuation frame for scenario work; Phase 2 anchors to the USD255M April 2026 deck basis.',
        highlight: false
      },
      {
        label: 'Cash yield on capex',
        value: formatPercent(metrics.cashYieldPct, 1),
        sub: 'Simple EBITDA / capex lens for quick investor screening.',
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
      case 'scenario':
        tabContent.innerHTML = renderScenarioLab(metrics);
        break;
      case 'capital':
        tabContent.innerHTML = renderCapital(metrics);
        break;
      case 'platform':
        tabContent.innerHTML = renderPlatform(metrics);
        break;
      case 'assumptions':
        tabContent.innerHTML = renderAssumptions(metrics);
        break;
      case 'overview':
      default:
        tabContent.innerHTML = renderOverview(metrics);
    }
  }

  function renderOverview(metrics) {
    return `
      <div class="tab-panel-grid">
        <div class="panel-card span-5">
          <h4>Quick investment view</h4>
          <div class="gauge" style="background: conic-gradient(var(--red) 0deg, var(--red) ${Math.round((metrics.irrIndicative / 45) * 360)}deg, rgba(255,255,255,0.08) ${Math.round((metrics.irrIndicative / 45) * 360)}deg 360deg);">
            <div class="gauge-content">
              <div class="mini-label">Indicative IRR</div>
              <div class="big">${formatPercent(metrics.irrIndicative, 1)}</div>
            </div>
          </div>
          <div class="badge-row">
            <div class="badge good">1.0× principal floor referenced in debt materials</div>
            <div class="badge ${metrics.breakEvenBtcUsd <= 40000 ? 'good' : 'warn'}">Break-even ${formatCurrencyUsd(metrics.breakEvenBtcUsd, 0)}</div>
            <div class="badge ${metrics.blendedTariff <= 0.75 ? 'good' : metrics.blendedTariff <= 1.0 ? 'warn' : 'bad'}">Energy cost is the primary IRR driver</div>
          </div>
          <p>
            This front end is intentionally built around a debt / sponsor / strategic view rather than a single static mining model. It is designed to help investors see what changes the decision, not merely what changes the spreadsheet.
          </p>
        </div>

        <div class="panel-card span-7 chart-area">
          <h4>5-year operating view</h4>
          ${renderFiveYearBars(metrics)}
        </div>

        <div class="panel-card span-6">
          <h4>Revenue stack by layer</h4>
          ${renderRevenueStack(metrics)}
        </div>

        <div class="panel-card span-6">
          <h4>Site economics snapshot</h4>
          ${renderSiteGrid(metrics)}
        </div>

        <div class="panel-card span-12">
          <h4>Why this dashboard is structured this way</h4>
          <div class="matrix-list">
            <div class="matrix-row">
              <div class="key">Debt case</div>
              <div>No AI/HPC revenue loaded. Demand-response value can be switched off entirely. Tariffs remain conservative and operating hours are separated from the strategic upside story.</div>
            </div>
            <div class="matrix-row">
              <div class="key">Sponsor case</div>
              <div>Allows solar blending, tariff improvement, better hardware density, and operating leverage as MW scales through contracted sites.</div>
            </div>
            <div class="matrix-row">
              <div class="key">Strategic upside</div>
              <div>Turns on the AI/HPC layer, grid-services optionality, and larger Newcastle / future-node contributions — but keeps them visibly outside the conservative debt framing.</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderScenarioLab(metrics) {
    return `
      <div class="tab-panel-grid">
        <div class="panel-card span-7 chart-area">
          <h4>Tariff × BTC sensitivity matrix</h4>
          ${renderHeatmap(metrics)}
        </div>
        <div class="panel-card span-5">
          <h4>Scenario commentary</h4>
          <p>${data.scenarioPresets[state.presetKey].description}</p>
          <div class="inline-stat-grid">
            <div class="inline-stat">
              <div class="label">Hashrate density</div>
              <div class="value">${metrics.hashrateEh.toFixed(2)} EH/s</div>
            </div>
            <div class="inline-stat">
              <div class="label">Share of global network</div>
              <div class="value">${formatPercent(metrics.shareOfNetwork * 100, 2)}</div>
            </div>
            <div class="inline-stat">
              <div class="label">Demand-response value</div>
              <div class="value">${formatCurrencyZarShort(metrics.demandResponseRevenue)}</div>
            </div>
            <div class="inline-stat">
              <div class="label">AI / HPC upside</div>
              <div class="value">${metrics.aiUpside ? formatCurrencyZarShort(metrics.aiUpsideRevenue) : 'Off'}</div>
            </div>
          </div>
          <p class="microcopy">
            The phase selector changes the commercial frame. The preset selector changes the risk posture. The sliders then let you move around that frame without losing the investment narrative.
          </p>
        </div>

        <div class="panel-card span-12 chart-area">
          <h4>Value bridge</h4>
          ${renderValueBridge(metrics)}
        </div>
      </div>
    `;
  }

  function renderCapital(metrics) {
    const c = data.constants;
    return `
      <div class="tab-panel-grid">
        <div class="panel-card span-6">
          <h4>Capital stack visual</h4>
          <div class="capital-stack-visual">
            <span class="cap-seg asset" style="width:${c.phase1CapitalStack.assetBackedPct * 100}%"></span>
            <span class="cap-seg equity" style="width:${c.phase1CapitalStack.equityPct * 100}%"></span>
            <span class="cap-seg mezz" style="width:${c.phase1CapitalStack.mezzPct * 100}%"></span>
          </div>
          <div class="legend">
            <div class="legend-row"><span class="left"><span class="dot asset"></span>Asset-backed</span><strong>${formatCurrencyUsdShort(metrics.capStack.assetBackedUsd)}</strong></div>
            <div class="legend-row"><span class="left"><span class="dot equity"></span>Equity</span><strong>${formatCurrencyUsdShort(metrics.capStack.equityUsd)}</strong></div>
            <div class="legend-row"><span class="left"><span class="dot mezz"></span>Mezzanine / DMTN</span><strong>${formatCurrencyUsdShort(metrics.capStack.mezzUsd)}</strong></div>
          </div>
          <p class="microcopy">The ratios are fixed to the published Phase 1 structure for clarity. Actual phase-specific financing may evolve.</p>
        </div>
        <div class="panel-card span-6">
          <h4>Investor protection panel</h4>
          <div class="matrix-list">
            <div class="matrix-row"><div class="key">DMTN coupon</div><div>Prime + 200bps (~12.25% p.a.), ZAR-denominated, 5-year tenor.</div></div>
            <div class="matrix-row"><div class="key">Principal floor</div><div>1.0× unconditional cash redemption at par at maturity, independent of listing outcome.</div></div>
            <div class="matrix-row"><div class="key">Security coverage</div><div>Minimum ${formatPercent(c.securityCoverage * 100, 0)} of outstanding principal plus DSRA funded at close.</div></div>
            <div class="matrix-row"><div class="key">DSCR covenant</div><div>Minimum ${formatPercent(c.dscrCovenant * 100, 0)} basis shown in the current investment materials.</div></div>
            <div class="matrix-row"><div class="key">Ticket sizes</div><div>Debt minimum ${formatCurrencyZarShort(c.minDebtInvestmentZar)} | Equity minimum ${formatCurrencyUsdShort(c.minEquityInvestmentUsd)}.</div></div>
          </div>
        </div>

        <div class="panel-card span-7">
          <h4>Downside framing</h4>
          <div class="badge-row">
            <div class="badge good">Above $60k BTC — normal operations</div>
            <div class="badge warn">$40k–$60k BTC — managed operations</div>
            <div class="badge bad">Below $40k BTC — conservation mode / collateral focus</div>
          </div>
          <p>
            The website version translates the public debt framing into an investor interface. It keeps the debt case visibly separate from strategic upside, which is one of the key changes called for in the internal Nedbank memo.
          </p>
          <div class="inline-stat-grid">
            <div class="inline-stat"><div class="label">DSRA interest reserve (illustrative)</div><div class="value">${formatCurrencyZarShort(metrics.dsraInterestZar)}</div></div>
            <div class="inline-stat"><div class="label">Phase 1 capex basis</div><div class="value">${formatCurrencyUsdShort(data.constants.phase1CapexUsd)}</div></div>
            <div class="inline-stat"><div class="label">Reference EV</div><div class="value">${formatCurrencyUsdShort(metrics.referenceEvUsd)}</div></div>
            <div class="inline-stat"><div class="label">Asset-backed tenor</div><div class="value">2 years @ 10% USD</div></div>
          </div>
        </div>

        <div class="panel-card span-5">
          <h4>Capital ladder</h4>
          <div class="roadmap">
            <div class="roadmap-step"><div class="phase-number">01</div><div class="big">HNWI equity</div><ul class="muted-list"><li>Proof-of-concept funding</li><li>Live operating assets</li></ul></div>
            <div class="roadmap-step"><div class="phase-number">02</div><div class="big">Institutional debt</div><ul class="muted-list"><li>Scale-up after proof</li><li>Pension / infra capital</li></ul></div>
            <div class="roadmap-step"><div class="phase-number">03</div><div class="big">Public market optionality</div><ul class="muted-list"><li>Nasdaq pathway</li><li>GEM post-listing facility</li></ul></div>
          </div>
        </div>
      </div>
    `;
  }

  function renderPlatform(metrics) {
    const phase = data.phasePresets[state.phaseKey];
    return `
      <div class="tab-panel-grid">
        <div class="panel-card span-12">
          <h4>Three-stage rollout</h4>
          <div class="roadmap">
            <div class="roadmap-step">
              <div class="phase-number">Phase 1 • 0–6 months</div>
              <div class="big">20 MW</div>
              <ul class="muted-list">
                <li>Proof of deployment and controllable load behaviour</li>
                <li>Bitcoin as day-one cashflow layer</li>
                <li>Latest external deck basis: 15 MW Grootvlei + 5 MW AMSA</li>
              </ul>
            </div>
            <div class="roadmap-step">
              <div class="phase-number">Phase 2 • 6–24 months</div>
              <div class="big">80–100 MW</div>
              <ul class="muted-list">
                <li>AMSA solar blend reduces weighted energy cost</li>
                <li>Demand-response classification becomes more valuable</li>
                <li>Main current financial case</li>
              </ul>
            </div>
            <div class="roadmap-step">
              <div class="phase-number">Phase 3 • 24+ months</div>
              <div class="big">500 MW–2 GW</div>
              <ul class="muted-list">
                <li>Institutional-scale energy-digital platform</li>
                <li>AI / HPC and tenant layers move center-stage</li>
                <li>Newcastle and further Eskom / industrial nodes matter</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="panel-card span-6">
          <h4>Four-layer platform architecture</h4>
          <div class="matrix-list">
            <div class="matrix-row"><div class="key">Energy infrastructure</div><div>$25–$70 / MWh • Eskom station access, industrial ESAs, substations, solar PV integration.</div></div>
            <div class="matrix-row"><div class="key">Flexible digital load</div><div>$40–$80 / MWh • Bitcoin mining, load balancing, curtailment absorption, grid support.</div></div>
            <div class="matrix-row"><div class="key">High performance compute</div><div>$80–$200 / MWh • GPU infrastructure, AI training clusters, HPC workloads.</div></div>
            <div class="matrix-row"><div class="key">Application / tenant layer</div><div>$150–$400+ / MWh • AI platforms, cloud services, enterprise tenants, digital campuses.</div></div>
          </div>
        </div>

        <div class="panel-card span-6">
          <h4>Contracted access and node logic</h4>
          ${renderSiteGrid(metrics)}
        </div>

        <div class="panel-card span-12">
          <h4>Platform scale context</h4>
          <div class="inline-stat-grid">
            <div class="inline-stat"><div class="label">Committed MW</div><div class="value">${data.constants.contractCommittedMw} MW</div></div>
            <div class="inline-stat"><div class="label">National pipeline</div><div class="value">${formatNumber(data.constants.pipelineMw)} MW</div></div>
            <div class="inline-stat"><div class="label">Current selected basis</div><div class="value">${phase.title}</div></div>
            <div class="inline-stat"><div class="label">Phase note</div><div class="value">${phase.summary}</div></div>
          </div>
        </div>
      </div>
    `;
  }

  function renderAssumptions(metrics) {
    const c = data.constants;
    return `
      <div class="tab-panel-grid">
        <div class="panel-card span-7">
          <h4>Conservative modelling choices inside the dashboard</h4>
          <ul class="muted-list">
            <li>AI / HPC upside is off by default, consistent with the internal instruction to keep Layers 3 and 4 out of the initial debt case.</li>
            <li>Grid tariffs start in the conservative zone and improve only when the user explicitly moves them toward solar blending or strategic tariff outcomes.</li>
            <li>Demand-response revenue is user-controlled and can be zeroed out instantly.</li>
            <li>Break-even BTC and EBITDA are calculated from the interactive inputs; IRR is presented as an indicative band calibrated to the April 2026 deck rather than a blind export from the uploaded workbook.</li>
            <li>Site mix is separated across Grootvlei, AMSA, and Newcastle / future nodes because the internal memo explicitly calls for this distinction.</li>
          </ul>
        </div>
        <div class="panel-card span-5">
          <h4>Current assumption basis</h4>
          <div class="matrix-list">
            <div class="matrix-row"><div class="key">FX</div><div>${formatCurrencyZar(c.fx, 2)} / USD</div></div>
            <div class="matrix-row"><div class="key">Solar tariff</div><div>${formatCurrencyZar(c.solarTariff, 2)} / kWh</div></div>
            <div class="matrix-row"><div class="key">Capex infra load-in</div><div>${formatCurrencyUsdShort(c.baseCapexInfraPerMwUsd)} / MW</div></div>
            <div class="matrix-row"><div class="key">Staffing basis</div><div>${c.staffPerMw} people / MW @ ${formatCurrencyZarShort(c.staffCostZar)} average CTC</div></div>
            <div class="matrix-row"><div class="key">AMSA premium</div><div>${formatCurrencyZarShort(c.amsaDeferredPremiumZar)} deferred access payment</div></div>
          </div>
        </div>

        <div class="panel-card span-12">
          <h4>Source basis used for the online dashboard build</h4>
          <div class="badge-row">
            ${data.sourceNotes.map((note) => `<div class="badge">${note}</div>`).join('')}
          </div>
          <p>
            The goal here was not to ship a fragile front end tied directly to the current workbook. It was to ship a deployable investor website that aligns with the latest April 2026 investor narrative and the more disciplined internal advice on tariffs, site economics, hardware, risk separation, and platform phasing.
          </p>
        </div>
      </div>
    `;
  }

  function renderRevenueStack(metrics) {
    const base = [
      { label: 'Bitcoin mining', value: metrics.btcRevenueZar, cls: 'red' },
      { label: 'Demand response', value: metrics.demandResponseRevenue, cls: 'teal' },
      { label: 'AI / HPC upside', value: metrics.aiUpsideRevenue, cls: 'orange' },
      { label: 'Energy cost', value: metrics.energyCost, cls: 'dark' },
      { label: 'Other opex', value: metrics.otherOpex, cls: 'silver' }
    ];
    const maxValue = Math.max(...base.map((item) => item.value));
    return `<div class="bar-chart">${base.map((item) => `
      <div class="bar-row">
        <div>${item.label}</div>
        <div class="bar-rail"><div class="bar-fill ${item.cls}" style="width:${((item.value / maxValue) * 100).toFixed(1)}%"></div></div>
        <div>${formatCurrencyZarShort(item.value)}</div>
      </div>
    `).join('')}</div>`;
  }

  function renderSiteGrid(metrics) {
    const rows = [
      {
        title: 'Eskom Grootvlei',
        share: metrics.grootvleiShare,
        tariff: metrics.tariffs.grootvlei,
        notes: ['Grid-powered initial node', 'Longer-term access framing in the 500–800 MW zone', 'No immediate solar component']
      },
      {
        title: 'AMSA Vanderbijlpark',
        share: metrics.amsaShare,
        tariff: metrics.tariffs.amsa,
        notes: ['70 MW solar year 1 → 180 MW in 24 months', 'R60m deferred infrastructure premium', '10% profit participation above R200m net profit threshold']
      },
      {
        title: 'Newcastle / future nodes',
        share: metrics.newcastleShare,
        tariff: metrics.tariffs.newcastle,
        notes: ['Future solar-enabled campus logic', 'Substations, land, and approvals matter strategically', 'Best viewed as medium-term upside in early phases']
      }
    ];

    return `<div class="site-grid">${rows.map((row) => `
      <div class="site-card">
        <h5>${row.title}</h5>
        <div class="inline-stat"><div class="label">MW allocation</div><div class="value">${formatPercent(row.share * 100, 0)}</div></div>
        <div class="inline-stat" style="margin-top:10px;"><div class="label">Effective tariff</div><div class="value">${formatCurrencyZar(row.tariff, 2)}/kWh</div></div>
        <div>${row.notes.map((note) => `<span class="site-chip">${note}</span>`).join('')}</div>
      </div>
    `).join('')}</div>`;
  }

  function renderFiveYearBars(metrics) {
    const maxValue = Math.max(...metrics.years.flatMap((y) => [y.revenue, Math.max(y.ebitda, 0)]));
    return `<div class="bar-chart">${metrics.years.map((y) => `
      <div class="bar-row">
        <div>Year ${y.year}</div>
        <div>
          <div class="bar-rail" style="margin-bottom:6px;"><div class="bar-fill red" style="width:${((y.revenue / maxValue) * 100).toFixed(1)}%"></div></div>
          <div class="bar-rail"><div class="bar-fill teal" style="width:${((Math.max(y.ebitda, 0) / maxValue) * 100).toFixed(1)}%"></div></div>
        </div>
        <div>${formatCurrencyZarShort(y.ebitda)}</div>
      </div>
    `).join('')}
    <div class="microcopy" style="margin-top:12px;">Top bar = revenue. Bottom bar = EBITDA. Halving pressure is visible in Years 3–5 unless offset by tariff improvement, solar, or higher BTC pricing.</div>
    </div>`;
  }

  function renderHeatmap(metrics) {
    const btcSteps = [0.75, 0.9, 1.0, 1.1, 1.25].map((mult) => Math.round(metrics.btcUsd * mult / 5000) * 5000);
    const tariffSteps = [0.65, 0.8, 0.95, 1.05, 1.20];
    const header = `<div class="heat-label"></div>${btcSteps.map((btc) => `<div class="heat-label">${formatCurrencyUsd(btc, 0)}</div>`).join('')}`;
    const rows = tariffSteps.map((tariff) => {
      const cells = btcSteps.map((btc) => {
        const clone = { ...metrics, btcUsd: btc, gridTariff: tariff };
        controls.btc.value = metrics.btcUsd;
        controls.gridTariff.value = metrics.gridTariff;
        const cloneMetrics = computeUsingOverride(metrics, { btcUsd: btc, gridTariff: tariff });
        const color = cloneMetrics.irrIndicative >= 28 ? 'rgba(45,212,191,0.20)' : cloneMetrics.irrIndicative >= 22 ? 'rgba(255,180,84,0.18)' : 'rgba(255,107,107,0.18)';
        return `<div class="heat-cell" style="background:${color}">${formatPercent(cloneMetrics.irrIndicative, 1)}<span>${formatCurrencyZar(cloneMetrics.blendedTariff, 2)}/kWh</span></div>`;
      }).join('');
      return `<div class="heat-label">${formatCurrencyZar(tariff, 2)}</div>${cells}`;
    }).join('');
    return `<div class="heatmap">${header}${rows}</div><div class="microcopy" style="margin-top:12px;">Rows = grid tariff starting point. Columns = BTC spot assumption. Each cell shows the indicative IRR band after site mix and solar blending are applied.</div>`;
  }

  function renderValueBridge(metrics) {
    const items = [
      { label: 'BTC revenue', value: metrics.btcRevenueZar, cls: 'red' },
      { label: 'Demand response', value: metrics.demandResponseRevenue, cls: 'teal' },
      { label: 'AI / HPC upside', value: metrics.aiUpsideRevenue, cls: 'orange' },
      { label: 'Energy cost', value: -metrics.energyCost, cls: 'dark' },
      { label: 'Other opex', value: -metrics.otherOpex, cls: 'silver' },
      { label: 'EBITDA', value: metrics.ebitdaZar, cls: 'red' }
    ];
    const maxValue = Math.max(...items.map((item) => Math.abs(item.value)));
    return `<div class="bar-chart">${items.map((item) => `
      <div class="bar-row">
        <div>${item.label}</div>
        <div class="bar-rail"><div class="bar-fill ${item.cls}" style="width:${((Math.abs(item.value) / maxValue) * 100).toFixed(1)}%"></div></div>
        <div>${item.value < 0 ? '-' : ''}${formatCurrencyZarShort(Math.abs(item.value))}</div>
      </div>
    `).join('')}</div>`;
  }

  function renderSnapshots() {
    snapshotGrid.innerHTML = state.snapshots.map((snap) => `
      <div class="snapshot-card">
        <h4>${snap.label}</h4>
        <div class="meta">${snap.createdAt}</div>
        <div class="stats">
          <div><span>IRR band</span><strong>${formatPercent(snap.metrics.irrIndicative, 1)}</strong></div>
          <div><span>Tariff</span><strong>${formatCurrencyZar(snap.metrics.blendedTariff, 2)}/kWh</strong></div>
          <div><span>EBITDA</span><strong>${formatCurrencyZarShort(snap.metrics.ebitdaZar)}</strong></div>
          <div><span>Break-even BTC</span><strong>${formatCurrencyUsd(snap.metrics.breakEvenBtcUsd, 0)}</strong></div>
        </div>
        <button class="ghost-btn small" onclick="window.restoreSnapshot('${snap.id}')">Restore</button>
      </div>
    `).join('');
  }

  window.restoreSnapshot = function restoreSnapshot(id) {
    const snap = state.snapshots.find((item) => item.id === id);
    if (!snap) return;
    state.phaseKey = snap.metrics.phaseKey;
    state.presetKey = snap.metrics.presetKey;
    applyPreset(state.phaseKey, state.presetKey, true);
    controls.totalMw.value = snap.metrics.totalMw;
    controls.btc.value = snap.metrics.btcUsd;
    controls.gridTariff.value = snap.metrics.gridTariff;
    controls.solarShare.value = snap.metrics.solarShare;
    controls.uptimeHours.value = snap.metrics.uptimeHours;
    controls.jPerTh.value = snap.metrics.jPerTh;
    controls.pricePerTh.value = snap.metrics.pricePerTh;
    controls.difficultyGrowth.value = snap.metrics.difficultyGrowth;
    controls.btcGrowth.value = snap.metrics.btcGrowth;
    controls.drRebate.value = snap.metrics.drRebate;
    controls.drParticipation.value = snap.metrics.drParticipation;
    controls.amsaShare.value = snap.metrics.amsaShare;
    controls.newcastleShare.value = snap.metrics.newcastleShare;
    controls.aiUpside.checked = snap.metrics.aiUpside;
    renderStructure();
    render();
  };

  function computeUsingOverride(baseMetrics, override) {
    const saved = {
      btcUsd: controls.btc.value,
      gridTariff: controls.gridTariff.value
    };
    controls.btc.value = override.btcUsd;
    controls.gridTariff.value = override.gridTariff;
    const metrics = computeScenario();
    controls.btc.value = saved.btcUsd;
    controls.gridTariff.value = saved.gridTariff;
    return metrics;
  }

  function updateControlValueLabels(metrics) {
    valueSpans.totalMw.textContent = `${metrics.totalMw.toFixed(0)} MW`;
    valueSpans.btc.textContent = formatCurrencyUsd(metrics.btcUsd, 0);
    valueSpans.gridTariff.textContent = `${formatCurrencyZar(metrics.gridTariff, 2)}`;
    valueSpans.solarShare.textContent = formatPercent(metrics.solarShare * 100, 0);
    valueSpans.uptimeHours.textContent = `${metrics.uptimeHours.toFixed(0)} h`;
    valueSpans.jPerTh.textContent = `${metrics.jPerTh.toFixed(1)} J/TH`;
    valueSpans.pricePerTh.textContent = `${formatCurrencyUsd(metrics.pricePerTh, 2)}`;
    valueSpans.difficultyGrowth.textContent = formatPercent(metrics.difficultyGrowth * 100, 0);
    valueSpans.btcGrowth.textContent = formatPercent(metrics.btcGrowth * 100, 0);
    valueSpans.drRebate.textContent = `${formatCurrencyZar(metrics.drRebate, 2)}`;
    valueSpans.drParticipation.textContent = formatPercent(metrics.drParticipation * 100, 0);
    valueSpans.amsaShare.textContent = formatPercent(metrics.amsaShare * 100, 0);
    valueSpans.newcastleShare.textContent = formatPercent(metrics.newcastleShare * 100, 0);
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function formatCurrencyZar(value, decimals = 0) {
    return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: decimals, minimumFractionDigits: decimals }).format(value);
  }

  function formatCurrencyUsd(value, decimals = 0) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: decimals, minimumFractionDigits: decimals }).format(value);
  }

  function formatCurrencyZarShort(value) {
    if (Math.abs(value) >= 1000000000) return `${formatCurrencyZar(value / 1000000000, 1)}bn`;
    if (Math.abs(value) >= 1000000) return `${formatCurrencyZar(value / 1000000, 1)}m`;
    return formatCurrencyZar(value, 0);
  }

  function formatCurrencyUsdShort(value) {
    if (Math.abs(value) >= 1000000000) return `${formatCurrencyUsd(value / 1000000000, 1)}bn`;
    if (Math.abs(value) >= 1000000) return `${formatCurrencyUsd(value / 1000000, 1)}m`;
    return formatCurrencyUsd(value, 0);
  }

  function formatPercent(value, decimals = 0) {
    return `${Number(value).toFixed(decimals)}%`;
  }

  function formatNumber(value) {
    return new Intl.NumberFormat('en-US').format(value);
  }
})();
