"""
TC04 — Open Course Details in a New Tab, Validate Page, and Return
=====================================================================
Test ID : TC04
Objective: Demonstrate multi-window Selenium automation:
  • Record the original window handle.
  • Click a "New Tab" link that opens course details in a second tab.
  • Switch to the new tab and validate the DOM.
  • Close the new tab and switch back.
  • Confirm the original window is active.

Steps:
  1. Navigate to the Catalogue (/).
  2. Record original_window = driver.current_window_handle.
  3. Assert only 1 window handle exists.
  4. Click [data-testid="open-tab-react-deep-dive"].
  5. Wait until len(driver.window_handles) == 2.
  6. Switch to the new window handle.
  7. Assert URL contains "/courses/react-deep-dive".
  8. Assert #course-header is visible.
  9. Close new tab.
  10. Switch back to original_window.
  11. Assert #search-input is visible (catalogue is active).
"""

import logging
import os
import sys

import pytest
from selenium.webdriver.common.by import By

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from tests.pages.course_catalogue_page import CourseCataloguePage
from tests.pages.course_details_page import CourseDetailsPage
from tests.data.test_data import NEW_TAB_COURSE_ID

logger = logging.getLogger("skillspring")


class TestNewTab:
    """TC04: Multi-tab browser context switching."""

    @pytest.mark.tc04
    @pytest.mark.smoke
    def test_tc04_open_course_in_new_tab_and_return(self, driver):
        """
        TC04 — Click 'New Tab ↗' on the react-deep-dive card, verify the
        course details page in the new tab, close it, and return to the catalogue.
        """
        logger.info("TC04: Opening catalogue page")
        catalogue = CourseCataloguePage(driver)
        catalogue.open_catalogue()

        # ---- Step 1: Record original window ----
        original_window = driver.current_window_handle
        initial_count   = len(driver.window_handles)
        logger.info(f"TC04: Original window handle = {original_window}")
        assert initial_count == 1, (
            f"Expected 1 window before clicking New Tab, got {initial_count}"
        )

        # ---- Step 2: Click the "New Tab" link ----
        logger.info(f"TC04: Clicking New Tab link for course '{NEW_TAB_COURSE_ID}'")
        new_tab_link = catalogue.get_open_new_tab_link(NEW_TAB_COURSE_ID)
        new_tab_link.click()

        # ---- Step 3: Wait for the second tab ----
        new_handle = catalogue.switch_to_new_tab(original_window)
        logger.info(f"TC04: Switched to new tab handle = {new_handle}")

        # ---- Step 4: Validate URL in the new tab ----
        current_url = driver.current_url
        logger.info(f"TC04: New tab URL = {current_url}")
        assert f"/courses/{NEW_TAB_COURSE_ID}" in current_url, (
            f"Expected URL to contain '/courses/{NEW_TAB_COURSE_ID}', "
            f"got: {current_url!r}"
        )

        # ---- Step 5: Validate #course-header is visible ----
        details = CourseDetailsPage(driver)
        assert details.is_visible(By.ID, "course-header", timeout=8), (
            "Expected #course-header to be visible in the new tab, but it was not."
        )
        logger.info("TC04: #course-header is visible in new tab.")

        # ---- Step 6: Close the new tab ----
        catalogue.close_current_tab_and_return(original_window)
        logger.info("TC04: New tab closed; returned to original window.")

        # ---- Step 7: Verify we are back on the catalogue ----
        assert driver.current_window_handle == original_window, (
            "Expected to be back on the original window handle."
        )
        assert len(driver.window_handles) == 1, \
            f"Expected 1 window after closing new tab, got {len(driver.window_handles)}"

        # Search box must be visible (confirms we are on the catalogue)
        assert catalogue.is_visible(*CourseCataloguePage.SEARCH_INPUT, timeout=5), (
            "Expected #search-input to be visible after returning to the catalogue."
        )
        logger.info("TC04: PASSED — successfully switched tabs and returned.")

    @pytest.mark.tc04
    def test_tc04_new_tab_link_from_course_details_page(self, driver):
        """
        TC04 supplement — The Course Details page itself also has an
        'Open in New Tab' link (#link-new-tab). Verify it works.
        """
        logger.info("TC04-b: Testing 'Open in New Tab' from the Course Details page")
        details = CourseDetailsPage(driver)
        details.open_course(NEW_TAB_COURSE_ID)

        original_window = driver.current_window_handle
        link = details.get_open_in_new_tab_link()
        link.click()

        # Switch and verify
        new_handle = details.switch_to_new_tab(original_window)
        assert f"/courses/{NEW_TAB_COURSE_ID}" in driver.current_url, \
            f"New tab URL unexpected: {driver.current_url}"

        # Validate course title visible in new tab
        title_text = details.get_course_title()
        assert "React" in title_text, (
            f"Expected 'React' in course title in new tab, got: {title_text!r}"
        )

        # Clean up
        details.close_current_tab_and_return(original_window)
        logger.info("TC04-b: PASSED.")
