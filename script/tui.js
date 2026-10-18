/**
 * Dharshan - Terminal Portfolio Engine
 * Vanilla JavaScript implementation for TUI navigation, keyboard shortcuts, and view rendering.
 */

(function () {
  'use strict';

  // --- Data Models (Home, Projects, Writings) ---

  const DATA = {
    home: {
      name: "Dharshan",
      intro: [
        `Hi, I'm <span class="text-blue">Dharshan</span>`,
        `A <span class="text-orange">software engineer</span> and <span class="text-orange">developer</span>.`,
        `Although my focus is on systems and backend architectures, most of my experience encompasses <span class="text-pink">full-stack</span> software development.`,
        `I enjoy exploring low-level systems, developer tooling, and building clean, efficient user experiences.`,
        `Another interest of mine is <span class="text-orange">interface ergonomics</span>, designing tools that feel responsive, tactile, and natural to operate.`,
        `If you'd like to get in touch, feel free to connect via <a href="https://www.linkedin.com/in/dharshan-h-734033334/" target="_blank" class="text-blue">LinkedIn</a> or check out public repositories on <a href="https://github.com/Dharshan2208" target="_blank" class="text-pink">GitHub</a>.`
      ],
      instructions: [
        `<span class="text-pink">Click</span> on any section in the sidebar to inspect past <span class="text-blue">projects</span> and <span class="text-orange">writings</span>.`,
        `You can also navigate through sections using the <span class="text-blue">arrow keys</span>.`
      ],
      quote: {
        text: "The details of technical craft are recorded in the commit log of the repository.",
        citation: "System Architecture Notes — v1.0"
      }
    },

    projects: [
      {
        name: "Lorem Ipsum Dolor Sit Amet",
        tagline: "Consectetur adipiscing elit sed do eiusmod tempor",
        year: "2024",
        technologies: ["lorem", "ipsum", "dolor", "sit"],
        githubUrl: "https://github.com/Dharshan2208",
        demoUrl: "https://github.com/Dharshan2208",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
        features: [
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
        ],
      },
      {
        name: "Lorem Ipsum Dolor Sit Amet Consectetur",
        tagline: "Adipiscing elit sed do eiusmod tempor incididunt",
        year: "2024",
        technologies: ["amet", "consectetur", "adipiscing", "elit"],
        githubUrl: "https://github.com/Dharshan2208",
        demoUrl: "https://github.com/Dharshan2208",
        description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate.",
        features: [
          "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.",
          "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet.",
          "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores."
        ],
      },
      {
        name: "Lorem Ipsum Dolor Sit Amet Elit",
        tagline: "Tempor incididunt ut labore et dolore magna aliqua",
        year: "2023",
        technologies: ["sed", "eiusmod", "tempor", "incididunt"],
        githubUrl: "https://github.com/Dharshan2208",
        demoUrl: "https://github.com/Dharshan2208",
        description: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.",
        features: [
          "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
          "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet consectetur.",
          "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam."
        ],
      },
      {
        name: "Lorem Ipsum Dolor Sit Amet Tempor",
        tagline: "Labore et dolore magna aliqua ut enim ad minim",
        year: "2023",
        technologies: ["ut", "labore", "dolore", "magna"],
        githubUrl: "https://github.com/Dharshan2208",
        demoUrl: "https://github.com/Dharshan2208",
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        features: [
          "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam.",
          "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis.",
          "Et harum quidem rerum facilis est et expedita distinctio nam libero tempore."
        ],
      },
      {
        name: "Lorem Ipsum Dolor Sit Amet Veniam",
        tagline: "Quis nostrud exercitation ullamco laboris nisi ut",
        year: "2022",
        technologies: ["aliqua", "enim", "minim", "veniam"],
        githubUrl: "https://github.com/Dharshan2208",
        demoUrl: "https://github.com/Dharshan2208",
        description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.",
        features: [
          "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus.",
          "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit.",
          "Omnis voluptas assumenda est, omnis dolor repellendus temporibus autem quibusdam."
        ],
      },
      {
        name: "Lorem Ipsum Dolor Sit Amet Aliquip",
        tagline: "Ex ea commodo consequat duis aute irure dolor",
        year: "2022",
        technologies: ["quis", "nostrud", "exercitation", "ullamco"],
        githubUrl: "https://github.com/Dharshan2208",
        demoUrl: "https://github.com/Dharshan2208",
        description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
        features: [
          "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis.",
          "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse.",
          "Atque corrupti quos dolores et quas molestias excepturi sint occaecati."
        ],
      }
    ],

    writings: [
      {
        title: "Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing",
        date: "Oct 2024",
        readTime: "6 min read",
        topics: ["Architecture", "CSS Grid", "TUI", "Vanilla JS"],
        abstract: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        paragraphs: [
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        ],
        takeaways: [
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.",
          "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
          "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur."
        ]
      },
      {
        title: "Sed Do Eiusmod Tempor Incididunt Ut Labore",
        date: "Aug 2024",
        readTime: "8 min read",
        topics: ["CLI", "UX Design", "Developer Tools", "Systems"],
        abstract: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque.",
        paragraphs: [
          "Et harum quidem rerum facilis est et expedita distinctio nam libero tempore cum soluta.",
          "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet.",
          "Itaque earum rerum hic tenetur a sapiente delectus ut aut reiciendis voluptatibus."
        ],
        takeaways: [
          "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam.",
          "Ut enim ad minima veniam quis nostrum exercitationem ullam corporis suscipit.",
          "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia."
        ]
      },
      {
        title: "Ut Enim Ad Minim Veniam Quis Nostrud Exercitation",
        date: "May 2024",
        readTime: "10 min read",
        topics: ["Distributed Systems", "Backend", "Architecture"],
        abstract: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        paragraphs: [
          "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur.",
          "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur adipiscing elit.",
          "Ut enim ad minima veniam quis nostrum exercitationem ullam corporis suscipit laboriosam."
        ],
        takeaways: [
          "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis.",
          "Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit.",
          "Et harum quidem rerum facilis est et expedita distinctio nam libero tempore."
        ]
      },
      {
        title: "Duis Aute Irure Dolor In Reprehenderit Voluptate",
        date: "Feb 2024",
        readTime: "7 min read",
        topics: ["Concurrency", "Go", "Rust", "Memory Safety"],
        abstract: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        paragraphs: [
          "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates.",
          "Itaque earum rerum hic tenetur a sapiente delectus ut aut reiciendis voluptatibus maiores alias.",
          "Omnis voluptas assumenda est omnis dolor repellendus temporibus autem quibusdam et aut officiis."
        ],
        takeaways: [
          "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil.",
          "Atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate.",
          "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed."
        ]
      },
      {
        title: "Excepteur Sint Occaecat Cupidatat Non Proident",
        date: "Nov 2023",
        readTime: "9 min read",
        topics: ["Distributed Systems", "Consensus", "Storage"],
        abstract: "Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod.",
        paragraphs: [
          "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
          "Et harum quidem rerum facilis est et expedita distinctio nam libero tempore cum soluta nobis.",
          "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet."
        ],
        takeaways: [
          "Ut enim ad minima veniam quis nostrum exercitationem ullam corporis suscipit laboriosam.",
          "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur.",
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium."
        ]
      },
      {
        title: "Sunt In Culpa Qui Officia Deserunt Mollit",
        date: "Aug 2023",
        readTime: "5 min read",
        topics: ["Software Design", "Domain Driven Design", "Best Practices"],
        abstract: "Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        paragraphs: [
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim.",
          "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum."
        ],
        takeaways: [
          "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam.",
          "Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit.",
          "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit."
        ]
      }
    ]
  };

  // --- UI Navigation State ---
  const state = {
    sectionIndex: 0, // 0: Home, 1: Projects, 2: Writings
    itemIndices: [0, 0, 0], // Selected item index for [Home, Projects, Writings]
  };

  const SECTIONS = [
    { id: 'panel-home', key: 'home', count: 0 },
    { id: 'panel-projects', key: 'projects', count: DATA.projects.length },
    { id: 'panel-writings', key: 'writings', count: DATA.writings.length }
  ];

  // DOM Elements
  let mainPanelContent;
  let panelElements = [];
  let paginationElements = [];
  let sidebarEl;

  // Initialize
  function init() {
    sidebarEl = document.getElementById('sidebar');
    mainPanelContent = document.getElementById('main-panel-content');

    panelElements = SECTIONS.map(s => document.getElementById(s.id));
    paginationElements = [
      null, // Home has no list pagination
      document.getElementById('projects-pagination'),
      document.getElementById('writings-pagination')
    ];

    populateSidebarLists();
    attachEventListeners();

    if (window.location.hash) {
      handleHashChange();
    } else {
      updateUI(false);
    }
  }

  // Populate the Sidebar List Items
  function populateSidebarLists() {
    // 1. Projects List
    const projList = document.getElementById('projects-list');
    if (projList) {
      projList.innerHTML = '';
      DATA.projects.forEach((item, index) => {
        const el = document.createElement('div');
        el.className = 'ui-list-item' + (index === 0 ? ' selected-item' : '');
        el.dataset.index = index;
        el.innerHTML = `
          <div class="item-main">
            <span>${item.name.split(':')[0]}</span>
          </div>
          <div class="item-meta text-yellow">${item.year}</div>
        `;
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          selectSection(1, index);
        });
        projList.appendChild(el);
      });
    }

    // 2. Writings List
    const writingsList = document.getElementById('writings-list');
    if (writingsList) {
      writingsList.innerHTML = '';
      DATA.writings.forEach((item, index) => {
        const el = document.createElement('div');
        el.className = 'ui-list-item' + (index === 0 ? ' selected-item' : '');
        el.dataset.index = index;
        el.innerHTML = `
          <div class="item-main">
            <span class="text-blue item-icon">›</span>
            <span>${item.title}</span>
          </div>
          <div class="item-meta">${item.date}</div>
        `;
        el.addEventListener('click', (e) => {
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
      state.itemIndices[sectionIndex] = Math.max(0, Math.min(itemIndex, maxCount - 1));
    }

    updateUI(true);

    if (sidebarEl && sidebarEl.classList.contains('mobile-open')) {
      sidebarEl.classList.remove('mobile-open');
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
      behavior: 'smooth'
    });
  }

  // Update Visual State (Borders, Active Items, Pagination, and Render Main Panel)
  function updateUI(shouldScrollContentTop) {
    // 1. Highlight the active panel
    panelElements.forEach((panel, idx) => {
      if (!panel) return;
      if (idx === state.sectionIndex) {
        panel.classList.add('selected-frame');
      } else {
        panel.classList.remove('selected-frame');
      }
    });

    // 2. Highlight selected item in active panel & update pagination
    [1, 2].forEach((sIdx) => {
      const panel = panelElements[sIdx];
      if (!panel) return;
      const listItems = panel.querySelectorAll('.ui-list-item');
      const activeItemIndex = state.itemIndices[sIdx];

      listItems.forEach((item, idx) => {
        if (idx === activeItemIndex) {
          item.classList.add('selected-item');
          if (sIdx === state.sectionIndex) {
            scrollItemIntoView(item, panel.querySelector('.ui-list'));
          }
        } else {
          item.classList.remove('selected-item');
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

  // View: Home
  function renderHomeView() {
    const home = DATA.home;
    mainPanelContent.innerHTML = `
      <!-- Stylized DHARSHAN Wordmark Placeholder Box -->
      <div class="wordmark-container">
        <pre class="wordmark-text">
=====================================================================
  ____  _   _    _    ____  ____  _   _    _    _   _ 
 |  _ \\| | | |  / \\  |  _ \\/ ___|| | | |  / \\  | \\ | |
 | | | | |_| | / _ \\ | |_) \\___ \\| |_| | / _ \\ |  \\| |
 | |_| |  _  |/ ___ \\|  _ < ___) |  _  |/ ___ \\| |\\  |
 |____/|_| |_/_/   \\_\\_| \\_\\____/|_| |_/_/   \\_\\_| \\_|
=====================================================================
        </pre>
      </div>

      <!-- Introduction Section -->
      <div class="content-section">
        <div class="content-paragraphs">
          ${home.intro.map(p => `<p>${p}</p>`).join('')}
        </div>

        <div class="content-paragraphs" style="margin-top: 0.5rem;">
          ${home.instructions.map(p => `<p>${p}</p>`).join('')}
        </div>
      </div>

      <!-- Bordered Placeholder Quote / Information Panel -->
      <div class="quote-panel">
        <div class="quote-glyph">&#9835;</div>
        <div class="quote-body">
          <p class="quote-text">&ldquo;${home.quote.text}&rdquo;</p>
          <span class="quote-citation">${home.quote.citation}</span>
        </div>
      </div>
    `;
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
          ${item.technologies.map(t => `<span class="tech-badge">${t}</span>`).join('')}
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
            ${item.features.map(f => `
              <div class="bullet-item">
                <span class="bullet-bullet">&#10095;</span>
                <span>${f}</span>
              </div>
            `).join('')}
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

        <div class="meta-badges-row">
          ${item.topics.map(t => `<span class="tech-badge text-cyan">${t}</span>`).join('')}
        </div>

        <div class="quote-panel" style="margin-top: 0.5rem; background: rgba(88, 166, 255, 0.04);">
          <div class="quote-glyph text-yellow">&#9998;</div>
          <div class="quote-body">
            <p class="quote-text" style="font-style: normal; color: var(--clr-text-primary);">${item.abstract}</p>
          </div>
        </div>

        <div class="content-paragraphs" style="margin-top: 0.8rem;">
          ${item.paragraphs.map(p => `<p>${p}</p>`).join('')}
        </div>

        <div style="margin-top: 0.8rem;">
          <h2 class="content-subtitle text-cyan" style="margin-bottom: 0.6rem;">Key Takeaways:</h2>
          <div class="bullet-list">
            ${item.takeaways.map(t => `
              <div class="bullet-item">
                <span class="bullet-bullet">&#10095;</span>
                <span>${t}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Bordered Information Note Panel -->
        <div class="quote-panel" style="margin-top: 1.5rem;">
          <div class="quote-glyph">&#9834;</div>
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
      panel.addEventListener('click', () => {
        selectSection(idx);
      });
    });

    // 2. Keyboard Navigation
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      const key = e.key;

      if (key === 'ArrowUp') {
        e.preventDefault();
        changeItem(-1);
      } else if (key === 'ArrowDown') {
        e.preventDefault();
        changeItem(1);
      } else if (key === 'ArrowLeft') {
        e.preventDefault();
        prevSection();
      } else if (key === 'ArrowRight') {
        e.preventDefault();
        nextSection();
      } else if (key === 'PageDown') {
        e.preventDefault();
        scrollMain(window.innerHeight * 0.45);
      } else if (key === 'PageUp') {
        e.preventDefault();
        scrollMain(-window.innerHeight * 0.45);
      }
    });

    // 3. Mobile Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    if (mobileToggle) {
      mobileToggle.addEventListener('click', () => {
        if (sidebarEl) {
          sidebarEl.classList.toggle('mobile-open');
        }
      });
    }

    // 4. Hash Routing Listener
    window.addEventListener('hashchange', handleHashChange);
  }

  function handleHashChange() {
    const hash = window.location.hash.toLowerCase().replace('#', '');
    if (hash === 'home') {
      selectSection(0);
    } else if (hash === 'projects') {
      selectSection(1, state.itemIndices[1]);
    } else if (hash === 'writings') {
      selectSection(2, state.itemIndices[2]);
    }
  }

  // Auto initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
