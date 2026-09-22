'use client';

import { useEffect } from 'react';

export default function RemoveNetlifyBadge() {
  useEffect(() => {
    // Remover el badge de Netlify
    const removeNetlifyBadge = () => {
      const badge = document.querySelector('a[href*="netlify.com"]');
      if (badge) {
        badge.remove();
      }
    };

    // Ejecutar inmediatamente
    removeNetlifyBadge();

    // También ejecutar después de un pequeño delay por si se inyecta después
    const timeout = setTimeout(removeNetlifyBadge, 500);
    const timeout2 = setTimeout(removeNetlifyBadge, 1000);

    return () => {
      clearTimeout(timeout);
      clearTimeout(timeout2);
    };
  }, []);

  return null;
}
