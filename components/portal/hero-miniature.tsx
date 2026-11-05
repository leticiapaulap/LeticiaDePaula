"use client";

import { useEffect, useId, useRef } from "react";

export function HeroMiniature() {
  const rootRef = useRef<HTMLDivElement>(null);
  const messageId = useId();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const image = root.querySelector<HTMLImageElement>(".hero-miniature__avatar")!;
    const trigger = root.querySelector<HTMLButtonElement>("button")!;
    const motion = root.querySelector<HTMLElement>(".hero-miniature__motion")!;
    const bubble = root.querySelector<HTMLElement>(".hero-miniature__bubble")!;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let activated = false;
    let teardown = () => {};

    const fail = () => { root.hidden = true; trigger.disabled = true; teardown(); };
    const activate = async () => {
      if (!image.naturalWidth || disposed || activated) return;
      activated = true;
      try {
        const { gsap } = await import("gsap");
        if (disposed) return;
        let timeline: gsap.core.Timeline | undefined;
        let dismiss: gsap.core.Tween | undefined;
        let hovered = false;
        let focused = false;
        let tapped = false;
        let greeting = false;
        const rest = () => {
          timeline?.kill();
          dismiss?.kill();
          greeting = false;
          root.dataset.state = "rest";
          gsap.to(bubble, { autoAlpha: 0, y: 4, duration: preference.matches ? 0 : .4, overwrite: true });
          gsap.to(motion, { yPercent: 0, rotation: 0, duration: preference.matches ? 0 : 1.15, ease: "power2.inOut", overwrite: true });
        };
        const greet = () => {
          // Pointer movement inside the button never restarts a greeting.
          entrance?.kill();
          if (greeting) return;
          greeting = true;
          root.dataset.state = "greeting";
          if (preference.matches) {
            gsap.set(motion, { y: 0, yPercent: 0, rotation: 0 });
            gsap.set(bubble, { autoAlpha: 1, y: 0 });
            dismiss = gsap.delayedCall(5, rest);
            return;
          }
          timeline = gsap.timeline();
          timeline.to(motion, { yPercent: -3, duration: .75, ease: "power2.out", overwrite: true }, 0)
            .to(motion, { rotation: -3, duration: .85, ease: "sine.inOut" }, .6)
            .to(motion, { rotation: 1.5, duration: 1.3, ease: "sine.inOut" }, 2)
            .to(motion, { yPercent: 0, rotation: 0, duration: 1, ease: "sine.inOut" }, 4.2)
            .to(bubble, { autoAlpha: 1, y: 0, duration: .55, overwrite: true }, .8)
            .to(bubble, { autoAlpha: 0, y: 4, duration: .55 }, 5.5)
            .call(() => { if (!hovered && (!focused || tapped)) rest(); }, [], 6.2);
        };
        const enter = (event: PointerEvent) => { if (event.pointerType === "mouse") { hovered = true; greet(); } };
        const leave = () => { hovered = false; if (!focused) rest(); };
        const focus = () => { focused = !tapped && trigger.matches(":focus-visible"); greet(); };
        const blur = () => { focused = false; if (!hovered) rest(); };
        const click = () => { if (!greeting) greet(); };
        const pointerdown = (event: PointerEvent) => { tapped = event.pointerType !== "mouse"; };
        const keydown = (event: KeyboardEvent) => { if (event.key === "Escape") rest(); };
        const changed = () => {
          entrance?.kill();
          rest();
          if (hovered || focused) greet();
        };
        const entrance = gsap.delayedCall(1.2, greet);
        gsap.set(bubble, { autoAlpha: 0, y: 4 });
        gsap.set(motion, { y: 0, yPercent: 0, rotation: 0 });
        root.dataset.ready = "true";
        trigger.disabled = false;
        trigger.addEventListener("pointerenter", enter);
        trigger.addEventListener("pointerleave", leave);
        trigger.addEventListener("pointercancel", leave);
        trigger.addEventListener("focus", focus);
        trigger.addEventListener("blur", blur);
        trigger.addEventListener("click", click);
        trigger.addEventListener("pointerdown", pointerdown);
        trigger.addEventListener("keydown", keydown);
        preference.addEventListener("change", changed);
        teardown = () => {
          entrance?.kill();
          dismiss?.kill();
          timeline?.kill();
          gsap.killTweensOf([motion, bubble]);
          trigger.removeEventListener("pointerenter", enter);
          trigger.removeEventListener("pointerleave", leave);
          trigger.removeEventListener("pointercancel", leave);
          trigger.removeEventListener("focus", focus);
          trigger.removeEventListener("blur", blur);
          trigger.removeEventListener("click", click);
          trigger.removeEventListener("pointerdown", pointerdown);
          trigger.removeEventListener("keydown", keydown);
          preference.removeEventListener("change", changed);
        };
      } catch {
        fail();
      }
    };
    image.addEventListener("error", fail);
    image.addEventListener("load", activate, { once: true });
    if (image.complete) {
      if (image.naturalWidth) void activate();
      else fail();
    }
    return () => {
      disposed = true;
      teardown();
      image.removeEventListener("error", fail);
      image.removeEventListener("load", activate);
    };
  }, []);

  return (
    <div className="hero-miniature" ref={rootRef} data-ready="false" data-state="rest">
      <button type="button" className="hero-miniature__trigger" aria-label="Cumprimentar Letícia" aria-describedby={messageId} disabled>
        <span className="hero-miniature__viewport" aria-hidden="true">
          <span className="hero-miniature__motion">
            <img className="hero-miniature__avatar" src="/images/leticia-mini-avatar.webp" alt="" width={579} height={768} draggable={false} decoding="async" fetchPriority="low" />
          </span>
        </span>
      </button>
      <span className="hero-miniature__bubble" id={messageId} role="tooltip">Oi! Que bom ter você por aqui!</span>
    </div>
  );
}
