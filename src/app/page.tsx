"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MOCK_COURSES, getAllCategories, getAllLevels } from "@/data/mockCourses";
import CourseCard from "@/components/CourseCard";
import PromoBanner from "@/components/PromoBanner";
import Toast from "@/components/Toast";
import { getEnrolledCourseIds } from "@/utils/storage";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [enrolledIds, setEnrolledIds] = useState<string[]>([]);

  useEffect(() => {
    setEnrolledIds(getEnrolledCourseIds());
    const handleStorageUpdate = () => {
      setEnrolledIds(getEnrolledCourseIds());
    };
    window.addEventListener("storage", handleStorageUpdate);
    window.addEventListener("skillspring_enrolment_updated", handleStorageUpdate);
    return () => {
      window.removeEventListener("storage", handleStorageUpdate);
      window.removeEventListener("skillspring_enrolment_updated", handleStorageUpdate);
    };
  }, []);

  const categories = getAllCategories();
  const levels = getAllLevels();

  // Filter courses dynamically based on keyword search and selected dropdowns
  const filteredCourses = useMemo(() => {
    return MOCK_COURSES.filter((course) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        course.title.toLowerCase().includes(q) ||
        course.description.toLowerCase().includes(q) ||
        course.category.toLowerCase().includes(q) ||
        course.instructor.toLowerCase().includes(q);

      const matchesCategory =
        selectedCategory === "All Categories" || course.category === selectedCategory;

      const matchesLevel =
        selectedLevel === "All Levels" || course.level === selectedLevel;

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [searchQuery, selectedCategory, selectedLevel]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Categories");
    setSelectedLevel("All Levels");
  };

  const handleCategoryPillClick = (cat: string) => {
    setSelectedCategory(cat);
    const catalogueEl = document.getElementById("course-catalogue");
    if (catalogueEl) {
      catalogueEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isFiltered =
    searchQuery !== "" ||
    selectedCategory !== "All Categories" ||
    selectedLevel !== "All Levels";

  return (
    <>
      <Toast />

      {/* ===================================================================
          HERO SECTION (MATCHING EXACT USER DESIGN REFERENCE)
          =================================================================== */}
      <section className="exact-hero-section" id="hero-section" data-testid="hero-section">
        <div className="exact-hero-container">
          {/* Left Column: Heading, Subtitle, CTA Buttons, Feature Highlights */}
          <div className="exact-hero-left">
            {/* Pill Tag */}
            <div className="exact-hero-tag" id="academic-tag">
              <span className="exact-tag-bolt">&#9889;</span>
              <span>YOUR LEARNING JOURNEY STARTS HERE</span>
            </div>

            {/* Main Title */}
            <h1 className="exact-hero-title" id="main-heading" data-testid="main-heading">
              Grow Your Skills.<br />
              Shape Your <span className="exact-title-blue">Future.</span>
            </h1>

            {/* Supporting Description */}
            <p className="exact-hero-subtitle">
              Explore practical courses, learn new technologies, and build the skills you need for your future career.
            </p>

            {/* Buttons Row */}
            <div className="exact-hero-buttons">
              <a href="#course-catalogue" className="exact-btn-primary" id="btn-explore-catalogue">
                Explore Courses <span className="btn-arrow">&rarr;</span>
              </a>
              <Link href="/my-learning" className="exact-btn-secondary" id="btn-hero-my-learning">
                <span className="exact-play-circle">&#9658;</span>
                Start Learning
              </Link>
            </div>

            {/* 4 Feature Highlights Row */}
            <div className="exact-features-row">
              <div className="exact-feature-item">
                <div className="exact-feature-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </div>
                <div className="exact-feature-text">
                  <span className="feature-line-1">Learn</span>
                  <span className="feature-line-2">from Experts</span>
                </div>
              </div>

              <div className="exact-feature-item">
                <div className="exact-feature-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
                <div className="exact-feature-text">
                  <span className="feature-line-1">Flexible</span>
                  <span className="feature-line-2">Learning</span>
                </div>
              </div>

              <div className="exact-feature-item">
                <div className="exact-feature-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="7" />
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                  </svg>
                </div>
                <div className="exact-feature-text">
                  <span className="feature-line-1">Build</span>
                  <span className="feature-line-2">Real Skills</span>
                </div>
              </div>

              <div className="exact-feature-item">
                <div className="exact-feature-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                  </svg>
                </div>
                <div className="exact-feature-text">
                  <span className="feature-line-1">Advance</span>
                  <span className="feature-line-2">Your Career</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Composition matching exact reference */}
          <div className="exact-hero-right">
            <div className="exact-hero-visual-frame">
              <Image
                src="/images/hero-student-composition@2x.png"
                alt="SkillSpring Student Learning Environment with Python Programming and Web Development"
                width={1128}
                height={652}
                className="exact-hero-img"
                priority
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          MAIN CONTENT AREA (PROMO BANNER & COURSE CATALOGUE)
          =================================================================== */}
      <main className="main-content">
        {/* Promotional Carousel */}
        <PromoBanner onCategorySelect={handleCategoryPillClick} />

        {/* Course Catalogue Section */}
        <section
          className="catalogue-container"
          id="course-catalogue"
          data-testid="course-catalogue-section"
        >
          <div className="section-header">
            <div className="section-title-wrap">
              <h2>Explore Your Next Skill</h2>
              <p>Discover courses designed to help you learn, practice, and grow.</p>
            </div>
            <span className="nav-badge-pill" id="catalogue-badge">
              {filteredCourses.length} Courses Available
            </span>
          </div>

          {/* Quick Category Filter Pills */}
          <div className="category-pills-row" aria-label="Quick Category Filters">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`category-pill-btn ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Filter Bar */}
          <div className="catalogue-filter-bar" id="catalogue-filter-bar">
            <div className="search-input-wrapper">
              <span className="search-icon-adornment">&#128269;</span>
              <input
                type="text"
                id="search-input"
                data-testid="search-input"
                className="form-input"
                placeholder="Search courses by keyword, title, instructor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search courses"
              />
            </div>

            <div className="filter-group">
              <label htmlFor="category-filter" className="filter-label">
                Category:
              </label>
              <select
                id="category-filter"
                data-testid="category-filter"
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                aria-label="Filter by Category"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="level-filter" className="filter-label">
                Difficulty:
              </label>
              <select
                id="level-filter"
                data-testid="level-filter"
                className="form-select"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                aria-label="Filter by Difficulty Level"
              >
                {levels.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>

            {isFiltered && (
              <button
                type="button"
                id="btn-reset-filters"
                data-testid="btn-reset-filters"
                className="btn btn-secondary btn-sm"
                onClick={handleResetFilters}
              >
                Reset Filters &#10005;
              </button>
            )}
          </div>

          {/* Results Metadata */}
          <div className="filter-meta-bar">
            <span>
              Showing <strong>{filteredCourses.length}</strong> of{" "}
              <strong>{MOCK_COURSES.length}</strong> total courses
            </span>
            {searchQuery && (
              <span>
                Query: &quot;<em>{searchQuery}</em>&quot;
              </span>
            )}
          </div>

          {/* Course Cards Grid */}
          {filteredCourses.length > 0 ? (
            <div className="catalogue-grid" id="catalogue-grid" data-testid="catalogue-grid">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  isEnrolled={enrolledIds.includes(course.id)}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="empty-state" id="empty-state" data-testid="empty-state">
              <div className="empty-state-icon">&#128269;</div>
              <h3>No courses found matching your criteria</h3>
              <p>
                We couldn&apos;t find any training modules matching &quot;{searchQuery}&quot;. Try adjusting your
                search term, resetting the category or difficulty filters.
              </p>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                id="btn-empty-reset"
                data-testid="btn-empty-reset"
                onClick={handleResetFilters}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
