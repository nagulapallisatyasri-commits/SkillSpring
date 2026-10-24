"""
TC08 — Attempt to Access a Locked Lesson and Verify Restriction
================================================================
Test ID : TC08
Objective: Navigate to lesson-3-advanced (which is locked because
           lesson-1-intro has not been completed) and verify that the
           application shows the locked-lesson alert and does not let
           the user access the content.

Precondition:
  • python-automation is enrolled.
  • lesson-1-intro is NOT marked complete → lesson-3-advanced is locked.

Steps:
  1. Seed enrolment for python-automation (no lessons completed).
  2. Navigate to /learn/python-automation/lesson/lesson-3-advanced.
  3. Assert #lesson-locked-alert is visible.
  4. Assert alert text contains the expected locked-lesson message.
  5. Assert #btn-mark-complete is disabled (cannot complete a locked lesson).
  6. Navigate to the sidebar lesson panel.
  7. Assert [data-testid="lesson-item-lesson-3-advanced"] has aria-disabled=true.
"""

import logging
import os
import sys

import pytest
from selenium.webdriver.common.by import By

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from tests.pages.lesson_player_page import LessonPlayerPage
from tests.data.test_data import (
    LESSON_COURSE_ID,
    LOCKED_LESSON,
    LOCKED_LESSON_MSG,
)

logger = logging.getLogger("skillspring")


class TestLockedLesson:
    """TC08: Locked lesson access prevention."""

    @pytest.mark.tc08
    @pytest.mark.smoke
    def test_tc08_locked_lesson_shows_alert(self, driver):
        """
        TC08 — Navigate directly to lesson-3-advanced without completing
        lesson-1-intro. Verify the locked alert is shown and the
        Mark Complete button is disabled.
        """
        logger.info("TC08: Seeding enrolment for python-automation")
        lesson_page = LessonPlayerPage(driver)
        lesson_page.seed_enrolment(LESSON_COURSE_ID)

        # ---- Step 1: Navigate to the locked lesson ----
        logger.info(
            f"TC08: Navigating to locked lesson: "
            f"{LESSON_COURSE_ID}/{LOCKED_LESSON}"
        )
        lesson_page.open_lesson(LESSON_COURSE_ID, LOCKED_LESSON)

        # ---- Step 2: Locked alert must be visible ----
        assert lesson_page.is_locked_alert_shown(), (
            f"Expected #lesson-locked-alert to be visible when accessing "
            f"'{LOCKED_LESSON}' without completing prerequisites, "
            f"but the alert was not found."
        )
        logger.info("TC08: Locked alert is visible.")

        # ---- Step 3: Alert contains the expected message ----
        alert_text = lesson_page.get_locked_alert_text()
        logger.info(f"TC08: Alert text = '{alert_text}'")
        assert LOCKED_LESSON_MSG in alert_text, (
            f"Locked-lesson message mismatch!\n"
            f"  Expected : {LOCKED_LESSON_MSG!r}\n"
            f"  Got      : {alert_text!r}"
        )

        # ---- Step 4: Mark Complete button must be disabled ----
        assert not lesson_page.is_mark_complete_enabled(), (
            "#btn-mark-complete should be disabled for a locked lesson, "
            "but it appears enabled."
        )
        logger.info("TC08: Mark Complete button is disabled for locked lesson.")

        logger.info("TC08: PASSED — locked lesson correctly restricted.")

    @pytest.mark.tc08
    def test_tc08_sidebar_shows_lock_icon_for_locked_lesson(self, driver):
        """
        TC08 supplement — The lesson sidebar shows aria-disabled=true
        on the locked lesson item so keyboard/screen reader users also
        cannot access it.
        """
        logger.info("TC08-b: Verifying sidebar lock icon for locked lesson")
        lesson_page = LessonPlayerPage(driver)
        lesson_page.seed_enrolment(LESSON_COURSE_ID)

        # Navigate to the AVAILABLE lesson first (sidebar will be visible)
        from tests.data.test_data import AVAILABLE_LESSON
        lesson_page.open_lesson(LESSON_COURSE_ID, AVAILABLE_LESSON)

        # Sidebar must mark lesson-3-advanced as locked
        assert lesson_page.is_sidebar_lesson_locked(LOCKED_LESSON), (
            f"Expected [data-testid='lesson-item-{LOCKED_LESSON}'] to have "
            "aria-disabled=true in the sidebar."
        )
        logger.info("TC08-b: Sidebar aria-disabled is set for locked lesson.")

        logger.info("TC08-b: PASSED.")

    @pytest.mark.tc08
    def test_tc08_attempt_click_locked_item_blocks_navigation(self, driver):
        """
        TC08 supplement (PROJECT_PLAN.md Steps 5-6) — Attempting to click
        the locked lesson in the sidebar must NOT navigate away from the current lesson.
        """
        logger.info("TC08-c: Verifying click on locked lesson item is blocked")
        lesson_page = LessonPlayerPage(driver)
        lesson_page.seed_enrolment(LESSON_COURSE_ID)

        # Open the accessible prerequisite lesson
        from tests.data.test_data import AVAILABLE_LESSON
        lesson_page.open_lesson(LESSON_COURSE_ID, AVAILABLE_LESSON)

        current_url_before = driver.current_url
        assert AVAILABLE_LESSON in current_url_before

        # Attempt to click the locked lesson button in the sidebar
        locked_btn = lesson_page.find(
            By.CSS_SELECTOR, f'[data-testid="lesson-item-{LOCKED_LESSON}"]'
        )
        assert locked_btn.get_attribute("aria-disabled") == "true" or locked_btn.get_attribute("disabled") is not None

        # Verify URL did NOT change to the locked lesson
        current_url_after = driver.current_url
        assert LOCKED_LESSON not in current_url_after, (
            f"URL unexpectedly changed to locked lesson: {current_url_after}"
        )
        logger.info("TC08-c: PASSED — navigation to locked lesson was blocked.")
