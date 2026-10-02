/**
 * SPA Navigation Simulator
 * Core JavaScript Engine
 * Handles client-side routing, History API (pushState & popstate),
 * dynamic template rendering, active link states, and 404 views.
 */

// Route Definitions and View Templates
const routes = {
  "/": {
    title: "Home | SPA Navigation Simulator",
    render: () => `
      <div class="hero fade-in">
        <span class="badge-pill">🚀 Client-Side Routing in Action</span>
        <h1 class="page-title">Lightning-Fast SPA Navigation Simulator</h1>
        <p class="page-subtitle">
          Experience seamless page changes with zero browser reloads. Powered entirely by vanilla JavaScript and the standard HTML5 History API.
        </p>
        <div class="cta-group">
          <a href="/about" class="btn btn-primary" data-link>Explore Architecture &rarr;</a>
          <a href="/services" class="btn btn-secondary" data-link>View Features</a>
        </div>
      </div>

      <div class="feature-grid fade-in">
        <div class="feature-card">
          <div class="card-icon">⚡</div>
          <h3>Zero Server Roundtrips</h3>
          <p>Navigating between views does not request new HTML documents from the server. Only the relevant DOM subtrees are dynamically updated.</p>
        </div>
        <div class="feature-card">
          <div class="card-icon">🔄</div>
          <h3>Native History Integration</h3>
          <p>Full support for browser Back and Forward buttons using <code>history.pushState()</code> and the <code>popstate</code> event listener.</p>
        </div>
        <div class="feature-card">
          <div class="card-icon">🛡️</div>
          <h3>Client-Side 404 Routing</h3>
          <p>Unmatched route queries are caught cleanly on the client without throwing server HTTP errors, presenting a user-friendly recovery view.</p>
        </div>
      </div>
    `
  },

  "/about": {
    title: "About | SPA Navigation Simulator",
    render: () => `
      <div class="fade-in">
        <div class="hero" style="margin-bottom: 2rem;">
          <span class="badge-pill">📖 Project Overview</span>
          <h1 class="page-title">About the SPA Simulator</h1>
          <p class="page-subtitle">
            Designed for students and developers to master the core principles of Single Page Applications without the overhead of heavy front-end frameworks.
          </p>
        </div>

        <div class="feature-card" style="margin-bottom: 2rem;">
          <h3>What makes an application an SPA?</h3>
          <p>
            In traditional Multi-Page Applications (MPAs), clicking any link asks the server for a full HTML document, blanking out the window and incurring render latency. In contrast, an SPA loads a single HTML shell (<code>index.html</code>) once. Subsequent interactions replace only the dynamic view container while synchronizing the URL bar.
          </p>
        </div>

        <h3 style="font-size: 1.3rem; color: var(--primary-blue-deep); margin-bottom: 1rem;">Execution Flow:</h3>
        <div class="timeline">
          <div class="timeline-step">
            <span class="timeline-badge">01</span>
            <div class="timeline-content">
              <h4>Event Interception</h4>
              <p>User clicks an anchor element tagged with <code>data-link</code>. A delegated click handler calls <code>e.preventDefault()</code> to intercept the normal HTTP navigation.</p>
            </div>
          </div>
          <div class="timeline-step">
            <span class="timeline-badge">02</span>
            <div class="timeline-content">
              <h4>URL State Push</h4>
              <p>The router invokes <code>history.pushState(state, title, url)</code>, safely updating the browser's address bar without requesting a new page from the host.</p>
            </div>
          </div>
          <div class="timeline-step">
            <span class="timeline-badge">03</span>
            <div class="timeline-content">
              <h4>Route Matching &amp; Rendering</h4>
              <p>The router matches the requested path against the routes lookup map and renders the appropriate HTML into the <code>#app</code> container with entrance animations.</p>
            </div>
          </div>
          <div class="timeline-step">
            <span class="timeline-badge">04</span>
            <div class="timeline-content">
              <h4>Popstate Synchronization</h4>
              <p>When the user presses browser Back/Forward, a global <code>window.addEventListener('popstate')</code> fires, immediately synchronizing the view with the updated location.</p>
            </div>
          </div>
        </div>
      </div>
    `
  },

  "/services": {
    title: "Services & Features | SPA Navigation Simulator",
    render: () => `
      <div class="fade-in">
        <div class="hero" style="margin-bottom: 2rem;">
          <span class="badge-pill">🛠️ Capabilities</span>
          <h1 class="page-title">Technical Capabilities &amp; Services</h1>
          <p class="page-subtitle">
            An overview of the architectural advantages and simulated services provided by modern client-side architectures.
          </p>
        </div>

        <table class="comparison-table">
          <thead>
            <tr>
              <th>Feature / Metric</th>
              <th>Traditional MPA</th>
              <th>SPA Architecture (This App)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Page Reload</strong></td>
              <td>Full white flash / browser reload</td>
              <td>Instantaneous DOM swap, zero flash</td>
            </tr>
            <tr>
              <td><strong>History Navigation</strong></td>
              <td>Handled by server roundtrips</td>
              <td>Handled by HTML5 History API (pushState)</td>
            </tr>
            <tr>
              <td><strong>Server Load</strong></td>
              <td>High (Re-renders full HTML each time)</td>
              <td>Minimal (Static shell + client rendering)</td>
            </tr>
            <tr>
              <td><strong>User Experience</strong></td>
              <td>Stuttering and perceived delay</td>
              <td>Fluid, app-like responsive transitions</td>
            </tr>
            <tr>
              <td><strong>404 Handling</strong></td>
              <td>Server HTTP 404 response page</td>
              <td>Instant client-side fallback route</td>
            </tr>
          </tbody>
        </table>

        <div class="cta-group" style="margin-top: 2.5rem;">
          <a href="/contact" class="btn btn-primary" data-link>Inquire or Send Feedback &rarr;</a>
          <a href="/unknown-service" class="btn btn-secondary" data-link>Test Invalid Service (404)</a>
        </div>
      </div>
    `
  },

  "/contact": {
    title: "Contact | SPA Navigation Simulator",
    render: () => `
      <div class="fade-in">
        <div class="hero" style="margin-bottom: 2rem;">
          <span class="badge-pill">📬 Get In Touch</span>
          <h1 class="page-title">Contact &amp; Feedback</h1>
          <p class="page-subtitle">
            Submit a message to verify that interactive form state can be handled seamlessly within the SPA container.
          </p>
        </div>

        <div class="contact-container">
          <div class="contact-info-panel">
            <div class="contact-item">
              <div class="contact-icon">📍</div>
              <div>
                <h4 style="color: var(--primary-blue-deep);">Project Location</h4>
                <p style="color: var(--text-muted); font-size: 0.9rem;">SPA Navigation Simulator - Academic Assignment</p>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">💻</div>
              <div>
                <h4 style="color: var(--primary-blue-deep);">Tech Stack</h4>
                <p style="color: var(--text-muted); font-size: 0.9rem;">Pure HTML5, CSS3, Vanilla JavaScript (ES6+)</p>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">✨</div>
              <div>
                <h4 style="color: var(--primary-blue-deep);">State Preservation</h4>
                <p style="color: var(--text-muted); font-size: 0.9rem;">Demonstrating smooth DOM interaction without refreshing.</p>
              </div>
            </div>
          </div>

          <form id="contactForm" class="contact-form">
            <div id="contactAlert" class="form-notification">
              <span>✅</span> Message captured in local state! (Zero page reload).
            </div>
            <div class="form-group">
              <label for="nameInput">Full Name</label>
              <input type="text" id="nameInput" class="form-control" placeholder="e.g. John Doe" required />
            </div>
            <div class="form-group">
              <label for="emailInput">Email Address</label>
              <input type="email" id="emailInput" class="form-control" placeholder="e.g. john@example.com" required />
            </div>
            <div class="form-group">
              <label for="messageInput">Message</label>
              <textarea id="messageInput" rows="3" class="form-control" placeholder="Write your thoughts..." required></textarea>
            </div>
            <button type="submit" class="btn btn-primary" style="margin-top: 0.5rem;">Send Message</button>
          </form>
        </div>
      </div>
    `
  }
};

