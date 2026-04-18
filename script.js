/* ============================================
   LegacyWill.me — Router, Interactions & Login
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // =============================================
  // SPA ROUTER
  // =============================================

  // --- Static routes ---
  const staticRoutes = {
    '/':                'view-landing',
    '/login':           'view-login',
    '/signup':          'view-signup',
    '/forgot-password': 'view-forgot',
    '/dashboard':       'view-dashboard',
    '/settings':        'view-settings',
    '/will/new':        'view-will-new',
    '/reset-password':  'view-reset',
  };

  // --- Dynamic routes (order matters — more specific first) ---
  const dynamicRoutes = [
    { pattern: /^\/will\/([^/]+)\/share$/, viewId: 'view-share',   paramNames: ['id'] },
    { pattern: /^\/will\/([^/]+)$/,        viewId: 'view-will',    paramNames: ['id'] },
    { pattern: /^\/preview\/([^/]+)$/,     viewId: 'view-preview', paramNames: ['token'] },
  ];

  // --- Public routes (no auth required) ---
  const publicPaths = ['/', '/login', '/signup', '/forgot-password', '/reset-password'];

  // --- Auth stub ---
  function getCurrentUser() {
    const raw = sessionStorage.getItem('mockUser');
    if (!raw) return null;
    try { return JSON.parse(raw); } catch (e) { return null; }
  }

  // --- Route resolver ---
  function resolveRoute(path) {
    // 1. Try static routes first
    if (staticRoutes[path]) {
      return { viewId: staticRoutes[path], params: {} };
    }

    // 2. Try dynamic routes
    for (const route of dynamicRoutes) {
      const match = path.match(route.pattern);
      if (match) {
        const params = {};
        route.paramNames.forEach((name, i) => {
          params[name] = match[i + 1];
        });
        return { viewId: route.viewId, params };
      }
    }

    // 3. No match → 404
    return { viewId: 'view-404', params: {} };
  }

  // --- Route protection ---
  function isProtectedRoute(path) {
    if (publicPaths.includes(path)) return false;
    return true; // All non-public routes are protected
  }

  // Resolve base path (handles /legacywill/ prefix from local server)
  const basePath = getBasePath();

  function getBasePath() {
    const path = window.location.pathname;
    if (path.includes('/legacywill')) {
      return '/legacywill';
    }
    return '';
  }

  function getCleanPath(fullPath) {
    let clean = fullPath.replace(basePath, '') || '/';
    if (clean !== '/' && clean.endsWith('/')) {
      clean = clean.slice(0, -1);
    }
    return clean;
  }

  // --- Page titles ---
  const pageTitles = {
    'view-landing':   'LegacyWill.me — Not Just What You Leave. What You Stood For.',
    'view-login':     'Sign In — LegacyWill.me',
    'view-signup':    'Create Account — LegacyWill.me',
    'view-forgot':    'Reset Password — LegacyWill.me',
    'view-reset':     'Set New Password — LegacyWill.me',
    'view-dashboard': 'Dashboard — LegacyWill.me',
    'view-settings':  'Settings — LegacyWill.me',
    'view-will-new':  'New Legacy Will — LegacyWill.me',
    'view-will':      'Legacy Will — LegacyWill.me',
    'view-share':     'Share Will — LegacyWill.me',
    'view-preview':   'Preview — LegacyWill.me',
    'view-404':       'Page Not Found — LegacyWill.me',
  };

  // --- Body class mapping for views needing special backgrounds ---
  const authPanelViews = ['view-login', 'view-signup', 'view-forgot', 'view-reset'];
  const appViews = ['view-dashboard', 'view-will-new', 'view-will', 'view-share', 'view-settings', 'view-preview'];

  function navigateTo(path, pushState = true) {
    const cleanPath = path;

    // Route protection check
    if (isProtectedRoute(cleanPath) && !getCurrentUser()) {
      sessionStorage.setItem('redirectAfterLogin', cleanPath);
      navigateTo('/login', pushState);
      return;
    }

    const { viewId, params } = resolveRoute(cleanPath);

    // Store params globally
    window.__routeParams = params;

    const currentView = document.querySelector('.view--active');
    const nextView = document.getElementById(viewId);

    if (!nextView || currentView === nextView) return;

    // Update URL
    if (pushState) {
      history.pushState({ path: cleanPath }, '', basePath + cleanPath);
    }

    // Update page title
    document.title = pageTitles[viewId] || 'LegacyWill.me';

    // Restore global nav when leaving conversation view
    if (currentView?.id === 'view-will-new') {
      const globalNav = document.getElementById('nav');
      if (globalNav) globalNav.style.display = '';
    }

    // Animate out current view
    currentView.classList.add('view--exiting');

    setTimeout(() => {
      currentView.classList.remove('view--active', 'view--exiting');

      // Show and animate in next view
      nextView.classList.add('view--active', 'view--entering');

      // Scroll to top
      window.scrollTo(0, 0);

      // Toggle body classes for different view types
      document.body.classList.remove('login-active', 'app-active');

      if (authPanelViews.includes(viewId)) {
        document.body.classList.add('login-active');
      } else if (appViews.includes(viewId)) {
        document.body.classList.add('app-active');
      } else if (viewId === 'view-landing') {
        reInitReveals();
      }

      // Nav mode
      const navEl = document.getElementById('nav');
      if (navEl) {
        if (appViews.includes(viewId)) {
          navEl.classList.add('nav--app');
        } else {
          navEl.classList.remove('nav--app');
        }
      }

      // Call mount hook
      if (typeof onViewMount === 'function') {
        onViewMount(viewId, params);
      }

      setTimeout(() => {
        nextView.classList.remove('view--entering');
      }, 250);
    }, 200);
  }

  // Expose navigateTo globally so app.js can use it
  window.navigateTo = navigateTo;
  window.getCurrentUser = getCurrentUser;

  // Handle data-link clicks
  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-link]');
    if (!link) return;

    e.preventDefault();
    const href = link.getAttribute('href');
    if (href) navigateTo(href);
  });

  // Handle browser back/forward
  window.addEventListener('popstate', (e) => {
    const path = e.state?.path || getCleanPath(window.location.pathname);
    navigateTo(path, false);
  });

  // Initial route on page load
  const initialPath = getCleanPath(window.location.pathname);
  if (initialPath !== '/') {
    // Route protection on initial load
    if (isProtectedRoute(initialPath) && !getCurrentUser()) {
      sessionStorage.setItem('redirectAfterLogin', initialPath);
      const defaultView = document.querySelector('.view--active');
      const loginView = document.getElementById('view-login');
      if (defaultView && loginView && defaultView !== loginView) {
        defaultView.classList.remove('view--active');
        loginView.classList.add('view--active');
        document.body.classList.add('login-active');
        document.title = 'Sign In — LegacyWill.me';
      }
      history.replaceState({ path: '/login' }, '', basePath + '/login');
    } else {
      const { viewId, params } = resolveRoute(initialPath);
      window.__routeParams = params;
      const defaultView = document.querySelector('.view--active');
      const targetView = document.getElementById(viewId);
      if (defaultView && targetView && defaultView !== targetView) {
        defaultView.classList.remove('view--active');
        targetView.classList.add('view--active');

        if (authPanelViews.includes(viewId)) {
          document.body.classList.add('login-active');
        } else if (appViews.includes(viewId)) {
          document.body.classList.add('app-active');
          const navEl = document.getElementById('nav');
          if (navEl) navEl.classList.add('nav--app');
        }

        document.title = pageTitles[viewId] || 'LegacyWill.me';

        // Call mount hook on initial load
        setTimeout(() => {
          if (typeof onViewMount === 'function') {
            onViewMount(viewId, params);
          }
        }, 0);
      }
    }
  } else {
    window.__routeParams = {};
  }

  // Set initial history state
  history.replaceState({ path: initialPath }, '', window.location.href);


  // =============================================
  // SCROLL REVEAL (IntersectionObserver)
  // =============================================
  function initReveals() {
    const revealElements = document.querySelectorAll('#view-landing .reveal:not(.visible)');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  function reInitReveals() {
    // Re-observe any that haven't been revealed yet
    initReveals();
  }

  initReveals();


  // =============================================
  // NAVBAR SCROLL BEHAVIOR
  // =============================================
  const nav = document.getElementById('nav');

  const handleNavScroll = () => {
    if (document.body.classList.contains('login-active')) return;
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });


  // =============================================
  // MOBILE MENU TOGGLE
  // =============================================
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }


  // =============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // =============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      if (anchor.hasAttribute('data-link')) return; // Let router handle
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = nav ? nav.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });


  // =============================================
  // GRID PARALLAX
  // =============================================
  let ticking = false;

  const handleParallax = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        document.body.style.setProperty('--grid-offset', `${window.scrollY * 0.15}px`);
        ticking = false;
      });
      ticking = true;
    }
  };

  const parallaxStyle = document.createElement('style');
  parallaxStyle.textContent = `body::before { transform: translateY(var(--grid-offset, 0)); }`;
  document.head.appendChild(parallaxStyle);

  window.addEventListener('scroll', handleParallax, { passive: true });


  // =============================================
  // TYPING SIMULATION (UI MOCK)
  // =============================================
  const mockPlaceholder = document.querySelector('.mock__answer-placeholder');
  if (mockPlaceholder) {
    const phrases = [
      'Begin typing your reflection...',
      'I\'ve always believed that honesty...',
      'The one thing I never compromised...',
      'What I want my children to know...'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    const typeEffect = () => {
      if (isPaused) return;
      const current = phrases[phraseIndex];

      if (!isDeleting) {
        mockPlaceholder.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          isPaused = true;
          setTimeout(() => { isPaused = false; isDeleting = true; typeEffect(); }, 3000);
          return;
        }
      } else {
        mockPlaceholder.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }
      setTimeout(typeEffect, isDeleting ? 30 : 60);
    };

    setTimeout(typeEffect, 2000);
  }


  // =============================================
  // LOGIN FORM VALIDATION
  // =============================================
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('loginEmail');
  const passwordInput = document.getElementById('loginPassword');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const submitBtn = document.getElementById('loginSubmit');

  if (loginForm) {

    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showError(input, errorEl, message) {
      input.classList.add('has-error');
      errorEl.textContent = message;
      errorEl.classList.add('visible');
    }

    function clearError(input, errorEl) {
      input.classList.remove('has-error');
      errorEl.textContent = '';
      errorEl.classList.remove('visible');
    }

    function shakeField(input) {
      input.classList.add('shake');
      setTimeout(() => input.classList.remove('shake'), 300);
    }

    // Validate email on blur
    emailInput.addEventListener('blur', () => {
      const val = emailInput.value.trim();
      if (val && !isValidEmail(val)) {
        showError(emailInput, emailError, 'Please enter a valid email address');
      } else {
        clearError(emailInput, emailError);
      }
    });

    // Clear error on input
    emailInput.addEventListener('input', () => {
      if (emailInput.classList.contains('has-error')) {
        clearError(emailInput, emailError);
      }
    });

    // Validate password on blur
    passwordInput.addEventListener('blur', () => {
      const val = passwordInput.value;
      if (val && val.length < 8) {
        showError(passwordInput, passwordError, 'Password must be at least 8 characters');
      } else {
        clearError(passwordInput, passwordError);
      }
    });

    // Clear error on input
    passwordInput.addEventListener('input', () => {
      if (passwordInput.classList.contains('has-error')) {
        clearError(passwordInput, passwordError);
      }
    });

    // Form submit
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let valid = true;
      const email = emailInput.value.trim();
      const password = passwordInput.value;

      // Validate email
      if (!email) {
        showError(emailInput, emailError, 'Email is required');
        shakeField(emailInput);
        valid = false;
      } else if (!isValidEmail(email)) {
        showError(emailInput, emailError, 'Please enter a valid email address');
        shakeField(emailInput);
        valid = false;
      }

      // Validate password
      if (!password) {
        showError(passwordInput, passwordError, 'Password is required');
        shakeField(passwordInput);
        valid = false;
      } else if (password.length < 8) {
        showError(passwordInput, passwordError, 'Password must be at least 8 characters');
        shakeField(passwordInput);
        valid = false;
      }

      if (!valid) return;

      // Show loading state
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      // Simulate API call — mock login sets user in session
      setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        // Set mock user in session and navigate to dashboard
        sessionStorage.setItem('mockUser', JSON.stringify({
          id: 'user_001',
          name: 'Arjun Mehta',
          email: email
        }));
        navigateTo('/dashboard');
      }, 2000);
    });
  }

});
