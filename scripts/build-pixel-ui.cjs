const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'assets', 'pixel');
fs.mkdirSync(out, {recursive:true});
const ink = '#f4f4f0', bg = '#191919', edge = '#747470';
const font = {
'A':['01110','10001','10001','11111','10001','10001','10001'],
'B':['11110','10001','10001','11110','10001','10001','11110'],
'C':['01111','10000','10000','10000','10000','10000','01111'],
'D':['11110','10001','10001','10001','10001','10001','11110'],
'E':['11111','10000','10000','11110','10000','10000','11111'],
'F':['11111','10000','10000','11110','10000','10000','10000'],
'G':['01111','10000','10000','10111','10001','10001','01111'],
'H':['10001','10001','10001','11111','10001','10001','10001'],
'I':['11111','00100','00100','00100','00100','00100','11111'],
'J':['00111','00010','00010','00010','10010','10010','01100'],
'K':['10001','10010','10100','11000','10100','10010','10001'],
'L':['10000','10000','10000','10000','10000','10000','11111'],
'M':['10001','11011','10101','10101','10001','10001','10001'],
'N':['10001','11001','10101','10011','10001','10001','10001'],
'O':['01110','10001','10001','10001','10001','10001','01110'],
'P':['11110','10001','10001','11110','10000','10000','10000'],
'Q':['01110','10001','10001','10001','10101','10010','01101'],
'R':['11110','10001','10001','11110','10100','10010','10001'],
'S':['01111','10000','10000','01110','00001','00001','11110'],
'T':['11111','00100','00100','00100','00100','00100','00100'],
'U':['10001','10001','10001','10001','10001','10001','01110'],
'V':['10001','10001','10001','10001','10001','01010','00100'],
'W':['10001','10001','10001','10101','10101','11011','10001'],
'X':['10001','10001','01010','00100','01010','10001','10001'],
'Y':['10001','10001','01010','00100','00100','00100','00100'],
'Z':['11111','00001','00010','00100','01000','10000','11111'],
'0':['01110','10001','10011','10101','11001','10001','01110'],
'1':['00100','01100','00100','00100','00100','00100','01110'],
'2':['01110','10001','00001','00010','00100','01000','11111'],
'3':['11110','00001','00001','01110','00001','00001','11110'],
'4':['00010','00110','01010','10010','11111','00010','00010'],
'5':['11111','10000','10000','11110','00001','00001','11110'],
'6':['01110','10000','10000','11110','10001','10001','01110'],
'7':['11111','00001','00010','00100','01000','01000','01000'],
'8':['01110','10001','10001','01110','10001','10001','01110'],
'9':['01110','10001','10001','01111','00001','00001','01110'],
'+':['00000','00100','00100','11111','00100','00100','00000'],
'#':['01010','11111','01010','01010','11111','01010','00000'],
'/':['00001','00001','00010','00100','01000','10000','10000'],
'-':['00000','00000','00000','11111','00000','00000','00000'],
'.':['00000','00000','00000','00000','00000','00110','00110'],
':':['00000','00110','00110','00000','00110','00110','00000'],
'>':['10000','01000','00100','00010','00100','01000','10000'],
'<':['00001','00010','00100','01000','00100','00010','00001'],
'_':['00000','00000','00000','00000','00000','00000','11111'],
'&':['01100','10010','10100','01000','10101','10010','01101'],
' ':['00000','00000','00000','00000','00000','00000','00000']
};
function esc(s){return s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');}
function textWidth(s, scale=2){return Math.max(0,s.length*6-1)*scale;}
function pixels(text,x,y,scale=2,color=ink){
  let d='';
  [...text.toUpperCase()].forEach((ch,i)=>{
    const glyph=font[ch];
    if(!glyph)throw new Error('Missing pixel glyph: '+ch);
    glyph.forEach((row,yy)=>[...row].forEach((v,xx)=>{
      if(v==='1')d+=`M${x+(i*6+xx)*scale} ${y+yy*scale}h${scale}v${scale}h-${scale}z`;
    }));
  });
  return `<path d="${d}" fill="${color}"/>`;
}
function svg(w,h,label,body){
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}" shape-rendering="crispEdges"><title>${esc(label)}</title>${body}</svg>\n`;
}
const manifest={};
function write(name,value){
  const rel='assets/pixel/'+name+'.svg';
  fs.writeFileSync(path.join(root,rel),value);
  manifest[rel]=value;
}
const badgeLabels={
'cpp':'C++','csharp':'C#','python':'PYTHON',
'unity':'UNITY','unreal':'UNREAL ENGINE','godot':'GODOT','gaea':'GAEA',
'fastapi':'FASTAPI','flask':'FLASK','sqlite':'SQLITE','rest':'REST API',
'docker':'DOCKER','compose':'DOCKER COMPOSE','linux':'LINUX','vk-cloud':'VK CLOUD','virtualbox':'VIRTUALBOX',
'figma':'FIGMA','uml':'UML','oop':'OOP','ghidra':'GHIDRA','git':'GIT','vscode':'VS CODE','pycharm':'PYCHARM',
'vk-play':'VK PLAY','youtube':'YOUTUBE','github':'GITHUB','language-breakdown':'LANGUAGE BREAKDOWN'
};
for(const [id,label] of Object.entries(badgeLabels)){
 const w=textWidth(label)+28,h=32;
 const border=`<path d="M4 0H${w-4}V2H${w-2}V4H${w}V${h-4}H${w-2}V${h-2}H${w-4}V${h}H4V${h-2}H2V${h-4}H0V4H2V2H4Z" fill="${bg}"/><path d="M4 1H${w-4}M4 ${h-1}H${w-4}M1 4V${h-4}M${w-1} 4V${h-4}" stroke="${edge}" stroke-width="2"/>`;
 write('badge-'+id,svg(w,h,label,border+pixels(label,14,9)));
}
const headings={'about':'01 / ABOUT ME','stack':'02 / TECH STACK','experience':'03 / EXPERIENCE','milestones':'04 / MILESTONES','projects':'05 / PROJECTS','stats':'06 / GITHUB STATS'};
for(const [id,label] of Object.entries(headings)){
 const w=textWidth(label,3)+16;
 write('heading-'+id,svg(w,29,label,`<rect width="${w}" height="29" fill="${bg}"/>`+pixels(label,8,4,3)));
}
const projects={
'tinyswords':['TINY SWORDS:','KINGDOMS'],
'open-air':['OPEN_AIR'],
'market-mate':['MARKET MATE'],
'threat-exchange':['THREATEXCHANGE'],
'office-tweaks':['OFFICE_TWEAKS'],
'vulnerability':['VULNERABILITY','CATALOG'],
'parser':['THE_PARSER_'],
'wheel':['WHEEL OF FORTUNE']
};
for(const [id,labels] of Object.entries(projects)){
 const w=Math.max(...labels.map(l=>textWidth(l)))+12,h=labels.length*20+8;
 write('project-'+id,svg(w,h,labels.join(' '),`<rect width="${w}" height="${h}" fill="${bg}"/>`+labels.map((l,i)=>pixels(l,6,6+i*20)).join('')));
}
// Animated SVGs use native SMIL so they also play when embedded in GitHub README images.
const reducedMotion = '<style>.still{display:none}@media(prefers-reduced-motion:reduce){.motion{display:none}.still{display:inline}}</style>';
function steppedReveal(label, start, finish, hold, erase, duration){
 const width=textWidth(label,3), count=label.length, times=[0,start], values=[0,0];
 for(let j=1;j<=count;j++){times.push(start+(finish-start)*j/count);values.push(j===count?width:j*18);}
 times.push(hold);values.push(width);
 if(erase!==null){
  for(let j=1;j<=count;j++){times.push(hold+(erase-hold)*j/count);values.push(Math.max(0,(count-j)*18));}
 }
 times.push(1);values.push(erase===null?width:0);
 return {width, values:values.join(';'), times:times.map(t=>Number(t.toFixed(6))).join(';'), duration};
}
const statusLines=['C++ / C# / PYTHON','UNITY / UNREAL ENGINE / GODOT','TOOLS / CHATBOTS / AUTOMATION'];
const statusGroups=statusLines.map((label,i)=>{
 const x=(854-textWidth(label,3))/2, begin=i*6+'s', timing=steppedReveal(label,.02,.115,.265,.31,18);
 return `<defs><clipPath id="reveal-${i}"><rect x="${x}" y="0" width="0" height="66"><animate attributeName="width" values="${timing.values}" keyTimes="${timing.times}" calcMode="discrete" dur="18s" begin="${begin}" repeatCount="indefinite"/></rect></clipPath></defs>
 <g class="motion" opacity="0">
 <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;.025;.29;.325;1" dur="18s" begin="${begin}" repeatCount="indefinite"/>
 <animateTransform attributeName="transform" type="translate" values="0 8;0 0;0 0;0 -10;0 -10" keyTimes="0;.035;.29;.325;1" calcMode="spline" keySplines=".22 .61 .36 1;0 0 1 1;.55 0 .8 .45;0 0 1 1" dur="18s" begin="${begin}" repeatCount="indefinite"/>
 <g clip-path="url(#reveal-${i})">${pixels(label,x,24,3)}</g>
 <g><rect x="${x+6}" y="45" width="12" height="3" fill="${ink}"><animate attributeName="x" values="${timing.values.split(';').map(w=>x+Number(w)+6).join(';')}" keyTimes="${timing.times}" calcMode="discrete" dur="18s" begin="${begin}" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0;1" keyTimes="0;.5;1" calcMode="discrete" dur=".8s" repeatCount="indefinite"/></rect></g>
 </g>`;
}).join('');
const track='<path d="M367 63h120" stroke="#3c3c3b" stroke-width="2"/>';
const markers=statusLines.map((_,i)=>`<rect x="${389+i*32}" y="59" width="12" height="8" fill="${edge}"/><rect class="motion" x="${389+i*32}" y="59" width="12" height="8" fill="${ink}" opacity="0"><animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;.02;.3;.333333;1" dur="18s" begin="${i*6}s" repeatCount="indefinite"/></rect>`).join('');
write('status-animated',svg(854,78,'C++, C#, Python / Unity, Unreal Engine, Godot / Tools, chatbots and automation',
 `<rect width="854" height="78" fill="${bg}"/>${reducedMotion}${statusGroups}<g class="still">${pixels(statusLines[0],(854-textWidth(statusLines[0],3))/2,24,3)}</g>${track}${markers}`));

