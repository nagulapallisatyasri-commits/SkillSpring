/**
 * SkillSpring Client-Side Storage Utility
 * Manages course enrolment, lesson completion, bookmarks, recent learning,
 * and progress calculation using browser localStorage with full SSR hydration safety.
 */

const STORAGE_KEYS = {
  ENROLLED_COURSES: "skillspring_enrolled_courses",
  COMPLETED_LESSONS: "skillspring_completed_lessons",
  ENROLMENT_DATES: "skillspring_enrolment_dates",
  BOOKMARKED_COURSES: "skillspring_bookmarked_courses",
  RECENT_LEARNING: "skillspring_recent_learning",
};

export interface CourseProgressInfo {
  completedCount: number;
  totalLessons: number;
  percentage: number;
  status: "Enrolled" | "In Progress" | "Completed";
}

export interface RecentLearningItem {
  courseId: string;
  lessonId?: string;
  timestamp: number;
}

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

/**
 * Retrieve list of all enrolled course IDs
 */
export function getEnrolledCourseIds(): string[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.ENROLLED_COURSES);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to parse enrolled courses from localStorage", error);
    return [];
  }
}

/**
 * Check if a specific course is enrolled
 */
export function isCourseEnrolled(courseId: string): boolean {
  const ids = getEnrolledCourseIds();
  return ids.includes(courseId);
}

/**
 * Enrol user in a course
 */
export function enrolCourse(courseId: string): boolean {
  if (!isBrowser()) return false;
  try {
    const ids = getEnrolledCourseIds();
    if (!ids.includes(courseId)) {
      ids.push(courseId);
      window.localStorage.setItem(STORAGE_KEYS.ENROLLED_COURSES, JSON.stringify(ids));

      // Record enrolment date
      const datesRaw = window.localStorage.getItem(STORAGE_KEYS.ENROLMENT_DATES);
      const dates = datesRaw ? JSON.parse(datesRaw) : {};
      dates[courseId] = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      window.localStorage.setItem(STORAGE_KEYS.ENROLMENT_DATES, JSON.stringify(dates));
    }
    return true;
  } catch (error) {
    console.error("Failed to enrol course in localStorage", error);
    return false;
  }
}

/**
 * Get enrolment date string for a course
 */
export function getEnrolmentDate(courseId: string): string {
  if (!isBrowser()) return "Today";
  try {
    const datesRaw = window.localStorage.getItem(STORAGE_KEYS.ENROLMENT_DATES);
    const dates = datesRaw ? JSON.parse(datesRaw) : {};
    return dates[courseId] || "Recent";
  } catch {
    return "Recent";
  }
}

/**
 * Get completed lesson IDs for a specific course
 */
export function getCompletedLessons(courseId: string): string[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.COMPLETED_LESSONS);
    if (!raw) return [];
    const map = JSON.parse(raw);
    return Array.isArray(map[courseId]) ? map[courseId] : [];
  } catch (error) {
    console.error("Failed to read completed lessons from localStorage", error);
    return [];
  }
}

/**
 * Check if a specific lesson is completed
 */
export function isLessonCompleted(courseId: string, lessonId: string): boolean {
  const completed = getCompletedLessons(courseId);
  return completed.includes(lessonId);
}

/**
 * Mark a lesson as complete for a course and recalculate progress
 */
export function markLessonComplete(courseId: string, lessonId: string): void {
  if (!isBrowser()) return;
  try {
    // Automatically ensure course is registered as enrolled
    enrolCourse(courseId);

    const raw = window.localStorage.getItem(STORAGE_KEYS.COMPLETED_LESSONS);
    const map = raw ? JSON.parse(raw) : {};
    const courseLessons: string[] = Array.isArray(map[courseId]) ? map[courseId] : [];

    if (!courseLessons.includes(lessonId)) {
      courseLessons.push(lessonId);
      map[courseId] = courseLessons;
      window.localStorage.setItem(STORAGE_KEYS.COMPLETED_LESSONS, JSON.stringify(map));
    }

    recordRecentLearning(courseId, lessonId);
  } catch (error) {
    console.error("Failed to mark lesson complete in localStorage", error);
  }
}

