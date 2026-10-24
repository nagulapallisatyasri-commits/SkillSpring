"""
conftest.py — Shared pytest fixtures
======================================
This file is automatically picked up by pytest.
Fixtures defined here are available to every test file without imports.

Key fixtures:
  driver   — sets up and tears down a WebDriver for each test.
              Also saves a screenshot if the test fails.
"""

import base64
import json
import logging
import os
import sys
import time

import pytest
from pytest_html import extras

# Make the project root importable so "from tests.config..." works
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from tests.config.driver_factory import DriverFactory
from tests.config.settings import BASE_URL, BROWSER, SCREENSHOT_DIR, LOG_FILE


# ======================================================================
# Logging setup
# ======================================================================

def _setup_logging():
    """Configure a file logger AND a coloured console logger."""
    os.makedirs(os.path.dirname(LOG_FILE), exist_ok=True)

    root_logger = logging.getLogger("skillspring")
    root_logger.setLevel(logging.DEBUG)

    if root_logger.handlers:
        return   # already configured

    fmt = logging.Formatter(
        "%(asctime)s [%(levelname)-8s] %(message)s",
        datefmt="%H:%M:%S"
    )

    # File handler — full DEBUG-level log
    fh = logging.FileHandler(LOG_FILE, encoding="utf-8")
    fh.setLevel(logging.DEBUG)
    fh.setFormatter(fmt)
    root_logger.addHandler(fh)

    # Console handler — INFO and above
    ch = logging.StreamHandler(sys.stdout)
    ch.setLevel(logging.INFO)
    ch.setFormatter(fmt)
    root_logger.addHandler(ch)


_setup_logging()
logger = logging.getLogger("skillspring")


# ======================================================================
# CLI options and Metadata hooks (Task 5.2 & Task 5.3)
# ======================================================================

def pytest_addoption(parser):
    """Register custom command-line options."""
    parser.addoption(
        "--browser",
        action="store",
        default=None,
        help="Target browser for tests: 'chrome' or 'edge'"
    )


def pytest_configure(config):
    """Enrich the pytest-html report header with project metadata."""
    if hasattr(config, "_metadata"):
        config._metadata["Project Name"] = "SkillSpring - Learning Management Portal"
        config._metadata["Application URL"] = BASE_URL
        config._metadata["Test Automation"] = "Selenium WebDriver 4 + pytest"
        config._metadata["Browsers Supported"] = "Google Chrome, Microsoft Edge"


@pytest.fixture(scope="session")
def browser_name(request):
    """
    Determine the browser to use.
    Precedence:
      1. --browser command-line option
      2. SELENIUM_BROWSER environment variable
      3. BROWSER constant in tests/config/settings.py (defaults to 'chrome')
    """
    cli_val = request.config.getoption("--browser")
    if cli_val:
        return cli_val.lower()
    return os.environ.get("SELENIUM_BROWSER", BROWSER).lower()


# ======================================================================
# Helper — clear SkillSpring localStorage via JavaScript
# ======================================================================

def _clear_skillspring_storage(driver):
    """Remove all SkillSpring keys from the browser's localStorage."""
    driver.execute_script("""
        const keys = ['skillspring_enrolled_courses',
                      'skillspring_completed_lessons',
                      'skillspring_enrolment_dates'];
        keys.forEach(function(k){ window.localStorage.removeItem(k); });
    """)


# ======================================================================
# Core fixture:  driver
# ======================================================================

@pytest.fixture(scope="function")
def driver(request, browser_name):
    """
    Create a WebDriver for the specified browser (Chrome or Edge),
    navigate to the base URL, and yield it to the test.

    Teardown cleans up the browser process.
    """
    logger.info("=" * 60)
    logger.info(f"TEST START : {request.node.name} [Browser: {browser_name}]")
    logger.info("=" * 60)

    web_driver = DriverFactory.create_driver(browser_name)
    web_driver.get(BASE_URL)

    # Attach driver to request.node so makereport hook can access it on failure
    request.node.driver = web_driver

    # Clear any leftover state from previous runs
    _clear_skillspring_storage(web_driver)

    yield web_driver   # ← test body runs here

    logger.info(f"TEST END   : {request.node.name}")
    web_driver.quit()


# ======================================================================
# Hook: capture pass/fail status and attach failure screenshots to HTML report
# ======================================================================

@pytest.hookimpl(hookwrapper=True)
def pytest_runtest_makereport(item, call):
    """
    Store the test result on the item node, and on failure:
      1. Save a timestamped screenshot PNG to tests/screenshots/.
      2. Embed the screenshot into the pytest-html report via rep.extras.
    """
    outcome = yield
    rep = outcome.get_result()
    setattr(item, f"rep_{rep.when}", rep)

    if rep.when == "call" and rep.failed:
        web_driver = getattr(item, "driver", None)
        if web_driver is None:
            # Fallback to checking funcargs
            web_driver = item.funcargs.get("driver") or item.funcargs.get("seeded_driver")

        if web_driver:
            os.makedirs(SCREENSHOT_DIR, exist_ok=True)
            timestamp = time.strftime("%Y%m%d_%H%M%S")
            safe_name = "".join(
                c if c.isalnum() or c in "_-" else "_"
                for c in item.name
            )
            filename = f"FAIL_{safe_name}_{timestamp}.png"
            path = os.path.join(SCREENSHOT_DIR, filename)

            try:
                web_driver.save_screenshot(path)
                logger.warning(f"Failure screenshot captured: {path}")

                # Attach to HTML report using pytest-html 4.x extras
                report_extras = getattr(rep, "extras", [])
                with open(path, "rb") as img_file:
                    encoded = base64.b64encode(img_file.read()).decode("utf-8")
                report_extras.append(extras.image(encoded, name=f"Screenshot: {safe_name}"))
                report_extras.append(extras.html(f'<p><strong>Screenshot Path:</strong> <code>{path}</code></p>'))
                rep.extras = report_extras
            except Exception as exc:
                logger.error(f"Could not capture screenshot: {exc}")



# ======================================================================
# Optional fixture:  seeded_driver
# ======================================================================

@pytest.fixture
def seeded_driver(driver, request):
    """
    A driver fixture that pre-seeds sample enrolments in localStorage.

    Used by tests that require courses to already be enrolled
    (e.g. TC07 which reads the My Learning table).
    """
    # Ensure request.node.driver is set for screenshot hook
    request.node.driver = driver

    enrolled = ["python-automation", "web-dev-basics", "react-deep-dive"]
    driver.execute_script(
        "window.localStorage.setItem('skillspring_enrolled_courses', arguments[0]);",
        json.dumps(enrolled)
    )
    # 50% progress on web-dev-basics (1 of 2 lessons done)
    completed = {
        "web-dev-basics": ["lesson-1-react-foundations"]
    }
    driver.execute_script(
        "window.localStorage.setItem('skillspring_completed_lessons', arguments[0]);",
        json.dumps(completed)
    )
    # Reload so React reads the seeded state
    driver.refresh()
    return driver

