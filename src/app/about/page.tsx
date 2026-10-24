import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About SkillSpring — Learning Management Portal",
  description:
    "SkillSpring is a modern, responsive Learning Management Portal designed to help students explore verified curricula, enroll in courses, track lesson progress, and evaluate competencies through structured quizzes.",
};

export default function AboutPage() {
  const keyFeatures = [
    {
      icon: "📚",
      title: "Curated Course Catalogue",
      description:
        "Explore 24 industry-aligned courses spanning 8 high-demand tech domains including Programming, Web Development, Data Science, and Testing.",
    },
    {
      icon: "🔍",
      title: "Real-Time Search & Filtering",
      description:
        "Instantly filter curriculum tracks by keyword, domain category, or difficulty level (Beginner, Intermediate, Advanced) with responsive empty states.",
    },
    {
      icon: "🧭",
      title: "Split-Column Course Details",
      description:
        "Navigate structured module syllabi through a sticky left-side curriculum hierarchy paired with comprehensive right-side course metadata.",
    },
    {
      icon: "📝",
      title: "Capacity-Aware Enrolment",
      description:
        "One-click enrollment with dynamic seat calculation, visual capacity progress bars, and defensive safeguards against over-enrolment.",
    },
    {
      icon: "📊",
      title: "My Learning Dashboard",
      description:
        "Review your overall progress through high-level KPI summary cards, continue learning quick-links, and a structured data table.",
    },
    {
      icon: "📖",
      title: "Modular Lesson Player",
      description:
        "Engage with interactive lesson reading rooms, formatted code examples, takeaway summaries, and dynamic completion tracking.",
    },
    {
      icon: "🔒",
      title: "Gated Lesson Prerequisites",
      description:
        "Structured learning pathways enforced with locked lesson indicators and prerequisite guard banners to guide students step-by-step.",
    },
    {
      icon: "🎯",
      title: "Interactive Quiz Engine",
      description:
        "Evaluate subject mastery through multi-question assessments featuring real-time grading, score breakdowns, and color-coded feedback.",
    },
  ];

  const learningSteps = [
    {
      step: "01",
      title: "Explore Courses",
      description:
        "Browse the curated catalogue using real-time search, category filters, and difficulty tags to discover topics tailored to your career goals.",
    },
    {
      step: "02",
      title: "Inspect Curriculum",
      description:
        "Review detailed module breakdowns, instructor backgrounds, course duration, and live seat availability on the course details page.",
    },
    {
      step: "03",
      title: "Enrol Instantly",
      description:
        "Register for open cohorts with a single click. Available seats decrement automatically and your course is added to your learning profile.",
    },
    {
      step: "04",
      title: "Engage with Lessons",
      description:
        "Read structured concepts, review technical code snippets, and mark lessons complete to advance your overall completion percentage.",
    },
    {
      step: "05",
      title: "Track Your Progress",
      description:
        "Monitor your educational journey through the My Learning dashboard, tracking completed modules, bookmarks, and overall metrics.",
    },
    {
      step: "06",
      title: "Assess Competencies",
      description:
        "Test your understanding with end-of-course quizzes and receive instant scoring along with comprehensive answer explanations.",
    },
  ];

  const techStack = [
    { name: "Next.js 16", role: "App Router, SSR, hydration & accessible routing", badge: "Frontend" },
    { name: "React 19", role: "Declarative component architecture & client state", badge: "UI Library" },
    { name: "TypeScript 5", role: "Strict compile-time type safety across data models", badge: "Language" },
    { name: "Vanilla CSS", role: "Bespoke Blue-and-White theme tokens & animations", badge: "Styling" },
    { name: "Selenium WebDriver 4", role: "W3C standard automated browser testing", badge: "QA Automation" },
    { name: "pytest 9", role: "Test discovery, modular fixtures & reporting", badge: "Test Runner" },
  ];

  return (
    <main className="about-page-wrapper">
      {/* Hero Section */}
      <section className="about-hero-section">
        <div className="about-hero-container">
          <div className="about-hero-badge">
            <span className="badge-sparkle">✦</span>
            <span>Educational Learning Management Portal</span>
          </div>
          <h1 className="about-hero-title">
            Empowering Learners to <span className="title-highlight">Build Tomorrow</span>
          </h1>
          <p className="about-hero-subtitle">
            SkillSpring is a responsive, deterministic learning portal engineered to deliver
            curated technical education while providing an enterprise-grade testbed for automated
            quality assurance.
          </p>
          <div className="about-hero-actions">
            <Link href="/#course-catalogue" className="btn btn-primary btn-lg">
              Explore All Courses &rarr;
            </Link>
            <Link href="/my-learning" className="btn btn-secondary btn-lg">
              View My Learning
            </Link>
          </div>
        </div>
      </section>

      {/* Purpose Section */}
      <section className="about-section about-purpose-section">
        <div className="about-container">
          <div className="about-section-header">
            <span className="section-eyebrow">Our Purpose</span>
            <h2 className="section-title">Designed for Seamless Academic Learning</h2>
            <p className="section-subtitle">
              Bridging modern frontend engineering with structured quality assurance principles.
            </p>
          </div>

          <div className="about-purpose-grid">
            <div className="about-purpose-card">
              <div className="purpose-card-icon">🎓</div>
              <h3>Empowering Student Growth</h3>
              <p>
                SkillSpring provides a structured, accessible space for learners to explore technical
                disciplines, understand complex syllabi, and practice modular lessons at their own pace
                without distracting advertisements or external dependencies.
              </p>
            </div>

            <div className="about-purpose-card">
              <div className="purpose-card-icon">⚡</div>
              <h3>Deterministic & Reliable</h3>
              <p>
                By utilizing local client-side persistence, SkillSpring ensures that learning state,
                lesson completions, and quiz submissions function reliably and instantaneously without
                third-party database downtime or network delays.
              </p>
            </div>

            <div className="about-purpose-card">
              <div className="purpose-card-icon">🛡️</div>
              <h3>Built on Rigorous QA Standards</h3>
              <p>
                Every interactive element on SkillSpring features standardized test identifiers and
                semantic structures, enabling automated browser verification with Selenium WebDriver 4
                adhering to the Page Object Model (POM).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Grid */}
      <section className="about-section about-features-section">
        <div className="about-container">
          <div className="about-section-header">
            <span className="section-eyebrow">Core Capabilities</span>
            <h2 className="section-title">Implemented Features</h2>
            <p className="section-subtitle">
              Every feature listed below is fully implemented and verified within the application.
            </p>
          </div>

          <div className="about-features-grid">
            {keyFeatures.map((feat, idx) => (
              <div key={idx} className="about-feature-item">
                <div className="feature-item-header">
                  <span className="feature-item-icon">{feat.icon}</span>
                  <h3 className="feature-item-title">{feat.title}</h3>
                </div>
                <p className="feature-item-desc">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Experience Workflow */}
      <section className="about-section about-experience-section">
        <div className="about-container">
          <div className="about-section-header">
            <span className="section-eyebrow">User Journey</span>
            <h2 className="section-title">The SkillSpring Learning Experience</h2>
            <p className="section-subtitle">
              A clear, structured 6-step pathway from initial course discovery to verified competency.
            </p>
          </div>

          <div className="about-steps-grid">
            {learningSteps.map((item, idx) => (
              <div key={idx} className="about-step-card">
                <div className="step-number-badge">{item.step}</div>
                <h3 className="step-title">{item.title}</h3>
                <p className="step-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Information & Technical Architecture */}
      <section className="about-section about-tech-section">
        <div className="about-container">
          <div className="about-section-header">
            <span className="section-eyebrow">Technical Architecture</span>
            <h2 className="section-title">Project Information & Stack</h2>
            <p className="section-subtitle">
              Clean architectural separation between the Next.js web application and the Python Selenium QA suite.
            </p>
          </div>

          <div className="about-meta-overview">
            <div className="about-meta-pill">
              <span className="meta-pill-label">Project Name:</span>
              <strong className="meta-pill-val">SkillSpring</strong>
            </div>
            <div className="about-meta-pill">
              <span className="meta-pill-label">Project Type:</span>
              <strong className="meta-pill-val">Learning Management Portal</strong>
            </div>
            <div className="about-meta-pill">
              <span className="meta-pill-label">Architecture:</span>
              <strong className="meta-pill-val">Single-Tier Next.js App Router</strong>
            </div>
            <div className="about-meta-pill">
              <span className="meta-pill-label">State Storage:</span>
              <strong className="meta-pill-val">Client LocalStorage (Deterministic)</strong>
            </div>
          </div>

          <div className="about-tech-grid">
            {techStack.map((tech, idx) => (
              <div key={idx} className="about-tech-card">
                <div className="tech-card-header">
                  <span className="tech-badge">{tech.badge}</span>
                  <h3 className="tech-name">{tech.name}</h3>
                </div>
                <p className="tech-role">{tech.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
