"use client";

import { heroPortrait } from "@/lib/portrait";
import { HeroMiniature } from "@/components/portal/hero-miniature";

export function HeroPortrait() {
  return (
    <figure className="hero-portrait">
      <div className="hero-portrait__stage">
        <div className="hero-portrait__grid" aria-hidden="true" />
        <div className="hero-portrait__orbit" aria-hidden="true"><span /></div>
        <div className="hero-portrait__frame">
          <HeroMiniature />
          <div className="hero-portrait__image">
            <picture>
              <source
                type="image/webp"
                srcSet="/images/leticia-de-paula-720.webp 720w, /images/leticia-de-paula-960.webp 960w, /images/leticia-de-paula-1200.webp 1200w"
                sizes="(max-width: 767px) min(459px, calc((100vw - 68px) * 1.81818)), (max-width: 1099px) 450px, 542px"
              />
              <img
                src={heroPortrait.src}
                alt={heroPortrait.alt}
                width={heroPortrait.width}
                height={heroPortrait.height}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                draggable={false}
              />
            </picture>
          </div>
          <span className="hero-portrait__rim" aria-hidden="true" />
          <span className="hero-portrait__corner hero-portrait__corner--top" aria-hidden="true" />
          <span className="hero-portrait__corner hero-portrait__corner--bottom" aria-hidden="true" />
          <span className="hero-portrait__light" aria-hidden="true" />
        </div>
      </div>
    </figure>
  );
}
