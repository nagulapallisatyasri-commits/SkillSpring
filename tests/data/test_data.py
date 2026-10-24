"""
Test data for SkillSpring quiz scenarios (TC06).

Format:
  Each entry in QUIZ_SCENARIOS has:
    scenario_id  — human-readable label
    answers      — dict of question_number → answer_key
    expected_score    — string e.g. "2/2"
    expected_feedback — either "Passed" or "Needs Improvement"
    expected_css_class — either "alert-success" or "alert-danger"
"""

QUIZ_SCENARIOS = [
    {
        "scenario_id": "all_correct",
        "description": "All answers correct — should PASS",
        "answers": {1: "b", 2: "a"},
        "expected_score": "2/2",
        "expected_feedback": "Passed",
        "expected_css_class": "alert-success",
    },
    {
        "scenario_id": "all_incorrect",
        "description": "All answers wrong — should NEED IMPROVEMENT",
        "answers": {1: "a", 2: "c"},
        "expected_score": "0/2",
        "expected_feedback": "Needs Improvement",
        "expected_css_class": "alert-danger",
    },
]

# Search test data (TC01)
SEARCH_TEST_DATA = [
    {
        "keyword": "Python",
        "expected_course_id": "python-automation",
        "expected_title": "Python for Automation & Data",
        "expected_level": "Beginner",
    }
]

# Course IDs used across multiple tests
OPEN_COURSE_ID     = "web-dev-basics"
OPEN_COURSE_TITLE  = "Full-Stack Web Foundations"

FULL_COURSE_ID     = "cloud-architecture-masterclass"
FULL_COURSE_REJECTION_MSG = (
    "This course is currently at maximum capacity. Enrolment is closed."
)

NEW_TAB_COURSE_ID  = "react-deep-dive"
NEW_TAB_TESTID     = "open-tab-react-deep-dive"

LESSON_COURSE_ID   = "python-automation"
AVAILABLE_LESSON   = "lesson-1-intro"
LOCKED_LESSON      = "lesson-3-advanced"
# The locked alert in LessonPlayerClient.tsx renders:
# <strong>Restricted Module:</strong> This lesson is locked. Complete previous modules to unlock.
# Selenium's .text strips HTML tags, giving us the full string:
LOCKED_LESSON_MSG  = "Restricted Module: This lesson is locked. Complete previous modules to unlock."

# For TC07 — course title used when traversing the table with XPath
TC07_COURSE_TITLE    = "Full-Stack Web Foundations"
TC07_EXPECTED_STATUS = "In Progress"   # text from <span class="status-pill status-in-progress">
TC07_EXPECTED_PROGRESS_CONTAINS = "50"   # table progress cell contains "50"
