'use client';

import { useEffect } from 'react';

export default function RemoveNetlifyBadge() {
  useEffect(() => {
    // Remover el badge de Netlify de múltiples formas
    const removeNetlifyBadge = () => {
      // Método 1: Buscar por href
      let badge = document.querySelector('a[href*="netlify.com"]');
      if (badge) {
        badge.remove();
      }

      // Método 2: Buscar por clase o atributos comunes
      badge = document.querySelector('[data-netlify]');
      if (badge) {
        badge.remove();
      }

      // Método 3: Buscar por SVG o imágenes relacionadas
      const allElements = document.querySelectorAll('*');
      allElements.forEach((el) => {
        const href = el.getAttribute('href') || '';
        const src = el.getAttribute('src') || '';
        if (href.includes('netlify') || src.includes('netlify')) {
          if (!el.classList.contains('navbar') && !el.classList.contains('nav')) {
            el.remove();
          }
        }
      });
    };

    // Ejecutar inmediatamente
    removeNetlifyBadge();

    // Ejecutar después de delays
    setTimeout(removeNetlifyBadge, 100);
    setTimeout(removeNetlifyBadge, 500);
    setTimeout(removeNetlifyBadge, 1000);
    setTimeout(removeNetlifyBadge, 2000);

    // Observer para detectar cambios en el DOM
    const observer = new MutationObserver(() => {
      removeNetlifyBadge();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}

