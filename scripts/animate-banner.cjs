const fs = require('node:fs');
const path = require('node:path');
const dir = path.resolve(__dirname, '..');
const png = fs.readFileSync(path.join(dir, 'assets', 'game-dev-banner.png'));
if (png.readUInt32BE(16) !== 2172 || png.readUInt32BE(20) !== 724) {
  throw new Error('Unexpected artwork dimensions; animation coordinates need adjusting.');
}
const motionPaths = [
  ['M212 517 C256 517 246 469 298 469', '0s'],
  ['M417 469 C458 469 455 508 496 508', '1.4s'],
  ['M212 517 C255 517 251 554 299 554', '0.7s'],
  ['M415 555 C462 555 456 509 496 509', '2.1s'],
];
const pulses = motionPaths.map(([d, delay]) => `
  <g class="motion" opacity="0">
    <circle r="10" fill="#b5fb37" opacity=".32" filter="url(#soft-glow)"/>
    <circle r="4.5" fill="#e6ffab"/>
    <animateMotion path="${d}" dur="2.8s" begin="${delay}" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.12;.82;1" dur="2.8s" begin="${delay}" repeatCount="indefinite"/>
  </g>`).join('');
const ripples = [[298,469,0],[417,469,1.4],[299,554,.7],[415,555,2.1]].map(([x,y,delay]) => `
  <circle class="motion" cx="${x}" cy="${y}" r="5" fill="none" stroke="#b8ff3f" stroke-width="1.7" opacity="0">
    <animate attributeName="r" values="5;17" dur="2.8s" begin="${delay}s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values=".65;0;0" keyTimes="0;.55;1" dur="2.8s" begin="${delay}s" repeatCount="indefinite"/>
  </circle>`).join('');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="2172" height="724" viewBox="0 0 2172 724" role="img" aria-labelledby="title description">
  <title id="title">Mr-friendly-Spy — Game Development, Tools and Backend</title>
  <desc id="description">An animated developer banner: blinking code cursors, signals traveling through a node graph, and light moving over a wireframe game landscape.</desc>
  <style>
    @media (prefers-reduced-motion: reduce) { .motion { display: none; } }
  </style>
  <defs>
    <image id="art" width="2172" height="724" href="data:image/png;base64,${png.toString('base64')}"/>
    <filter id="soft-glow" x="-100%" y="-100%" width="300%" height="300%" color-interpolation-filters="sRGB">
      <feGaussianBlur stdDeviation="5"/>
    </filter>
    <filter id="light" color-interpolation-filters="sRGB">
      <feComponentTransfer>
        <feFuncR type="linear" slope="1.6"/>
        <feFuncG type="linear" slope="1.6"/>
        <feFuncB type="linear" slope="1.6"/>
      </feComponentTransfer>
    </filter>
    <linearGradient id="scan-light" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="white" stop-opacity="0"/>
      <stop offset=".5" stop-color="white" stop-opacity=".85"/>
      <stop offset="1" stop-color="white" stop-opacity="0"/>
    </linearGradient>
    <mask id="scan-mask" maskUnits="userSpaceOnUse" x="500" y="360" width="1330" height="364">
      <rect x="160" y="360" width="480" height="364" fill="url(#scan-light)">
        <animate attributeName="x" values="160;1820" dur="6s" repeatCount="indefinite"/>
      </rect>
    </mask>
    <clipPath id="terrain">
      <path d="M550 565 L790 565 L875 588 L1005 540 L1068 506 L1200 530 L1270 490 L1380 465 L1470 392 L1600 337 L1775 212 L1820 450 L1700 585 L1550 690 L1240 724 L550 724 Z"/>
    </clipPath>
  </defs>

  <use href="#art"/>

  <!-- The original PNG stays intact. Only vector lighting and signals animate. -->
  <g class="motion" clip-path="url(#terrain)">
    <use href="#art" filter="url(#light)" mask="url(#scan-mask)"/>
  </g>

  <!-- Editor carets: deliberately small, with staggered blink timing. -->
  <path class="motion" d="M322 339 l11 1.4" fill="none" stroke="#b8ff42" stroke-width="3">
    <animate attributeName="opacity" values="1;0;1" keyTimes="0;.5;1" calcMode="discrete" dur="1.2s" repeatCount="indefinite"/>
  </path>
  <path class="motion" d="M537 244 l8 1.3" fill="none" stroke="#68eaff" stroke-width="2.5">
    <animate attributeName="opacity" values="0;1;0" keyTimes="0;.5;1" calcMode="discrete" dur="1.2s" repeatCount="indefinite"/>
  </path>

  <!-- Signals follow the curves already present in the node graph. -->
  ${pulses}
  ${ripples}

  <!-- The scene transform gizmo gently pulses. -->
  <circle class="motion" cx="2038" cy="158" r="9" fill="none" stroke="#6edcff" stroke-width="2" opacity="0">
    <animate attributeName="r" values="9;23" dur="3.5s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values=".7;0;0" keyTimes="0;.75;1" dur="3.5s" repeatCount="indefinite"/>
  </circle>
</svg>
`;
fs.writeFileSync(path.join(dir, 'assets', 'game-dev-banner-animated.svg'), svg);
fs.writeFileSync(path.join(dir, 'animation-preview.html'), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Animated GitHub Banner Preview</title>
<style>html{background:#0d1117;color:#e6edf3;font-family:system-ui}body{max-width:1100px;margin:42px auto;padding:0 24px}h1{font-size:20px;font-weight:500}img{width:100%;height:auto;display:block;border-radius:8px}p{color:#8b949e;font-size:14px;line-height:1.7}</style>
</head><body><h1>Mr-friendly-Spy / Animated profile banner</h1>
<img src="./assets/game-dev-banner-animated.svg" alt="Animated game development and coding banner">
<p>Code cursors · Node signals · Wireframe lighting<br>Animation respects your reduced-motion preference.</p>
</body></html>`);
console.log(JSON.stringify({svgBytes:Buffer.byteLength(svg),originalPNGBytes:png.length,size:[2172,724],motionPaths:motionPaths.length}));
