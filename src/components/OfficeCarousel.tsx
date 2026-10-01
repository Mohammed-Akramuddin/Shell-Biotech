"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface OfficeImageItem {
  src: string;
  caption?: string;
}

// Easily extendable list of office images in public/images/company/
const DEFAULT_OFFICE_IMAGES: OfficeImageItem[] = [
  {
    src: "/images/company/office-1.jpg",
    caption: "Registered Administrative Office — Hyderabad, Telangana",
  },
  {
    src: "/images/company/office-2.jpg",
    caption: "Central Operations & Partner Sourcing Coordination Desk",
  },
  {
    src: "/images/company/office-3.jpg",
    caption: "Distribution Logistics & Institutional Hospital Procurement",
  },
];

interface OfficeCarouselProps {
  images?: OfficeImageItem[];
  autoSlideInterval?: number;
}

export default function OfficeCarousel({
  images = DEFAULT_OFFICE_IMAGES,
  autoSlideInterval = 4000,
}: OfficeCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (images.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [images.length, autoSlideInterval, isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        position: "relative",
        width: "100%",
        height: "360px",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-xs)",
        overflow: "hidden",
        backgroundColor: "#0B1F33",
        boxShadow: "var(--shadow-subtle)",
      }}
    >
      {/* Slides */}
      {images.map((img, idx) => {
        const isActive = idx === currentIndex;
        return (
          <div
            key={img.src + idx}
            style={{
              position: "absolute",
              inset: 0,
              opacity: isActive ? 1 : 0,
              transform: isActive ? "scale(1) translateX(0)" : "scale(1.02) translateX(8px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
              pointerEvents: isActive ? "auto" : "none",
            }}
          >
            <Image
              src={img.src}
              alt={img.caption || `Shell Biotech Office Image ${idx + 1}`}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "contain", padding: "16px" }}
              onError={(e) => {
                // Graceful fallback to existing office.jpg if office-X.jpg isn't placed yet
                const target = e.currentTarget as HTMLImageElement;
                if (!target.src.endsWith("/office.jpg")) {
                  target.src = "/images/company/office.jpg";
                }
              }}
            />
          </div>
        );
      })}

      {/* Slide Badge (e.g. 01 / 03) */}
      <div
        style={{
          position: "absolute",
          top: "16px",
          left: "16px",
          backgroundColor: "rgba(11, 31, 51, 0.75)",
          color: "#FFFFFF",
          fontSize: "0.75rem",
          fontWeight: 700,
          letterSpacing: "0.08em",
          padding: "4px 10px",
          borderRadius: "4px",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          zIndex: 2,
        }}
      >
        {String(currentIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            aria-label="Previous office image"
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(11, 31, 51, 0.65)",
              color: "#FFFFFF",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
              zIndex: 3,
            }}
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next office image"
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(11, 31, 51, 0.65)",
              color: "#FFFFFF",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
              zIndex: 3,
            }}
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      {/* Caption & Indicators Bottom Bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "12px 18px",
          background: "linear-gradient(180deg, transparent 0%, rgba(7, 20, 33, 0.85) 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontSize: "0.78rem",
            color: "#D0D9DC",
            fontWeight: 500,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "70%",
          }}
        >
          {images[currentIndex]?.caption}
        </span>

        {/* Dots */}
        <div style={{ display: "flex", gap: "6px" }}>
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to image ${idx + 1}`}
              style={{
                width: idx === currentIndex ? "18px" : "6px",
                height: "6px",
                borderRadius: "3px",
                backgroundColor: idx === currentIndex ? "var(--color-secondary, #496B5A)" : "rgba(255, 255, 255, 0.4)",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
