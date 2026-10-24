"""
TC05 — Mark a Lesson Complete and Verify Progress Indicator
=============================================================
Test ID : TC05
Objective: Verify that clicking 'Mark as Complete' on lesson-1-intro
           increments the course progress bar and the change persists
           in My Learning.

Precondition:
  python-automation is enrolled (seeded via localStorage).

Steps:
  1. Seed enrolment for python-automation via localStorage.
  2. Navigate to /learn/python-automation/lesson/lesson-1-intro.
  3. Verify progress bar shows "0% Completed".
  4. Click #btn-mark-complete.
  5. Verify button text becomes "Completed ✓".
  6. Verify progress bar updates to "50% Completed".
  7. Navigate to /my-learning.
  8. Verify [data-testid="progress-python-automation"] contains "50".
"""

import logging
import os
import sys

import pytest

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from tests.pages.lesson_player_page import LessonPlayerPage
from tests.pages.my_learning_page import MyLearningPage
from tests.data.test_data import LESSON_COURSE_ID, AVAILABLE_LESSON

logger = logging.getLogger("skillspring")


class TestLessonProgress:
    """TC05: Mark a lesson complete and verify progress updates."""

    @pytest.mark.tc05
    @pytest.mark.smoke
    def test_tc05_mark_lesson_complete_and_check_progress(self, driver):
        """
        TC05 — Mark lesson-1-intro complete, verify progress bar updates to 50%,
        and confirm the same progress is shown in My Learning.

        python-automation has 2 lessons total:
          lesson-1-intro       (unlocked)
          lesson-3-advanced    (locked)
        Completing the one available lesson → 1/2 = 50%.
        """
        logger.info("TC05: Seeding enrolment for python-automation")

        lesson_page = LessonPlayerPage(driver)

        # Seed enrolment so the course shows up in My Learning
        lesson_page.seed_enrolment(LESSON_COURSE_ID)

        # ---- Step 1: Navigate to the lesson ----
        logger.info("TC05: Navigating to lesson-1-intro")
        lesson_page.open_lesson(LESSON_COURSE_ID, AVAILABLE_LESSON)

        # ---- Step 2: Verify initial progress is 0% ----
        initial_progress = lesson_page.get_progress_text()
        logger.info(f"TC05: Initial progress text = '{initial_progress}'")
        assert "0%" in initial_progress, (
            f"Expected '0%' in progress text before completing lesson, "
            f"got: '{initial_progress}'"
        )

        # ---- Step 3: Mark Complete button should be enabled ----
        assert lesson_page.is_mark_complete_enabled(), (
            "#btn-mark-complete should be enabled for an unlocked, "
            "incomplete lesson."
        )

        # ---- Step 4: Click Mark as Complete ----
        logger.info("TC05: Clicking 'Mark as Complete'")
        lesson_page.click_mark_complete()

        # ---- Step 5: Button text must change to 'Completed' ----
        lesson_page.wait_for_progress_update("50%")
        btn_text = lesson_page.get_mark_complete_button_text()
        logger.info(f"TC05: Button text after completion = '{btn_text}'")
        assert "Completed" in btn_text, (
            f"Expected button text to contain 'Completed' after marking done, "
            f"got: '{btn_text}'"
        )

        # ---- Step 6: Progress bar must show 50% ----
        updated_progress = lesson_page.get_progress_text()
        logger.info(f"TC05: Updated progress text = '{updated_progress}'")
        assert "50%" in updated_progress, (
            f"Expected progress to update to 50% after completing 1 of 2 lessons, "
            f"got: '{updated_progress}'"
        )

        # ---- Step 7: Navigate to My Learning ----
        logger.info("TC05: Navigating to My Learning to verify persistence")
        my_learning = MyLearningPage(driver)
        my_learning.open_my_learning()

        # ---- Step 8: My Learning progress cell shows 50% ----
        progress_text = my_learning.get_course_progress(LESSON_COURSE_ID)
        logger.info(f"TC05: My Learning progress cell = '{progress_text}'")
        assert "50" in progress_text, (
            f"Expected My Learning to show 50% for {LESSON_COURSE_ID}, "
            f"got: '{progress_text}'"
        )

        logger.info("TC05: PASSED — progress updated and persisted correctly.")

    @pytest.mark.tc05
    def test_tc05_mark_complete_button_disabled_after_completion(self, driver):
        """
        TC05 supplement — After marking a lesson complete the button becomes
        permanently disabled (aria-disabled=true) to prevent double-completion.
        """
        lesson_page = LessonPlayerPage(driver)
        lesson_page.seed_enrolment(LESSON_COURSE_ID)
        lesson_page.open_lesson(LESSON_COURSE_ID, AVAILABLE_LESSON)

        # Complete the lesson
        lesson_page.click_mark_complete()
        lesson_page.wait_for_progress_update("50%")

        # Button must now be disabled
        assert not lesson_page.is_mark_complete_enabled(), (
            "Expected #btn-mark-complete to become disabled after completion."
        )
        logger.info("TC05-b: PASSED — button disabled after completion.")
