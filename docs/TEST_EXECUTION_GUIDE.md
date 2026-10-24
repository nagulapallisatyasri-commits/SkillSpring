# SkillSpring — Test Execution Guide

> **Final-Year BCA Project Quality Assurance Evaluation**  
> **Application:** Next.js Learning Management Portal (`http://localhost:3000`)  
> **Automation Framework:** Python 3, Selenium WebDriver 4, and pytest

---

## 1. Prerequisites

Before running tests, ensure the following are installed on your system:
- **Node.js:** v18 or higher (v20+ recommended)
- **Python:** v3.10 to v3.14
- **Google Chrome** or **Microsoft Edge**

---

## 2. Starting the Application

The web application must be running locally before tests are launched.

### On macOS / Linux
Open a terminal in the project root:
```bash
# 1. Install frontend dependencies (if not already installed)
npm install

# 2. Start the Next.js server
npm run dev
```

### On Windows
Open Command Prompt / PowerShell in the project root:
```cmd
npm run dev
```
*(Or double-click `run_frontend.bat`)*

Verify the portal is accessible by opening:
[http://localhost:3000](http://localhost:3000)

---

## 3. Python Environment Setup

In a **second terminal window**, navigate to the project root:

### On macOS / Linux
```bash
# 1. Activate the virtual environment
source .venv/bin/activate

# (If creating fresh venv: python3 -m venv .venv && source .venv/bin/activate)

# 2. Install Python test dependencies
pip install -r requirements.txt
```

### On Windows
```cmd
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

---

## 4. How to Run Exactly ONE Selected Test Case

To avoid executing the entire test suite on every code edit or during a brief viva demonstration, use the single-test command.

### Recommended Single Smoke Test
- **Target File:** `tests/test_cases/test_ui_smoke.py`
- **Target Test Class:** `TestSkillSpringUISmoke`
- **Target Function:** `test_skillspring_complete_ui_smoke_journey`

### Quick Execution (macOS / Linux Script)
```bash
./run_single_test.sh
```

### Direct Pytest Command (Cross-Platform)
```bash
python3 -m pytest tests/test_cases/test_ui_smoke.py::TestSkillSpringUISmoke::test_skillspring_complete_ui_smoke_journey -v
```

### Running with Explicit Browser Selection
```bash
# On Google Chrome
python3 -m pytest tests/test_cases/test_ui_smoke.py::TestSkillSpringUISmoke::test_skillspring_complete_ui_smoke_journey -v --browser=chrome

# On Microsoft Edge
python3 -m pytest tests/test_cases/test_ui_smoke.py::TestSkillSpringUISmoke::test_skillspring_complete_ui_smoke_journey -v --browser=edge
```

---

## 5. Running the Complete Test Suite (Optional)

Running the full suite executes all active test cases:
```bash
python3 -m pytest tests/test_cases/ -v
```

On Windows, you can also use the included batch files:
- `run_tests_chrome.bat` (executes tests in Google Chrome)
- `run_tests_edge.bat` (executes tests in Microsoft Edge)

---

## 6. Running the Unittest Comparison Test

SkillSpring includes a comparative test suite written using Python's standard `unittest` framework:
```bash
python3 -m unittest tests/archive_tests/test_comparison_unittest.py
```
*(On Windows: `run_unittest.bat`)*

---

## 7. Understanding Test Outputs & Reports

### Console Output
- `.` or `PASSED`: Test assertion succeeded.
- `F` or `FAILED`: Assertion failed or locator timed out.
- `s` or `SKIPPED`: Test intentionally skipped.

### HTML Report
After execution, a styled HTML report is generated at:
`tests/reports/html/report.html`

Open this file in any web browser to view:
- Execution timestamp and test duration
- Environment and browser metadata
- Embedded failure screenshots (if any failure occurred)

### Execution Logs
Detailed WebDriver logs are saved to:
`tests/reports/logs/skillspring_test.log`

---

## 8. Troubleshooting Common Issues

### 1. Connection Refused (`localhost:3000`)
- **Problem:** Selenium throws `WebDriverException: ERR_CONNECTION_REFUSED`.
- **Cause:** The Next.js development server is not running.
- **Fix:** Start the server in another terminal (`npm run dev`) and ensure `http://localhost:3000` is accessible.

### 2. Browser Driver Missing / Incompatible
- **Problem:** `SessionNotCreatedException`.
- **Cause:** Browser binary out of date or incompatible.
- **Fix:** Ensure Google Chrome or Microsoft Edge is updated to a standard release. Selenium 4's built-in Selenium Manager will handle driver binaries automatically.

### 3. Port 3000 In Use
- **Problem:** Next.js uses port 3001 instead of 3000.
- **Cause:** Another node process is occupying port 3000.
- **Fix:**
  - On macOS: `lsof -i :3000` then `kill <PID>`.
  - On Windows: `Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force`.
