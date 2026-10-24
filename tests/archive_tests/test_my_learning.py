"""
TC07 — Traverse My Learning Table with XPath and Verify Status + Progress
===========================================================================
Test ID : TC07
Objective: Demonstrate XPath-based table traversal by locating a row
           through its course title cell and reading adjacent cells.

Precondition (seeded by seeded_driver fixture):
  • web-dev-basics is enrolled with lesson-1-react-foundations complete → 50%

Steps:
  1. Use the seeded_driver fixture (pre-loaded localStorage).
  2. Navigate to /my-learning.
  3. Assert #my-learning-table is visible.
  4. Use XPath to locate the row where .course-title contains "Full-Stack Web".
  5. From that row, read the .course-status cell text.
  6. Assert status text == "In Progress".
  7. From that row, read the .course-progress cell text.
  8. Assert progress contains "50".
"""

import logging
import os
import sys

import pytest
from selenium.webdriver.common.by import By

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from tests.pages.my_learning_page import MyLearningPage
from tests.data.test_data import (
    TC07_COURSE_TITLE,
    TC07_EXPECTED_STATUS,
    TC07_EXPECTED_PROGRESS_CONTAINS,
)

logger = logging.getLogger("skillspring")


class TestMyLearningTable:
    """TC07: My Learning table traversal using XPath."""

    @pytest.mark.tc07
    @pytest.mark.smoke
    def test_tc07_table_has_enrolled_courses(self, seeded_driver):
        """
        TC07 — Navigate to My Learning, confirm the table is visible,
        and verify web-dev-basics shows 'In Progress' at 50% via XPath.

        Uses the seeded_driver fixture which pre-populates localStorage so
        the test does not depend on TC02 having run first.
        """
        logger.info("TC07: Opening My Learning (pre-seeded state)")
        page = MyLearningPage(seeded_driver)
        page.open_my_learning()

        # ---- Step 1: Table must be visible ----
        assert page.is_table_visible(), (
            "#my-learning-table should be visible when courses are enrolled."
        )
        logger.info("TC07: Table is visible.")

        # ---- Step 2: Locate row by title using XPath ----
        logger.info(f"TC07: Locating row with title '{TC07_COURSE_TITLE}' via XPath")
        row = page.get_row_by_title(TC07_COURSE_TITLE)
        assert row is not None, (
            f"Could not find a table row whose .course-title contains "
            f"'{TC07_COURSE_TITLE}'"
        )
        logger.info("TC07: Row located via XPath.")

        # ---- Step 3: Verify status cell ----
        actual_status = page.get_cell_text_in_row(row, "course-status")
        logger.info(
            f"TC07: Status cell = '{actual_status}' "
            f"(expected '{TC07_EXPECTED_STATUS}')"
        )
        assert actual_status == TC07_EXPECTED_STATUS, (
            f"Expected status '{TC07_EXPECTED_STATUS}' but got '{actual_status}'"
        )

        # ---- Step 4: Verify progress cell contains "50" ----
        actual_progress = page.get_cell_text_in_row(row, "course-progress")
        logger.info(
            f"TC07: Progress cell = '{actual_progress}' "
            f"(expected to contain '{TC07_EXPECTED_PROGRESS_CONTAINS}')"
        )
        assert TC07_EXPECTED_PROGRESS_CONTAINS in actual_progress, (
            f"Expected progress to contain '{TC07_EXPECTED_PROGRESS_CONTAINS}' "
            f"but got: '{actual_progress}'"
        )

        logger.info("TC07: PASSED — table traversal and values verified.")

    @pytest.mark.tc07
    def test_tc07_data_testid_locators_also_work(self, seeded_driver):
        """
        TC07 supplement — Confirm data-testid locators (the alternative to XPath)
        also return the correct status and progress values.
        """
        logger.info("TC07-b: Using data-testid locators to verify same values")
        page = MyLearningPage(seeded_driver)
        page.open_my_learning()

        course_id = "web-dev-basics"

        status = page.get_course_status(course_id)
        assert status == TC07_EXPECTED_STATUS, \
            f"Status mismatch via testid locator: {status!r}"

        progress = page.get_course_progress(course_id)
        assert TC07_EXPECTED_PROGRESS_CONTAINS in progress, \
            f"Progress mismatch via testid locator: {progress!r}"

        logger.info("TC07-b: PASSED.")

    @pytest.mark.tc07
    def test_tc07_all_seeded_courses_present(self, seeded_driver):
        """
        TC07 supplement — All three pre-seeded courses must appear in the table.
        """
        logger.info("TC07-c: Verifying all seeded courses present in table")
        page = MyLearningPage(seeded_driver)
        page.open_my_learning()

        for course_id in ["python-automation", "web-dev-basics", "react-deep-dive"]:
            assert page.is_course_row_present(course_id), (
                f"Expected row for '{course_id}' in My Learning table "
                f"but it was not found."
            )
            logger.info(f"TC07-c: Row found for '{course_id}'")

        logger.info("TC07-c: PASSED — all seeded courses present.")
