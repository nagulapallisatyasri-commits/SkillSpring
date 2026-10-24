"""
DriverFactory
=============
Creates a configured Chrome or Edge WebDriver instance.

Usage example:
    from tests.config.driver_factory import DriverFactory
    driver = DriverFactory.create_driver()
    driver.get("http://localhost:3000")
    driver.quit()
"""

from selenium import webdriver
from selenium.webdriver.chrome.options import Options as ChromeOptions
from selenium.webdriver.edge.options import Options as EdgeOptions

# Import settings from our central configuration file
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..'))
from tests.config.settings import BROWSER, HEADLESS


class DriverFactory:
    """Factory that builds a WebDriver for Chrome or Edge."""

    @staticmethod
    def create_driver(browser_override: str = None):
        """
        Create and return a WebDriver instance for Chrome or Edge.

        Parameters
        ----------
        browser_override : str, optional
            Explicit browser to launch ('chrome' or 'edge'). If None,
            the BROWSER setting (or SELENIUM_BROWSER env var) is used.

        Selenium 4 includes its own Selenium Manager which automatically
        downloads the correct ChromeDriver / msedgedriver — no manual
        driver installation is needed.
        """
        browser = (browser_override or BROWSER).lower()


        if browser == "chrome":
            options = ChromeOptions()
            # Always disable the 'Chrome is being controlled' info bar
            options.add_experimental_option("excludeSwitches", ["enable-automation"])
            options.add_experimental_option("useAutomationExtension", False)
            # Extra flags to keep Chrome stable in automation
            options.add_argument("--no-sandbox")
            options.add_argument("--disable-dev-shm-usage")
            options.add_argument("--disable-gpu")
            options.add_argument("--window-size=1400,900")

            if HEADLESS:
                options.add_argument("--headless=new")  # Selenium 4 headless mode

            driver = webdriver.Chrome(options=options)

        elif browser == "edge":
            options = EdgeOptions()
            options.add_argument("--no-sandbox")
            options.add_argument("--disable-dev-shm-usage")
            options.add_argument("--window-size=1400,900")

            if HEADLESS:
                options.add_argument("--headless=new")

            driver = webdriver.Edge(options=options)

        else:
            raise ValueError(
                f"Unsupported browser '{browser}'. "
                "Update BROWSER in tests/config/settings.py to 'chrome' or 'edge'."
            )

        # Implicit wait of 0 — we use explicit waits everywhere instead
        driver.implicitly_wait(0)
        return driver
