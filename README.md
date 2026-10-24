# SkillSpring — Learning Management Portal

> **Final-Year BCA Capstone Project**  
> **Student Developer:** KK (BCA Final-Year)  
> **Tagline:** *Learn Today. Build Tomorrow.*  
> **Evaluation Focus:** Modern Frontend Engineering (Next.js 16 + React 19) & Automated QA Testing (Selenium WebDriver 4 + pytest)

---

## 1. Project Overview & Purpose

**SkillSpring** is an educational Learning Management Portal developed as a final-year BCA capstone project. It serves two distinct purposes:

1. **Academic Demonstration of Modern Frontend Architecture:**  
   Built with **Next.js 16**, **React 19**, **TypeScript**, and a custom **Vanilla CSS** design system. Features an engaging hero section, an educational track carousel, a 24-course catalogue across 8 tech domains, an interactive split-column course curriculum player, and a comprehensive student dashboard.

2. **Enterprise-Grade Test Automation Testbed:**  
   Specifically constructed to validate software quality assurance principles. Using **Python 3**, **Selenium WebDriver 4**, and **pytest**, the suite automates complex end-to-end browser workflows adhering to the industry-standard **Page Object Model (POM)** pattern.

---

## 2. Problem Statement & Objectives

### Problem Statement
Standard web portals often face challenges with flakiness during automated testing when reliant on complex, fluctuating external databases or third-party APIs. In academic QA demonstrations, tests often fail due to network instability rather than frontend regressions.

### Objectives
- Create a responsive, accessible learning portal with zero external database dependencies.
- Manage student state (enrolments, progress, quiz results) deterministically in client-side `localStorage`.
- Implement automated QA testing with Selenium WebDriver 4 adhering to the Page Object Model.
- Provide a simple **single-test execution** workflow allowing examiners to verify critical end-to-end flows in seconds.
- Automatically generate self-contained HTML execution reports with failure screenshots and metadata.

---

## 3. Technologies Used

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| **Frontend Framework** | Next.js | 16.4.2 | App Router, SSR, hydration, accessible routing |
| **UI Library** | React | 19.3.0 | Modern declarative UI component architecture |
| **Type Safety** | TypeScript | 5.x | Strict type safety for data models and components |
| **Styling** | Vanilla CSS | CSS3 | Custom Blue-and-White theme tokens and responsive layouts |
| **Test Automation** | Selenium WebDriver | 4.51.0 | W3C standard browser automation |
| **Test Runner** | pytest | 9.1.1 | Discovery, fixtures, execution engine |
| **HTML Reporting** | pytest-html | 4.2.0 | Formatted visual test reports (`report.html`) |
| **Alternative Runner** | unittest | Standard Lib | Comparative object-oriented test demonstration |

---

## 4. Actual Project Folder Structure

The project has been cleaned and restructured with the Next.js application at the root directory:

```text
SkillSpring/
├── src/                                     # Next.js Application Source Code
│   ├── app/                                 # App Router Pages & Layouts
│   │   ├── layout.tsx                       # Root layout with Navbar & Footer
│   │   ├── page.tsx                         # Course Catalogue & Search Filter
│   │   ├── globals.css                      # Global design system & theme tokens
│   │   ├── courses/                         # Course Details routes
│   │   │   └── [id]/page.tsx                # Split-view curriculum & enrolment
│   │   ├── my-learning/page.tsx             # Student learning dashboard
│   │   └── learn/[courseId]/                # Modular lesson player & quiz engine
│   ├── components/                          # Reusable UI components (Navbar, CourseCard, Footer)
│   ├── data/mockCourses.ts                  # Curated 24-course deterministic dataset
│   └── utils/storage.ts                     # LocalStorage persistence helpers
├── public/                                  # Static assets (illustrations, course icons)
├── tests/                                   # Python Selenium QA Automation Framework
│   ├── config/                              # settings.py, driver_factory.py
│   ├── pages/                               # Page Object Model classes
│   ├── test_cases/                          # Active test suites (test_ui_smoke.py)
│   ├── archive_tests/                       # Historical individual test cases
│   ├── data/                                # search_data.csv, quiz_data.json
│   ├── screenshots/                         # Timestamped failure screenshots
│   ├── reports/html/                        # Self-contained HTML test reports
│   └── conftest.py                          # Pytest fixtures and screenshot hooks
├── docs/                                    # Academic & Technical Documentation
│   ├── PROJECT_DOCUMENTATION.md             # Complete project submission document
│   ├── TEST_EXECUTION_GUIDE.md              # Test execution steps for examiners
│   ├── USER_MANUAL.md                       # Application user manual
│   └── PROJECT_PLAN.md                      # Detailed technical specifications
├── run_single_test.sh                       # Quick-run shell script for single smoke test
├── run_frontend.bat                         # Windows frontend launcher
├── run_tests_chrome.bat                     # Windows Chrome test launcher
├── run_tests_edge.bat                       # Windows Edge test launcher
├── run_unittest.bat                         # Windows unittest comparison launcher
├── package.json                             # Node.js dependencies & scripts
├── tsconfig.json                            # TypeScript configuration
├── next.config.ts                           # Next.js compiler settings
├── pytest.ini                               # Pytest configuration & markers
├── requirements.txt                         # Python testing dependencies
└── README.md                                # Master project overview
```

