const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const png=fs.readFileSync(path.join(root,'assets/pixel/profile-banner.png'));
if(png.readUInt32BE(16)!==2172||png.readUInt32BE(20)!==724)throw new Error('Artwork dimensions changed');
const tracks=[
 ['202 524;214 524;226 512;238 500;250 488;262 476;274 476','0s'],
 ['390 476;402 476;414 476;426 488;438 500;450 512;462 524;474 524','1.4s'],
 ['202 524;214 524;226 536;238 548;250 560;262 572;274 572','.7s'],
 ['390 572;402 572;414 572;426 560;438 548;450 536;462 524;474 524','2.1s']
];
const signals=tracks.map(([values,delay])=>`<g class="motion" opacity="0"><rect x="-5" y="-5" width="10" height="10" fill="#f4f4f0" stroke="#191919" stroke-width="4"/><animateTransform attributeName="transform" type="translate" values="${values}" calcMode="discrete" dur="2.8s" begin="${delay}" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.1;.85;1" calcMode="discrete" dur="2.8s" begin="${delay}" repeatCount="indefinite"/></g>`).join('');
const points=[[800,644,0],[1088,618,1],[1468,530,2],[1772,114,1.5]];
const glints=points.map(([x,y,delay])=>`<g class="motion" opacity="0" transform="translate(${x} ${y})"><path d="M-3-9h6v6h6v6H3v6h-6V3h-6v-6h6z" fill="#f4f4f0" stroke="#191919" stroke-width="2"/><animate attributeName="opacity" values="0;0;1;0" keyTimes="0;.7;.8;1" calcMode="discrete" dur="4s" begin="${delay}s" repeatCount="indefinite"/></g>`).join('');
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="2172" height="724" viewBox="0 0 2172 724" role="img" aria-labelledby="title description" shape-rendering="crispEdges">
<title id="title">Mr-friendly-Spy / Pixel Art Developer Profile</title>
<desc id="description">Monochrome pixel art: code editors, a node graph, terrain and a game world. Code cursors blink and square signals travel between nodes.</desc>
<style>@media(prefers-reduced-motion:reduce){.motion{display:none}}</style>
<image width="2172" height="724" href="data:image/png;base64,${png.toString('base64')}" image-rendering="pixelated"/>
<rect class="motion" x="318" y="340" width="10" height="5" fill="#f4f4f0"><animate attributeName="opacity" values="1;0;1" keyTimes="0;.5;1" calcMode="discrete" dur="1.2s" repeatCount="indefinite"/></rect>
${signals}
${glints}
</svg>
`;
fs.writeFileSync(path.join(root,'assets/pixel/profile-banner-animated.svg'),svg);
console.log(JSON.stringify({bytes:Buffer.byteLength(svg),size:[2172,724],signals:tracks.length}));

