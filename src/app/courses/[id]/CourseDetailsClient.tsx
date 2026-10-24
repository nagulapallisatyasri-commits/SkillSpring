"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getCourseById, Lesson, CourseModule } from "@/data/mockCourses";
import {
  isCourseEnrolled,
  enrolCourse,
  isLessonCompleted,
  markLessonComplete,
  calculateCourseProgress,
} from "@/utils/storage";
import Toast, { showToast } from "@/components/Toast";

interface CourseDetailsClientProps {
  courseId: string;
}

export default function CourseDetailsClient({ courseId }: CourseDetailsClientProps) {
  const course = getCourseById(courseId);

  const [enrolled, setEnrolled] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showRejectionAlert, setShowRejectionAlert] = useState(false);
  const [availableSeats, setAvailableSeats] = useState(0);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [collapsedModules, setCollapsedModules] = useState<Record<string, boolean>>({});
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    if (course) {
      const isAlreadyEnrolled = isCourseEnrolled(course.id);
      setEnrolled(isAlreadyEnrolled);
      const currentSeats =
        isAlreadyEnrolled && course.availableSeats > 0
          ? course.availableSeats - 1
          : course.availableSeats;
      setAvailableSeats(currentSeats);

      // Pre-show rejection alert if course is full (for TC03)
      if (course.availableSeats <= 0) {
        setShowRejectionAlert(true);
      }

      // Load progress
      const progress = calculateCourseProgress(course.id, course.lessons.length);
      setProgressPercentage(progress.percentage);

      const completed = course.lessons
        .filter((l) => isLessonCompleted(course.id, l.id))
        .map((l) => l.id);
      setCompletedLessonIds(completed);
    }
  }, [course]);

  if (!course) {
    return (
      <main className="main-content">
        <div className="empty-state" id="course-not-found" data-testid="course-not-found">
          <div className="empty-state-icon">&#9888;</div>
          <h2>Course Not Found</h2>
          <p>
            The requested course identifier &quot;{courseId}&quot; does not exist in our training
            catalogue.
          </p>
          <Link href="/" className="btn btn-primary" id="btn-return-catalogue">
            &larr; Return to Course Catalogue
          </Link>
        </div>
      </main>
    );
  }

  const isFull = course.availableSeats <= 0;

  const handleEnrol = (e: React.MouseEvent) => {
    if (isFull) {
      e.preventDefault();
      setShowRejectionAlert(true);
      setShowSuccessAlert(false);
      return;
    }

    if (enrolled) return;

    const success = enrolCourse(course.id);
    if (success) {
      setEnrolled(true);
      setAvailableSeats((prev) => Math.max(0, prev - 1));
      setShowSuccessAlert(true);
      setShowRejectionAlert(false);

      window.dispatchEvent(new Event("skillspring_enrolment_updated"));
      showToast(`Successfully enrolled in "${course.title}"!`, "success");
    }
  };

  const handleToggleModule = (moduleId: string) => {
    setCollapsedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const handleSelectLesson = (lesson: Lesson) => {
    if (lesson.isLocked) {
      showToast("This module is locked. Complete previous lessons to unlock.", "warning");
      return;
    }
    setActiveLessonId(lesson.id);
  };

  const handleMarkComplete = (lessonId: string) => {
    markLessonComplete(course.id, lessonId);
    setCompletedLessonIds((prev) => (prev.includes(lessonId) ? prev : [...prev, lessonId]));

    const updated = calculateCourseProgress(course.id, course.lessons.length);
    setProgressPercentage(updated.percentage);
    window.dispatchEvent(new Event("skillspring_enrolment_updated"));
    showToast("Lesson completed! Progress recorded.", "success");
  };

  // Build modules fallback if course has no explicit modules
  const modulesToRender: CourseModule[] = course.modules && course.modules.length > 0
    ? course.modules
    : [
        {
          id: "mod-default",
          title: "Module 1: Core Curriculum",
          lessons: course.lessons,
        },
      ];

  const activeLesson = activeLessonId
    ? course.lessons.find((l) => l.id === activeLessonId)
    : null;

  const activeLessonIdx = activeLesson
    ? course.lessons.findIndex((l) => l.id === activeLesson.id)
    : -1;

  const prevLesson = activeLessonIdx > 0 ? course.lessons[activeLessonIdx - 1] : null;
  const nextLesson =
    activeLessonIdx >= 0 && activeLessonIdx < course.lessons.length - 1
      ? course.lessons[activeLessonIdx + 1]
      : null;

  const isCurrentLessonCompleted = activeLesson
    ? completedLessonIds.includes(activeLesson.id)
    : false;

  const firstLessonId = course.lessons[0]?.id || "lesson-1-intro";

  return (
    <main className="main-content">
      <Toast />

      {/* Two-Column Responsive Layout: Left Sidebar + Right Content */}
      <div className="two-col-layout">
        {/* ===================================================================
            LEFT SIDEBAR: COURSE HIERARCHY
            =================================================================== */}
        <aside
          className="course-hierarchy-sidebar"
          id="course-hierarchy"
          data-testid="course-hierarchy-sidebar"
          aria-label="Course Curriculum and Lesson Hierarchy"
        >
          <div className="hierarchy-sidebar-header">
            <Link href="/" className="sidebar-back-link" id="btn-back-catalogue-sidebar">
              &larr; Back to Catalogue
            </Link>
            <h2 className="hierarchy-course-title">{course.title}</h2>

            {/* Course Progress Box */}
            <div className="hierarchy-progress-box">
              <div className="hierarchy-progress-top">
                <span style={{ fontWeight: 600, color: "var(--text-main)" }}>
                  Progress:{" "}
                  <strong
                    id="course-progress-bar"
                    data-testid="course-progress-bar"
                    style={{ color: "var(--primary-blue)" }}
                  >
                    {progressPercentage}% Completed
                  </strong>
                </span>
                <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
                  {completedLessonIds.length}/{course.lessons.length} Lessons
                </span>
              </div>
              <div className="progress-bar-rail">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Switch to Course Overview */}
            <button
              type="button"
              className={`lesson-nav-btn ${activeLessonId === null ? "active" : ""}`}
              onClick={() => setActiveLessonId(null)}
              style={{ marginTop: "0.75rem", fontWeight: 700 }}
              id="btn-nav-course-overview"
            >
              <div className="lesson-nav-left">
                <span className="lesson-status-icon">&#128214;</span>
                <span className="lesson-nav-title">Course Overview &amp; Info</span>
              </div>
            </button>
          </div>

          {/* Collapsible Curriculum Tree */}
          <div className="hierarchy-scroll-list">
            {modulesToRender.map((mod) => {
              const isCollapsed = Boolean(collapsedModules[mod.id]);
              return (
                <div key={mod.id} className="module-group">
                  <button
                    type="button"
                    className="module-header-toggle"
                    onClick={() => handleToggleModule(mod.id)}
                    aria-expanded={!isCollapsed}
                  >
                    <span>{mod.title}</span>
                    <span className={`module-toggle-arrow ${!isCollapsed ? "open" : ""}`}>
                      &#9654;
                    </span>
                  </button>

                  {!isCollapsed && (
                    <div className="module-lessons-container">
                      {mod.lessons.map((lesson) => {
                        const isActive = activeLessonId === lesson.id;
                        const isDone = completedLessonIds.includes(lesson.id);
                        const isLocked = Boolean(lesson.isLocked);

                        return (
                          <button
                            key={lesson.id}
                            type="button"
                            className={`lesson-nav-btn ${isActive ? "active" : ""} ${
                              isLocked ? "locked" : ""
                            }`}
                            id={`lesson-item-${lesson.id}`}
                            data-testid={`lesson-item-${lesson.id}`}
                            aria-disabled={isLocked ? "true" : "false"}
                            disabled={isLocked}
                            onClick={() => handleSelectLesson(lesson)}
                            title={isLocked ? "Locked module — complete previous lessons" : lesson.title}
                          >
                            <div className="lesson-nav-left">
                              <span className="lesson-status-icon">
                                {isLocked ? (
                                  <span data-testid="lock-icon" aria-label="Locked lesson">
                                    &#128274;
                                  </span>
                                ) : isDone ? (
                                  <span style={{ color: "var(--emerald-success)", fontWeight: 800 }}>
                                    &#10003;
                                  </span>
                                ) : (
                                  <span style={{ color: "var(--primary-blue)" }}>&#9658;</span>
                                )}
                              </span>
                              <span className="lesson-nav-title">{lesson.title}</span>
                            </div>
                            <span className="lesson-nav-duration">{lesson.duration}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Assessment / Quiz Section */}
            {course.quiz && (
              <div style={{ marginTop: "1rem", paddingTop: "0.75rem", borderTop: "1px solid var(--border-subtle)" }}>
                <Link
                  href={`/learn/${course.id}/quiz`}
                  className="lesson-nav-btn"
                  id="nav-quiz-link"
                  data-testid="nav-quiz-link"
                  style={{ color: "var(--primary-blue)", fontWeight: 700 }}
                >
                  <div className="lesson-nav-left">
                    <span className="lesson-status-icon">&#9733;</span>
                    <span className="lesson-nav-title">{course.quiz.title}</span>
                  </div>
                  <span className="nav-badge-pill" style={{ padding: "0.15rem 0.45rem", fontSize: "0.75rem" }}>
                    Evaluation
                  </span>
                </Link>
              </div>
            )}
          </div>
        </aside>

        {/* ===================================================================
            RIGHT CONTENT AREA: COURSE DETAILS OR ACTIVE LESSON
            =================================================================== */}
        <section className="course-content-main-area" id="course-content-area">
          {activeLesson ? (
            /* -----------------------------------------------------------------
               LESSON SELECTED: LESSON PLAYER VIEW
               ----------------------------------------------------------------- */
            <div className="lesson-player-container" id="lesson-frame" data-testid="lesson-frame">
              <div className="breadcrumb-nav">
                <button
                  type="button"
                  onClick={() => setActiveLessonId(null)}
                  style={{ background: "none", border: "none", color: "var(--primary-blue)", cursor: "pointer", fontWeight: 600 }}
                >
                  {course.title}
                </button>{" "}
                &gt; <span>{activeLesson.moduleTitle || "Lessons"}</span> &gt;{" "}
                <span>{activeLesson.title}</span>
              </div>

              <h1 className="lesson-title-heading" id="lesson-title" data-testid="lesson-title">
                {activeLesson.title}
              </h1>

              <div className="lesson-meta-bar">
                <span>&#9201; Duration: <strong>{activeLesson.duration}</strong></span>
                <span>&#128100; Instructor: <strong>{course.instructor}</strong></span>
                {isCurrentLessonCompleted ? (
                  <span style={{ color: "var(--emerald-success)", fontWeight: 700 }}>
                    &#10003; Completed
                  </span>
                ) : (
                  <span style={{ color: "var(--primary-blue)", fontWeight: 600 }}>
                    In Progress
                  </span>
                )}
              </div>

              {/* Lesson Markdown Content */}
              <div className="lesson-content-body">
                <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
                  {activeLesson.summary}
                </p>

                <div
                  style={{ whiteSpace: "pre-line" }}
                  dangerouslySetInnerHTML={{
                    __html: activeLesson.content
                      .replace(/### (.*)/g, "<h3>$1</h3>")
                      .replace(/#### (.*)/g, "<h4>$1</h4>")
                      .replace(/\`\`\`([a-z]*)\n([\s\S]*?)\`\`\`/g, "<pre><code>$2</code></pre>")
                      .replace(/\`([^\`]+)\`/g, "<code>$1</code>")
                      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                  }}
                />
              </div>

              {/* Lesson Action Footer */}
              <div className="lesson-navigation-footer">
                <div>
                  {prevLesson && (
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      id="btn-prev-lesson"
                      data-testid="btn-prev-lesson"
                      onClick={() => handleSelectLesson(prevLesson)}
                    >
                      &larr; Previous: {prevLesson.title.substring(0, 20)}...
                    </button>
                  )}
                </div>

                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button
                    type="button"
                    className={`btn ${isCurrentLessonCompleted ? "btn-secondary" : "btn-primary"}`}
                    id="btn-mark-complete"
                    data-testid="btn-mark-complete"
                    onClick={() => handleMarkComplete(activeLesson.id)}
                  >
                    {isCurrentLessonCompleted ? "Completed ✓" : "Mark as Complete ✓"}
                  </button>

                  {nextLesson && (
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      id="btn-next-lesson"
                      data-testid="btn-next-lesson"
                      onClick={() => handleSelectLesson(nextLesson)}
                      disabled={nextLesson.isLocked}
                    >
                      Next Lesson &rarr;
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* -----------------------------------------------------------------
               COURSE OVERVIEW SELECTED: DETAILED METADATA VIEW
               ----------------------------------------------------------------- */
            <div className="course-details-wrap">
              <header
                className="course-header-card"
                id="course-header"
                data-testid="course-header"
              >
                <nav className="breadcrumb-nav" aria-label="Breadcrumb">
                  <Link href="/" id="link-breadcrumb-catalogue">
                    Catalogue
                  </Link>{" "}
                  &gt; <span>{course.category}</span> &gt; <span>{course.title}</span>
                </nav>

                <div className="card-badges-row">
                  <span
                    className={`card-badge badge-${course.level.toLowerCase()}`}
                    id="course-detail-level"
                    data-testid="course-detail-level"
                  >
                    {course.level}
                  </span>
                  <span className="card-category-tag">{course.category}</span>
                  {enrolled && (
                    <span className="card-enrolled-badge" id="badge-enrolled-status">
                      &#10003; Enrolled Student
                    </span>
                  )}
                </div>

                <h1
                  className="course-details-title"
                  id="course-title"
                  data-testid="course-title"
                >
                  {course.title}
                </h1>

                <p className="course-details-lead">{course.longDescription}</p>

                {/* Metadata Highlights */}
                <div className="details-meta-grid">
                  <div className="meta-block">
                    <div className="meta-block-label">Instructor</div>
                    <div className="meta-block-value" id="instructor-name">
                      {course.instructor}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-faint)" }}>
                      {course.instructorRole}
                    </div>
                  </div>

                  <div className="meta-block">
                    <div className="meta-block-label">Duration &amp; Pace</div>
                    <div className="meta-block-value" id="course-duration">
                      {course.duration}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-faint)" }}>
                      Self-Paced with Labs
                    </div>
                  </div>

                  <div className="meta-block">
                    <div className="meta-block-label">Seat Availability</div>
                    <div
                      className="meta-block-value"
                      id="seat-availability"
                      data-testid="seat-availability"
                    >
                      {isFull ? (
                        <span className="seat-badge seat-full">
                          0 seats remaining (Full)
                        </span>
                      ) : (
                        <span className="seat-badge seat-available">
                          {availableSeats} seats available
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-faint)" }}>
                      Cohort Capacity: {course.totalSeats} seats
                    </div>
                  </div>
                </div>

                {/* Alerts */}
                {showSuccessAlert && (
                  <div
                    className="alert alert-success"
                    id="enrol-success-alert"
                    data-testid="enrol-success-alert"
                    role="status"
                  >
                    <span className="alert-icon">&#10004;</span>
                    <div>
                      <strong>Enrolment Confirmed!</strong> You have successfully registered for{" "}
                      <em>{course.title}</em>. Your seat has been reserved and your learning workspace is
                      now active in <Link href="/my-learning">My Learning</Link>.
                    </div>
                  </div>
                )}

                {showRejectionAlert && (
                  <div
                    className="alert alert-danger"
                    id="enrol-rejection-alert"
                    data-testid="enrol-rejection-alert"
                    role="alert"
                  >
                    <span className="alert-icon">&#9888;</span>
                    <div id="enrol-rejection-text">
                      This course is currently at maximum capacity. Enrolment is closed.
                    </div>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="enrolment-cta-box">
                  {enrolled ? (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          const target = course.lessons[0];
                          if (target) handleSelectLesson(target);
                        }}
                        className="btn btn-primary"
                        id="btn-go-to-lesson"
                        data-testid="btn-go-to-lesson"
                      >
                        Continue Learning &rarr;
                      </button>
                      <Link
                        href="/my-learning"
                        className="btn btn-secondary"
                        id="btn-go-to-my-learning"
                        data-testid="btn-go-to-my-learning"
                      >
                        View in My Learning
                      </Link>
                    </>
                  ) : (
                    <button
                      type="button"
                      id="btn-enrol"
                      data-testid="btn-enrol"
                      aria-disabled={isFull ? "true" : "false"}
                      disabled={isFull}
                      onClick={handleEnrol}
                      className={`btn ${isFull ? "btn-disabled" : "btn-primary"}`}
                    >
                      {isFull ? "Course Full" : "Enrol Now"}
                    </button>
                  )}

                  <a
                    href={`/courses/${course.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                    id="link-new-tab"
                    data-testid="link-new-tab"
                  >
                    Open in New Tab &#x2197;
                  </a>

                  <Link href="/" className="btn btn-secondary" id="btn-back-catalogue">
                    &larr; Back to Catalogue
                  </Link>
                </div>
              </header>

              {/* Course Objectives */}
              {course.objectives && course.objectives.length > 0 && (
                <section className="content-section-card" id="objectives-section">
                  <h3>What You Will Learn &bull; Key Objectives</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
                    {course.objectives.map((obj, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.75rem",
                          padding: "1rem",
                          backgroundColor: "var(--light-blue-subtle)",
                          borderRadius: "var(--radius-md)",
                          border: "1px solid var(--light-blue-border)",
                        }}
                      >
                        <span style={{ color: "var(--primary-blue)", fontWeight: 800 }}>&#10003;</span>
                        <span style={{ fontSize: "0.95rem", color: "var(--text-main)", fontWeight: 600 }}>{obj}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Syllabus Section */}
              <section className="content-section-card" id="syllabus-section">
                <h3>Course Syllabus &amp; Learning Modules</h3>
                <ul className="syllabus-list" id="syllabus-topics-list">
                  {course.syllabusTopics.map((topic, index) => (
                    <li key={index} className="syllabus-item">
                      <span className="syllabus-number">{index + 1}</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>

                {/* Structured Lessons Quick Launch */}
                <h4 style={{ margin: "1.75rem 0 1rem", fontSize: "1.15rem", color: "var(--dark-navy)" }}>
                  Interactive Lessons &amp; Labs
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {course.lessons.map((lesson, idx) => (
                    <div
                      key={lesson.id}
                      className={`lesson-item ${lesson.isLocked ? "locked-lesson" : ""}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0.85rem 1rem",
                        backgroundColor: "var(--bg-page)",
                        border: "1px solid var(--border-subtle)",
                        borderRadius: "var(--radius-md)",
                        cursor: lesson.isLocked ? "not-allowed" : "pointer",
                      }}
                      onClick={() => !lesson.isLocked && handleSelectLesson(lesson)}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <span className="syllabus-number">{idx + 1}</span>
                        <div>
                          <div style={{ fontWeight: 600, color: "var(--dark-navy)" }}>{lesson.title}</div>
                          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{lesson.duration}</div>
                        </div>
                      </div>
                      <div>
                        {lesson.isLocked ? (
                          <span style={{ color: "var(--text-faint)", fontSize: "0.85rem" }}>
                            &#128274; Locked
                          </span>
                        ) : (
                          <span style={{ color: "var(--primary-blue)", fontSize: "0.85rem", fontWeight: 700 }}>
                            Available &rarr;
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Prerequisites Card */}
              <section className="content-section-card" id="prerequisites-section">
                <h3>Course Prerequisites</h3>
                <ul style={{ paddingLeft: "1.25rem", color: "var(--text-muted)", fontSize: "0.95rem" }}>
                  {course.prerequisites.map((pre, idx) => (
                    <li key={idx} style={{ marginBottom: "0.35rem" }}>{pre}</li>
                  ))}
                </ul>
              </section>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