---

## 5. Existing Features

- 🌟 **Modern Hero Composition:** Visual programming branding with active enrollment badges and statistics.
- 🔄 **Promotional Banner Carousel:** Highlighting Web Development, Programming, Data Science, AI, and Career Skills.
- 📚 **Expanded 24-Course Catalogue:** Across 8 domains (Programming, Web Dev, Databases, Data Science, Testing, AI, Fundamentals, Career).
- 🔍 **Real-Time Search & Filtering:** Dynamic search by course title, instructor, and description with category and difficulty filters.
- 🧭 **Course Details Split Layout:**
  - **Left Sidebar:** Sticky curriculum hierarchy with expandable modules, lesson statuses, lock indicators, and progress tracking.
  - **Right Content Area:** Course overview, instructor profile, real-time seat availability badge, and learning objectives.
- 📝 **Course Enrolment Logic:** One-click registration with dynamic seat decrementation and defensive rejection for full courses.
- 📊 **Student Dashboard (`/my-learning`):** Summary KPI cards, Continue Learning resume cards, bookmarks, and detailed summary data table.
- 📖 **Interactive Lesson Player:** Formatted lesson text, code snippets, takeaways, and "Mark as Complete" progress advancement.
- 🎯 **Interactive Quiz Engine:** Multi-question assessment with instant scoring, passing/failing status banners, and detailed explanations.
- 🔒 **Gated Lesson Protection:** Lock icons and defensive warning banners blocking uncompleted prerequisite modules.

---

## 6. System Requirements & macOS Setup Instructions

### System Requirements
- **macOS** (Apple Silicon or Intel) or **Windows 10/11**
- **Node.js:** v18.0.0 or higher (v20+ recommended)
- **Python:** v3.10 to v3.14
- **Google Chrome** or **Microsoft Edge**

### Step-by-Step macOS Execution

#### Step 1: Install Dependencies & Start the Application
Open your macOS Terminal at the project root:
```bash
# Verify Node and npm
node -v
npm -v

# Install dependencies
npm install

# Start the Next.js development server
npm run dev
```
The application will start at: **`http://localhost:3000`**

#### Step 2: Set Up Python Virtual Environment
Open a **second terminal window** at the project root:
```bash
# Create and activate virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install test dependencies
pip install -r requirements.txt
```

---

## 7. How to Run Only ONE Selected Test Case

To avoid executing the entire test suite every time, run the single primary smoke test:

### Using the macOS/Linux Script
```bash
./run_single_test.sh
```

### Using Direct Pytest Command
```bash
python3 -m pytest tests/test_cases/test_ui_smoke.py::TestSkillSpringUISmoke::test_skillspring_complete_ui_smoke_journey -v
```

### Verified Single Test Run Details
- **Test Case:** `test_skillspring_complete_ui_smoke_journey`
- **Scope:** Verifies homepage opening, brand identity, course catalogue rendering, opening course details, verifying the curriculum hierarchy sidebar, checking course metadata, and navigating to an individual lesson.
- **Browser:** Google Chrome (Headless via Selenium 4)
- **Result:** **PASSED (100%) in 2.50s**
- **Report Generated:** `tests/reports/html/report.html`

---

## 8. Optional: Running Full Suite & Unittest

### Running Full Test Suite (Optional)
```bash
python3 -m pytest tests/test_cases/ -v
```

### Running Unittest Comparison
```bash
python3 -m unittest tests/archive_tests/test_comparison_unittest.py
```

---

## 9. Troubleshooting

1. **Permission Denied (`node_modules/.bin/next`):**  
   Occurs if executables lack execute flags after cloning. Fix with:  
   `chmod +x node_modules/.bin/*`
2. **Port 3000 In Use:**  
   Find and terminate the process holding port 3000:  
   `lsof -i :3000` then `kill <PID>`
3. **Selenium WebDriver ERR_CONNECTION_REFUSED:**  
   Ensure the frontend development server (`npm run dev`) is actively running in another terminal window before starting tests.

---

## 10. Project Limitations & Future Enhancements

### Limitations
- **Client-Side Persistence:** State is stored in browser `localStorage`.
- **Simulated Authentication:** No external user directory or OAuth backend.
- **No Database Server:** Eliminating external databases guarantees portability across exam machines, but limits multi-user concurrent data sharing.

### Future Enhancements
- Integration of a dedicated Node.js/Express backend with MongoDB.
- Role-based access control with NextAuth.js.
- Embedded interactive code runner for in-browser coding practice.

---

## 11. Conclusion

SkillSpring demonstrates a full-stack educational web application integrated with an enterprise-grade automated testing framework. By combining Next.js 16, React 19, and Selenium WebDriver 4 with the Page Object Model, the project delivers a reliable, verifiable capstone project suitable for BCA final-year academic evaluation.
