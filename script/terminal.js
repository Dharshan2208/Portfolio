const terminal = document.querySelector(".terminal-box");

// Terminal state
let currentInput = "";
let commandHistory = [];
let historyIndex = -1;
let currentPath = "~";

// Command responses
const commands = {
  whoami: "dharshan",
  pwd: "/home/dharshan",
  ls: "projects  skills  resume.pdf  contact.txt  dreams.txt",
  "cat contact.txt": `🔗 LinkedIn: linkedin.com/in/dharshan-h-734033334/
GitHub: github.com/Dharshan2208
Always open to collaborations!`,
  "cat dreams.txt": `• Building innovative web applications
• Contributing to open-source projects
• Landing an amazing internship
• Creating tech that makes a difference
• Participating in more hackathons
• Continuous learning and growth`,
  "cd projects": "projects",
  "cd ..": "~",
  cd: "~",
  date: new Date().toString(),
  help: `Available commands:
whoami     - Display current user
pwd        - Print working directory
ls         - List directory contents
cat <file> - Display file contents
cd <dir>   - Change directory
date       - Show current date/time
clear      - Clear terminal
history    - Show command history
about      - About Dharshan
skills     - List technical skills
projects   - Show featured projects
help       - Show this help message`,
  clear: "clear",
  history: () => commandHistory.join("\n"),
  about: `Hi! I'm Dharshan 👋

🎓 B.Tech CSE Student at Amrita Vishwa Vidyapeetham
• Full-stack developer
• ML/AI enthusiast
• Hackathon participant with multiple creative projects
• Building innovative projects
• Always learning and exploring new technologies

Fun facts:
🎬 Anime & movie enthusiast
♟️  Chess player (strategic thinking!)
🏸 Badminton lover
🎮 Gaming in free time(Subway Surfers & Angry Bird)`,
  skills: `Technical Skills:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Frontend:   HTML5, CSS3, JavaScript, React.js, TypeScript
Backend:    Node.js, Express.js, FastAPI, Python
Database:   MongoDB, Firebase
Tools:      Git/GitHub, VS Code, Figma
Languages:  JavaScript, Python, Java, C
Other:      AI Integration, RESTful APIs, Responsive Design`,
  projects: `Featured Projects:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 ExamGenius
   AI-powered exam preparation platform.

🎬 FlixTogether
   Group movie recommendation system.

🤖 Symbol Classifier
   ML-based hand-drawn symbol recognition.

Type 'cd projects' to explore more!`,
};

function createPrompt() {
  const prompt = document.createElement("div");
  prompt.className = "terminal-line";

  const promptText = document.createElement("span");
  promptText.className = "prompt";
  promptText.textContent = `dharshan@portfolio:${currentPath}$ `;

  const input = document.createElement("span");
  input.className = "input";

  const cursor = document.createElement("span");
  cursor.className = "cursor";
  cursor.textContent = "|";

  prompt.appendChild(promptText);
  prompt.appendChild(input);
  prompt.appendChild(cursor);

  return { prompt, input, cursor };
}

function executeCommand(cmd) {
  const trimmedCmd = cmd.trim().toLowerCase();

  if (trimmedCmd === "") return "";

  // Add to history
  commandHistory.push(cmd);
  historyIndex = commandHistory.length;

  // Handle special cases
  if (trimmedCmd === "clear") {
    return "clear";
  }

  if (trimmedCmd.startsWith("cd ")) {
    const dir = cmd.split(" ")[1];
    if (dir === "projects") {
      currentPath = "~/projects";
      return "";
    } else if (dir === ".." && currentPath === "~/projects") {
      currentPath = "~";
      return "";
    } else if (dir === "~" || dir === "") {
      currentPath = "~";
      return "";
    } else {
      return `cd: ${dir}: No such file or directory`;
    }
  }

  // Handle project-specific ls
  if (trimmedCmd === "ls" && currentPath === "~/projects") {
    return "ExamGenius/  FlixTogether/  SymbolClassifier/  README.md";
  }

  // Check if command exists
  if (commands[trimmedCmd]) {
    if (typeof commands[trimmedCmd] === "function") {
      return commands[trimmedCmd]();
    }
    return commands[trimmedCmd];
  }

  return `Command '${cmd}' not found. Type 'help' for available commands.`;
}

function addOutput(text, isCommand = false) {
  if (text === "clear") {
    terminal.innerHTML = "";
    return;
  }

  const output = document.createElement("div");
  output.className = isCommand ? "terminal-command" : "terminal-output";
  output.textContent = text;
  terminal.appendChild(output);
}

function scrollToBottom() {
  terminal.scrollTop = terminal.scrollHeight;
}

