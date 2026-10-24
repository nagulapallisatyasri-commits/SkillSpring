"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MOCK_COURSES, Course } from "@/data/mockCourses";
import {
  getEnrolledCourseIds,
  calculateCourseProgress,
  getEnrolmentDate,
  seedSampleEnrolments,
  resetSkillSpringStorage,
  getRecentLearning,
  getBookmarkedCourseIds,
} from "@/utils/storage";
import Toast, { showToast } from "@/components/Toast";

export default function MyLearningPage() {
  const [enrolledIds, setEnrolledIds] = useState<string[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [isClientLoaded, setIsClientLoaded] = useState(false);

  const refreshEnrolments = () => {
    setEnrolledIds(getEnrolledCourseIds());
    setBookmarkedIds(getBookmarkedCourseIds());
  };

  useEffect(() => {
    setIsClientLoaded(true);
    refreshEnrolments();

    const handleStorageUpdate = () => {
      refreshEnrolments();
    };

    window.addEventListener("storage", handleStorageUpdate);
    window.addEventListener("skillspring_enrolment_updated", handleStorageUpdate);
    window.addEventListener("skillspring_bookmarks_updated", handleStorageUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageUpdate);
      window.removeEventListener("skillspring_enrolment_updated", handleStorageUpdate);
      window.removeEventListener("skillspring_bookmarks_updated", handleStorageUpdate);
    };
  }, []);

  const enrolledCourses: Course[] = enrolledIds
    .map((id) => MOCK_COURSES.find((c) => c.id === id))
    .filter((c): c is Course => Boolean(c));

  const bookmarkedCourses: Course[] = bookmarkedIds
    .map((id) => MOCK_COURSES.find((c) => c.id === id))
    .filter((c): c is Course => Boolean(c));

  const handleSeedData = () => {
    seedSampleEnrolments();
    refreshEnrolments();
    window.dispatchEvent(new Event("skillspring_enrolment_updated"));
    showToast("Test fixtures seeded successfully!", "success");
  };

  const handleResetData = () => {
    resetSkillSpringStorage();
    refreshEnrolments();
    window.dispatchEvent(new Event("skillspring_enrolment_updated"));
    showToast("Enrolments reset to empty state.", "info");
  };

  // KPI Calculations from actual project state
  const totalEnrolled = enrolledCourses.length;
  let completedCoursesCount = 0;
  let totalLessonsCompleted = 0;
  let totalPercentageSum = 0;

  enrolledCourses.forEach((c) => {
    const prog = calculateCourseProgress(c.id, c.lessons.length);
    if (prog.status === "Completed") completedCoursesCount++;
    totalLessonsCompleted += prog.completedCount;
    totalPercentageSum += prog.percentage;
  });

  const averageProgress = totalEnrolled > 0
    ? Math.round(totalPercentageSum / totalEnrolled)
    : 0;

  // Recent learning item
  const recentItem = isClientLoaded ? getRecentLearning() : null;
  const recentCourse = recentItem ? MOCK_COURSES.find((c) => c.id === recentItem.courseId) : null;
  const recentLesson = recentCourse && recentItem?.lessonId
    ? recentCourse.lessons.find((l) => l.id === recentItem.lessonId)
    : null;

  // Recommended courses (courses user is NOT yet enrolled in)
  const recommendedCourses = MOCK_COURSES
    .filter((c) => !enrolledIds.includes(c.id))
    .slice(0, 3);

  return (
    <main className="main-content">
      <Toast />

      {/* Welcome Banner */}
      <section className="dashboard-welcome-banner">
        <h1 id="my-learning-heading">Welcome back to SkillSpring</h1>
        <p>
          <strong>Learn Today. Build Tomorrow.</strong> Track your enrolled courses, monitor modular lesson
          progress percentages, and access your verified learning certificates.
        </p>
      </section>

      {/* Summary KPI Cards */}
      <section className="dashboard-kpi-grid" aria-label="Student Learning Metrics">
        <div className="kpi-card">
          <div className="kpi-icon-box icon-blue">&#128218;</div>
          <div>
            <div className="kpi-number" id="kpi-enrolled-count">{totalEnrolled}</div>
            <div className="kpi-label">Enrolled Courses</div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-box icon-green">&#10003;</div>
          <div>
            <div className="kpi-number" id="kpi-completed-courses">{completedCoursesCount}</div>
            <div className="kpi-label">Completed Courses</div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-box" style={{ background: "var(--light-blue-subtle)", color: "var(--primary-blue)" }}>
            &#127891;
          </div>
          <div>
            <div className="kpi-number" id="kpi-completed-lessons">{totalLessonsCompleted}</div>
            <div className="kpi-label">Lessons Completed</div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-box" style={{ background: "#F3E8FF", color: "#7E22CE" }}>
            %
          </div>
          <div>
            <div className="kpi-number" id="kpi-avg-progress">{averageProgress}%</div>
            <div className="kpi-label">Average Progress</div>
          </div>
        </div>
      </section>

      {/* Developer & Test Automation Controls */}
      <section className="seeder-bar" id="seeder-toolbar" data-testid="seeder-toolbar">
        <div>
          <strong style={{ color: "var(--dark-navy)", fontSize: "0.95rem" }}>
            Academic QA Testbed Toolbar
          </strong>
          <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", margin: 0 }}>
            Pre-seed multi-course fixtures for automated table traversal (TC07) or reset storage state.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            id="btn-seed-data"
            data-testid="btn-seed-data"
            onClick={handleSeedData}
            title="Pre-seed sample enrolled courses with 50% and 0% progress"
          >
            &#9881; Seed Test Fixtures (TC07)
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            id="btn-reset-data"
            data-testid="btn-reset-data"
            onClick={handleResetData}
            title="Clear all local storage records"
          >
            &#128465; Reset Enrolments
          </button>
        </div>
      </section>

      {/* Recent Learning Highlight */}
      {recentCourse && (
        <section
          style={{
            background: "linear-gradient(90deg, var(--light-blue-subtle) 0%, #FFFFFF 100%)",
            border: "1px solid var(--light-blue-border)",
            borderRadius: "var(--radius-lg)",
            padding: "1.25rem 1.5rem",
            marginBottom: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontSize: "1.8rem" }}>&#9203;</span>
            <div>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--primary-blue)", textTransform: "uppercase" }}>
                Jump Back In &bull; Recent Learning
              </div>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--dark-navy)" }}>
                {recentCourse.title}
              </div>
              {recentLesson && (
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  Last active: {recentLesson.title}
                </div>
              )}
            </div>
          </div>

          <Link
            href={`/courses/${recentCourse.id}`}
            className="btn btn-primary btn-sm"
          >
            Resume Learning &rarr;
          </Link>
        </section>
      )}

      {/* Continue Learning Course Cards Grid */}
      {isClientLoaded && enrolledCourses.length > 0 && (
        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--dark-navy)", marginBottom: "1.25rem" }}>
            Continue Learning
          </h2>
          <div className="catalogue-grid">
            {enrolledCourses.map((course) => {
              const info = calculateCourseProgress(course.id, course.lessons.length);
              const firstLessonId = course.lessons[0]?.id || "lesson-1-intro";

              return (
                <div
                  key={course.id}
                  className="course-card"
                  style={{ padding: 0 }}
                >
                  <div className="card-thumbnail-wrap" style={{ height: "160px" }}>
                    <Image
                      src={course.thumbnail || `/images/courses/${course.id}.svg`}
                      alt={course.title}
                      width={600}
                      height={360}
                      className="card-thumbnail-img"
                      unoptimized
                    />
                  </div>

                  <div style={{ padding: "1.25rem" }}>
                    <span className={`card-badge badge-${course.level.toLowerCase()}`} style={{ marginBottom: "0.5rem", display: "inline-block" }}>
                      {course.level}
                    </span>
                    <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--dark-navy)", marginBottom: "0.75rem", lineHeight: 1.3 }}>
                      {course.title}
                    </h3>

                    {/* Progress Bar */}
                    <div style={{ marginBottom: "1rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: "0.35rem" }}>
                        <span style={{ fontWeight: 600, color: "var(--primary-blue)" }}>{info.percentage}% Completed</span>
                        <span style={{ color: "var(--text-muted)" }}>{info.completedCount}/{info.totalLessons} Lessons</span>
                      </div>
                      <div className="progress-bar-rail">
                        <div className="progress-bar-fill" style={{ width: `${info.percentage}%` }} />
                      </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span className="card-category-tag">{course.category}</span>
                      <Link
                        href={`/courses/${course.id}`}
                        className="btn btn-primary btn-sm"
                      >
                        Continue &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Enrolled Courses Table (FR-05, TC02, TC07) */}
      {isClientLoaded && enrolledCourses.length > 0 ? (
        <section
          className="table-responsive-container"
          id="my-learning-container"
          data-testid="my-learning-container"
        >
          <div style={{ padding: "1.25rem", borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-page)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--dark-navy)" }}>
              All Enrolled Registrations &bull; Detailed Progress Table
            </h3>
          </div>

          <table
            className="my-learning-table"
            id="my-learning-table"
            data-testid="my-learning-table"
          >
            <thead>
              <tr>
                <th scope="col" style={{ width: "35%" }}>
                  Course Title
                </th>
                <th scope="col" style={{ width: "15%" }}>
                  Enrolment Date
                </th>
                <th scope="col" style={{ width: "15%" }}>
                  Status
                </th>
                <th scope="col" style={{ width: "20%" }}>
                  Progress
                </th>
                <th scope="col" style={{ width: "15%", textAlign: "right" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {enrolledCourses.map((course) => {
                const info = calculateCourseProgress(course.id, course.lessons.length);
                const enrolDate = getEnrolmentDate(course.id);
                const firstAvailableLesson =
                  course.lessons.find((l) => !l.isLocked) || course.lessons[0];

                return (
                  <tr
                    key={course.id}
                    id={`course-row-${course.id}`}
                    data-testid={`course-row-${course.id}`}
                  >
                    <td>
                      <div
                        className="course-title"
                        id={`title-${course.id}`}
                        data-testid={`title-${course.id}`}
                        style={{ fontSize: "1rem", fontWeight: 700, color: "var(--dark-navy)" }}
                      >
                        <Link href={`/courses/${course.id}`}>{course.title}</Link>
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                        {course.category} &bull; {course.instructor}
                      </div>
                    </td>

                    <td style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                      {enrolDate}
                    </td>

                    <td>
                      <span
                        className={`table-status-pill ${
                          info.status === "Completed"
                            ? "status-completed"
                            : info.status === "In Progress"
                            ? "status-in-progress"
                            : "status-enrolled"
                        }`}
                        id={`status-${course.id}`}
                        data-testid={`status-${course.id}`}
                      >
                        {info.status}
                      </span>
                    </td>

                    <td>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                        <span
                          style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--dark-navy)" }}
                          id={`progress-${course.id}`}
                          data-testid={`progress-${course.id}`}
                        >
                          {info.percentage}% ({info.completedCount}/{info.totalLessons})
                        </span>
                        <div className="progress-bar-rail" style={{ height: "5px" }}>
                          <div
                            className="progress-bar-fill"
                            style={{ width: `${info.percentage}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td style={{ textAlign: "right" }}>
                      <Link
                        href={`/courses/${course.id}`}
                        className="btn btn-primary btn-sm"
                        id={`btn-continue-${course.id}`}
                        data-testid={`btn-continue-${course.id}`}
                      >
                        Continue &rarr;
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      ) : (
        /* Empty State */
        <div className="empty-state" id="my-learning-empty" data-testid="my-learning-empty">
          <div className="empty-state-icon">&#128218;</div>
          <h3>Your learning journey starts here.</h3>
          <p>
            You are not currently registered for any training modules. Discover our comprehensive
            course catalogue, choose a skill path, and start learning today.
          </p>
          <Link href="/" className="btn btn-primary" id="btn-browse-courses">
            Explore Courses &rarr;
          </Link>
        </div>
      )}

      {/* Bookmarked Courses Section */}
      {bookmarkedCourses.length > 0 && (
        <section style={{ marginTop: "3rem", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--dark-navy)", marginBottom: "1rem" }}>
            ★ Your Bookmarked Courses
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
            {bookmarkedCourses.map((c) => (
              <div
                key={c.id}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-md)",
                  padding: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  boxShadow: "var(--shadow-xs)",
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, color: "var(--dark-navy)", fontSize: "0.95rem" }}>
                    {c.title}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    {c.category} &bull; {c.duration}
                  </div>
                </div>
                <Link href={`/courses/${c.id}`} className="btn btn-secondary btn-sm">
                  View
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recommended Courses Section */}
      {recommendedCourses.length > 0 && (
        <section style={{ marginTop: "3rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "1.25rem" }}>
            <div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--dark-navy)", marginBottom: "0.25rem" }}>
                Recommended Courses for You
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                Expand your engineering capabilities with these curated skill tracks.
              </p>
            </div>
            <Link href="/" style={{ color: "var(--primary-blue)", fontWeight: 700, fontSize: "0.9rem" }}>
              View All Catalogue &rarr;
            </Link>
          </div>

          <div className="catalogue-grid">
            {recommendedCourses.map((course) => (
              <div
                key={course.id}
                className="course-card"
                style={{ padding: 0 }}
              >
                <div className="card-thumbnail-wrap" style={{ height: "150px" }}>
                  <Image
                    src={course.thumbnail || `/images/courses/${course.id}.svg`}
                    alt={course.title}
                    width={600}
                    height={360}
                    className="card-thumbnail-img"
                    unoptimized
                  />
                </div>
                <div style={{ padding: "1.25rem" }}>
                  <span className={`card-badge badge-${course.level.toLowerCase()}`} style={{ marginBottom: "0.4rem", display: "inline-block" }}>
                    {course.level}
                  </span>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--dark-navy)", marginBottom: "0.5rem" }}>
                    {course.title}
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
                    {course.description}
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{course.duration}</span>
                    <Link href={`/courses/${course.id}`} className="btn btn-primary btn-sm">
                      Explore
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