/**
 * Calculate progress percentage and status for a course
 */
export function calculateCourseProgress(courseId: string, totalLessons: number): CourseProgressInfo {
  const completed = getCompletedLessons(courseId);
  const completedCount = completed.length;

  if (totalLessons === 0) {
    return { completedCount: 0, totalLessons: 0, percentage: 0, status: "Enrolled" };
  }

  const percentage = Math.min(100, Math.round((completedCount / totalLessons) * 100));

  let status: "Enrolled" | "In Progress" | "Completed" = "Enrolled";
  if (percentage === 100) {
    status = "Completed";
  } else if (percentage > 0) {
    status = "In Progress";
  } else {
    status = "Enrolled";
  }

  return {
    completedCount,
    totalLessons,
    percentage,
    status,
  };
}

/**
 * Bookmarks management
 */
export function getBookmarkedCourseIds(): string[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.BOOKMARKED_COURSES);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function isCourseBookmarked(courseId: string): boolean {
  const ids = getBookmarkedCourseIds();
  return ids.includes(courseId);
}

export function toggleBookmarkCourse(courseId: string): boolean {
  if (!isBrowser()) return false;
  try {
    let ids = getBookmarkedCourseIds();
    let isNowBookmarked = false;
    if (ids.includes(courseId)) {
      ids = ids.filter((id) => id !== courseId);
      isNowBookmarked = false;
    } else {
      ids.push(courseId);
      isNowBookmarked = true;
    }
    window.localStorage.setItem(STORAGE_KEYS.BOOKMARKED_COURSES, JSON.stringify(ids));
    window.dispatchEvent(new Event("skillspring_bookmarks_updated"));
    return isNowBookmarked;
  } catch (error) {
    console.error("Failed to toggle bookmark", error);
    return false;
  }
}

/**
 * Recent learning tracking
 */
export function recordRecentLearning(courseId: string, lessonId?: string): void {
  if (!isBrowser()) return;
  try {
    const item: RecentLearningItem = {
      courseId,
      lessonId,
      timestamp: Date.now(),
    };
    window.localStorage.setItem(STORAGE_KEYS.RECENT_LEARNING, JSON.stringify(item));
  } catch (err) {
    console.error("Failed to record recent learning", err);
  }
}

export function getRecentLearning(): RecentLearningItem | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.RECENT_LEARNING);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Pre-seed realistic test fixtures for academic demonstrations & TC07 validation
 */
export function seedSampleEnrolments(): void {
  if (!isBrowser()) return;
  try {
    // Seed Full-Stack Web Foundations with 50% progress (1 of 2 lessons) for TC07
    enrolCourse("web-dev-basics");
    markLessonComplete("web-dev-basics", "lesson-1-react-foundations");

    // Seed Python for Automation with 0% progress for TC05
    enrolCourse("python-automation");

    // Seed React Deep Dive
    enrolCourse("react-deep-dive");

    // Record recent learning
    recordRecentLearning("web-dev-basics", "lesson-1-react-foundations");
  } catch (error) {
    console.error("Failed to seed sample enrolments", error);
  }
}

/**
 * Reset all SkillSpring localStorage items for a clean test run
 */
export function resetSkillSpringStorage(): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(STORAGE_KEYS.ENROLLED_COURSES);
    window.localStorage.removeItem(STORAGE_KEYS.COMPLETED_LESSONS);
    window.localStorage.removeItem(STORAGE_KEYS.ENROLMENT_DATES);
    window.localStorage.removeItem(STORAGE_KEYS.BOOKMARKED_COURSES);
    window.localStorage.removeItem(STORAGE_KEYS.RECENT_LEARNING);
  } catch (error) {
    console.error("Failed to reset localStorage", error);
  }
}
