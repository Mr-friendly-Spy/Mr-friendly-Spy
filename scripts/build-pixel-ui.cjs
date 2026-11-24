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
const statusLines=['C++ / C# / PYTHON','UNITY / UNREAL ENGINE / GODOT','TOOLS / CHATBOTS / AUTOMATION'];
const statusGroups=statusLines.map((l,i)=>`<g class="line line-${i}" opacity="${i===0?1:0}">${pixels(l,(854-textWidth(l,3))/2,15,3)}<animate attributeName="opacity" values="${i===0?'1;0;0;1':i===1?'0;1;0;0':'0;0;1;0'}" keyTimes="0;.333333;.666667;1" calcMode="discrete" dur="9s" repeatCount="indefinite"/></g>`).join('');
write('status',svg(854,54,'C++, C#, Python / Unity, Unreal Engine, Godot / Tools, chatbots and automation',`<rect width="854" height="54" fill="${bg}"/><style>@media(prefers-reduced-motion:reduce){.line{display:none}.line-0{display:inline;opacity:1!important}}</style>${statusGroups}`));
const dots=Array.from({length:107},(_,i)=>`<rect x="${i*8}" y="${i%2?4:0}" width="4" height="4" fill="${ink}" opacity=".6"/>`).join('');
const footerText=['FROM AN IDEA TO A WORKING TOOL','OR A PLAYABLE GAME.'];
write('footer',svg(854,82,'From an idea to a working tool or a playable game.',`<rect width="854" height="82" fill="${bg}"/>${dots}`+footerText.map((l,i)=>pixels(l,(854-textWidth(l,2))/2,30+i*24,2)).join('')));
fs.writeFileSync(path.join(root,'pixel-ui-manifest.json'),JSON.stringify(manifest));
console.log(JSON.stringify({assets:Object.keys(manifest).length,bytes:Object.values(manifest).reduce((n,s)=>n+Buffer.byteLength(s),0)}));

