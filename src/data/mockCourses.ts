export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isLocked?: boolean;
  summary: string;
  content: string;
  videoTitle?: string;
  moduleTitle?: string;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface QuizOption {
  key: string; // 'a', 'b', 'c', 'd'
  text: string;
}

export interface QuizQuestion {
  id: string;
  questionNumber: number;
  questionText: string;
  options: QuizOption[];
  correctAnswer: string; // 'a', 'b', 'c', 'd'
  explanation: string;
}

export interface CourseQuiz {
  id: string;
  title: string;
  description: string;
  passingScore: number;
  totalQuestions: number;
  questions: QuizQuestion[];
}

export interface Course {
  id: string;
  title: string;
  category:
    | "Programming"
    | "Web Development"
    | "Data Science"
    | "Artificial Intelligence"
    | "Database Management"
    | "Software Testing"
    | "Computer Fundamentals"
    | "Career Development"
    | "Cloud & DevOps"
    | "Cybersecurity";
  level: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  longDescription: string;
  instructor: string;
  instructorRole: string;
  duration: string;
  availableSeats: number;
  totalSeats: number;
  prerequisites: string[];
  syllabusTopics: string[];
  thumbnail: string;
  objectives?: string[];
  modules?: CourseModule[];
  lessons: Lesson[];
  quiz: CourseQuiz;
}

