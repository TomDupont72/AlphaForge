import { gsap } from "gsap";

export function fadeUpAnimation(element: HTMLElement) {
  return gsap.fromTo(
    element,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    }
  );
}