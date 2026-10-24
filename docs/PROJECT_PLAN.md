# SkillSpring — Learning Management Portal
## Comprehensive Project Requirements & Architecture Plan

**Document Version:** 2.0.0 (Unified Root Architecture & Single-Test Execution)  
**Target Audience:** Final-Year BCA Project Evaluation & Faculty Review  
**Author:** KK (BCA Final-Year Student)  
**QA & Framework Lead:** Antigravity AI Assistant  

---

## 1. Project Overview and Objectives

### 1.1 Project Overview
**SkillSpring** is a modern, responsive, and deterministic web-based Learning Management Portal developed as a final-year BCA capstone demonstration. The platform provides students with an intuitive environment to explore course catalogues, view syllabus and curriculum details, enrol in open training programs, track modular learning progress, and evaluate competencies through structured quizzes.

Simultaneously, SkillSpring serves as an enterprise-grade automated testing testbed engineered to demonstrate rigorous quality assurance principles using Python 3, Selenium WebDriver 4, and `pytest`, supplemented by a formal `unittest` comparison suite.

### 1.2 Core Objectives
1. **Academic Demonstration:** Showcase full-stack frontend engineering with Next.js 16 (React 19) alongside automated QA testing practices adhering to the Page Object Model (POM).
2. **Deterministic Testability:** Provide predictable, seedable mock data enabling repeatable, zero-flakiness automated test runs across Google Chrome and Microsoft Edge on macOS and Windows.
3. **Single-Test Execution Capability:** Enable instantaneous, targeted verification of a single smoke test case (`test_skillspring_complete_ui_smoke_journey`) without running the entire suite.
4. **Clean Architectural Simplification:** Maintain a clean, unified root structure without legacy frontend nesting or unnecessary backend complexity.

---

## 2. Functional and Non-Functional Requirements

### 2.1 Functional Requirements (Application Features)
- **FR-01: Course Catalogue & Search/Filter:**
  - Real-time search filtering courses dynamically by keyword in title, instructor, and description.
  - Dropdown/pill filters for Course Category (e.g., Programming, Web Development, Data Science) and Difficulty Level (Beginner, Intermediate, Advanced).
  - Explicit empty state UI when no courses match query criteria.
- **FR-02: Course Details View:**
  - Dynamic route `/courses/[id]` displaying course syllabus, instructor, duration, seat availability, and enrollment action.
  - Split-column layout featuring a sticky curriculum sidebar on the left and rich content on the right.
- **FR-03: Course Enrolment Logic:**
  - Open courses allow instant one-click enrollment, updating seat count and storing status in client `localStorage`.
  - Direct user feedback via success toast/banner and immediate reflection in the navigation header and dashboard.
- **FR-04: Full Course Rejection:**
  - Courses with `capacity === enrolledCount` (0 available seats) must display a disabled "Course Full" button and an explicit rejection alert message upon any interaction attempt.
- **FR-05: My Learning Dashboard:**
  - Summary KPI cards (Enrolled, Completed, Lessons Done, Progress).
  - Tabular view (`<table>`) displaying all enrolled courses with columns: Course Title, Enrolment Date/Status, Modular Progress Bar (%), and Action button ("Continue Learning").
- **FR-06: Modular Lesson Player:**
  - Interactive lesson navigation (sidebar with lesson list).
  - Active lesson viewing area supporting rich content, formatted code blocks, and key takeaways.
  - Explicit "Mark as Complete" action that calculates course completion percentage dynamically.
- **FR-07: Interactive Quiz Engine:**
  - Multi-question assessment containing single-choice radio options.
  - Submit button triggering immediate validation.
  - Deterministic scoring summary (e.g., `Score: 2/2 (100%)`) with color-coded feedback banners (Passed / Needs Improvement) and answer explanations.
- **FR-08: Gated / Unavailable Lessons:**
  - Lessons marked as locked/prerequisite-restricted must show a disabled state, lock icon, and distinct badge, preventing navigation or completion.

