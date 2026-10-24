# Graph Report - SkillSpring  (2026-10-24)

## Corpus Check
- 56 files · ~99,268 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 556 nodes · 794 edges · 55 communities (29 shown, 26 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 24 edges (avg confidence: 0.55)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `219bf75e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- os
- Course Details Client & Pages
- Lesson Progress & Text Verification
- conftest.py
- Quiz Assessment & Filter Actions
- CourseCataloguePage
- Frontend Dependencies & ESLint Config
- MyLearningPage
- TypeScript Compiler Configuration
- TestSkillSpringUISmoke
- Base Page Navigation & Tabs
- DOM Locators & Element Interaction
- CourseDetailsPage
- compilerOptions
- LocalStorage Seeding & Utilities
- SkillSpring Portal Architecture & README
- test_quiz.py
- BCA Capstone Requirements Blueprint
- Test Execution & Viva Guide
- Next.js Framework & Branding
- Course Card Element Retrieval
- Locked Lesson Sidebar Verification
- Failure Screenshot Demo Pipeline
- SkillSpring — Application User Manual
- test_course_search.py
- Screenshot Capture Utility
- File Icon Public Asset
- Globe Navigation Public Asset
- Window Frame Public Asset
- Portal Feature Highlights
- TC01 Search Failure Capture
- TC08 Gated Lesson Failure Capture
- TC08 Lesson Unlock Failure Capture
- layout.tsx
- frontend_src_app_globals
- .find_clickable
- PromoBanner.tsx
- .__init__
- .switch_to_new_tab
- AGENTS.md
- graphify.md
- graphify.md
- eslint.config.mjs
- next.config.ts
- run_single_test.sh
- .close_current_tab_and_return
- .get_current_url
- .get_page_title
- .js_clear_local_storage
- Vercel Platform Logo Asset

## God Nodes (most connected - your core abstractions)
1. `BasePage` - 38 edges
2. `CourseCataloguePage` - 27 edges
3. `LessonPlayerPage` - 27 edges
4. `MyLearningPage` - 27 edges
5. `CourseDetailsPage` - 24 edges
6. `SkillSpring — Comprehensive Project Documentation` - 19 edges
7. `QuizPage` - 16 edges
8. `compilerOptions` - 16 edges
9. `isBrowser()` - 12 edges
10. `TestSkillSpringUnittest` - 11 edges

## Surprising Connections (you probably didn't know these)
- `Python Testing Dependencies Spec` --conceptually_related_to--> `Technology Stack Architecture`  [INFERRED]
  requirements.txt → README.md
- `Cross-Browser Batch Runners` --references--> `Pytest Full HTML Test Execution Report`  [INFERRED]
  docs/TEST_EXECUTION_GUIDE.md → tests/reports/html/report.html
- `TestEnrolment` --uses--> `MyLearningPage`  [INFERRED]
  tests/archive_tests/test_enrolment.py → tests/pages/my_learning_page.py
- `TestFullCourseRejection` --uses--> `CourseDetailsPage`  [INFERRED]
  tests/archive_tests/test_enrolment.py → tests/pages/course_details_page.py
- `TestLessonProgress` --uses--> `LessonPlayerPage`  [INFERRED]
  tests/archive_tests/test_lesson_progress.py → tests/pages/lesson_player_page.py

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **SkillSpring QA Automation & Reporting Pipeline** — readme_test_scenarios, docs_test_execution_guide_browser_runners, tests_reports_html_report_execution_report, requirements_testing_dependencies [EXTRACTED 0.95]

## Communities (55 total, 26 thin omitted)

### Community 0 - "os"
Cohesion: 0.15
Nodes (18): os, selenium_common_exceptions, selenium_webdriver_common_by, selenium_webdriver_remote_webdriver, selenium_webdriver_remote_webelement, selenium_webdriver_support, selenium_webdriver_support_ui, sys (+10 more)

### Community 1 - "Course Details Client & Pages"
Cohesion: 0.08
Nodes (43): CourseDetailsClient(), CourseDetailsClientProps, LessonPlayerClient(), LessonPlayerClientProps, generateStaticParams(), CourseQuizClientProps, HomePage(), CourseCard (+35 more)

### Community 2 - "Lesson Progress & Text Verification"
Cohesion: 0.07
Nodes (18): TC08 supplement (PROJECT_PLAN.md Steps 5-6) — Attempting to click         the lo, TC08: Locked lesson access prevention., TC08 — Navigate directly to lesson-3-advanced without completing         lesson-, TC08 supplement — The lesson sidebar shows aria-disabled=true         on the loc, TestLockedLesson, LessonPlayerPage, Return True if the locked-lesson warning banner is visible., Return the text inside the locked-lesson alert banner. (+10 more)

### Community 3 - "conftest.py"
Cohesion: 0.05
Nodes (38): base64, json, pytest_html, selenium, selenium_webdriver_chrome_options, selenium_webdriver_edge_options, Verify the My Learning page responds with status 200         and the URL is corr, Verify the course details page for python-automation loads correctly.          u (+30 more)

### Community 4 - "Quiz Assessment & Filter Actions"
Cohesion: 0.09
Nodes (15): TC06 supplement — After submitting, clicking 'Retake Assessment'         resets, TC06: Quiz submission and result validation., TC06 — Submit quiz with given answers and verify score + feedback.          This, TestQuizSubmission, QuizPage, Return the feedback text from the result banner.         Should contain "Passed", Return the CSS class string of the feedback element.         TC06 checks for 'al, Return True when the score element appears after submission. (+7 more)

### Community 5 - "CourseCataloguePage"
Cohesion: 0.06
Nodes (24): TC01 supplement — Searching for a nonsense keyword shows empty state.         Th, TC01 supplement — Resetting filters after a search restores all course cards., Data-driven version of TC01 powered by tests/data/search_data.csv.      Each CSV, TC01: Search for a course and verify the result., TC01 — Search for 'Python' and verify title and difficulty level.          This, test_tc01_csv_driven_search(), TestCourseSearch, Demonstration of failure screenshot capture and HTML report embedding. (+16 more)

### Community 6 - "Frontend Dependencies & ESLint Config"
Cohesion: 0.06
Nodes (33): 10.1 Course Catalogue & Dynamic Search (`/`), 10.2 Course Details & Enrolment (`/courses/[id]`), 10.3 Student Dashboard (`/my-learning`), 10.4 Interactive Lesson Player (`/learn/[courseId]/lesson/[lessonId]`), 10.5 Quiz Assessment Engine (`/learn/[courseId]/quiz`), 10. Module Description, 11. Application Workflow, 12. Testing Architecture (+25 more)

### Community 7 - "MyLearningPage"
Cohesion: 0.06
Nodes (21): TC03: Attempting to enrol in a full course is rejected., TC03 — The cloud-architecture-masterclass course has 0 seats.         Verify the, TestFullCourseRejection, TC07 supplement — Confirm data-testid locators (the alternative to XPath), TC07 supplement — All three pre-seeded courses must appear in the table., TC07: My Learning table traversal using XPath., TC07 — Navigate to My Learning, confirm the table is visible,         and verify, TestMyLearningTable (+13 more)

### Community 8 - "TypeScript Compiler Configuration"
Cohesion: 0.07
Nodes (28): eslint, eslint-config-next, next, dependencies, next, react, react-dom, devDependencies (+20 more)

### Community 10 - "Base Page Navigation & Tabs"
Cohesion: 0.14
Nodes (8): BasePage, Return True if the element appears within `timeout` seconds.         Returns Fal, Block until an element contains the expected text., Block until the current URL contains the given string., Return a list of all open browser window handles., Save a screenshot as a PNG file.          Parameters         ----------, Base class shared by every page object.      Parameters     ----------     drive, Navigate the browser to the given URL.

### Community 11 - "DOM Locators & Element Interaction"
Cohesion: 0.17
Nodes (6): Clear an input field and type new text into it., Return the visible text of an element., Return the value of an HTML attribute on an element., Return True if the element is enabled (not disabled)., Click an element using JavaScript.         Useful for elements that are technica, Wait for an element to be visible, then return it.          Example:

### Community 12 - "CourseDetailsPage"
Cohesion: 0.06
Nodes (21): TC02: Enrolment in an open course., TC02 — Click 'Enrol Now' on web-dev-basics and confirm the course         appear, TestEnrolment, TC04 supplement — The Course Details page itself also has an         'Open in Ne, TC04: Multi-tab browser context switching., TC04 — Click 'New Tab ↗' on the react-deep-dive card, verify the         course, TestNewTab, CourseDetailsPage (+13 more)

### Community 13 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 14 - "LocalStorage Seeding & Utilities"
Cohesion: 0.29
Nodes (4): Write a value into the browser's localStorage., Read a value from the browser's localStorage., Enrol in a course by writing directly to localStorage.         This is faster an, Mark a lesson as complete in localStorage directly.         Used in TC07 to set

### Community 15 - "SkillSpring Portal Architecture & README"
Cohesion: 0.29
Nodes (7): HTML Reporting & Artifacts, SkillSpring Portal Overview, System Architecture Pipeline, Technology Stack Architecture, Mandatory Test Scenarios TC01-TC08, User Navigation Flow, Python Testing Dependencies Spec

### Community 16 - "test_quiz.py"
Cohesion: 0.20
Nodes (7): pytest, TC05 — Mark a Lesson Complete and Verify Progress Indicator ====================, TC08 — Attempt to Access a Locked Lesson and Verify Restriction ================, TC07 — Traverse My Learning Table with XPath and Verify Status + Progress ======, TC06 — Submit a Quiz and Verify Score and Feedback Banner ======================, Test data for SkillSpring quiz scenarios (TC06).  Format:   Each entry in QUIZ_S, LessonPlayerPage ================= Page Object for the Lesson Player ( /learn/<c

### Community 17 - "BCA Capstone Requirements Blueprint"
Cohesion: 0.40
Nodes (5): SkillSpring BCA Capstone Blueprint, Deterministic Mock Storage Design Decision, Functional Requirements FR-01 to FR-09, Non-Functional Requirements NFR-01 to NFR-05, Site Map and URL Routing

### Community 18 - "Test Execution & Viva Guide"
Cohesion: 0.50
Nodes (4): Cross-Browser Batch Runners, Examiner Verification Criteria, Test Execution & Viva Examiner Guide, Pytest Full HTML Test Execution Report

### Community 22 - "Failure Screenshot Demo Pipeline"
Cohesion: 0.67
Nodes (3): Intentional Failure Demo Verification, Pytest Failure Screenshot Demo Report, Intentional Failure Verification Screenshot

### Community 23 - "SkillSpring — Application User Manual"
Cohesion: 0.20
Nodes (9): 1. Accessing the Portal, 2. Navigating the Homepage, 3. Searching and Filtering Courses, 4. Viewing Course Details, 5. Enrolling in a Course, 6. Accessing "My Learning" Dashboard, 7. Interactive Lesson Player, 8. Taking Quizzes & Assessing Knowledge (+1 more)

### Community 24 - "test_course_search.py"
Cohesion: 0.22
Nodes (7): csv, logging, test_comparison_unittest.py ============================ Project Plan Requiremen, _load_csv_search_data(), TC01 — Search for a Course and Verify Matching Course and Level ================, Read search keywords and expected values from search_data.csv.     Returns a lis, unittest

### Community 25 - "Screenshot Capture Utility"
Cohesion: 0.33
Nodes (4): TC05 supplement — After marking a lesson complete the button becomes         per, TC05: Mark a lesson complete and verify progress updates., TC05 — Mark lesson-1-intro complete, verify progress bar updates to 50%,, TestLessonProgress

### Community 40 - ".find_clickable"
Cohesion: 0.40
Nodes (3): Wait for an element to be clickable, then click it., Wait for an element to be clickable, then return it., WebElement

### Community 41 - "PromoBanner.tsx"
Cohesion: 0.40
Nodes (3): BANNER_SLIDES, BannerSlide, PromoBannerProps

## Knowledge Gaps
- **113 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+108 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `BasePage` connect `Base Page Navigation & Tabs` to `os`, `Lesson Progress & Text Verification`, `Quiz Assessment & Filter Actions`, `CourseCataloguePage`, `MyLearningPage`, `.find_clickable`, `.__init__`, `DOM Locators & Element Interaction`, `.switch_to_new_tab`, `CourseDetailsPage`, `LocalStorage Seeding & Utilities`, `test_quiz.py`, `.close_current_tab_and_return`, `.get_current_url`, `Course Card Element Retrieval`, `.get_page_title`, `Locked Lesson Sidebar Verification`, `.js_clear_local_storage`?**
  _High betweenness centrality (0.170) - this node is a cross-community bridge._
- **Why does `CourseCataloguePage` connect `CourseCataloguePage` to `test_course_search.py`, `os`, `Base Page Navigation & Tabs`, `CourseDetailsPage`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **Why does `LessonPlayerPage` connect `Lesson Progress & Text Verification` to `test_quiz.py`, `Screenshot Capture Utility`, `Base Page Navigation & Tabs`, `Quiz Assessment & Filter Actions`?**
  _High betweenness centrality (0.074) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `BasePage` (e.g. with `CourseCataloguePage` and `CourseDetailsPage`) actually correct?**
  _`BasePage` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Are the 4 inferred relationships involving `CourseCataloguePage` (e.g. with `TestCourseSearch` and `TestFailureScreenshotDemo`) actually correct?**
  _`CourseCataloguePage` has 4 INFERRED edges - model-reasoned connections that need verification._
- **Are the 4 inferred relationships involving `LessonPlayerPage` (e.g. with `TestLessonProgress` and `TestLockedLesson`) actually correct?**
  _`LessonPlayerPage` has 4 INFERRED edges - model-reasoned connections that need verification._
- **Are the 5 inferred relationships involving `MyLearningPage` (e.g. with `TestEnrolment` and `TestFullCourseRejection`) actually correct?**
  _`MyLearningPage` has 5 INFERRED edges - model-reasoned connections that need verification._