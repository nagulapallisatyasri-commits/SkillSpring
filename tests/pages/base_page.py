"""
BasePage
=========
The parent class for every Page Object.

All page classes inherit from BasePage so they automatically get:
  - A reference to the WebDriver
  - Explicit wait helpers  (find, click, type, get_text …)
  - Screenshot helper
  - localStorage helpers for seeding / resetting test state

Students: read through this file to understand the helper methods
before reading the individual page objects.
"""

import logging
import os
import time

from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webdriver import WebDriver
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import TimeoutException, NoSuchElementException

import sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..'))
from tests.config.settings import EXPLICIT_WAIT_TIMEOUT, SCREENSHOT_DIR

logger = logging.getLogger("skillspring")


class BasePage:
    """
    Base class shared by every page object.

    Parameters
    ----------
    driver : WebDriver
        A Selenium WebDriver instance (Chrome or Edge).
    timeout : int
        Maximum seconds to wait for an element (default from settings).
    """

    def __init__(self, driver: WebDriver, timeout: int = EXPLICIT_WAIT_TIMEOUT):
        self.driver = driver
        self.timeout = timeout
        self.wait = WebDriverWait(driver, timeout)

    # ------------------------------------------------------------------
    # Navigation helpers
    # ------------------------------------------------------------------

    def open(self, url: str) -> None:
        """Navigate the browser to the given URL."""
        logger.debug(f"Navigating to: {url}")
        self.driver.get(url)

    def get_current_url(self) -> str:
        """Return the URL currently shown in the browser."""
        return self.driver.current_url

    def get_page_title(self) -> str:
        """Return the <title> of the current page."""
        return self.driver.title

    # ------------------------------------------------------------------
    # Element-finding helpers
    # ------------------------------------------------------------------

    def find(self, by: str, value: str) -> WebElement:
        """
        Wait for an element to be visible, then return it.

        Example:
            search_box = self.find(By.ID, "search-input")
        """
        logger.debug(f"Waiting for element: {by}={value!r}")
        return self.wait.until(
            EC.visibility_of_element_located((by, value)),
            message=f"Element not visible after {self.timeout}s: {by}={value!r}"
        )

    def find_clickable(self, by: str, value: str) -> WebElement:
        """Wait for an element to be clickable, then return it."""
        return self.wait.until(
            EC.element_to_be_clickable((by, value)),
            message=f"Element not clickable after {self.timeout}s: {by}={value!r}"
        )

    def find_all(self, by: str, value: str) -> list:
        """
        Wait for at least one matching element, then return all of them.
        Returns an empty list if none are found within the timeout.
        """
        try:
            self.wait.until(EC.presence_of_element_located((by, value)))
            return self.driver.find_elements(by, value)
        except TimeoutException:
            return []

    def is_visible(self, by: str, value: str, timeout: int = 3) -> bool:
        """
        Return True if the element appears within `timeout` seconds.
        Returns False instead of raising an exception.
        """
        try:
            WebDriverWait(self.driver, timeout).until(
                EC.visibility_of_element_located((by, value))
            )
            return True
        except TimeoutException:
            return False

    def is_present(self, by: str, value: str, timeout: int = 3) -> bool:
        """Return True if the element is in the DOM (may not be visible)."""
        try:
            WebDriverWait(self.driver, timeout).until(
                EC.presence_of_element_located((by, value))
            )
            return True
        except TimeoutException:
            return False

    # ------------------------------------------------------------------
    # Interaction helpers
    # ------------------------------------------------------------------

    def click(self, by: str, value: str) -> None:
        """Wait for an element to be clickable, then click it."""
        element = self.find_clickable(by, value)
        logger.debug(f"Clicking element: {by}={value!r}")
        element.click()

    def type_text(self, by: str, value: str, text: str) -> None:
        """Clear an input field and type new text into it."""
        element = self.find(by, value)
        element.clear()
        logger.debug(f"Typing '{text}' into: {by}={value!r}")
        element.send_keys(text)

    def get_text(self, by: str, value: str) -> str:
        """Return the visible text of an element."""
        return self.find(by, value).text.strip()

    def get_attribute(self, by: str, value: str, attribute: str) -> str:
        """Return the value of an HTML attribute on an element."""
        return self.find(by, value).get_attribute(attribute) or ""

    def is_element_enabled(self, by: str, value: str) -> bool:
        """Return True if the element is enabled (not disabled)."""
        element = self.find(by, value)
        return element.is_enabled()

    def wait_for_text_in_element(self, by: str, value: str, text: str) -> None:
        """Block until an element contains the expected text."""
        self.wait.until(
            EC.text_to_be_present_in_element((by, value), text),
            message=f"Text '{text}' not found in {by}={value!r} after {self.timeout}s"
        )

    def wait_for_url_contains(self, fragment: str) -> None:
        """Block until the current URL contains the given string."""
        self.wait.until(
            EC.url_contains(fragment),
            message=f"URL did not contain '{fragment}' after {self.timeout}s"
        )

    # ------------------------------------------------------------------
    # JavaScript helpers
    # ------------------------------------------------------------------

    def js_click(self, by: str, value: str) -> None:
        """
        Click an element using JavaScript.
        Useful for elements that are technically clickable but blocked
        by overlapping elements (e.g., disabled buttons in some browsers).
        """
        element = self.find(by, value)
        self.driver.execute_script("arguments[0].click();", element)

    def js_set_local_storage(self, key: str, value: str) -> None:
        """Write a value into the browser's localStorage."""
        self.driver.execute_script(
            f"window.localStorage.setItem('{key}', '{value}');"
        )

    def js_get_local_storage(self, key: str) -> str:
        """Read a value from the browser's localStorage."""
        result = self.driver.execute_script(
            f"return window.localStorage.getItem('{key}');"
        )
        return result or ""

    def js_clear_local_storage(self) -> None:
        """Remove all SkillSpring keys from localStorage to reset state."""
        self.driver.execute_script("""
            const keys = ['skillspring_enrolled_courses',
                          'skillspring_completed_lessons',
                          'skillspring_enrolment_dates'];
            keys.forEach(k => window.localStorage.removeItem(k));
        """)
        logger.debug("Cleared SkillSpring localStorage")

    def seed_enrolment(self, course_id: str) -> None:
        """
        Enrol in a course by writing directly to localStorage.
        This is faster and more reliable than clicking through the UI
        when we just need pre-conditions for another test.
        """
        import json
        raw = self.js_get_local_storage("skillspring_enrolled_courses")
        existing = json.loads(raw) if raw else []
        if course_id not in existing:
            existing.append(course_id)
        self.js_set_local_storage(
            "skillspring_enrolled_courses", json.dumps(existing)
        )
        logger.debug(f"Seeded enrolment for course: {course_id}")

    def seed_lesson_complete(self, course_id: str, lesson_id: str) -> None:
        """
        Mark a lesson as complete in localStorage directly.
        Used in TC07 to set up 50% progress without going through the UI.
        """
        import json
        raw = self.js_get_local_storage("skillspring_completed_lessons")
        mapping = json.loads(raw) if raw else {}
        lessons = mapping.get(course_id, [])
        if lesson_id not in lessons:
            lessons.append(lesson_id)
        mapping[course_id] = lessons
        self.js_set_local_storage(
            "skillspring_completed_lessons", json.dumps(mapping)
        )
        logger.debug(f"Seeded lesson complete: {course_id}/{lesson_id}")

    # ------------------------------------------------------------------
    # Window / tab helpers
    # ------------------------------------------------------------------

    def get_window_handles(self) -> list:
        """Return a list of all open browser window handles."""
        return self.driver.window_handles

    def switch_to_new_tab(self, original_handle: str) -> str:
        """
        Wait for a second tab to open, switch to it, and return its handle.

        Usage:
            original = driver.current_window_handle
            # ... click link that opens a new tab ...
            new_handle = page.switch_to_new_tab(original)
            # ... do stuff in the new tab ...
            driver.close()
            driver.switch_to.window(original)
        """
        self.wait.until(
            lambda d: len(d.window_handles) > 1,
            message="New tab did not open within the timeout"
        )
        for handle in self.driver.window_handles:
            if handle != original_handle:
                self.driver.switch_to.window(handle)
                logger.debug(f"Switched to new tab: {handle}")
                return handle
        raise RuntimeError("Could not locate the new browser tab handle")

    def close_current_tab_and_return(self, original_handle: str) -> None:
        """Close the active tab and switch back to the original one."""
        self.driver.close()
        self.driver.switch_to.window(original_handle)
        logger.debug(f"Closed tab; returned to: {original_handle}")

    # ------------------------------------------------------------------
    # Screenshot helper
    # ------------------------------------------------------------------

    def take_screenshot(self, filename: str) -> str:
        """
        Save a screenshot as a PNG file.

        Parameters
        ----------
        filename : str
            A descriptive name (without extension), e.g. 'tc01_search_failure'.

        Returns
        -------
        str
            The full path to the saved file.
        """
        os.makedirs(SCREENSHOT_DIR, exist_ok=True)
        timestamp = time.strftime("%Y%m%d_%H%M%S")
        path = os.path.join(SCREENSHOT_DIR, f"{filename}_{timestamp}.png")
        self.driver.save_screenshot(path)
        logger.info(f"Screenshot saved: {path}")
        return path
