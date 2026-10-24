# SkillSpring — Premium Learning Management Portal & Test Automation Testbed

> **Final-Year BCA Capstone Project**  
> **Student Developer:** KK (BCA Final-Year)  
> **Tagline:** *Learn Today. Build Tomorrow.*  
> **Evaluation Focus:** Premium Full-Stack Frontend Engineering & Enterprise QA Automation with Selenium WebDriver 4

---

## 1. Project Overview & Vision

**SkillSpring** is a modern, responsive, and deterministic web-based Learning Management Portal redesigned with a crisp, state-of-the-art **Blue-and-White Design System**. It serves two core purposes:

1. **Academic Demonstration of Modern Frontend Architecture:**  
   Built with **Next.js 16 (React 19)**, TypeScript, and a bespoke Vanilla CSS design system. Features an engaging hero section, a 5-second rotating promotional carousel, 24 verified industry courses across 8 tech domains, an interactive split-column course curriculum player, and a comprehensive student dashboard.

2. **Enterprise-Grade Test Automation Testbed:**  
   Specifically constructed to validate software quality assurance principles. Using **Python 3**, **Selenium WebDriver 4**, and **pytest**, the suite automates complex end-to-end browser workflows adhering to the industry-standard **Page Object Model (POM)** pattern.

---

## 2. Blue-and-White Design System

The platform features a consistent, professional blue-and-white visual identity:

* **Primary Blue:** `#2563EB` (Interactive actions, brand accents, active states)
* **Dark Navy:** `#172554` (Headings, brand typography, high-contrast text)
* **Secondary Blue:** `#60A5FA` (Gradients, secondary highlights, borders)
* **Light Blue Accent:** `#EFF6FF` (Card backgrounds, tag badges, soft fills)
* **Background Surface:** `#F8FAFC` & `#FFFFFF` (Clean, elevated presentation)
* **Text Main:** `#1E293B` & Muted `#64748B` (Readable, accessible typography)

---

## 3. Key Portal Features

* 🌟 **Modern Hero Composition:** Visual programming composition with floating interactive cards, active cohort status, and factual statistics.
* 🔄 **Rotating Promotional Banner Carousel:** 5 rich educational banners (Web Development, Core Programming, Data Science, AI, and Career Skills) auto-rotating every 5 seconds with hover-pause, arrows, and pagination indicators.
* 📚 **Expanded 24-Course Catalogue:** 24 courses covering 8 domains:
  1. Programming (Python, Java, C, C++)
  2. Web Development (HTML/CSS, JavaScript, React, Full-Stack Next.js, Node.js & Express)
  3. Database Management (SQL, MongoDB, Database Design)
  4. Data Science (Pandas Data Analysis, Data Visualization, Machine Learning)
  5. Software Testing (Manual QA Principles, Selenium Automation with Python)
  6. Artificial Intelligence (AI & Neural Networks Basics)
  7. Computer Fundamentals (Operating Systems Architecture, Data Structures & Algorithms)
  8. Career Development (Git & GitHub, Technical Interview Preparation)
* 🧭 **Course Details Split Layout (Curriculum Hierarchy):**
  - **Left Sidebar (340px):** Sticky module tree with expandable/collapsible modules, lesson status checkmarks, lock indicators, and course progress bar.
  - **Right Content Area:** Course overview, instructor details, seat availability badge, learning objectives, interactive lesson reader with formatted code blocks, and assessment navigation.
* 📊 **Student Dashboard (`/my-learning`):**
  - Welcome banner with tagline
  - 4 Summary KPI Cards: Enrolled Courses, Completed Courses, Lessons Completed, Average Progress
  - Continue Learning section with thumbnail cards and progress bars
  - Recent Learning quick-resume highlight
  - Bookmarked Courses section with fast access
  - Recommended Courses based on remaining catalogue offerings
  - Enrolled Courses detailed traversal table with QA testbed toolbar
* 🔖 **Course Bookmarks & Reactive Toasts:** Instant bookmark toggling and feedback toasts.

---

## 4. Technology Stack

| Layer | Technology | Purpose & Responsibility |
|---|---|---|
| **Frontend Framework** | **Next.js 16.4.2 (React 19.3.0)** | App Router, partial prerendering, and accessible UI components. |
| **Styling & UI** | **Vanilla CSS (CSS3)** | Custom design system with modern tokens, soft shadows, and responsive layout. |
| **Type Safety** | **TypeScript 5.x** | Strict type-checking across data models and frontend components. |
| **Automation Language**| **Python 3.10+** | Scripting language for all test cases and Page Objects. |
| **Browser Driver** | **Selenium WebDriver 4.49.0** | W3C WebDriver implementation, explicit dynamic waits (`WebDriverWait`). |
| **Test Runner** | **pytest 9.1.1** | Test runner, CLI flags, and modular fixtures (`conftest.py`). |
| **HTML Reporting** | **pytest-html 4.2.0** | Generates interactive HTML test execution reports (`tests/reports/html/report.html`). |
| **Browsers Supported** | **Google Chrome & Microsoft Edge** | Cross-browser automated verification on Windows via native Selenium Manager. |

---

## 5. End-to-End Test Suite Architecture

Per UI redesign requirements, the test suite utilizes **one primary end-to-end smoke test**:
`tests/test_cases/test_ui_smoke.py::TestSkillSpringUISmoke::test_skillspring_complete_ui_smoke_journey`

### 8 Verification Steps in the Primary Smoke Test:
1. **Homepage Loading:** Opens `http://localhost:3000` and verifies page title.
2. **Main Heading:** Confirms hero heading and brand logo visibility.
3. **Course Catalogue:** Validates catalogue section and presence of course cards.
4. **Course Details Navigation:** Opens a course card and navigates to `/courses/python-automation`.
5. **Left Hierarchy Sidebar:** Verifies left curriculum sidebar with modules and progress bar.
6. **Right Content Area:** Verifies right-side course metadata, instructor, and seat availability.
7. **Interactive Lesson Navigation:** Selects lesson and verifies title and "Mark as Complete" action.
8. **UI Stability:** Confirms zero unhandled errors or missing routes.

*(Previous individual test cases have been safely archived in `tests/archive_tests/` for reference).*

---

## 6. How to Run

### Step 1: Start the Frontend Application
```bash
cd frontend
npm run dev
# Or for the optimized production build:
# npm run build
# npm start
```
The portal is available at: `http://localhost:3000`

### Step 2: Run the Automated Smoke Test
From the project root:
```bash
# On Google Chrome:
python -m pytest tests/test_cases/ -v --browser=chrome

# On Microsoft Edge:
python -m pytest tests/test_cases/ -v --browser=edge

# Or double-click the batch file:
run_tests_chrome.bat
```
View HTML execution reports at: `tests/reports/html/report.html`
