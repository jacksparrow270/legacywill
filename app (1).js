/* ============================================
   LegacyWill.me — Complete Application
   Merged: router + interactions + app logic
   ============================================ */

/* ============================================
   QUESTION BANK — Final production version
   Do not alter any question text.
   ============================================ */
const QUESTION_BANK = {

  core_values: [
    "What is the one thing you have refused to give up, even when keeping it cost you something real?",
    "Tell me about a moment you chose what was right over what was easy — and what it cost you.",
    "If you could only carry one value into every room for the rest of your life, what would it be — and does the way you live actually reflect it?",
    "What do you believe about how human beings should treat each other — and where do you fall short of your own standard?",
    "What is the gap between who you truly are and who you perform being?",
    "When you witness something unfair and it would cost you to speak, what do you do — and why?",
    "Have you ever had to choose between being loyal and being honest? What did you do?",
    "What truth about life are you actively trying to pass on — and what does how you live teach, whether you intend it or not?",
    "Is there something you would refuse to do even if it meant losing something — money, a relationship, a career?",
    "Think of a time you said something true when a lie would have been easier. Was it worth it?",
    "What does courage look like to you — not in war or crisis, but in ordinary days?",
    "What do you hope people carry with them after spending time with you?",
  ],

  life_philosophy: [
    "What did you believe in your twenties that life eventually proved dead wrong — and what truth replaced it?",
    "What mistake in how you treated someone taught you the most about how to treat people?",
    "What does a good life look like to you — not a successful one, a good one?",
    "What do you believe happens when we die — and how does that belief shape the way you actually live?",
    "What is your honest relationship with failure — not the relationship you wish you had, but the one you actually have?",
    "What did you once think would make you happy that didn't — and what does happiness actually feel like to you now?",
    "Where do you build meaning in your life — and has that changed as you've aged?",
    "What is the role of suffering in a well-lived life?",
    "What would you tell your younger self — and would they have listened?",
    "What is the wisest thing you have ever been told — and do you actually live by it?",
  ],

  formative: [
    "What single experience changed how you see the world — and did you recognise it at the time?",
    "Who shaped you most — and what did they teach you without ever meaning to?",
    "What is the hardest thing you have ever been through — and what did it make you?",
    "What are you most proud of in your life — not the most impressive thing, but the one that matters most to you personally?",
    "When did you first truly understand that life was finite — and how did that change you?",
    "Is there a place in the world that feels like it was made for you? What does it do to you when you're there?",
    "What was the moment your life could have gone a completely different way — and do you ever wonder about the path you didn't take?",
    "What did your childhood teach you about the world that you have spent your adult life unlearning?",
  ],

  life_lessons: [
    "What do you know now that no one could have told you at 25 — you had to live it to understand it?",
    "What is the most useful thing you know how to do — practical or otherwise — and where did you really learn it?",
    "What has money taught you that has nothing to do with money?",
    "What has a relationship — romantic, family, friendship — taught you about yourself that you didn't want to know?",
    "Did you choose your work, or did your work choose you — and do you know the difference between a career and a calling?",
    "What is the one thing you wish you had begun ten years earlier — and what was stopping you?",
    "What consumed years of worry that, looking back, was not worth the weight you gave it?",
    "What is the difference between being busy and actually living — and when did you understand it?",
    "What is the most important habit or discipline you have built — and what did it require you to sacrifice to keep it?",
  ],

  regrets: [
    "What would you do differently — not to succeed more, but to live better?",
    "What did you never say to someone that you wish you had — and is it still possible to say it?",
    "What relationship did you let drift — not through a fight, just through neglect — and what do you wish you had done?",
    "Where did fear stop you from something you truly wanted — and looking back, was the fear justified?",
    "What did you give up in pursuit of ambition — and was it worth what you paid?",
    "What is the one thing you regret not giving more of your life to?",
    "If you could go back and simply be more present in one chapter of your life, which would it be?",
    "Is there a version of yourself that you abandoned somewhere along the way — a dream, a self, a direction — that you still think about?",
  ],

  letters: [
    "What do you most want the young people you love to understand about who you actually are — not the version you perform for them?",
    "What do you want to say to the person who knows you most completely — the good and the ugly — that you have never quite found words for?",
    "Is there someone you have never properly thanked — and what would you say to them now?",
    "Is there someone you have never been able to forgive — and if you could speak to them now without consequence, what would you say?",
    "If you could leave a message for someone to read after you are gone, what would you most need them to know?",
    "Is there something you always needed to hear from someone — an apology, an acknowledgment, a declaration — that never came?",
  ],

};

/* ============================================
   MODULE METADATA
   ============================================ */
const MODULE_META = {
  core_values:    { label: 'Core Values',          questionCount: 12 },
  life_philosophy:{ label: 'Life Philosophy',       questionCount: 10 },
  formative:      { label: 'Formative Moments',     questionCount: 8  },
  life_lessons:   { label: 'Life Lessons',          questionCount: 9  },
  regrets:        { label: 'Regrets & Growth',      questionCount: 8  },
  letters:        { label: 'Letters to Loved Ones', questionCount: 6  },
};

/* ============================================
   CONVERSATION STATE
   ============================================ */
const CONVO_STATE = {
  docId: 'doc_001',
  docTitle: 'My Legacy Will',
  moduleOrder: ['core_values', 'life_philosophy', 'formative', 'life_lessons', 'regrets', 'letters'],
  completedModules: new Set(['core_values']),
  activeModule: 'life_philosophy',
  activeQuestionIndex: 1,
  history: [
    {
      role: 'assistant',
      text: "Welcome to the Life Philosophy chapter. I want to explore the principles that quietly run your life \u2014 not the ones you'd put on a r\u00e9sum\u00e9, but the ones that actually show up in how you move through the world. Let\u2019s begin."
    },
    {
      role: 'user',
      text: "I was dismissive of someone who needed me to slow down and listen. I was busy, I was in my head, I gave them half of me. They never said anything but I could see what it did. I still think about it. It taught me that presence is the thing. Not advice, not help \u2014 just full attention."
    },
    {
      role: 'assistant',
      text: "\u201cPresence is the thing.\u201d That\u2019s a sentence worth keeping. The fact that you still carry this \u2014 that it hasn\u2019t calcified into a lesson you\u2019ve filed away \u2014 tells me something about who you are."
    },
  ],
  isStreaming: false,
  streamInterval: null,
  saveTimer: null,
  hasUnsavedChanges: false,
};

function getCurrentQuestion() {
  return QUESTION_BANK[CONVO_STATE.activeModule]?.[CONVO_STATE.activeQuestionIndex] || '';
}

function getOverallCompletion() {
  const totalQ = Object.values(MODULE_META).reduce((s, m) => s + m.questionCount, 0);
  let answeredQ = 0;
  CONVO_STATE.completedModules.forEach(id => {
    answeredQ += MODULE_META[id]?.questionCount || 0;
  });
  // Only add partial progress for active module if it is NOT already complete
  if (!CONVO_STATE.completedModules.has(CONVO_STATE.activeModule)) {
    answeredQ += CONVO_STATE.activeQuestionIndex;
  }
  return Math.min(100, Math.round((answeredQ / totalQ) * 100));
}

/* ============================================
   MOCK DATA
   ============================================ */
var MOCK_USER = {
  id: 'user_001',
  name: 'Arjun Mehta',
  email: 'arjun@example.com',
};

