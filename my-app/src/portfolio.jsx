import { useState, useEffect } from "react";

const NAV_LINKS = ["Projects", "Experience", "Education/Skills", "Research", "Contact"];

const PROJECTS = [
  {
    title: "Classifying Malware Visually",
    desc: "A ResNet34 CNN built to convert malware byte code to images to classify malware \"visually\", with a 95% test data set accuracy.",
    tag: "ML",
    tagColor: "blue",
    stack: ["Python", "PyTorch", "ResNet34", "CNN"],
    highlights: [
      "Designed and implemented a 34-layer Residual CNN architecture in PyTorch with a well-defined OOP class hierarchy for model components, training loop, and evaluation pipeline",
      "Engineered a bytecode-to-image preprocessing pipeline converting raw executable files into structured grayscale matrices suitable for convolutional learning",
      "Applied batch normalization, dropout regularization, and adaptive learning rate scheduling to improve generalization and convergence stability",
      "Achieved 95% test accuracy with strong precision/recall performance, confirmed through rigorous test suite evaluation",
    ],
  },
  {
    title: "Deep Learning Using Pure Math",
    desc: "A 2 layer deep learning model designed to classify spam, all built using 0 external AI/ML modules and only the power of math and numpy.",
    tag: "ML",
    tagColor: "blue",
    stack: ["Python", "NumPy", "scikit-learn", "joblib"],
    highlights: [
      "Built a 2-layer fully connected neural network from scratch using only NumPy for email spam classification, deliberately avoiding high-level frameworks like PyTorch or TensorFlow to demonstrate deep understanding of neural network fundamentals",
      "Implemented the complete forward pass manually, including TF-IDF text vectorization (via scikit-learn), sigmoid hidden layer activation (100 neurons), and softmax output layer producing class probabilities over [not_spam, spam]",
      "Derived and coded full backpropagation by hand, computing output gradients, propagating error through the hidden layer via the sigmoid derivative, and updating all weights and biases with vanilla gradient descent",
      "Used cross-entropy as the training loss function, with weight/bias update logic cleanly separated into forwardpass(), backprop(), and update() methods in neuralnet.py",
      "Persisted the trained model with joblib and exposed it through an interactive CLI tool in mainprog.py, allowing arbitrary email text to be classified in real time",
    ],
  },
  {
    title: "Lock Your Files with a JPEG",
    desc: "A symmetric file encryption system but instead of a password, you use a JPEG.",
    tag: "Security",
    tagColor: "coral",
    stack: ["Python", "SHA-256", "Cryptography", "GUI"],
    highlights: [
      "Designed and built an enterprise-grade file encryption platform that derives symmetric encryption keys from user-supplied images using SHA-256 hashing, enforcing a two-factor protection model where both a file and a specific image are required for decryption",
      "Implemented a secure key generation pipeline incorporating image preprocessing steps (normalization, resizing, pixel-level transformation) and entropy enhancement techniques to maximize key randomness and resistance against brute-force and dictionary attacks",
      "Engineered the full encryption and decryption workflow end-to-end, handling file I/O, key derivation, cipher operations, and secure memory practices within a cohesive backend architecture",
      "Built a GUI-based interface abstracting the cryptographic internals, providing users with an intuitive encryption/decryption experience without exposing implementation details",
      "Integrated robust error handling and input sanitization throughout the pipeline, guarding against malformed inputs, incorrect key images, corrupted files, and edge cases that could compromise security or cause silent failures",
    ],
  },
  {
    title: "70,000 Digits, Zero Labels",
    desc: "A from-scratch K-Means clustering engine that discovers structure in MNIST handwritten digits using pure geometry — no supervision, no ML frameworks, just NumPy and linear algebra.",
    tag: "Data",
    tagColor: "teal",
    stack: ["Python", "NumPy", "PyTorch", "torchvision"],
    highlights: [
      "Implemented K-Means clustering algorithm from scratch using NumPy, applied to the MNIST handwritten digit dataset (28×28 images flattened to 784-dimensional vectors) loaded via PyTorch's torchvision",
      "Designed a modular, configurable KMeans class supporting tunable hyperparameters (k, max_iterations, epsilon, repeats) with repeated runs and best-result selection to mitigate local minima",
      "Optimized clustering using distortion as the objective function, minimizing J = ‖X − ZM‖² with one-hot encoded membership matrices for centroid assignment",
      "Built JSON serialization and deserialization support for saving and reloading clustering results, enabling reproducibility and downstream analysis",
      "Wrote unit tests covering core algorithm components including centroid updates, membership assignment, and distortion computation",
    ],
  },
  {
    title: "The Anti Procrastination App",
    desc: "A Java app designed to keep track of your tasks and timing, with an auto stop timer feature if you stop working.",
    tag: "SWE",
    tagColor: "amber",
    stack: ["Java", "Swing", "Agile", "GitLab"],
    highlights: [
      "Collaborated in a 5-person team following Agile workflow and software design best practices to deliver a full-featured desktop time-tracking application on schedule",
      "Built core task management functionality including task creation, editing, and persistent tracking of time spent per task and per application during active sessions",
      "Implemented intelligent idle detection with automatic timer suspension when user inactivity is detected, improving time-tracking accuracy",
      "Developed a real-time notification system for task reminders and a global hotkey interface for controlling the tracker without switching focus",
      "Integrated an in-app statistics dashboard surfacing productivity insights such as time breakdowns across tasks and applications",
      "Developed entirely in Java with full source code hosted on GitHub, following team-based version control and collaborative development practices on GitLab",
    ],
  },
];

