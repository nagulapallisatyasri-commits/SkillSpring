"""
TC02 — Enrol in an Open Course and Verify in My Learning
TC03 — Attempt to Enrol in a Full Course and Verify Rejection
=================================================================
TC02 Steps:
  1. Open /courses/web-dev-basics.
  2. Confirm positive seat count on #seat-availability.
  3. Click #btn-enrol.
  4. Assert #enrol-success-alert appears.
  5. Navigate to /my-learning.
  6. Assert row [data-testid="course-row-web-dev-basics"] exists.
  7. Assert status cell == "Enrolled" and progress contains "0".

TC03 Steps:
  1. Open /courses/cloud-architecture-masterclass.
  2. Confirm #seat-availability shows "0 seats remaining (Full)".
  3. Confirm #btn-enrol is disabled (aria-disabled="true").
  4. Attempt JS click (bypass disabled attribute).
  5. Assert #enrol-rejection-alert contains the exact rejection message.
  6. Navigate to /my-learning.
  7. Confirm cloud-architecture-masterclass row does NOT exist.
"""

import logging
import os
import sys

import pytest

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from tests.pages.course_details_page import CourseDetailsPage
from tests.pages.my_learning_page import MyLearningPage
from tests.data.test_data import (
    OPEN_COURSE_ID,
    OPEN_COURSE_TITLE,
    FULL_COURSE_ID,
    FULL_COURSE_REJECTION_MSG,
)

logger = logging.getLogger("skillspring")


# ======================================================================
# TC02
# ======================================================================

class TestEnrolment:
    """TC02: Enrolment in an open course."""

    @pytest.mark.tc02
    @pytest.mark.smoke
    def test_tc02_enrol_open_course_and_verify_in_my_learning(self, driver):
        """
        TC02 — Click 'Enrol Now' on web-dev-basics and confirm the course
        appears in the My Learning table with status 'Enrolled' and 0% progress.
        """
        logger.info("TC02: Opening course details for web-dev-basics")
        details = CourseDetailsPage(driver)
        details.open_course(OPEN_COURSE_ID)

        # ---- Step 1: Verify positive seat count ----
        seat_text = details.get_seat_availability_text()
        logger.info(f"TC02: Seat text = '{seat_text}'")
        assert "0" not in seat_text or "Full" not in seat_text, \
            f"Expected positive seats but got: {seat_text!r}"
        # Confirm the word 'available' is present
        assert "available" in seat_text.lower() or any(
            char.isdigit() and char != "0" for char in seat_text
        ), f"Unexpected seat text: {seat_text!r}"

        # ---- Step 2: Click Enrol Now ----
        logger.info("TC02: Clicking Enrol Now")
        details.click_enrol()

        # ---- Step 3: Success alert must appear ----
        assert details.is_success_alert_visible(), (
            "Expected the enrolment-success alert (#enrol-success-alert) "
            "to appear after clicking Enrol Now, but it was not visible."
        )
        logger.info("TC02: Success alert is visible.")

        # ---- Step 4: Navigate to My Learning ----
        logger.info("TC02: Navigating to My Learning dashboard")
        my_learning = MyLearningPage(driver)
        my_learning.open_my_learning()

        # ---- Step 5: Row must exist ----
        assert my_learning.is_course_row_present(OPEN_COURSE_ID), (
            f"Expected a row for course '{OPEN_COURSE_ID}' in "
            "#my-learning-table after enrolment, but it was not found."
        )
        logger.info(f"TC02: Row for '{OPEN_COURSE_ID}' found in table.")

        # ---- Step 6: Status == "Enrolled" ----
        status = my_learning.get_course_status(OPEN_COURSE_ID)
        logger.info(f"TC02: Status cell text = '{status}'")
        assert status == "Enrolled", (
            f"Expected status 'Enrolled' but got '{status}'"
        )

        # ---- Step 7: Progress contains "0" ----
        progress = my_learning.get_course_progress(OPEN_COURSE_ID)
        logger.info(f"TC02: Progress cell text = '{progress}'")
        assert "0" in progress, (
            f"Expected progress to start at 0% but got: '{progress}'"
        )

        logger.info("TC02: PASSED — course enrolled and visible in My Learning.")


# ======================================================================
# TC03
# ======================================================================

class TestFullCourseRejection:
    """TC03: Attempting to enrol in a full course is rejected."""

    @pytest.mark.tc03
    @pytest.mark.smoke
    def test_tc03_full_course_shows_rejection_message(self, driver):
        """
        TC03 — The cloud-architecture-masterclass course has 0 seats.
        Verify the button is disabled and the exact rejection message appears.
        """
        logger.info("TC03: Opening cloud-architecture-masterclass")
        details = CourseDetailsPage(driver)
        details.open_course(FULL_COURSE_ID)

        # ---- Step 1: Seat availability shows Full ----
        seat_text = details.get_seat_availability_text()
        logger.info(f"TC03: Seat text = '{seat_text}'")
        assert "0" in seat_text, \
            f"Expected '0' in seat text but got: {seat_text!r}"
        assert "Full" in seat_text or "full" in seat_text.lower(), \
            f"Expected 'Full' in seat text but got: {seat_text!r}"

        # ---- Step 2: Button must be disabled ----
        assert details.is_enrol_button_disabled(), (
            "Expected #btn-enrol to be disabled for a full course, "
            "but it appears enabled."
        )
        logger.info("TC03: Enrol button is correctly disabled.")

        # ---- Step 3: The rejection alert must already be visible ----
        # (The frontend shows the rejection alert immediately when seats=0)
        assert details.is_rejection_alert_visible(), (
            "Expected the rejection alert (#enrol-rejection-alert) "
            "to be visible on a full course page."
        )

        # ---- Step 4: Exact rejection message ----
        rejection_text = details.get_rejection_alert_text()
        logger.info(f"TC03: Rejection text = '{rejection_text}'")
        assert FULL_COURSE_REJECTION_MSG in rejection_text, (
            f"Rejection message mismatch!\n"
            f"  Expected : {FULL_COURSE_REJECTION_MSG!r}\n"
            f"  Got      : {rejection_text!r}"
        )

        logger.info("TC03: Rejection alert text is correct.")

        # ---- Step 5: Also try JS click and confirm message still shown ----
        details.click_enrol_via_js()
        rejection_text_after = details.get_rejection_alert_text()
        assert FULL_COURSE_REJECTION_MSG in rejection_text_after, (
            "Rejection message should still be present after JS click attempt."
        )

        # ---- Step 6: Navigate to My Learning and confirm NOT enrolled ----
        logger.info("TC03: Navigating to My Learning to confirm NOT enrolled")
        my_learning = MyLearningPage(driver)
        my_learning.open_my_learning()

        # The full course must NOT appear in the table
        assert not my_learning.is_course_row_present(FULL_COURSE_ID), (
            f"Course '{FULL_COURSE_ID}' should NOT appear in My Learning "
            "after a failed enrolment attempt, but a row was found."
        )
        logger.info("TC03: PASSED — full course not added to My Learning.")
