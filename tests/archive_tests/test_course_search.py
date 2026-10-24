"""
TC01 — Search for a Course and Verify Matching Course and Level
================================================================
Test ID : TC01
Objective: Verify that typing "Python" in the search box filters the
           course list and shows the correct title and difficulty level.

Steps:
  1. Open the catalogue home page.
  2. Type "Python" into #search-input.
  3. Wait for the course cards to re-render.
  4. Locate [data-testid="course-title-python-automation"].
  5. Assert title text == "Python for Automation & Data".
  6. Assert level text == "Beginner".

Expected:
  Only Python-related courses shown.
  Title = "Python for Automation & Data"
  Level = "Beginner"
"""

import csv
import logging
import os
import sys

import pytest

# Make project root importable
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from tests.pages.course_catalogue_page import CourseCataloguePage
from tests.data.test_data import SEARCH_TEST_DATA

logger = logging.getLogger("skillspring")


# ======================================================================
# Helper: load CSV test data
# ======================================================================

def _load_csv_search_data():
    """
    Read search keywords and expected values from search_data.csv.
    Returns a list of dicts with keys:
      keyword, expected_course_id, expected_title, expected_level
    """
    csv_path = os.path.join(os.path.dirname(__file__), "..", "data", "search_data.csv")
    rows = []
    with open(csv_path, newline="", encoding="utf-8") as fh:
        reader = csv.DictReader(fh)
        for row in reader:
            rows.append(row)
    return rows


# ======================================================================
# TC01 — Core acceptance test (uses inline test data from test_data.py)
# ======================================================================

class TestCourseSearch:
    """TC01: Search for a course and verify the result."""

    @pytest.mark.tc01
    @pytest.mark.smoke
    def test_tc01_search_python_course_title_and_level(self, driver):
        """
        TC01 — Search for 'Python' and verify title and difficulty level.

        This is the primary acceptance test that maps directly to the
        faculty test scenario TC01 in docs/PROJECT_PLAN.md.
        """
        logger.info("TC01: Opening catalogue and searching for 'Python'")
        page = CourseCataloguePage(driver)
        page.open_catalogue()

        # ---- Action: type in the search box ----
        page.search("Python")

        # ---- Assertion 1: correct title ----
        course_id = "python-automation"
        actual_title = page.get_course_title(course_id)
        expected_title = "Python for Automation & Data"

        logger.info(f"TC01: Actual title   = '{actual_title}'")
        logger.info(f"TC01: Expected title = '{expected_title}'")
        assert actual_title == expected_title, (
            f"Course title mismatch!\n"
            f"  Expected : {expected_title!r}\n"
            f"  Got      : {actual_title!r}"
        )

        # ---- Assertion 2: correct difficulty level ----
        actual_level = page.get_course_level(course_id)
        expected_level = "Beginner"

        logger.info(f"TC01: Actual level   = '{actual_level}'")
        logger.info(f"TC01: Expected level = '{expected_level}'")
        assert actual_level == expected_level, (
            f"Difficulty level mismatch!\n"
            f"  Expected : {expected_level!r}\n"
            f"  Got      : {actual_level!r}"
        )

        logger.info("TC01: PASSED — title and level are correct.")

    @pytest.mark.tc01
    def test_tc01_no_match_shows_empty_state(self, driver):
        """
        TC01 supplement — Searching for a nonsense keyword shows empty state.
        This also validates TC10 from the project plan.
        """
        logger.info("TC01-b: Searching for a keyword with no results")
        page = CourseCataloguePage(driver)
        page.open_catalogue()

        page.search("xyznonexistent_keyword_12345")

        assert page.is_empty_state_shown(), (
            "Expected the empty-state element (#empty-state) to appear "
            "when no courses match the search query, but it was not visible."
        )
        logger.info("TC01-b: PASSED — empty state shown for unmatched query.")

    @pytest.mark.tc01
    def test_tc01_reset_filters_restores_all_cards(self, driver):
        """
        TC01 supplement — Resetting filters after a search restores all course cards.
        Covers TC11 from the project plan.
        """
        logger.info("TC01-c: Testing reset filters restores all courses")
        page = CourseCataloguePage(driver)
        page.open_catalogue()

        # Apply a restrictive filter
        page.search("Python")
        assert page.is_course_card_visible("python-automation"), \
            "Expected python-automation card to be visible after search"

        # The other courses should be hidden
        assert not page.is_course_card_visible("cloud-architecture-masterclass"), \
            "Expected cloud course to be hidden while 'Python' filter is active"

        # Reset and confirm all cards reappear
        page.reset_filters()
        assert page.is_course_card_visible("cloud-architecture-masterclass"), \
            "Expected cloud course card to reappear after resetting filters"

        logger.info("TC01-c: PASSED — all course cards restored after reset.")


# ======================================================================
# TC01 Parametrised variant — reads rows from search_data.csv
# ======================================================================

# Build parametrize list from CSV at module-load time
_csv_rows = _load_csv_search_data()
_csv_ids  = [row["keyword"] for row in _csv_rows]


@pytest.mark.tc01
@pytest.mark.parametrize("row", _csv_rows, ids=_csv_ids)
def test_tc01_csv_driven_search(driver, row):
    """
    Data-driven version of TC01 powered by tests/data/search_data.csv.

    Each CSV row defines a keyword and the course that should appear.
    This demonstrates external test-data management for the faculty viva.
    """
    keyword     = row["keyword"]
    course_id   = row["expected_course_id"]
    exp_title   = row["expected_title"]
    exp_level   = row["expected_level"]

    logger.info(f"TC01-csv: keyword='{keyword}' → expecting course '{course_id}'")

    page = CourseCataloguePage(driver)
    page.open_catalogue()
    page.search(keyword)

    actual_title = page.get_course_title(course_id)
    actual_level = page.get_course_level(course_id)

    assert actual_title == exp_title, (
        f"[keyword='{keyword}'] Title mismatch: "
        f"expected {exp_title!r}, got {actual_title!r}"
    )
    assert actual_level == exp_level, (
        f"[keyword='{keyword}'] Level mismatch: "
        f"expected {exp_level!r}, got {actual_level!r}"
    )
    logger.info(f"TC01-csv [{keyword}]: PASSED")
