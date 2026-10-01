"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface HeroSliderProps {
  images?: string[];
  intervalMs?: number;
}

const DEFAULT_HERO_IMAGES = [
  "/images/home/hero.png",
  "/images/home/hero2.png",
  "/images/home/hero3.png",
];

export default function HeroSlider({
  images = DEFAULT_HERO_IMAGES,
  intervalMs = 3000,
}: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [images, intervalMs]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      {/* Sliding Images Stack */}
      {images.map((src, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={src}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: isActive ? 1 : 0,
              transform: isActive ? "scale(1.02) translateX(0)" : "scale(1) translateX(12px)",
              transition: "opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), transform 1.8s cubic-bezier(0.4, 0, 0.2, 1)",
              pointerEvents: "none",
              zIndex: isActive ? 1 : 0,
            }}
          >
            <Image
              src={src}
              alt={`Shell Biotech Hero Slide ${index + 1}`}
              fill
              priority={index === 0}
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        );
      })}

      {/* Stable dark vignette overlay for optimal typography legibility on the left */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(90deg, rgba(7, 20, 33, 0.90) 0%, rgba(7, 20, 33, 0.65) 45%, rgba(7, 20, 33, 0.25) 100%)",
          zIndex: 2,
        }}
      />

      {/* Subtle Slide Indicator Dots */}
      <div
        style={{
          position: "absolute",
          bottom: "32px",
          right: "48px",
          display: "flex",
          gap: "8px",
          zIndex: 3,
        }}
      >
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            style={{
              width: idx === currentIndex ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              backgroundColor: idx === currentIndex ? "var(--color-secondary, #496B5A)" : "rgba(255, 255, 255, 0.35)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
