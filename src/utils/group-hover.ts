import gsap from 'gsap';

const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export function groupHoverFade(itemSelector: string) {
  if (!canHover) return;

  const items = document.querySelectorAll(itemSelector);
  if (items.length < 2) return;

  function resetAll() {
    items.forEach((item) => {
      gsap.to(item, { opacity: 1, duration: 0.2, ease: 'power2.out', overwrite: true });
    });
  }

  items.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      items.forEach((other) => {
        gsap.to(other, {
          opacity: other === item ? 1 : 0.4,
          duration: 0.15,
          ease: 'power2.out',
          overwrite: true,
        });
      });
    });

    item.addEventListener('mouseleave', (e) => {
      const related = (e as MouseEvent).relatedTarget as Element | null;
      if (!related || !related.closest(itemSelector)) {
        resetAll();
      }
    });
  });
}
