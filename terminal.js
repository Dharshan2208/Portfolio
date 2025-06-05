const messages = [
  "Initializing profile...",
  "Boot sequence: PERSONALITY.CFG loaded.",
  "Anime enthusiast: ACTIVE ✅",
  "Movie & web series: ONLINE 🎬",
  "Chess player: STRATEGIC MODE ENABLED ♟️",
  "Badminton lover: SMASHING 🏸",
  "GitHub sync: SUCCESSFUL 🔄",
  "Hackathon mode: ALWAYS ON ⚡",
  "Creative mindset: ENGAGED 🔥",
  "Dreams: BIG",
  "Motivation: OVERFLOW",
  "Projects: LOADING INFINITY...",
  "Vision: Building tech that matters 💡",
  "Executing /home/dharshan/ambitions.sh...",
  "All systems green.",
  "User ready: Dharshan boot complete",
];

const terminal = document.querySelector(".terminal-box");

let currentLine = 0;
let currentChar = 0;
let lineElem = null;
const typingSpeed = 20;
const pauseBetweenLines = 600;

function type() {
  if (currentLine >= messages.length) {
    setTimeout(resetAndLoop, 1500);
    return;
  }

  if (!lineElem) {
    lineElem = document.createElement("div");
    lineElem.classList.add("line");

    const textSpan = document.createElement("span");
    textSpan.classList.add("typing-text");

    const cursorSpan = document.createElement("span");
    cursorSpan.classList.add("cursor");

    lineElem.appendChild(textSpan);
    lineElem.appendChild(cursorSpan);
    terminal.appendChild(lineElem);
  }

  const textSpan = lineElem.querySelector(".typing-text");
  const cursorSpan = lineElem.querySelector(".cursor");
  const currentMsg = messages[currentLine];

  textSpan.textContent = currentMsg.substring(0, currentChar);

  if (currentChar < currentMsg.length) {
    currentChar++;
    setTimeout(type, typingSpeed);
  } else {
    cursorSpan.style.display = "none";
    lineElem = null;
    currentChar = 0;
    currentLine++;
    setTimeout(type, pauseBetweenLines);
  }

  terminal.scrollTop = terminal.scrollHeight;
}

function resetAndLoop() {
  terminal.innerHTML = "";
  currentLine = 0;
  currentChar = 0;
  lineElem = null;
  type();
}

type();