// A seamless, stepped wave: the geometry repeats every 432 px.
function pixelWave(y, amplitude, color, opacity, duration, reverse=false){
 const period=432, steps=54, width=1296;
 let d='M0 34';
 for(let x=0;x<=width;x+=8){
  const h=y+Math.round(Math.sin(x/period*Math.PI*2)*amplitude/4)*4;
  d+=`H${x}V${h}`;
 }
 d+=`H${width}V34Z`;
 const values=Array.from({length:steps+1},(_,i)=>`${reverse?-period+i*8:-i*8} 0`).join(';');
 return `<g class="motion" fill="${color}" opacity="${opacity}"><path d="${d}"/><animateTransform attributeName="transform" type="translate" values="${values}" calcMode="discrete" dur="${duration}s" repeatCount="indefinite"/></g>`;
}
const footerText=['FROM AN IDEA TO A WORKING TOOL','OR A PLAYABLE GAME.'];
const footerLines=footerText.map((label,i)=>{
 const w=textWidth(label,2),x=(854-w)/2,y=52+i*24;
 const times=[0,.04+i*.12], widths=[0,0];
 for(let j=1;j<=label.length;j++){times.push(.04+i*.12+j/label.length*.18);widths.push(j===label.length?w:j*12);}
 times.push(1);widths.push(w);
 return `<defs><clipPath id="footer-reveal-${i}"><rect x="${x}" y="${y}" width="0" height="14"><animate attributeName="width" values="${widths.join(';')}" keyTimes="${times.map(t=>Number(t.toFixed(6))).join(';')}" calcMode="discrete" dur="9s" repeatCount="indefinite"/></rect></clipPath></defs><g clip-path="url(#footer-reveal-${i})">${pixels(label,x,y,2)}</g>`;
}).join('');
const sparks=Array.from({length:8},(_,i)=>{
 const x=i<4?50+i*24:728+(i-4)*24;
 return `<rect class="motion" x="${x}" y="105" width="4" height="4" fill="${ink}" opacity="0"><animate attributeName="y" values="105;39" dur="4s" begin="${-(i*.5)}s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;.65;.65;0" keyTimes="0;.2;.6;1" dur="4s" begin="${-(i*.5)}s" repeatCount="indefinite"/></rect>`;
}).join('');
const staticFooter=footerText.map((l,i)=>pixels(l,(854-textWidth(l,2))/2,52+i*24,2)).join('');
write('footer-animated',svg(854,118,'From an idea to a working tool or a playable game.',
 `<rect width="854" height="118" fill="${bg}"/>${reducedMotion}
 ${pixelWave(13,8,edge,.5,8)}${pixelWave(21,8,ink,.85,6,true)}
 <g class="motion" opacity="0"><animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;.07;.84;.97;1" dur="9s" repeatCount="indefinite"/>${footerLines}</g>
 <g class="still"><path d="M0 24H854" stroke="${edge}" stroke-width="4"/>${staticFooter}</g>
 ${sparks}<path d="M344 106h166" stroke="#3c3c3b" stroke-width="2"/>
 <rect class="motion" x="344" y="104" width="12" height="4" fill="${ink}"><animate attributeName="x" values="344;498;344" keyTimes="0;.5;1" dur="6s" repeatCount="indefinite"/></rect>`));
fs.writeFileSync(path.join(root,'pixel-ui-manifest.json'),JSON.stringify(manifest));
console.log(JSON.stringify({assets:Object.keys(manifest).length,bytes:Object.values(manifest).reduce((n,s)=>n+Buffer.byteLength(s),0)}));