var MOCK_DOCUMENTS = [
  {
    id: 'doc_001',
    title: 'My Legacy Will',
    completionPercent: 35,
    lastEdited: '2 days ago',
    status: 'in_progress',
    wordCount: 612,
    modules: [
      { name: 'Core Values',      done: true  },
      { name: 'Life Philosophy',  done: false },
      { name: 'Formative Moments',done: false },
    ],
  },
  {
    id: 'doc_002',
    title: 'Letter to My Children',
    completionPercent: 0,
    lastEdited: null,
    status: 'draft',
    wordCount: 235,
    modules: [
      { name: 'Beliefs',       done: false },
      { name: 'Life Lessons',  done: false },
      { name: 'Letters',       done: false },
    ],
  },
];

/* ============================================
   SYNC — writes CONVO_STATE back to MOCK_DOCUMENTS
   Called on every save so dashboard stays current
   ============================================ */
function syncConvoStateToMockDocuments() {
  const doc = MOCK_DOCUMENTS.find(d => d.id === CONVO_STATE.docId);
  if (!doc) return;

  doc.completionPercent = getOverallCompletion();
  doc.title = CONVO_STATE.docTitle;
  doc.lastEdited = 'Just now';

  // Sync module chip list
  doc.modules = CONVO_STATE.moduleOrder.map(modId => ({
    name: MODULE_META[modId].label,
    done: CONVO_STATE.completedModules.has(modId),
  }));

  // Status
  const allDone = CONVO_STATE.moduleOrder.every(id => CONVO_STATE.completedModules.has(id));
  if (allDone) {
    doc.status = 'complete';
    doc.completionPercent = 100;
  } else if (CONVO_STATE.completedModules.size > 0 || CONVO_STATE.activeQuestionIndex > 0) {
    doc.status = 'in_progress';
  }

  // Word count estimate
  const answeredQ = Array.from(CONVO_STATE.completedModules)
    .reduce((s, id) => s + (MODULE_META[id]?.questionCount || 0), 0)
    + (CONVO_STATE.completedModules.has(CONVO_STATE.activeModule) ? 0 : CONVO_STATE.activeQuestionIndex);
  doc.wordCount = Math.max(235, answeredQ * 50);
}

/* ============================================
   HELPERS
   ============================================ */
function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getTimeOfDay() {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFieldError(input, errorEl, message) {
  input.classList.add('has-error');
  errorEl.textContent = message;
  errorEl.classList.add('visible');
}

function clearFieldError(input, errorEl) {
  input.classList.remove('has-error');
  errorEl.textContent = '';
  errorEl.classList.remove('visible');
}

function shakeWrap(wrapEl) {
  if (!wrapEl) return;
  wrapEl.classList.add('shake');
  setTimeout(() => wrapEl.classList.remove('shake'), 300);
}

/* ============================================
   TOAST SYSTEM
   ============================================ */
(function initToastContainer() {
  const container = document.createElement('div');
  container.className = 'lw-toast-container';
  container.id = 'lwToastContainer';
  document.body.appendChild(container);
})();

function showToast(message, type) {
  type = type || 'success';
  const container = document.getElementById('lwToastContainer');
  if (!container) return;
  const icons = {
    success: '<svg class="lw-toast__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20,6 9,17 4,12"/></svg>',
    info:    '<svg class="lw-toast__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
    error:   '<svg class="lw-toast__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
  };
  const toast = document.createElement('div');
  toast.className = 'lw-toast lw-toast--' + type;
  toast.innerHTML = (icons[type] || '') + '<span>' + escapeHtml(message) + '</span>';
  container.appendChild(toast);
  requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('show')));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 350);
  }, 3500);
}

/* ============================================
   MODAL STATE
   ============================================ */
var _renameDocId = null;
var _deleteDocId = null;
var resetToken   = null;

function openRenameModal(docId) {
  _renameDocId = docId;
  const doc = MOCK_DOCUMENTS.find(d => d.id === docId);
  if (!doc) return;
  const overlay = document.getElementById('renameModalOverlay');
  const input   = document.getElementById('renameInput');
  if (!overlay || !input) return;
  input.value = doc.title;
  input.classList.remove('has-error');
  overlay.style.display = 'flex';
  requestAnimationFrame(() => overlay.classList.add('open'));
  setTimeout(() => { input.focus(); input.select(); }, 50);
}

