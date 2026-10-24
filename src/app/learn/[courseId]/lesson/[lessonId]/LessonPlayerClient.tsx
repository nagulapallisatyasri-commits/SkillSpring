"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getCourseById } from "@/data/mockCourses";
import LessonSidebar from "@/components/LessonSidebar";
import Toast, { showToast } from "@/components/Toast";
import {
  isLessonCompleted,
  markLessonComplete,
  calculateCourseProgress,
  enrolCourse,
} from "@/utils/storage";

interface LessonPlayerClientProps {
  courseId: string;
  lessonId: string;
}

export default function LessonPlayerClient({ courseId, lessonId }: LessonPlayerClientProps) {
  const course = getCourseById(courseId);
  const lesson = course?.lessons.find((l) => l.id === lessonId);

  const [completed, setCompleted] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    if (course) {
      enrolCourse(course.id);
      const isComp = isLessonCompleted(course.id, lessonId);
      setCompleted(isComp);

      const progress = calculateCourseProgress(course.id, course.lessons.length);
      setProgressPercentage(progress.percentage);
    }
  }, [course, lessonId]);

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

  if (!lesson) {
    return (
      <main className="main-content">
        <div className="empty-state">
          <div className="empty-state-icon">&#9888;</div>
          <h2>Lesson Not Found</h2>
          <p>The requested lesson module &quot;{lessonId}&quot; could not be found.</p>
          <Link href={`/courses/${course.id}`} className="btn btn-primary">
            &larr; Return to Course Overview
          </Link>
        </div>
      </main>
    );
  }

  const isLocked = Boolean(lesson.isLocked);

  const currentIdx = course.lessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIdx > 0 ? course.lessons[currentIdx - 1] : null;
  const nextLesson =
    currentIdx < course.lessons.length - 1 ? course.lessons[currentIdx + 1] : null;

  const handleMarkComplete = () => {
    if (isLocked) return;

    markLessonComplete(course.id, lesson.id);
    setCompleted(true);

    const updated = calculateCourseProgress(course.id, course.lessons.length);
    setProgressPercentage(updated.percentage);

    window.dispatchEvent(new Event("skillspring_enrolment_updated"));
    showToast("Lesson completed! Progress saved.", "success");
  };

  return (
    <main className="main-content">
      <Toast />

      <div className="two-col-layout">
        {/* Left Lesson Navigation Sidebar */}
        <LessonSidebar course={course} currentLessonId={lesson.id} />

        {/* Main Lesson Content Player */}
        <section
          className="lesson-player-container"
          id="lesson-content-area"
          data-testid="lesson-content-area"
        >
          {/* Progress Indicator Header (TC05: #course-progress-bar) */}
          <header className="lesson-progress-header">
            <div className="progress-header-top">
              <span className="progress-label-title">
                Course Progress:{" "}
                <strong
                  id="course-progress-bar"
                  data-testid="course-progress-bar"
                  style={{ color: "var(--primary-blue)" }}
                >
                  {progressPercentage}% Completed
                </strong>
              </span>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                Module {currentIdx + 1} of {course.lessons.length}
              </span>
            </div>

            <div
              className="course-progress-bar-container"
              role="progressbar"
              aria-valuenow={progressPercentage}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="course-progress-bar-fill"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </header>

          {/* Gated Lesson Barrier Alert (FR-08, TC08: #lesson-locked-alert) */}
          {isLocked && (
            <div
              className="alert alert-warning"
              id="lesson-locked-alert"
              data-testid="lesson-locked-alert"
              role="alert"
            >
              <span className="alert-icon">&#128274;</span>
              <div>
                <strong>Restricted Module:</strong> This lesson is locked. Complete previous
                modules to unlock.
              </div>
            </div>
          )}

          {/* Breadcrumb Navigation */}
          <nav className="breadcrumb-nav" aria-label="Lesson Breadcrumb">
            <Link href="/" id="link-breadcrumb-catalogue">
              Catalogue
            </Link>{" "}
            &gt;{" "}
            <Link href={`/courses/${course.id}`} id="link-breadcrumb-course">
              {course.title}
            </Link>{" "}
            &gt; <span>{lesson.title}</span>
          </nav>

          {/* Lesson Heading */}
          <h1 className="lesson-title-heading" id="lesson-title" data-testid="lesson-title">
            {lesson.title}
          </h1>

          <div className="lesson-meta-bar">
            <span>&#9201; Duration: <strong>{lesson.duration}</strong></span>
            <span>&#128100; Instructor: <strong>{course.instructor}</strong></span>
            {completed ? (
              <span style={{ color: "var(--emerald-success)", fontWeight: 700 }}>
                &#10003; Completed
              </span>
            ) : (
              <span style={{ color: "var(--primary-blue)", fontWeight: 600 }}>
                In Progress
              </span>
            )}
          </div>

          {/* Main Simulation Sandbox & Content (TC05 #lesson-frame) */}
          <div
            className="lesson-content-body"
            id="lesson-frame"
            data-testid="lesson-frame"
          >
            <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
              {lesson.summary}
            </p>

            <div
              style={{ whiteSpace: "pre-line" }}
              dangerouslySetInnerHTML={{
                __html: lesson.content
                  .replace(/### (.*)/g, "<h3>$1</h3>")
                  .replace(/#### (.*)/g, "<h4>$1</h4>")
                  .replace(/\`\`\`([a-z]*)\n([\s\S]*?)\`\`\`/g, "<pre><code>$2</code></pre>")
                  .replace(/\`([^\`]+)\`/g, "<code>$1</code>")
                  .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
              }}
            />
          </div>

          {/* Actions & Completion Bar */}
          <div className="lesson-navigation-footer">
            <div>
              {prevLesson ? (
                <Link
                  href={`/learn/${course.id}/lesson/${prevLesson.id}`}
                  className="btn btn-secondary btn-sm"
                  id="btn-prev-lesson"
                  data-testid="btn-prev-lesson"
                >
                  &larr; Previous Lesson
                </Link>
              ) : (
                <Link
                  href={`/courses/${course.id}`}
                  className="btn btn-secondary btn-sm"
                  id="btn-back-overview"
                >
                  &larr; Course Overview
                </Link>
              )}
            </div>

            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
              <button
                type="button"
                id="btn-mark-complete"
                data-testid="btn-mark-complete"
                disabled={isLocked}
                onClick={handleMarkComplete}
                className={`btn ${
                  isLocked ? "btn-disabled" : completed ? "btn-secondary" : "btn-primary"
                }`}
              >
                {completed ? "Completed ✓" : "Mark as Complete ✓"}
              </button>

              {nextLesson && (
                <Link
                  href={`/learn/${course.id}/lesson/${nextLesson.id}`}
                  className={`btn btn-primary btn-sm ${
                    nextLesson.isLocked ? "btn-disabled" : ""
                  }`}
                  id="btn-next-lesson"
                  data-testid="btn-next-lesson"
                  aria-disabled={nextLesson.isLocked ? "true" : "false"}
                >
                  Next Lesson &rarr;
                </Link>
              )}

              {course.quiz && (
                <Link
                  href={`/learn/${course.id}/quiz`}
                  className="btn btn-secondary btn-sm"
                  id="btn-take-quiz"
                  data-testid="btn-take-quiz"
                >
                  Take Quiz &#9733;
                </Link>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
