"""
CourseDetailsPage
==================
Page Object for the Course Details page ( /courses/<course_id> ).

Locators used (from the actual frontend source):
  #course-header            — top section wrapping title + enrol CTA
  #course-title             — h1 with course name
  #seat-availability        — seat count badge
  #btn-enrol                — enrol / "Course Full" button
  #enrol-success-alert      — green banner after successful enrolment
  #enrol-rejection-alert    — red banner when course is full
  #link-new-tab             — "Open in New Tab" anchor on the details page
  #course-detail-level      — difficulty badge
"""

from selenium.webdriver.common.by import By

from tests.pages.base_page import BasePage
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..'))
from tests.config.settings import BASE_URL


class CourseDetailsPage(BasePage):
    """Encapsulates all interactions with the Course Details page."""

    # ------------------------------------------------------------------
    # Locators
    # ------------------------------------------------------------------
    COURSE_HEADER         = (By.ID, "course-header")
    COURSE_TITLE          = (By.ID, "course-title")
    SEAT_AVAILABILITY     = (By.ID, "seat-availability")
    ENROL_BTN             = (By.ID, "btn-enrol")
    SUCCESS_ALERT         = (By.ID, "enrol-success-alert")
    REJECTION_ALERT       = (By.ID, "enrol-rejection-alert")
    LINK_NEW_TAB          = (By.ID, "link-new-tab")
    COURSE_LEVEL          = (By.ID, "course-detail-level")
    BACK_TO_CATALOGUE     = (By.ID, "btn-back-catalogue")

    # ------------------------------------------------------------------
    # Navigation
    # ------------------------------------------------------------------

    def open_course(self, course_id: str) -> None:
        """Navigate directly to the details page for the given course."""
        url = f"{BASE_URL}/courses/{course_id}"
        self.open(url)
        # Wait for the main heading to confirm the page has loaded
        self.find(*self.COURSE_HEADER)

    # ------------------------------------------------------------------
    # Reading page state
    # ------------------------------------------------------------------

    def get_course_title(self) -> str:
        """Return the text of the course title heading."""
        return self.get_text(*self.COURSE_TITLE)

    def get_seat_availability_text(self) -> str:
        """
        Return the full text of the seat-availability element.

        Examples:
            "5 seats available"
            "0 seats remaining (Full)"
        """
        return self.get_text(*self.SEAT_AVAILABILITY)

    def is_enrol_button_disabled(self) -> bool:
        """
        Return True if the Enrol button is disabled (i.e. course is full).

        We check both the HTML `disabled` property and the
        `aria-disabled` attribute, matching TC03 expectations.
        """
        btn = self.find(*self.ENROL_BTN)
        # The button has HTML `disabled` attribute when the course is full
        disabled_attr = btn.get_attribute("disabled")
        aria_disabled  = btn.get_attribute("aria-disabled")
        return disabled_attr is not None or aria_disabled == "true"

    def get_success_alert_text(self) -> str:
        """Return the text shown inside the enrolment-success banner."""
        return self.get_text(*self.SUCCESS_ALERT)

    def get_rejection_alert_text(self) -> str:
        """Return the text shown inside the enrolment-rejection banner."""
        return self.get_text(*self.REJECTION_ALERT)

    def is_success_alert_visible(self) -> bool:
        """Return True if the success banner is currently displayed."""
        return self.is_visible(*self.SUCCESS_ALERT, timeout=5)

    def is_rejection_alert_visible(self) -> bool:
        """Return True if the rejection banner is currently displayed."""
        return self.is_visible(*self.REJECTION_ALERT, timeout=5)

    # ------------------------------------------------------------------
    # Actions
    # ------------------------------------------------------------------

    def click_enrol(self) -> None:
        """Click the Enrol Now button (only valid for open courses)."""
        self.click(*self.ENROL_BTN)

    def click_enrol_via_js(self) -> None:
        """
        Click the Enrol button using JavaScript.
        Used in TC03 to test that the server-side defence still works
        even when the button is disabled.
        """
        self.js_click(*self.ENROL_BTN)

    def get_open_in_new_tab_link(self):
        """Return the 'Open in New Tab' anchor element (TC04)."""
        return self.find_clickable(*self.LINK_NEW_TAB)

    def go_back_to_catalogue(self) -> None:
        """Click the ← Back to Catalogue link."""
        self.click(*self.BACK_TO_CATALOGUE)
