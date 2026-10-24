"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface BannerSlide {
  id: string;
  category: string;
  title: string;
  description: string;
  imageSrc: string;
}

const BANNER_SLIDES: BannerSlide[] = [
  {
    id: "web-dev",
    category: "Web Development",
    title: "Web Development Excellence",
    description: "Build modern, accessible frontend web apps and full-stack software with HTML, CSS, JavaScript & React.",
    imageSrc: "/images/banners/banner-web-dev.png",
  },
  {
    id: "programming",
    category: "Programming",
    title: "Core Programming Mastery",
    description: "Solidify core programming foundations: Python, Java, C, and high-performance object-oriented C++.",
    imageSrc: "/images/banners/banner-programming.png",
  },
  {
    id: "data-science",
    category: "Data Science",
    title: "Data Science & Analytics",
    description: "Extract predictive insights, clean real-world datasets, and explore machine learning with Python and Pandas.",
    imageSrc: "/images/banners/banner-data-science.png",
  },
  {
    id: "ai",
    category: "Artificial Intelligence",
    title: "Artificial Intelligence Foundations",
    description: "Explore neural networks, backpropagation, modern AI algorithms, and intelligent software engineering.",
    imageSrc: "/images/banners/banner-ai.png",
  },
  {
    id: "career",
    category: "Career Development",
    title: "Career & Industry Skills",
    description: "Master Git version control, technical problem-solving patterns, and high-frequency interview strategies.",
    imageSrc: "/images/banners/banner-career.png",
  },
];

interface PromoBannerProps {
  onCategorySelect?: (category: string) => void;
}

export default function PromoBanner({ onCategorySelect }: PromoBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = BANNER_SLIDES.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, total]);

  const currentSlide = BANNER_SLIDES[currentIndex];

  const handleSlideClick = () => {
    if (onCategorySelect) {
      onCategorySelect(currentSlide.category);
    }
  };

  return (
    <section
      className="promo-carousel-container"
      id="promo-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured Educational Promotional Banners"
      aria-live="polite"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') { prevSlide(); }
        else if (e.key === 'ArrowRight') { nextSlide(); }
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="promo-carousel" onClick={handleSlideClick} style={{ cursor: "pointer" }}>
        <div className="carousel-slide">
          <Image
            src={currentSlide.imageSrc}
            alt={`${currentSlide.title} Banner`}
            width={1200}
            height={440}
            className="carousel-slide-img"
            priority={currentIndex === 0}
            unoptimized
          />
        </div>

        {/* Carousel Prev/Next Controls */}
        <div className="carousel-controls" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className="carousel-arrow-btn"
            id="btn-carousel-prev"
            aria-label="Previous promotional slide"
            onClick={prevSlide}
          >
            &#10094;
          </button>
          <button
            type="button"
            className="carousel-arrow-btn"
            id="btn-carousel-next"
            aria-label="Next promotional slide"
            onClick={nextSlide}
          >
            &#10095;
          </button>
        </div>

        {/* Pagination Indicators */}
        <div className="carousel-pagination" onClick={(e) => e.stopPropagation()}>
          {BANNER_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              className={`pagination-dot ${idx === currentIndex ? "active" : ""}`}
              aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
              aria-pressed={idx === currentIndex}
              onClick={() => goToSlide(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
