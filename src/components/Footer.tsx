"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  return (
    <footer className="footer-exact" id="main-footer" data-testid="main-footer">
      <div className="footer-exact-inner">
        {/* Main 4-Column Footer Content */}
        <div className="footer-grid">
          {/* Column 1: Brand & Identity */}
          <div className="footer-col footer-col-brand">
            <Link href="/" className="footer-brand-logo">
              <span className="footer-logo-badge">SS</span>
              <span className="footer-brand-text">
                <span className="brand-navy">Skill</span>
                <span className="brand-blue">Spring</span>
              </span>
            </Link>
            <p className="footer-tagline">
              <em>Learn Today. Build Tomorrow.</em>
            </p>
            <p className="footer-description">
              SkillSpring is a modern, responsive Learning Management Portal designed to help
              students explore verified technical courses, practice with modular lessons, and
              track their educational journey with zero friction.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links-list">
              <li>
                <Link href="/" className="footer-link">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/#course-catalogue" className="footer-link">
                  Explore Courses
                </Link>
              </li>
              <li>
                <Link href="/my-learning" className="footer-link">
                  My Learning Dashboard
                </Link>
              </li>
              <li>
                <Link href="/about" className="footer-link">
                  About SkillSpring
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Learning Tracks */}
          <div className="footer-col">
            <h4 className="footer-col-title">Curriculum Tracks</h4>
            <ul className="footer-links-list">
              <li>
                <Link href="/#course-catalogue" className="footer-link">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/#course-catalogue" className="footer-link">
                  Programming & Algorithms
                </Link>
              </li>
              <li>
                <Link href="/#course-catalogue" className="footer-link">
                  Data Science & Analytics
                </Link>
              </li>
              <li>
                <Link href="/#course-catalogue" className="footer-link">
                  Software Testing & Automation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Platform & QA Testbed Info */}
          <div className="footer-col">
            <h4 className="footer-col-title">Platform Information</h4>
            <p className="footer-info-text">
              Built with Next.js 16, React 19, TypeScript, and a bespoke Blue-and-White design system.
            </p>
            <p className="footer-info-text" style={{ marginTop: "0.5rem" }}>
              Engineered as an automated Quality Assurance testbed utilizing Python 3 and Selenium WebDriver 4 Page Object Model (POM).
            </p>
            <div className="footer-status-pill">
              <span className="status-dot-pulse"></span>
              <span>Deterministic Local QA Ready</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            Copyright &copy; {currentYear} SkillSpring. All rights reserved.
          </p>
          <p className="footer-bottom-meta">
            BCA Final-Year Capstone Project &bull; Quality Assurance Automation Testbed
          </p>
        </div>
      </div>
    </footer>
  );
}
