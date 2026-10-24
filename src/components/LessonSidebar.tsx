"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Course, CourseModule } from "@/data/mockCourses";
import { isLessonCompleted, calculateCourseProgress } from "@/utils/storage";

interface LessonSidebarProps {
  course: Course;
  currentLessonId?: string;
  isQuizActive?: boolean;
}

export default function LessonSidebar({
  course,
  currentLessonId,
  isQuizActive = false,
}: LessonSidebarProps) {
  const router = useRouter();

  const handleLessonClick = (e: React.MouseEvent, isLocked: boolean, lessonId: string) => {
    if (isLocked) {
      e.preventDefault();
      return;
    }
    router.push(`/learn/${course.id}/lesson/${lessonId}`);
  };

  const progress = calculateCourseProgress(course.id, course.lessons.length);

  // Group lessons by module or use modules
  const modulesToRender: CourseModule[] = course.modules && course.modules.length > 0
    ? course.modules
    : [
        {
          id: "mod-default",
          title: "Module 1: Curriculum Lessons",
          lessons: course.lessons,
        },
      ];

  return (
    <aside
      className="course-hierarchy-sidebar"
      id="lesson-sidebar"
      data-testid="lesson-sidebar"
      aria-label="Course Lessons Navigation"
    >
      <div className="hierarchy-sidebar-header">
        <Link href={`/courses/${course.id}`} className="sidebar-back-link" id="link-back-course">
          &larr; Course Overview
        </Link>
        <h3 className="hierarchy-course-title">{course.title}</h3>

        <div className="hierarchy-progress-box">
          <div className="hierarchy-progress-top">
            <span style={{ fontWeight: 600, color: "var(--text-main)", fontSize: "0.85rem" }}>
              Progress:{" "}
              <strong style={{ color: "var(--primary-blue)" }}>
                {progress.percentage}%
              </strong>
            </span>
            <span style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>
              {progress.completedCount}/{progress.totalLessons} Done
            </span>
          </div>
          <div className="progress-bar-rail">
            <div
              className="progress-bar-fill"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
        </div>
      </div>

      <nav className="hierarchy-scroll-list" aria-label="Course Curriculum Navigation">
        {modulesToRender.map((mod) => (
          <div key={mod.id} className="module-group">
            <div
              style={{
                fontSize: "0.82rem",
                fontWeight: 700,
                color: "var(--dark-navy)",
                padding: "0.4rem 0.6rem",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              {mod.title}
            </div>

            <div className="module-lessons-container" style={{ paddingLeft: 0 }}>
              {mod.lessons.map((lesson) => {
                const isCurrent = lesson.id === currentLessonId;
                const isCompleted = isLessonCompleted(course.id, lesson.id);
                const isLocked = Boolean(lesson.isLocked);

                return (
                  <button
                    key={lesson.id}
                    type="button"
                    className={`lesson-nav-btn ${isCurrent ? "active" : ""} ${
                      isLocked ? "locked" : ""
                    }`}
                    id={`lesson-item-${lesson.id}`}
                    data-testid={`lesson-item-${lesson.id}`}
                    aria-disabled={isLocked ? "true" : "false"}
                    disabled={isLocked}
                    onClick={(e) => handleLessonClick(e, isLocked, lesson.id)}
                    title={isLocked ? "Locked module — complete previous lessons" : lesson.title}
                  >
                    <div className="lesson-nav-left">
                      <span className="lesson-status-icon">
                        {isLocked ? (
                          <span data-testid="lock-icon" aria-label="Locked lesson">
                            &#128274;
                          </span>
                        ) : isCompleted ? (
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
          </div>
        ))}

        {/* Assessment / Quiz Section Link */}
        {course.quiz && (
          <div style={{ marginTop: "1rem", paddingTop: "0.75rem", borderTop: "1px solid var(--border-subtle)" }}>
            <Link
              href={`/learn/${course.id}/quiz`}
              className={`lesson-nav-btn ${isQuizActive ? "active" : ""}`}
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
      </nav>

      <div style={{ padding: "1rem", borderTop: "1px solid var(--border-subtle)", background: "var(--bg-page)" }}>
        <Link
          href="/my-learning"
          className="btn btn-secondary btn-sm"
          id="btn-sidebar-dashboard"
          style={{ width: "100%", textAlign: "center" }}
        >
          My Learning Dashboard &rarr;
        </Link>
      </div>
    </aside>
  );
}
