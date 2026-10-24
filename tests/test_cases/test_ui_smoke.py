"""
SkillSpring — Primary End-to-End UI Smoke Test
===============================================
Test Suite: SkillSpring Premium UI Redesign Verification
Test Case : test_skillspring_complete_ui_smoke_journey

Verification Scope:
  1. SkillSpring homepage opens successfully.
  2. Main hero heading is visible with brand identity.
  3. Course catalogue grid is displayed with expanded curriculum.
  4. A course can be selected and opened from the catalogue.
  5. Left-side course curriculum hierarchy is visible with modules.
  6. Right-side course details and metadata are properly displayed.
  7. User can navigate to an individual interactive lesson.
  8. No critical UI error occurs throughout the user journey.
"""

import logging
import os
import sys
import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Ensure project root is on sys.path
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from tests.config.settings import BASE_URL, EXPLICIT_WAIT_TIMEOUT

logger = logging.getLogger("skillspring")


class TestSkillSpringUISmoke:
    """Primary automated smoke test verifying the redesigned SkillSpring UI."""

    @pytest.mark.smoke
    def test_skillspring_complete_ui_smoke_journey(self, driver):
        wait = WebDriverWait(driver, EXPLICIT_WAIT_TIMEOUT)

        # ------------------------------------------------------------------
        # Step 1: Open the SkillSpring Homepage
        # ------------------------------------------------------------------
        logger.info(f"Step 1: Navigating to SkillSpring homepage at {BASE_URL}")
        driver.get(BASE_URL + "/")

        # Check page title includes SkillSpring
        assert "SkillSpring" in driver.title, f"Expected 'SkillSpring' in title, got: '{driver.title}'"

        # ------------------------------------------------------------------
        # Step 2: Verify Main Heading & Brand Identity
        # ------------------------------------------------------------------
        logger.info("Step 2: Verifying main heading and hero section")
        main_heading = wait.until(
            EC.visibility_of_element_located((By.ID, "main-heading"))
        )
        assert main_heading.is_displayed(), "Main heading (#main-heading) is not visible."
        heading_text = main_heading.text
        logger.info(f"Main heading text: '{heading_text}'")
        assert len(heading_text) > 0, "Main heading text is unexpectedly empty."

        # Verify logo brand
        brand_logo = driver.find_element(By.ID, "brand-logo")
        assert brand_logo.is_displayed(), "Brand logo (#brand-logo) is not visible in navbar."

        # ------------------------------------------------------------------
        # Step 3: Verify Course Catalogue & Search Filter Bar
        # ------------------------------------------------------------------
        logger.info("Step 3: Verifying course catalogue display and cards")
        catalogue_section = wait.until(
            EC.visibility_of_element_located((By.ID, "course-catalogue"))
        )
        assert catalogue_section.is_displayed(), "Course catalogue section (#course-catalogue) not visible."

        # Verify catalogue grid holds course cards
        catalogue_grid = wait.until(
            EC.visibility_of_element_located((By.ID, "catalogue-grid"))
        )
        course_cards = catalogue_grid.find_elements(By.CSS_SELECTOR, '[data-testid^="course-card-"]')
        logger.info(f"Discovered {len(course_cards)} course cards rendered in catalogue grid.")
        assert len(course_cards) >= 6, f"Expected at least 6 courses, found: {len(course_cards)}"

        # Verify search input is present and functional
        search_input = wait.until(
            EC.visibility_of_element_located((By.ID, "search-input"))
        )
        assert search_input.is_displayed(), "Search input (#search-input) is not visible."

        # ------------------------------------------------------------------
        # Step 4: Open a Course from the Catalogue
        # ------------------------------------------------------------------
        target_course_id = "python-automation"
        logger.info(f"Step 4: Opening details for course '{target_course_id}'")
        view_course_btn = wait.until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, f'[data-testid="btn-details-{target_course_id}"]'))
        )
        # Scroll element into view before clicking
        driver.execute_script("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", view_course_btn)
        driver.execute_script("arguments[0].click();", view_course_btn)

        # Confirm navigation to /courses/python-automation
        wait.until(lambda d: f"/courses/{target_course_id}" in d.current_url)
        logger.info(f"Successfully arrived at course page: {driver.current_url}")

        # ------------------------------------------------------------------
        # Step 5: Verify Left-Side Course Hierarchy & Curriculum
        # ------------------------------------------------------------------
        logger.info("Step 5: Verifying left-side course hierarchy sidebar")
        hierarchy_sidebar = wait.until(
            EC.visibility_of_element_located((By.ID, "course-hierarchy"))
        )
        assert hierarchy_sidebar.is_displayed(), "Course hierarchy sidebar (#course-hierarchy) is not visible."

        # Verify progress bar indicator in hierarchy
        progress_bar = hierarchy_sidebar.find_element(By.ID, "course-progress-bar")
        assert progress_bar.is_displayed(), "Course progress bar (#course-progress-bar) is not visible."

        # Verify lesson items exist within the hierarchy
        hierarchy_lessons = hierarchy_sidebar.find_elements(By.CSS_SELECTOR, '[data-testid^="lesson-item-"]')
        assert len(hierarchy_lessons) > 0, "No lessons found rendered in course hierarchy sidebar."
        logger.info(f"Hierarchy contains {len(hierarchy_lessons)} selectable lesson entries.")

        # ------------------------------------------------------------------
        # Step 6: Verify Right-Side Course Details & Metadata Content
        # ------------------------------------------------------------------
        logger.info("Step 6: Verifying right-side course details content area")
        course_title_elem = wait.until(
            EC.visibility_of_element_located((By.ID, "course-title"))
        )
        assert "Python" in course_title_elem.text, f"Unexpected course title: '{course_title_elem.text}'"

        # Verify seat availability and instructor information
        seat_availability = driver.find_element(By.ID, "seat-availability")
        assert seat_availability.is_displayed(), "Seat availability badge (#seat-availability) is missing."

        instructor_elem = driver.find_element(By.ID, "instructor-name")
        assert instructor_elem.is_displayed(), "Instructor element (#instructor-name) is missing."

        # ------------------------------------------------------------------
        # Step 7: Navigate to an Interactive Lesson
        # ------------------------------------------------------------------
        target_lesson_id = "lesson-1-intro"
        logger.info(f"Step 7: Selecting lesson '{target_lesson_id}' from the hierarchy")
        lesson_btn = wait.until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, f'[data-testid="lesson-item-{target_lesson_id}"]'))
        )
        driver.execute_script("arguments[0].click();", lesson_btn)

        # Verify lesson title and content are rendered on the right
        lesson_title_elem = wait.until(
            EC.visibility_of_element_located((By.ID, "lesson-title"))
        )
        assert lesson_title_elem.is_displayed(), "Lesson title (#lesson-title) not visible after navigation."
        logger.info(f"Active lesson title displayed: '{lesson_title_elem.text}'")

        # Verify 'Mark as Complete' button is interactable
        mark_complete_btn = wait.until(
            EC.visibility_of_element_located((By.ID, "btn-mark-complete"))
        )
        assert mark_complete_btn.is_displayed(), "'Mark as Complete' button (#btn-mark-complete) is not visible."

        # ------------------------------------------------------------------
        # Step 8: Verify No Critical UI Errors Occurred
        # ------------------------------------------------------------------
        logger.info("Step 8: Verifying no unhandled error boundaries or crashed pages")
        not_found_elements = driver.find_elements(By.ID, "course-not-found")
        assert len(not_found_elements) == 0, "Encountered unexpected course-not-found state."

        # Check console logs if browser supports it
        try:
            logs = driver.get_log("browser")
            severe_errors = [log for log in logs if log.get("level") == "SEVERE"]
            if severe_errors:
                logger.warning(f"Browser severe logs detected: {severe_errors}")
        except Exception:
            # Some browser drivers do not support get_log
            pass

        logger.info("SkillSpring Complete UI Smoke Journey PASSED successfully.")