const EXPERIENCE = [
  {
    role: "Software Engineer",
    org: "USask Toxicology Research Laboratory",
    period: "May 2026 – Present",
    bullets: [
      "Led end-to-end development of a computer vision research pipeline as sole engineer, owning the full project lifecycle from hardware design to software deployment",
      "Refactored and optimized existing deep learning inference code to improve modularity, performance, and maintainability",
      "Designed and built an interactive GUI application featuring multi-mode experiment selection, live system resource monitoring, and a searchable experiment history dashboard",
      "Architected and implemented an automated queue-based video processing pipeline integrating HandBrake compression, deep learning inference, and structured data extraction from processed footage",
      "Developed a plug-and-play hardware-software integration system enabling direct camera input into the analysis pipeline with zero-configuration setup",
      "Engineered a custom recording enclosure (box apparatus) with integrated Arduino-controlled LED lighting, enabling software-driven illumination control for consistent experimental conditions",
      "Designed PCB/microcontroller wiring and firmware for the Arduino-based lighting system, bridging embedded hardware with the desktop software interface",
    ],
    stack: ["Python", "SQL", "React", "REST APIs"],
  },
  {
    role: "Cybersecurity Intern",
    org: "The Clean Divorce — Cybersecurity",
    period: "Oct 2025 – Dec 2025",
    bullets: [
      "Conducted a comprehensive cybersecurity assessment of the company's Wix-based environment to identify vulnerabilities, evaluate data protection controls, and ensure compliance with industry security standards",
      "Developed a Cybersecurity & IT Security Guideline outlining best practices for data protection, incident response, password and encryption policies, and day-to-day IT security operations tailored to small professional firms",
      "Researched and recommending layered security measures and alternative secure storage integrations, aligning findings with cybersecurity frameworks and improving client data confidentiality and system resilience",
    ],
    stack: ["Node.js", "Security", "Auth"],
  },
  {
    role: "IT Support Specialist",
    org: "Vroom Motors",
    period: "Mar 2025 – Oct 2025",
    bullets: [
      "Provided end-to-end technical support across the organization, troubleshooting hardware, software, web browser, and network-related issues to ensure seamless daily operations",
      "Assessed and selected company-wide device infrastructure, including desktops, laptops, monitors, and peripherals, based on performance, budget, and business needs",
      "Delivered responsive, user-focused IT assistance and implemented practical solutions to improve system efficiency and reduce downtime",
    ],
    stack: ["IT Support", "Networking", "Hardware", "Troubleshooting"],
  },
  {
    role: "AI Training Analyst",
    org: "Outlier AI",
    period: "Dec 2024 – Mar 2026",
    bullets: [
      "Evaluate AI-generated code for correctness, efficiency, and logical soundness",
      "Debug, refactor, and replace flawed AI outputs with correct, optimized implementations",
      "Identify edge cases, failure modes, and reasoning errors in model responses",
      "Assess AI outputs for clarity, instruction adherence, and technical accuracy",
      "Create and curate high-quality training datasets to improve model performance",
      "Provide structured feedback to fine-tune large language models on technical tasks",
      "Apply software engineering best practices to ensure production-level quality",
    ],
    stack: ["Python", "LLMs", "Code Review", "ML"],
  },
  {
    role: "Web Developer",
    org: "Dreams Technology Ltd.",
    period: "Jan 2024 – Jul 2024",
    bullets: [
      "Collaborated directly with small business clients to gather website requirements, resolve technical issues, and provide user-friendly solutions tailored to their needs",
      "Designed and developed responsive front-end interfaces using React.js and JavaScript, ensuring optimal performance across browsers and devices",
      "Provided ongoing technical support to clients post-launch, troubleshooting front-end bugs, addressing compatibility issues, and implementing requested updates",
    ],
    stack: ["React", "Node.js", "CSS"],
  },
];

const SKILLS = [
  { category: "Languages", items: ["Python", "C", "C++", "Java", "Scala", "JavaScript", "SQL", "Prolog", "R"] },
  { category: "ML / AI", items: ["PyTorch", "NumPy", "from-scratch NNs", "K-Means", "CNNs", "Gemma", "Claude API"] },
  { category: "Systems", items: ["Akka", "Actor model", "Concurrent systems", "Linda tuple spaces", "Multi-tape TMs"] },
  { category: "Web", items: ["React", "Node.js", "REST APIs", "HTML/CSS"] },
  { category: "Security", items: ["SHA-256", "AES encryption", "OWASP hardening", "Auth systems"] },
  { category: "Bio / Sci", items: ["NEURON simulator", "C. elegans connectome", "FlyWire", "R / deSolve", "ggplot2"] },
];

