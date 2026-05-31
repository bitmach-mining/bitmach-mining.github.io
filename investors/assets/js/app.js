(function () {
  const data = window.bitmachData;
  const el = (s) => document.querySelector(s);

  function setText(sel, txt) { const n = el(sel); if (n) n.textContent = txt; }

  function renderHeroPills() {
    el('#heroPills').innerHTML = data.heroPills.map((p) => `<span class="pill">${p}</span>`).join('');
  }

  function renderMetrics() {
    el('#metricGrid').innerHTML = data.metrics.map((item) => `
      <article class="metric-card card">
        <div class="metric-label">${item.label}</div>
        <div class="metric-value">${item.value}</div>
        <div class="metric-note">${item.note}</div>
      </article>
    `).join('');
  }

  function renderLayerStack() {
    setText('#stackIntro', data.revenueStack.intro);
    el('#layerStack').innerHTML = data.revenueStack.layers.map((l) => `
      <div class="layer-row ${l.core ? 'layer-core' : 'layer-option'}">
        <div class="layer-num">${l.n}</div>
        <div class="layer-main">
          <div class="layer-name">${l.name}</div>
          <div class="layer-source">${l.source}</div>
        </div>
        <div class="layer-meta">
          <span class="layer-timing">${l.timing}</span>
          <span class="layer-badge ${l.core ? 'badge-core' : 'badge-option'}">${l.core ? 'Core' : 'Layer 5 option'}</span>
        </div>
      </div>
    `).join('');
  }

  function renderPhase1() {
    setText('#phase1Intro', data.phase1.intro);
    setText('#phase1Note', data.phase1.note);
    const maxAmt = Math.max(...data.phase1.stack.map((s) => s.amount));
    el('#capitalStack').innerHTML = data.phase1.stack.map((s) => `
      <div class="capital-row">
        <div class="capital-top">
          <span class="capital-name">${s.name}</span>
          <span class="capital-amount">${s.label}</span>
        </div>
        <div class="capital-bar-shell">
          <div class="capital-bar" style="width:${(s.amount / maxAmt) * 100}%"></div>
        </div>
        <div class="capital-terms">${s.terms}</div>
      </div>
    `).join('');
    el('#phase1Metrics').innerHTML = data.phase1.metrics.map((m) => `
      <div class="profile-item">
        <span>${m.label}</span>
        <strong>${m.value}</strong>
      </div>
    `).join('');
  }

  function renderSnapshot() {
    setText('#snapshotNote', data.platformSnapshot.note);
    el('#snapshotHead').innerHTML = '<th>Metric</th>' + data.platformSnapshot.columns.map((c) => `<th>${c}</th>`).join('');
    el('#snapshotBody').innerHTML = data.platformSnapshot.rows.map((r) => `
      <tr>
        <td>${r.metric}</td>
        ${r.vals.map((v) => `<td>${v}</td>`).join('')}
      </tr>
    `).join('');
  }

  function renderRevenueMix() {
    setText('#mixNote', data.revenueMix.note);
    el('#mixBar').innerHTML = data.revenueMix.segments.map((s) =>
      `<span class="mix-segment" style="width:${s.pct}%;background:${s.color}" title="${s.name}: ${s.pct}%"></span>`
    ).join('');
    el('#mixLegend').innerHTML = data.revenueMix.segments.map((s) => `
      <div class="legend-item">
        <span class="legend-swatch" style="background:${s.color}"></span>
        <span>${s.name}</span>
        <strong>${s.pct}%</strong>
      </div>
    `).join('');
  }

  function renderCapexBridge() {
    setText('#capexTotal', 'Total ' + data.capexBridge.total);
    el('#capexBridge').innerHTML = data.capexBridge.items.map((it) => `
      <div class="capex-row">
        <div class="capex-name">${it.name}</div>
        <div class="capex-bar-shell">
          <div class="capex-bar" style="width:${(it.value / data.capexBridge.max) * 100}%"></div>
        </div>
        <div class="capex-val">${it.label}</div>
      </div>
    `).join('');
  }

  function renderRevenueArchitecture() {
    const cols = ['underwritten', 'upside'].map((k) => data.revenueArchitecture[k]);
    el('#revenueArchitecture').innerHTML = cols.map((c) => `
      <article class="card architecture-card">
        <h3>${c.title}</h3>
        <p>${c.intro}</p>
        <div class="architecture-list">
          ${c.items.map((i) => `<div class="architecture-item">${i}</div>`).join('')}
        </div>
      </article>
    `).join('');
  }

  function renderRampLegend() {
    el('#rampLegend').innerHTML = data.ramp.legend.map((item) => `
      <div class="legend-item">
        <span class="legend-swatch" style="background:${item.color}"></span>
        <span>${item.name}</span>
      </div>
    `).join('');
  }

  function renderRampChart() {
    const colors = data.ramp.legend.map((i) => i.color);
    el('#rampChart').innerHTML = data.ramp.years.map((row) => {
      const segments = row.segments.map((value, index) => {
        const width = value > 0 ? (value / data.ramp.max) * 100 : 0;
        return `<span class="stack-segment" style="width:${width}%;background:${colors[index]};" title="${data.ramp.legend[index].name}: ${value}MW"></span>`;
      }).join('');
      const totalWidth = (row.total / data.ramp.max) * 100;
      return `
        <div class="ramp-row">
          <div class="ramp-year">${row.year}</div>
          <div class="ramp-bar-shell">
            <div class="ramp-bar" style="width:${totalWidth}%">${segments}</div>
          </div>
          <div class="ramp-total">${row.total.toLocaleString()} MW</div>
          <div class="ramp-solar">Solar ${row.solar} MW</div>
        </div>
      `;
    }).join('');
  }

  function renderMilestones() {
    el('#milestoneStack').innerHTML = data.milestones.map((m) => `
      <div class="phase-item">
        <span class="phase-tag">${m.tag}</span>
        <strong>${m.timing} | ${m.capacity}</strong>
        <p>${m.text}</p>
      </div>
    `).join('');
  }

  function renderEnergyGrid() {
    el('#energyGrid').innerHTML = data.energyPathway.map((card) => `
      <article class="card energy-card">
        <div class="energy-title">${card.title}</div>
        <div class="energy-value">${card.value}</div>
        <p>${card.note}</p>
      </article>
    `).join('');
  }

  function renderSites() {
    el('#siteGrid').innerHTML = data.sites.map((site, index) => `
      <article class="card site-card ${index === 0 ? 'site-card-image' : ''}">
        ${index === 0 ? '<div class="site-image-strip"></div>' : ''}
        <div class="site-eyebrow">${site.name}</div>
        <h3>${site.title}</h3>
        <div class="site-metrics">
          ${site.metrics.map((metric) => `<span>${metric}</span>`).join('')}
        </div>
        <p>${site.body}</p>
      </article>
    `).join('');
  }

  function renderValuation() {
    setText('#valuationIntro', data.valuation.intro);
    el('#valuationBars').innerHTML = data.valuation.points.map((p) => `
      <div class="valuation-row ${p.base ? 'valuation-base' : ''}">
        <div class="valuation-rate">${p.rate}</div>
        <div class="valuation-bar-shell">
          <div class="valuation-bar" style="width:${(p.value / data.valuation.max) * 100}%"></div>
        </div>
        <div class="valuation-npv">${p.npv}</div>
      </div>
    `).join('');
  }

  function renderDownside() {
    setText('#downsideIntro', data.downside.intro);
    el('#downsideBody').innerHTML = data.downside.rows.map((r) => `
      <tr class="${r.scenario === 'Combined downside' ? 'row-stress' : ''}">
        <td><strong>${r.scenario}</strong><div class="row-sub">${r.change}</div></td>
        <td>${r.npv}</td>
        <td>${r.irr}</td>
      </tr>
    `).join('');
  }

  function renderTimeline() {
    el('#timeline').innerHTML = data.timeline.map((item) => `
      <div class="timeline-step">
        <div class="timeline-number">${item.step}</div>
        <div class="timeline-copy">
          <strong>${item.title}</strong>
          <p>${item.text}</p>
        </div>
      </div>
    `).join('');
  }

  function renderRisk() {
    el('#riskList').innerHTML = data.riskFramework.map((r) => `
      <div class="risk-item">
        <div class="risk-name">${r.risk}</div>
        <div class="risk-mitigant">${r.mitigant}</div>
      </div>
    `).join('');
  }

  function renderDocs() {
    el('#docGrid').innerHTML = data.docs.map((doc) => `
      <article class="card doc-card">
        <h3>${doc.title}</h3>
        <p>${doc.description}</p>
        <a class="secondary-btn" href="${doc.href}" target="_blank" rel="noopener">${doc.cta}</a>
      </article>
    `).join('');
  }

  function bindSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (event) => {
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  if (data.asOf) setText('#asOfLabel', data.asOf);
  renderHeroPills();
  renderMetrics();
  renderLayerStack();
  renderPhase1();
  renderSnapshot();
  renderRevenueMix();
  renderCapexBridge();
  renderRevenueArchitecture();
  renderRampLegend();
  renderRampChart();
  renderMilestones();
  renderEnergyGrid();
  renderSites();
  renderValuation();
  renderDownside();
  renderTimeline();
  renderRisk();
  renderDocs();
  bindSmoothAnchors();
})();