function initTerminal() {
  // Clear terminal
  terminal.innerHTML = "";

  // Add welcome message
  const welcome = document.createElement("div");
  welcome.className = "terminal-output";
  welcome.innerHTML = `<span style="color: var(--primary-color); font-size:16px">Welcome to Dharshan's Terminal v1.0</span>

Last login: ${new Date().toLocaleString()}
Type 'help' for available commands or 'about' to know more about me!
`;
  terminal.appendChild(welcome);

  // Create initial prompt
  const { prompt, input, cursor } = createPrompt();
  terminal.appendChild(prompt);

  // Handle keyboard input - FIXED VERSION
  document.addEventListener("keydown", (e) => {
    // Only handle terminal input if:
    // 1. The click/focus is within the terminal area, OR
    // 2. No form inputs are currently focused
    const activeElement = document.activeElement;
    const isFormInput =
      activeElement &&
      (activeElement.tagName === "INPUT" ||
        activeElement.tagName === "TEXTAREA" ||
        activeElement.contentEditable === "true");

    // If a form input is focused, don't interfere with it
    if (isFormInput) {
      return;
    }

    // Only handle terminal commands when terminal is clicked or no input is focused
    const terminalClicked =
      terminal.contains(e.target) || e.target === terminal;

    if (!terminalClicked && activeElement && activeElement !== document.body) {
      return; // Don't interfere with other focused elements
    }

    const currentPrompt = terminal.querySelector(".terminal-line:last-child");
    const currentInputSpan = currentPrompt?.querySelector(".input");
    const currentCursor = currentPrompt?.querySelector(".cursor");

    if (!currentInputSpan || !currentCursor) return;

    switch (e.key) {
      case "Enter":
        e.preventDefault();
        // Hide cursor
        currentCursor.style.display = "none";

        // Execute command
        const result = executeCommand(currentInput);
        if (result !== "") {
          addOutput(result);
        }

        // Create new prompt
        currentInput = "";
        const {
          prompt: newPrompt,
          input: newInput,
          cursor: newCursor,
        } = createPrompt();
        terminal.appendChild(newPrompt);
        scrollToBottom();
        break;

      case "Backspace":
        e.preventDefault();
        if (currentInput.length > 0) {
          currentInput = currentInput.slice(0, -1);
          currentInputSpan.textContent = currentInput;
        }
        break;

      case "ArrowUp":
        e.preventDefault();
        if (historyIndex > 0) {
          historyIndex--;
          currentInput = commandHistory[historyIndex];
          currentInputSpan.textContent = currentInput;
        }
        break;

      case "ArrowDown":
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++;
          currentInput = commandHistory[historyIndex];
          currentInputSpan.textContent = currentInput;
        } else {
          historyIndex = commandHistory.length;
          currentInput = "";
          currentInputSpan.textContent = currentInput;
        }
        break;

      case "Tab":
        e.preventDefault();
        // Simple tab completion for common commands
        const availableCommands = Object.keys(commands);
        const matches = availableCommands.filter((cmd) =>
          cmd.startsWith(currentInput)
        );
        if (matches.length === 1) {
          currentInput = matches[0];
          currentInputSpan.textContent = currentInput;
        }
        break;

      default:
        if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
          e.preventDefault();
          currentInput += e.key;
          currentInputSpan.textContent = currentInput;
        }
        break;
    }
  });

  // Make terminal clickable to focus
  terminal.addEventListener("click", () => {
    terminal.focus();
  });

  // Blinking cursor animation
  setInterval(() => {
    const cursor = terminal.querySelector(".cursor");
    if (cursor) {
      cursor.style.opacity = cursor.style.opacity === "0" ? "1" : "0";
    }
  }, 500);

  scrollToBottom();
}

// Add CSS styles dynamically
const terminalStyles = `
.terminal-line {
    display: flex;
    align-items: center;
    margin-bottom: 2px;
    min-height: 1.2em;
}

.prompt {
    color: var(--primary-color);
    font-weight: bold;
    white-space: nowrap;
}

.input {
    color: var(--text-main);
    margin-left: 4px;
}

.cursor {
    color: var(--text-main);
    font-weight: bold;
    margin-left: 2px;
    display: inline-block;
    animation: none;
}

.terminal-output {
    color: var(--text-tertiary);
    margin: 4px 0;
    white-space: pre-wrap;
    word-wrap: break-word;
}

.terminal-command {
    color: var(--primary-color);
    margin: 4px 0;
}

.terminal-box {
    font-family: 'Courier New', 'Monaco', 'Menlo', monospace !important;
    font-size: 0.9rem;
    line-height: 1.3;
    cursor: text;
    user-select: text;
    outline: none;
}

.terminal-box:focus {
    outline: none;
}
`;

// Styles
const styleSheet = document.createElement("style");
styleSheet.textContent = terminalStyles;
document.head.appendChild(styleSheet);

// Initialize terminal when page loads
initTerminal();