function closeRenameModal() {
  const overlay = document.getElementById('renameModalOverlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  setTimeout(() => { overlay.style.display = 'none'; }, 200);
  _renameDocId = null;
}

function openDeleteModal(docId) {
  _deleteDocId = docId;
  const doc = MOCK_DOCUMENTS.find(d => d.id === docId);
  if (!doc) return;
  const overlay = document.getElementById('deleteModalOverlay');
  const titleEl = document.getElementById('deleteModalDocTitle');
  if (!overlay) return;
  if (titleEl) titleEl.textContent = doc.title;
  overlay.style.display = 'flex';
  requestAnimationFrame(() => overlay.classList.add('open'));
}

function closeDeleteModal() {
  const overlay = document.getElementById('deleteModalOverlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  setTimeout(() => { overlay.style.display = 'none'; }, 200);
  _deleteDocId = null;
}

function openConvoExitModal() {
  const modal = document.getElementById('convoExitModal');
  if (!modal) return;
  modal.style.display = 'flex';
  requestAnimationFrame(() => modal.classList.add('open'));
}

function closeConvoExitModal() {
  const modal = document.getElementById('convoExitModal');
  if (!modal) return;
  modal.classList.remove('open');
  setTimeout(() => { modal.style.display = 'none'; }, 200);
}

/* ============================================
   SPA ROUTER
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {

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

  // --- Dynamic routes ---
  const dynamicRoutes = [
    { pattern: /^\/will\/([^/]+)\/share$/, viewId: 'view-share',   paramNames: ['id'] },
    { pattern: /^\/will\/([^/]+)$/,        viewId: 'view-will',    paramNames: ['id'] },
    { pattern: /^\/preview\/([^/]+)$/,     viewId: 'view-preview', paramNames: ['token'] },
  ];

  const publicPaths = ['/', '/login', '/signup', '/forgot-password', '/reset-password'];
  const authPanelViews = ['view-login', 'view-signup', 'view-forgot', 'view-reset'];
  const appViews = ['view-dashboard', 'view-will-new', 'view-will', 'view-share', 'view-settings', 'view-preview'];

  const pageTitles = {
    'view-landing':   'LegacyWill.me \u2014 Not Just What You Leave. What You Stood For.',
    'view-login':     'Sign In \u2014 LegacyWill.me',
    'view-signup':    'Create Account \u2014 LegacyWill.me',
    'view-forgot':    'Reset Password \u2014 LegacyWill.me',
    'view-reset':     'Set New Password \u2014 LegacyWill.me',
    'view-dashboard': 'Dashboard \u2014 LegacyWill.me',
    'view-settings':  'Settings \u2014 LegacyWill.me',
    'view-will-new':  'New Legacy Will \u2014 LegacyWill.me',
    'view-will':      'Legacy Will \u2014 LegacyWill.me',
    'view-share':     'Share Will \u2014 LegacyWill.me',
    'view-preview':   'Preview \u2014 LegacyWill.me',
    'view-404':       'Page Not Found \u2014 LegacyWill.me',
  };

  function getCurrentUser() {
    const raw = sessionStorage.getItem('mockUser');
    if (!raw) return null;
    try { return JSON.parse(raw); } catch (e) { return null; }
  }

  function resolveRoute(path) {
    if (staticRoutes[path]) return { viewId: staticRoutes[path], params: {} };
    for (const route of dynamicRoutes) {
      const match = path.match(route.pattern);
      if (match) {
        const params = {};
        route.paramNames.forEach((name, i) => { params[name] = match[i + 1]; });
        return { viewId: route.viewId, params };
      }
    }
    return { viewId: 'view-404', params: {} };
  }

  function isProtectedRoute(path) {
    return !publicPaths.includes(path);
  }

  const basePath = (() => {
    const p = window.location.pathname;
    return p.includes('/legacywill') ? '/legacywill' : '';
  })();

  function getCleanPath(fullPath) {
    let clean = fullPath.replace(basePath, '') || '/';
    if (clean !== '/' && clean.endsWith('/')) clean = clean.slice(0, -1);
    return clean;
  }

  function navigateTo(path, pushState = true) {
    if (isProtectedRoute(path) && !getCurrentUser()) {
      sessionStorage.setItem('redirectAfterLogin', path);
      navigateTo('/login', pushState);
      return;
    }

    const { viewId, params } = resolveRoute(path);
    window.__routeParams = params;

    const currentView = document.querySelector('.view--active');
    const nextView    = document.getElementById(viewId);
    if (!nextView || currentView === nextView) return;

    if (pushState) history.pushState({ path }, '', basePath + path);
    document.title = pageTitles[viewId] || 'LegacyWill.me';

    // Restore global nav when leaving conversation view
    if (currentView?.id === 'view-will-new') {
      const gNav = document.getElementById('nav');
      if (gNav) gNav.style.display = '';
    }

    currentView.classList.add('view--exiting');

    setTimeout(() => {
      currentView.classList.remove('view--active', 'view--exiting');
      nextView.classList.add('view--active', 'view--entering');
      window.scrollTo(0, 0);

      document.body.classList.remove('login-active', 'app-active');
      if (authPanelViews.includes(viewId)) {
        document.body.classList.add('login-active');
      } else if (appViews.includes(viewId)) {
        document.body.classList.add('app-active');
      } else if (viewId === 'view-landing') {
        reInitReveals();
      }

      const navEl = document.getElementById('nav');
      if (navEl) {
        navEl.classList.toggle('nav--app', appViews.includes(viewId));
      }

      onViewMount(viewId, params);

      setTimeout(() => nextView.classList.remove('view--entering'), 250);
    }, 200);
  }

  // Expose globally
  window.navigateTo   = navigateTo;
  window.getCurrentUser = getCurrentUser;

  // data-link clicks
  document.addEventListener('click', e => {
    const link = e.target.closest('[data-link]');
    if (!link) return;
    e.preventDefault();
    const href = link.getAttribute('href');
    if (href) navigateTo(href);
  });

  // Browser back/forward
  window.addEventListener('popstate', e => {
    const path = e.state?.path || getCleanPath(window.location.pathname);
    navigateTo(path, false);
  });

  // Initial load
  const initialPath = getCleanPath(window.location.pathname);
  if (initialPath !== '/') {
    if (isProtectedRoute(initialPath) && !getCurrentUser()) {
      sessionStorage.setItem('redirectAfterLogin', initialPath);
      const dv = document.querySelector('.view--active');
      const lv = document.getElementById('view-login');
      if (dv && lv && dv !== lv) { dv.classList.remove('view--active'); lv.classList.add('view--active'); }
      document.body.classList.add('login-active');
      document.title = 'Sign In \u2014 LegacyWill.me';
      history.replaceState({ path: '/login' }, '', basePath + '/login');
    } else {
      const { viewId, params } = resolveRoute(initialPath);
      window.__routeParams = params;
      const dv = document.querySelector('.view--active');
      const tv = document.getElementById(viewId);
      if (dv && tv && dv !== tv) {
        dv.classList.remove('view--active');
        tv.classList.add('view--active');
        if (authPanelViews.includes(viewId)) document.body.classList.add('login-active');
        else if (appViews.includes(viewId)) {
          document.body.classList.add('app-active');
          const nv = document.getElementById('nav');
          if (nv) nv.classList.add('nav--app');
        }
        document.title = pageTitles[viewId] || 'LegacyWill.me';
        setTimeout(() => onViewMount(viewId, params), 0);
      }
    }
  } else {
    window.__routeParams = {};
  }
  history.replaceState({ path: initialPath }, '', window.location.href);

  /* ============================================
     SCROLL REVEAL
     ============================================ */
  function initReveals() {
    const els = document.querySelectorAll('#view-landing .reveal:not(.visible)');
    // Lower threshold on mobile — elements trigger as soon as they appear
    const isMobile = window.innerWidth <= 768;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); }
      });
    }, {
      threshold: isMobile ? 0.05 : 0.12,
      rootMargin: isMobile ? '0px 0px 0px 0px' : '0px 0px -40px 0px'
    });
    els.forEach(el => obs.observe(el));
  }

  function reInitReveals() { initReveals(); }
  initReveals();

  /* ============================================
     NAVBAR SCROLL BEHAVIOR
     ============================================ */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (document.body.classList.contains('login-active')) return;
    nav?.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ============================================
     MOBILE MENU TOGGLE
     ============================================ */
  const navToggle  = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  function closeMobileMenu() {
    if (!navToggle || !mobileMenu) return;
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function openMobileMenu() {
    if (!navToggle || !mobileMenu) return;
    navToggle.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', e => {
      e.stopPropagation();
      navToggle.classList.contains('open') ? closeMobileMenu() : openMobileMenu();
    });

    // Close when any menu link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMobileMenu();
    });
  }

  // Close menu on any SPA navigation
  const _origNav = window.navigateTo;
  window.navigateTo = function(path, pushState) {
    closeMobileMenu();
    return _origNav(path, pushState);
  };

  /* ============================================
     SMOOTH SCROLL FOR ANCHOR LINKS
     ============================================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      if (anchor.hasAttribute('data-link')) return;
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navH = nav ? nav.offsetHeight : 0;
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH - 20, behavior: 'smooth' });
      }
    });
  });

  /* ============================================
     GRID PARALLAX
     ============================================ */
  let ticking = false;
  const parallaxStyle = document.createElement('style');
  parallaxStyle.textContent = 'body::before { transform: translateY(var(--grid-offset, 0)); }';
  document.head.appendChild(parallaxStyle);
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        document.body.style.setProperty('--grid-offset', `${window.scrollY * 0.15}px`);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  /* ============================================
     TYPING SIMULATION (landing page mock)
     ============================================ */
  const mockPlaceholder = document.querySelector('.mock__answer-placeholder');
  if (mockPlaceholder) {
    const phrases = [
      'Begin typing your reflection...',
      "I've always believed that honesty...",
      'The one thing I never compromised...',
      'What I want my children to know...'
    ];
    let pi = 0, ci = 0, isDel = false, isPaused = false;
    const type = () => {
      if (isPaused) return;
      const cur = phrases[pi];
      if (!isDel) {
        mockPlaceholder.textContent = cur.substring(0, ci + 1);
        ci++;
        if (ci === cur.length) { isPaused = true; setTimeout(() => { isPaused = false; isDel = true; type(); }, 3000); return; }
      } else {
        mockPlaceholder.textContent = cur.substring(0, ci - 1);
        ci--;
        if (ci === 0) { isDel = false; pi = (pi + 1) % phrases.length; }
      }
      setTimeout(type, isDel ? 30 : 60);
    };
    setTimeout(type, 2000);
  }

  /* ============================================
     NAV USER DROPDOWN
     ============================================ */
  const navAvatar   = document.getElementById('navAvatar');
  const navUserWrap = document.getElementById('navUser');
  const navSignOut  = document.getElementById('navSignOut');

  if (navAvatar && navUserWrap) {
    navAvatar.addEventListener('click', e => { e.stopPropagation(); navUserWrap.classList.toggle('open'); });
    document.addEventListener('click', () => navUserWrap.classList.remove('open'));
  }

  if (navSignOut) {
    navSignOut.addEventListener('click', e => {
      e.preventDefault();
      sessionStorage.removeItem('mockUser');
      navigateTo('/');
    });
  }

  /* ============================================
     PASSWORD TOGGLE
     ============================================ */
  document.querySelectorAll('.password-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.getAttribute('data-target'));
      if (!input) return;
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      btn.querySelector('.eye-open')  ?.style && (btn.querySelector('.eye-open').style.display   = isPassword ? 'none'  : 'block');
      btn.querySelector('.eye-closed')?.style && (btn.querySelector('.eye-closed').style.display = isPassword ? 'block' : 'none');
    });
  });

  /* ============================================
     GLOBAL ESCAPE KEY — closes all modals
     ============================================ */
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    closeRenameModal();
    closeDeleteModal();
    closeConvoExitModal();
    // Module complete modal intentionally does NOT close on Escape
  });

  /* ============================================
     GLOBAL DROPDOWN CLOSE
     ============================================ */
  document.addEventListener('click', () => {
    document.querySelectorAll('.will-card__dropdown.open')
      .forEach(d => d.classList.remove('open'));
  });

  /* ============================================
     MODAL EVENT LISTENERS (attached once at boot)
     ============================================ */

  // Rename modal
  document.getElementById('renameModalClose')?.addEventListener('click',  closeRenameModal);
  document.getElementById('renameModalCancel')?.addEventListener('click', closeRenameModal);
  document.getElementById('renameModalOverlay')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeRenameModal();
  });
  document.getElementById('renameModalSave')?.addEventListener('click', () => {
    const input    = document.getElementById('renameInput');
    const newTitle = input?.value.trim();
    if (!newTitle) { input?.classList.add('has-error'); return; }
    const doc = MOCK_DOCUMENTS.find(d => d.id === _renameDocId);
    if (doc) doc.title = newTitle;
    const card = document.querySelector(`.will-card[data-doc-id="${_renameDocId}"]`);
    if (card) { const t = card.querySelector('.will-card__title'); if (t) t.textContent = newTitle; }
    closeRenameModal();
    showToast(`Renamed to "${newTitle}"`, 'success');
  });
  document.getElementById('renameInput')?.addEventListener('keydown', e => {
    if (e.key === 'Enter')  document.getElementById('renameModalSave')?.click();
    if (e.key === 'Escape') closeRenameModal();
  });
  document.getElementById('renameInput')?.addEventListener('input', e => {
    e.target.classList.remove('has-error');
  });

  // Delete modal
  document.getElementById('deleteModalClose')?.addEventListener('click',  closeDeleteModal);
  document.getElementById('deleteModalCancel')?.addEventListener('click', closeDeleteModal);
  document.getElementById('deleteModalOverlay')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeDeleteModal();
  });
  document.getElementById('deleteModalConfirm')?.addEventListener('click', () => {
    const doc = MOCK_DOCUMENTS.find(d => d.id === _deleteDocId);
    const title = doc?.title || 'Will';
    const idx = MOCK_DOCUMENTS.findIndex(d => d.id === _deleteDocId);
    if (idx !== -1) MOCK_DOCUMENTS.splice(idx, 1);
    renderDashboardStats();
    renderDashboardWills();
    closeDeleteModal();
    showToast(`"${title}" has been deleted.`, 'info');
  });

  // New will button (dashboard header)
  document.getElementById('dashNewWillBtn')?.addEventListener('click', () => navigateTo('/will/new'));

  /* ============================================
     LOGIN FORM
     ============================================ */
  const loginForm     = document.getElementById('loginForm');
  const loginEmail    = document.getElementById('loginEmail');
  const loginPassword = document.getElementById('loginPassword');
  const loginEmailErr = document.getElementById('emailError');
  const loginPassErr  = document.getElementById('passwordError');
  const loginSubmit   = document.getElementById('loginSubmit');

  if (loginForm) {
    function showLoginErr(input, el, msg) { input.classList.add('has-error'); el.textContent = msg; el.classList.add('visible'); }
    function clearLoginErr(input, el)     { input.classList.remove('has-error'); el.textContent = ''; el.classList.remove('visible'); }
    function shakeLogin(input)            { input.classList.add('shake'); setTimeout(() => input.classList.remove('shake'), 300); }

    loginEmail.addEventListener('blur', () => {
      if (loginEmail.value && !isValidEmail(loginEmail.value.trim()))
        showLoginErr(loginEmail, loginEmailErr, 'Please enter a valid email address');
      else clearLoginErr(loginEmail, loginEmailErr);
    });
    loginEmail.addEventListener('input', () => { if (loginEmail.classList.contains('has-error')) clearLoginErr(loginEmail, loginEmailErr); });

    loginPassword.addEventListener('blur', () => {
      if (loginPassword.value && loginPassword.value.length < 8)
        showLoginErr(loginPassword, loginPassErr, 'Password must be at least 8 characters');
      else clearLoginErr(loginPassword, loginPassErr);
    });
    loginPassword.addEventListener('input', () => { if (loginPassword.classList.contains('has-error')) clearLoginErr(loginPassword, loginPassErr); });

    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;
      const email = loginEmail.value.trim();
      const pass  = loginPassword.value;
      if (!email)                  { showLoginErr(loginEmail, loginEmailErr, 'Email is required'); shakeLogin(loginEmail); valid = false; }
      else if (!isValidEmail(email)){ showLoginErr(loginEmail, loginEmailErr, 'Please enter a valid email address'); shakeLogin(loginEmail); valid = false; }
      if (!pass)                   { showLoginErr(loginPassword, loginPassErr, 'Password is required'); shakeLogin(loginPassword); valid = false; }
      else if (pass.length < 8)    { showLoginErr(loginPassword, loginPassErr, 'Password must be at least 8 characters'); shakeLogin(loginPassword); valid = false; }
      if (!valid) return;

      loginSubmit.classList.add('loading');
      loginSubmit.disabled = true;
      setTimeout(() => {
        loginSubmit.classList.remove('loading');
        loginSubmit.disabled = false;
        sessionStorage.setItem('mockUser', JSON.stringify({ id: 'user_001', name: 'Arjun Mehta', email }));
        navigateTo('/dashboard');
      }, 2000);
    });
  }

  /* ============================================
     SIGNUP FORM
     ============================================ */
  (function() {
    const form = document.getElementById('signupForm');
    if (!form) return;

    const nameInput     = document.getElementById('signupName');
    const emailInput    = document.getElementById('signupEmail');
    const passwordInput = document.getElementById('signupPassword');
    const confirmInput  = document.getElementById('signupConfirm');
    const termsInput    = document.getElementById('signupTerms');

    const nameError     = document.getElementById('signupNameError');
    const emailError    = document.getElementById('signupEmailError');
    const passwordError = document.getElementById('signupPasswordError');
    const confirmError  = document.getElementById('signupConfirmError');
    const termsError    = document.getElementById('signupTermsError');

    const vName    = () => { const v = nameInput.value.trim(); if (!v) { showFieldError(nameInput, nameError, 'Full name is required'); return false; } if (v.length < 2) { showFieldError(nameInput, nameError, 'Name too short'); return false; } clearFieldError(nameInput, nameError); return true; };
    const vEmail   = () => { const v = emailInput.value.trim(); if (!v) { showFieldError(emailInput, emailError, 'Email is required'); return false; } if (!isValidEmail(v)) { showFieldError(emailInput, emailError, 'Enter a valid email'); return false; } clearFieldError(emailInput, emailError); return true; };
    const vPass    = () => { const v = passwordInput.value; if (!v) { showFieldError(passwordInput, passwordError, 'Password required'); return false; } if (v.length < 8) { showFieldError(passwordInput, passwordError, 'Minimum 8 characters'); return false; } if (!/\d/.test(v)) { showFieldError(passwordInput, passwordError, 'Include at least one number'); return false; } clearFieldError(passwordInput, passwordError); return true; };
    const vConfirm = () => { const v = confirmInput.value; if (!v) { showFieldError(confirmInput, confirmError, 'Please confirm password'); return false; } if (v !== passwordInput.value) { showFieldError(confirmInput, confirmError, 'Passwords do not match'); return false; } clearFieldError(confirmInput, confirmError); return true; };

    nameInput.addEventListener('blur', vName);
    emailInput.addEventListener('blur', vEmail);
    passwordInput.addEventListener('blur', vPass);
    confirmInput.addEventListener('blur', vConfirm);

    form.addEventListener('submit', e => {
      e.preventDefault();
      const r1 = vName(), r2 = vEmail(), r3 = vPass(), r4 = vConfirm(), r5 = termsInput.checked;
      if (!r5) showFieldError(termsInput, termsError, 'You must agree to the Terms of Service');
      if (!r1) shakeWrap(document.getElementById('signupNameWrap'));
      if (!r2) shakeWrap(document.getElementById('signupEmailWrap'));
      if (!r3) shakeWrap(document.getElementById('signupPasswordWrap'));
      if (!r4) shakeWrap(document.getElementById('signupConfirmWrap'));
      if (!r5) shakeWrap(document.getElementById('signupTermsWrap'));
      if (!r1 || !r2 || !r3 || !r4 || !r5) return;
      document.getElementById('signupEmailDisplay').textContent = emailInput.value.trim();
      document.getElementById('signupFormWrap').style.display  = 'none';
      document.getElementById('signupSuccess').style.display   = 'block';
      document.getElementById('signupLoginLink').style.display = 'none';
    });
  })();

  /* ============================================
     FORGOT PASSWORD FORM
     ============================================ */
  (function() {
    const form = document.getElementById('forgotForm');
    if (!form) return;
    const emailInput = document.getElementById('forgotEmail');
    const emailError = document.getElementById('forgotEmailError');
    emailInput.addEventListener('blur', () => {
      if (emailInput.value && !isValidEmail(emailInput.value.trim()))
        showFieldError(emailInput, emailError, 'Enter a valid email');
      else clearFieldError(emailInput, emailError);
    });
    form.addEventListener('submit', e => {
      e.preventDefault();
      const v = emailInput.value.trim();
      if (!v)               { showFieldError(emailInput, emailError, 'Email is required'); shakeWrap(document.getElementById('forgotEmailWrap')); return; }
      if (!isValidEmail(v)) { showFieldError(emailInput, emailError, 'Enter a valid email'); shakeWrap(document.getElementById('forgotEmailWrap')); return; }
      document.getElementById('forgotEmailDisplay').textContent = v;
      document.getElementById('forgotFormWrap').style.display   = 'none';
      document.getElementById('forgotSuccess').style.display    = 'block';
    });
  })();

  /* ============================================
     RESET PASSWORD FORM
     ============================================ */
  (function() {
    const form = document.getElementById('resetForm');
    if (!form) return;
    const pwIn  = document.getElementById('resetPassword');
    const cfIn  = document.getElementById('resetConfirm');
    const pwErr = document.getElementById('resetPasswordError');
    const cfErr = document.getElementById('resetConfirmError');
    const vPw   = () => { const v = pwIn.value; if (!v) { showFieldError(pwIn, pwErr, 'Password required'); return false; } if (v.length < 8) { showFieldError(pwIn, pwErr, 'Minimum 8 characters'); return false; } if (!/\d/.test(v)) { showFieldError(pwIn, pwErr, 'Include at least one number'); return false; } clearFieldError(pwIn, pwErr); return true; };
    const vCf   = () => { const v = cfIn.value; if (!v) { showFieldError(cfIn, cfErr, 'Please confirm password'); return false; } if (v !== pwIn.value) { showFieldError(cfIn, cfErr, 'Passwords do not match'); return false; } clearFieldError(cfIn, cfErr); return true; };
    pwIn.addEventListener('blur', vPw);
    cfIn.addEventListener('blur', vCf);
    form.addEventListener('submit', e => {
      e.preventDefault();
      const r1 = vPw(), r2 = vCf();
      if (!r1) shakeWrap(document.getElementById('resetPasswordWrap'));
      if (!r2) shakeWrap(document.getElementById('resetConfirmWrap'));
      if (!r1 || !r2) return;
      document.getElementById('resetFormWrap').style.display = 'none';
      document.getElementById('resetSuccess').style.display  = 'block';
    });
  })();

  /* ============================================
     VIEW MOUNT HOOK
     ============================================ */
  function onViewMount(viewId, params) {
    switch (viewId) {
      case 'view-dashboard':
        document.getElementById('nav')?.style && (document.getElementById('nav').style.display = '');
        renderDashboard();
        break;

      case 'view-will-new':
        document.getElementById('nav')?.style && (document.getElementById('nav').style.display = 'none');
        if (params?.id) CONVO_STATE.docId = params.id;
        const ti = document.getElementById('convoDocTitle');
        if (ti) ti.value = CONVO_STATE.docTitle;
        renderConvoSidebar();
        renderConvoHistory();
        renderConvoPreview();
        updateConvoMeta();
        initConvoInput();
        initConvoBar();
        initConvoExitModal();
        break;

      case 'view-will':
        { const d = document.getElementById('willIdDebug'); if (d) d.textContent = params?.id || 'unknown'; }
        break;

      case 'view-share':
        { const d = document.getElementById('shareIdDebug'); if (d) d.textContent = params?.id || 'unknown'; }
        break;

      case 'view-preview':
        { const d = document.getElementById('previewTokenDebug'); if (d) d.textContent = params?.token || 'unknown'; }
        break;

      case 'view-reset':
        resetToken = params?.token || new URLSearchParams(location.search).get('token');
        handleResetTokenPresence();
        break;
    }
  }

  /* ============================================
     RESET TOKEN DISPLAY
     ============================================ */
  function handleResetTokenPresence() {
    const expiredEl = document.getElementById('resetExpiredState');
    const formWrap  = document.getElementById('resetFormWrap');
    const successEl = document.getElementById('resetSuccess');
    if (!resetToken) {
      if (expiredEl) expiredEl.style.display = 'block';
      if (formWrap)  formWrap.style.display  = 'none';
      if (successEl) successEl.style.display = 'none';
    } else {
      if (expiredEl) expiredEl.style.display = 'none';
      if (formWrap)  formWrap.style.display  = 'block';
      if (successEl) successEl.style.display = 'none';
    }
  }

  /* ============================================
     DASHBOARD RENDERERS
     ============================================ */
  function renderDashboard() {
    renderDashboardStats();
    renderDashboardWills();
    const redirect = sessionStorage.getItem('redirectAfterLogin');
    if (redirect) {
      sessionStorage.removeItem('redirectAfterLogin');
      if (redirect !== '/dashboard') navigateTo(redirect);
    }
  }

  function renderDashboardStats() {
    const user      = getCurrentUser() || MOCK_USER;
    const firstName = (user.name || 'there').split(' ')[0];
    const greetEl   = document.getElementById('dashGreeting');
    if (greetEl) greetEl.textContent = `Good ${getTimeOfDay()}, ${firstName}.`;

    const total      = MOCK_DOCUMENTS.length;
    const avgPct     = total ? Math.round(MOCK_DOCUMENTS.reduce((s, d) => s + d.completionPercent, 0) / total) : 0;
    const totalWords = MOCK_DOCUMENTS.reduce((s, d) => s + (d.wordCount || 0), 0);

    const el = id => document.getElementById(id);
    if (el('dashStatWills'))    el('dashStatWills').textContent    = total;
    if (el('dashStatComplete')) el('dashStatComplete').textContent = avgPct + '%';
    if (el('dashStatWords'))    el('dashStatWords').textContent    = totalWords.toLocaleString();
  }

  function renderDashboardWills() {
    const container = document.getElementById('dashWillsGrid');
    if (!container) return;

    let html = '';
    MOCK_DOCUMENTS.forEach(doc => {
      const actionLabel = doc.status === 'complete'    ? 'View Will \u2192'
                        : doc.status === 'in_progress' ? 'Continue \u2192'
                        :                                'Begin \u2192';
      const actionHref  = doc.status === 'complete' ? `/will/${doc.id}` : '/will/new';
      const statusClass = 'will-card__status--' + doc.status;
      const statusLabel = doc.status === 'in_progress' ? 'IN PROGRESS'
                        : doc.status === 'complete'    ? 'COMPLETE'
                        :                                'DRAFT';
      const editedText  = doc.lastEdited ? 'Last edited ' + doc.lastEdited : 'Not yet started';

      let chipsHtml = '';
      if (doc.modules?.length > 0) {
        chipsHtml = '<div class="will-card__chips">';
        const firstIncomplete = doc.modules.findIndex(m => !m.done);
        doc.modules.slice(0, 3).forEach((mod, i) => {
          if (mod.done) {
            chipsHtml += `<span class="will-chip will-chip--done">\u2713 ${mod.name}</span>`;
          } else if (i === firstIncomplete) {
            chipsHtml += `<span class="will-chip will-chip--active">\u00b7 ${mod.name}</span>`;
          } else {
            chipsHtml += `<span class="will-chip will-chip--empty">\u25cb ${mod.name}</span>`;
          }
        });
        chipsHtml += '</div>';
      }

      html += `
        <div class="will-card glass" data-doc-id="${doc.id}">
          <div class="will-card__header">
            <div class="will-card__doc-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
            </div>
            <span class="will-card__status ${statusClass}">${statusLabel}</span>
          </div>
          <div class="will-card__title">${escapeHtml(doc.title)}</div>
          <div class="will-card__meta">${editedText}</div>
          <div class="will-card__progress-track">
            <div class="will-card__progress-fill" data-width="${doc.completionPercent}"></div>
          </div>
          <div class="will-card__progress-text">${doc.completionPercent}% complete</div>
          ${chipsHtml}
          <div class="will-card__actions">
            <a href="${actionHref}" class="will-card__action-btn" data-link>${actionLabel}</a>
            <button class="will-card__menu-btn" data-doc-id="${doc.id}" aria-label="More options" aria-haspopup="menu">\u22ef</button>
            <div class="will-card__dropdown" role="menu" aria-label="Will options">
              <button class="will-card__dropdown-item" data-action="rename" data-doc-id="${doc.id}" role="menuitem">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                Rename
              </button>
              <button class="will-card__dropdown-item" data-action="share" data-doc-id="${doc.id}" role="menuitem">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                Share
              </button>
              <div class="will-card__dropdown-divider"></div>
              <button class="will-card__dropdown-item will-card__dropdown-item--danger" data-action="delete" data-doc-id="${doc.id}" role="menuitem">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3,6 5,6 21,6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
                Delete
              </button>
            </div>
          </div>
        </div>`;
    });

    // Ghost "new will" card
    html += `
      <div class="will-card will-card--new" id="dashNewWillCard" role="button" tabindex="0" aria-label="Start a new Legacy Will">
        <div class="will-card__new-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </div>
        <div class="will-card__new-label">Start a new will</div>
      </div>`;

    container.innerHTML = html;

    // Animate progress bars
    requestAnimationFrame(() => requestAnimationFrame(() => {
      container.querySelectorAll('.will-card__progress-fill').forEach(fill => {
        fill.style.width = fill.getAttribute('data-width') + '%';
      });
    }));

    // Wire menu buttons
    container.querySelectorAll('.will-card__menu-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        document.querySelectorAll('.will-card__dropdown.open').forEach(d => {
          if (d !== btn.parentElement.querySelector('.will-card__dropdown')) d.classList.remove('open');
        });
        btn.parentElement.querySelector('.will-card__dropdown')?.classList.toggle('open');
      });
    });

    // Wire dropdown items
    container.querySelectorAll('.will-card__dropdown-item').forEach(item => {
      item.addEventListener('click', e => {
        e.stopPropagation();
        item.closest('.will-card__dropdown')?.classList.remove('open');
        const { action, docId } = item.dataset;
        if (action === 'rename') openRenameModal(docId);
        if (action === 'share')  navigateTo(`/will/${docId}/share`);
        if (action === 'delete') openDeleteModal(docId);
      });
    });

    // Ghost card
    const newCard = document.getElementById('dashNewWillCard');
    if (newCard) {
      newCard.addEventListener('click', () => navigateTo('/will/new'));
      newCard.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigateTo('/will/new'); } });
    }
  }

  /* ============================================
     CONVERSATION VIEW RENDERERS
     ============================================ */
  function renderConvoSidebar() {
    const container = document.getElementById('convoModules');
    if (!container) return;

    const icons = {
      core_values:     `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
      life_philosophy: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>`,
      formative:       `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>`,
      life_lessons:    `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>`,
      regrets:         `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8C8 10 5.9 16.17 3.82 19.34L4.35 20a2 2 0 003.1-.22l1.28-1.77A9 9 0 0118 8.5V8z"/></svg>`,
      letters:         `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    };
    const checkSVG = `<svg class="module-item__check" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20,6 9,17 4,12"/></svg>`;

    container.innerHTML = CONVO_STATE.moduleOrder.map((modId, idx) => {
      const meta      = MODULE_META[modId];
      const isDone    = CONVO_STATE.completedModules.has(modId);
      const isActive  = modId === CONVO_STATE.activeModule;
      const prevDone  = idx === 0 || CONVO_STATE.completedModules.has(CONVO_STATE.moduleOrder[idx - 1]);
      const isLocked  = !isDone && !isActive && !prevDone;
      const stateClass = isDone ? 'module-item--done' : isActive ? 'module-item--active' : isLocked ? 'module-item--locked' : 'module-item--available';
      const countText  = isDone ? 'Complete' : isActive ? `Q ${CONVO_STATE.activeQuestionIndex + 1} of ${meta.questionCount}` : `${meta.questionCount} questions`;
      return `
        <div class="module-item ${stateClass}" data-module-id="${modId}" tabindex="${isLocked ? -1 : 0}" role="button"
          aria-label="${meta.label}${isDone ? ', completed' : isActive ? ', in progress' : isLocked ? ', locked' : ''}">
          <div class="module-item__icon">${icons[modId] || ''}</div>
          <div class="module-item__info">
            <span class="module-item__name">${meta.label}</span>
            <span class="module-item__count">${countText}</span>
          </div>
          ${isDone ? checkSVG : ''}
        </div>`;
    }).join('');

    // Progress bar
    const pct = getOverallCompletion();
    const fe  = document.getElementById('convoOverallFill');
    const pe  = document.getElementById('convoOverallPct');
    if (fe) fe.style.width    = pct + '%';
    if (pe) pe.textContent    = pct + '%';

    // Click handlers — must re-attach after every innerHTML replacement
    container.querySelectorAll('.module-item:not(.module-item--locked)').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.dataset.moduleId;
        if (id && id !== CONVO_STATE.activeModule) {
          CONVO_STATE.activeModule = id;
          if (!CONVO_STATE.completedModules.has(id)) CONVO_STATE.activeQuestionIndex = 0;
          updateConvoMeta();
          renderConvoSidebar();
        }
      });
      item.addEventListener('keydown', e => { if (e.key === 'Enter') item.click(); });
    });
  }

  function renderConvoHistory() {
    const container = document.getElementById('convoHistory');
    if (!container) return;
    if (!CONVO_STATE.history.length) {
      container.innerHTML = `<div class="convo__history-empty"><p>Your conversation will appear here as you write.</p></div>`;
      return;
    }
    container.innerHTML = CONVO_STATE.history.map((msg, idx) => {
      const isUser = msg.role === 'user';
      return `
        <div class="convo-msg convo-msg--${msg.role}" data-msg-idx="${idx}">
          ${!isUser ? `<div class="convo-msg__avatar" aria-hidden="true"><svg viewBox="0 0 40 40" fill="none" width="14" height="14"><ellipse cx="20" cy="10" rx="3" ry="3" fill="#B7E5BA" opacity="0.9"/><ellipse cx="20" cy="18" rx="4.5" ry="4" fill="#5CA87C" opacity="0.9"/></svg></div>` : ''}
          <div class="convo-msg__bubble"><p class="convo-msg__text">${escapeHtml(msg.text)}</p></div>
        </div>`;
    }).join('');
    requestAnimationFrame(() => { container.scrollTop = container.scrollHeight; });
  }

  function updateConvoMeta() {
    const meta     = MODULE_META[CONVO_STATE.activeModule];
    const qIdx     = CONVO_STATE.activeQuestionIndex;
    const question = getCurrentQuestion();
    const nameEl   = document.getElementById('convoModuleName');
    const cntEl    = document.getElementById('convoModuleCounter');
    const qEl      = document.getElementById('convoQuestion');
    if (nameEl) nameEl.textContent = meta?.label || '';
    if (cntEl)  cntEl.textContent  = `Question ${qIdx + 1} of ${meta?.questionCount || 0}`;
    if (qEl) {
      qEl.style.opacity = '0'; qEl.style.transform = 'translateY(8px)';
      setTimeout(() => { qEl.textContent = question; qEl.style.opacity = '1'; qEl.style.transform = 'translateY(0)'; }, 180);
    }
  }

  function renderConvoPreview() {
    const container = document.getElementById('convoPreviewBody');
    if (!container) return;
    const excerpts = {
      core_values: 'I have refused to give up honesty \u2014 even when keeping it cost me something real. The gap between who I truly am and who I perform being is something I think about often.',
    };
    const sections = CONVO_STATE.moduleOrder.map(modId => {
      const meta    = MODULE_META[modId];
      const isDone  = CONVO_STATE.completedModules.has(modId);
      const isActive = modId === CONVO_STATE.activeModule;
      if (!isDone && !isActive) return `<div class="doc-preview__section doc-preview__section--empty"><h3 class="doc-preview__section-title">${meta.label}</h3></div>`;
      if (isDone) return `<div class="doc-preview__section doc-preview__section--complete"><h3 class="doc-preview__section-title"><span class="doc-preview__check">\u2713</span>${meta.label}</h3>${excerpts[modId] ? `<p class="doc-preview__excerpt">${escapeHtml(excerpts[modId])}</p>` : ''}</div>`;
      const lastUser = [...CONVO_STATE.history].reverse().find(m => m.role === 'user');
      const live = lastUser ? lastUser.text.slice(0, 180) + (lastUser.text.length > 180 ? '\u2026' : '') : 'In progress\u2026';
      return `<div class="doc-preview__section doc-preview__section--active"><h3 class="doc-preview__section-title"><span class="doc-preview__pulse" aria-hidden="true"></span>${meta.label}</h3><p class="doc-preview__excerpt doc-preview__excerpt--live">${escapeHtml(live)}</p></div>`;
    }).join('');
    container.innerHTML = `<div class="doc-preview"><div class="doc-preview__cover"><p class="doc-preview__cover-label">Legacy Will</p><h2 class="doc-preview__cover-title" id="previewDocTitle">${escapeHtml(CONVO_STATE.docTitle)}</h2></div>${sections}</div>`;
  }

  /* ============================================
     CONVERSATION INPUT
     ============================================ */
  function initConvoInput() {
    const textarea  = document.getElementById('convoTextarea');
    const sendBtn   = document.getElementById('convoSendBtn');
    const charCount = document.getElementById('convoCharCount');
    if (!textarea || !sendBtn) return;

    // Replace nodes to clear stale listeners
    const newTA  = textarea.cloneNode(true);  textarea.parentNode.replaceChild(newTA,  textarea);
    const newBtn = sendBtn.cloneNode(true);   sendBtn.parentNode.replaceChild(newBtn,  sendBtn);
    const ta  = document.getElementById('convoTextarea');
    const btn = document.getElementById('convoSendBtn');

    ta.value = ''; btn.disabled = true;

    ta.addEventListener('input', () => {
      const len = ta.value.length;
      if (charCount) charCount.textContent = `${len.toLocaleString()} / 5,000`;
      btn.disabled = len === 0 || CONVO_STATE.isStreaming;
      ta.style.height = 'auto';
      ta.style.height = Math.min(ta.scrollHeight, 160) + 'px';
    });
    ta.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); if (!btn.disabled) handleSend(); }
    });
    btn.addEventListener('click', () => { if (!btn.disabled) handleSend(); });
  }

  function handleSend() {
    const ta      = document.getElementById('convoTextarea');
    const btn     = document.getElementById('convoSendBtn');
    const cc      = document.getElementById('convoCharCount');
    const text    = ta?.value.trim();
    if (!text || CONVO_STATE.isStreaming) return;
    CONVO_STATE.isStreaming = true;
    if (btn) btn.disabled = true;
    if (ta)  { ta.value = ''; ta.style.height = 'auto'; }
    if (cc)  cc.textContent = '0 / 5,000';
    CONVO_STATE.history.push({ role: 'user', text });
    renderConvoHistory();
    renderConvoPreview();
    triggerAutosave();
    setTimeout(streamMockResponse, 600 + Math.random() * 400);
  }

  /* ============================================
     STREAMING
     ============================================ */
  function buildMockResponse() {
    const mod   = CONVO_STATE.activeModule;
    const meta  = MODULE_META[mod];
    const qIdx  = CONVO_STATE.activeQuestionIndex;
    const isLast = qIdx >= meta.questionCount - 1;
    const acks  = [
      "That\u2019s not a polished answer \u2014 that\u2019s a real one. I want to stay with it.",
      "There\u2019s something in what you just said that I don\u2019t want to move past too quickly.",
      "The honesty in that is rare. Most people give me the version they\u2019ve rehearsed.",
      "That took courage to put into words. Let\u2019s go deeper.",
      "I notice you didn\u2019t reach for the comfortable answer. That matters.",
      "What you just wrote \u2014 that\u2019s the kind of thing that usually stays unspoken. Thank you for it.",
    ];
    const ack = acks[qIdx % acks.length];
    // NEVER include the next question in the streamed response.
    // The next question is shown exclusively via updateConvoMeta() in the top header.
    if (isLast) {
      return `${ack} You\u2019ve completed the ${meta.label} chapter. What you\u2019ve shared here is now part of your Legacy Will.`;
    }
    return ack;
  }

  function streamMockResponse() {
    const wrap = document.getElementById('convoStreamWrap');
    const txt  = document.getElementById('convoStreamText');
    const hist = document.getElementById('convoHistory');
    if (!wrap || !txt) return;

    const full = buildMockResponse();
    let idx = 0, accumulated = '';
    txt.innerHTML = '';
    wrap.style.display = 'flex';
    if (hist) hist.scrollTop = hist.scrollHeight;

    const speed = full.length > 200 ? 12 : 18;
    CONVO_STATE.streamInterval = setInterval(() => {
      if (idx < full.length) {
        accumulated += full[idx++];
        txt.innerHTML = escapeHtml(accumulated).replace(/\n/g, '<br>');
        if (hist) hist.scrollTop = hist.scrollHeight;
      } else {
        clearInterval(CONVO_STATE.streamInterval);
        CONVO_STATE.streamInterval = null;
        wrap.style.display = 'none';
        txt.innerHTML = '';

        const mod    = CONVO_STATE.activeModule;
        const meta   = MODULE_META[mod];
        const isLast = CONVO_STATE.activeQuestionIndex >= meta.questionCount - 1;
        const ackPart = full.split('\n\n')[0];

        CONVO_STATE.history.push({ role: 'assistant', text: ackPart });

        if (isLast) {
          CONVO_STATE.completedModules.add(mod);
          syncConvoStateToMockDocuments();

          const order   = CONVO_STATE.moduleOrder;
          const nextMod = order[order.indexOf(mod) + 1] || null;

          renderConvoHistory();
          renderConvoSidebar();
          renderConvoPreview();

          // Show module complete modal
          const nameEl    = document.getElementById('moduleCompleteModuleName');
          const nextMsgEl = document.getElementById('moduleCompleteNextMsg');
          const modal     = document.getElementById('convoModuleCompleteModal');
          if (nameEl)    nameEl.textContent    = meta.label;
          if (nextMsgEl) nextMsgEl.textContent = nextMod ? `Up next: ${MODULE_META[nextMod].label}` : 'You have completed all chapters of your Legacy Will.';
          if (modal) { modal.style.display = 'flex'; requestAnimationFrame(() => modal.classList.add('open')); }

          const continueBtn = document.getElementById('moduleCompleteNext');
          if (continueBtn) {
            const freshBtn = continueBtn.cloneNode(true);
            continueBtn.parentNode.replaceChild(freshBtn, continueBtn);
            freshBtn.addEventListener('click', () => {
              if (modal) { modal.classList.remove('open'); setTimeout(() => { modal.style.display = 'none'; }, 200); }

              if (!nextMod) {
                // All chapters done — sync and navigate to completed will view
                syncConvoStateToMockDocuments();
                const gNav = document.getElementById('nav');
                if (gNav) gNav.style.display = '';
                navigateTo('/will/doc_001');
                return;
              }

              CONVO_STATE.activeModule        = nextMod;
              CONVO_STATE.activeQuestionIndex = 0;

              const openings = {
                life_philosophy: "You\u2019ve laid a strong foundation. Now let\u2019s explore the operating system beneath your values \u2014 the philosophy that actually runs your life.",
                formative:       "Values are shaped by experience. Let\u2019s find the experiences that forged yours.",
                life_lessons:    "Philosophy is one thing. What life actually teaches you is another. Let\u2019s find what you\u2019ve earned.",
                regrets:         "This is the hardest chapter \u2014 and the most honest. Regret reveals what actually mattered. Take your time.",
                letters:         "The final chapter. These aren\u2019t questions \u2014 they\u2019re invitations to speak directly to the people who matter most.",
              };
              const opening = openings[nextMod];
              if (opening) CONVO_STATE.history.push({ role: 'assistant', text: opening });
              // NOTE: next question shown via updateConvoMeta() — NOT pushed to history

              syncConvoStateToMockDocuments();
              updateConvoMeta();
              renderConvoHistory();
              renderConvoSidebar();
              renderConvoPreview();
            });
          }
        } else {
          // Advance question — display via updateConvoMeta(), NOT in history
          CONVO_STATE.activeQuestionIndex++;
          syncConvoStateToMockDocuments();
          renderConvoHistory();
          renderConvoSidebar();
          updateConvoMeta();
        }

        CONVO_STATE.isStreaming = false;
        const btn = document.getElementById('convoSendBtn');
        if (btn) btn.disabled = false;
        document.getElementById('convoTextarea')?.focus();
      }
    }, speed);
  }

  /* ============================================
     CONVERSATION BAR
     ============================================ */
  function initConvoBar() {
    const titleInput = document.getElementById('convoDocTitle');
    if (!titleInput) return;
    const fresh = titleInput.cloneNode(true);
    titleInput.parentNode.replaceChild(fresh, titleInput);
    const ti = document.getElementById('convoDocTitle');
    ti.value = CONVO_STATE.docTitle;
    ti.addEventListener('blur', () => {
      const v = ti.value.trim();
      if (!v) { ti.value = CONVO_STATE.docTitle; return; }
      if (v !== CONVO_STATE.docTitle) {
        CONVO_STATE.docTitle = v;
        const pt = document.getElementById('previewDocTitle');
        if (pt) pt.textContent = v;
        triggerAutosave();
      }
    });
    ti.addEventListener('keydown', e => {
      if (e.key === 'Enter')  { e.preventDefault(); ti.blur(); }
      if (e.key === 'Escape') { ti.value = CONVO_STATE.docTitle; ti.blur(); }
    });
  }

  function triggerAutosave() {
    setSaveStatus('saving');
    syncConvoStateToMockDocuments();
    if (CONVO_STATE.saveTimer) clearTimeout(CONVO_STATE.saveTimer);
    CONVO_STATE.saveTimer = setTimeout(() => {
      setSaveStatus('saved');
      CONVO_STATE.hasUnsavedChanges = false;
    }, 1200);
    CONVO_STATE.hasUnsavedChanges = true;
  }

  function setSaveStatus(state) {
    const el = document.getElementById('convoSaveStatus');
    if (!el) return;
    el.innerHTML = state === 'saving'
      ? `<span class="convo__save-dot convo__save-dot--saving" aria-hidden="true"></span><span class="convo__save-text">Saving\u2026</span>`
      : `<svg class="convo__save-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20,6 9,17 4,12"/></svg><span class="convo__save-text">Saved</span>`;
  }

  /* ============================================
     EXIT MODAL
     ============================================ */
  function initConvoExitModal() {
    const exitBtn = document.getElementById('convoExitBtn');
    if (exitBtn) {
      const fresh = exitBtn.cloneNode(true);
      exitBtn.parentNode.replaceChild(fresh, exitBtn);
      document.getElementById('convoExitBtn').addEventListener('click', openConvoExitModal);
    }
    const modal      = document.getElementById('convoExitModal');
    const closeBtn   = document.getElementById('convoExitModalClose');
    const stayBtn    = document.getElementById('convoExitStay');
    const confirmBtn = document.getElementById('convoExitConfirm');
    if (closeBtn)   closeBtn.onclick  = closeConvoExitModal;
    if (stayBtn)    stayBtn.onclick   = closeConvoExitModal;
    if (modal)      modal.onclick     = e => { if (e.target === modal) closeConvoExitModal(); };
    if (confirmBtn) confirmBtn.onclick = () => {
      closeConvoExitModal();
      const gNav = document.getElementById('nav');
      if (gNav) gNav.style.display = '';
      navigateTo('/dashboard');
    };
  }

}); // END DOMContentLoaded
