const apps = [
  {
    slug: 'iphone-media-transfer',
    name: 'iPhone Media Transfer',
    eyebrow: 'USB media mover',
    status: 'Private beta',
    accent: '#39d0ff',
    summary: 'Move or copy original iPhone photos and videos to Windows over USB without cloud compression.',
    details: [
      'Lossless local transfer from iPhone or iPad to Windows.',
      'Move mode deletes originals only after local verification.',
      'Resume, retry, failed-media review, and transfer history.'
    ],
    action: 'GitHub repo',
    href: 'https://github.com/Photon-Security/iPhone_Media_Transfer'
  },
  {
    slug: 'proxy-ssl-trust',
    name: 'Proxy SSL Trust',
    eyebrow: 'Certificate utility',
    status: 'Planned',
    accent: '#38d996',
    summary: 'Make local proxy certificate trust safer and easier to inspect across development machines.',
    details: [
      'Central place to audit proxy certificate trust state.',
      'Designed for development and security testing workflows.',
      'Planned Windows-first packaging.'
    ]
  },
  {
    slug: 'video-to-gif',
    name: 'Video to GIF',
    eyebrow: 'Media converter',
    status: 'Planned',
    accent: '#ffcf5c',
    summary: 'Fast local conversion from short videos to shareable GIFs with practical size controls.',
    details: [
      'Local conversion workflow for demos and support snippets.',
      'Target controls for dimensions, frame rate, and file size.',
      'Batch-friendly roadmap.'
    ]
  },
  {
    slug: 'litellm-key-renewer',
    name: 'LiteLLM Key Renewer',
    eyebrow: 'Ops automation',
    status: 'Planned',
    accent: '#9d7cff',
    summary: 'Renew and rotate LiteLLM keys with less manual console work.',
    details: [
      'Designed for teams using LiteLLM gateways.',
      'Tracks renewal state and reduces repetitive admin steps.',
      'CLI first, GUI later if useful.'
    ]
  },
  {
    slug: 'portkey-key-renewer',
    name: 'Portkey Key Renewer',
    eyebrow: 'Ops automation',
    status: 'Planned',
    accent: '#ff7aa2',
    summary: 'Streamline renewal and rotation workflows for Portkey-managed keys.',
    details: [
      'Operational helper for routine key hygiene.',
      'Keeps renewal steps consistent across environments.',
      'Built for auditability.'
    ]
  },
  {
    slug: 'local-llm-stack',
    name: 'Local LLM Stack',
    eyebrow: 'AI workstation',
    status: 'Planned',
    accent: '#4dd4ac',
    summary: 'A reproducible local LLM stack for running models, tools, and gateways on a workstation.',
    details: [
      'Opinionated local setup for common LLM components.',
      'Targets repeatable installs over one-off scripts.',
      'Designed for experimentation without cloud lock-in.'
    ]
  },
  {
    slug: 'identityiq-comparator',
    name: 'IdentityIQ Comparator',
    eyebrow: 'IAM review',
    status: 'Planned',
    accent: '#5aa9ff',
    summary: 'Compare IdentityIQ exports and highlight meaningful configuration differences.',
    details: [
      'Diff-oriented workflow for SailPoint IdentityIQ data.',
      'Aims to make noisy XML/config exports reviewable.',
      'Useful for change review and migration checks.'
    ]
  },
  {
    slug: 'gguf-model-downloader',
    name: 'GGUF Model Downloader',
    eyebrow: 'Model utility',
    status: 'Planned',
    accent: '#f97316',
    summary: 'Find, download, and organize GGUF model files for local inference.',
    details: [
      'Model download helper for local LLM users.',
      'Designed to reduce broken links and manual file sorting.',
      'Future roadmap includes checksums and metadata.'
    ]
  }
];

function iconLetters(name) {
  return name.split(/\s+/).map((part) => part[0]).join('').slice(0, 3).toUpperCase();
}

function card(app) {
  return `
    <a class="app-card" href="/${app.slug}/" style="--app-accent:${app.accent}">
      <span class="app-icon">${iconLetters(app.name)}</span>
      <span class="app-meta">
        <small>${app.eyebrow}</small>
        <strong>${app.name}</strong>
        <em>${app.status}</em>
      </span>
      <span class="card-arrow">View</span>
      <p>${app.summary}</p>
    </a>
  `;
}

function renderHome() {
  const grid = document.querySelector('[data-app-grid]');
  if (grid) {
    grid.innerHTML = apps.map(card).join('');
  }
}

function renderAppPage(slug) {
  const app = apps.find((item) => item.slug === slug);
  if (!app) {
    window.location.replace('/');
    return;
  }
  if (!document.querySelector('[data-app-name]')) {
    document.body.innerHTML = `
      <main class="shell">
        <header class="topbar">
          <a class="brand" href="/">
            <span class="brand-mark">PS</span>
            <span>
              <strong>PhotonSec Apps</strong>
              <span>Security and operations tools</span>
            </span>
          </a>
          <a class="nav-link" href="/">All apps</a>
        </header>

        <section class="app-main">
          <div class="app-hero">
            <p class="eyebrow" data-app-eyebrow></p>
            <h1 data-app-name></h1>
            <p class="hero-copy" data-app-summary></p>
          </div>
          <aside class="app-page-card">
            <span class="large-icon" data-app-icon></span>
            <small>Status</small>
            <strong class="status-pill" data-app-status></strong>
            <ul data-app-details></ul>
            <a class="button" data-app-action href="#">Open</a>
          </aside>
        </section>
        <footer>apps.photonsec.com.au</footer>
      </main>
    `;
  }
  document.title = `${app.name} - PhotonSec Apps`;
  document.documentElement.style.setProperty('--page-accent', app.accent);
  document.querySelector('[data-app-icon]').textContent = iconLetters(app.name);
  document.querySelector('[data-app-eyebrow]').textContent = app.eyebrow;
  document.querySelector('[data-app-name]').textContent = app.name;
  document.querySelector('[data-app-status]').textContent = app.status;
  document.querySelector('[data-app-summary]').textContent = app.summary;
  document.querySelector('[data-app-details]').innerHTML = app.details.map((detail) => `<li>${detail}</li>`).join('');
  const action = document.querySelector('[data-app-action]');
  if (app.href) {
    action.href = app.href;
    action.textContent = app.action || 'Open';
  } else {
    action.remove();
  }
}

window.PhotonSecApps = { renderHome, renderAppPage };
