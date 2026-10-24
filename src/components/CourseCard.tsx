"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Course } from "@/data/mockCourses";
import { isCourseBookmarked, toggleBookmarkCourse } from "@/utils/storage";
import { showToast } from "./Toast";

interface CourseCardProps {
  course: Course;
  isEnrolled?: boolean;
}

export default function CourseCard({ course, isEnrolled = false }: CourseCardProps) {
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  // Sync bookmark state after component mounts (client‑only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setBookmarked(isCourseBookmarked(course.id));
    }
  }, []);
  const [imgSrc, setImgSrc] = useState(course.thumbnail || `/images/courses/${course.id}.svg`);

  useEffect(() => {
    const handleBookmarkChange = () => {
      setBookmarked(isCourseBookmarked(course.id));
    };
    window.addEventListener("skillspring_bookmarks_updated", handleBookmarkChange);
    return () => {
      window.removeEventListener("skillspring_bookmarks_updated", handleBookmarkChange);
    };
  }, [course.id]);

  // Seat Allocation Calculations
  const totalSeats = course.totalSeats > 0 ? course.totalSeats : 20;
  const availableSeats = Math.max(0, course.availableSeats);
  const enrolledSeats = Math.max(0, totalSeats - availableSeats);
  const isFull = availableSeats <= 0;
  const fillPercentage = Math.min(100, Math.round((enrolledSeats / totalSeats) * 100));

  // Determine Seat Status
  let seatStatusLabel = "Seats Available";
  let seatStatusClass = "status-available";
  if (isFull) {
    seatStatusLabel = "Fully Enrolled";
    seatStatusClass = "status-full";
  } else if (availableSeats <= 5 || fillPercentage >= 75) {
    seatStatusLabel = "Filling Fast";
    seatStatusClass = "status-warning";
  }

  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = toggleBookmarkCourse(course.id);
    setBookmarked(newState);
    showToast(
      newState ? `Added "${course.title}" to bookmarks` : `Removed "${course.title}" from bookmarks`,
      newState ? "success" : "info"
    );
  };

  return (
    <article
      className="course-card"
      id={`course-card-${course.id}`}
      data-testid={`course-card-${course.id}`}
    >
      {/* Thumbnail Banner */}
      <div className="card-thumbnail-wrap">
        <Link href={`/courses/${course.id}`}>
          <Image
            src={imgSrc}
            alt={course.title}
            width={600}
            height={360}
            className="card-thumbnail-img"
            onError={() => setImgSrc("/images/courses/course-fallback.svg")}
            unoptimized
          />
        </Link>
        <button
          type="button"
          className={`card-bookmark-btn ${bookmarked ? "bookmarked" : ""}`}
          onClick={handleBookmarkToggle}
          title={bookmarked ? "Remove bookmark" : "Bookmark this course"}
          aria-label={`Bookmark ${course.title}`}
        >
          {bookmarked ? "★" : "☆"}
        </button>
      </div>

      <div className="card-top">
        <div className="card-badges-row">
          <span
            className={`card-badge badge-${course.level.toLowerCase()}`}
            id={`course-level-${course.id}`}
            data-testid={`course-level-${course.id}`}
          >
            {course.level}
          </span>

          <span className="card-category-tag" data-testid={`course-category-${course.id}`}>
            {course.category}
          </span>

          {isEnrolled && (
            <span className="card-enrolled-badge" data-testid={`enrolled-badge-${course.id}`}>
              &#10003; Enrolled
            </span>
          )}
        </div>

        <h3
          className="course-title"
          id={`course-title-${course.id}`}
          data-testid={`course-title-${course.id}`}
        >
          <Link href={`/courses/${course.id}`}>{course.title}</Link>
        </h3>

        <p className="course-card-description">{course.description}</p>
      </div>

      <div className="card-middle">
        <div className="instructor-meta">
          <span className="meta-icon" aria-hidden="true">&#128100;</span>
          <span className="meta-text">{course.instructor}</span>
        </div>
        <div className="duration-meta">
          <span className="meta-icon" aria-hidden="true">&#9201;</span>
          <span className="meta-text">{course.duration}</span>
        </div>
      </div>

      {/* Redesigned Compact Seat Allocation Section */}
      <div className="card-seats-container" data-testid={`seat-allocation-${course.id}`}>
        <div className="seats-header-row">
          <span className="seats-section-title">Course Seats</span>
          <span className={`seats-status-tag ${seatStatusClass}`}>
            {seatStatusLabel}
          </span>
        </div>

        {/* Seat Metrics & Visual Progress Bar */}
        <div className="seats-progress-wrapper">
          <div className="seats-progress-track" role="progressbar" aria-valuenow={fillPercentage} aria-valuemin={0} aria-valuemax={100}>
            <div
              className={`seats-progress-bar ${isFull ? "bar-full" : fillPercentage >= 75 ? "bar-warning" : "bar-available"}`}
              style={{ width: `${fillPercentage}%` }}
            />
          </div>
        </div>

        <div className="seats-count-row">
          <span className="seats-ratio-text">
            Available: <strong>{availableSeats}</strong> / {totalSeats}
          </span>
          <span
            className={`seats-remaining-pill ${isFull ? "pill-full" : "pill-available"}`}
            id={`seats-count-${course.id}`}
            data-testid={`seats-${course.id}`}
          >
            {isFull ? "0 Seats Remaining (Full)" : `${availableSeats} seats remaining`}
          </span>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="card-footer-actions">
        <div className="card-buttons-group">
          <Link
            href={`/courses/${course.id}`}
            className="btn btn-primary btn-sm"
            id={`btn-details-${course.id}`}
            data-testid={`btn-details-${course.id}`}
          >
            {isEnrolled ? "Continue" : "View Course"}
          </Link>

          <a
            href={`/courses/${course.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm btn-new-tab"
            id={`open-tab-${course.id}`}
            data-testid={`open-tab-${course.id}`}
            aria-label={`Open ${course.title} details in a new tab`}
          >
            New Tab &#x2197;
          </a>
        </div>
      </div>
    </article>
  );
}
