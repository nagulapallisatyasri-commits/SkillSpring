"""
CourseCataloguePage
====================
Page Object for the Course Catalogue ( http://localhost:3000/ ).

Locators used (from the actual frontend source):
  #search-input          — keyword search box
  #category-filter       — category dropdown
  #level-filter          — difficulty dropdown
  #btn-reset-filters     — reset filters button
  #catalogue-grid        — grid container holding all visible course cards
  #empty-state           — shown when no courses match the filter
  [data-testid="course-title-{id}"]   — title of a specific course card
  [data-testid="course-level-{id}"]   — difficulty badge on a specific card
  [data-testid="open-tab-{id}"]       — "New Tab" anchor on a course card
"""

from selenium.webdriver.common.by import By

from tests.pages.base_page import BasePage
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..'))
from tests.config.settings import BASE_URL


class CourseCataloguePage(BasePage):
    """Encapsulates all interactions with the Course Catalogue page."""

    # ------------------------------------------------------------------
    # Locators
    # ------------------------------------------------------------------
    SEARCH_INPUT      = (By.ID, "search-input")
    CATEGORY_FILTER   = (By.ID, "category-filter")
    LEVEL_FILTER      = (By.ID, "level-filter")
    RESET_BTN         = (By.ID, "btn-reset-filters")
    CATALOGUE_GRID    = (By.ID, "catalogue-grid")
    EMPTY_STATE       = (By.ID, "empty-state")

    # ------------------------------------------------------------------
    # Navigation
    # ------------------------------------------------------------------

    def open_catalogue(self) -> None:
        """Navigate to the home / catalogue page."""
        self.open(BASE_URL + "/")
        # Wait until the search box is ready
        self.find(*self.SEARCH_INPUT)

    # ------------------------------------------------------------------
    # Search and filter actions
    # ------------------------------------------------------------------

    def search(self, keyword: str) -> None:
        """Type a keyword into the search box and wait for results."""
        self.type_text(*self.SEARCH_INPUT, keyword)

    def select_category(self, category: str) -> None:
        """
        Choose a category from the dropdown.
        `category` must match one of the option texts exactly,
        e.g. "Programming", "Web Development".
        """
        from selenium.webdriver.support.ui import Select
        element = self.find(*self.CATEGORY_FILTER)
        Select(element).select_by_visible_text(category)

    def select_level(self, level: str) -> None:
        """Choose a difficulty level: 'Beginner', 'Intermediate', or 'Advanced'."""
        from selenium.webdriver.support.ui import Select
        element = self.find(*self.LEVEL_FILTER)
        Select(element).select_by_visible_text(level)

    def reset_filters(self) -> None:
        """Click the Reset Filters button to clear all search criteria."""
        self.click(*self.RESET_BTN)

    # ------------------------------------------------------------------
    # Result reading helpers
    # ------------------------------------------------------------------

    def get_course_title(self, course_id: str) -> str:
        """
        Return the displayed title text for a specific course card.

        Example:
            title = catalogue.get_course_title("python-automation")
            # → "Python for Automation & Data"
        """
        locator = (By.CSS_SELECTOR, f'[data-testid="course-title-{course_id}"]')
        return self.get_text(*locator)

    def get_course_level(self, course_id: str) -> str:
        """Return the difficulty badge text (e.g. 'Beginner') for a course card."""
        locator = (By.CSS_SELECTOR, f'[data-testid="course-level-{course_id}"]')
        text = self.get_text(*locator)
        return text.capitalize() if text else ""

    def get_visible_course_cards(self) -> list:
        """Return a list of all currently visible course card elements."""
        return self.find_all(
            By.CSS_SELECTOR, '[data-testid^="course-card-"]'
        )

    def is_empty_state_shown(self) -> bool:
        """Return True when no courses match the filter (empty state displayed)."""
        return self.is_visible(*self.EMPTY_STATE, timeout=4)

    def is_course_card_visible(self, course_id: str) -> bool:
        """Return True if the card for the given course ID is visible."""
        return self.is_visible(
            By.CSS_SELECTOR, f'[data-testid="course-card-{course_id}"]', timeout=4
        )

    # ------------------------------------------------------------------
    # Navigation actions from the catalogue
    # ------------------------------------------------------------------

    def click_view_course(self, course_id: str) -> None:
        """Click the 'View Course' button on a specific card."""
        locator = (By.CSS_SELECTOR, f'[data-testid="btn-details-{course_id}"]')
        self.click(*locator)

    def get_open_new_tab_link(self, course_id: str):
        """
        Return the 'New Tab' anchor element for a given course.
        The test will then call .click() on it (TC04).
        """
        locator = (By.CSS_SELECTOR, f'[data-testid="open-tab-{course_id}"]')
        return self.find_clickable(*locator)
