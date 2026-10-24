# Graph Report - SkillSpring  (2026-10-23)

## Corpus Check
- 54 files · ~82,916 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: .bat 4, .css 2, (none) 1)

## Summary
- 522 nodes · 956 edges · 37 communities (13 shown, 24 thin omitted)
- Extraction: 90% EXTRACTED · 10% INFERRED · 0% AMBIGUOUS · INFERRED: 99 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- os
- Course Details Client & Pages
- Lesson Progress & Text Verification
- TestSkillSpringUnittest
- Quiz Assessment & Filter Actions
- CourseCataloguePage
- Frontend Dependencies & ESLint Config
- MyLearningPage
- TypeScript Compiler Configuration
- TestSkillSpringUISmoke
- Base Page Navigation & Tabs
- SkillSpring Portal Architecture & README
- BCA Capstone Requirements Blueprint
- Test Execution & Viva Guide
- Next.js Framework & Branding
- Failure Screenshot Demo Pipeline
- File Icon Public Asset
- Globe Navigation Public Asset
- Window Frame Public Asset
- Portal Feature Highlights
- TC01 Search Failure Capture
- TC08 Gated Lesson Failure Capture
- TC08 Lesson Unlock Failure Capture

## God Nodes (most connected - your core abstractions)
1. `BasePage` - 38 edges
2. `CourseCataloguePage` - 27 edges
3. `LessonPlayerPage` - 27 edges
4. `MyLearningPage` - 27 edges
5. `CourseDetailsPage` - 24 edges
6. `compilerOptions` - 16 edges
7. `QuizPage` - 16 edges
8. `next` - 12 edges
9. `isBrowser()` - 12 edges
10. `react` - 11 edges

## Surprising Connections (you probably didn't know these)
- `Cross-Browser Batch Runners` --references--> `Pytest Full HTML Test Execution Report`  [INFERRED]
  docs/TEST_EXECUTION_GUIDE.md → tests/reports/html/report.html
- `TestSkillSpringUnittest` --uses--> `DriverFactory`  [INFERRED]
  tests/archive_tests/test_comparison_unittest.py → tests/config/driver_factory.py
- `TestLessonProgress` --uses--> `MyLearningPage`  [INFERRED]
  tests/archive_tests/test_lesson_progress.py → tests/pages/my_learning_page.py
- `TestNewTab` --uses--> `CourseDetailsPage`  [INFERRED]
  tests/archive_tests/test_new_tab.py → tests/pages/course_details_page.py
- `TestQuizSubmission` --uses--> `LessonPlayerPage`  [INFERRED]
  tests/archive_tests/test_quiz.py → tests/pages/lesson_player_page.py

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **SkillSpring Frontend LMS Application Architecture** — readme_project_overview, docs_project_plan_functional_requirements, docs_project_plan_site_map, frontend_readme_app_setup [EXTRACTED 0.95]
- **SkillSpring QA Automation & Reporting Pipeline** — readme_test_scenarios, docs_test_execution_guide_browser_runners, tests_reports_html_report_execution_report, requirements_testing_dependencies [EXTRACTED 0.95]

## Communities (37 total, 24 thin omitted)

### Community 0 - "os"
Cohesion: 0.06
Nodes (6): _load_csv_search_data(), _load_quiz_scenarios(), DriverFactory, pytest_addoption(), pytest_configure(), _setup_logging()

### Community 1 - "Course Details Client & Pages"
Cohesion: 0.07
Nodes (54): nextConfig, CourseDetailsClient(), CourseDetailsClientProps, CoursePage(), metadata, RootLayout(), LessonPlayerClient(), LessonPlayerClientProps (+46 more)

### Community 2 - "Lesson Progress & Text Verification"
Cohesion: 0.07
Nodes (3): TestLessonProgress, TestLockedLesson, LessonPlayerPage

### Community 3 - "TestSkillSpringUnittest"
Cohesion: 0.06
Nodes (6): TestSkillSpringUnittest, browser_name(), _clear_skillspring_storage(), driver(), pytest_runtest_makereport(), seeded_driver()

