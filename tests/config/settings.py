"""
SkillSpring Test Configuration
================================
Central settings for browser, URLs, and timeouts.
Edit this file to switch between headless and visible mode,
change the base URL, or target a different browser.
"""

import os

# ------------------------------------------------------------------
# Application URL
# ------------------------------------------------------------------
BASE_URL = os.environ.get("SKILLSPRING_BASE_URL", "http://localhost:3000")

# ------------------------------------------------------------------
# Browser selection  ("chrome" or "edge")
# Controlled by SELENIUM_BROWSER env var or defaults to "chrome"
# ------------------------------------------------------------------
BROWSER = os.environ.get("SELENIUM_BROWSER", "chrome").lower()

# ------------------------------------------------------------------
# Run the browser without a visible window?
# True  = headless (faster, good for CI)
# False = visible window (better for demos and debugging)
# ------------------------------------------------------------------
HEADLESS = os.environ.get("SELENIUM_HEADLESS", "false").lower() in ("1", "true", "yes")

# ------------------------------------------------------------------
# How many seconds to wait for an element before failing
# ------------------------------------------------------------------
EXPLICIT_WAIT_TIMEOUT = int(os.environ.get("SELENIUM_TIMEOUT", "10"))   # seconds

# ------------------------------------------------------------------
# Screenshot directory (relative to project root)
# ------------------------------------------------------------------
SCREENSHOT_DIR = "tests/screenshots"

# ------------------------------------------------------------------
# Log file location
# ------------------------------------------------------------------
LOG_FILE = "tests/reports/logs/skillspring_test.log"

