import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const theme = searchParams.get('theme') || 'light';
  const region = searchParams.get('region') || 'all';
  
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  
  const widgetScript = `
(function() {
  const widgetId = 'power-outage-widget-' + Math.random().toString(36).substr(2, 9);
  const container = document.currentScript.parentElement;
  
  // Create iframe
  const iframe = document.createElement('iframe');
  iframe.id = widgetId;
  iframe.src = '${baseUrl}/embed?theme=${theme}&region=${region}';
  iframe.style.width = '100%';
  iframe.style.height = '600px';
  iframe.style.border = 'none';
  iframe.style.borderRadius = '8px';
  
  container.appendChild(iframe);
  
  // Handle iframe resize
  window.addEventListener('message', function(event) {
    if (event.origin !== '${baseUrl}') return;
    if (event.data.type === 'resize' && event.data.widgetId === widgetId) {
      iframe.style.height = event.data.height + 'px';
    }
  });
})();`;

  return new Response(widgetScript, {
    headers: {
      'Content-Type': 'application/javascript',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}