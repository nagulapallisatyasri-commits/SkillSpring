"""
MyLearningPage
==============
Page Object for the My Learning dashboard ( /my-learning ).

Locators used (from the actual frontend source):
  #my-learning-table                    — the <table> element
  [data-testid="course-row-{id}"]       — a table row for a specific course
  [data-testid="title-{id}"]            — course title cell  (.course-title)
  [data-testid="status-{id}"]           — status pill cell   (.course-status)
  [data-testid="progress-{id}"]         — progress cell      (.course-progress)
  [data-testid="btn-continue-{id}"]     — Continue Learning button
  #my-learning-empty                    — empty state section
  #btn-seed-data                        — seed test fixtures toolbar button
"""

from selenium.webdriver.common.by import By

from tests.pages.base_page import BasePage
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..'))
from tests.config.settings import BASE_URL


class MyLearningPage(BasePage):
    """Encapsulates all interactions with the My Learning dashboard."""

    # ------------------------------------------------------------------
    # Locators
    # ------------------------------------------------------------------
    TABLE             = (By.ID, "my-learning-table")
    EMPTY_STATE       = (By.ID, "my-learning-empty")
    SEED_DATA_BTN     = (By.ID, "btn-seed-data")
    TABLE_BODY        = (By.CSS_SELECTOR, "#my-learning-table tbody")

    # ------------------------------------------------------------------
    # Navigation
    # ------------------------------------------------------------------

    def open_my_learning(self) -> None:
        """Navigate directly to the My Learning dashboard."""
        self.open(BASE_URL + "/my-learning")
        # Wait for either the table or the empty state to appear
        from selenium.webdriver.support import expected_conditions as EC
        from selenium.webdriver.support.ui import WebDriverWait
        WebDriverWait(self.driver, self.timeout).until(
            lambda d: (
                d.find_elements(By.ID, "my-learning-table") or
                d.find_elements(By.ID, "my-learning-empty")
            ),
            "Neither table nor empty state appeared on My Learning page"
        )

    # ------------------------------------------------------------------
    # Table state
    # ------------------------------------------------------------------

    def is_table_visible(self) -> bool:
        """Return True if the enrolled-courses table is displayed."""
        return self.is_visible(*self.TABLE, timeout=4)

    def is_empty_state_shown(self) -> bool:
        """Return True when no courses are enrolled (empty state shown)."""
        return self.is_visible(*self.EMPTY_STATE, timeout=4)

    def is_course_row_present(self, course_id: str) -> bool:
        """Return True if a table row for the given course ID exists."""
        return self.is_present(
            By.CSS_SELECTOR, f'[data-testid="course-row-{course_id}"]', timeout=4
        )

    # ------------------------------------------------------------------
    # Reading row data (TC07)
    # ------------------------------------------------------------------

    def get_course_title_from_table(self, course_id: str) -> str:
        """
        Return the course title text from the table row.
        Uses the CSS class .course-title inside the row.
        """
        locator = (By.CSS_SELECTOR, f'[data-testid="title-{course_id}"]')
        return self.get_text(*locator)

    def get_course_status(self, course_id: str) -> str:
        """
        Return the enrolment status text from the table row.
        Expected values: "Enrolled", "In Progress", "Completed"
        """
        locator = (By.CSS_SELECTOR, f'[data-testid="status-{course_id}"]')
        return self.get_text(*locator)

    def get_course_progress(self, course_id: str) -> str:
        """
        Return the raw progress text displayed in the cell.
        The cell shows the percentage as text, e.g. "0%" or "50%".
        """
        locator = (By.CSS_SELECTOR, f'[data-testid="progress-{course_id}"]')
        return self.get_text(*locator)

    # ------------------------------------------------------------------
    # Using XPath to traverse the table (demonstrates TC07 XPath technique)
    # ------------------------------------------------------------------

    def get_row_by_title(self, title_text: str):
        """
        Locate a table row by searching for a cell whose text matches the
        course title.  This uses the same XPath approach described in TC07.

        Returns the <tr> WebElement.
        """
        xpath = (
            f"//tr[.//td[contains(@class,'course-title') "
            f"and contains(text(),'{title_text}')]]"
        )
        return self.find(By.XPATH, xpath)

    def get_cell_text_in_row(self, row_element, css_class: str) -> str:
        """
        Given a <tr> element, find a <td> by CSS class and return its text.

        Example:
            row = page.get_row_by_title("Full-Stack Web Foundations")
            status = page.get_cell_text_in_row(row, "course-status")
        """
        cell = row_element.find_element(By.CSS_SELECTOR, f".{css_class}")
        return cell.text.strip()

    # ------------------------------------------------------------------
    # Actions
    # ------------------------------------------------------------------

    def click_continue_learning(self, course_id: str) -> None:
        """Click the 'Continue Learning' button for a specific course row."""
        locator = (By.CSS_SELECTOR, f'[data-testid="btn-continue-{course_id}"]')
        self.click(*locator)

    def click_seed_data(self) -> None:
        """Click the 'Seed Test Fixtures' button in the toolbar."""
        self.click(*self.SEED_DATA_BTN)
        # Brief pause for localStorage writes to propagate before re-querying DOM
        import time
        time.sleep(0.5)
        self.driver.refresh()
        # Wait for the page to reload
        from selenium.webdriver.support import expected_conditions as EC
        from selenium.webdriver.support.ui import WebDriverWait
        WebDriverWait(self.driver, self.timeout).until(
            lambda d: d.find_elements(By.ID, "my-learning-table"),
            "Table did not appear after seeding data"
        )
