(function () {
  "use strict";

  // Data Models (Home, Projects, Writings)

  const DATA = {
    home: {
      name: "Dharshan",
      intro: [
        `Hi, I'm <span class="text-blue">Dharshan</span>.`,
        `A <span class="text-orange">computer science student</span> @ Amrita Vishwa Vidyapeetham`,
        `My primary interests lie in <span class="text-purple">backend systems</span>, <span class="text-purple">distributed architectures</span>, and <span class="text-purple">scalable systems</span>.`,
        `I enjoy working with <span class="text-yellow">Go</span>, exploring <span class="text-cyan">system design</span>, <span class="text-cyan">developer tooling</span>, and <span class="text-cyan">agentic AI</span> applications.`,
        `From building backend services to experimenting with AI powered tools, I like turning ideas into practical, working software or maybe some experimentational projects.`,
        `I also practice competitive programming on <a href="https://codeforces.com/profile/chifuyu22" target="_blank" rel="noopener noreferrer" class="text-yellow">Codeforces</a>.`,
        `Feel free to connect with me on <a href="https://www.linkedin.com/in/Dharshan2208/" target="_blank" class="text-blue">LinkedIn</a> or explore my projects on <a href="https://github.com/Dharshan2208" target="_blank" class="text-offwhite">GitHub</a>.`,
        `Grab a copy of my <a href="Dharshan_CV.pdf" target="_blank" rel="noopener noreferrer" class="text-green">Resume</a>.`,
      ],
      instructions: [
        `Click on any section in the sidebar to inspect past projects and writings.`,
        `You can also navigate through sections using the <span class="text-blue">arrow keys</span>.`,
      ],
      quote: {
        text: "Loading a random anime quote...",
        citation: "AnimeChan API",
      },
    },

    //   script/projects.js -> window.PROJECTS
    //   script/writings.js -> window.WRITINGS
    projects: window.PROJECTS || [],
    writings: window.WRITINGS || [],
  };

  // UI Navigation State
  const state = {
    sectionIndex: 0, // 0: Home, 1: Projects, 2: Writings
    itemIndices: [0, 0, 0], // Selected item index for [Home, Projects, Writings]
  };

  const SECTIONS = [
    { id: "panel-home", key: "home", count: 0 },
    { id: "panel-projects", key: "projects", count: DATA.projects.length },
    { id: "panel-writings", key: "writings", count: DATA.writings.length },
  ];

  // DOM Elements
  let mainPanelContent;
  let panelElements = [];
  let paginationElements = [];
  let sidebarEl;
  let sidebarToggleEl;

  // Live Quote Data (AnimeChan API)
  const QUOTES_API = "https://api.animechan.io/v1/quotes/random";
  let quoteLoading = false;
  let currentQuote = {
    text: DATA.home.quote.text,
    citation: DATA.home.quote.citation,
  };

  // Initialize
  function init() {
    sidebarEl = document.getElementById("sidebar");
    mainPanelContent = document.getElementById("main-panel-content");
    sidebarToggleEl = document.getElementById("sidebar-toggle");

    panelElements = SECTIONS.map((s) => document.getElementById(s.id));
    paginationElements = [
      null, // Home has no list pagination
      document.getElementById("projects-pagination"),
      document.getElementById("writings-pagination"),
    ];

    populateSidebarLists();
    attachEventListeners();
    restoreSidebarState();

    if (window.location.hash) {
      handleHashChange();
    } else {
      updateUI(false);
    }

    // Load a live quote on startup
    showRandomQuote();
  }

  // Populate the Sidebar List Items
  function populateSidebarLists() {
    // 1. Projects List
    const projList = document.getElementById("projects-list");
    if (projList) {
      projList.innerHTML = "";
      DATA.projects.forEach((item, index) => {
        const el = document.createElement("div");
        el.className = "ui-list-item" + (index === 0 ? " selected-item" : "");
        el.dataset.index = index;
        el.innerHTML = `
          <div class="item-main">
            <span>${item.name.split(":")[0]}</span>
          </div>
          <div class="item-meta text-yellow">${item.year}</div>
        `;
        el.addEventListener("click", (e) => {
          e.stopPropagation();
          selectSection(1, index);
        });
        projList.appendChild(el);
      });
    }

    // 2. Writings List
    const writingsList = document.getElementById("writings-list");
    if (writingsList) {
      writingsList.innerHTML = "";
      DATA.writings.forEach((item, index) => {
        const el = document.createElement("div");
        el.className = "ui-list-item" + (index === 0 ? " selected-item" : "");
        el.dataset.index = index;
        el.innerHTML = `
          <div class="item-main">
            <span>${item.title}</span>
          </div>
          <div class="item-meta">${item.date}</div>
        `;
        el.addEventListener("click", (e) => {
          e.stopPropagation();
          selectSection(2, index);
        });
        writingsList.appendChild(el);
      });
    }
  }

  // Section & Item Selection
  function selectSection(sectionIndex, itemIndex = null) {
    if (sectionIndex < 0 || sectionIndex >= SECTIONS.length) return;

    state.sectionIndex = sectionIndex;
    if (itemIndex !== null && sectionIndex > 0) {
      const maxCount = SECTIONS[sectionIndex].count;
      state.itemIndices[sectionIndex] = Math.max(
        0,
        Math.min(itemIndex, maxCount - 1),
      );
    }

    updateUI(true);

    if (sidebarEl && sidebarEl.classList.contains("mobile-open")) {
      sidebarEl.classList.remove("mobile-open");
    }
  }

  function changeItem(delta) {
    if (state.sectionIndex === 0) return; // Home has no items
    const sIdx = state.sectionIndex;
    const count = SECTIONS[sIdx].count;
    let nextIndex = state.itemIndices[sIdx] + delta;
    if (nextIndex < 0) nextIndex = 0;
    if (nextIndex >= count) nextIndex = count - 1;

    state.itemIndices[sIdx] = nextIndex;
    updateUI(false);
  }

  function nextSection() {
    let next = (state.sectionIndex + 1) % SECTIONS.length;
    selectSection(next, state.itemIndices[next]);
  }

  function prevSection() {
    let prev = (state.sectionIndex - 1 + SECTIONS.length) % SECTIONS.length;
    selectSection(prev, state.itemIndices[prev]);
  }

  function scrollMain(amount) {
    if (!mainPanelContent) return;
    mainPanelContent.scrollBy({
      top: amount,
      behavior: "smooth",
    });
  }

  // Update Visual State (Borders, Active Items, Pagination, and Render Main Panel)
  function updateUI(shouldScrollContentTop) {
    // 1. Highlight the active panel
    panelElements.forEach((panel, idx) => {
      if (!panel) return;
      if (idx === state.sectionIndex) {
        panel.classList.add("selected-frame");
      } else {
        panel.classList.remove("selected-frame");
      }
    });

    // 2. Highlight selected item in active panel & update pagination
    [1, 2].forEach((sIdx) => {
      const panel = panelElements[sIdx];
      if (!panel) return;
      const listItems = panel.querySelectorAll(".ui-list-item");
      const activeItemIndex = state.itemIndices[sIdx];

      listItems.forEach((item, idx) => {
        if (idx === activeItemIndex) {
          item.classList.add("selected-item");
          if (sIdx === state.sectionIndex) {
            scrollItemIntoView(item, panel.querySelector(".ui-list"));
          }
        } else {
          item.classList.remove("selected-item");
        }
      });

      // Update pagination indicator
      const pagEl = paginationElements[sIdx];
      if (pagEl) {
        const total = SECTIONS[sIdx].count;
        pagEl.textContent = `${activeItemIndex + 1} of ${total}`;
      }
    });

    // 3. Render the main panel content
    renderMainContent();

    if (shouldScrollContentTop && mainPanelContent) {
      mainPanelContent.scrollTop = 0;
    }
  }

  function scrollItemIntoView(item, container) {
    if (!item || !container) return;
    const itemTop = item.offsetTop;
    const itemBottom = itemTop + item.offsetHeight;
    const containerTop = container.scrollTop;
    const containerBottom = containerTop + container.clientHeight;

    if (itemTop < containerTop) {
      container.scrollTop = itemTop;
    } else if (itemBottom > containerBottom) {
      container.scrollTop = itemBottom - container.clientHeight;
    }
  }

  // Render Main Content View
  function renderMainContent() {
    if (!mainPanelContent) return;

    if (state.sectionIndex === 0) {
      renderHomeView();
    } else if (state.sectionIndex === 1) {
      renderProjectView();
    } else if (state.sectionIndex === 2) {
      renderWritingView();
    }
  }

  // Live Quotes (AnimeChan API)
  async function ensureQuoteData() {
    try {
      const res = await fetch(QUOTES_API, { cache: "no-store" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const payload = await res.json();
      const data = payload && payload.data;
      if (!data || !data.content) return null;

      const character = data.character && data.character.name;
      const anime = data.anime && (data.anime.name || data.anime.altName);
      const parts = [character, anime].filter(Boolean);

      return {
        text: data.content,
        citation: parts.length ? parts.join(" \u2014 ") : "Anime",
      };
    } catch (err) {
      console.warn("[quotes] Unable to load quote from the API.", err);
      return null;
    }
  }

  function renderQuoteIntoDom() {
    const textEl = document.getElementById("quote-text");
    const citeEl = document.getElementById("quote-citation");
    if (!textEl || !citeEl) return;
    textEl.textContent = "\u201C" + currentQuote.text + "\u201D";
    citeEl.textContent = currentQuote.citation;
  }

  async function showRandomQuote() {
    if (quoteLoading) return;
    quoteLoading = true;

    const btn = document.getElementById("quote-refresh");
    if (btn) btn.classList.add("is-loading");

    const fresh = await ensureQuoteData();
    if (fresh) {
      currentQuote = fresh;
    }
    renderQuoteIntoDom();

    quoteLoading = false;
    const activeBtn = document.getElementById("quote-refresh");
    if (activeBtn) activeBtn.classList.remove("is-loading");
  }

  // View: Home
  function renderHomeView() {
    const home = DATA.home;
    mainPanelContent.innerHTML = `
      <!-- Introduction Section -->
      <div class="content-section">
        <div class="content-paragraphs">
          ${home.intro.map((p) => `<p>${p}</p>`).join("")}
        </div>

        <div class="content-paragraphs" style="margin-top: 0.5rem;">
          ${home.instructions.map((p) => `<p>${p}</p>`).join("")}
        </div>
      </div>

      <!-- Live Quote Panel (Philosophers API) -->
      <div class="quote-panel">
        <button id="quote-refresh" class="quote-refresh" type="button" aria-label="Load another quote" title="Load another quote"></button>
        <div class="quote-body">
          <p class="quote-text" id="quote-text"></p>
          <span class="quote-citation" id="quote-citation"></span>
        </div>
      </div>
    `;

    renderQuoteIntoDom();
    const refreshBtn = mainPanelContent.querySelector("#quote-refresh");
    if (refreshBtn) {
      refreshBtn.addEventListener("click", showRandomQuote);
    }
  }

  // View: Projects
  function renderProjectView() {
    const item = DATA.projects[state.itemIndices[1]];
    if (!item) return;

    mainPanelContent.innerHTML = `
      <div class="content-section">
        <h1 class="content-title">
          <span class="text-blue">${item.name}</span>
        </h1>
        <div class="content-subtitle">
          ${item.tagline} &nbsp;|&nbsp; 
          <span class="text-yellow">[Built in ${item.year}]</span>
        </div>

        <div class="meta-badges-row">
          ${item.technologies.map((t) => `<span class="tech-badge">${t}</span>`).join("")}
        </div>

        <div class="buttons-row">
          <a href="${item.githubUrl}" target="_blank" class="tui-btn">
            <span><svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style="vertical-align:middle"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg></span> Source Code
          </a>
        </div>

        <div class="content-paragraphs">
          <p>${item.description}</p>
        </div>

        <div style="margin-top: 0.5rem;">
          <h2 class="content-subtitle text-cyan" style="margin-bottom: 0.5rem;">Architecture Highlights:</h2>
          <div class="bullet-list">
            ${item.features
              .map(
                (f) => `
              <div class="bullet-item">
                <span class="bullet-bullet">&#10095;</span>
                <span>${f}</span>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>

      </div>
    `;
  }

  // View: Writings
  function renderWritingView() {
    const item = DATA.writings[state.itemIndices[2]];
    if (!item) return;

    mainPanelContent.innerHTML = `
      <div class="content-section">
        <h1 class="content-title">
          <span class="text-blue">${item.title}</span>
        </h1>
        <div class="content-subtitle">
          Published: <span class="text-orange">${item.date}</span> &nbsp;|&nbsp; 
          Duration: <span class="text-yellow">${item.readTime}</span>
        </div>

        <div class="quote-panel" style="margin-top: 0.5rem; background: rgba(88, 166, 255, 0.04);">
          <div class="quote-body">
            <p class="quote-text" style="font-style: normal; color: var(--clr-text-primary);">${item.abstract}</p>
          </div>
        </div>

        <div class="content-paragraphs" style="margin-top: 0.8rem;">
          ${item.paragraphs.map((p) => `<p>${p}</p>`).join("")}
        </div>

        <div style="margin-top: 0.8rem;">
          <h2 class="content-subtitle text-cyan" style="margin-bottom: 0.6rem;">Key Takeaways:</h2>
          <div class="bullet-list">
            ${item.takeaways
              .map(
                (t) => `
              <div class="bullet-item">
                <span class="bullet-bullet">&#10095;</span>
                <span>${t}</span>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>

        <!-- Bordered Information Note Panel -->
        <div class="quote-panel" style="margin-top: 1.5rem;">
          <div class="quote-body">
            <p class="quote-text">lorem ipsum &bull; lorem ipsum, lorem ipsum, and lorem ipsum.</p>
            <span class="quote-citation">Article Index: ${state.itemIndices[2] + 1} of ${DATA.writings.length}</span>
          </div>
        </div>
      </div>
    `;
  }

  // --- Collapsible Sidebar ---
  const SIDEBAR_KEY = "portfolio:sidebar-collapsed";

  function setSidebarCollapsed(collapsed) {
    if (!sidebarEl) return;
    sidebarEl.classList.toggle("collapsed", collapsed);

    if (sidebarToggleEl) {
      sidebarToggleEl.innerHTML = collapsed ? "&#9654;" : "&#9664;";
      sidebarToggleEl.setAttribute("aria-expanded", String(!collapsed));
      const label = collapsed ? "Expand sidebar" : "Collapse sidebar";
      sidebarToggleEl.setAttribute("aria-label", label);
      sidebarToggleEl.setAttribute("title", label);
    }

    try {
      localStorage.setItem(SIDEBAR_KEY, collapsed ? "1" : "0");
    } catch (err) {
      /* storage unavailable - state is simply not persisted */
    }
  }

  function isSidebarCollapsed() {
    return !!(sidebarEl && sidebarEl.classList.contains("collapsed"));
  }

  function toggleSidebar(forceCollapsed) {
    const next =
      typeof forceCollapsed === "boolean"
        ? forceCollapsed
        : !isSidebarCollapsed();
    setSidebarCollapsed(next);
  }

  function restoreSidebarState() {
    let saved = null;
    try {
      saved = localStorage.getItem(SIDEBAR_KEY);
    } catch (err) {
      saved = null;
    }
    setSidebarCollapsed(saved === "1");
  }

  // Attach Mouse & Keyboard Event Listeners
  function attachEventListeners() {
    // 1. Sidebar Panel Click Listeners
    panelElements.forEach((panel, idx) => {
      if (!panel) return;
      panel.addEventListener("click", () => {
        // Clicking a section while collapsed should reveal the content
        if (isSidebarCollapsed()) {
          toggleSidebar(false);
        }
        selectSection(idx);
      });
    });

    // 2. Keyboard Navigation
    window.addEventListener("keydown", (e) => {
      if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName))
        return;

      const key = e.key;

      if (key === "ArrowUp") {
        e.preventDefault();
        changeItem(-1);
      } else if (key === "ArrowDown") {
        e.preventDefault();
        changeItem(1);
      } else if (key === "ArrowLeft") {
        e.preventDefault();
        prevSection();
      } else if (key === "ArrowRight") {
        e.preventDefault();
        nextSection();
      } else if (key === "PageDown") {
        e.preventDefault();
        scrollMain(window.innerHeight * 0.45);
      } else if (key === "PageUp") {
        e.preventDefault();
        scrollMain(-window.innerHeight * 0.45);
      } else if (key === "Tab") {
        e.preventDefault();
        toggleSidebar();
      }
    });

    // 3. Mobile Toggle
    const mobileToggle = document.getElementById("mobile-toggle");
    if (mobileToggle) {
      mobileToggle.addEventListener("click", () => {
        if (sidebarEl) {
          sidebarEl.classList.toggle("mobile-open");
        }
      });
    }

    // 4. Hash Routing Listener
    window.addEventListener("hashchange", handleHashChange);

    // 5. Sidebar Collapse Toggle
    if (sidebarToggleEl) {
      sidebarToggleEl.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleSidebar();
      });
    }
  }

  function handleHashChange() {
    const hash = window.location.hash.toLowerCase().replace("#", "");
    if (hash === "home") {
      selectSection(0);
    } else if (hash === "projects") {
      selectSection(1, state.itemIndices[1]);
    } else if (hash === "writings") {
      selectSection(2, state.itemIndices[2]);
    }
  }

  // Auto initialize on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
