"use client";

import { useEffect, useId, useRef } from "react";

const presentation = { delay: .4, enter: 1.2, speechFade: .45, speechHold: 4.5, settle: .8 };
type Box = { left: number; top: number; right: number; bottom: number };
const overlaps = (a: Box, b: Box) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;

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
    const mouth = root.querySelector<HTMLElement>(".hero-miniature__mouth")!;
    const face = root.querySelector<HTMLElement>(".hero-miniature__face")!;
    const tail = root.querySelector<SVGPathElement>(".hero-miniature__tail path")!;
    const hero = root.closest<HTMLElement>(".personal-opening")!;
    const photo = hero.querySelector<HTMLElement>(".hero-portrait__image")!;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let activated = false;
    let teardown = () => {};

    const positionSpeech = () => {
      if (disposed) return;
      const origin = root.getBoundingClientRect();
      const scaleX = origin.width / parseFloat(getComputedStyle(root).width);
      const scaleY = origin.height / parseFloat(getComputedStyle(root).height);
      const local = (rect: DOMRect): Box => ({ left: (rect.left - origin.left) / scaleX, top: (rect.top - origin.top) / scaleY, right: (rect.right - origin.left) / scaleX, bottom: (rect.bottom - origin.top) / scaleY });
      const lips = local(mouth.getBoundingClientRect());
      const facialArea = local(face.getBoundingClientRect());
      const photograph = local(photo.getBoundingClientRect());
      const artwork = local(motion.getBoundingClientRect());
      const bounds = local(hero.getBoundingClientRect());
      const margin = 4;
      // Text ranges preserve the real empty space beside short editorial lines.
      const obstacles: Box[] = [photograph, facialArea];
      hero.querySelectorAll(".hero-identity, .hero-details, .editorial-intro__edition, .editorial-intro__colophon").forEach((element) => {
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
          if (!walker.currentNode.textContent?.trim()) continue;
          const range = document.createRange();
          range.selectNodeContents(walker.currentNode);
          obstacles.push(...Array.from(range.getClientRects(), local));
        }
      });
      hero.querySelectorAll(".nexo-portal__actions a").forEach((element) => obstacles.push(local(element.getBoundingClientRect())));
      const preferredWidth = parseFloat(getComputedStyle(root).getPropertyValue("--miniature-bubble-width"));
      const gutterWidth = photograph.left - bounds.left - margin * 2;
      const widths = [...new Set([preferredWidth, Math.min(preferredWidth, gutterWidth), 96, 64, 32])].filter((width) => width >= 32 && width <= preferredWidth);
      let placement: { left: number; top: number; width: number; height: number } | undefined;
      for (const width of widths) {
        bubble.dataset.compact = String(width < 96);
        bubble.style.width = `${width}px`;
        const height = bubble.getBoundingClientRect().height / scaleY;
        const headTop = artwork.top + (artwork.bottom - artwork.top) * .04;
        const candidates = [
          // Keep the card beside the head first, with its bottom near the mouth.
          { left: facialArea.left - margin - width, top: lips.top + margin / 2 - height },
          { left: lips.left - margin * 2 - width, top: facialArea.top - margin - height },
          { left: photograph.left - margin - width, top: facialArea.top - margin - height },
          { left: lips.left - margin * 2 - width, top: headTop - margin - height },
          { left: facialArea.left - margin - width, top: facialArea.bottom + margin },
          { left: photograph.left, top: photograph.bottom + margin },
          { left: photograph.left, top: photograph.top - margin - height }
        ];
        const available = candidates.find(({ left, top }) => {
          const box = { left, top, right: left + width, bottom: top + height };
          const distance = Math.hypot(Math.max(left - lips.left, 0, lips.left - box.right), Math.max(top - lips.top, 0, lips.top - box.bottom));
          return left >= bounds.left + margin && box.right <= bounds.right - margin && top >= bounds.top + margin && box.bottom <= bounds.bottom - margin && distance < root.clientHeight && !obstacles.some((obstacle) => overlaps(box, obstacle));
        });
        if (available) { placement = { ...available, width, height }; break; }
      }
      if (!placement) return;
      const { left, top, width, height } = placement;
      bubble.style.width = `${width}px`;
      bubble.style.left = `${left}px`;
      bubble.style.top = `${top}px`;
      // A short side pointer replaces the long hooked route over the cheek.
      const tipX = lips.left - left - 3;
      const tipY = lips.top - top - 1;
      if (left + width <= facialArea.left - margin) {
        const baseY = Math.min(height - 3, Math.max(3, tipY));
        tail.setAttribute("d", `M ${width - 1} ${baseY - 3} L ${tipX} ${tipY} L ${width - 1} ${baseY + 3} Z`);
        return;
      }
      // On narrow screens, keep the curve outside the forehead and glasses;
      // only a fine taper approaches the mouth from the side.
      const sideX = facialArea.left - left - margin;
      const baseX = Math.min(width - 7, sideX - 3);
      const baseY = height - 1;
      tail.setAttribute("d", `M ${baseX - 3} ${baseY} C ${sideX - 4} ${baseY + margin} ${sideX - 4} ${tipY} ${sideX} ${tipY} L ${tipX} ${tipY} Q ${sideX} ${tipY - .75} ${sideX} ${tipY - 1} C ${sideX} ${baseY + margin} ${baseX + 3} ${baseY + 2} ${baseX + 3} ${baseY} Z`);
    };

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
        let introduced = false;
        let introducing = false;
        let availableAt = 0;
        const rest = () => {
          timeline?.kill();
          wave?.kill();
          dismiss?.kill();
          greeting = false;
          introducing = false;
          availableAt = performance.now() + (preference.matches ? 0 : presentation.settle * 1000);
          root.dataset.state = "settling";
          gsap.to(bubble, { autoAlpha: 0, duration: preference.matches ? 0 : .4, overwrite: true });
          gsap.to(motion, { xPercent: 0, yPercent: 0, rotation: 0, duration: preference.matches ? 0 : presentation.settle, ease: "power2.inOut", overwrite: true, onUpdate: positionSpeech, onComplete: () => { root.dataset.state = "rest"; } });
          gsap.to(wavingArm, { rotation: 0, duration: preference.matches ? 0 : .6, ease: "sine.inOut", overwrite: true });
        };
        const greet = () => {
          // Pointer movement inside the button never restarts a greeting.
          entrance?.kill();
          if (greeting || performance.now() < availableAt) return;
          greeting = true;
          introducing = !introduced;
          introduced = true;
          root.dataset.state = "greeting";
          if (preference.matches) {
            gsap.set(motion, { xPercent: 0, yPercent: 0, rotation: 0 });
            gsap.set(wavingArm, { rotation: 0 });
            positionSpeech();
            gsap.set(bubble, { autoAlpha: 1 });
            dismiss = gsap.delayedCall(presentation.speechHold, rest);
            return;
          }
          const speechAt = introducing ? 2.1 : 1.2;
          timeline = gsap.timeline();
          timeline.to(motion, { xPercent: 0, yPercent: 0, rotation: 0, duration: introducing ? presentation.enter : .35, ease: "power2.inOut", overwrite: true, onUpdate: positionSpeech }, 0)
            .to(motion, { rotation: () => Number(getComputedStyle(root).getPropertyValue("--miniature-tilt")), duration: .65, ease: "sine.inOut", onUpdate: positionSpeech }, introducing ? 1.15 : .3)
            .call(positionSpeech, [], speechAt)
            .to(bubble, { autoAlpha: 1, duration: presentation.speechFade, overwrite: true }, speechAt)
            .to(bubble, { autoAlpha: 0, duration: presentation.speechFade }, speechAt + presentation.speechFade + presentation.speechHold)
            .call(rest);
          wave = gsap.timeline();
          wave.to(wavingArm, { rotation: -9, duration: .4, ease: "sine.inOut", overwrite: true }, 1.7)
            .to(wavingArm, { rotation: 7, duration: .5, ease: "sine.inOut" }, 2.1)
            .to(wavingArm, { rotation: -6, duration: .5, ease: "sine.inOut" }, 2.6)
            .to(wavingArm, { rotation: 0, duration: .55, ease: "sine.inOut" }, 3.1);
        };
        const enter = (event: PointerEvent) => { if (event.pointerType === "mouse") { hovered = true; greet(); } };
        const leave = () => { hovered = false; if (!focused && greeting && !introducing) rest(); };
        const focus = () => { focused = !tapped && trigger.matches(":focus-visible"); greet(); };
        const blur = () => { focused = false; if (!hovered && greeting && !introducing) rest(); };
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
        const entrance = gsap.delayedCall(presentation.delay, greet);
        gsap.set(bubble, { autoAlpha: 0 });
        gsap.set(motion, { xPercent: preference.matches ? 0 : 75, yPercent: 0, rotation: 0 });
        gsap.set(wavingArm, { rotation: 0 });
        positionSpeech();
        const observer = new ResizeObserver(positionSpeech);
        observer.observe(hero);
        observer.observe(root);
        void document.fonts.ready.then(() => { if (!disposed) positionSpeech(); });
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
          observer.disconnect();
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
            <span className="hero-miniature__face" aria-hidden="true" />
            <span className="hero-miniature__mouth" aria-hidden="true" />
          </span>
        </span>
      </button>
      <span className="hero-miniature__bubble" id={messageId} role="tooltip">
        Oi! Que bom ter você por aqui!
        <svg className="hero-miniature__tail" aria-hidden="true"><path /></svg>
      </span>
    </div>
  );
}
