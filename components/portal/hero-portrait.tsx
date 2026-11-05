"use client";

import { useEffect, useRef } from "react";
import { heroPortrait } from "@/lib/portrait";
import { HeroMiniature } from "@/components/portal/hero-miniature";

export function HeroPortrait() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const preference = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    let nextX = 0;
    let nextY = 0;
    const renderPosition = () => {
      stage.style.setProperty("--portrait-x", String(nextX));
      stage.style.setProperty("--portrait-y", String(nextY));
      frame = 0;
    };
    const reset = () => {
      window.cancelAnimationFrame(frame);
      nextX = 0;
      nextY = 0;
      renderPosition();
    };
    const updatePreference = () => {
      stage.dataset.interactive = String(preference.matches);
      reset();
    };
    const move = (event: PointerEvent) => {
      if (!preference.matches || event.pointerType !== "mouse") return;
      const bounds = stage.getBoundingClientRect();
      nextX = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
      nextY = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
      if (!frame) frame = window.requestAnimationFrame(renderPosition);
    };

    updatePreference();
    preference.addEventListener("change", updatePreference);
    stage.addEventListener("pointermove", move);
    stage.addEventListener("pointerleave", reset);
    stage.addEventListener("pointercancel", reset);
    window.addEventListener("blur", reset);

    return () => {
      window.cancelAnimationFrame(frame);
      preference.removeEventListener("change", updatePreference);
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerleave", reset);
      stage.removeEventListener("pointercancel", reset);
      window.removeEventListener("blur", reset);
    };
  }, []);

  return (
    <figure className="hero-portrait">
      <div className="hero-portrait__stage" ref={stageRef}>
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
      <figcaption><span aria-hidden="true" />Pessoas. Ideias. Possibilidades.</figcaption>
    </figure>
  );
}
