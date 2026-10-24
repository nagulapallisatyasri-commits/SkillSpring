"use client";

import { useState } from "react";
import Link from "next/link";
import { getCourseById } from "@/data/mockCourses";
import LessonSidebar from "@/components/LessonSidebar";

interface CourseQuizClientProps {
  courseId: string;
}

export default function CourseQuizClient({ courseId }: CourseQuizClientProps) {
  const course = getCourseById(courseId);

  // Selected radio option keys: { q1: "b", q2: "a" }
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  if (!course) {
    return (
      <main className="main-content">
        <div className="empty-state">
          <div className="empty-state-icon">&#9888;</div>
          <h2>Course Not Found</h2>
          <p>The requested course does not exist.</p>
          <Link href="/" className="btn btn-primary">
            &larr; Return to Catalogue
          </Link>
        </div>
      </main>
    );
  }

  const quiz = course.quiz;

  if (!quiz) {
    return (
      <main className="main-content">
        <div className="empty-state">
          <div className="empty-state-icon">&#128221;</div>
          <h2>No Assessment Available</h2>
          <p>There is currently no quiz scheduled for this training module.</p>
          <Link href={`/courses/${course.id}`} className="btn btn-primary">
            &larr; Return to Course Overview
          </Link>
        </div>
      </main>
    );
  }

  const handleOptionChange = (questionId: string, optionKey: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionKey,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let computedScore = 0;
    quiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        computedScore += 1;
      }
    });

    setScore(computedScore);
    setIsSubmitted(true);
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setScore(null);
  };

  const isPassed = score !== null && score >= quiz.passingScore;

  return (
    <main className="main-content">
      <div className="lesson-layout">
        {/* Navigation Sidebar */}
        <LessonSidebar course={course} isQuizActive={true} />

        {/* Main Quiz Section */}
        <section
          className="quiz-container"
          id="quiz-container"
          data-testid="quiz-container"
        >
          <div className="quiz-header">
            <div className="card-badges-row">
              <span className="card-badge badge-intermediate">Competency Assessment</span>
              <span className="card-category-tag">{course.category}</span>
            </div>

            <h1 className="quiz-title" id="quiz-title" data-testid="quiz-title">
              {quiz.title}
            </h1>

            <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>
              {quiz.description}
            </p>
          </div>

          {/* Form (TC06: #quiz-form) */}
          <form id="quiz-form" data-testid="quiz-form" onSubmit={handleSubmit}>
            {quiz.questions.map((question) => {
              const qName = question.id; // e.g. "q1", "q2"
              const userAnswer = selectedAnswers[qName];
              const isCorrect = userAnswer === question.correctAnswer;

              return (
                <div
                  key={question.id}
                  className="quiz-question-card"
                  id={`question-card-${question.id}`}
                  data-testid={`question-card-${question.id}`}
                >
                  <span className="question-badge">
                    Question {question.questionNumber} of {quiz.questions.length}
                  </span>

                  <h3
                    className="quiz-question-text"
                    id={`question-text-${question.id}`}
                  >
                    {question.questionText}
                  </h3>

                  <div className="quiz-options-group">
                    {question.options.map((option) => {
                      const isOptionSelected = userAnswer === option.key;

                      return (
                        <label
                          key={option.key}
                          htmlFor={`${qName}-${option.key}`}
                          className={`quiz-option-label ${
                            isSubmitted
                              ? option.key === question.correctAnswer
                                ? "option-correct"
                                : isOptionSelected
                                ? "option-incorrect"
                                : ""
                              : isOptionSelected
                              ? "option-active"
                              : ""
                          }`}
                        >
                          <input
                            type="radio"
                            id={`${qName}-${option.key}`}
                            name={qName}
                            value={option.key}
                            data-testid={`option-${qName}-${option.key}`}
                            checked={isOptionSelected}
                            onChange={() => handleOptionChange(qName, option.key)}
                            disabled={isSubmitted}
                            className="quiz-radio"
                          />
                          <span className="quiz-option-text">
                            <strong>{option.key.toUpperCase()}.</strong> {option.text}
                          </span>
                        </label>
                      );
                    })}
                  </div>

                  {/* Post-submission question feedback */}
                  {isSubmitted && (
                    <div
                      style={{
                        marginTop: "1rem",
                        padding: "0.75rem 1rem",
                        borderRadius: "var(--radius-sm)",
                        fontSize: "0.85rem",
                        background: isCorrect
                          ? "rgba(16, 185, 129, 0.1)"
                          : "rgba(244, 63, 94, 0.1)",
                        border: isCorrect
                          ? "1px solid rgba(16, 185, 129, 0.25)"
                          : "1px solid rgba(244, 63, 94, 0.25)",
                        color: isCorrect ? "#34d399" : "#fb7185",
                      }}
                    >
                      <strong>{isCorrect ? "Correct!" : "Incorrect."}</strong>{" "}
                      {question.explanation}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Quiz Submission Button (TC06: #btn-submit-quiz) */}
            {!isSubmitted ? (
              <div style={{ marginTop: "2rem" }}>
                <button
                  type="submit"
                  id="btn-submit-quiz"
                  data-testid="btn-submit-quiz"
                  className="btn btn-primary"
                >
                  Submit Quiz Answers &rarr;
                </button>
              </div>
            ) : null}
          </form>

          {/* Quiz Score & Feedback Result Display (TC06: #quiz-score, #quiz-feedback) */}
          {isSubmitted && score !== null && (
            <div
              className="quiz-result-card"
              id="quiz-result-card"
              data-testid="quiz-result-card"
            >
              <div className="quiz-score-display">
                Score:{" "}
                <span id="quiz-score" data-testid="quiz-score">
                  {score}/{quiz.totalQuestions}
                </span>
              </div>

              {/* Feedback Alert Banner (TC06: #quiz-feedback with alert-success or alert-danger) */}
              <div
                id="quiz-feedback"
                data-testid="quiz-feedback"
                className={`quiz-feedback-banner alert ${
                  isPassed ? "alert-success" : "alert-danger"
                }`}
                role="status"
              >
                <span className="alert-icon">{isPassed ? "✔" : "⚠"}</span>
                <div>
                  {isPassed ? (
                    <span>
                      <strong>Passed</strong> &mdash; Excellent work! You have successfully mastered
                      these concepts.
                    </span>
                  ) : (
                    <span>
                      <strong>Needs Improvement</strong> &mdash; Review the module materials and try
                      again to achieve mastery.
                    </span>
                  )}
                </div>
              </div>

              {/* Navigation Actions */}
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  marginTop: "1.5rem",
                  flexWrap: "wrap",
                }}
              >
                <button
                  type="button"
                  id="btn-retake-quiz"
                  data-testid="btn-retake-quiz"
                  className="btn btn-secondary"
                  onClick={handleRetake}
                >
                  &#8635; Retake Assessment
                </button>
                <Link
                  href="/my-learning"
                  id="btn-quiz-my-learning"
                  data-testid="btn-quiz-my-learning"
                  className="btn btn-primary"
                >
                  Return to My Learning &rarr;
                </Link>
                <Link
                  href={`/courses/${course.id}`}
                  className="btn btn-secondary"
                  id="btn-quiz-course-details"
                >
                  Course Overview
                </Link>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
