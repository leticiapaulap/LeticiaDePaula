"use client";

import { useEffect, useRef } from "react";

const presentation = { delay: .4, enter: 1.2 };

export function HeroMiniature() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const image = root.querySelector<HTMLImageElement>(".hero-miniature__avatar")!;
    const motion = root.querySelector<HTMLElement>(".hero-miniature__motion")!;
    const wavingArm = root.querySelector<HTMLElement>(".hero-miniature__wave-arm")!;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let activated = false;
    let teardown = () => {};

    const fail = () => { root.hidden = true; teardown(); };
    const activate = async () => {
      if (!image.naturalWidth || disposed || activated) return;
      activated = true;
      try {
        const { gsap } = await import("gsap");
        if (disposed) return;
        let entrance: gsap.core.Timeline | undefined;

        const showRestingCharacter = () => {
          entrance?.kill();
          gsap.killTweensOf([motion, wavingArm]);
          gsap.set(motion, { xPercent: 0, yPercent: 0, rotation: 0 });
          gsap.set(wavingArm, { rotation: 0 });
          root.dataset.state = "rest";
        };

        const enter = () => {
          if (preference.matches) {
            showRestingCharacter();
            return;
          }

          root.dataset.state = "entering";
          entrance = gsap.timeline({
            delay: presentation.delay,
            onComplete: () => { root.dataset.state = "rest"; }
          })
            .to(motion, { xPercent: 0, yPercent: 0, duration: presentation.enter, ease: "power2.inOut" })
            .to(motion, { rotation: -3, duration: .65, ease: "sine.inOut" })
            .to(wavingArm, { rotation: -9, duration: .4, ease: "sine.inOut" })
            .to(wavingArm, { rotation: 7, duration: .5, ease: "sine.inOut" })
            .to(wavingArm, { rotation: -6, duration: .5, ease: "sine.inOut" })
            .to(wavingArm, { rotation: 0, duration: .55, ease: "sine.inOut" });
        };

        const changed = () => { if (preference.matches) showRestingCharacter(); };
        gsap.set(motion, { xPercent: preference.matches ? 0 : 75, yPercent: 0, rotation: 0 });
        gsap.set(wavingArm, { rotation: 0 });
        root.dataset.ready = "true";
        enter();
        preference.addEventListener("change", changed);
        teardown = () => {
          preference.removeEventListener("change", changed);
          entrance?.kill();
          gsap.killTweensOf([motion, wavingArm]);
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
    <div className="hero-miniature" ref={rootRef} data-ready="false" data-state="rest" aria-hidden="true">
      <span className="hero-miniature__viewport">
        <span className="hero-miniature__motion">
          <img className="hero-miniature__avatar" src="/images/leticia-mini-avatar.webp" alt="" width={579} height={768} draggable={false} decoding="async" fetchPriority="low" />
          <img className="hero-miniature__wave-arm" src="/images/leticia-mini-avatar.webp" alt="" width={579} height={768} draggable={false} decoding="async" />
        </span>
      </span>
    </div>
  );
}
