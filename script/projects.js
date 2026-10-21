window.PROJECTS = [
  {
    name: "Judex",
    tagline: "Distributed online code execution service",
    year: "2026",
    technologies: ["Go", "Redis", "Docker", "REST APIs", "Azure"],
    githubUrl: "https://github.com/Dharshan2208",
    demoUrl: "https://github.com/Dharshan2208",
    description:
      "A distributed online code execution service that supports secure multi-language compilation and execution through Docker-based sandboxing with resource isolation, execution time limits, and RESTful APIs.",
    features: [
      "Asynchronous job processing pipeline using Redis-backed queues and worker services, with execution scheduling, job tracking, and IP-based rate limiting.",
      "End-to-end observability via Prometheus, Grafana, Loki, and Promtail; validated scalability with k6 load testing (1,000 concurrent users, 50K+ requests) without failures.",
      "Deployed the distributed system on Microsoft Azure using Docker.",
    ],
  },
  {
    name: "Git Secret Scanner",
    tagline: "Concurrent Git security scanner in Go",
    year: "2026",
    technologies: ["Go", "Git", "Concurrency", "Security", "CLI"],
    githubUrl: "https://github.com/Dharshan2208",
    demoUrl: "https://github.com/Dharshan2208",
    description:
      "A concurrent Git security scanner in Go that analyzes both source code and full commit history to detect exposed credentials using a multi-layer pipeline combining regex signatures, entropy analysis, and heuristic keyword detection.",
    features: [
      "Worker pool based concurrent architecture enabling scalable repository scanning with full history traversal and optimized resource utilization.",
      "High-performance execution: scanning 100K+ LOC repositories in 8 seconds and medium repositories with 50 commits in 15 seconds.",
      "Generates deduplicated security reports.",
    ],
  },
  {
    name: "Stock Analysis System",
    tagline: "Multi-agent investment analysis system",
    year: "2025",
    technologies: ["Python", "LangGraph", "Gemini", "Yahoo Finance"],
    githubUrl: "https://github.com/Dharshan2208",
    demoUrl: "https://github.com/Dharshan2208",
    description:
      "A multi-agent investment analysis system using LangGraph where specialized AI agents collaboratively evaluated financial data through structured reasoning and consensus-based decision making.",
    features: [
      "Integrated Gemini, Groq, Yahoo Finance, and financial APIs to retrieve real-time market data, financial statements, company fundamentals, and news.",
      "Structured reasoning pipeline synthesizing multi-agent outputs into comprehensive investment reports with risk assessment, valuation insights, and actionable recommendations.",
    ],
  },
  {
    name: "Vita Care",
    tagline: "AI-assisted healthcare coordination platform",
    year: "2026",
    technologies: ["React.js", "FastAPI", "Gemini AI", "WhatsApp Integration"],
    githubUrl: "https://github.com/Dharshan2208",
    demoUrl: "https://github.com/Dharshan2208",
    description:
      "An AI-assisted healthcare coordination platform leveraging React, FastAPI, and Gemini AI to automate appointment scheduling, prescription management, and medication reminders.",
    features: [
      "Modular microservices architecture integrating autonomous AI workflows, voice interaction, and WhatsApp messaging.",
      "Streamlines patient communication and healthcare coordination.",
    ],
  },
];