export const MOCK_COURSES: Course[] = [
  // 1. Python for Automation & Data (Existing - preserved for TC01, TC05, TC08)
  {
    id: "python-automation",
    title: "Python for Automation & Data",
    category: "Programming",
    level: "Beginner",
    description: "Master core Python programming, file handling, and browser automation foundations with Selenium.",
    longDescription:
      "This comprehensive foundational course introduces software engineering students to enterprise test automation using Python 3 and Selenium WebDriver 4. You will master standard object-oriented programming in Python, DOM traversal, locator strategies (ID, CSS, XPath), dynamic wait synchronization, and Page Object Model (POM) architecture.",
    instructor: "Dr. Angela Vance",
    instructorRole: "Principal QA Architect & Automation Lead",
    duration: "6 Weeks (24 Hours)",
    availableSeats: 15,
    totalSeats: 20,
    prerequisites: ["Basic computer literacy", "Familiarity with standard browser navigation"],
    syllabusTopics: [
      "Python 3 Core Syntax & Data Structures",
      "Selenium WebDriver 4 Architecture & W3C Standards",
      "Dynamic DOM Traversal & Locator Strategies",
      "Explicit Synchronization with WebDriverWait",
      "Page Object Model (POM) Design Pattern",
      "Pytest Suite Execution & Automated Reporting"
    ],
    thumbnail: "/images/courses/python-automation.png",
    objectives: [
      "Write clean, idiomatic Python scripts using OOP concepts",
      "Automate browser actions across Chrome and Edge browsers",
      "Implement robust element locator strategies avoiding flaky tests",
      "Build modular Page Object Model suites with Pytest"
    ],
    modules: [
      {
        id: "mod-1",
        title: "Module 1: Python Core Foundations",
        lessons: [
          {
            id: "lesson-1-intro",
            title: "Introduction to Python Automation & Selenium Architecture",
            duration: "35 mins",
            isLocked: false,
            moduleTitle: "Module 1: Python Core Foundations",
            summary: "Understand the fundamentals of Selenium WebDriver 4, browser drivers, and Python environment setup.",
            content: `### Welcome to Python Test Automation

In this module, you will learn how **Selenium WebDriver 4** communicates directly with native browser engines using the W3C standard protocol.

#### Core Concepts Covered:
1. **WebDriver Architecture**: How Python client bindings dispatch commands to browser drivers (ChromeDriver, msedgedriver).
2. **Deterministic Locators**: Why reliable test automation demands stable ID and data-testid attributes instead of brittle absolute XPaths.
3. **Synchronization**: Why hardcoded sleeps (\`time.sleep\`) cause test flakiness and how explicit waits (\`WebDriverWait\`) poll conditionally until elements become interactable.

\`\`\`python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
driver.get("http://localhost:3000/")

# Wait explicitly for catalogue search input
search_input = WebDriverWait(driver, 10).until(
    EC.visibility_of_element_located((By.ID, "search-input"))
)
search_input.send_keys("Python")
\`\`\`

Review the simulation frame below, then click **Mark as Complete** to record your progress and unlock downstream modules.`,
            videoTitle: "Interactive Lab: Setting Up Selenium 4 on Windows"
          }
        ]
      },
      {
        id: "mod-2",
        title: "Module 2: Advanced Test Automation & POM",
        lessons: [
          {
            id: "lesson-3-advanced",
            title: "Advanced Test Frameworks & Distributed POM Execution",
            duration: "55 mins",
            isLocked: true,
            moduleTitle: "Module 2: Advanced Test Automation & POM",
            summary: "Enterprise Page Object Model patterns, multi-browser grid dispatching, and CI/CD reporting pipelines.",
            content: `### Advanced Test Framework Design

This module covers enterprise-grade Page Object Model architecture, pytest custom hooks, and HTML report generation.

> **Prerequisite Barrier Active**: You must complete all prior foundational modules before accessing this advanced content.

#### Advanced Architecture Principles:
- Separation of locators, assertions, and test data
- Atomic fixtures for clean session lifecycle isolation
- Custom pytest hooks for test failure screenshot capture`,
            videoTitle: "Advanced Architecture: Deep Dive into Pytest Fixtures"
          }
        ]
      }
    ],
    lessons: [
      {
        id: "lesson-1-intro",
        title: "Introduction to Python Automation & Selenium Architecture",
        duration: "35 mins",
        isLocked: false,
        moduleTitle: "Module 1: Python Core Foundations",
        summary: "Understand the fundamentals of Selenium WebDriver 4, browser drivers, and Python environment setup.",
        content: `### Welcome to Python Test Automation

In this module, you will learn how **Selenium WebDriver 4** communicates directly with native browser engines using the W3C standard protocol.

#### Core Concepts Covered:
1. **WebDriver Architecture**: How Python client bindings dispatch commands to browser drivers (ChromeDriver, msedgedriver).
2. **Deterministic Locators**: Why reliable test automation demands stable ID and data-testid attributes instead of brittle absolute XPaths.
3. **Synchronization**: Why hardcoded sleeps (\`time.sleep\`) cause test flakiness and how explicit waits (\`WebDriverWait\`) poll conditionally until elements become interactable.

\`\`\`python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
driver.get("http://localhost:3000/")

# Wait explicitly for catalogue search input
search_input = WebDriverWait(driver, 10).until(
    EC.visibility_of_element_located((By.ID, "search-input"))
)
search_input.send_keys("Python")
\`\`\`

Review the simulation frame below, then click **Mark as Complete** to record your progress and unlock downstream modules.`,
        videoTitle: "Interactive Lab: Setting Up Selenium 4 on Windows"
      },
      {
        id: "lesson-3-advanced",
        title: "Advanced Test Frameworks & Distributed POM Execution",
        duration: "55 mins",
        isLocked: true,
        moduleTitle: "Module 2: Advanced Test Automation & POM",
        summary: "Enterprise Page Object Model patterns, multi-browser grid dispatching, and CI/CD reporting pipelines.",
        content: `### Advanced Test Framework Design

This module covers enterprise-grade Page Object Model architecture, pytest custom hooks, and HTML report generation.

> **Prerequisite Barrier Active**: You must complete all prior foundational modules before accessing this advanced content.`,
        videoTitle: "Advanced Architecture: Deep Dive into Pytest Fixtures"
      }
    ],
    quiz: {
      id: "quiz-python-automation",
      title: "Python Automation Assessment",
      description: "Test your understanding of Selenium WebDriver 4 locators, explicit synchronization, and Python testing paradigms.",
      passingScore: 2,
      totalQuestions: 2,
      questions: [
        {
          id: "q1",
          questionNumber: 1,
          questionText: "Which Selenium WebDriver method is used to locate an element by its HTML id attribute?",
          options: [
            { key: "a", text: "find_by_name()" },
            { key: "b", text: "find_element(By.ID, ...)" },
            { key: "c", text: "select_element_id()" },
            { key: "d", text: "get_element()" }
          ],
          correctAnswer: "b",
          explanation: "In Selenium WebDriver 4, elements are located using driver.find_element(By.ID, 'element-id')."
        },
        {
          id: "q2",
          questionNumber: 2,
          questionText: "Why are explicit waits (WebDriverWait) preferred over fixed sleeps (time.sleep)?",
          options: [
            { key: "a", text: "They poll conditionally and proceed immediately when elements are ready" },
            { key: "b", text: "They require zero imports in Python code" },
            { key: "c", text: "They freeze CPU processing to prevent thermal throttling" },
            { key: "d", text: "They bypass SSL certificate security checks" }
          ],
          correctAnswer: "a",
          explanation: "Explicit waits continuously poll the DOM conditionally and proceed as soon as the target state occurs, avoiding wasted execution time and test flakiness."
        }
      ]
    }
  },

  // 2. Web Development Basics (Existing - preserved for TC02, TC07)
  {
    id: "web-dev-basics",
    title: "Full-Stack Web Foundations",
    category: "Web Development",
    level: "Beginner",
    description: "Learn modern HTML5 semantics, CSS3 layouts (Flexbox & Grid), JavaScript ES6+, and React components.",
    longDescription:
      "A complete foundation for modern frontend web engineering. Students learn clean semantic HTML5 markup, responsive responsive design using Vanilla CSS Flexbox and Grid, asynchronous JavaScript (Promises & Fetch API), and React 19 functional components.",
    instructor: "Marcus Aurelius Vance",
    instructorRole: "Staff Frontend Engineer",
    duration: "8 Weeks (32 Hours)",
    availableSeats: 8,
    totalSeats: 25,
    prerequisites: ["None - ideal for beginning computer science and BCA students"],
    syllabusTopics: [
      "Semantic HTML5 & Document Accessibility",
      "CSS3 Flexbox, CSS Grid & Responsive Typography",
      "Modern JavaScript ES6+ Syntactical Constructs",
      "React 19 Component Tree, Props & State Hooks",
      "Client-Side State Storage & Hydration Synchronization"
    ],
    thumbnail: "/images/courses/web-dev-basics.png",
    objectives: [
      "Build mobile-responsive layouts using modern Vanilla CSS",
      "Write asynchronous JavaScript with Promises and Async/Await",
      "Develop modular React applications with state management",
      "Implement responsive accessibility compliant with WCAG standards"
    ],
    modules: [
      {
        id: "mod-1",
        title: "Module 1: Semantic HTML & Responsive CSS",
        lessons: [
          {
            id: "lesson-1-react-foundations",
            title: "HTML5 Semantics, Modern CSS Grid & Flexbox",
            duration: "40 mins",
            isLocked: false,
            moduleTitle: "Module 1: Semantic HTML & Responsive CSS",
            summary: "Master structured HTML semantics and responsive CSS grid architectures.",
            content: `### Frontend Web Architecture

Modern web applications depend on clean semantic structuring and performant stylesheets.

#### Fundamental Topics:
1. **Semantic Elements**: \`<header>\`, \`<nav>\`, \`<main>\`, \`<section>\`, \`<article>\`, and \`<footer>\`.
2. **CSS Layouts**: Two-dimensional CSS Grid combined with one-dimensional Flexbox.
3. **Accessibility**: Screen-reader friendly aria attributes and tab order.

\`\`\`html
<header class="navbar">
  <div class="logo">SkillSpring</div>
  <nav aria-label="Main Navigation">
    <a href="/courses">Catalogue</a>
  </nav>
</header>
\`\`\``,
            videoTitle: "Hands-on Workshop: Building Accessible Web Layouts"
          }
        ]
      },
      {
        id: "mod-2",
        title: "Module 2: React 19 & Component State",
        lessons: [
          {
            id: "lesson-2-nextjs-routing",
            title: "React 19 Hooks, Props, and Dynamic Client Routing",
            duration: "50 mins",
            isLocked: false,
            moduleTitle: "Module 2: React 19 & Component State",
            summary: "Explore React 19 functional components, useState, useEffect, and routing paradigms.",
            content: `### React 19 State Management

Learn how components manage dynamic local state and respond seamlessly to user events.

\`\`\`jsx
import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Clicked {count} times
    </button>
  );
}
\`\`\``,
            videoTitle: "Interactive Lab: Building Stateful React UI"
          }
        ]
      }
    ],
    lessons: [
      {
        id: "lesson-1-react-foundations",
        title: "HTML5 Semantics, Modern CSS Grid & Flexbox",
        duration: "40 mins",
        isLocked: false,
        moduleTitle: "Module 1: Semantic HTML & Responsive CSS",
        summary: "Master structured HTML semantics and responsive CSS grid architectures.",
        content: `### Frontend Web Architecture

Modern web applications depend on clean semantic structuring and performant stylesheets.

#### Fundamental Topics:
1. **Semantic Elements**: \`<header>\`, \`<nav>\`, \`<main>\`, \`<section>\`, \`<article>\`, and \`<footer>\`.
2. **CSS Layouts**: Two-dimensional CSS Grid combined with one-dimensional Flexbox.
3. **Accessibility**: Screen-reader friendly aria attributes and tab order.`,
        videoTitle: "Hands-on Workshop: Building Accessible Web Layouts"
      },
      {
        id: "lesson-2-nextjs-routing",
        title: "React 19 Hooks, Props, and Dynamic Client Routing",
        duration: "50 mins",
        isLocked: false,
        moduleTitle: "Module 2: React 19 & Component State",
        summary: "Explore React 19 functional components, useState, useEffect, and routing paradigms.",
        content: `### React 19 State Management

Learn how components manage dynamic local state and respond seamlessly to user events.`,
        videoTitle: "Interactive Lab: Building Stateful React UI"
      }
    ],
    quiz: {
      id: "quiz-web-dev-basics",
      title: "Web Foundations Assessment",
      description: "Verify your mastery of semantic HTML elements, CSS layout models, and React state mechanics.",
      passingScore: 2,
      totalQuestions: 2,
      questions: [
        {
          id: "q1",
          questionNumber: 1,
          questionText: "Which HTML5 semantic element is best suited for wrapping the primary navigation menu?",
          options: [
            { key: "a", text: "<menu-bar>" },
            { key: "b", text: "<nav>" },
            { key: "c", text: "<header-links>" },
            { key: "d", text: "<navigate>" }
          ],
          correctAnswer: "b",
          explanation: "The <nav> element is the official W3C semantic tag representing major navigational links."
        },
        {
          id: "q2",
          questionNumber: 2,
          questionText: "Which React Hook is primarily used for managing local reactive state in a functional component?",
          options: [
            { key: "a", text: "useState" },
            { key: "b", text: "useLifecycle" },
            { key: "c", text: "useStorage" },
            { key: "d", text: "useRender" }
          ],
          correctAnswer: "a",
          explanation: "useState is the core React hook that preserves local state between renders."
        }
      ]
    }
  },

  // 3. React Deep Dive (Existing - preserved for TC04)
  {
    id: "react-deep-dive",
    title: "React Deep Dive & Architecture",
    category: "Web Development",
    level: "Intermediate",
    description: "Explore advanced React patterns, custom hooks, performance profiling, and design systems.",
    longDescription:
      "Take your React expertise to an enterprise level. Dive deep into custom hook creation, memoization patterns with useMemo and useCallback, context state propagation, and architectural patterns for high-performance single page applications.",
    instructor: "Elena Rostova",
    instructorRole: "Senior UI Architect",
    duration: "5 Weeks (20 Hours)",
    availableSeats: 12,
    totalSeats: 18,
    prerequisites: ["Solid JavaScript fundamentals", "Prior experience with basic React"],
    syllabusTopics: [
      "Custom Hook Abstractions & Reusability",
      "React Render Lifecycle & Virtual DOM Diffing",
      "useMemo, useCallback & Performance Tuning",
      "Component Composition & Compound Components"
    ],
    thumbnail: "/images/courses/react-deep-dive.png",
    objectives: [
      "Design reusable custom hooks for enterprise logic",
      "Diagnose and eliminate unnecessary re-renders",
      "Implement scalable compound component patterns"
    ],
    modules: [
      {
        id: "mod-1",
        title: "Module 1: Custom Hooks & Lifecycle",
        lessons: [
          {
            id: "lesson-1-hooks",
            title: "Advanced Custom Hook Architecture",
            duration: "45 mins",
            isLocked: false,
            moduleTitle: "Module 1: Custom Hooks & Lifecycle",
            summary: "Learn how to extract stateful business logic into reusable custom hooks.",
            content: `### Custom React Hooks

Extract cross-cutting concerns into testable, clean custom hooks.

\`\`\`typescript
import { useState, useEffect } from 'react';

export function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return width;
}
\`\`\``,
            videoTitle: "Custom Hooks in Action"
          }
        ]
      },
      {
        id: "mod-2",
        title: "Module 2: Performance Profiling",
        lessons: [
          {
            id: "lesson-2-patterns",
            title: "React Profiler & Memoization Paradigms",
            duration: "50 mins",
            isLocked: false,
            moduleTitle: "Module 2: Performance Profiling",
            summary: "Profile rendering bottlenecks using browser profiling tools.",
            content: `### Performance Profiling

Identify hot render paths and use React.memo and useMemo strategically.`,
            videoTitle: "Performance Profiling Deep Dive"
          }
        ]
      }
    ],
    lessons: [
      {
        id: "lesson-1-hooks",
        title: "Advanced Custom Hook Architecture",
        duration: "45 mins",
        isLocked: false,
        moduleTitle: "Module 1: Custom Hooks & Lifecycle",
        summary: "Learn how to extract stateful business logic into reusable custom hooks.",
        content: `### Custom React Hooks

Extract cross-cutting concerns into testable, clean custom hooks.`
      },
      {
        id: "lesson-2-patterns",
        title: "React Profiler & Memoization Paradigms",
        duration: "50 mins",
        isLocked: false,
        moduleTitle: "Module 2: Performance Profiling",
        summary: "Profile rendering bottlenecks using browser profiling tools.",
        content: `### Performance Profiling

Identify hot render paths and use React.memo and useMemo strategically.`
      }
    ],
    quiz: {
      id: "quiz-react-deep-dive",
      title: "React Architecture Quiz",
      description: "Test advanced concepts regarding render phases and hook rules.",
      passingScore: 2,
      totalQuestions: 2,
      questions: [
        {
          id: "q1",
          questionNumber: 1,
          questionText: "What rule must all React hooks adhere to regarding invocation order?",
          options: [
            { key: "a", text: "They must only be called at the top level of React functions" },
            { key: "b", text: "They must always be called inside while loops" },
            { key: "c", text: "They must be declared inside try-catch blocks" },
            { key: "d", text: "They must be asynchronous" }
          ],
          correctAnswer: "a",
          explanation: "React hooks must be invoked at the top level unconditionally to guarantee consistent execution order."
        },
        {
          id: "q2",
          questionNumber: 2,
          questionText: "What does useCallback memoize?",
          options: [
            { key: "a", text: "A cached function reference between renders" },
            { key: "b", text: "A computed DOM snapshot" },
            { key: "c", text: "A Redux action payload" },
            { key: "d", text: "An HTTP cookie" }
          ],
          correctAnswer: "a",
          explanation: "useCallback caches a function definition between renders until its dependencies change."
        }
      ]
    }
  },

  // 4. Cloud Architecture Masterclass (Existing - preserved for TC03 Course Full check)
  {
    id: "cloud-architecture-masterclass",
    title: "Cloud Architecture Masterclass",
    category: "Cloud & DevOps",
    level: "Advanced",
    description: "Enterprise Kubernetes orchestration, AWS microservices, and Infrastructure as Code.",
    longDescription:
      "An intensive high-level program covering container orchestration with Kubernetes, multi-region cloud resilience, CI/CD automated deployment pipelines, and zero-trust cloud network security.",
    instructor: "Devon Chen",
    instructorRole: "Distinguished Cloud Architect",
    duration: "10 Weeks (40 Hours)",
    availableSeats: 0, // TC03 test asserts 0 seats remaining (Full)
    totalSeats: 15,
    prerequisites: ["Linux system administration", "Networking fundamentals", "Docker basics"],
    syllabusTopics: [
      "Containerization Architecture with Docker",
      "Kubernetes Pod Scheduling, Ingress & Deployments",
      "Infrastructure as Code using Terraform",
      "Zero-Downtime Rolling Releases & Blue/Green Deployments"
    ],
    thumbnail: "/images/courses/cloud-architecture.png",
    objectives: [
      "Design resilient cloud infrastructure using Kubernetes",
      "Configure automated CI/CD continuous deployment pipelines",
      "Deploy scalable multi-zone cloud architectures"
    ],
    modules: [
      {
        id: "mod-1",
        title: "Module 1: Kubernetes Core",
        lessons: [
          {
            id: "lesson-1-cloud-core",
            title: "Microservices & Container Runtimes",
            duration: "60 mins",
            isLocked: false,
            moduleTitle: "Module 1: Kubernetes Core",
            summary: "Containerization fundamentals with Docker and OCI images.",
            content: `### Microservice Cloud Fundamentals

Container isolation and container orchestration fundamentals.`
          }
        ]
      }
    ],
    lessons: [
      {
        id: "lesson-1-cloud-core",
        title: "Microservices & Container Runtimes",
        duration: "60 mins",
        isLocked: false,
        moduleTitle: "Module 1: Kubernetes Core",
        summary: "Containerization fundamentals with Docker and OCI images.",
        content: `### Microservice Cloud Fundamentals

Container isolation and container orchestration fundamentals.`
      }
    ],
    quiz: {
      id: "quiz-cloud-architecture",
      title: "Cloud Infrastructure Evaluation",
      description: "Test your understanding of Kubernetes controllers and immutable infrastructure.",
      passingScore: 2,
      totalQuestions: 2,
      questions: [
        {
          id: "q1",
          questionNumber: 1,
          questionText: "What is the smallest deployable computing unit in a Kubernetes cluster?",
          options: [
            { key: "a", text: "Pod" },
            { key: "b", text: "Namespace" },
            { key: "c", text: "Ingress" },
            { key: "d", text: "ConfigMap" }
          ],
          correctAnswer: "a",
          explanation: "In Kubernetes, a Pod is the atomic unit representing one or more shared containers."
        },
        {
          id: "q2",
          questionNumber: 2,
          questionText: "Which paradigm treats servers as ephemeral and replaceable without manual patching?",
          options: [
            { key: "a", text: "Immutable Infrastructure" },
            { key: "b", text: "Monolithic Maintenance" },
            { key: "c", text: "Manual Configuration" },
            { key: "d", text: "Legacy Shell Scripting" }
          ],
          correctAnswer: "a",
          explanation: "Immutable infrastructure relies on replacing existing servers with new images rather than in-place updates."
        }
      ]
    }
  },

  // 5. Data Science Fundamentals (Existing)
  {
    id: "data-science-fundamentals",
    title: "Data Science & Pandas Fundamentals",
    category: "Data Science",
    level: "Intermediate",
    description: "Data exploration, statistical feature modeling, and predictive analytics using Python and Pandas.",
    longDescription:
      "Designed for students pursuing data analysis. Master exploratory data analysis (EDA), handling missing values, statistical summarization, feature scaling, and visualization with Python data science libraries.",
    instructor: "Priya Sundaram",
    instructorRole: "Lead Data Scientist",
    duration: "7 Weeks (28 Hours)",
    availableSeats: 10,
    totalSeats: 22,
    prerequisites: ["Python fundamentals", "Basic linear algebra and statistics"],
    syllabusTopics: [
      "NumPy Vectorized Operations & Matrix Math",
      "Pandas Series, DataFrames & Aggregation",
      "Data Cleansing & Imputation Strategies",
      "Exploratory Data Analysis & Feature Selection"
    ],
    thumbnail: "/images/courses/data-science.png",
    objectives: [
      "Wrangle real-world structured datasets using Pandas",
      "Detect and resolve data anomalies and missing records",
      "Generate actionable statistical insight summaries"
    ],
    modules: [
      {
        id: "mod-1",
        title: "Module 1: Pandas Data Exploration",
        lessons: [
          {
            id: "lesson-1-eda",
            title: "Data Wrangling with Pandas DataFrames",
            duration: "45 mins",
            isLocked: false,
            moduleTitle: "Module 1: Pandas Data Exploration",
            summary: "Learn essential data structures and dataframe operations.",
            content: `### Exploratory Data Analysis with Python

Master data ingestion and slicing with Pandas.`
          }
        ]
      }
    ],
    lessons: [
      {
        id: "lesson-1-eda",
        title: "Data Wrangling with Pandas DataFrames",
        duration: "45 mins",
        isLocked: false,
        moduleTitle: "Module 1: Pandas Data Exploration",
        summary: "Learn essential data structures and dataframe operations.",
        content: `### Exploratory Data Analysis with Python

Master data ingestion and slicing with Pandas.`
      }
    ],
    quiz: {
      id: "quiz-data-science",
      title: "Data Science Core Assessment",
      description: "Verify your understanding of Pandas aggregation and NumPy arrays.",
      passingScore: 2,
      totalQuestions: 2,
      questions: [
        {
          id: "q1",
          questionNumber: 1,
          questionText: "Which Pandas method is commonly used to obtain a concise summary of dataframe columns, data types, and non-null counts?",
          options: [
            { key: "a", text: "df.info()" },
            { key: "b", text: "df.inspect()" },
            { key: "c", text: "df.scan()" },
            { key: "d", text: "df.check()" }
          ],
          correctAnswer: "a",
          explanation: "df.info() provides a full structural summary of dataframe non-null counts and memory usage."
        },
        {
          id: "q2",
          questionNumber: 2,
          questionText: "What is the primary benefit of NumPy vectorized operations over standard Python loops?",
          options: [
            { key: "a", text: "Pre-compiled C execution without interpreted loop overhead" },
            { key: "b", text: "Vectorization automatically installs extra RAM" },
            { key: "c", text: "They eliminate the need for variables" },
            { key: "d", text: "They prevent network disconnections" }
          ],
          correctAnswer: "a",
          explanation: "NumPy vectorization leverages optimized low-level C routines, outperforming interpreted Python loops by orders of magnitude."
        }
      ]
    }
  },

  // 6. Cybersecurity Essentials (Existing)
  {
    id: "cybersecurity-essentials",
    title: "Cybersecurity & Defense Systems",
    category: "Cybersecurity",
    level: "Intermediate",
    description: "Network security protocols, vulnerability scanning, OWASP Top 10 defenses, and authentication.",
    longDescription:
      "A complete guide to application defense and secure software design. Students investigate real-world vulnerability patterns including SQL injection, cross-site scripting (XSS), cross-site request forgery, and cryptographic best practices.",
    instructor: "Major Nathan Cross",
    instructorRole: "Cyber Defense Consultant",
    duration: "6 Weeks (24 Hours)",
    availableSeats: 7,
    totalSeats: 20,
    prerequisites: ["Computer network foundations", "Basic web programming knowledge"],
    syllabusTopics: [
      "OWASP Top 10 Web Application Vulnerabilities",
      "Network Packet Analysis with Wireshark",
      "Cryptographic Keys, TLS 1.3 & Certificate Chains",
      "Authentication, OAuth 2.0 & Role-Based Access Control"
    ],
    thumbnail: "/images/courses/cybersecurity.png",
    objectives: [
      "Identify common attack vectors and web application vulnerabilities",
      "Mitigate injection attacks with defensive coding patterns",
      "Implement robust token-based authorization and session controls"
    ],
    modules: [
      {
        id: "mod-1",
        title: "Module 1: Threat Analysis & OWASP",
        lessons: [
          {
            id: "lesson-1-threats",
            title: "OWASP Top 10 & Threat Modeling",
            duration: "40 mins",
            isLocked: false,
            moduleTitle: "Module 1: Threat Analysis & OWASP",
            summary: "Explore the most critical security risks facing modern web applications.",
            content: `### Threat Modeling & OWASP Top 10

Understand how injection vulnerabilities and insecure configurations jeopardize systems.`
          }
        ]
      }
    ],
    lessons: [
      {
        id: "lesson-1-threats",
        title: "OWASP Top 10 & Threat Modeling",
        duration: "40 mins",
        isLocked: false,
        moduleTitle: "Module 1: Threat Analysis & OWASP",
        summary: "Explore the most critical security risks facing modern web applications.",
        content: `### Threat Modeling & OWASP Top 10

Understand how injection vulnerabilities and insecure configurations jeopardize systems.`
      }
    ],
    quiz: {
      id: "quiz-cybersecurity",
      title: "Cybersecurity Assessment",
      description: "Evaluate your knowledge of secure coding and threat prevention.",
      passingScore: 2,
      totalQuestions: 2,
      questions: [
        {
          id: "q1",
          questionNumber: 1,
          questionText: "Which vulnerability occurs when untrusted user input is directly concatenated into SQL queries?",
          options: [
            { key: "a", text: "Cross-Site Scripting (XSS)" },
            { key: "b", text: "SQL Injection (SQLi)" },
            { key: "c", text: "Buffer Overflow" },
            { key: "d", text: "Denial of Service" }
          ],
          correctAnswer: "b",
          explanation: "SQL Injection occurs when malicious user input modifies SQL command structure; parameterized queries mitigate this risk."
        },
        {
          id: "q2",
          questionNumber: 2,
          questionText: "What security principle mandates granting users only the minimum access rights necessary?",
          options: [
            { key: "a", text: "Principle of Least Privilege (PoLP)" },
            { key: "b", text: "Security through Obscurity" },
            { key: "c", text: "Maximum Permissiveness" },
            { key: "d", text: "Open Access Default" }
          ],
          correctAnswer: "a",
          explanation: "The Principle of Least Privilege dictates that accounts, processes, and systems should only possess the specific privileges needed for legitimate duties."
        }
      ]
    }
  },

  // 7. Java Programming
  {
    id: "java-programming",
    title: "Java Programming Masterclass",
    category: "Programming",
    level: "Beginner",
    description: "Learn core Java, object-oriented concepts, exception handling, collections framework, and JVM fundamentals.",
    longDescription:
      "A complete, structured curriculum in modern Java (Java 17/21 LTS). BCA students master strongly typed programming, classes, inheritance, polymorphism, abstract interfaces, Java Collections Framework (ArrayList, HashMap), and multithreading basics.",
    instructor: "Prof. Rajesh Sharma",
    instructorRole: "Head of Software Engineering",
    duration: "8 Weeks (32 Hours)",
    availableSeats: 18,
    totalSeats: 30,
    prerequisites: ["Basic logic and computer literacy"],
    syllabusTopics: [
      "Java Syntax, Primitive Data Types & Control Flow",
      "OOP: Encapsulation, Inheritance & Polymorphism",
      "Abstract Classes & Interfaces",
      "Java Collections Framework (List, Set, Map)",
      "Exception Handling & File I/O Operations"
    ],
    thumbnail: "/images/courses/java-programming.png",
    objectives: [
      "Write modular object-oriented Java applications",
      "Master the Java Collections Framework for efficient data handling",
      "Handle runtime exceptions reliably with structured try-catch"
    ],
    modules: [
      {
        id: "mod-1",
        title: "Module 1: Java Foundations & OOP",
        lessons: [
          {
            id: "lesson-1-java-oop",
            title: "Java OOP: Classes, Objects & Inheritance",
            duration: "45 mins",
            isLocked: false,
            moduleTitle: "Module 1: Java Foundations & OOP",
            summary: "Learn how Java implements encapsulation, inheritance, and polymorphism.",
            content: `### Object-Oriented Programming in Java

Java is a class-based, object-oriented language where everything revolves around classes.

\`\`\`java
public class Student {
    private String name;
    private int id;

    public Student(String name, int id) {
        this.name = name;
        this.id = id;
    }

    public void display() {
        System.out.println("Student: " + name + " (ID: " + id + ")");
    }
}
\`\`\``
          }
        ]
      }
    ],
    lessons: [
      {
        id: "lesson-1-java-oop",
        title: "Java OOP: Classes, Objects & Inheritance",
        duration: "45 mins",
        isLocked: false,
        moduleTitle: "Module 1: Java Foundations & OOP",
        summary: "Learn how Java implements encapsulation, inheritance, and polymorphism.",
        content: `### Object-Oriented Programming in Java

Java is a class-based, object-oriented language where everything revolves around classes.`
      }
    ],
    quiz: {
      id: "quiz-java-programming",
      title: "Java Fundamentals Assessment",
      description: "Test your knowledge of Java OOP pillars, interfaces, and memory management.",
      passingScore: 2,
      totalQuestions: 2,
      questions: [
        {
          id: "q1",
          questionNumber: 1,
          questionText: "Which keyword in Java prevents a class from being inherited or a variable from being modified?",
          options: [
            { key: "a", text: "static" },
            { key: "b", text: "final" },
            { key: "c", text: "constant" },
            { key: "d", text: "abstract" }
          ],
          correctAnswer: "b",
          explanation: "In Java, 'final' indicates that a class cannot be subclassed, a method cannot be overridden, or a variable cannot be reassigned."
        },
        {
          id: "q2",
          questionNumber: 2,
          questionText: "Which collection interface allows key-value pair associations?",
          options: [
            { key: "a", text: "List" },
            { key: "b", text: "Set" },
            { key: "c", text: "Map" },
            { key: "d", text: "Queue" }
          ],
          correctAnswer: "c",
          explanation: "The Map interface (such as HashMap or TreeMap) associates unique keys with values."
        }
      ]
    }
  },

  // 8. C Programming Foundations
  {
    id: "c-programming",
    title: "C Programming Foundations",
    category: "Programming",
    level: "Beginner",
    description: "Master foundational procedural programming, memory pointers, manual allocation, structures, and arrays.",
    longDescription:
      "The definitive course for understanding how software interacts with system hardware. You will study procedural logic, pointers, memory addresses, dynamic allocation with malloc/free, struct definitions, and file handling in ANSI C.",
    instructor: "Dr. K. S. Raman",
    instructorRole: "Professor of Computer Architecture",
    duration: "7 Weeks (28 Hours)",
    availableSeats: 20,
    totalSeats: 30,
    prerequisites: ["No prior programming needed"],
    syllabusTopics: [
      "Data Types, Operators & Control Structures in C",
      "Functions, Recursion & Variable Scope",
      "Pointers, Dereferencing & Pointer Arithmetic",
      "Dynamic Memory: malloc, calloc, realloc & free",
      "Structures, Unions & File Handling"
    ],
    thumbnail: "/images/courses/c-programming.png",
    objectives: [
      "Understand computer memory addresses and pointer mechanisms",
      "Allocate and deallocate dynamic memory without memory leaks",
      "Implement structured data models with custom C structs"
    ],
    modules: [
      {
        id: "mod-1",
        title: "Module 1: C Pointers & Memory",
        lessons: [
          {
            id: "lesson-1-c-pointers",
            title: "Memory Addresses, Pointers & Pointer Arithmetic",
            duration: "40 mins",
            isLocked: false,
            moduleTitle: "Module 1: C Pointers & Memory",
            summary: "Demystify pointer variables, address-of operator, and memory layout.",
            content: `### Understanding Pointers in C

Pointers hold memory addresses rather than direct values.

\`\`\`c
#include <stdio.h>

int main() {
    int value = 42;
    int *ptr = &value; // ptr stores address of value

    printf("Value: %d\n", *ptr); // dereference pointer
    return 0;
}
\`\`\``
          }
        ]
      }
    ],
    lessons: [
      {
        id: "lesson-1-c-pointers",
        title: "Memory Addresses, Pointers & Pointer Arithmetic",
        duration: "40 mins",
        isLocked: false,
        moduleTitle: "Module 1: C Pointers & Memory",
        summary: "Demystify pointer variables, address-of operator, and memory layout.",
        content: `### Understanding Pointers in C

Pointers hold memory addresses rather than direct values.`
      }
    ],
    quiz: {
      id: "quiz-c-programming",
      title: "C Programming Quiz",
      description: "Test pointer operations and memory allocation rules in C.",
      passingScore: 2,
      totalQuestions: 2,
      questions: [
        {
          id: "q1",
          questionNumber: 1,
          questionText: "Which operator is used to extract the memory address of an existing variable in C?",
          options: [
            { key: "a", text: "*" },
            { key: "b", text: "&" },
            { key: "c", text: "->" },
            { key: "d", text: "%" }
          ],
          correctAnswer: "b",
          explanation: "The ampersand (&) is the address-of operator in C."
        },
        {
          id: "q2",
          questionNumber: 2,
          questionText: "What function must be called to release dynamically allocated heap memory in C?",
          options: [
            { key: "a", text: "delete()" },
            { key: "b", text: "free()" },
            { key: "c", text: "clear()" },
            { key: "d", text: "release()" }
          ],
          correctAnswer: "b",
          explanation: "free(ptr) releases heap memory allocated with malloc or calloc to prevent memory leaks."
        }
      ]
    }
  },

  // 9. C++ Programming
  {
    id: "cpp-programming",
    title: "C++ Object-Oriented Systems",
    category: "Programming",
    level: "Intermediate",
    description: "Explore modern C++20, STL algorithms, templates, memory management, and RAII design.",
    longDescription:
      "Bridge procedural logic and modern high-performance system programming. Cover C++ object orientation, operator overloading, standard template library (vector, map, algorithms), RAII, smart pointers, and exception safety.",
    instructor: "Vikram Sengupta",
    instructorRole: "Systems Engineering Lead",
    duration: "8 Weeks (32 Hours)",
    availableSeats: 14,
    totalSeats: 25,
    prerequisites: ["C Programming Foundations or equivalent logic"],
    syllabusTopics: [
      "Classes, Constructors, Destructors & RAII",
      "Operator Overloading & Move Semantics",
      "Standard Template Library (STL) Containers & Iterators",
      "Smart Pointers (unique_ptr, shared_ptr) & Modern C++"
    ],
    thumbnail: "/images/courses/cpp-programming.png",
    objectives: [
      "Build high-performance systems with C++ classes and templates",
      "Utilize the Standard Template Library for algorithmic speed",
      "Manage resources automatically using RAII and smart pointers"
    ],
    modules: [
      {
        id: "mod-1",
        title: "Module 1: Modern C++ & STL",
        lessons: [
          {
            id: "lesson-1-cpp-stl",
            title: "STL Containers, Vectors & Algorithms",
            duration: "50 mins",
            isLocked: false,
            moduleTitle: "Module 1: Modern C++ & STL",
            summary: "Harness std::vector, iterators, and generic STL algorithms.",
            content: `### Modern C++ with STL Containers

Modern C++ provides type-safe, generic collections that run at near metal speeds.

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers = {5, 2, 8, 1, 9};
    std::sort(numbers.begin(), numbers.end());
    for (int n : numbers) {
        std::cout << n << " ";
    }
    return 0;
}
\`\`\``
          }
        ]
      }
    ],
    lessons: [
      {
        id: "lesson-1-cpp-stl",
        title: "STL Containers, Vectors & Algorithms",
        duration: "50 mins",
        isLocked: false,
        moduleTitle: "Module 1: Modern C++ & STL",
        summary: "Harness std::vector, iterators, and generic STL algorithms.",
        content: `### Modern C++ with STL Containers

Modern C++ provides type-safe, generic collections that run at near metal speeds.`
      }
    ],
    quiz: {
      id: "quiz-cpp-programming",
      title: "C++ Systems Assessment",
      description: "Verify your understanding of STL containers, smart pointers, and RAII.",
      passingScore: 2,
      totalQuestions: 2,
      questions: [
        {
          id: "q1",
          questionNumber: 1,
          questionText: "What does the RAII idiom stand for in C++?",
          options: [
            { key: "a", text: "Resource Acquisition Is Initialization" },
            { key: "b", text: "Runtime Allocation Is Immediate" },
            { key: "c", text: "Recursive Array Iteration Index" },
            { key: "d", text: "Random Access Internal Interface" }
          ],
          correctAnswer: "a",
          explanation: "RAII ties resource lifecycle (memory, file handles) directly to object lifetime on the stack."
        },
        {
          id: "q2",
          questionNumber: 2,
          questionText: "Which smart pointer establishes exclusive ownership of a dynamically allocated object?",
          options: [
            { key: "a", text: "std::shared_ptr" },
            { key: "b", text: "std::unique_ptr" },
            { key: "c", text: "std::weak_ptr" },
            { key: "d", text: "std::raw_ptr" }
          ],
          correctAnswer: "b",
          explanation: "std::unique_ptr owns and manages an object solely through move semantics without reference counting overhead."
        }
      ]
    }
  },

  // 10. JavaScript Essentials
  {
    id: "javascript-essentials",
    title: "JavaScript (ES6+) Essentials",
    category: "Web Development",
    level: "Beginner",
    description: "Deep dive into modern ECMAScript: closures, promises, event loop, fetch API, and DOM manipulation.",
    longDescription:
      "Master the lingua franca of the modern web. Learn how the single-threaded event loop processes microtasks, explore functional array utilities (map, filter, reduce), master closures, and work with modern asynchronous APIs.",
    instructor: "Sarah Jenkins",
    instructorRole: "Senior Frontend Engineer",
    duration: "6 Weeks (24 Hours)",
    availableSeats: 16,
    totalSeats: 25,
    prerequisites: ["Basic HTML & CSS knowledge"],
    syllabusTopics: [
      "ES6+ Syntax: Destructuring, Spread, Arrow Functions",
      "Lexical Scope, Closures & Execution Context",
      "Asynchronous JS: Promises, Async/Await & Event Loop",
      "DOM Traversal, Event Bubbling & Dynamic Rendering"
    ],
    thumbnail: "/images/courses/javascript-essentials.png",
    objectives: [
      "Write clean asynchronous JavaScript using Promises and async/await",
      "Understand closures, scope chain, and execution contexts",
      "Manipulate the DOM dynamically with event delegation"
    ],
    modules: [
      {
        id: "mod-1",
        title: "Module 1: Async JS & Event Loop",
        lessons: [
          {
            id: "lesson-1-js-async",
            title: "Promises, Async/Await & The JavaScript Event Loop",
            duration: "40 mins",
            isLocked: false,
            moduleTitle: "Module 1: Async JS & Event Loop",
            summary: "Learn how the JavaScript engine handles asynchronous tasks through the call stack and task queue.",
            content: `### Asynchronous JavaScript Mechanics

JavaScript executes on a single main thread, delegating asynchronous tasks to the browser's web APIs.

\`\`\`javascript
async function loadCourseData() {
  try {
    const res = await fetch("/api/courses");
    const data = await res.json();
    console.log("Loaded courses:", data.length);
  } catch (err) {
    console.error("Failed to load:", err);
  }
}
\`\`\``
          }
        ]
      }
    ],
    lessons: [
      {
        id: "lesson-1-js-async",
        title: "Promises, Async/Await & The JavaScript Event Loop",
        duration: "40 mins",
        isLocked: false,
        moduleTitle: "Module 1: Async JS & Event Loop",
        summary: "Learn how the JavaScript engine handles asynchronous tasks through the call stack and task queue.",
        content: `### Asynchronous JavaScript Mechanics

JavaScript executes on a single main thread, delegating asynchronous tasks to the browser's web APIs.`
      }
    ],
    quiz: {
      id: "quiz-javascript-essentials",
      title: "JavaScript ES6+ Assessment",
      description: "Test your understanding of JavaScript closures, promises, and the event loop.",
      passingScore: 2,
      totalQuestions: 2,
      questions: [
        {
          id: "q1",
          questionNumber: 1,
          questionText: "What mechanism allows a function to retain access to variables from its outer lexical scope even after that scope has closed?",
          options: [
            { key: "a", text: "Closure" },
            { key: "b", text: "Hoisting" },
            { key: "c", text: "Recursion" },
            { key: "d", text: "Destructuring" }
          ],
          correctAnswer: "a",
          explanation: "A closure is the combination of a function bundled together with references to its surrounding lexical state."
        },
        {
          id: "q2",
          questionNumber: 2,
          questionText: "In the JavaScript event loop, which queue has priority for execution immediately after the current synchronous script completes?",
          options: [
            { key: "a", text: "Microtask Queue (Promises)" },
            { key: "b", text: "Macrotask Queue (setTimeout)" },
            { key: "c", text: "Render Animation Queue" },
            { key: "d", text: "Network I/O Queue" }
          ],
          correctAnswer: "a",
          explanation: "The microtask queue (Promise callbacks, queueMicrotask) is drained completely before processing the next macrotask."
        }
      ]
    }
  },

  // 11. Full Stack Web Development
  {
    id: "fullstack-web-dev",
    title: "Full Stack Web Development with Next.js",
    category: "Web Development",
    level: "Advanced",
    description: "Build production-ready web apps: Next.js App Router, Server Components, API routes, and database integration.",
    longDescription:
      "Synthesize frontend React and backend systems into cohesive, full-stack applications. Build high-performance websites using Next.js 16 App Router, React Server Components (RSC), server actions, client hydration, and RESTful APIs.",
    instructor: "Alexandre Dupuis",
    instructorRole: "Principal Full Stack Architect",
    duration: "10 Weeks (40 Hours)",
    availableSeats: 11,
    totalSeats: 20,
    prerequisites: ["React Development", "Basic JavaScript / Node.js fundamentals"],
    syllabusTopics: [
      "Next.js App Router & Server vs Client Component Architecture",
      "Server Actions, Route Handlers & Data Mutations",
      "Partial Prerendering, Static Generation & Revalidation",
      "Full Stack State Synchronization & Performance Optimization"
    ],
    thumbnail: "/images/courses/fullstack-web-dev.png",
    objectives: [
      "Architect full-stack web applications with Next.js App Router",
      "Leverage React Server Components for minimal client-bundle sizes",
      "Deploy scalable production builds with optimized static caching"
    ],
    modules: [
      {
        id: "mod-1",
        title: "Module 1: Server Components & Actions",
        lessons: [
          {
            id: "lesson-1-rsc",
            title: "React Server Components & Next.js Architecture",
            duration: "55 mins",
            isLocked: false,
            moduleTitle: "Module 1: Server Components & Actions",
            summary: "Learn how React Server Components run on the server to keep bundles small and fast.",
            content: `### React Server Components (RSC) Architecture

Next.js Server Components execute purely on the server, streaming lightweight HTML and JSON descriptors to the client without sending component JavaScript.`
          }
        ]
      }
    ],
    lessons: [
      {
        id: "lesson-1-rsc",
        title: "React Server Components & Next.js Architecture",
        duration: "55 mins",
        isLocked: false,
        moduleTitle: "Module 1: Server Components & Actions",
        summary: "Learn how React Server Components run on the server to keep bundles small and fast.",
        content: `### React Server Components (RSC) Architecture

Next.js Server Components execute purely on the server, streaming lightweight HTML and JSON descriptors to the client without sending component JavaScript.`
      }
    ],
    quiz: {
      id: "quiz-fullstack-web-dev",
      title: "Full Stack Architecture Assessment",
      description: "Verify your understanding of Server Components, streaming, and hydration.",
      passingScore: 2,
      totalQuestions: 2,
      questions: [
        {
          id: "q1",
          questionNumber: 1,
          questionText: "What directive must be added at the top of a Next.js file to enable client-side interactivity like useState?",
          options: [
            { key: "a", text: "'use client'" },
            { key: "b", text: "'use browser'" },
            { key: "c", text: "'use dynamic'" },
            { key: "d", text: "'use reactive'" }
          ],
          correctAnswer: "a",
          explanation: "The 'use client' directive marks a component boundary where client interactivity and hooks are hydrated."
        },
        {
          id: "q2",
          questionNumber: 2,
          questionText: "What is the primary performance advantage of React Server Components?",
          options: [
            { key: "a", text: "Zero impact on the client JavaScript bundle size for server dependencies" },
            { key: "b", text: "Automatic database creation" },
            { key: "c", text: "Bypasses all CSS styling" },
            { key: "d", text: "Runs in mobile operating systems without a browser" }
          ],
          correctAnswer: "a",
          explanation: "Server components execute exclusively on the server, meaning heavy backend libraries do not get shipped to the client browser bundle."
        }
      ]
    }
  },

  // 12. Node.js & Express Backend Development
  {
    id: "nodejs-express",
    title: "Node.js & Express Backend Development",
    category: "Web Development",
    level: "Intermediate",
    description: "Build robust REST APIs, asynchronous event-driven services, middleware pipelines, and secure JWT auth.",
    longDescription:
      "Understand backend web engineering with Node.js and Express. Learn the asynchronous V8 architecture, streams and buffers, Express middleware routing, request validation, authentication, and HTTP status code standards.",
    instructor: "Daniel Romero",
    instructorRole: "Backend Engineering Lead",
    duration: "7 Weeks (28 Hours)",
    availableSeats: 15,
    totalSeats: 25,
    prerequisites: ["Solid JavaScript fundamentals"],
    syllabusTopics: [
      "Node.js Event Loop, Streams & Buffer Processing",
      "Express REST API Architecture & Middleware Chains",
      "Input Validation, Error Handling & Sanitization",
      "Authentication via JWT & Password Hashing with Bcrypt"
    ],
    thumbnail: "/images/courses/nodejs-express.png",
    objectives: [
      "Build modular, production-grade Express REST APIs",
      "Implement middleware pipelines for authentication and logging",
      "Handle asynchronous file and network streams efficiently"
    ],
    modules: [
      {
        id: "mod-1",
        title: "Module 1: Express REST Architecture",
        lessons: [
          {
            id: "lesson-1-express-routing",
            title: "RESTful Endpoints & Middleware Chaining",
            duration: "45 mins",
            isLocked: false,
            moduleTitle: "Module 1: Express REST Architecture",
            summary: "Learn how Express routes and middleware form pipeline architectures.",
            content: `### Express Middleware Architecture

Express processes requests through sequential middleware functions before returning JSON responses.

\`\`\`javascript
const express = require("express");
const app = express();

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

app.listen(5000);
\`\`\``
          }
        ]
      }
    ],
    lessons: [
      {
        id: "lesson-1-express-routing",
        title: "RESTful Endpoints & Middleware Chaining",
        duration: "45 mins",
        isLocked: false,
        moduleTitle: "Module 1: Express REST Architecture",
        summary: "Learn how Express routes and middleware form pipeline architectures.",
        content: `### Express Middleware Architecture

Express processes requests through sequential middleware functions before returning JSON responses.`
      }
    ],
    quiz: {
      id: "quiz-nodejs-express",
      title: "Node.js & Express Assessment",
      description: "Test backend routing, middleware signatures, and status codes.",
      passingScore: 2,
      totalQuestions: 2,
      questions: [
        {
          id: "q1",
          questionNumber: 1,
          questionText: "What parameter must be called in an Express middleware function to pass execution to the next handler?",
          options: [
            { key: "a", text: "next()" },
            { key: "b", text: "continue()" },
            { key: "c", text: "proceed()" },
            { key: "d", text: "forward()" }
          ],
          correctAnswer: "a",
          explanation: "Calling next() tells Express to advance to the subsequent middleware or route handler in the chain."
        },
        {
          id: "q2",
          questionNumber: 2,
          questionText: "Which HTTP status code properly signifies that a requested resource was created successfully?",
          options: [
            { key: "a", text: "200 OK" },
            { key: "b", text: "201 Created" },
            { key: "c", text: "204 No Content" },
            { key: "d", text: "202 Accepted" }
          ],
          correctAnswer: "b",
          explanation: "HTTP 201 Created is the standard response when a POST request successfully creates a new resource."
        }
      ]
    }
  },

  // 13. SQL Fundamentals & Relational Databases
  {
    id: "sql-fundamentals",
    title: "SQL Fundamentals & Relational Databases",
    category: "Database Management",
    level: "Beginner",
    description: "Master relational schema design, SQL querying, JOIN operations, aggregations, subqueries, and ACID transactions.",
    longDescription:
      "A comprehensive curriculum in relational database management systems (PostgreSQL / MySQL). Learn DDL, DML, complex multi-table JOINs (INNER, LEFT, RIGHT, FULL), grouping, indexing, and transactional integrity (ACID).",
    instructor: "Dr. Meenakshi Sundaram",
    instructorRole: "Database Systems Researcher",
    duration: "6 Weeks (24 Hours)",
    availableSeats: 17,
    totalSeats: 30,
    prerequisites: ["Basic logic and computer skills"],
    syllabusTopics: [
      "Relational Database Model & Relational Algebra",
      "DDL (CREATE, ALTER, DROP) & DML (SELECT, INSERT, UPDATE, DELETE)",
      "Multi-Table JOINs & Nested Subqueries",
      "Aggregate Functions (SUM, AVG, COUNT, GROUP BY, HAVING)",
      "ACID Transactions & Indexing Performance"
    ],
    thumbnail: "/images/courses/sql-fundamentals.png",
    objectives: [
      "Write multi-table relational SQL queries using JOINs and Subqueries",
      "Design normalized schemas adhering to 1NF, 2NF, and 3NF",
      "Understand ACID properties and database transaction isolation"
    ],
    modules: [
      {
        id: "mod-1",
        title: "Module 1: Relational Queries & JOINs",
        lessons: [
          {
            id: "lesson-1-sql-joins",
            title: "Multi-Table Relational Queries with INNER and OUTER JOINs",
            duration: "45 mins",
            isLocked: false,
            moduleTitle: "Module 1: Relational Queries & JOINs",
            summary: "Understand how relational database engines join tabular datasets on foreign keys.",
            content: `### Relational JOIN Operations

JOINs allow retrieving correlated records spanning multiple relational tables.

\`\`\`sql
SELECT 
    students.id,
    students.name,
    courses.title AS enrolled_course
FROM students
INNER JOIN enrolments ON students.id = enrolments.student_id
INNER JOIN courses ON enrolments.course_id = courses.id
WHERE students.active = true;
\`\`\``
          }
        ]
      }
    ],
    lessons: [
      {
        id: "lesson-1-sql-joins",
        title: "Multi-Table Relational Queries with INNER and OUTER JOINs",
        duration: "45 mins",
        isLocked: false,
        moduleTitle: "Module 1: Relational Queries & JOINs",
        summary: "Understand how relational database engines join tabular datasets on foreign keys.",
        content: `### Relational JOIN Operations

JOINs allow retrieving correlated records spanning multiple relational tables.`
      }
    ],
    quiz: {
      id: "quiz-sql-fundamentals",
      title: "SQL & Relational Databases Assessment",
      description: "Test relational JOINs, constraints, and ACID properties.",
      passingScore: 2,
      totalQuestions: 2,
      questions: [
        {
          id: "q1",
          questionNumber: 1,
          questionText: "Which SQL clause is used to filter records after aggregation has been performed with GROUP BY?",
          options: [
            { key: "a", text: "WHERE" },
            { key: "b", text: "HAVING" },
            { key: "c", text: "FILTER" },
            { key: "d", text: "ORDER BY" }
          ],
          correctAnswer: "b",
          explanation: "HAVING filters aggregated grouped results, whereas WHERE filters individual rows prior to grouping."
        },
        {
          id: "q2",
          questionNumber: 2,
          questionText: "What does the 'A' in ACID database transactions represent?",
          options: [
            { key: "a", text: "Atomicity — either all operations succeed or all roll back" },
            { key: "b", text: "Asynchronous processing" },
            { key: "c", text: "Automatic indexing" },
            { key: "d", text: "Array storage" }
          ],
          correctAnswer: "a",
          explanation: "Atomicity guarantees that a transaction executes completely or is rolled back with zero partial modifications."
        }
      ]
    }
  },

  // 14. MongoDB Fundamentals
  {
    id: "mongodb-fundamentals",
    title: "MongoDB & NoSQL Architecture",
    category: "Database Management",
    level: "Beginner",
    description: "Explore document-oriented NoSQL databases, BSON formats, CRUD operations, indexing, and aggregation pipelines.",
    longDescription:
      "Step into flexible, non-relational database design with MongoDB. Learn JSON/BSON document structures, schema validation, complex document updates, compound indexing, and the powerful MongoDB Aggregation Pipeline ($match, $group, $project).",
    instructor: "Nikhil Joshi",
    instructorRole: "Data Architect",
    duration: "6 Weeks (24 Hours)",
    availableSeats: 19,
    totalSeats: 25,
    prerequisites: ["Basic understanding of JSON and data structures"],
    syllabusTopics: [
      "NoSQL Paradigms vs Relational Models",
      "BSON Documents, Collections & Database Organization",
      "CRUD Operations with MongoDB Compass and Shell",
      "MongoDB Aggregation Framework ($match, $group, $sort)",
      "Replica Sets, Sharding & High Availability"
    ],
    thumbnail: "/images/courses/mongodb-fundamentals.png",
    objectives: [
      "Model real-world application data into flexible BSON documents",
      "Perform fast queries and mutations using the MongoDB driver",
      "Build multi-stage data transformations using the Aggregation Pipeline"
    ],
    modules: [
      {
        id: "mod-1",
        title: "Module 1: Document Modeling & Aggregations",
        lessons: [
          {
            id: "lesson-1-mongo-aggregation",
            title: "The MongoDB Aggregation Framework",
            duration: "45 mins",
            isLocked: false,
            moduleTitle: "Module 1: Document Modeling & Aggregations",
            summary: "Learn how multi-stage aggregation pipelines process and transform documents in memory.",
            content: `### Multi-Stage Aggregations in MongoDB

The aggregation pipeline passes documents through stages to transform, filter, and calculate values.

\`\`\`javascript
db.courses.aggregate([
  { $match: { category: "Programming" } },
  { $group: { _id: "$level", total: { $sum: 1 } } },
  { $sort: { total: -1 } }
]);
\`\`\``
          }
        ]
      }
    ],
    lessons: [
      {
        id: "lesson-1-mongo-aggregation",
        title: "The MongoDB Aggregation Framework",
        duration: "45 mins",
        isLocked: false,
        moduleTitle: "Module 1: Document Modeling & Aggregations",
        summary: "Learn how multi-stage aggregation pipelines process and transform documents in memory.",
        content: `### Multi-Stage Aggregations in MongoDB

The aggregation pipeline passes documents through stages to transform, filter, and calculate values.`
      }
    ],
    quiz: {
      id: "quiz-mongodb-fundamentals",
      title: "MongoDB Assessment",
      description: "Test your knowledge of document stores, BSON types, and aggregation stages.",
      passingScore: 2,
      totalQuestions: 2,
      questions: [
        {
          id: "q1",
          questionNumber: 1,
          questionText: "What binary serialization format does MongoDB use to store document data on disk?",
          options: [
            { key: "a", text: "JSON" },
            { key: "b", text: "BSON" },
            { key: "c", text: "XML" },
            { key: "d", text: "YAML" }
          ],
          correctAnswer: "b",
          explanation: "MongoDB stores documents in BSON (Binary JSON), which includes additional types such as Date and ObjectId."
        },
        {
          id: "q2",
          questionNumber: 2,
          questionText: "Which aggregation stage filters documents in a manner similar to find()?",
          options: [
            { key: "a", text: "$match" },
            { key: "b", text: "$filter" },
            { key: "c", text: "$select" },
            { key: "d", text: "$where" }
          ],
          correctAnswer: "a",
          explanation: "The $match stage filters the document stream to allow only matching documents to pass to subsequent pipeline stages."
        }
      ]
    }
  },

  // 15. Database Design & Normalization
  {
    id: "database-design",
    title: "Database Design & Normalization Principles",
    category: "Database Management",
    level: "Intermediate",
    description: "Learn conceptual ER modeling, logical schema transformation, normal forms (1NF, 2NF, 3NF, BCNF), and denormalization.",
    longDescription:
      "A theoretical and practical guide to designing robust databases without redundancy or update anomalies. Learn entity-relationship modeling (ER diagrams), cardinality, functional dependencies, 1NF through BCNF normalization, and indexing strategies.",
    instructor: "Prof. S. Narayanan",
    instructorRole: "Chair of Information Systems",
    duration: "5 Weeks (20 Hours)",
    availableSeats: 22,
    totalSeats: 30,
    prerequisites: ["SQL Fundamentals or basic database concepts"],
    syllabusTopics: [
      "Entity-Relationship (ER) & Enhanced ER Diagrams",
      "Functional Dependencies & Keys (Candidate, Primary, Superkey)",
      "Normalization Stages: 1NF, 2NF, 3NF and Boyce-Codd (BCNF)",
      "Strategic Denormalization for High-Read Performance"
    ],
    thumbnail: "/images/courses/database-design.png",
    objectives: [
      "Design robust ER diagrams representing complex business domains",
      "Eliminate redundancy by systematically applying normalization rules",
      "Choose appropriately between normalized relational and document designs"
    ],
    modules: [
      {
        id: "mod-1",
        title: "Module 1: Normalization & Functional Dependencies",
        lessons: [
          {
            id: "lesson-1-normalization",
            title: "Functional Dependencies & 3NF Decomposition",
            duration: "40 mins",
            isLocked: false,
            moduleTitle: "Module 1: Normalization & Functional Dependencies",
            summary: "Learn how identifying functional dependencies eliminates insertion and deletion anomalies.",
            content: `### Database Normalization Principles

Normalization organizes database columns and tables to eliminate data redundancy and prevent anomalies.`
          }
        ]
      }
    ],
    lessons: [
      {
        id: "lesson-1-normalization",
        title: "Functional Dependencies & 3NF Decomposition",
        duration: "40 mins",
        isLocked: false,
        moduleTitle: "Module 1: Normalization & Functional Dependencies",
        summary: "Learn how identifying functional dependencies eliminates insertion and deletion anomalies.",
        content: `### Database Normalization Principles

Normalization organizes database columns and tables to eliminate data redundancy and prevent anomalies.`
      }
    ],
    quiz: {
      id: "quiz-database-design",
      title: "Database Design Assessment",
      description: "Test your understanding of ER relationships and normalization rules.",
      passingScore: 2,
      totalQuestions: 2,
      questions: [
        {
          id: "q1",
          questionNumber: 1,
          questionText: "What condition must a relation satisfy to be in Third Normal Form (3NF)?",
          options: [
            { key: "a", text: "It must be in 2NF and have no transitive functional dependencies on the primary key" },
            { key: "b", text: "It must have exactly three columns" },
            { key: "c", text: "It must use three foreign keys" },
            { key: "d", text: "It must be stored across three separate hard drives" }
          ],
          correctAnswer: "a",
          explanation: "3NF requires the relation to be in 2NF and eliminate transitive dependencies where non-prime attributes depend on other non-prime attributes."
        },
        {
          id: "q2",
          questionNumber: 2,
          questionText: "What is an update anomaly?",
          options: [
            { key: "a", text: "An inconsistency that arises when redundant data is updated in some places but not others" },
            { key: "b", text: "A computer rebooting during a software update" },
            { key: "c", text: "A syntax error in a SELECT statement" },
            { key: "d", text: "A network timeout during download" }
          ],
          correctAnswer: "a",
          explanation: "Update anomalies occur when duplicated data becomes desynchronized due to partial updates."
        }
      ]
    }
  },

  // 16. Data Visualization
  {
    id: "data-visualization",
    title: "Data Visualization with Matplotlib & Seaborn",
    category: "Data Science",
    level: "Beginner",
    description: "Create communicative visual storytelling: statistical plots, heatmaps, interactive charts, and dashboard layouts.",
    longDescription:
      "Transform complex numerical data into clear visual insights. Learn the grammar of graphics, Matplotlib figure/axis hierarchies, Seaborn statistical plots (box plots, violin plots, pair plots), color palettes, and interactive exports.",
    instructor: "Dr. Maya Lin",
    instructorRole: "Data Visualization Specialist",
    duration: "5 Weeks (20 Hours)",
    availableSeats: 16,
    totalSeats: 25,
    prerequisites: ["Basic Python programming"],
    syllabusTopics: [
      "Visual Perception & Effective Chart Selection",
      "Matplotlib Figures, Subplots, Ticks & Annotations",
      "Seaborn Statistical Plots (Distribution, Categorical, Regression)",
      "Interactive Visualizations with Plotly & Color Theory"
    ],
    thumbnail: "/images/courses/data-visualization.png",
    objectives: [
      "Generate publication-quality statistical charts using Python",
      "Select appropriate visual representations for continuous and categorical distributions",
      "Design clear, accessible data presentations"
    ],
    modules: [
      {
        id: "mod-1",
        title: "Module 1: Statistical Graphics",
        lessons: [
          {
            id: "lesson-1-visual-charts",
            title: "Seaborn Distributions & Correlation Heatmaps",
            duration: "40 mins",
            isLocked: false,
            moduleTitle: "Module 1: Statistical Graphics",
            summary: "Learn how to calculate and visualize correlation matrices with color heatmaps.",
            content: `### Correlation Heatmaps with Seaborn

Visualizing correlations between variables helps identify multi-collinearity in datasets.

\`\`\`python
import seaborn as sns
import matplotlib.pyplot as plt

corr = df.corr()
sns.heatmap(corr, annot=True, cmap="coolwarm")
plt.title("Feature Correlation Heatmap")
plt.show()
\`\`\``
          }
        ]
      }
    ],
    lessons: [
      {
        id: "lesson-1-visual-charts",
        title: "Seaborn Distributions & Correlation Heatmaps",
        duration: "40 mins",
        isLocked: false,
        moduleTitle: "Module 1: Statistical Graphics",
        summary: "Learn how to calculate and visualize correlation matrices with color heatmaps.",
        content: `### Correlation Heatmaps with Seaborn

Visualizing correlations between variables helps identify multi-collinearity in datasets.`
      }
    ],
    quiz: {
      id: "quiz-data-visualization",
      title: "Data Visualization Assessment",
      description: "Test chart selection and color theory principles.",
      passingScore: 2,
      totalQuestions: 2,
      questions: [
        {
          id: "q1",
          questionNumber: 1,
          questionText: "Which chart is ideal for visualizing the five-number summary (minimum, Q1, median, Q3, maximum) of a dataset?",
          options: [
            { key: "a", text: "Pie Chart" },
            { key: "b", text: "Box Plot (Whisker Plot)" },
            { key: "c", text: "Radar Chart" },
            { key: "d", text: "Donut Chart" }
          ],
          correctAnswer: "b",
          explanation: "Box plots display quartile distribution, median, and outlier observations compactly."
        },
        {
          id: "q2",
          questionNumber: 2,
          questionText: "In Matplotlib, what object represents the actual canvas area where lines, bars, and markers are drawn?",
          options: [
            { key: "a", text: "Axes" },
            { key: "b", text: "Painter" },
            { key: "c", text: "Canvas2D" },
            { key: "d", text: "Renderer" }
          ],
          correctAnswer: "a",
          explanation: "In Matplotlib's object-oriented API, the 'Axes' is the bounding box where data visualization elements are plotted."
        }
      ]
    }
  },

  // 17. Machine Learning Fundamentals
  {
    id: "machine-learning-fundamentals",
    title: "Machine Learning Foundations",
    category: "Data Science",
    level: "Advanced",
    description: "Supervised and unsupervised algorithms: Linear regression, decision trees, random forests, and model evaluation.",
    longDescription:
      "A rigorous, hands-on introduction to machine learning algorithms using Scikit-Learn. Learn data preprocessing, train/test splitting, cross-validation, hyperparameter tuning, regression, classification, clustering, and confusion matrix metrics.",
    instructor: "Dr. Ethan Wright",
    instructorRole: "Principal AI Research Scientist",
    duration: "8 Weeks (32 Hours)",
    availableSeats: 12,
    totalSeats: 20,
    prerequisites: ["Python Data Science & Linear Algebra foundations"],
    syllabusTopics: [
      "Supervised vs Unsupervised Machine Learning Paradigms",
      "Regression Models (Linear, Ridge, Lasso) & Gradient Descent",
      "Classification: Logistic Regression, Decision Trees & Random Forests",
      "Model Evaluation Metrics: Precision, Recall, F1-Score & ROC-AUC",
      "Unsupervised Learning: K-Means Clustering & Dimensionality Reduction (PCA)"
    ],
    thumbnail: "/images/courses/machine-learning.png",
    objectives: [
      "Train, evaluate, and fine-tune supervised predictive models",
      "Avoid overfitting using cross-validation and regularization",
      "Evaluate classification performance beyond naive accuracy using F1-score"
    ],
    modules: [
      {
        id: "mod-1",
        title: "Module 1: Classification & Evaluation",
        lessons: [
          {
            id: "lesson-1-ml-eval",
            title: "Supervised Classification & Model Evaluation Metrics",
            duration: "50 mins",
            isLocked: false,
            moduleTitle: "Module 1: Classification & Evaluation",
            summary: "Learn how precision, recall, and confusion matrices reveal true model performance.",
            content: `### Supervised Learning with Scikit-Learn

Learn the standard model training and evaluation lifecycle.

\`\`\`python
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
clf = RandomForestClassifier(n_estimators=100)
clf.fit(X_train, y_train)

preds = clf.predict(X_test)
print(classification_report(y_test, preds))
\`\`\``
          }
        ]
      }
    ],
    lessons: [
      {
        id: "lesson-1-ml-eval",
        title: "Supervised Classification & Model Evaluation Metrics",
        duration: "50 mins",
        isLocked: false,
        moduleTitle: "Module 1: Classification & Evaluation",
        summary: "Learn how precision, recall, and confusion matrices reveal true model performance.",
        content: `### Supervised Learning with Scikit-Learn

Learn the standard model training and evaluation lifecycle.`
      }
    ],
    quiz: {
      id: "quiz-machine-learning",
      title: "Machine Learning Assessment",
      description: "Test your understanding of model metrics, overfitting, and validation.",
      passingScore: 2,
      totalQuestions: 2,
      questions: [
        {
          id: "q1",
          questionNumber: 1,
          questionText: "When evaluating a medical diagnosis model where missing a positive case has severe consequences, which metric should be prioritized?",
          options: [
            { key: "a", text: "Recall (Sensitivity)" },
            { key: "b", text: "Accuracy" },
            { key: "c", text: "Training speed" },
            { key: "d", text: "Model file size" }
          ],
          correctAnswer: "a",
          explanation: "High recall minimizes false negatives, ensuring critical positive cases are not missed."
        },
        {
          id: "q2",
          questionNumber: 2,
          questionText: "What symptom indicates that a machine learning model is severely overfitting?",
          options: [
            { key: "a", text: "Very high accuracy on training data but poor performance on unseen test data" },
            { key: "b", text: "Identical performance on both training and test data" },
            { key: "c", text: "Fast inference time" },
            { key: "d", text: "Low memory usage" }
          ],
          correctAnswer: "a",
          explanation: "Overfitting occurs when a model memorizes training noise rather than generalizable patterns, failing on test sets."
        }
      ]
    }
  },

  // 18. Manual Software Testing
  {
    id: "software-testing-fundamentals",
    title: "Manual Software Testing & QA Principles",
    category: "Software Testing",
    level: "Beginner",
    description: "Understand SDLC, STLC, test case design techniques, black-box testing, defect lifecycles, and test management.",
    longDescription:
      "A complete foundation in quality assurance engineering. Learn Software Development Life Cycle (SDLC) models, STLC phases, test case writing, boundary value analysis, equivalence partitioning, bug tracking with Jira, and severity vs priority.",
    instructor: "Ananya Deshmukh",
    instructorRole: "Quality Engineering Lead",
    duration: "5 Weeks (20 Hours)",
    availableSeats: 21,
    totalSeats: 30,
    prerequisites: ["Basic computer usage and logical thinking"],
    syllabusTopics: [
      "Software Quality Concepts & Verification vs Validation",
      "STLC: Requirement Analysis, Test Planning, Test Execution",
      "Test Design Techniques: Boundary Value Analysis & Equivalence Partitioning",
      "Defect Life Cycle & Bug Reporting Standards"
    ],
    thumbnail: "/images/courses/software-testing.png",
    objectives: [
      "Write comprehensive test cases covering positive and negative flows",
      "Apply black-box test design techniques like Boundary Value Analysis",
      "Log clear, reproducible defect reports adhering to industry standards"
    ],
    modules: [
      {
        id: "mod-1",
        title: "Module 1: Test Design Techniques",
        lessons: [
          {
            id: "lesson-1-qa-techniques",
            title: "Boundary Value Analysis & Equivalence Partitioning",
            duration: "35 mins",
            isLocked: false,
            moduleTitle: "Module 1: Test Design Techniques",
            summary: "Learn how black-box testing methodologies maximize test coverage with minimal test cases.",
            content: `### Black-Box Test Design

Boundary Value Analysis tests extremes where defects most commonly occur.`
          }
        ]
      }
    ],
    lessons: [
      {
        id: "lesson-1-qa-techniques",
        title: "Boundary Value Analysis & Equivalence Partitioning",
        duration: "35 mins",
        isLocked: false,
        moduleTitle: "Module 1: Test Design Techniques",
        summary: "Learn how black-box testing methodologies maximize test coverage with minimal test cases.",
        content: `### Black-Box Test Design

Boundary Value Analysis tests extremes where defects most commonly occur.`
      }
    ],
    quiz: {
      id: "quiz-software-testing",
      title: "Manual QA Assessment",
      description: "Verify your understanding of STLC phases and boundary conditions.",
      passingScore: 2,
      totalQuestions: 2,
      questions: [
        {
          id: "q1",
          questionNumber: 1,
          questionText: "If a text field accepts integer age values between 18 and 60, which values represent the optimal Boundary Value Analysis test set?",
          options: [
            { key: "a", text: "17, 18, 19, 59, 60, 61" },
            { key: "b", text: "0, 100, 200" },
            { key: "c", text: "25, 30, 35" },
            { key: "d", text: "-1, -2, -3" }
          ],
          correctAnswer: "a",
          explanation: "Boundary Value Analysis targets values immediately at and around the minimum (17, 18, 19) and maximum (59, 60, 61) thresholds."
        },
        {
          id: "q2",
          questionNumber: 2,
          questionText: "What is the difference between Defect Severity and Defect Priority?",
          options: [
            { key: "a", text: "Severity reflects technical impact; Priority reflects business urgency for fixing" },
            { key: "b", text: "They are completely identical terms" },
            { key: "c", text: "Priority is determined only by developers; Severity by marketing" },
            { key: "d", text: "Severity is only used for hardware issues" }
          ],
          correctAnswer: "a",
          explanation: "Severity indicates the functional impact on the system; priority dictates the order in which the bug must be addressed."
        }
      ]
    }
  },

  // 19. Selenium Automation with Python (Software Testing category)
  {
    id: "selenium-automation",
    title: "Selenium Automation Testing with Python",
    category: "Software Testing",
    level: "Intermediate",
    description: "Browser automation testing: Selenium WebDriver 4, Page Object Model, dynamic waits, and HTML test reports.",
    longDescription:
      "A dedicated, industry-focused course in browser test automation. Learn how to craft deterministic end-to-end test suites using Selenium WebDriver 4 and pytest, implement robust Page Object Model design patterns, and generate automated test logs.",
    instructor: "Dr. Angela Vance",
    instructorRole: "Principal QA Architect",
    duration: "6 Weeks (24 Hours)",
    availableSeats: 14,
    totalSeats: 25,
    prerequisites: ["Python programming foundations", "Basic web HTML/CSS knowledge"],
    syllabusTopics: [
      "W3C WebDriver Protocol & Selenium 4 Setup",
      "Stable Locators: ID, CSS Selectors & XPath Strategies",
      "Explicit vs Fluent Dynamic Waits (WebDriverWait)",
      "Page Object Model (POM) Design Patterns & Pytest Execution"
    ],
    thumbnail: "/images/courses/selenium-automation.png",
    objectives: [
      "Automate browser test scenarios without hardcoded sleeps",
      "Implement the Page Object Model pattern for maintainable suites",
      "Execute automated tests via CLI and produce HTML execution reports"
    ],
    modules: [
      {
        id: "mod-1",
        title: "Module 1: Selenium WebDriver 4 Core",
        lessons: [
          {
            id: "lesson-1-selenium-pom",
            title: "Page Object Model (POM) Design Pattern",
            duration: "45 mins",
            isLocked: false,
            moduleTitle: "Module 1: Selenium WebDriver 4 Core",
            summary: "Learn how Page Object Model isolates UI locators from test logic for resilient tests.",
            content: `### Page Object Model Architecture

POM decouples page selectors from assertions, preventing test brittleness when layouts change.`
          }
        ]
      }
    ],
    lessons: [
      {
        id: "lesson-1-selenium-pom",
        title: "Page Object Model (POM) Design Pattern",
        duration: "45 mins",
        isLocked: false,
        moduleTitle: "Module 1: Selenium WebDriver 4 Core",
        summary: "Learn how Page Object Model isolates UI locators from test logic for resilient tests.",
        content: `### Page Object Model Architecture

POM decouples page selectors from assertions, preventing test brittleness when layouts change.`
      }
    ],
    quiz: {
      id: "quiz-selenium-automation",
      title: "Selenium Automation Assessment",
      description: "Verify your understanding of Selenium locators, synchronization, and POM.",
      passingScore: 2,
      totalQuestions: 2,
      questions: [
        {
          id: "q1",
          questionNumber: 1,
          questionText: "What is the primary benefit of the Page Object Model design pattern in Selenium?",
          options: [
            { key: "a", text: "It encapsulates web element locators and interactions in reusable classes, reducing maintenance overhead" },
            { key: "b", text: "It makes web pages load faster in production" },
            { key: "c", text: "It automatically rewrites bad HTML on the server" },
            { key: "d", text: "It eliminates the need for Python" }
          ],
          correctAnswer: "a",
          explanation: "POM centralizes page interactions into discrete classes, ensuring locator updates only need to happen in one location."
        },
        {
          id: "q2",
          questionNumber: 2,
          questionText: "Which locator strategy is generally the most stable and performant when available?",
          options: [
            { key: "a", text: "Unique HTML ID attribute" },
            { key: "b", text: "Absolute XPath (/html/body/div[2]/...)" },
            { key: "c", text: "Link text substring" },
            { key: "d", text: "Tag name" }
          ],
          correctAnswer: "a",
          explanation: "Unique ID attributes provide direct, fast DOM lookups that resist layout refactoring."
        }
      ]
    }
  },

  // 20. Artificial Intelligence Foundations
  {
    id: "ai-foundations",
    title: "AI & Neural Networks Basics",
    category: "Artificial Intelligence",
    level: "Beginner",
    description: "Explore artificial intelligence concepts, artificial neural networks, backpropagation, and prompt engineering.",
    longDescription:
      "A foundational overview of modern AI. BCA students explore the history of AI, perceptrons, multi-layer artificial neural networks (ANN), activation functions (ReLU, Sigmoid), gradient descent, and an introduction to transformers.",
    instructor: "Dr. Alistair Finch",
    instructorRole: "Cognitive Computing Fellow",
    duration: "6 Weeks (24 Hours)",
    availableSeats: 15,
    totalSeats: 25,
    prerequisites: ["Basic mathematics and programming familiarity"],
    syllabusTopics: [
      "History of AI & Turing Test Foundations",
      "Perceptrons, Feedforward Neural Networks & Activations",
      "Loss Functions, Gradient Descent & Backpropagation",
      "Introduction to Large Language Models & Prompt Engineering"
    ],
    thumbnail: "/images/courses/ai-foundations.png",
    objectives: [
      "Understand how artificial neural networks learn from training weights",
      "Identify the roles of activation functions and loss functions",
      "Explore practical applications of generative AI and NLP"
    ],
    modules: [
      {
        id: "mod-1",
        title: "Module 1: Neural Networks & Learning",
        lessons: [
          {
            id: "lesson-1-ann-core",
            title: "Perceptrons & Multi-Layer Neural Networks",
            duration: "40 mins",
            isLocked: false,
            moduleTitle: "Module 1: Neural Networks & Learning",
            summary: "Learn how inputs, weights, biases, and activation functions calculate neural outputs.",
            content: `### The Artificial Neuron (Perceptron)

An artificial neuron computes the weighted sum of inputs plus bias, passing the result through an activation function.`
          }
        ]
      }
    ],
    lessons: [
      {
        id: "lesson-1-ann-core",
        title: "Perceptrons & Multi-Layer Neural Networks",
        duration: "40 mins",
        isLocked: false,
        moduleTitle: "Module 1: Neural Networks & Learning",
        summary: "Learn how inputs, weights, biases, and activation functions calculate neural outputs.",
        content: `### The Artificial Neuron (Perceptron)

An artificial neuron computes the weighted sum of inputs plus bias, passing the result through an activation function.`
      }
    ],
    quiz: {
      id: "quiz-ai-foundations",
      title: "AI & Neural Networks Assessment",
      description: "Test basic neural network architecture and training principles.",
      passingScore: 2,
      totalQuestions: 2,
      questions: [
        {
          id: "q1",
          questionNumber: 1,
          questionText: "What algorithm is used to calculate the gradient of the loss function with respect to each weight in a neural network?",
          options: [
            { key: "a", text: "Backpropagation" },
            { key: "b", text: "Breadth-First Search" },
            { key: "c", text: "QuickSort" },
            { key: "d", text: "Dijkstra's Algorithm" }
          ],
          correctAnswer: "a",
          explanation: "Backpropagation applies the calculus chain rule backwards through network layers to compute weight gradients."
        },
        {
          id: "q2",
          questionNumber: 2,
          questionText: "What is the primary function of an activation function like ReLU in a neural network?",
          options: [
            { key: "a", text: "Introduce non-linearity so the network can learn complex patterns" },
            { key: "b", text: "Compress audio files" },
            { key: "c", text: "Delete unneeded weights randomly" },
            { key: "d", text: "Encrypt user data" }
          ],
          correctAnswer: "a",
          explanation: "Without non-linear activation functions, a multi-layer neural network collapses into a simple linear regression model."
        }
      ]
    }
  },

  // 21. Operating Systems Architecture
  {
    id: "os-architecture",
    title: "Operating Systems & Computer Architecture",
    category: "Computer Fundamentals",
    level: "Beginner",
    description: "Understand CPU scheduling, process synchronization, virtual memory, paging, and file system mechanics.",
    longDescription:
      "A core computer science pillar essential for every BCA graduate. Explore process and thread lifecycles, CPU scheduling algorithms (FCFS, Round Robin, SJF), deadlocks, semaphores, virtual memory management, and paging.",
    instructor: "Prof. K. S. Raman",
    instructorRole: "Chair of Computer Systems",
    duration: "7 Weeks (28 Hours)",
    availableSeats: 25,
    totalSeats: 35,
    prerequisites: ["Basic understanding of computer hardware"],
    syllabusTopics: [
      "Process Management, Context Switching & Threading",
      "CPU Scheduling: Round Robin, Priority & Multi-Level Queues",
      "Process Synchronization, Semaphores & Deadlock Conditions",
      "Virtual Memory, Paging, Page Replacement & TLB Cache"
    ],
    thumbnail: "/images/courses/os-architecture.png",
    objectives: [
      "Analyze CPU scheduling metrics like turnaround and waiting time",
      "Identify the 4 Coffman conditions required for deadlocks",
      "Understand virtual memory paging and address translation"
    ],
    modules: [
      {
        id: "mod-1",
        title: "Module 1: Process Scheduling & Memory",
        lessons: [
          {
            id: "lesson-1-os-scheduling",
            title: "Process States, Context Switching & CPU Scheduling",
            duration: "45 mins",
            isLocked: false,
            moduleTitle: "Module 1: Process Scheduling & Memory",
            summary: "Learn how the OS kernel schedules CPU time between competing processes.",
            content: `### Process Management & CPU Scheduling

The operating system manages transitions between Ready, Running, and Blocked states.`
          }
        ]
      }
    ],
    lessons: [
      {
        id: "lesson-1-os-scheduling",
        title: "Process States, Context Switching & CPU Scheduling",
        duration: "45 mins",
        isLocked: false,
        moduleTitle: "Module 1: Process Scheduling & Memory",
        summary: "Learn how the OS kernel schedules CPU time between competing processes.",
        content: `### Process Management & CPU Scheduling

The operating system manages transitions between Ready, Running, and Blocked states.`
      }
    ],
    quiz: {
      id: "quiz-os-architecture",
      title: "Operating Systems Assessment",
      description: "Test process scheduling, deadlock conditions, and virtual memory.",
      passingScore: 2,
      totalQuestions: 2,
      questions: [
        {
          id: "q1",
          questionNumber: 1,
          questionText: "Which of the following is NOT one of the 4 necessary conditions for a system deadlock to occur?",
          options: [
            { key: "a", text: "Preemption allowed" },
            { key: "b", text: "Mutual Exclusion" },
            { key: "c", text: "Hold and Wait" },
            { key: "d", text: "Circular Wait" }
          ],
          correctAnswer: "a",
          explanation: "Deadlock requires NO preemption (resources cannot be forcibly taken from holding processes)."
        },
        {
          id: "q2",
          questionNumber: 2,
          questionText: "What is a 'page fault' in an operating system?",
          options: [
            { key: "a", text: "An interrupt raised when an accessed virtual memory page is not currently in physical RAM" },
            { key: "b", text: "A physical tear in the motherboard" },
            { key: "c", text: "A broken URL on a website" },
            { key: "d", text: "A printer error" }
          ],
          correctAnswer: "a",
          explanation: "A page fault signals the OS memory manager to fetch the requested page from disk storage into physical RAM."
        }
      ]
    }
  },

  // 22. Data Structures & Algorithms
  {
    id: "data-structures-algorithms",
    title: "Data Structures & Algorithms in Practice",
    category: "Computer Fundamentals",
    level: "Intermediate",
    description: "Master asymptotic complexity, linked lists, stacks, queues, trees, graphs, sorting, and dynamic programming.",
    longDescription:
      "The definitive technical interview preparation foundation. Master Big-O notation, linked structures, binary search trees (BST), balanced AVL trees, graph traversals (BFS & DFS), Dijkstra's shortest path, and dynamic programming.",
    instructor: "Prof. Rajesh Sharma",
    instructorRole: "Head of Software Engineering",
    duration: "8 Weeks (32 Hours)",
    availableSeats: 18,
    totalSeats: 30,
    prerequisites: ["Programming in C, C++, Java, or Python"],
    syllabusTopics: [
      "Asymptotic Complexity & Big-O Time/Space Analysis",
      "Linear Structures: Arrays, Linked Lists, Stacks & Queues",
      "Non-Linear Structures: Binary Search Trees, Heaps & Graphs",
      "Graph Algorithms: Breadth-First Search (BFS) & Depth-First Search (DFS)",
      "Dynamic Programming: Memoization vs Tabulation"
    ],
    thumbnail: "/images/courses/dsa.png",
    objectives: [
      "Analyze time and space complexity with Big-O notation",
      "Implement and traverse binary search trees and graphs",
      "Solve algorithmic problems using dynamic programming and recursion"
    ],
    modules: [
      {
        id: "mod-1",
        title: "Module 1: Trees & Graphs",
        lessons: [
          {
            id: "lesson-1-trees-graphs",
            title: "Binary Search Trees, Heaps & Graph Traversals",
            duration: "50 mins",
            isLocked: false,
            moduleTitle: "Module 1: Trees & Graphs",
            summary: "Learn tree balancing, BFS, and DFS traversal techniques.",
            content: `### Binary Search Tree (BST) Properties

In a valid BST, every left child contains a key less than its parent, while every right child contains a greater key.`
          }
        ]
      }
    ],
    lessons: [
      {
        id: "lesson-1-trees-graphs",
        title: "Binary Search Trees, Heaps & Graph Traversals",
        duration: "50 mins",
        isLocked: false,
        moduleTitle: "Module 1: Trees & Graphs",
        summary: "Learn tree balancing, BFS, and DFS traversal techniques.",
        content: `### Binary Search Tree (BST) Properties

In a valid BST, every left child contains a key less than its parent, while every right child contains a greater key.`
      }
    ],
    quiz: {
      id: "quiz-dsa",
      title: "Data Structures & Algorithms Assessment",
      description: "Test your asymptotic Big-O analysis and tree traversal knowledge.",
      passingScore: 2,
      totalQuestions: 2,
      questions: [
        {
          id: "q1",
          questionNumber: 1,
          questionText: "What is the average time complexity of searching for an element in a balanced Binary Search Tree containing N nodes?",
          options: [
            { key: "a", text: "O(log N)" },
            { key: "b", text: "O(N)" },
            { key: "c", text: "O(1)" },
            { key: "d", text: "O(N log N)" }
          ],
          correctAnswer: "a",
          explanation: "In a balanced BST, each comparison halves the remaining search space, resulting in logarithmic O(log N) time."
        },
        {
          id: "q2",
          questionNumber: 2,
          questionText: "Which data structure follows the Last-In, First-Out (LIFO) operational principle?",
          options: [
            { key: "a", text: "Stack" },
            { key: "b", text: "Queue" },
            { key: "c", text: "Linked List" },
            { key: "d", text: "Hash Table" }
          ],
          correctAnswer: "a",
          explanation: "A Stack operates on a LIFO basis where the most recently pushed element is the first popped."
        }
      ]
    }
  },

  // 23. Git & GitHub Mastery
  {
    id: "git-github-mastery",
    title: "Git and GitHub Version Control Essentials",
    category: "Career Development",
    level: "Beginner",
    description: "Learn distributed version control: commits, branching, merging, pull requests, merge conflict resolution, and CI actions.",
    longDescription:
      "A must-have career skill for every software engineer. Master Git repository mechanics, staging index, commit hashing (SHA-1), branch workflows (GitFlow, feature branches), rebasing vs merging, remote remotes, and GitHub Actions.",
    instructor: "Sarah Jenkins",
    instructorRole: "Open Source Maintainer",
    duration: "4 Weeks (16 Hours)",
    availableSeats: 25,
    totalSeats: 35,
    prerequisites: ["Basic command line usage"],
    syllabusTopics: [
      "Distributed VCS Architecture vs Centralized VCS",
      "Git Staging Area, Commits, Branches & HEAD Pointer",
      "Merge Strategies: Fast-Forward, 3-Way Merge & Rebasing",
      "Collaborative GitHub Workflows: Forks, Pull Requests & Code Reviews"
    ],
    thumbnail: "/images/courses/git-github.png",
    objectives: [
      "Manage versioned codebases confidently from the command line",
      "Resolve merge conflicts systematically without data loss",
      "Collaborate effectively on team projects using GitHub pull requests"
    ],
    modules: [
      {
        id: "mod-1",
        title: "Module 1: Git Branching & Merging",
        lessons: [
          {
            id: "lesson-1-git-branches",
            title: "Branching Strategies, Merging & Conflict Resolution",
            duration: "35 mins",
            isLocked: false,
            moduleTitle: "Module 1: Git Branching & Merging",
            summary: "Learn how Git manages branches as lightweight pointers to commits.",
            content: `### Git Branching Mechanics

In Git, a branch is simply a movable pointer to a specific commit hash.

\`\`\`bash
git checkout -b feature/course-search
# Make code edits
git add .
git commit -m "feat: implement keyword filter in catalogue"
git push origin feature/course-search
\`\`\``
          }
        ]
      }
    ],
    lessons: [
      {
        id: "lesson-1-git-branches",
        title: "Branching Strategies, Merging & Conflict Resolution",
        duration: "35 mins",
        isLocked: false,
        moduleTitle: "Module 1: Git Branching & Merging",
        summary: "Learn how Git manages branches as lightweight pointers to commits.",
        content: `### Git Branching Mechanics

In Git, a branch is simply a movable pointer to a specific commit hash.`
      }
    ],
    quiz: {
      id: "quiz-git-github",
      title: "Git & Version Control Assessment",
      description: "Verify your knowledge of Git pointers, remotes, and commit integrity.",
      passingScore: 2,
      totalQuestions: 2,
      questions: [
        {
          id: "q1",
          questionNumber: 1,
          questionText: "What command creates a new branch named 'feature-test' and immediately switches to it?",
          options: [
            { key: "a", text: "git checkout -b feature-test" },
            { key: "b", text: "git branch --make feature-test" },
            { key: "c", text: "git push new feature-test" },
            { key: "d", text: "git switch --create-only feature-test" }
          ],
          correctAnswer: "a",
          explanation: "The command 'git checkout -b <branch>' (or 'git switch -c <branch>') creates and checks out the new branch in one operation."
        },
        {
          id: "q2",
          questionNumber: 2,
          questionText: "What area in Git holds changes that are ready to be included in the next commit?",
          options: [
            { key: "a", text: "Staging Area (Index)" },
            { key: "b", text: "Working Directory" },
            { key: "c", text: "Remote Repository" },
            { key: "d", text: "Stash Cache" }
          ],
          correctAnswer: "a",
          explanation: "The staging area (index) stores the specific changes formatted to be committed next."
        }
      ]
    }
  },

  // 24. Technical Interview Preparation
  {
    id: "interview-preparation",
    title: "Technical Interview Preparation & Problem Solving",
    category: "Career Development",
    level: "Intermediate",
    description: "Ace college placements: coding problem patterns, system design basics, behavioral STAR method, and resume tips.",
    longDescription:
      "Prepare for BCA campus recruitment and technical interviews. Learn high-frequency problem patterns (Two Pointers, Sliding Window, Fast & Slow Pointers), basic system design fundamentals, coding round strategies, and behavioral STAR formatting.",
    instructor: "Daniel Romero",
    instructorRole: "Technical Hiring Manager",
    duration: "6 Weeks (24 Hours)",
    availableSeats: 20,
    totalSeats: 30,
    prerequisites: ["Data Structures & Algorithms foundations"],
    syllabusTopics: [
      "Top 10 Coding Interview Patterns (Two Pointers, Sliding Window)",
      "High-Level System Design for College Placements",
      "Behavioral Interviews with the STAR Method (Situation, Task, Action, Result)",
      "Mock Technical Interviews & Resume Engineering"
    ],
    thumbnail: "/images/courses/interview-prep.png",
    objectives: [
      "Recognize coding problem archetypes quickly during live technical interviews",
      "Explain algorithmic trade-offs clearly using Big-O time and space",
      "Formulate compelling behavioral responses using the structured STAR framework"
    ],
    modules: [
      {
        id: "mod-1",
        title: "Module 1: Problem Patterns & Behavioral",
        lessons: [
          {
            id: "lesson-1-interview-patterns",
            title: "Two Pointers, Sliding Window & The STAR Method",
            duration: "45 mins",
            isLocked: false,
            moduleTitle: "Module 1: Problem Patterns & Behavioral",
            summary: "Master systematic problem solving techniques and clear verbal technical communication.",
            content: `### Two Pointers & Sliding Window Patterns

Optimizing brute-force O(N^2) loops to linear O(N) using dual pointers.`
          }
        ]
      }
    ],
    lessons: [
      {
        id: "lesson-1-interview-patterns",
        title: "Two Pointers, Sliding Window & The STAR Method",
        duration: "45 mins",
        isLocked: false,
        moduleTitle: "Module 1: Problem Patterns & Behavioral",
        summary: "Master systematic problem solving techniques and clear verbal technical communication.",
        content: `### Two Pointers & Sliding Window Patterns

Optimizing brute-force O(N^2) loops to linear O(N) using dual pointers.`
      }
    ],
    quiz: {
      id: "quiz-interview-prep",
      title: "Interview Readiness Assessment",
      description: "Test your understanding of problem-solving patterns and interview strategies.",
      passingScore: 2,
      totalQuestions: 2,
      questions: [
        {
          id: "q1",
          questionNumber: 1,
          questionText: "Which algorithmic pattern is best suited for finding the longest contiguous subarray whose sum satisfies a condition?",
          options: [
            { key: "a", text: "Sliding Window" },
            { key: "b", text: "Depth-First Search" },
            { key: "c", text: "Bubble Sort" },
            { key: "d", text: "Bit Manipulation" }
          ],
          correctAnswer: "a",
          explanation: "The Sliding Window pattern maintains a dynamic subsegment over contiguous arrays, reducing nested loop complexity."
        },
        {
          id: "q2",
          questionNumber: 2,
          questionText: "What does the 'STAR' framework represent for structuring behavioral interview responses?",
          options: [
            { key: "a", text: "Situation, Task, Action, Result" },
            { key: "b", text: "Skill, Talent, Ability, Role" },
            { key: "c", text: "Speed, Timing, Accuracy, Reliability" },
            { key: "d", text: "Software, Testing, Automation, Release" }
          ],
          correctAnswer: "a",
          explanation: "STAR stands for Situation, Task, Action, Result — providing a crisp narrative structure for behavioral questions."
        }
      ]
    }
  }
];

export function getCourseById(id: string): Course | undefined {
  return MOCK_COURSES.find((course) => course.id === id);
}

export function getAllCategories(): string[] {
  return [
    "All Categories",
    "Programming",
    "Web Development",
    "Data Science",
    "Artificial Intelligence",
    "Database Management",
    "Software Testing",
    "Computer Fundamentals",
    "Career Development",
    "Cloud & DevOps",
    "Cybersecurity"
  ];
}

export function getAllLevels(): string[] {
  return ["All Levels", "Beginner", "Intermediate", "Advanced"];
}
