(function () {
  const data = window.bitmachData;

  const el = (selector) => document.querySelector(selector);

  function renderHeroPills() {
    const container = el('#heroPills');
    container.innerHTML = data.heroPills.map((pill) => `<span class="pill">${pill}</span>`).join('');
  }

  function renderMetrics() {
    const container = el('#metricGrid');
    container.innerHTML = data.metrics.map((item) => `
      <article class="metric-card card">
        <div class="metric-label">${item.label}</div>
        <div class="metric-value">${item.value}</div>
        <div class="metric-note">${item.note}</div>
      </article>
    `).join('');
  }

  function renderYearCards() {
    const container = el('#yearCardGrid');
    container.innerHTML = data.yearCards.map((card) => `
      <article class="card year-card">
        <div class="year-chip">${card.year}</div>
        <div class="year-stat"><span>Revenue</span><strong>${card.revenue}</strong></div>
        <div class="year-stat"><span>Cash opex</span><strong>${card.opex}</strong></div>
        <div class="year-stat"><span>EBITDA</span><strong>${card.ebitda}</strong></div>
        <div class="year-footer">${card.footer}</div>
      </article>
    `).join('');
  }

  function renderProfile() {
    const container = el('#profileGrid');
    container.innerHTML = data.operatingProfile.map((item) => `
      <div class="profile-item">
        <span>${item.label}</span>
        <strong>${item.value}</strong>
      </div>
    `).join('');
  }

  function renderSummaryTable() {
    const tbody = el('#summaryTableBody');
    tbody.innerHTML = data.summaryRows.map((row) => `
      <tr>
        <td>${row.metric}</td>
        <td>${row.y1}</td>
        <td>${row.y2}</td>
        <td>${row.y3}</td>
      </tr>
    `).join('');
  }

  function renderRevenueArchitecture() {
    const container = el('#revenueArchitecture');
    const columns = ['underwritten', 'upside'].map((key) => data.revenueArchitecture[key]);
    container.innerHTML = columns.map((column) => `
      <article class="card architecture-card">
        <h3>${column.title}</h3>
        <p>${column.intro}</p>
        <div class="architecture-list">
          ${column.items.map((item) => `<div class="architecture-item">${item}</div>`).join('')}
        </div>
      </article>
    `).join('');
  }

  function renderRampLegend() {
    const legend = el('#rampLegend');
    legend.innerHTML = data.ramp.legend.map((item) => `
      <div class="legend-item">
        <span class="legend-swatch" style="background:${item.color}"></span>
        <span>${item.name}</span>
      </div>
    `).join('');
  }

  function renderRampChart() {
    const container = el('#rampChart');
    const colors = data.ramp.legend.map((item) => item.color);
    container.innerHTML = data.ramp.years.map((row) => {
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
          <div class="ramp-total">${row.total} MW</div>
          <div class="ramp-solar">Solar ${row.solar} MW</div>
        </div>
      `;
    }).join('');
  }

  function renderSites() {
    const container = el('#siteGrid');
    container.innerHTML = data.sites.map((site, index) => `
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

  function renderEnergyGrid() {
    const container = el('#energyGrid');
    container.innerHTML = data.energyPathway.map((card) => `
      <article class="card energy-card">
        <div class="energy-title">${card.title}</div>
        <div class="energy-value">${card.value}</div>
        <p>${card.note}</p>
      </article>
    `).join('');
  }

  function renderTimeline() {
    const container = el('#timeline');
    container.innerHTML = data.timeline.map((item) => `
      <div class="timeline-step">
        <div class="timeline-number">${item.step}</div>
        <div class="timeline-copy">
          <strong>${item.title}</strong>
          <p>${item.text}</p>
        </div>
      </div>
    `).join('');
  }

  function renderDefensible() {
    const container = el('#defensibleList');
    container.innerHTML = data.defensiblePoints.map((item) => `<div class="defensible-item">${item}</div>`).join('');
  }

  function renderDocs() {
    const container = el('#docGrid');
    container.innerHTML = data.docs.map((doc) => `
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

  renderHeroPills();
  renderMetrics();
  renderYearCards();
  renderProfile();
  renderSummaryTable();
  renderRevenueArchitecture();
  renderRampLegend();
  renderRampChart();
  renderSites();
  renderEnergyGrid();
  renderTimeline();
  renderDefensible();
  renderDocs();
  bindSmoothAnchors();
})();
