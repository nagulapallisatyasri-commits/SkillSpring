"""
LessonPlayerPage
=================
Page Object for the Lesson Player ( /learn/<courseId>/lesson/<lessonId> ).

Locators used (from the actual frontend source):
  #course-progress-bar      — text showing "X% Completed"
  #lesson-title             — h1 with lesson name
  #lesson-frame             — sandbox / simulation container
  #btn-mark-complete        — "Mark as Complete" button
  #lesson-locked-alert      — warning banner for locked lessons
  #btn-prev-lesson          — previous lesson navigation
  #btn-next-lesson          — next lesson navigation
  [data-testid="lesson-item-{id}"]   — sidebar lesson button
"""

from selenium.webdriver.common.by import By

from tests.pages.base_page import BasePage
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..'))
from tests.config.settings import BASE_URL


class LessonPlayerPage(BasePage):
    """Encapsulates interactions with the Lesson Player page."""

    # ------------------------------------------------------------------
    # Locators
    # ------------------------------------------------------------------
    PROGRESS_BAR       = (By.ID, "course-progress-bar")
    LESSON_TITLE       = (By.ID, "lesson-title")
    LESSON_FRAME       = (By.ID, "lesson-frame")
    MARK_COMPLETE_BTN  = (By.ID, "btn-mark-complete")
    LOCKED_ALERT       = (By.ID, "lesson-locked-alert")
    PREV_BTN           = (By.ID, "btn-prev-lesson")
    NEXT_BTN           = (By.ID, "btn-next-lesson")
    QUIZ_BTN           = (By.ID, "btn-take-quiz")

    # ------------------------------------------------------------------
    # Navigation
    # ------------------------------------------------------------------

    def open_lesson(self, course_id: str, lesson_id: str) -> None:
        """Navigate directly to a specific lesson."""
        url = f"{BASE_URL}/learn/{course_id}/lesson/{lesson_id}"
        self.open(url)
        # Wait for the lesson title to confirm the page has loaded
        self.find(*self.LESSON_TITLE)

    # ------------------------------------------------------------------
    # Reading progress
    # ------------------------------------------------------------------

    def get_progress_text(self) -> str:
        """
        Return the full progress text, e.g. "0% Completed" or "50% Completed".
        This is the text content of the #course-progress-bar element.
        """
        return self.get_text(*self.PROGRESS_BAR)

    def get_lesson_title(self) -> str:
        """Return the text of the lesson heading."""
        return self.get_text(*self.LESSON_TITLE)

    # ------------------------------------------------------------------
    # Mark-complete action (TC05)
    # ------------------------------------------------------------------

    def is_mark_complete_enabled(self) -> bool:
        """
        Return True if the Mark as Complete button is enabled.
        Returns False if the lesson is locked or already completed.
        """
        btn = self.find(*self.MARK_COMPLETE_BTN)
        disabled = btn.get_attribute("disabled")
        aria_disabled = btn.get_attribute("aria-disabled")
        return disabled is None and aria_disabled != "true"

    def click_mark_complete(self) -> None:
        """Click the 'Mark as Complete' button."""
        self.click(*self.MARK_COMPLETE_BTN)

    def wait_for_progress_update(self, expected_text: str) -> None:
        """
        Block until the progress bar shows the expected percentage text.
        Example: page.wait_for_progress_update("50% Completed")
        """
        self.wait_for_text_in_element(*self.PROGRESS_BAR, expected_text)

    def get_mark_complete_button_text(self) -> str:
        """Return the current label on the Mark Complete button."""
        return self.get_text(*self.MARK_COMPLETE_BTN)

    # ------------------------------------------------------------------
    # Locked-lesson checks (TC08)
    # ------------------------------------------------------------------

    def is_locked_alert_shown(self) -> bool:
        """Return True if the locked-lesson warning banner is visible."""
        return self.is_visible(*self.LOCKED_ALERT, timeout=5)

    def get_locked_alert_text(self) -> str:
        """Return the text inside the locked-lesson alert banner."""
        return self.get_text(*self.LOCKED_ALERT)

    def is_sidebar_lesson_locked(self, lesson_id: str) -> bool:
        """
        Check whether a lesson item in the sidebar has aria-disabled=true.
        This confirms the UI prevents clicking a locked lesson.
        """
        locator = (By.CSS_SELECTOR, f'[data-testid="lesson-item-{lesson_id}"]')
        element = self.find(*locator)
        return element.get_attribute("aria-disabled") == "true"

    def has_lock_icon(self, lesson_id: str) -> bool:
        """
        Return True if the sidebar item for the given lesson has a lock-icon span.
        LessonSidebar.tsx renders: <span class="lock-icon" data-testid="lock-icon"> 
        inside the button[data-testid="lesson-item-{id}"].
        """
        locator = (By.CSS_SELECTOR,
                   f'[data-testid="lesson-item-{lesson_id}"] [data-testid="lock-icon"]')
        return self.is_present(*locator, timeout=3)
