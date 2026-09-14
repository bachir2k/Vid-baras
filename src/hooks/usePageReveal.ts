import { useLayoutEffect, useRef } from 'react';
import { animate, createScope, onScroll, stagger } from 'animejs';

export interface RevealGroup {
  /** Sélecteur CSS (scopé à la racine de la page) des éléments à animer. */
  selector: string;
  /**
   * 'load' joue l'animation immédiatement au montage (hero au-dessus de la ligne de flottaison).
   * 'scroll' (par défaut) déclenche l'animation quand `container` entre dans le viewport.
   */
  mode?: 'load' | 'scroll';
  /**
   * Élément dont la position déclenche la révélation au scroll — un seul élément englobant
   * (ex: la section), jamais le même sélecteur multiple que celui animé, pour un seuil non ambigu.
   * Requis en mode 'scroll'.
   */
  container?: string;
  translateY?: number;
  duration?: number;
  staggerMs?: number;
  /** Optionnel : anime aussi une mise à l'échelle depuis cette valeur vers 1. */
  scaleFrom?: number;
}

/**
 * Met en place des animations de révélation (fade + translateY, stagger) pour une page entière,
 * scopées via createScope pour un nettoyage propre au démontage (changement de route SPA).
 * Respecte prefers-reduced-motion en désactivant simplement les animations.
 */
export function usePageReveal<T extends HTMLElement = HTMLDivElement>(groups: RevealGroup[]) {
  const root = useRef<T>(null);

  useLayoutEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const scope = createScope({ root }).add(() => {
      groups.forEach((group) => {
        const {
          selector,
          mode = 'scroll',
          container,
          translateY = 28,
          duration = 700,
          staggerMs = 90,
          scaleFrom,
        } = group;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const animationProps: Record<string, any> = {
          opacity: [0, 1],
          translateY: [translateY, 0],
          duration,
          ease: 'outQuad',
          delay: stagger(staggerMs),
        };

        if (scaleFrom !== undefined) {
          animationProps.scale = [scaleFrom, 1];
        }

        if (mode === 'load') {
          animate(selector, animationProps);
        } else {
          animate(selector, {
            ...animationProps,
            autoplay: onScroll({
              target: container ?? selector,
              enter: 'bottom-=15% top',
              repeat: false,
            }),
          });
        }
      });
    });

    return () => scope.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return root;
}