### 2.2 Non-Functional Requirements
- **NFR-01: Determinism & Zero External Dependencies:** No external third-party database APIs. All state is maintained predictably in mock fixtures and client-side `localStorage`.
- **NFR-02: Test Automation Accessibility:** Every interactive element features unambiguous `id` and `data-testid` attributes.
- **NFR-03: Performance & Responsiveness:** Clean rendering, fast client-side hydration, and responsive layout across desktop and mobile viewports using pure Vanilla CSS.
- **NFR-04: Robust Error Handling:** Defensive checks preventing crashes on invalid course or lesson identifiers, rendering user-friendly 404/fallback views.

---

## 3. Technology Stack & Current Environment

| Component | Verified Technology | Purpose in Project |
|---|---|---|
| **Frontend Framework** | Next.js 16.4.2 (React 19.3.0) | App Router, SSR, accessible UI components |
| **Styling** | Vanilla CSS (CSS3) | Bespoke Blue-and-White design system |
| **Type Checking** | TypeScript 5.x | Strict compile-time validation |
| **Automation Language** | Python 3.14.6 | Automation scripts and Page Objects |
| **Browser Driver** | Selenium WebDriver 4.51.0 | W3C standard browser automation |
| **Test Runner** | pytest 9.1.1 | Discovery, CLI fixtures, and test lifecycle |
| **HTML Reporting** | pytest-html 4.2.0 | Formatted test reports (`tests/reports/html/report.html`) |
| **Alternative Runner** | Python unittest | Comparative test execution demonstration |

---

## 4. Current Implementation & Verification Status

### Phase 1: Environment Setup & Project Initialization
- [x] **Task 1.1:** Restructure application to project root (`src/`, `public/`, `package.json`).
- [x] **Task 1.2:** Resolve macOS execute and write permission errors on `.bin/next` and `node_modules`.
- [x] **Task 1.3:** Setup local Python virtual environment (`.venv`) and install dependencies (`selenium`, `pytest`, `pytest-html`, `pytest-metadata`).

### Phase 2: Frontend Application Development
- [x] **Task 2.1:** Verify deterministic mock course dataset (`src/data/mockCourses.ts`) with 24 courses across 8 domains.
- [x] **Task 2.2:** Verify client storage utility (`storage.ts`) managing enrolments and lesson progress in `localStorage`.
- [x] **Task 2.3:** Course Catalogue page (`src/app/page.tsx`) with search, filters, and cards.
- [x] **Task 2.4:** Course Details page (`src/app/courses/[id]/page.tsx`) with curriculum hierarchy and seat logic.
- [x] **Task 2.5:** My Learning dashboard (`src/app/my-learning/page.tsx`) with summary KPIs and data table.
- [x] **Task 2.6:** Modular Lesson page (`src/app/learn/[courseId]/`) with completion tracking and locked lesson guards.
- [x] **Task 2.7:** Quiz page with instant evaluation and feedback display.

### Phase 3: Automation Framework & Single-Test Execution
- [x] **Task 3.1:** Verify configuration module (`tests/config/settings.py`) with base URL (`http://localhost:3000`) and explicit timeouts.
- [x] **Task 3.2:** Verify `DriverFactory` (`tests/config/driver_factory.py`) supporting Chrome and Edge via Selenium Manager.
- [x] **Task 3.3:** Implement and verify single-test execution script `run_single_test.sh` targeting `test_skillspring_complete_ui_smoke_journey`.
- [x] **Task 3.4:** Execute single test case and confirm **100% PASS** in 2.50s with HTML report generation.

### Phase 4: Documentation & Cleanup
- [x] **Task 4.1:** Clean up legacy duplicate files, temporary build caches, and unnecessary nested directories.
- [x] **Task 4.2:** Update root `README.md` reflecting unified root structure, setup instructions, and execution commands.
- [x] **Task 4.3:** Create complete project documentation in `docs/PROJECT_DOCUMENTATION.md`.
- [x] **Task 4.4:** Create examiner test guide in `docs/TEST_EXECUTION_GUIDE.md`.
- [x] **Task 4.5:** Create application user manual in `docs/USER_MANUAL.md`.
