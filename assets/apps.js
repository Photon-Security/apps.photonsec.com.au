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
    action: 'Open repository',
    href: 'https://github.com/Photon-Security/iPhone_Media_Transfer'
  },
  {
    slug: 'proxy-ssl-trust',
    name: 'Proxy SSL Trust',
    eyebrow: 'Certificate utility',
    status: 'Public repo',
    accent: '#38d996',
    summary: 'Detect proxy settings, extract internal CAs, and configure CLI trust for corporate network tooling.',
    details: [
      'Detects proxy configuration and local certificate trust state.',
      'Extracts internal CAs from macOS Keychain.',
      'Configures common CLI tools for proxy SSL interception environments.'
    ],
    action: 'Open repository',
    href: 'https://github.com/Photon-Security/proxy-ssl-trust'
  },
  {
    slug: 'video-to-gif',
    name: 'Video to GIF',
    eyebrow: 'Media converter',
    status: 'Public repo',
    accent: '#ffcf5c',
    summary: 'Convert video files to optimized GIFs using FFmpeg with a simple local workflow.',
    details: [
      'Supports common video formats including MP4, AVI, and MOV.',
      'Built around local FFmpeg conversion.',
      'Useful for demos, issue reports, and lightweight sharing.'
    ],
    action: 'Open repository',
    href: 'https://github.com/Photon-Security/video-to-gif'
  },
  {
    slug: 'litellm-key-renewer',
    name: 'LiteLLM Key Renewer',
    eyebrow: 'Ops automation',
    status: 'Public repo',
    accent: '#9d7cff',
    summary: 'Validate, renew, and manage LiteLLM API keys with less manual console work.',
    details: [
      'Designed for LiteLLM gateway users.',
      'Automates key validation and renewal flow.',
      'Integrates with macOS Keychain for local key storage.'
    ],
    action: 'Open repository',
    href: 'https://github.com/Photon-Security/litellm-key-updater'
  },
  {
    slug: 'portkey-key-renewer',
    name: 'Portkey Key Renewer',
    eyebrow: 'Ops automation',
    status: 'Public repo',
    accent: '#ff7aa2',
    summary: 'Update and renew Portkey API keys with a repeatable local workflow.',
    details: [
      'Operational helper for routine key hygiene.',
      'Keeps renewal steps consistent across environments.',
      'Built for auditability.'
    ],
    action: 'Open repository',
    href: 'https://github.com/Photon-Security/portkey-api-renewal'
  },
  {
    slug: 'local-llm-stack',
    name: 'Local LLM Stack',
    eyebrow: 'AI workstation',
    status: 'Private repo',
    accent: '#4dd4ac',
    summary: 'A local LLM environment using OpenWebUI, OpenCode, GitHub Copilot, Portkey, LiteLLM, Ollama, and Docker Model Registry.',
    details: [
      'Opinionated local setup for common LLM components.',
      'Routes requests through local and cloud model tooling.',
      'Private while the stack is still being cleaned up.'
    ],
    action: 'Open repository',
    href: 'https://github.com/Photon-Security/local-llm-stack'
  },
  {
    slug: 'identityiq-comparator',
    name: 'IdentityIQ Comparator',
    eyebrow: 'IAM review',
    status: 'Private repo',
    accent: '#5aa9ff',
    summary: 'Extract and compare SailPoint IdentityIQ user roles against other users or baselines without API access.',
    details: [
      'Diff-oriented workflow for SailPoint IdentityIQ data.',
      'Designed for role review and migration checks.',
      'Private while the tool is still being productized.'
    ],
    action: 'Open repository',
    href: 'https://github.com/Photon-Security/identityIQ-role-comparator'
  },
  {
    slug: 'gguf-model-downloader',
    name: 'GGUF Model Downloader',
    eyebrow: 'Model utility',
    status: 'Public repo',
    accent: '#f97316',
    summary: 'Download GGUF models from Docker Model Runner for local inference workflows.',
    details: [
      'Model download helper for local LLM users.',
      'Targets Docker Model Runner workflows.',
      'Public repository for the downloader utility.'
    ],
    action: 'Open repository',
    href: 'https://github.com/Photon-Security/Docker_Model_Downloader'
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
