# Week 5 Technical Report: Single Page Application (SPA) Simulator

**Student Project:** SPA Navigation Simulator  
**Submission:** Week 5 Assignment  
**Technology Stack:** Vanilla HTML5, CSS3, Vanilla JavaScript (ES6+)  
**External Frameworks/Libraries Used:** None (Zero-Dependency)  

---

## 1. Project Overview & Objectives

In traditional Multi-Page Application (MPA) architectures, every link navigation requires the browser to submit an HTTP request to the web server, dispose of the current DOM document, and re-parse an entire HTML payload. This leads to visible screen flashing, redundant network overhead, and sluggish user interactions.

The primary objective of this project was to design, construct, and evaluate a clean, beginner-friendly **Single Page Application (SPA) Simulation** from first principles using solely vanilla web technologies.

### Key Goals:
1. Deliver a single container document (`index.html`) that remains loaded throughout the user session.
2. Intercept link navigations to replace specific DOM regions without triggering page reloads.
3. Integrate the standard **HTML5 History API** (`window.history.pushState` and `window.addEventListener('popstate', ...)`) to preserve deep-linking and browser Back/Forward capabilities.
4. Provide robust client-side 404 error routing for unregistered or malformed routes.
5. Create a professional, responsive user interface adhering to a modern **blue-and-white visual theme**.

---

## 2. System Architecture & Design

### 2.1 High-Level Architecture Diagram

```
+-------------------------------------------------------------------------+
|                              Web Browser                                |
|                                                                         |
|  [ User Clicks Anchor <a data-link> ]     [ User Hits Back/Forward ]   |
|                 |                                      |                |
|                 v                                      v                |
|       e.preventDefault()                        'popstate' Event        |
|                 |                                      |                |
|                 v                                      |                |
|       history.pushState(state, '', path)               |                |
|                 |                                      |                |
|                 +------------------+-------------------+                |
|                                    |                                    |
|                                    v                                    |
|                         [ Router Engine: script.js ]                    |
|                                    |                                    |
|                    +---------------+---------------+                    |
|                    | Check Route in Registry Table |                    |
|                    +---------------+---------------+                    |
|                                    |                                    |
|             +----------------------+----------------------+             |
|             |                                             |             |
|             v (Match Found)                               v (No Match)  |
|       [ Render View Template ]                     [ Render Custom 404 ]|
|             |                                             |             |
|             +----------------------+----------------------+             |
|                                    |                                    |
|                                    v                                    |
|                       <main id="app"> DOM Injection                     |
|                                    |                                    |
|                 Update Active Links + Address Bar Input                 |
+-------------------------------------------------------------------------+
```

### 2.2 Component Breakdown

* **Application Shell (`index.html`)**: Defines persistent global elements, including the brand header, responsive navigation bar, interactive simulated address bar, and dynamic content viewport (`<main id="app">`).
* **Design System (`style.css`)**: Encapsulates design tokens via CSS variables (`--primary-blue`, `--bg-card`, `--shadow-md`), fluid typography, and entrance keyframe animations (`@keyframes enterAnim`).
* **Client-Side Router (`script.js`)**: Encapsulates the `Router` class containing:
  * `routes` dictionary mapping route strings (`/`, `/about`, `/services`, `/contact`) to view templates.
  * Click delegation interceptor for `[data-link]` attributes.
  * State synchronizer handling `pushState` and `popstate`.
  * Dynamic fallback renderer `renderNotFound(path)`.

---

## 3. Implementation Details

### 3.1 Intercepting Browser Navigation
Under standard browser mechanics, clicking `<a href="/about">` causes the browser to issue an HTTP request for `/about`. In this SPA, we tag navigation anchors with the `data-link` attribute and attach a unified event listener to the document root:

```javascript
document.addEventListener("click", (e) => {
  const link = e.target.closest("[data-link]");
  if (link) {
    e.preventDefault(); // Stop default browser reload
    const href = link.getAttribute("href");
    this.navigateTo(href);
  }
});
```

### 3.2 URL Management with `pushState`
When `navigateTo(url)` is invoked, the application updates the browser's address bar without contacting the server:

```javascript
history.pushState({ path: normalizedUrl }, "", normalizedUrl);
this.renderRoute(normalizedUrl, false);
```

This ensures the user sees an authentic URL in their browser's location bar, enabling direct bookmarking and clean URLs.

