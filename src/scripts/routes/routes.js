import HomePresenter from "../presenters/dashboard.js";
import DetailPresenter from "../presenters/story-detail.js";
import AddStoryPresenter from "../presenters/story-upload.js";
import LoginPresenter from "../presenters/auth-login.js";
import RegisterPresenter from "../presenters/auth-register.js";
import SavedReportPresenter from "../presenters/saved-report.js";
import AboutPage from "../views/pages/about-page.js";
import SavedStoriesPage from "../views/pages/save-story.js";
import { applyViewTransition } from "../utils/transition-util.js";
import authRepository from "../services/user-session.js";
import Swal from "sweetalert2";

const routes = {
  "/": HomePresenter,
  "/about": AboutPage,
  "/detail/:id": DetailPresenter,
  "/add": AddStoryPresenter,
  "/login": LoginPresenter,
  "/register": RegisterPresenter,
  "/saved-reports": SavedReportPresenter,
  "/saved-stories": {
    component: SavedStoriesPage,
    requireAuth: true,
  },
};

const knownFragments = ["mainContent", "pageContent"];

class Router {
  constructor() {
    this._currentPage = null;
    this._routes = routes;

    this._loadPage = this._loadPage.bind(this);
    this.navigate = this.navigate.bind(this);
  }

  init() {
    window.addEventListener("hashchange", this._loadPage);
    this._loadPage();
  }

  async _loadPage() {
    const hash = window.location.hash.slice(1) || "/";

    if (knownFragments.includes(hash)) {
      const fragment = document.getElementById(hash);
      if (fragment) {
        if (!fragment.hasAttribute("tabindex")) {
          fragment.setAttribute("tabindex", "-1");
        }
        fragment.focus();
        fragment.scrollIntoView();
      }
      return;
    }

    let page = null;
    let params = {};

    for (const [pattern, presenter] of Object.entries(this._routes)) {
      const regex = this._convertRouteToRegex(pattern);
      const match = hash.match(regex);

      if (match) {
        if (pattern.includes(":")) {
          const paramNames = pattern
            .split("/")
            .filter((segment) => segment.startsWith(":"))
            .map((param) => param.slice(1));

          const paramValues = match.slice(1);

          paramNames.forEach((name, index) => {
            params[name] = paramValues[index];
          });
        }

        page = presenter.component || presenter;
        break;
      }
    }

    if (this._currentPage && typeof this._currentPage.cleanup === "function") {
      this._currentPage.cleanup();
    }

    if (page) {
      if (
        (this._isProtectedRoute(hash) || this._requiresAuth(hash)) &&
        !this._isAuthenticated()
      ) {
        Swal.fire({
          title: "Login Required",
          text: "Please login to access this page",
          icon: "warning",
          confirmButtonColor: "#00796b",
        }).then(() => {
          this.navigate("/login");
        });
        return;
      }

      try {
        await applyViewTransition(async () => {
          const pageContainer = document.querySelector("#pageContent");
          if (!pageContainer) {
            throw new Error("Page container not found");
          }

          this._currentPage = new page({
            container: pageContainer,
            ...params,
          });

          await this._currentPage.init();
        });
      } catch (error) {
        console.error("Failed to load page:", error);
        const pageContent = document.querySelector("#pageContent");
        if (pageContent) {
          pageContent.innerHTML = `
            <div class="error-container">
              <i class="fas fa-exclamation-circle error-icon"></i>
              <h2>Oops! Something went wrong</h2>
              <p class="error-message">${error.message}</p>
              <button class="button" onclick="window.location.reload()">
                <i class="fas fa-redo"></i> Try Again
              </button>
            </div>
          `;
        }
      }
    } else {
      document.querySelector("#pageContent").innerHTML = `
        <div class="error-container">
          <i class="fas fa-search error-icon"></i>
          <h2>Page Not Found</h2>
          <p class="error-message">The page you're looking for doesn't exist.</p>
          <button class="button" onclick="window.location.hash = '#'">
            <i class="fas fa-compass"></i> Go to Explore
          </button>
        </div>
      `;
    }
  }

  /**
   * Navigate to a specific route
   * @param {string} path - Route path
   */
  navigate(path) {
    window.location.hash = path;
  }

  /**
   * Check if route requires authentication
   * @param {string} route - Route to check
   * @returns {boolean} Whether route is protected
   */
  _isProtectedRoute(route) {
    const protectedRoutes = ["/add", "/detail"];
    return protectedRoutes.some((r) => route.startsWith(r));
  }

  /**
   * Check if route requires authentication based on route config
   * @param {string} route - Route to check
   * @returns {boolean} Whether route requires authentication
   */
  _requiresAuth(route) {
    const routeConfig = Object.entries(this._routes).find(([pattern]) => {
      const regex = this._convertRouteToRegex(pattern);
      return regex.test(route);
    });

    return routeConfig && routeConfig[1].requireAuth;
  }

  /**
   * Check if user is authenticated
   * @returns {boolean} Whether user is authenticated
   */
  _isAuthenticated() {
    return authRepository.isAuthenticated();
  }

  /**
   * Convert route pattern to regex for matching
   * @param {string} route - Route pattern
   * @returns {RegExp} Route regex
   */
  _convertRouteToRegex(route) {
    const pattern = route.replace(/\//g, "\\/").replace(/:\w+/g, "([^/]+)");

    return new RegExp(`^${pattern}$`);
  }
}

export default Router;
