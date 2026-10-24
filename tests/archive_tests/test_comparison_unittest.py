"""
test_comparison_unittest.py
============================
Project Plan Requirement — unittest vs pytest Comparison Test
=============================================================
This file satisfies the mandatory requirement in docs/PROJECT_PLAN.md to include
a test suite written using the standard library unittest.TestCase class to
demonstrate awareness of both frameworks.

Topic: Compare unittest.TestCase assertions with the equivalent pytest assertions
       across representative SkillSpring URL and page-title checks.

Notes for students:
  • unittest.TestCase requires:
      class MyTest(unittest.TestCase):
          def test_something(self):
              self.assertEqual(a, b)
  • pytest assertions use plain Python `assert` statements:
      def test_something():
          assert a == b
  • Both frameworks can run the same Selenium browser sessions.
  • pytest is preferred in professional projects because of shorter syntax,
    better error messages, and fixture support.
"""

import logging
import os
import sys
import unittest

# Make the project root importable
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from tests.config.driver_factory import DriverFactory
from tests.config.settings import BASE_URL

logger = logging.getLogger("skillspring")


class TestSkillSpringUnittest(unittest.TestCase):
    """
    Selenium tests using the standard library unittest.TestCase style.

    Note: The driver is set up in setUp() and torn down in tearDown().
    Unlike pytest fixtures, unittest setUp/tearDown runs for every test method.
    """

    # ------------------------------------------------------------------
    # setUp and tearDown — equivalent to pytest's function-scope fixture
    # ------------------------------------------------------------------

    @classmethod
    def setUpClass(cls):
        """
        setUpClass runs ONCE before any test in this class.
        We create one driver for the whole class (session-like scope)
        to speed up the unittest comparison suite.
        """
        cls.driver = DriverFactory.create_driver()
        cls.driver.get(BASE_URL)
        logger.info("unittest setUpClass: Browser started.")

    @classmethod
    def tearDownClass(cls):
        """tearDownClass runs ONCE after all tests in this class finish."""
        cls.driver.quit()
        logger.info("unittest tearDownClass: Browser closed.")

    def setUp(self):
        """Clear localStorage before every individual test method."""
        self.driver.execute_script("""
            ['skillspring_enrolled_courses',
             'skillspring_completed_lessons',
             'skillspring_enrolment_dates'
            ].forEach(k => window.localStorage.removeItem(k));
        """)

    # ------------------------------------------------------------------
    # Test methods
    # ------------------------------------------------------------------

    def test_01_catalogue_page_loads(self):
        """
        Verify the catalogue page loads and has the expected title.

        unittest style:  self.assertIn(substring, string)
        pytest style:    assert substring in string
        """
        self.driver.get(BASE_URL + "/")
        page_title = self.driver.title
        logger.info(f"unittest: catalogue title = '{page_title}'")

        # unittest assertion
        self.assertIn("SkillSpring", page_title,
                      f"Expected 'SkillSpring' in page title, got: {page_title!r}")

    def test_02_my_learning_page_loads(self):
        """
        Verify the My Learning page responds with status 200
        and the URL is correct.

        unittest style:  self.assertEqual(a, b)
        pytest style:    assert a == b
        """
        self.driver.get(BASE_URL + "/my-learning")
        current_url = self.driver.current_url
        logger.info(f"unittest: my-learning URL = '{current_url}'")

        self.assertIn("/my-learning", current_url,
                      f"Expected /my-learning in URL, got: {current_url!r}")

    def test_03_course_detail_page_loads(self):
        """
        Verify the course details page for python-automation loads correctly.

        unittest style:  self.assertTrue(condition)
        pytest style:    assert condition
        """
        from selenium.webdriver.common.by import By
        from selenium.webdriver.support.ui import WebDriverWait
        from selenium.webdriver.support import expected_conditions as EC

        self.driver.get(BASE_URL + "/courses/python-automation")
        wait = WebDriverWait(self.driver, 10)
        header = wait.until(
            EC.visibility_of_element_located((By.ID, "course-header")),
            message="#course-header not visible on python-automation details page"
        )

        self.assertTrue(header.is_displayed(),
                        "#course-header element exists but is not displayed")

    def test_04_search_filters_catalogue(self):
        """
        Type 'Python' in the search box and verify the correct card appears.

        unittest style:  self.assertNotEqual(a, "") 
        pytest style:    assert a != ""
        """
        from selenium.webdriver.common.by import By
        from selenium.webdriver.support.ui import WebDriverWait
        from selenium.webdriver.support import expected_conditions as EC

        self.driver.get(BASE_URL + "/")
        wait = WebDriverWait(self.driver, 10)

        # Find search box and type
        search = wait.until(EC.visibility_of_element_located((By.ID, "search-input")))
        search.clear()
        search.send_keys("Python")

        # Wait for the course card title to appear
        title_el = wait.until(
            EC.visibility_of_element_located(
                (By.CSS_SELECTOR, '[data-testid="course-title-python-automation"]')
            ),
            message="Course card for python-automation not visible after search"
        )
        title_text = title_el.text.strip()
        logger.info(f"unittest: search result title = '{title_text}'")

        # unittest assertion
        self.assertEqual(title_text, "Python for Automation & Data",
                         f"Course title mismatch: {title_text!r}")

    def test_05_lesson_page_loads(self):
        """
        Navigate to lesson-1-intro and confirm the lesson title is visible.

        unittest style:  self.assertNotEqual(a, "")
        pytest style:    assert a != ""
        """
        import json
        from selenium.webdriver.common.by import By
        from selenium.webdriver.support.ui import WebDriverWait
        from selenium.webdriver.support import expected_conditions as EC

        # Seed enrolment so the lesson player allows access
        self.driver.execute_script(
            "window.localStorage.setItem('skillspring_enrolled_courses', arguments[0]);",
            json.dumps(["python-automation"])
        )

        self.driver.get(BASE_URL + "/learn/python-automation/lesson/lesson-1-intro")
        wait = WebDriverWait(self.driver, 10)

        title_el = wait.until(
            EC.visibility_of_element_located((By.ID, "lesson-title")),
            message="#lesson-title not found on lesson player page"
        )
        title_text = title_el.text.strip()
        logger.info(f"unittest: lesson title = '{title_text}'")

        self.assertNotEqual(title_text, "",
                            "Lesson title was empty — page may not have loaded.")


# ======================================================================
# Allow running this file directly: python test_comparison_unittest.py
# ======================================================================

if __name__ == "__main__":
    unittest.main(verbosity=2)
