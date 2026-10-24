"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { getEnrolledCourseIds } from "@/utils/storage";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [enrolledCount, setEnrolledCount] = useState<number>(0);
  const [hasMounted, setHasMounted] = useState(false);
  const [navSearch, setNavSearch] = useState("");

  // Dropdown States
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const coursesRef = useRef<HTMLLIElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Initialise client‑side state after hydration
  useEffect(() => {
    setHasMounted(true);
    setEnrolledCount(getEnrolledCourseIds().length);
  }, []);

  // Listen for storage changes to keep count in sync
  useEffect(() => {
    const handleStorageChange = () => {
      setEnrolledCount(getEnrolledCourseIds().length);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("skillspring_enrolment_updated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("skillspring_enrolment_updated", handleStorageChange);
    };
  }, []);

  // Click outside listener to close dropdown menus cleanly
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (coursesRef.current && !coursesRef.current.contains(event.target as Node)) {
        setCoursesOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const isHomeActive = pathname === "/";
  const isMyLearningActive = pathname.startsWith("/my-learning");
  const isAboutActive = pathname.startsWith("/about");

  const handleNavSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearch.trim()) {
      if (pathname !== "/") {
        router.push(`/#course-catalogue`);
      } else {
        const catalogueEl = document.getElementById("course-catalogue");
        if (catalogueEl) catalogueEl.scrollIntoView({ behavior: "smooth" });
        const inputEl = document.getElementById("search-input") as HTMLInputElement;
        if (inputEl) {
          inputEl.value = navSearch;
          inputEl.dispatchEvent(new Event("input", { bubbles: true }));
        }
      }
    }
  };

  const handleCategorySelect = () => {
    setCoursesOpen(false);
  };

  return (
    <header className="navbar-exact" id="navbar" data-testid="main-navbar">
      <div className="navbar-exact-inner">
        {/* Left: Brand Logo */}
        <Link href="/" className="exact-brand-logo" id="brand-logo" data-testid="brand-logo">
          <svg className="exact-logo-icon" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M18 4L2 12L18 20L34 12L18 4Z"
              fill="url(#capGrad)"
            />
            <path
              d="M6 15.5V23C6 27.5 11.4 31 18 31C24.6 31 30 27.5 30 23V15.5L18 21.5L6 15.5Z"
              fill="#1D4ED8"
            />
            <path
              d="M32 14V25M32 25L30 23M32 25L34 23"
              stroke="#F59E0B"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="capGrad" x1="2" y1="4" x2="34" y2="20" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3B82F6" />
                <stop offset="1" stopColor="#1E40AF" />
              </linearGradient>
            </defs>
          </svg>
          <span className="exact-brand-text">
            <span className="brand-navy">Skill</span>
            <span className="brand-blue">Spring</span>
          </span>
        </Link>

        {/* Middle Navigation Menu */}
        <nav className="exact-nav-center" aria-label="Main Navigation">
          <ul className="exact-nav-list">
            {/* Home Link */}
            <li className="exact-nav-item">
              <Link
                href="/"
                className={`exact-nav-link ${isHomeActive ? "active" : ""}`}
                id="nav-catalogue"
                data-testid="nav-catalogue"
              >
                Home
              </Link>
              {isHomeActive && <span className="exact-active-bar" />}
            </li>

            {/* Courses Dropdown */}
            <li className="exact-nav-item" ref={coursesRef} style={{ position: "relative" }}>
              <button
                type="button"
                className={`exact-nav-link dropdown-toggle-btn ${coursesOpen ? "active" : ""}`}
                id="nav-courses-dropdown"
                aria-expanded={coursesOpen}
                aria-haspopup="true"
                onClick={() => {
                  setCoursesOpen(!coursesOpen);
                  setProfileOpen(false);
                }}
              >
                <span>Courses</span>
                <svg
                  className={`chevron-icon ${coursesOpen ? "rotate-up" : ""}`}
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {coursesOpen && (
                <div className="exact-dropdown-menu courses-dropdown-menu" role="menu">
                  <div className="dropdown-section-label">Navigation</div>
                  <Link
                    href="/#course-catalogue"
                    className="dropdown-item-link"
                    role="menuitem"
                    onClick={() => setCoursesOpen(false)}
                  >
                    <span className="item-icon">📚</span>
                    <div className="item-text-group">
                      <strong className="item-title">Browse All Courses</strong>
                      <span className="item-desc">Explore 24 curriculum tracks</span>
                    </div>
                  </Link>

                  <Link
                    href="/my-learning"
                    className="dropdown-item-link"
                    role="menuitem"
                    onClick={() => setCoursesOpen(false)}
                  >
                    <span className="item-icon">📊</span>
                    <div className="item-text-group">
                      <strong className="item-title">My Learning Portal</strong>
                      <span className="item-desc">Track active modules & progress</span>
                    </div>
                  </Link>

                  <div className="dropdown-divider" />
                  <div className="dropdown-section-label">Popular Domains</div>

                  <Link
                    href="/#course-catalogue"
                    className="dropdown-category-item"
                    role="menuitem"
                    onClick={handleCategorySelect}
                  >
                    <span className="cat-dot dot-programming"></span>
                    <span>Programming & Algorithms</span>
                  </Link>
                  <Link
                    href="/#course-catalogue"
                    className="dropdown-category-item"
                    role="menuitem"
                    onClick={handleCategorySelect}
                  >
                    <span className="cat-dot dot-web"></span>
                    <span>Web Development</span>
                  </Link>
                  <Link
                    href="/#course-catalogue"
                    className="dropdown-category-item"
                    role="menuitem"
                    onClick={handleCategorySelect}
                  >
                    <span className="cat-dot dot-data"></span>
                    <span>Data Science & Analytics</span>
                  </Link>
                  <Link
                    href="/#course-catalogue"
                    className="dropdown-category-item"
                    role="menuitem"
                    onClick={handleCategorySelect}
                  >
                    <span className="cat-dot dot-qa"></span>
                    <span>Software Testing & Automation</span>
                  </Link>
                </div>
              )}
            </li>

            {/* My Learning Link */}
            <li className="exact-nav-item">
              <Link
                href="/my-learning"
                className={`exact-nav-link ${isMyLearningActive ? "active" : ""}`}
                id="nav-my-learning"
                data-testid="nav-my-learning"
              >
                My Learning
                {hasMounted && enrolledCount > 0 && (
                  <span
                    className="nav-counter-pill"
                    id="nav-enrolled-count"
                    data-testid="nav-enrolled-count"
                  >
                    {enrolledCount}
                  </span>
                )}
              </Link>
              {isMyLearningActive && <span className="exact-active-bar" />}
            </li>

            {/* About Page Link */}
            <li className="exact-nav-item">
              <Link
                href="/about"
                className={`exact-nav-link ${isAboutActive ? "active" : ""}`}
                id="nav-about"
                data-testid="nav-about"
              >
                About
              </Link>
              {isAboutActive && <span className="exact-active-bar" />}
            </li>
          </ul>
        </nav>

        {/* Right Navigation Elements: Search, Notifications, Profile Dropdown */}
        <div className="exact-nav-right">
          <form className="exact-search-bar" onSubmit={handleNavSearch}>
            <span className="search-glass-icon" aria-hidden="true">&#128269;</span>
            <input
              type="text"
              className="exact-search-input"
              placeholder="Search courses..."
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
              aria-label="Search courses"
            />
          </form>

          {/* Notification Bell */}
          <button type="button" className="exact-icon-btn" aria-label="Notifications" title="Notifications">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>

          {/* Profile Dropdown Component */}
          <div className="profile-dropdown-wrapper" ref={profileRef} style={{ position: "relative" }}>
            <button
              type="button"
              className="exact-profile-trigger"
              id="nav-profile-dropdown"
              aria-expanded={profileOpen}
              aria-haspopup="true"
              onClick={() => {
                setProfileOpen(!profileOpen);
                setCoursesOpen(false);
              }}
              aria-label="Student Profile Menu"
            >
              <div className="avatar-circle">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <svg
                className={`chevron-icon profile-chevron ${profileOpen ? "rotate-up" : ""}`}
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {profileOpen && (
              <div className="exact-dropdown-menu profile-dropdown-menu" role="menu">
                <div className="profile-menu-header">
                  <div className="profile-avatar-mini">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                  <div className="profile-header-info">
                    <strong className="profile-name">Student Learner</strong>
                    <span className="profile-role">Active Cohort Member</span>
                  </div>
                </div>

                <div className="dropdown-divider" />

                <Link
                  href="/my-learning"
                  className="dropdown-item-link"
                  role="menuitem"
                  onClick={() => setProfileOpen(false)}
                >
                  <span className="item-icon">🎓</span>
                  <div className="item-text-group">
                    <strong className="item-title">My Learning</strong>
                    <span className="item-desc">{enrolledCount} enrolled courses</span>
                  </div>
                </Link>

                <Link
                  href="/about"
                  className="dropdown-item-link"
                  role="menuitem"
                  onClick={() => setProfileOpen(false)}
                >
                  <span className="item-icon">ℹ️</span>
                  <div className="item-text-group">
                    <strong className="item-title">About SkillSpring</strong>
                    <span className="item-desc">Platform & project details</span>
                  </div>
                </Link>

                <Link
                  href="/#course-catalogue"
                  className="dropdown-item-link"
                  role="menuitem"
                  onClick={() => setProfileOpen(false)}
                >
                  <span className="item-icon">🔍</span>
                  <div className="item-text-group">
                    <strong className="item-title">Explore Courses</strong>
                    <span className="item-desc">Find new topics to learn</span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
