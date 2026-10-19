(function () {
  "use strict";

  // Data Models (Home, Projects, Writings)

  const DATA = {
    home: {
      name: "Dharshan",
      intro: [
        `Hi, I'm <span class="text-blue">Dharshan</span>.`,
        `A <span class="text-orange">computer science student</span> @ Amrita Vishwa Vidyapeetham`,
        `My primary interests lie in <span class="text-pink">backend systems</span>, distributed architectures, and building reliable, scalable systems.`,
        `I enjoy working with <span class="text-orange">Go</span>, exploring system design, developer tooling, and agentic AI applications.`,
        `From building backend services to experimenting with AI powered tools, I like turning ideas into practical, working software or maybe some experimentational projects.`,
        `Feel free to connect with me on <a href="https://www.linkedin.com/in/Dharshan2208/" target="_blank" class="text-blue">LinkedIn</a> or explore my projects on <a href="https://github.com/Dharshan2208" target="_blank" class="text-pink">GitHub</a>.`,
      ],
      instructions: [
        `<span class="text-pink">Click</span> on any section in the sidebar to inspect past <span class="text-blue">projects</span> and <span class="text-orange">writings</span>.`,
        `You can also navigate through sections using the <span class="text-blue">arrow keys</span>.`,
      ],
      quote: {
        text: "The details of technical craft are recorded in the commit log of the repository.",
        citation: "System Architecture Notes — v1.0",
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

  // Live Quote Data (Philosophers API)
  const QUOTES_API = "https://philosophersapi.com/api";
  let quoteList = null;
  let philosopherNames = {};
  let quoteLoading = false;
  let currentQuote = {
    text: DATA.home.quote.text,
    citation: DATA.home.quote.citation,
  };

  // Initialize
  function init() {
    sidebarEl = document.getElementById("sidebar");
    mainPanelContent = document.getElementById("main-panel-content");

    panelElements = SECTIONS.map((s) => document.getElementById(s.id));
    paginationElements = [
      null, // Home has no list pagination
      document.getElementById("projects-pagination"),
      document.getElementById("writings-pagination"),
    ];

    populateSidebarLists();
    attachEventListeners();

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

  // Live Quotes (Philosophers API)
  async function ensureQuoteData() {
    if (quoteList) return quoteList.length > 0;
    try {
      const [quotesRes, philsRes] = await Promise.all([
        fetch(QUOTES_API + "/quotes"),
        fetch(QUOTES_API + "/philosophers"),
      ]);
      const quotes = await quotesRes.json();
      const philosophers = await philsRes.json();

      if (Array.isArray(philosophers)) {
        philosophers.forEach((p) => {
          philosopherNames[p.id] = p.name || p.wikiTitle || "Unknown";
        });
      }
      quoteList = Array.isArray(quotes) ? quotes : [];
      return quoteList.length > 0;
    } catch (err) {
      console.warn("[quotes] Unable to load quotes from the API.", err);
      quoteList = [];
      return false;
    }
  }

  function formatQuoteCitation(quote) {
    const pid = quote.philosopher && quote.philosopher.id;
    const name = (pid && philosopherNames[pid]) || "Unknown";
    return quote.work ? name + " \u2014 " + quote.work : name;
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

    const ok = await ensureQuoteData();
    if (ok) {
      const pick = quoteList[Math.floor(Math.random() * quoteList.length)];
      currentQuote = {
        text: pick.quote,
        citation: formatQuoteCitation(pick),
      };
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
      <!-- Stylized DHARSHAN Wordmark Placeholder Box -->
      <div class="wordmark-container">
        <pre class="wordmark-text">
            ================================================================
            ____  _   _    _    ____  ____  _   _    _    _   _ 
            |  _ \\| | | |  / \\  |  _ \\/ ___|| | | |  / \\  | \\ | |
            | | | | |_| | / _ \\ | |_) \\___ \\| |_| | / _ \\ |  \\| |
            | |_| |  _  |/ ___ \\|  _ < ___) |  _  |/ ___ \\| |\\  |
            |____/|_| |_/_/   \\_\\_| \\_\\____/|_| |_/_/   \\_\\_| \\_|
            ================================================================
        </pre>
      </div>

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
            <span>&#9654;</span> Source Code
          </a>
          <a href="${item.demoUrl}" target="_blank" class="tui-btn">
            <span>&#9654;</span> Live Demo
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

        <!-- Project Info Quote Panel -->
        <div class="quote-panel">
          <div class="quote-glyph">&#9835;</div>
          <div class="quote-body">
            <p class="quote-text">Interactive project records &mdash; Repositories and deployment endpoints.</p>
            <span class="quote-citation">Project Index: ${state.itemIndices[1] + 1} of ${DATA.projects.length}</span>
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
            <p class="quote-text">Technical essay record &bull; Thoughts on systems, terminal interfaces, and software architecture.</p>
            <span class="quote-citation">Article Index: ${state.itemIndices[2] + 1} of ${DATA.writings.length}</span>
          </div>
        </div>
      </div>
    `;
  }

  // Attach Mouse & Keyboard Event Listeners
  function attachEventListeners() {
    // 1. Sidebar Panel Click Listeners
    panelElements.forEach((panel, idx) => {
      if (!panel) return;
      panel.addEventListener("click", () => {
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