const TAG_STYLES = {
  blue:   { bg: "#E6F1FB", color: "#0C447C" },
  purple: { bg: "#EEEDFE", color: "#3C3489" },
  teal:   { bg: "#E1F5EE", color: "#085041" },
  coral:  { bg: "#FAECE7", color: "#712B13" },
  amber:  { bg: "#FAEEDA", color: "#633806" },
};

function Tag({ label, color }) {
  const s = TAG_STYLES[color] || TAG_STYLES.blue;
  return (
    <span style={{
      fontSize: 11, fontWeight: 600, padding: "3px 10px",
      borderRadius: 999, background: s.bg, color: s.color,
      letterSpacing: "0.04em", textTransform: "uppercase",
    }}>{label}</span>
  );
}

function ProjectCard({ project }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="project-card">
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          background: "var(--card-bg)",
          borderRadius: 14,
          padding: "20px 22px",
          cursor: "pointer",
          transition: "transform 0.15s",
          transform: open ? "translateY(-2px)" : "none",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <Tag label={project.tag} color={project.tagColor} />
          <span style={{ fontSize: 11, color: "var(--muted)", fontFamily: "monospace" }}>
            {open ? "▲ less" : "▼ more"}
          </span>
        </div>
        <p style={{ margin: "8px 0 4px", fontSize: 16, fontWeight: 600, color: "var(--text)", lineHeight: 1.3 }}>
          {project.title}
        </p>
        <p style={{ margin: 0, fontSize: 13, color: "var(--secondary)", lineHeight: 1.6 }}>
          {project.desc}
        </p>
        {open && (
          <div style={{ marginTop: 14, borderTop: "1px solid var(--border)", paddingTop: 12 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 6px" }}>Highlights</p>
            <ul style={{ margin: "0 0 12px", paddingLeft: 16 }}>
              {project.highlights.map(h => (
                <li key={h} style={{ fontSize: 12, color: "var(--secondary)", marginBottom: 3 }}>{h}</li>
              ))}
            </ul>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              {project.stack.map(s => (
                <span key={s} style={{
                  fontSize: 11, padding: "2px 9px", borderRadius: 999,
                  background: "var(--pill-bg)", color: "var(--muted)",
                  border: "1px solid var(--border)",
                }}>{s}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ExperienceItem({ exp }) {
  return (
    <div style={{
      background: "var(--card-bg)",
      border: "1px solid var(--border)",
      borderRadius: 14,
      padding: "20px 22px",
      marginBottom: 12,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: "var(--text)" }}>{exp.role}</span>
        <span style={{ fontSize: 11, color: "var(--muted)", fontFamily: "monospace", whiteSpace: "nowrap", marginLeft: 12 }}>{exp.period}</span>
      </div>
      <p style={{ margin: "0 0 10px", fontSize: 13, color: "var(--accent-text)", fontWeight: 500 }}>{exp.org}</p>
      <ul style={{ margin: "0 0 12px", paddingLeft: 16 }}>
        {exp.bullets.map(b => (
          <li key={b} style={{ fontSize: 13, color: "var(--secondary)", marginBottom: 4, lineHeight: 1.5 }}>{b}</li>
        ))}
      </ul>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
        {exp.stack.map(s => (
          <span key={s} style={{
            fontSize: 11, padding: "2px 9px", borderRadius: 999,
            background: "var(--pill-bg)", color: "var(--muted)",
            border: "1px solid var(--border)",
          }}>{s}</span>
        ))}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("Projects");
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.body.style.background = dark ? "#0e0e10" : "#fafafa";
    return () => { document.body.style.background = ""; };
  }, [dark]);

  const theme = dark ? {
    "--bg": "#0e0e10",
    "--card-bg": "#18181b",
    "--border": "#2a2a2e",
    "--text": "#f4f4f5",
    "--secondary": "#a1a1aa",
    "--muted": "#71717a",
    "--accent": "#7f77dd",
    "--accent-text": "#afa9ec",
    "--pill-bg": "#27272a",
  } : {
    "--bg": "#fafafa",
    "--card-bg": "#ffffff",
    "--border": "#e4e4e7",
    "--text": "#18181b",
    "--secondary": "#52525b",
    "--muted": "#a1a1aa",
    "--accent": "#534ab7",
    "--accent-text": "#3c3489",
    "--pill-bg": "#f4f4f5",
  };

  return (
    <div style={{ ...theme, background: "var(--bg)", minHeight: "100vh", fontFamily: "'Georgia', serif", color: "var(--text)" }}>
      {/* Nav */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 10,
        background: dark ? "rgba(14,14,16,0.85)" : "rgba(250,250,250,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
        padding: "0 clamp(20px, 5vw, 80px)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 56,
      }}>
        <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text)", fontFamily: "monospace" }}>
          saadman.dev
        </span>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => setActive(l)}
              className={l === "Research" ? "research-nav-btn" : ""}
              style={{
                background: active === l ? "var(--accent)" : "transparent",
                color: active === l ? "#fff" : "var(--muted)",
                border: "none", borderRadius: 8, padding: "6px 14px",
                fontSize: 13, fontWeight: 500, cursor: "pointer",
                transition: "all 0.15s", fontFamily: "inherit",
              }}>{l}</button>
          ))}
          <button onClick={() => setDark(d => !d)} style={{
            marginLeft: 8, background: "var(--pill-bg)", border: "1px solid var(--border)",
            borderRadius: 8, padding: "6px 10px", fontSize: 13,
            color: "var(--muted)", cursor: "pointer",
          }}>{dark ? "☀" : "☾"}</button>
        </div>
      </nav>

      <main style={{ padding: "0 clamp(20px, 5vw, 80px)", maxWidth: 900, margin: "0 auto" }}>

        {/* Hero */}
        {active !== "Research" && <section style={{ padding: "60px 0 48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{
              width: 10, height: 10, borderRadius: "50%",
              background: "#22c55e",
              boxShadow: "0 0 0 3px rgba(34,197,94,0.2)",
            }} />
            <span style={{ fontSize: 12, color: "var(--muted)" }}>Open to opportunities · Saskatoon, SK</span>
          </div>
          <h1 style={{ margin: "0 0 10px", fontSize: "clamp(32px,6vw,52px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--text)" }}>
            Saadman Iqbal
          </h1>
          <p style={{ margin: "0 0 6px", fontSize: 18, color: "var(--accent-text)", fontWeight: 500 }}>
            Software Engineer · CS + Biology · University of Saskatchewan
          </p>
          <p style={{ margin: "0 0 24px", fontSize: 15, color: "var(--secondary)", lineHeight: 1.7, maxWidth: 560 }}>
            I build systems at the intersection of code and science — from toxicology lab tooling to ML classifiers and encryption systems built from scratch. Graduating June 2026.
          </p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["Python", "C/C++", "Java", "Scala", "ML", "React", "SQL", "Concurrent Systems"].map(s => (
              <span key={s} style={{
                fontSize: 12, padding: "4px 12px", borderRadius: 999,
                background: "var(--pill-bg)", color: "var(--secondary)",
                border: "1px solid var(--border)",
              }}>{s}</span>
            ))}
          </div>
        </section>}

        {/* Projects */}
        {active === "Projects" && (
          <section style={{ paddingBottom: 60 }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", margin: "0 0 20px", fontFamily: "monospace" }}>
              Projects — click to expand
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
              {PROJECTS.map((p, i) => (
                <div key={p.title} className="animate-in" style={{ animationDelay: `${i * 0.16}s` }}>
                  <ProjectCard project={p} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {active === "Experience" && (
          <section style={{ paddingBottom: 60 }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", margin: "0 0 20px", fontFamily: "monospace" }}>
              Work experience
            </h2>
            {EXPERIENCE.map((e, i) => (
              <div key={e.role} className="animate-in" style={{ animationDelay: `${i * 0.2}s` }}>
                <ExperienceItem exp={e} />
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {active === "Education/Skills" && (
          <section style={{ paddingBottom: 60 }}>
            <h2 className="animate-in" style={{ animationDelay: "0s", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", margin: "0 0 16px", fontFamily: "monospace" }}>
              Education
            </h2>
            <div className="animate-in" style={{ animationDelay: "0.14s", background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 14, padding: "20px 22px", marginBottom: 28, display: "flex", alignItems: "center", gap: 20 }}>
              <img src="/unilogo.png" alt="University logo" style={{ width: 64, height: 64, objectFit: "contain", flexShrink: 0 }} />
              <div>
                <p style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 600, color: "var(--text)" }}>BSc. Computer Science — 4 yr</p>
                <p style={{ margin: 0, fontSize: 13, color: "var(--secondary)", lineHeight: 1.7 }}>
                  <span style={{ fontWeight: 600, color: "var(--muted)" }}>Coursework:</span> Machine Learning, Deep Learning, Computer Vision, Data Structures &amp; Algorithms, Software Development, Numerical Analysis, Functional Programming, Formal Automata, Computer Architecture, Biological Modelling
                </p>
              </div>
            </div>
            <div className="animate-in" style={{ animationDelay: "0.28s", background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 14, padding: "20px 22px", marginBottom: 28, display: "flex", alignItems: "center", gap: 20 }}>
              <img src="/unilogo.png" alt="University logo" style={{ width: 64, height: 64, objectFit: "contain", flexShrink: 0 }} />
              <div>
                <p style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 600, color: "var(--text)" }}>BSc. Biology — 3 yr</p>
                <p style={{ margin: 0, fontSize: 13, color: "var(--secondary)", lineHeight: 1.7 }}>
                  <span style={{ fontWeight: 600, color: "var(--muted)" }}>Coursework:</span> Introductory Biology, Botany, Genetics, Evolutionary Biology, Animal Physiology, Neurology, Biochemistry, Virology and Immunology
                </p>
              </div>
            </div>
            <h2 className="animate-in" style={{ animationDelay: "0.42s", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", margin: "0 0 16px", fontFamily: "monospace" }}>
              Certifications
            </h2>
            <div className="animate-in" style={{ animationDelay: "0.56s", background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 14, padding: "20px 22px", marginBottom: 28, display: "flex", alignItems: "center", gap: 20 }}>
              <img src="/Networkplus.png" alt="CompTIA Network+" style={{ width: 144, height: 144, objectFit: "contain", flexShrink: 0 }} />
              <div>
                <p style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 600, color: "var(--text)" }}>CompTIA Network+</p>
                <p style={{ margin: "0 0 2px", fontSize: 13, color: "var(--secondary)" }}>Issued Jan 2026 · Expires Jan 2029</p>
                <p style={{ margin: "0 0 12px", fontSize: 12, color: "var(--muted)", fontFamily: "monospace" }}>Credential ID: 552501f8-2796-41b3-bc3f-75be599866de</p>
                <a href="https://www.credly.com/badges/552501f8-2796-41b3-bc3f-75be599866de/public_url" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", fontSize: 12, fontWeight: 600, padding: "5px 14px", borderRadius: 8, background: "var(--accent)", color: "#fff", textDecoration: "none" }}>Show Credential</a>
              </div>
            </div>
            <div className="animate-in" style={{ animationDelay: "0.70s", background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 14, padding: "20px 22px", marginBottom: 28, display: "flex", alignItems: "center", gap: 20 }}>
              <img src="/securityplus.png" alt="CompTIA Security+" style={{ width: 144, height: 144, objectFit: "contain", flexShrink: 0 }} />
              <div>
                <p style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 600, color: "var(--text)" }}>CompTIA Security+</p>
                <p style={{ margin: "0 0 2px", fontSize: 13, color: "var(--secondary)" }}>Issued Jul 2025 · Expires Jul 2028</p>
                <p style={{ margin: "0 0 12px", fontSize: 12, color: "var(--muted)", fontFamily: "monospace" }}>Credential ID: COMP001022844433</p>
                <a href="https://www.credly.com/badges/be36cf2d-ff29-4c5a-a9db-820b609bc42b/linked_in_profile" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", fontSize: 12, fontWeight: 600, padding: "5px 14px", borderRadius: 8, background: "var(--accent)", color: "#fff", textDecoration: "none" }}>Show Credential</a>
              </div>
            </div>
            <div className="animate-in" style={{ animationDelay: "0.84s", background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 14, padding: "20px 22px", marginBottom: 28, display: "flex", alignItems: "center", gap: 20 }}>
              <img src="/ggle.png" alt="Google Cybersecurity Professional" style={{ width: 115, height: 115, objectFit: "contain", flexShrink: 0 }} />
              <div>
                <p style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 600, color: "var(--text)" }}>Google Cybersecurity Professional</p>
                <p style={{ margin: "0 0 12px", fontSize: 13, color: "var(--secondary)" }}>Issued Dec 2024</p>
                <a href="https://www.coursera.org/account/accomplishments/professional-cert/certificate/JPMIHV3VN1OJ" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", fontSize: 12, fontWeight: 600, padding: "5px 14px", borderRadius: 8, background: "var(--accent)", color: "#fff", textDecoration: "none" }}>Show Credential</a>
              </div>
            </div>
            <div className="animate-in" style={{ animationDelay: "0.98s", background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 14, padding: "20px 22px", marginBottom: 28, display: "flex", alignItems: "center", gap: 20 }}>
              <img src="/msn.png" alt="Azure Fundamentals AZ-900" style={{ width: 115, height: 115, objectFit: "contain", flexShrink: 0 }} />
              <div>
                <p style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 600, color: "var(--text)" }}>Azure Fundamentals — AZ-900</p>
                <p style={{ margin: "0 0 2px", fontSize: 13, color: "var(--secondary)" }}>Issued Jul 2025</p>
                <p style={{ margin: "0 0 12px", fontSize: 12, color: "var(--muted)", fontFamily: "monospace" }}>Credential ID: 1D89C434211EA518</p>
                <a href="https://learn.microsoft.com/en-us/users/saadmaniqbal-5401/credentials/1d89c434211ea518?ref=https%3A%2F%2Fwww.linkedin.com%2F" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", fontSize: 12, fontWeight: 600, padding: "5px 14px", borderRadius: 8, background: "var(--accent)", color: "#fff", textDecoration: "none" }}>Show Credential</a>
              </div>
            </div>
            <h2 className="animate-in" style={{ animationDelay: "1.12s", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", margin: "0 0 16px", fontFamily: "monospace" }}>
              Training Simulations
            </h2>
            <div className="animate-in" style={{ animationDelay: "1.26s", background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 14, padding: "20px 22px", marginBottom: 28, display: "flex", alignItems: "center", gap: 20 }}>
              <img src="/tata.png" alt="Tata" style={{ width: 115, height: 115, objectFit: "contain", flexShrink: 0 }} />
              <div>
                <p style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 600, color: "var(--text)" }}>Tata Cybersecurity Analyst Job Simulation</p>
                <p style={{ margin: "0 0 2px", fontSize: 13, color: "var(--secondary)" }}>Issued Aug 2025</p>
                <p style={{ margin: "0 0 12px", fontSize: 12, color: "var(--muted)", fontFamily: "monospace" }}>Credential ID: zeN2sWGDn8jmDfKLi</p>
                <a href="https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/ifobHAoMjQs9s6bKS/gmf3ypEXBj2wvfQWC_ifobHAoMjQs9s6bKS_csJqEQgowXMacn2w5_1754445859967_completion_certificate.pdf" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", fontSize: 12, fontWeight: 600, padding: "5px 14px", borderRadius: 8, background: "var(--accent)", color: "#fff", textDecoration: "none" }}>Show Credential</a>
              </div>
            </div>
            <div className="animate-in" style={{ animationDelay: "1.40s", background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 14, padding: "20px 22px", marginBottom: 28, display: "flex", alignItems: "center", gap: 20 }}>
              <img src="/mastercard.png" alt="Mastercard" style={{ width: 115, height: 115, objectFit: "contain", flexShrink: 0 }} />
              <div>
                <p style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 600, color: "var(--text)" }}>Mastercard Cybersecurity Job Simulation</p>
                <p style={{ margin: "0 0 2px", fontSize: 13, color: "var(--secondary)" }}>Issued Aug 2025</p>
                <p style={{ margin: "0 0 12px", fontSize: 12, color: "var(--muted)", fontFamily: "monospace" }}>Credential ID: fkt2u4i9wJKm3LATE</p>
                <a href="https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/mfxGwGDp6WkQmtmTf/vcKAB5yYAgvemepGQ_mfxGwGDp6WkQmtmTf_csJqEQgowXMacn2w5_1754445223936_completion_certificate.pdf" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", fontSize: 12, fontWeight: 600, padding: "5px 14px", borderRadius: 8, background: "var(--accent)", color: "#fff", textDecoration: "none" }}>Show Credential</a>
              </div>
            </div>
            <div className="animate-in" style={{ animationDelay: "1.54s", background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 14, padding: "20px 22px", marginBottom: 28, display: "flex", alignItems: "center", gap: 20 }}>
              <img src="/datacom.png" alt="Datacom" style={{ width: 115, height: 115, objectFit: "contain", flexShrink: 0 }} />
              <div>
                <p style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 600, color: "var(--text)" }}>Datacom Cybersecurity Job Simulation</p>
                <p style={{ margin: "0 0 2px", fontSize: 13, color: "var(--secondary)" }}>Issued Aug 2025</p>
                <p style={{ margin: "0 0 12px", fontSize: 12, color: "var(--muted)", fontFamily: "monospace" }}>Credential ID: mv3ea9fZak3uwdCeG</p>
                <a href="https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/gCW7Xki5Y3vNpBmnn/yTszJTvkHFBH6zAn3_gCW7Xki5Y3vNpBmnn_csJqEQgowXMacn2w5_1754437874107_completion_certificate.pdf" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", fontSize: 12, fontWeight: 600, padding: "5px 14px", borderRadius: 8, background: "var(--accent)", color: "#fff", textDecoration: "none" }}>Show Credential</a>
              </div>
            </div>
            <h2 className="animate-in" style={{ animationDelay: "1.68s", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", margin: "0 0 20px", fontFamily: "monospace" }}>
              Technical skills
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
              {SKILLS.map((sg, i) => (
                <div key={sg.category} className="animate-in" style={{ animationDelay: `${1.82 + i * 0.14}s`, background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 14, padding: "18px 20px" }}>
                  <p style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, color: "var(--text)", letterSpacing: "0.01em" }}>{sg.category}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {sg.items.map(item => (
                      <span key={item} style={{ fontSize: 12, padding: "3px 10px", borderRadius: 999, background: "var(--pill-bg)", color: "var(--secondary)", border: "1px solid var(--border)" }}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Research */}
        {active === "Research" && (
          <section style={{ paddingBottom: 80 }}>

            {/* Banner */}
            <div style={{ position: "relative", width: "100vw", left: "50%", transform: "translateX(-50%)", height: 380, overflow: "hidden" }}>
              <video autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                src="/Animation of travelling through neurons in human brain.mp4" />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.65) 100%)", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", padding: "0 clamp(24px, 6vw, 80px)" }}>
                <span className="animate-in" style={{ animationDelay: "0.05s", fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 14 }}>My Research</span>
                <h1 className="animate-in" style={{ animationDelay: "0.15s", margin: 0, fontSize: "clamp(36px, 6.5vw, 72px)", fontWeight: 700, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.03em", textShadow: "0 2px 32px rgba(0,0,0,0.6)" }}>
                  What if an LLM could<br />control neurons?
                </h1>
              </div>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: `linear-gradient(to bottom, transparent, ${dark ? "#0e0e10" : "#fafafa"})` }} />
            </div>

            {/* Timeline — top of page */}
            {(() => {
              const stages = ["Proof of Concept", "Multi Model Evaluation", "Own Model Development and Testing", "Manuscript Prep", "Peer Reviews", "Formal Publication"];
              const current = 1;
              return (
                <div className="animate-in" style={{ animationDelay: "0.1s", marginTop: 36, marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                    <div style={{ width: 3, height: 18, borderRadius: 2, background: "var(--accent)", boxShadow: "0 0 10px var(--accent)" }} />
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--text)" }}>Research Progress</p>
                  </div>
                  {/* Label row */}
                  <div style={{ display: "flex", marginBottom: 10 }}>
                    {stages.map((s, i) => (
                      <div key={s} style={{ flex: 1, textAlign: "center" }}>
                        <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                          color: i === current ? "var(--accent-text)" : i < current ? "var(--muted)" : "transparent" }}>
                          {i === current ? "In Progress" : i < current ? "Done" : "·"}
                        </span>
                      </div>
                    ))}
                  </div>
                  {/* Dots + line row */}
                  <div style={{ position: "relative", display: "flex" }}>
                    <div style={{ position: "absolute", top: 12, left: "calc(100%/12)", right: "calc(100%/12)", height: 3, background: "var(--border)", borderRadius: 2, zIndex: 0 }} />
                    <div style={{ position: "absolute", top: 12, left: "calc(100%/12)", width: "calc(100%/6)", height: 3, background: "linear-gradient(to right, var(--accent), #a78bfa)", borderRadius: 2, zIndex: 0, boxShadow: "0 0 8px var(--accent)" }} />
                    {stages.map((stage, i) => {
                      const done = i < current;
                      const isActive = i === current;
                      return (
                        <div key={stage} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", zIndex: 1 }}>
                          <div className={isActive ? "current-stage-dot" : ""} style={{
                            width: 24, height: 24, borderRadius: "50%",
                            background: done || isActive ? "var(--accent)" : "var(--card-bg)",
                            border: `2px solid ${done || isActive ? "var(--accent)" : "var(--border)"}`,
                            boxShadow: isActive ? "0 0 0 5px rgba(127,119,221,0.25)" : "none",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            transition: "all 0.3s",
                          }}>
                            {done && <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>✓</span>}
                            {isActive && <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#fff" }} />}
                          </div>
                          <p style={{ fontSize: 11, textAlign: "center", margin: "10px 3px 0", lineHeight: 1.5,
                            color: isActive ? "var(--accent-text)" : done ? "var(--text)" : "var(--muted)",
                            fontWeight: isActive ? 700 : done ? 600 : 400 }}>{stage}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            {/* Sections */}
            {[
              {
                label: "Introduction",
                delay: "0.1s",
                intro: "Currently LLMs such as ChatGPT, Gemini, Claude, etc. have shown amazing promise in controlling software based systems such as codebases, databases, Operating Systems etc. I believe that this same principle can certainly be extended into non-computer based systems, such as connectomes (biological neural networks). If it can be proven that an LLM can reliably interpret, control, and act upon connectomes, it creates the foundational layer of LLM-integrated biology, and the gateway for autonomous agents to learn and one day control biological systems without human intervention.",
                subs: [],
              },
              {
                label: "Methodology",
                delay: "0.2s",
                intro: "This study investigates whether large language models (LLMs) can serve as generalized controllers for biological neural systems, using the C. elegans connectome as a tractable experimental substrate. The organism's nervous system, comprising exactly 302 neurons with a fully mapped synaptic architecture, provides a reproducible, well-characterized simulation environment against which model performance can be benchmarked with precision.",
                subs: [
                  { heading: "Experimental Framework", body: "The core experimental paradigm involves closed-loop interaction between an LLM and a C. elegans connectome simulator (based on the BAAIWorm/NEURON stack). In each trial, the model receives a natural language prompt specifying a target neuron and a desired electrophysiological outcome, for example, driving the DA01 motor neuron beyond a defined membrane voltage threshold. The model must then reason over the neural circuit, select appropriate upstream stimulation targets, and issue structured commands that propagate through the connectome to produce the intended effect. Success is measured against an undriven control baseline, allowing causal attribution of any observed voltage change to the model's intervention." },
                  { heading: "Multi-Model Evaluation", body: "A primary objective of this work is to assess whether prompt-based neural control is a capability that emerges generically across model architectures, or whether it is sensitive to differences in reasoning style, instruction following, and structured output reliability. To this end, the evaluation spans a deliberately diverse set of models: proprietary frontier systems (Google Gemini, Anthropic Claude), as well as open-source alternatives of varying parameter scales. Each model is held to an identical prompt schema and scoring protocol, enabling direct cross-model comparison on neuron activation success rate, response consistency, and command structure validity." },
                  { heading: "Prospective Model Development", body: "Resources permitting, this research extends toward a longer-term objective: the development of a domain-specific model fine-tuned or trained explicitly for neural circuit control tasks. General-purpose LLMs are not optimized for the reasoning demands of connectome navigation. They lack built-in priors for synaptic topology, inhibitory/excitatory dynamics, or electrophysiological constraints. A purpose-built model, trained on connectome-structured data and closed-loop interaction trajectories, could substantially outperform generalist systems on this class of task." },
                ],
              },
              {
                label: "Dissemination and Publication Strategy",
                delay: "0.3s",
                intro: "Upon completion of the experimental work and analysis, findings will be submitted to arXiv as an open-access preprint, under the quantitative biology (q-bio.NC) and/or artificial intelligence (cs.AI) cross-listing, reflecting the interdisciplinary nature of the research. The preprint-first approach ensures results enter the scientific community rapidly and without paywalls, remain freely citable during peer review, and invite early scrutiny from researchers at the intersection of computational neuroscience and machine learning.",
                subs: [
                  { heading: "arXiv Endorsement", body: "As arXiv requires endorsement for first-time submitters in relevant subject categories, securing a qualified endorser is an active priority. Outreach is ongoing to researchers with established arXiv submission histories in computational neuroscience, connectomics, and AI systems, with the goal of identifying an endorser whose own work overlaps meaningfully with the subject matter of this research." },
                  { heading: "Peer Review and Expert Feedback", body: "In parallel, the work is being positioned for substantive peer review prior to or concurrent with formal journal submission. This involves cultivating relationships with researchers whose expertise spans connectome simulation, closed-loop neural control, and LLM evaluation, so that the manuscript benefits from technically rigorous critique before it reaches a wider audience. Prospective venues include journals and conference proceedings at the interface of computational biology and machine learning." },
                ],
                footer: "This dissemination strategy reflects a commitment to open science: the code, simulation configurations, and evaluation protocols will be made publicly available alongside the preprint, allowing independent replication and extension of the results.",
              },
            ].map(({ label, delay, intro, subs, footer }) => (
              <div key={label} className="animate-in" style={{ animationDelay: delay, padding: "52px 0 0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                  <div style={{ width: 3, height: 18, borderRadius: 2, background: "var(--accent)", boxShadow: "0 0 10px var(--accent)" }} />
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--text)" }}>{label}</p>
                </div>
                <p style={{ margin: subs.length ? "0 0 28px" : 0, fontSize: 15, color: "var(--secondary)", lineHeight: 1.85, maxWidth: 780 }}>{intro}</p>
                {subs.map(({ heading, body }) => (
                  <div key={heading} className="research-subsection">
                    <p style={{ margin: "0 0 8px", fontSize: 14, fontWeight: 700, color: "var(--text)" }}>{heading}</p>
                    <p style={{ margin: 0, fontSize: 14, color: "var(--secondary)", lineHeight: 1.8, maxWidth: 760 }}>{body}</p>
                  </div>
                ))}
                {footer && <p style={{ margin: "8px 0 0", fontSize: 14, color: "var(--muted)", lineHeight: 1.8, maxWidth: 780, fontStyle: "italic" }}>{footer}</p>}
              </div>
            ))}

          </section>
        )}

        {/* Contact */}
        {active === "Contact" && (
          <section style={{ paddingBottom: 60 }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", margin: "0 0 20px", fontFamily: "monospace" }}>
              Get in touch
            </h2>
            <div style={{
              background: "var(--card-bg)", border: "1px solid var(--border)",
              borderRadius: 14, padding: "32px",
            }}>
              <p style={{ margin: "0 0 24px", fontSize: 15, color: "var(--secondary)", lineHeight: 1.7 }}>
                I am open to full time roles in software engineering and cyber security, feel free to reach out to my links below.
              </p>
              {[
                { label: "Email", value: "iqbalsaadman9@gmail.com", href: "mailto:iqbalsaadman9@gmail.com" },
                { label: "GitHub", value: "github.com/siqbals", href: "https://github.com/siqbals" },
                { label: "LinkedIn", value: "linkedin.com/in/saadman-iqbal", href: "https://www.linkedin.com/in/saadman-iqbal/" },
              ].map(c => (
                <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14 }}>
                  <span style={{ fontSize: 12, color: "var(--muted)", width: 60, fontFamily: "monospace" }}>{c.label}</span>
                  <a href={c.href} style={{ fontSize: 14, color: "var(--accent-text)", textDecoration: "none" }}>{c.value}</a>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
}
