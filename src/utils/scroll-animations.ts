import gsap from 'gsap';

interface AnimationConfig {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
  rootMargin?: string;
}

const defaultConfig = {
  rootMargin: '-15% 0px -15% 0px',
  duration: 0.6,
  ease: 'power4.out',
};

/**
 * Creates scroll-triggered animations using Intersection Observer.
 */
export function scrollReveal(
  element: Element | Element[] | NodeListOf<Element>,
  config: AnimationConfig
) {
  const elements = element instanceof NodeList ? Array.from(element) : 
                   Array.isArray(element) ? element : [element];
  
  const duration = (config.to.duration as number) ?? defaultConfig.duration;
  const ease = (config.to.ease as string) ?? defaultConfig.ease;
  const rootMargin = config.rootMargin ?? defaultConfig.rootMargin;
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement;
        
        if (entry.isIntersecting) {
          // Animate in (only if not already visible)
          if (el.dataset.scrollState !== 'visible') {
            el.dataset.scrollState = 'visible';
            gsap.to(el, { ...config.to, duration, ease, overwrite: true });
          }
        } else {
          // Check if element left from bottom (scrolling up) or top (scrolling down)
          const rect = entry.boundingClientRect;
          const leftFromBottom = rect.top >= window.innerHeight * 0.85;
          
          if (leftFromBottom && el.dataset.scrollState === 'visible') {
            // Only animate out when scrolling up (element leaves from bottom)
            el.dataset.scrollState = 'hidden';
            gsap.to(el, { ...config.from, duration: duration * 0.5, ease, overwrite: true });
          }
          // If left from top (scrolling down), keep visible - don't animate out
        }
      });
    },
    { rootMargin, threshold: 0 }
  );
  
  elements.forEach((el) => {
    const htmlEl = el as HTMLElement;
    const rect = el.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const margin = viewportHeight * 0.15;
    const inView = rect.top < viewportHeight - margin && rect.bottom > margin;
    
    if (inView) {
      gsap.set(el, config.to);
      htmlEl.dataset.scrollState = 'visible';
    } else {
      gsap.set(el, config.from);
      htmlEl.dataset.scrollState = 'hidden';
    }
    
    observer.observe(el);
  });
}

/**
 * Creates a scroll-triggered timeline for complex multi-element animations.
 */
export function scrollRevealTimeline(
  trigger: Element,
  buildTimeline: (tl: gsap.core.Timeline) => void,
  options?: { rootMargin?: string }
) {
  const rootMargin = options?.rootMargin ?? defaultConfig.rootMargin;
  const htmlTrigger = trigger as HTMLElement;
  
  // Create timeline NOT paused so fromTo renders "from" state immediately
  const tl = gsap.timeline();
  buildTimeline(tl);
  // Now pause and reset to beginning
  tl.pause().progress(0);
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (htmlTrigger.dataset.scrollState !== 'visible') {
            htmlTrigger.dataset.scrollState = 'visible';
            tl.restart();
          }
        } else {
          const rect = entry.boundingClientRect;
          const leftFromBottom = rect.top >= window.innerHeight * 0.85;
          
          if (leftFromBottom && htmlTrigger.dataset.scrollState === 'visible') {
            htmlTrigger.dataset.scrollState = 'hidden';
            tl.reverse();
          }
        }
      });
    },
    { rootMargin, threshold: 0 }
  );
  
  const rect = trigger.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const margin = viewportHeight * 0.15;
  const inView = rect.top < viewportHeight - margin && rect.bottom > margin;
  
  if (inView) {
    // Play timeline instead of progress(1) - ensures staggered tweens properly
    // complete through their "play" lifecycle for reverse() to work later
    tl.play(0);
    htmlTrigger.dataset.scrollState = 'visible';
  } else {
    htmlTrigger.dataset.scrollState = 'hidden';
  }
  
  observer.observe(trigger);
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