/**
 * 404 Not Found Template
 */
function renderNotFound(path) {
  return `
    <div class="not-found-card fade-in">
      <div class="not-found-code">404</div>
      <span class="not-found-badge">Route Not Found</span>
      <h2 style="font-size: 1.5rem; color: var(--primary-blue-deep); margin-bottom: 0.5rem;">Oops! Page Does Not Exist</h2>
      <p style="color: var(--text-muted); font-size: 0.95rem;">
        The client-side router could not match the requested path in the route registry.
      </p>
      <div>
        <div class="not-found-path-box">Requested Path: <strong>${escapeHtml(path)}</strong></div>
      </div>
      <div class="cta-group" style="margin-top: 1rem;">
        <a href="/" class="btn btn-primary" data-link>&larr; Return to Safety (Home)</a>
        <a href="/services" class="btn btn-secondary" data-link>View Services</a>
      </div>
    </div>
  `;
}

/**
 * Utility: HTML Escape for safe reflection of path
 */
function escapeHtml(string) {
  const div = document.createElement("div");
  div.innerText = string;
  return div.innerHTML;
}

/**
 * Normalize paths to handle relative, hash, and standard pathnames
 */
function getNormalizedPath(pathname) {
  // If running via file:// or with hash fallback
  if (window.location.protocol === "file:") {
    const hash = window.location.hash;
    if (hash && hash.startsWith("#")) {
      const parsed = hash.slice(1);
      return parsed.startsWith("/") ? parsed : `/${parsed}`;
    }
  }

  // Otherwise standard path
  let path = pathname || window.location.pathname;
  
  // Strip trailing slashes unless it is root '/'
  if (path.length > 1 && path.endsWith("/")) {
    path = path.slice(0, -1);
  }

  // If path ends with index.html, normalize to '/'
  if (path.endsWith("/index.html") || path === "index.html") {
    path = "/";
  }

  return path;
}

