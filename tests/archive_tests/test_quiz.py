"""
TC06 — Submit a Quiz and Verify Score and Feedback Banner
===========================================================
Test ID : TC06
Objective: Submit quiz answers (both correct and incorrect scenarios)
           and verify the score text and feedback class match expectations.

Scenarios (loaded from tests/data/quiz_data.json):
  all_correct  → answers {q1: b, q2: a} → Score 2/2 → "Passed"
  all_incorrect → answers {q1: a, q2: c} → Score 0/2 → "Needs Improvement"

Steps (repeated for each scenario):
  1. Seed enrolment for python-automation.
  2. Navigate to /learn/python-automation/quiz.
  3. Wait for #quiz-form to be visible.
  4. Select each radio button per the scenario answers.
  5. Click #btn-submit-quiz.
  6. Wait for #quiz-score to appear.
  7. Assert score text == expected_score.
  8. Assert #quiz-feedback text contains expected_feedback.
  9. Assert #quiz-feedback class list contains expected_css_class.
"""

import json
import logging
import os
import sys

import pytest

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from tests.pages.quiz_page import QuizPage
from tests.pages.lesson_player_page import LessonPlayerPage
from tests.data.test_data import LESSON_COURSE_ID

logger = logging.getLogger("skillspring")


# ======================================================================
# Load quiz scenarios from JSON at module load time
# ======================================================================

def _load_quiz_scenarios():
    path = os.path.join(
        os.path.dirname(__file__), "..", "data", "quiz_data.json"
    )
    with open(path, encoding="utf-8") as fh:
        return json.load(fh)


_QUIZ_SCENARIOS = _load_quiz_scenarios()
_SCENARIO_IDS   = [s["scenario_id"] for s in _QUIZ_SCENARIOS]


# ======================================================================
# TC06 — Parameterised quiz test
# ======================================================================

class TestQuizSubmission:
    """TC06: Quiz submission and result validation."""

    @pytest.mark.tc06
    @pytest.mark.smoke
    @pytest.mark.parametrize("scenario", _QUIZ_SCENARIOS, ids=_SCENARIO_IDS)
    def test_tc06_quiz_submission(self, driver, scenario):
        """
        TC06 — Submit quiz with given answers and verify score + feedback.

        This test is parameterised over tests/data/quiz_data.json so both
        the 'Passed' and 'Needs Improvement' paths are covered in a single
        test definition.
        """
        logger.info(
            f"TC06 [{scenario['scenario_id']}]: {scenario['description']}"
        )

        # ---- Pre-condition: enrol in python-automation ----
        base_page = LessonPlayerPage(driver)    # BasePage subclass for seed helpers
        base_page.seed_enrolment(LESSON_COURSE_ID)

        # ---- Step 1: Open quiz ----
        quiz = QuizPage(driver)
        quiz.open_quiz(LESSON_COURSE_ID)

        # ---- Step 2: Select answers ----
        # quiz_data.json stores: {"q1": "b", "q2": "a"}
        # We need integer question numbers: {1: "b", 2: "a"}
        answers_dict = {
            int(k.replace("q", "")): v
            for k, v in scenario["answers"].items()
        }
        logger.info(f"TC06: Selecting answers {answers_dict}")
        quiz.select_all_answers(answers_dict)

        # ---- Step 3: Submit ----
        logger.info("TC06: Submitting quiz")
        quiz.submit_quiz()

        # ---- Step 4: Wait for score to appear ----
        assert quiz.is_score_visible(), (
            "#quiz-score did not appear after submitting the quiz. "
            "Check that #btn-submit-quiz is wired to the score calculation."
        )

        # ---- Step 5: Verify score text ----
        actual_score = quiz.get_score_text()
        expected_score = scenario["expected_score"]
        logger.info(f"TC06: Score = '{actual_score}' (expected '{expected_score}')")
        assert actual_score == expected_score, (
            f"[{scenario['scenario_id']}] Score mismatch: "
            f"expected {expected_score!r}, got {actual_score!r}"
        )

        # ---- Step 6: Verify feedback banner text ----
        actual_feedback = quiz.get_feedback_text()
        expected_feedback = scenario["expected_feedback"]
        logger.info(
            f"TC06: Feedback = '{actual_feedback}' "
            f"(expected to contain '{expected_feedback}')"
        )
        assert expected_feedback in actual_feedback, (
            f"[{scenario['scenario_id']}] Feedback mismatch: "
            f"expected {expected_feedback!r} inside {actual_feedback!r}"
        )

        # ---- Step 7: Verify feedback banner CSS class ----
        css_classes = quiz.get_feedback_classes()
        expected_class = scenario["expected_css_class"]
        logger.info(f"TC06: Feedback CSS classes = '{css_classes}'")
        assert expected_class in css_classes, (
            f"[{scenario['scenario_id']}] Expected CSS class {expected_class!r} "
            f"in '{css_classes}'"
        )

        logger.info(f"TC06 [{scenario['scenario_id']}]: PASSED")

    @pytest.mark.tc06
    def test_tc06_retake_quiz_resets_state(self, driver):
        """
        TC06 supplement — After submitting, clicking 'Retake Assessment'
        resets the form so a new attempt can begin.
        """
        logger.info("TC06-retake: Verifying retake functionality")
        base_page = LessonPlayerPage(driver)
        base_page.seed_enrolment(LESSON_COURSE_ID)

        quiz = QuizPage(driver)
        quiz.open_quiz(LESSON_COURSE_ID)

        # Submit any answer
        quiz.select_all_answers({1: "b", 2: "a"})
        quiz.submit_quiz()
        assert quiz.is_score_visible(), "#quiz-score did not appear"

        # Retake
        quiz.retake_quiz()

        # Submit button must be back and score hidden
        assert quiz.is_visible(*QuizPage.SUBMIT_BTN, timeout=5), \
            "#btn-submit-quiz not visible after retake"
        assert not quiz.is_visible(*QuizPage.QUIZ_SCORE, timeout=3), \
            "#quiz-score should be hidden after retake"

        logger.info("TC06-retake: PASSED.")
