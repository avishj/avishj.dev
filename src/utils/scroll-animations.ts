import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimationConfig {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
  start?: string;
  end?: string;
}

const defaultConfig = {
  start: 'top 85%',
  end: 'top 20%',
  duration: 0.6,
  ease: 'power4.out',
};

/**
 * Creates a scroll-triggered animation with toggleActions for proper mid-scroll refresh handling.
 * Elements animate in on scroll down, animate out on scroll up past viewport.
 */
export function scrollReveal(
  element: Element | Element[] | NodeListOf<Element>,
  config: AnimationConfig
) {
  const elements = element instanceof NodeList ? Array.from(element) : 
                   Array.isArray(element) ? element : [element];
  
  elements.forEach((el) => {
    gsap.fromTo(el,
      config.from,
      {
        ...config.to,
        duration: config.to.duration ?? defaultConfig.duration,
        ease: config.to.ease ?? defaultConfig.ease,
        scrollTrigger: {
          trigger: el,
          start: config.start ?? defaultConfig.start,
          end: config.end ?? defaultConfig.end,
          toggleActions: 'play none none reverse',
        }
      }
    );
  });
}

/**
 * Creates a scroll-triggered timeline for complex multi-element animations.
 */
export function scrollRevealTimeline(
  trigger: Element,
  buildTimeline: (tl: gsap.core.Timeline) => void,
  options?: { start?: string; end?: string }
) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: options?.start ?? defaultConfig.start,
      end: options?.end ?? defaultConfig.end,
      toggleActions: 'play none none reverse',
    }
  });
  
  buildTimeline(tl);
  return tl;
}

// Preset animations
export const presets = {
  fadeUp: { from: { y: 20, opacity: 0 }, to: { y: 0, opacity: 1 } },
  fadeDown: { from: { y: -20, opacity: 0 }, to: { y: 0, opacity: 1 } },
  fadeLeft: { from: { x: -20, opacity: 0 }, to: { x: 0, opacity: 1 } },
  fadeRight: { from: { x: 20, opacity: 0 }, to: { x: 0, opacity: 1 } },
  scaleUp: { from: { scale: 0.9, opacity: 0 }, to: { scale: 1, opacity: 1 } },
  fadeUpScale: { from: { y: 30, opacity: 0, scale: 0.98 }, to: { y: 0, opacity: 1, scale: 1 } },
};
