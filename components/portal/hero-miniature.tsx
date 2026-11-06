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
    const wavingArm = root.querySelector<HTMLElement>(".hero-miniature__wave-arm")!;
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
        let wave: gsap.core.Timeline | undefined;
        let hovered = false;
        let focused = false;
        let tapped = false;
        let greeting = false;
        let availableAt = 0;
        const rest = () => {
          timeline?.kill();
          wave?.kill();
          dismiss?.kill();
          greeting = false;
          availableAt = performance.now() + (preference.matches ? 0 : 1300);
          root.dataset.state = "retreating";
          gsap.to(bubble, { autoAlpha: 0, duration: preference.matches ? 0 : .4, overwrite: true });
          gsap.to(motion, { xPercent: preference.matches ? 0 : 18, yPercent: 0, rotation: 0, duration: preference.matches ? 0 : 1.3, ease: "power2.inOut", overwrite: true, onComplete: () => { root.dataset.state = "rest"; } });
          gsap.to(wavingArm, { rotation: 0, duration: preference.matches ? 0 : .6, ease: "sine.inOut", overwrite: true });
        };
        const greet = () => {
          // Pointer movement inside the button never restarts a greeting.
          entrance?.kill();
          if (greeting || performance.now() < availableAt) return;
          greeting = true;
          root.dataset.state = "greeting";
          if (preference.matches) {
            gsap.set(motion, { xPercent: 0, yPercent: 0, rotation: 0 });
            gsap.set(wavingArm, { rotation: 0 });
            gsap.set(bubble, { autoAlpha: 1 });
            dismiss = gsap.delayedCall(5, rest);
            return;
          }
          timeline = gsap.timeline();
          timeline.to(motion, { xPercent: 0, yPercent: 0, rotation: 0, duration: 1.4, ease: "power2.inOut", overwrite: true }, 0)
            .to(motion, { rotation: () => Number(getComputedStyle(root).getPropertyValue("--miniature-tilt")), duration: .8, ease: "sine.inOut" }, 1.35)
            .to(bubble, { autoAlpha: 1, duration: .6, overwrite: true }, 2.55)
            .to(bubble, { autoAlpha: 0, duration: .6 }, 6.25)
            .call(rest, [], 7);
          wave = gsap.timeline();
          wave.to(wavingArm, { rotation: -9, duration: .4, ease: "sine.inOut", overwrite: true }, 1.7)
            .to(wavingArm, { rotation: 7, duration: .5, ease: "sine.inOut" }, 2.1)
            .to(wavingArm, { rotation: -6, duration: .5, ease: "sine.inOut" }, 2.6)
            .to(wavingArm, { rotation: 0, duration: .55, ease: "sine.inOut" }, 3.1);
        };
        const enter = (event: PointerEvent) => { if (event.pointerType === "mouse") { hovered = true; greet(); } };
        const leave = () => { hovered = false; if (!focused && greeting) rest(); };
        const focus = () => { focused = !tapped && trigger.matches(":focus-visible"); greet(); };
        const blur = () => { focused = false; if (!hovered && greeting) rest(); };
        const click = () => { if (!greeting) greet(); };
        const pointerdown = (event: PointerEvent) => { tapped = event.pointerType !== "mouse"; };
        const keydown = (event: KeyboardEvent) => { if (event.key === "Escape") rest(); };
        const changed = () => {
          entrance?.kill();
          rest();
          availableAt = 0;
          if (preference.matches) return;
          if (hovered || focused) greet();
        };
        const entrance = gsap.delayedCall(1.2, greet);
        gsap.set(bubble, { autoAlpha: 0 });
        gsap.set(motion, { xPercent: preference.matches ? 0 : 75, yPercent: 0, rotation: 0 });
        gsap.set(wavingArm, { rotation: 0 });
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
          wave?.kill();
          gsap.killTweensOf([motion, wavingArm, bubble]);
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
        <span className="hero-miniature__viewport">
          <span className="hero-miniature__motion">
            <img className="hero-miniature__avatar" src="/images/leticia-mini-avatar.webp" alt="" width={579} height={768} draggable={false} decoding="async" fetchPriority="low" />
            <img className="hero-miniature__wave-arm" src="/images/leticia-mini-avatar.webp" alt="" width={579} height={768} draggable={false} decoding="async" aria-hidden="true" />
            <span className="hero-miniature__mouth">
              <span className="hero-miniature__bubble" id={messageId} role="tooltip">
                Oi! Que bom ter você por aqui!
                <svg className="hero-miniature__tail" viewBox="0 0 24 40" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M 1 0 L 23 39 L 10 0" />
                </svg>
              </span>
            </span>
          </span>
        </span>
      </button>
    </div>
  );
}