### Community 5 - "CourseCataloguePage"
Cohesion: 0.06
Nodes (5): test_tc01_csv_driven_search(), TestCourseSearch, TestFailureScreenshotDemo, TestNewTab, CourseCataloguePage

### Community 6 - "Frontend Dependencies & ESLint Config"
Cohesion: 0.07
Nodes (27): eslintConfig, dependencies, next, react, react-dom, devDependencies, eslint, eslint-config-next (+19 more)

### Community 7 - "MyLearningPage"
Cohesion: 0.06
Nodes (5): TestEnrolment, TestFullCourseRejection, TestMyLearningTable, CourseDetailsPage, MyLearningPage

### Community 8 - "TypeScript Compiler Configuration"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 15 - "SkillSpring Portal Architecture & README"
Cohesion: 0.29
Nodes (7): HTML Reporting & Artifacts, SkillSpring Portal Overview, System Architecture Pipeline, Technology Stack Architecture, Mandatory Test Scenarios TC01-TC08, User Navigation Flow, Python Testing Dependencies Spec

### Community 17 - "BCA Capstone Requirements Blueprint"
Cohesion: 0.40
Nodes (4): SkillSpring BCA Capstone Blueprint, Functional Requirements FR-01 to FR-09, Non-Functional Requirements NFR-01 to NFR-05, Site Map and URL Routing

### Community 18 - "Test Execution & Viva Guide"
Cohesion: 0.50
Nodes (4): Cross-Browser Batch Runners, Examiner Verification Criteria, Test Execution & Viva Examiner Guide, Pytest Full HTML Test Execution Report

### Community 19 - "Next.js Framework & Branding"
Cohesion: 0.50
Nodes (4): Next.js Agent Rules & Breaking Changes, Next.js Logo Asset, Vercel Platform Logo Asset, Next.js App Getting Started

### Community 22 - "Failure Screenshot Demo Pipeline"
Cohesion: 0.67
Nodes (3): Intentional Failure Demo Verification, Pytest Failure Screenshot Demo Report, Intentional Failure Verification Screenshot

## Knowledge Gaps
- **24 isolated node(s):** `react-dom`, `@types/node`, `@types/react`, `@types/react-dom`, `typescript` (+19 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 268 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **24 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `BasePage` connect `Base Page Navigation & Tabs` to `os`, `Lesson Progress & Text Verification`, `Quiz Assessment & Filter Actions`, `CourseCataloguePage`, `MyLearningPage`, `DOM Locators & Element Interaction`, `.get_current_url`, `.get_page_title`, `LocalStorage Seeding & Utilities`, `.get_window_handles`, `Course Card Element Retrieval`, `Locked Lesson Sidebar Verification`, `.js_click`, `Screenshot Capture Utility`?**
  _High betweenness centrality (0.159) - this node is a cross-community bridge._
- **Are the 4 inferred relationships involving `CourseCataloguePage` (e.g. with `test_tc01_csv_driven_search()` and `TestCourseSearch`) actually correct?**
  _`CourseCataloguePage` has 4 INFERRED edges - model-reasoned connections that need verification._
- **What connects `react-dom`, `@types/node`, `@types/react` to the rest of the system?**
  _24 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `os` be split into smaller, more focused modules?**
  _Cohesion score 0.059237319511292116 - nodes in this community are weakly interconnected._
- **Why does `CourseCataloguePage` connect `CourseCataloguePage` to `os`, `Quiz Assessment & Filter Actions`, `Base Page Navigation & Tabs`, `DOM Locators & Element Interaction`, `Course Card Element Retrieval`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `LessonPlayerPage` (e.g. with `TestLessonProgress` and `TestLockedLesson`) actually correct?**
  _`LessonPlayerPage` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Should `Course Details Client & Pages` be split into smaller, more focused modules?**
  _Cohesion score 0.07010710808179163 - nodes in this community are weakly interconnected._