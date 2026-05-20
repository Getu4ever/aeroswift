// src/components/AviasalesSearch.tsx
'use client';

import { useEffect } from 'react';

export default function AviasalesSearch() {
  useEffect(() => {
    // 1. Clean up any existing widget to prevent duplication
    const container = document.getElementById('aviasales-widget-container');
    if (container) container.innerHTML = '';

    // 2. Create and append the new script with your custom parameters
    // Updated show_hotels to false to remove the hotel tick box
    const script = document.createElement('script');
    script.src = 'https://tpwgt.com/content?currency=gbp&trs=531109&shmarker=730324&show_hotels=false&powered_by=true&locale=en&searchUrl=www.aviasales.com%2Fsearch&primary_override=%23560591&color_button=%23560591&color_icons=%23560591&dark=%23000000&light=%23FFFFFF&secondary=%2307575B&special=%23C4C4C4&color_focused=%2332a8dd&border_radius=0&plain=true&promo_id=7879&campaign_id=100';
    script.async = true;
    script.charset = 'utf-8';
    
    if (container) {
      container.appendChild(script);
    }
  }, []);

  return (
    <div id="aviasales-widget-container" className="w-full" />
  );
}