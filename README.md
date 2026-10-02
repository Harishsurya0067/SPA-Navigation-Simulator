# SPA Navigation Simulator

A clean, modern, and professional **Single Page Application (SPA) Simulation** built strictly with **vanilla HTML, CSS, and JavaScript** (no external libraries or frameworks).

This project demonstrates how client-side routing, the HTML5 History API (`pushState` and `popstate`), and asynchronous DOM updates work under the hood in modern web applications.

---

## 🌟 Key Features

* **Zero Page Reloads**: Navigating between pages updates only the dynamic view container (`#app`) without tearing down the DOM or requesting a new HTML page from the web server.
* **HTML5 History API Integration**:
  * Uses `history.pushState()` to update the URL in the browser address bar.
  * Listens to the `popstate` event so the browser's native **Back** and **Forward** buttons work seamlessly.
* **Custom 404 Route Handler**: Unknown or misspelled URLs (e.g. `/unknown`, `/test-404`) automatically present a styled 404 error template with recovery navigation buttons.
* **Professional Blue-and-White Theme**: Styled using modern CSS variables, responsive flexbox/grid layouts, clean typography, soft drop-shadows, and smooth fade-in animations.
* **Interactive Browser Simulator Bar**:
  * Includes in-page Back, Forward, and Soft Reload buttons.
  * Features a simulated address bar where you can type any path (e.g., `/contact`, `/services`, `/random`) and press "Go" to test routing immediately.
  * Includes a live route status badge (`200 OK` vs `404 Not Found`).
* **Mobile-Responsive**: Includes a hamburger menu toggle for mobile viewports and flexible card grids.

---

## 📁 Project Structure

```text
SPA Navigation Simulator/
├── index.html        # Main application shell with navbar, simulator bar, and view container
├── style.css         # Professional blue-and-white theme, layout, and animations
├── script.js         # Router engine, route registry, History API handling, and event delegation
├── README.md         # Documentation, usage guide, and technical explanations
└── report.md         # Comprehensive academic technical report (Week 5 submission)
```

---

## 🚀 How to Run the Project

You can run this project in two simple ways:

### Option 1: Direct File Execution (Beginner-Friendly)
Double-click `index.html` or drag it into any web browser (Chrome, Edge, Firefox, Safari).
> The application includes automatic hash/fallback detection, ensuring the simulator bar and History API work smoothly even over the `file:///` protocol.

### Option 2: Local HTTP Server (Recommended)
Running through an HTTP server provides the most authentic experience:

* **VS Code Live Server**: Right-click `index.html` and select **"Open with Live Server"**.
* **Python**:
  ```bash
  python -m http.server 8000
  ```
  Then open `http://localhost:8000` in your browser.
* **Node.js**:
  ```bash
  npx serve .
  ```

---

## 🛠️ How It Works (Step-by-Step)

1. **Click Interception (`data-link`)**:
   Every navigation anchor is tagged with a `data-link` attribute. When clicked, an event listener invokes `event.preventDefault()` to stop the browser from issuing an HTTP GET request to reload the page.
2. **Pushing State (`pushState`)**:
   The router calls `history.pushState({ path }, "", path)` to push the new entry to the browser's navigation history stack and update the address bar URL.
3. **Dynamic Template Rendering**:
   The router looks up the current route in the `routes` dictionary:
   ```javascript
   const routes = {
     "/": { title: "Home", render: () => `...` },
     "/about": { title: "About", render: () => `...` },
     "/services": { title: "Services", render: () => `...` },
     "/contact": { title: "Contact", render: () => `...` }
   };
   ```
   If matched, the HTML string is injected into `document.getElementById('app')`. If not matched, `renderNotFound(path)` is triggered.
4. **Browser Back and Forward (`popstate`)**:
   When the user clicks the browser Back or Forward button, the browser emits the `window.onpopstate` event. The router catches this event and re-renders the previous view corresponding to the historical state.

---

## 🧪 Testing Checklist

| Test Item | Action | Expected Result | Status |
| :--- | :--- | :--- | :--- |
| **Link Navigation** | Click `Home`, `About`, `Services`, `Contact` in nav bar | View updates immediately; no full page reload or flashing screen | Passed |
| **History API** | Click through 3 routes, then click browser **Back** / **Forward** | Browser traverses history; correct content renders; URL synchronizes | Passed |
| **Simulator Bar** | Enter `/random-route` into the simulator bar and click **Go** | Triggers custom 404 template displaying the unmatched path | Passed |
| **Active Link Highlighting** | Switch between routes | Active navigation item receives blue accent underline and background | Passed |
| **Mobile Responsiveness** | Resize browser below 680px width | Navigation collapses into a mobile hamburger menu | Passed |

---

## 🎓 Academic Info
* **Course Assignment**: Week 5 - SPA Navigation Simulator
* **Technology**: Vanilla HTML5, CSS3, ES6 JavaScript
* **Dependencies**: None (100% Zero Dependency)
