"""
QuizPage
=========
Page Object for the Quiz page ( /learn/<courseId>/quiz ).

Locators used (from the actual frontend source):
  #quiz-form             — the <form> wrapping all questions
  #quiz-title            — quiz heading text
  #btn-submit-quiz       — submit button
  #quiz-score            — score text (e.g. "2/2")
  #quiz-feedback         — result banner with "Passed" or "Needs Improvement"
  #btn-retake-quiz       — retake button shown after submission
  input[name="q{n}"][value="{key}"]  — a radio option for question n, answer key

TC06 quiz data (python-automation):
  Correct answers  → q1="b", q2="a"  → Score 2/2 → "Passed"
  Incorrect answers→ q1="a", q2="c"  → Score 0/2 → "Needs Improvement"
"""

from selenium.webdriver.common.by import By

from tests.pages.base_page import BasePage
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..'))
from tests.config.settings import BASE_URL


class QuizPage(BasePage):
    """Encapsulates all interactions with the Quiz assessment page."""

    # ------------------------------------------------------------------
    # Locators
    # ------------------------------------------------------------------
    QUIZ_FORM       = (By.ID, "quiz-form")
    QUIZ_TITLE      = (By.ID, "quiz-title")
    SUBMIT_BTN      = (By.ID, "btn-submit-quiz")
    QUIZ_SCORE      = (By.ID, "quiz-score")
    QUIZ_FEEDBACK   = (By.ID, "quiz-feedback")
    RETAKE_BTN      = (By.ID, "btn-retake-quiz")

    # ------------------------------------------------------------------
    # Navigation
    # ------------------------------------------------------------------

    def open_quiz(self, course_id: str) -> None:
        """Navigate directly to the quiz for the given course."""
        url = f"{BASE_URL}/learn/{course_id}/quiz"
        self.open(url)
        self.find(*self.QUIZ_FORM)   # wait until form is ready

    # ------------------------------------------------------------------
    # Interacting with questions
    # ------------------------------------------------------------------

    def select_answer(self, question_number: int, answer_key: str) -> None:
        """
        Click the radio button for the given question and answer.

        Parameters
        ----------
        question_number : int
            1-based question index (1 = first question)
        answer_key : str
            Option letter: 'a', 'b', 'c', or 'd'

        Example:
            quiz.select_answer(1, "b")   # selects option b for question 1
        """
        name  = f"q{question_number}"
        css   = f'input[name="{name}"][value="{answer_key}"]'
        self.click(By.CSS_SELECTOR, css)

    def select_all_answers(self, answers: dict) -> None:
        """
        Select multiple answers at once.

        Parameters
        ----------
        answers : dict
            Mapping of question_number (int) → answer_key (str).
            Example: {1: "b", 2: "a"}
        """
        for question_number, key in answers.items():
            self.select_answer(question_number, key)

    def submit_quiz(self) -> None:
        """Click the Submit Quiz Answers button."""
        self.click(*self.SUBMIT_BTN)

    # ------------------------------------------------------------------
    # Reading results
    # ------------------------------------------------------------------

    def get_score_text(self) -> str:
        """
        Return the score text shown after submission.
        Example: "2/2"  or  "0/2"
        """
        return self.get_text(*self.QUIZ_SCORE)

    def get_feedback_text(self) -> str:
        """
        Return the feedback text from the result banner.
        Should contain "Passed" or "Needs Improvement".
        """
        return self.get_text(*self.QUIZ_FEEDBACK)

    def get_feedback_classes(self) -> str:
        """
        Return the CSS class string of the feedback element.
        TC06 checks for 'alert-success' (Passed) or 'alert-danger' (Needs Improvement).
        """
        return self.get_attribute(*self.QUIZ_FEEDBACK, attribute="class")

    def is_score_visible(self) -> bool:
        """Return True when the score element appears after submission."""
        return self.is_visible(*self.QUIZ_SCORE, timeout=6)

    # ------------------------------------------------------------------
    # Reset
    # ------------------------------------------------------------------

    def retake_quiz(self) -> None:
        """Click 'Retake Assessment' to reset the quiz state."""
        self.click(*self.RETAKE_BTN)
        # Wait for the form to be ready again
        self.find(*self.SUBMIT_BTN)
