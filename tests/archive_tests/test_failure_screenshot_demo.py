"""
test_failure_screenshot_demo.py
===============================
Task 5.3 Intentional Failure & Screenshot Verification Demo
===========================================================
This test intentionally forces an assertion failure to demonstrate and verify:
  1. The pytest hook captures a timestamped PNG screenshot in tests/screenshots/.
  2. The screenshot is base64-embedded directly into the pytest-html report.
  3. The local screenshot path is logged and recorded in the report extras.

NOTE: This test is marked with @pytest.mark.demo_failure and is SKIPPED by default
in normal test runs so the standard suite passes 100%.

To run this intentional failure demo:
    $env:RUN_FAILURE_DEMO="1"; python -m pytest tests/test_cases/test_failure_screenshot_demo.py -v
"""

import os
import pytest

from tests.pages.course_catalogue_page import CourseCataloguePage


class TestFailureScreenshotDemo:
    """Demonstration of failure screenshot capture and HTML report embedding."""

    @pytest.mark.demo_failure
    @pytest.mark.skipif(
        os.environ.get("RUN_FAILURE_DEMO") != "1",
        reason="Intentional failure demo: excluded from normal test runs. Set RUN_FAILURE_DEMO=1 to run."
    )
    def test_intentional_failure_for_screenshot_verification(self, driver):
        """
        Intentional failure scenario:
        Navigates to the Course Catalogue, then executes an intentionally failing assertion
        to prove that the framework automatically captures a screenshot and embeds it in the HTML report.
        """
        catalogue = CourseCataloguePage(driver)
        catalogue.open_catalogue()

        # Intentionally failing assertion to trigger failure screenshot hook
        assert False, (
            "DEMO INTENTIONAL FAILURE: Verifying that conftest.py automatically captures "
            "a failure screenshot in tests/screenshots/ and embeds it in the HTML report."
        )