### 3.3 Supporting Back & Forward Buttons via `popstate`
A common defect in amateur SPA implementations is breaking the browser's Back and Forward buttons. This application attaches a listener to the `popstate` event:

```javascript
window.addEventListener("popstate", (e) => {
  const currentPath = (e.state && e.state.path) 
    ? e.state.path 
    : getNormalizedPath();
  this.renderRoute(currentPath, false);
});
```
When the user navigates backward or forward in the history stack, the router detects the event and dynamically renders the previous state without reloading.

### 3.4 Custom 404 Route Handling
If the user requests a route not defined in the `routes` table (e.g. `/unknown-path`), the router intercepts it and renders a dedicated 404 view rather than causing a blank screen or unhandled exception:

```javascript
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
```

---

## 4. Challenges & Technical Solutions

| # | Challenge | Root Cause | Solution Implemented |
|---|---|---|---|
| **1** | **Direct `file:///` Protocol Restrictions** | When double-clicking `index.html` directly from a file explorer without a web server, `pushState` with absolute paths like `/about` can raise security errors in certain browsers. | Implemented protocol detection (`window.location.protocol === "file:"`). If executed as a local file, it gracefully binds hash states (`#about`) while maintaining the simulated address bar so the application functions flawlessly in both file and HTTP server modes. |
| **2** | **Broken Browser History on Anchor Clicks** | Simply calling `e.preventDefault()` stops navigation but fails to record history entries if `pushState` is omitted. | Coupled link interception directly with `history.pushState` and mapped state payloads `{ path }` to preserve complete stack integrity. |
| **3** | **Page View Stale States** | When loading a new view, previous interactive elements (e.g., forms) may leave orphaned event listeners or inconsistent active nav indicators. | Centralized view mounting inside `renderRoute()` which performs atomic DOM replacements, recalculates `.active` classes on all navigation links, and binds fresh listeners. |
| **4** | **Cross-Site Scripting (XSS) in 404 Reflective Views** | In traditional 404 pages, displaying the unmatched path directly using `innerHTML` could open an XSS vector if arbitrary script tags are entered in the URL. | Created a sanitization helper `escapeHtml(string)` using standard `textContent` DOM nodes before interpolating dynamic paths into the 404 error banner. |

---

## 5. Testing & Verification

The application was tested across multiple dimensions to verify compliance with all Week 5 assignment requirements:

### 5.1 Route Navigation & DOM State Verification
* **Action:** Sequentially clicked **Home** &rarr; **About** &rarr; **Services** &rarr; **Contact**.
* **Result:** Content updated instantaneously inside `<main id="app">`. Browser network activity confirmed zero additional document requests (`200 OK` static shell preserved).

### 5.2 Browser History (Back / Forward)
* **Action:** Navigated from **Home** to **About** to **Services**. Clicked browser **Back** twice, then clicked **Forward** once.
* **Result:** Reverted from `Services` to `About`, then back to `Home`, then forward to `About`. The URL address bar, simulated address bar, and active link highlights synchronized automatically.

### 5.3 Custom 404 Handler Verification
* **Action:** Navigated to `/non-existent-page` using the simulated address bar and clicked **Go**.
* **Result:** The router rendered the 404 template displaying `404 - Route Not Found` with the sanitized requested path and a functional "Return to Safety (Home)" recovery button.

### 5.4 Mobile Responsiveness & Layout
* **Action:** Scaled the viewport down to 375px (iPhone dimensions) and 768px (tablet dimensions).
* **Result:** Desktop navigation transformed into an accessible hamburger menu with fluid card wrapping and responsive comparison tables.

---

## 6. Conclusion & Future Work

The **SPA Navigation Simulator** successfully fulfills all requirements set forth in the Week 5 assignment specifications. By eliminating heavy front-end libraries and focusing on native browser APIs, the project highlights the foundational building blocks that power modern enterprise frameworks like React Router, Vue Router, and Angular Router.

### Potential Future Enhancements:
1. **Dynamic Route Parameters**: Introducing token-based route patterns (e.g. `/services/:id`).
2. **Asynchronous Code-Splitting**: Fetching view templates on-demand via `fetch()` or dynamic ES module imports.
3. **Route Guards**: Adding authentication middleware to protect designated routes prior to rendering.