/**
 * Core Router Engine
 */
class Router {
  constructor() {
    this.appElement = document.getElementById("app");
    this.addressInput = document.getElementById("addressInput");
    this.historyStateBadge = document.getElementById("historyStateBadge");
    this.init();
  }

  init() {
    // 1. Intercept internal anchor clicks
    document.addEventListener("click", (e) => {
      const link = e.target.closest("[data-link]");
      if (link) {
        e.preventDefault();
        const href = link.getAttribute("href");
        this.navigateTo(href);
      }
    });

    // 2. Listen to browser Back/Forward buttons (PopState event)
    window.addEventListener("popstate", (e) => {
      const currentPath = (e.state && e.state.path) ? e.state.path : getNormalizedPath();
      this.renderRoute(currentPath, false);
    });

    // 3. Setup simulated browser address bar controls
    const urlForm = document.getElementById("urlForm");
    if (urlForm) {
      urlForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let target = this.addressInput.value.trim();
        if (!target.startsWith("/")) {
          target = `/${target}`;
        }
        this.navigateTo(target);
      });
    }

    const btnBack = document.getElementById("btnBack");
    if (btnBack) {
      btnBack.addEventListener("click", () => window.history.back());
    }

    const btnForward = document.getElementById("btnForward");
    if (btnForward) {
      btnForward.addEventListener("click", () => window.history.forward());
    }

    const btnReload = document.getElementById("btnReload");
    if (btnReload) {
      btnReload.addEventListener("click", () => {
        const currentPath = getNormalizedPath();
        this.renderRoute(currentPath, false);
      });
    }

    // 4. Mobile hamburger toggle
    const mobileToggle = document.getElementById("mobileToggle");
    const navMenu = document.getElementById("navMenu");
    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener("click", () => {
        navMenu.classList.toggle("open");
      });
    }

    // 5. Initial route render based on initial location
    const initialPath = getNormalizedPath();
    this.renderRoute(initialPath, true);
  }

  /**
   * Programmatic navigation: pushes state and renders view
   */
  navigateTo(url) {
    const normalizedUrl = url.startsWith("/") ? url : `/${url}`;

    // Handle environment: if file:// protocol, also update hash for durability
    if (window.location.protocol === "file:") {
      window.location.hash = `#${normalizedUrl}`;
      history.pushState({ path: normalizedUrl }, "", window.location.href);
    } else {
      history.pushState({ path: normalizedUrl }, "", normalizedUrl);
    }

    this.renderRoute(normalizedUrl, false);
  }

  /**
   * Render the corresponding route into the DOM
   */
  renderRoute(path, isInitial = false) {
    const route = routes[path];

    if (route) {
      document.title = route.title;
      this.appElement.innerHTML = route.render();
      this.updateBadgeState("200 OK");
    } else {
      document.title = "404 Not Found | SPA Navigation Simulator";
      this.appElement.innerHTML = renderNotFound(path);
      this.updateBadgeState("404 Not Found", true);
    }

    // Update Simulated Address Input Bar
    if (this.addressInput) {
      this.addressInput.value = path;
    }

    // Update Navigation Active Links
    this.updateActiveNavLinks(path);

    // Attach dynamic page-specific event listeners (e.g. form submission)
    this.attachViewEvents(path);

    // Close mobile menu if open
    const navMenu = document.getElementById("navMenu");
    if (navMenu && navMenu.classList.contains("open")) {
      navMenu.classList.remove("open");
    }

    // Scroll smoothly to top of content
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /**
   * Highlight active link in the navigation bar
   */
  updateActiveNavLinks(path) {
    const navLinks = document.querySelectorAll(".nav-link[data-link]");
    navLinks.forEach((link) => {
      const linkHref = link.getAttribute("href");
      if (linkHref === path) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  /**
   * Update status indicator badge
   */
  updateBadgeState(statusText, isError = false) {
    if (!this.historyStateBadge) return;
    this.historyStateBadge.textContent = `Route: ${statusText}`;
    if (isError) {
      this.historyStateBadge.style.background = "#fee2e2";
      this.historyStateBadge.style.color = "#991b1b";
      this.historyStateBadge.style.borderColor = "#fecaca";
    } else {
      this.historyStateBadge.style.background = "#f0f9ff";
      this.historyStateBadge.style.color = "#0369a1";
      this.historyStateBadge.style.borderColor = "#bae6fd";
    }
  }

  /**
   * Page-specific handlers (like Contact form submission demo)
   */
  attachViewEvents(path) {
    if (path === "/contact") {
      const contactForm = document.getElementById("contactForm");
      const contactAlert = document.getElementById("contactAlert");
      if (contactForm && contactAlert) {
        contactForm.addEventListener("submit", (e) => {
          e.preventDefault();
          contactAlert.style.display = "flex";
          contactForm.reset();
          setTimeout(() => {
            contactAlert.style.display = "none";
          }, 4000);
        });
      }
    }
  }
}

// Initialize Router when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.spaRouter = new Router();
});
