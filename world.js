// Original, hand-built garden assets. Coordinates use Y-up and the main avenue runs north/south.
export function createWorld(THREE, scene) {
  const mat = (color, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.9, ...extra });
  const colors = {
    grass: mat('#879a72'), grassDark: mat('#657d5e'), stone: mat('#a9aba0'), stoneLight: mat('#d6d6c9'),
    path: mat('#d8dbd2'), grout: mat('#a8aca6'), red: mat('#893d35'), darkRed: mat('#592c28'),
    cream: mat('#ded7c4'), wood: mat('#664a35'), darkWood: mat('#38332d'), roof: mat('#35494e'),
    roofLight: mat('#596c6d'), gold: mat('#c5a165', { metalness: 0.45, roughness: 0.55 }),
    water: mat('#76b5a7', { transparent: true, opacity: 0.88, roughness: 0.28, metalness: 0.1 }),
    mountain: mat('#a6b7a1'), mountainFar: mat('#bac8b2'),
    leaf: mat('#58785a'), leaf2: mat('#789371'), leaf3: mat('#a2ad82'), bark: mat('#6c5848'),
    peach: mat('#dda7a1'), dark: mat('#35473d'), paper: mat('#eee4cb'), orange: mat('#d58c67'),
    skin: mat('#dcad7e'), ink: mat('#322c29'), jade: mat('#547b69'), blue: mat('#425b70'),
  };
  // A subtle stone grain prevents large paved areas from appearing flat.
  const stoneCanvas = document.createElement('canvas'); stoneCanvas.width = 256; stoneCanvas.height = 256;
  const stoneContext = stoneCanvas.getContext('2d'); stoneContext.fillStyle = '#f4f3e9'; stoneContext.fillRect(0,0,256,256);
  let grainSeed = 7123;
  const grainRandom = () => { grainSeed = (grainSeed * 16807) % 2147483647; return grainSeed / 2147483647; };
  for (let i=0; i<1800; i++) {
    const shade = Math.round(150 + grainRandom()*70);
    stoneContext.fillStyle = `rgba(${shade},${shade},${shade-8},${0.018+grainRandom()*0.05})`;
    const x=grainRandom()*256, y=grainRandom()*256;
    stoneContext.fillRect(x,y,0.5+grainRandom()*2,0.5+grainRandom()*1.2);
  }
  const stoneTexture = new THREE.CanvasTexture(stoneCanvas); stoneTexture.colorSpace=THREE.SRGBColorSpace;
  stoneTexture.wrapS=stoneTexture.wrapT=THREE.RepeatWrapping; stoneTexture.repeat.set(3,3);
  colors.path.map=stoneTexture; colors.stoneLight.map=stoneTexture;
  // Shared neutral paving map keeps stone courses visible under varied lighting.
  const pavingCanvas = document.createElement('canvas'); pavingCanvas.width=512; pavingCanvas.height=512;
  const pavingContext = pavingCanvas.getContext('2d');
  pavingContext.fillStyle='#c4c9c3'; pavingContext.fillRect(0,0,512,512);
  for (let row=0;row<8;row++) for (let col=-1;col<8;col++) {
    const x=col*64+(row%2)*32, y=row*64;
    const shade=Math.round(215+grainRandom()*19);
    pavingContext.fillStyle=`rgb(${shade},${Math.min(255,shade+2)},${shade-2})`;
    pavingContext.fillRect(x+1,y+1,62,62);
    for (let speck=0;speck<12;speck++) {
      const v=Math.round(140+grainRandom()*55);
      pavingContext.fillStyle=`rgba(${v},${v},${v},0.045)`;
      pavingContext.fillRect(x+4+grainRandom()*56,y+4+grainRandom()*56,1+grainRandom()*3,1+grainRandom());
    }
  }
  const avenueTexture=new THREE.CanvasTexture(pavingCanvas); avenueTexture.colorSpace=THREE.SRGBColorSpace;
  avenueTexture.wrapS=avenueTexture.wrapT=THREE.RepeatWrapping; avenueTexture.repeat.set(1,4.76);
  avenueTexture.anisotropy=4;
  const avenueMaterial=mat('#f4f3ed',{map:avenueTexture});
  const crossTexture=avenueTexture.clone(); crossTexture.repeat.set(3.2,1); crossTexture.needsUpdate=true;
  const crossMaterial=mat('#f4f3ed',{map:crossTexture});
  // Fine lawn variation is procedural, so the foreground does not read as a flat plane.
  const lawnCanvas=document.createElement('canvas'); lawnCanvas.width=256; lawnCanvas.height=256;
  const lawnContext=lawnCanvas.getContext('2d'); lawnContext.fillStyle='#e9ede1'; lawnContext.fillRect(0,0,256,256);
  for(let i=0;i<3200;i++) {
    const shade=Math.round(118+grainRandom()*95);
    lawnContext.fillStyle=`rgba(${shade},${Math.min(255,shade+13)},${shade-6},${0.025+grainRandom()*0.055})`;
    const x=grainRandom()*256,y=grainRandom()*256;
    lawnContext.fillRect(x,y,0.7+grainRandom()*2.2,1+grainRandom()*3.5);
  }
  const lawnTexture=new THREE.CanvasTexture(lawnCanvas); lawnTexture.colorSpace=THREE.SRGBColorSpace;
  lawnTexture.wrapS=lawnTexture.wrapT=THREE.RepeatWrapping; lawnTexture.repeat.set(18,18);
  lawnTexture.anisotropy=4; colors.grass.map=lawnTexture;
  const box = (parent, w, h, d, material, x = 0, y = 0, z = 0, opts = {}) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    mesh.position.set(x, y, z); mesh.castShadow = opts.shadow !== false; mesh.receiveShadow = true; parent.add(mesh); return mesh;
  };
  const cylinder = (parent, rt, rb, h, material, x = 0, y = 0, z = 0, segments = 12) => {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, segments), material);
    mesh.position.set(x, y, z); mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh); return mesh;
  };
  const sphere = (parent, r, material, x, y, z, sx = 1, sy = 1, sz = 1) => {
    const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 1), material);
    mesh.position.set(x, y, z); mesh.scale.set(sx, sy, sz); mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh); return mesh;
  };
  const label = (text, width = 512) => {
    const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = 160;
    const c = canvas.getContext('2d'); c.fillStyle = '#34483d'; c.fillRect(0, 0, width, 160);
    c.strokeStyle = '#c7ab73'; c.lineWidth = 5; c.strokeRect(8, 8, width - 16, 144);
    c.fillStyle = '#e2c996'; c.font = 'bold 72px serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(text, width / 2, 82);
    const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace;
    return new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
  };
  const sign = (parent, text, x, y, z, w = 2.5) => {
    const plaque = box(parent, w, 0.75, 0.10, label(text), x, y, z);
    return plaque;
  };
  // Painted architectural details are generated for this garden and shared by its halls.
  function hangingPanel() {
    const canvas = document.createElement('canvas'); canvas.width = 1024; canvas.height = 512;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, '#183f39'); gradient.addColorStop(0.52, '#406250'); gradient.addColorStop(1, '#73573e');
    ctx.fillStyle = gradient; ctx.fillRect(0, 0, 1024, 512);
    ctx.strokeStyle = '#d6bc7e'; ctx.lineWidth = 8; ctx.strokeRect(15, 15, 994, 482);
    ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(230,208,156,.54)'; ctx.strokeRect(28, 28, 968, 456);
    const cloud = (x,y,s) => {
      ctx.beginPath(); ctx.arc(x,y,s,Math.PI*.95,Math.PI*1.9); ctx.arc(x+s*.9,y-s*.25,s*.65,Math.PI*1.05,Math.PI*1.95); ctx.arc(x+s*1.5,y,s*.48,Math.PI*1.05,Math.PI*1.9); ctx.stroke();
    };
    ctx.strokeStyle = 'rgba(221,196,135,.35)'; ctx.lineWidth = 4;
    for (let row=0; row<5; row++) for (let col=0; col<7; col++) cloud(18+col*165+(row%2)*75, 70+row*95, 26);
    ctx.strokeStyle = 'rgba(224,207,154,.62)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(512,256,184,0,Math.PI*2); ctx.stroke();
    ctx.strokeStyle = 'rgba(224,207,154,.3)'; ctx.beginPath(); ctx.arc(512,256,194,0,Math.PI*2); ctx.stroke();
    const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace;
    return new THREE.MeshStandardMaterial({ map:texture, roughness:1, side:THREE.DoubleSide });
  }
  const tapestry = hangingPanel();
  // Small, original painted backdrops give each place a distinct atmosphere.
  // One shared texture per theme avoids additional image downloads and stays readable at a distance.
  function themedPanel(theme) {
    const palettes={fortune:['#594d3a','#9f7951'],moon:['#293f53','#778896'],breeze:['#35584d','#8ca88c'],joy:['#704640','#c48e65'],cloud:['#37495a','#8798a3']};
    const [top,bottom]=palettes[theme];
    const canvas=document.createElement('canvas'); canvas.width=512; canvas.height=256;
    const ctx=canvas.getContext('2d'), gradient=ctx.createLinearGradient(0,0,0,256);
    gradient.addColorStop(0,top); gradient.addColorStop(1,bottom); ctx.fillStyle=gradient; ctx.fillRect(0,0,512,256);
    ctx.strokeStyle='rgba(238,218,166,.78)'; ctx.lineWidth=3; ctx.strokeRect(8,8,496,240);
    ctx.strokeStyle='rgba(234,218,176,.48)'; ctx.lineWidth=1.5; ctx.strokeRect(16,16,480,224);
    ctx.strokeStyle='rgba(242,224,181,.55)'; ctx.fillStyle='rgba(242,224,181,.35)';
    if(theme==='moon'||theme==='cloud') {
      ctx.beginPath(); ctx.arc(256,105,61,0,Math.PI*2); ctx.stroke();
      for(let i=0;i<25;i++) { const x=30+(i*97)%455, y=27+(i*53)%155; ctx.beginPath(); ctx.arc(x,y,i%5===0?2.2:1.1,0,Math.PI*2); ctx.fill(); }
      for(let row=0;row<3;row++) { ctx.beginPath(); for(let x=20;x<=492;x+=8) { const y=181+row*17+Math.sin(x/35+row)*6; if(x===20)ctx.moveTo(x,y);else ctx.lineTo(x,y); } ctx.stroke(); }
    } else if(theme==='breeze') {
      for(let i=0;i<9;i++) { const x=45+i*53; ctx.beginPath(); ctx.moveTo(x,237);ctx.quadraticCurveTo(x-20,139,x+9,51);ctx.stroke(); for(let j=0;j<4;j++){const y=80+j*35;ctx.beginPath();ctx.moveTo(x,y);ctx.quadraticCurveTo(x+(j%2?30:-30),y-19,x+(j%2?39:-39),y-9);ctx.stroke();} }
    } else if(theme==='joy') {
      for(let i=0;i<12;i++) { const x=38+(i%6)*87,y=55+Math.floor(i/6)*128; for(let j=0;j<5;j++){const a=j*Math.PI*2/5;ctx.beginPath();ctx.ellipse(x+Math.cos(a)*10,y+Math.sin(a)*10,5,9,a,0,Math.PI*2);ctx.fill();} }
    } else {
      for(let row=0;row<3;row++) for(let col=0;col<7;col++) {const x=35+col*74+(row%2)*25,y=50+row*75;ctx.beginPath();ctx.arc(x,y,16,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.moveTo(x-7,y);ctx.lineTo(x+7,y);ctx.moveTo(x,y-7);ctx.lineTo(x,y+7);ctx.stroke();}
    }
    const texture=new THREE.CanvasTexture(canvas); texture.colorSpace=THREE.SRGBColorSpace;
    return new THREE.MeshStandardMaterial({map:texture,roughness:1,side:THREE.DoubleSide});
  }
  const themePanels=Object.fromEntries(['fortune','moon','breeze','joy','cloud'].map(theme=>[theme,themedPanel(theme)]));
  const mainTapestry = tapestry.clone();
  // The generated artwork is optional at runtime, so a painted fallback remains in place.
  new THREE.TextureLoader().load('./assets/shrine-mural.jpg', texture => {
    texture.colorSpace = THREE.SRGBColorSpace;
    mainTapestry.map = texture;
    mainTapestry.needsUpdate = true;
  }, undefined, () => {});
  // Layered ridges provide a fallback if the distant panorama is unavailable.
  const distantRidges = [];
  for (let i = 0; i < 11; i++) {
    const ridge = new THREE.Mesh(new THREE.ConeGeometry(11 + (i % 4) * 3, 19 + (i % 3) * 3, 5), i % 2 ? colors.mountain : colors.mountainFar);
    ridge.position.set(-60 + i * 12, 8, -61 - (i % 3) * 4); ridge.rotation.y = i * 0.43; ridge.receiveShadow = true; scene.add(ridge); distantRidges.push(ridge);
  }
  // Ground and central stone pavement.
  box(scene, 100, 0.4, 100, colors.grass, 0, -0.25, 0, { shadow: false });
  box(scene, 13, 0.08, 62, avenueMaterial, 0, 0.005, 0, { shadow: false });
  box(scene, 48, 0.08, 15, crossMaterial, 0, 0.01, -1, { shadow: false });
  // Low inlaid paving marks the ceremonial avenue without adding obstacles.
  // One instanced mesh keeps the repeating stone details inexpensive.
  const avenueInlay=new THREE.InstancedMesh(new THREE.BoxGeometry(.3,.012,1.1),colors.stone,48);
  avenueInlay.name='avenue-inlay';const inlayTransform=new THREE.Object3D();let inlayIndex=0;
  for(const side of [-1,1]) for(let i=0;i<24;i++) {
    inlayTransform.position.set(side*5.95,.056,-29.4+i*2.55);
    inlayTransform.rotation.set(0,0,0);inlayTransform.scale.set(1,1,1);inlayTransform.updateMatrix();
    avenueInlay.setMatrixAt(inlayIndex++,inlayTransform.matrix);
  }
  avenueInlay.instanceMatrix.needsUpdate=true;avenueInlay.receiveShadow=true;scene.add(avenueInlay);
  // A quiet compass/flower medallion gives the entrance its own identity.
  const inlayInk=new THREE.MeshBasicMaterial({color:'#9ca89b',transparent:true,opacity:.56,side:THREE.DoubleSide,depthWrite:false});
  const entranceMedallion=new THREE.Group();entranceMedallion.name='entrance-medallion';entranceMedallion.position.set(0,.057,21.0);scene.add(entranceMedallion);
  for(const [inner,outer] of [[1.26,1.31],[.93,.96]]) {
    const ring=new THREE.Mesh(new THREE.RingGeometry(inner,outer,48),inlayInk);ring.rotation.x=-Math.PI/2;entranceMedallion.add(ring);
  }
  const petalsInlay=new THREE.InstancedMesh(new THREE.BoxGeometry(.09,.008,.47),inlayInk,12);
  const petalInlayTransform=new THREE.Object3D();
  for(let i=0;i<12;i++) {const a=i*Math.PI/6;petalInlayTransform.position.set(Math.sin(a)*1.08,.002,Math.cos(a)*1.08);petalInlayTransform.rotation.set(0,a,0);petalInlayTransform.updateMatrix();petalsInlay.setMatrixAt(i,petalInlayTransform.matrix);}
  petalsInlay.instanceMatrix.needsUpdate=true;entranceMedallion.add(petalsInlay);
  // Each roof is independently addressable so the camera can reveal the hall interior.
  const roofGroups = [];
  const interiorSigns = [];
  function roof(parent, width, depth, y) {
    const assembly = new THREE.Group(); parent.add(assembly); roofGroups.push(assembly);
    parent = assembly;
    const overhang = 0.75, halfD = depth / 2 + overhang, rise = 1.35;
    const angle = Math.atan2(rise, halfD);
    for (const side of [-1, 1]) {
      const panel = box(parent, width + 1.6, 0.24, Math.hypot(halfD, rise), colors.roof, 0, y + rise / 2, side * halfD / 2);
      panel.rotation.x = side * angle;
      const eave = box(parent, width + 2.1, 0.24, 0.23, colors.darkWood, 0, y, side * halfD);
      // A curved upturned edge and layered rafter tips give the eaves a distinct silhouette.
      const span = width / 2 + 1.12;
      const edgeCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-span, y + 0.52, side * (halfD + 0.15)),
        new THREE.Vector3(-span * 0.75, y + 0.12, side * halfD),
        new THREE.Vector3(0, y - 0.04, side * halfD),
        new THREE.Vector3(span * 0.75, y + 0.12, side * halfD),
        new THREE.Vector3(span, y + 0.52, side * (halfD + 0.15)),
      ]);
      const curvedEave = new THREE.Mesh(new THREE.TubeGeometry(edgeCurve, 32, 0.1, 7, false), colors.darkWood);
      curvedEave.castShadow = true; parent.add(curvedEave);
      const tileXs=[];
      for (let x=-width/2-0.4; x<=width/2+0.41; x+=0.5) tileXs.push(x);
      const tiles=new THREE.InstancedMesh(new THREE.BoxGeometry(0.055,0.06,Math.hypot(halfD,rise)),colors.roofLight,tileXs.length);
      const ends=new THREE.InstancedMesh(new THREE.CylinderGeometry(0.085,0.085,0.075,8),colors.roofLight,tileXs.length);
      const instance=new THREE.Object3D();
      tileXs.forEach((x,index) => {
        instance.position.set(x,y+rise/2+0.15,side*halfD/2); instance.rotation.set(side*angle,0,0); instance.updateMatrix(); tiles.setMatrixAt(index,instance.matrix);
        instance.position.set(x,y-0.08,side*(halfD+0.08)); instance.rotation.set(Math.PI/2,0,0); instance.updateMatrix(); ends.setMatrixAt(index,instance.matrix);
      });
      tiles.instanceMatrix.needsUpdate=true; ends.instanceMatrix.needsUpdate=true;
      tiles.castShadow=true; tiles.receiveShadow=true; ends.castShadow=true; parent.add(tiles,ends);
      for (const x of [-width / 2 - 0.92, width / 2 + 0.92]) sphere(parent, 0.16, colors.gold, x, y + 0.12, side * halfD, 1.4, 1, 1);
    }
    box(parent, width + 1.2, 0.24, 0.32, colors.darkWood, 0, y + rise + 0.1, 0);
    sphere(parent, 0.17, colors.gold, 0, y + rise + 0.34, 0, 1.2, 1.2, 1.2);
    for (const side of [-1,1]) {
      const ridge = new THREE.Mesh(new THREE.TorusGeometry(0.31, 0.055, 8, 20, Math.PI * 1.55), colors.gold);
      ridge.position.set(side * (width / 2 + 0.38), y + rise + 0.36, 0);
      ridge.rotation.y = Math.PI / 2; ridge.rotation.z = side * 0.45; parent.add(ridge);
    }
    if (width > 10 && depth > 3) {
      // The main hall has a smaller raised roof, kept in the same hideable assembly.
      const upperWidth = width * 0.56, upperDepth = depth * 0.48, upperY = y + rise + 0.17, upperRise = 0.85;
      for (const side of [-1, 1]) {
        const upperLength = Math.hypot(upperDepth / 2 + 0.45, upperRise);
        const panel = box(parent, upperWidth + 0.9, 0.18, upperLength, colors.roof, 0, upperY + upperRise / 2, side * (upperDepth / 2 + 0.45) / 2);
        panel.rotation.x = side * Math.atan2(upperRise, upperDepth / 2 + 0.45);
        for (let x=-upperWidth/2; x<=upperWidth/2; x+=0.55) {
          const tile=box(parent,0.05,0.05,upperLength,colors.roofLight,x,upperY+upperRise/2+0.11,side*(upperDepth/2+0.45)/2);
          tile.rotation.x=panel.rotation.x;
        }
      }
      box(parent, upperWidth + 1, 0.15, 0.24, colors.gold, 0, upperY + upperRise, 0);
      sphere(parent, 0.22, colors.gold, 0, upperY + upperRise + 0.25, 0);
    }
  }
  function building(x, z, width, depth, name, opts = {}) {
    const g = new THREE.Group(); g.position.set(x, 0, z); scene.add(g);
    box(g, width + 1.3, 0.35, depth + 1.3, colors.stone, 0, 0.18, 0);
    box(g, width + 0.8, 0.12, depth + 0.8, colors.stoneLight, 0, 0.42, 0);
    if (!opts.open) {
      // Side and rear walls frame a real, open interior facing the approach.
      box(g, width - 0.4, 3.6, 0.25, colors.cream, 0, 2.25, -depth / 2 + 0.25);
      for (const side of [-1, 1]) box(g, 0.25, 3.6, depth - 0.5, colors.cream, side * (width / 2 - 0.25), 2.25, 0);
      box(g, width - 0.7, 0.08, depth - 0.7, colors.path, 0, 0.51, 0);
    }
    const colXs = [-width / 2 + 0.35, width / 2 - 0.35];
    for (const px of colXs) for (const pz of [-depth / 2 + 0.25, depth / 2 - 0.25]) {
      cylinder(g, 0.25, 0.3, 0.34, colors.stoneLight, px, 0.59, pz);
      cylinder(g, 0.19, 0.21, 3.65, colors.red, px, 2.55, pz);
      cylinder(g, 0.28, 0.23, 0.18, colors.gold, px, 4.35, pz);
      // Layered stone plinth and restrained metal bands define the column bases.
      cylinder(g,0.34,0.38,0.16,colors.stone,px,0.44,pz,16);
      cylinder(g,0.24,0.24,0.055,colors.darkRed,px,0.86,pz,16);
      cylinder(g,0.22,0.22,0.045,colors.gold,px,1.02,pz,16);
      cylinder(g,0.22,0.22,0.045,colors.gold,px,4.1,pz,16);
    }
    for (const edge of [-1, 1]) {
      box(g, width + 0.35, 0.35, 0.35, colors.darkRed, 0, 4.35, edge * depth / 2);
      box(g, 0.35, 0.35, depth, colors.darkRed, edge * width / 2, 4.35, 0);
      box(g, width + 0.6, 0.15, 0.18, colors.gold, 0, 4.56, edge * depth / 2);
    }
    // A sequence of brackets under the eaves suggests the weight of traditional timber framing.
    const bracketCount=Math.max(3,Math.floor(width/1.4));
    for (const edge of [-1,1]) {
      const brackets=new THREE.InstancedMesh(new THREE.BoxGeometry(0.12,0.18,0.72),colors.darkRed,bracketCount);
      const caps=new THREE.InstancedMesh(new THREE.BoxGeometry(0.5,0.1,0.22),colors.gold,bracketCount);
      const mounting=new THREE.Object3D();
      for (let i=0;i<bracketCount;i++) {
        const bx=-width/2+0.65+(width-1.3)*(i/(bracketCount-1));
        mounting.position.set(bx,4.12,edge*(depth/2+0.09)); mounting.rotation.set(edge*0.21,0,0); mounting.updateMatrix(); brackets.setMatrixAt(i,mounting.matrix);
        mounting.position.set(bx,4.02,edge*(depth/2+0.11)); mounting.rotation.set(0,0,0); mounting.updateMatrix(); caps.setMatrixAt(i,mounting.matrix);
      }
      brackets.instanceMatrix.needsUpdate=true; caps.instanceMatrix.needsUpdate=true;
      brackets.castShadow=true; caps.castShadow=true; g.add(brackets,caps);
    }
    roof(g, width, depth, 4.7);
    const plaque = sign(g, name, 0, 4.05, depth / 2 + 0.17, Math.min(3.2, width - 0.6));
    interiorSigns.push({mesh: plaque, x, z, radius: Math.max(width, depth) * 0.55});
    if (!opts.open) {
      // Door frames, open lattice shutters and carved crossbars.
      for (const side of [-1, 1]) {
        const wx = side * (width / 2 - width * 0.14);
        box(g, width * 0.22, 2.8, 0.13, colors.darkWood, wx, 2.02, depth / 2 + 0.02);
        for (let n = -2; n <= 2; n++) box(g, 0.045, 2.62, 0.14, colors.gold, wx + n * width * 0.036, 2.02, depth / 2 + 0.1);
        for (let n = -2; n <= 2; n++) box(g, width * 0.21, 0.045, 0.14, colors.gold, wx, 2.02 + n * 0.45, depth / 2 + 0.1);
        for (let n=-2;n<=2;n++) {
          const ornament=box(g,0.34,0.035,0.16,colors.wood,wx,2.02+n*0.45,depth/2+0.19);
          ornament.rotation.z=Math.PI/4;
        }
      }
      box(g, width * 0.50, 0.12, 0.15, colors.gold, 0, 4.1, depth / 2 + 0.1);
      // Vertical hanging couplets frame the open doors.
      for (const side of [-1,1]) {
        const couplet = document.createElement('canvas'); couplet.width=128; couplet.height=512;
        const c=couplet.getContext('2d'); c.fillStyle='#66372f'; c.fillRect(0,0,128,512);
        c.strokeStyle='#b7965b'; c.lineWidth=4; c.strokeRect(5,5,118,502);
        c.fillStyle='#e7d0a0'; c.font='bold 49px serif'; c.textAlign='center';
        const text=side<0?'山静心自远':'风清福常来';
        [...text].forEach((char,i)=>c.fillText(char,64,85+i*75));
        const tex=new THREE.CanvasTexture(couplet); tex.colorSpace=THREE.SRGBColorSpace;
        const material=new THREE.MeshBasicMaterial({map:tex,side:THREE.DoubleSide});
        const mesh=new THREE.Mesh(new THREE.PlaneGeometry(0.53,2.25),material);
        mesh.position.set(side*(width/2-0.74),2.06,depth/2+0.13); g.add(mesh);
      }
    }
    box(g, width * 0.52, 0.18, 1.0, colors.stoneLight, 0, 0.13, depth / 2 + 1.1);
    box(g, width * 0.57, 0.13, 0.7, colors.stone, 0, 0.07, depth / 2 + 1.9);
    return g;
  }
  // Entry gate, arranged to frame the main hall from the starting view.
  const gate = new THREE.Group(); gate.position.set(0, 0, 16); scene.add(gate);
  for (const x of [-5.5, 5.5]) {
    cylinder(gate, 0.4, 0.45, 0.6, colors.stone, x, 0.3, 0);
    cylinder(gate, 0.29, 0.34, 4.5, colors.red, x, 2.85, 0);
    cylinder(gate, 0.4, 0.33, 0.25, colors.gold, x, 5.0, 0);
  }
  const gateFront = new THREE.Group(); gate.add(gateFront);
  box(gateFront, 11.7, 0.55, 0.8, colors.darkRed, 0, 5.0, 0); roof(gate, 11.7, 1.0, 5.35);
  sign(gateFront, '山有愿', 0, 4.55, 0.52, 4.5);
  for (const x of [-4.45, 4.45]) {
    sphere(gate, 0.55, colors.red, x, 3.9, 0.5, 0.9, 1.15, 0.9);
    cylinder(gate, 0.06, 0.06, 0.3, colors.gold, x, 3.19, 0.5, 8);
  }
  const mainHall = building(0, -19, 12, 7, '清和殿');
  // Painted banners are original procedural art shared by the entry and main hall.
  // Their gentle movement uses four transform updates and no per-frame allocations.
  const bannerCanvas=document.createElement('canvas');bannerCanvas.width=256;bannerCanvas.height=512;
  const bannerContext=bannerCanvas.getContext('2d');
  const bannerGradient=bannerContext.createLinearGradient(0,0,0,512);bannerGradient.addColorStop(0,'#73463c');bannerGradient.addColorStop(1,'#405a49');
  bannerContext.fillStyle=bannerGradient;bannerContext.fillRect(0,0,256,512);
  bannerContext.strokeStyle='#d7bd84';bannerContext.lineWidth=5;bannerContext.strokeRect(12,12,232,488);
  bannerContext.lineWidth=2;bannerContext.strokeRect(22,22,212,468);
  bannerContext.beginPath();bannerContext.arc(128,160,57,0,Math.PI*2);bannerContext.stroke();
  bannerContext.beginPath();bannerContext.moveTo(55,370);bannerContext.lineTo(103,292);bannerContext.lineTo(132,332);bannerContext.lineTo(169,266);bannerContext.lineTo(210,370);bannerContext.stroke();
  for(let i=0;i<4;i++){bannerContext.beginPath();bannerContext.moveTo(43,399+i*13);bannerContext.quadraticCurveTo(128,381+i*13,213,399+i*13);bannerContext.stroke();}
  const bannerTexture=new THREE.CanvasTexture(bannerCanvas);bannerTexture.colorSpace=THREE.SRGBColorSpace;
  const bannerMaterial=new THREE.MeshStandardMaterial({map:bannerTexture,roughness:1,side:THREE.DoubleSide});
  const bannerGeometry=new THREE.PlaneGeometry(.82,1.75),movingBanners=[];
  function addBanner(parent,x,top,z,scale=1) {
    const anchor=new THREE.Group();anchor.name='mountain-banner';anchor.position.set(x,top,z);anchor.scale.setScalar(scale);parent.add(anchor);
    const fabric=new THREE.Mesh(bannerGeometry,bannerMaterial);fabric.position.y=-.875;fabric.receiveShadow=true;anchor.add(fabric);
    box(anchor,.96,.075,.12,colors.gold,0,.025,0,{shadow:false});
    box(anchor,.78,.045,.06,colors.darkWood,0,-1.76,0,{shadow:false});
    const tassel=cylinder(anchor,.025,.025,.2,colors.gold,0,-1.88,0,6);tassel.castShadow=false;
    movingBanners.push(anchor);
  }
  for(const x of [-3.9,3.9])addBanner(gateFront,x,4.22,.53,.78);
  for(const x of [-4.45,4.45])addBanner(mainHall,x,4.0,3.68,.9);
  const readingHall=building(-15, -8, 8, 6, '听雨阁');
  const alchemyHall=building(15, -9, 8, 6, '丹香房');
  const westHall = building(-15, -22, 8, 6, '福缘殿');
  const eastHall = building(15, -22, 8, 6, '月华堂');
  building(-16, 9, 6, 5, '静心钟', { open: true });
  building(16, 10, 6, 5, '观云亭', { open: true });
  // A small original shrine installation gives the halls a destination inside.
  function altarInside(hall, accent = colors.gold, panel = tapestry, forward = 0, theme = 'peace') {
    // The smaller halls have shallower back walls, so move the entire installation forward.
    if (forward) { const installation = new THREE.Group(); installation.position.z = forward; hall.add(installation); hall = installation; }
    box(hall, 5.5, 0.18, 0.12, colors.darkWood, 0, 3.72, -2.92);
    box(hall, 5.4, 2.8, 0.08, panel, 0, 2.18, -2.94);
    const halo = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.06, 8, 32), accent);
    halo.position.set(0, 2.75, -2.78); hall.add(halo);
    // The seated figure is sculpted from robes, sleeves and a crowned face.
    cylinder(hall, 0.73, 0.96, 0.25, colors.gold, 0, 1.25, -2.35, 24);
    cylinder(hall, 0.83, 0.9, 0.18, colors.darkRed, 0, 1.4, -2.35, 24);
    cylinder(hall, 0.47, 0.82, 1.12, colors.red, 0, 1.98, -2.35, 20);
    const robeMaterial = theme==='fortune' ? colors.jade : theme==='moon' ? colors.peach : colors.blue;
    const robe = new THREE.Mesh(new THREE.ConeGeometry(0.72, 0.95, 20), robeMaterial);
    robe.position.set(0, 1.96, -2.01); robe.rotation.x = -0.09; robe.castShadow = true; hall.add(robe);
    const sash = box(hall, 0.12, 1.05, 0.07, colors.gold, -0.18, 2.04, -1.40);
    sash.rotation.z = -0.4;
    const face = new THREE.Mesh(new THREE.SphereGeometry(0.37, 20, 16), colors.skin);
    face.scale.set(0.9, 1.08, 0.84); face.position.set(0, 2.83, -2.18); face.castShadow = true; hall.add(face);
    sphere(hall, 0.11, colors.skin, 0, 2.78, -1.86, 0.55, 0.8, 0.9);
    for (const side of [-1,1]) {
      sphere(hall, 0.045, colors.ink, side*0.14, 2.91, -1.89, 1.2, 0.5, 0.45);
      const brow=box(hall,0.16,0.025,0.025,colors.ink,side*0.14,2.99,-1.89); brow.rotation.z=side*-0.12;
      sphere(hall,0.13,colors.skin,side*0.36,2.8,-2.17,0.45,0.8,0.55);
      const sleeve=sphere(hall,0.4,colors.red,side*0.57,2.08,-2.06,1.15,0.7,0.7); sleeve.rotation.z=side*0.35;
      sphere(hall,0.16,colors.skin,side*0.28,1.91,-1.75,1.2,0.55,0.8);
    }
    const beard = new THREE.Mesh(new THREE.ConeGeometry(0.20,0.53,12), colors.ink);
    beard.position.set(0,2.45,-1.93); beard.rotation.x=Math.PI; hall.add(beard);
    for (const side of [-1,1]) {
      const moustache=box(hall,0.23,0.055,0.035,colors.ink,side*0.11,2.68,-1.87); moustache.rotation.z=side*0.18;
    }
    cylinder(hall,0.4,0.34,0.25,colors.darkWood,0,3.25,-2.18,16);
    cylinder(hall,0.45,0.42,0.08,colors.gold,0,3.4,-2.18,16);
    for (let i=-2;i<=2;i++) {
      cylinder(hall,0.026,0.026,0.26,colors.gold,i*0.14,3.55,-2.16,6);
      sphere(hall,0.075,colors.gold,i*0.14,3.7,-2.16);
    }
    // Layered, radial petals form a three-dimensional lotus seat under the figure.
    // Instancing keeps the richer silhouette affordable when three halls are visible.
    const petalGeometry = new THREE.SphereGeometry(0.18, 9, 7);
    const lotusPetals = new THREE.InstancedMesh(petalGeometry, colors.gold, 18);
    const placement = new THREE.Object3D();
    for (let i=0;i<18;i++) {
      const theta=i*Math.PI*2/18;
      placement.position.set(Math.sin(theta)*0.78,1.41,-2.35+Math.cos(theta)*0.78);
      placement.rotation.set(0,-theta,0.23*Math.sin(theta));
      placement.scale.set(0.66,1.55,1.0); placement.updateMatrix(); lotusPetals.setMatrixAt(i,placement.matrix);
    }
    lotusPetals.instanceMatrix.needsUpdate=true; lotusPetals.castShadow=true; hall.add(lotusPetals);
    const lotusRim=new THREE.Mesh(new THREE.TorusGeometry(0.87,0.055,8,36),colors.gold);
    lotusRim.rotation.x=Math.PI/2;lotusRim.position.set(0,1.28,-2.35);hall.add(lotusRim);

    // A second fine halo and small rays give the figure a distinct focal point.
    const innerHalo=new THREE.Mesh(new THREE.TorusGeometry(0.92,0.025,8,48),accent);
    innerHalo.position.set(0,2.75,-2.72); hall.add(innerHalo);
    const rays=new THREE.InstancedMesh(new THREE.SphereGeometry(0.055,8,6),accent,16);
    for(let i=0;i<16;i++) {
      const theta=i*Math.PI*2/16;
      placement.position.set(Math.cos(theta)*1.12,2.75+Math.sin(theta)*1.12,-2.7);
      placement.rotation.set(0,0,theta);placement.scale.set(1.9,0.72,0.6);placement.updateMatrix();rays.setMatrixAt(i,placement.matrix);
    }
    rays.instanceMatrix.needsUpdate=true;hall.add(rays);

    // Layered collar, shoulders and robe edging add readable volume from the doorway.
    const collarLeft=box(hall,0.09,0.73,0.075,colors.gold,-0.22,2.29,-1.65);collarLeft.rotation.z=-0.62;
    const collarRight=box(hall,0.09,0.73,0.075,colors.gold,0.22,2.29,-1.65);collarRight.rotation.z=0.62;
    const robeHem=new THREE.Mesh(new THREE.TorusGeometry(0.59,0.045,8,32,Math.PI),colors.gold);
    robeHem.position.set(0,1.59,-1.81);robeHem.rotation.x=-0.18;robeHem.rotation.z=Math.PI;hall.add(robeHem);
    for(const side of [-1,1]) {
      const cuff=cylinder(hall,0.19,0.21,0.1,colors.gold,side*0.43,1.96,-1.75,12);cuff.rotation.z=side*0.8;
      const pendant=box(hall,0.045,0.32,0.04,colors.gold,side*.43,3.22,-2.08);pendant.rotation.z=side*.15;
      sphere(hall,0.07,colors.jade,side*.45,3.04,-2.04,.8,1,.6);
      const crownWing=sphere(hall,.16,colors.gold,side*.4,3.3,-2.18,1.65,.42,.6);crownWing.rotation.z=side*.22;
    }
    sphere(hall,0.09,colors.jade,0,3.36,-1.79,0.8,1,0.45);
    // Individually recognisable crown ornaments and held symbols complement the coloured robes.
    if(theme==='fortune') {
      const crest=new THREE.Mesh(new THREE.TorusGeometry(.19,.035,7,24),colors.gold); crest.position.set(0,3.56,-1.92);hall.add(crest);
      sphere(hall,.1,colors.jade,0,3.56,-1.87,1,1,.45);
      cylinder(hall,.14,.2,.08,colors.gold,.43,1.98,-1.54,14);
      sphere(hall,.11,colors.gold,.43,2.1,-1.54,1,.8,1);
    } else if(theme==='moon') {
      const crescent=new THREE.Mesh(new THREE.TorusGeometry(.23,.035,7,26,Math.PI*1.35),colors.gold);crescent.position.set(0,3.59,-1.94);crescent.rotation.z=-.45;hall.add(crescent);
      for(const side of [-1,1]) {const flower=sphere(hall,.12,colors.peach,side*.42,3.27,-1.88,1,.8,.35);flower.rotation.z=side*.4;}
      sphere(hall,.12,colors.peach,.42,1.97,-1.52,1,.7,.45);
    }
    const chestMedallion=new THREE.Mesh(new THREE.TorusGeometry(0.13,0.025,7,24),colors.gold);
    chestMedallion.position.set(0,2.13,-1.43);hall.add(chestMedallion);
    sphere(hall,0.06,colors.jade,0,2.13,-1.4,1,1,.5);
    // Painted cheeks and a small mouth soften the expression at close range.
    const cheek=mat('#c98677');
    for(const side of [-1,1]) sphere(hall,.075,cheek,side*.22,2.73,-1.895,1,.38,.25);
    const mouth=box(hall,.11,.022,.018,colors.darkRed,0,2.64,-1.85);mouth.rotation.z=0.02;

    for (const side of [-1, 1]) {
      sphere(hall, 0.34, colors.red, side * 0.65, 1.9, -2.25, 1.3, 1, 1);
      box(hall, 0.7, 0.10, 0.6, colors.stone, side * 1.35, 1.45, -1.28);
      sphere(hall, 0.20, colors.orange, side * 1.35, 1.68, -1.28);
      cylinder(hall, 0.08, 0.08, 0.65, colors.red, side * 2.0, 1.79, -1.65, 10);
      sphere(hall, 0.09, colors.gold, side * 2.0, 2.16, -1.65, 0.7, 1.5, 0.7);
    }
    box(hall, 5.1, 0.18, 1.35, colors.darkWood, 0, 1.2, -1.65);
    for (const x of [-2.1, 2.1]) for (const z of [-2.1, -1.2]) box(hall, 0.18, 0.70, 0.18, colors.wood, x, 0.84, z);
    box(hall,5.0,0.055,0.06,colors.gold,0,1.12,-0.96);
    for (const side of [-1,1]) {
      // A carved vessel, fruit and delicate sprigs complete each offering setting.
      cylinder(hall,.18,.12,.38,colors.jade,side*1.62,1.49,-1.38,16);
      cylinder(hall,.12,.16,.08,colors.gold,side*1.62,1.71,-1.38,16);
      for (let j=-1;j<=1;j++) {
        const stem=cylinder(hall,.018,.018,.53,colors.leaf,side*1.62+j*.07,1.98,-1.38,6);stem.rotation.z=j*.2;
        sphere(hall,.085,j===0?colors.peach:colors.paper,side*1.62+j*.13,2.26,-1.38,1,.7,.8);
      }
      for(let j=0;j<3;j++) sphere(hall,.12,colors.orange,side*(1.05+j*.12),1.43+j*.09,-1.18,1,.9,1);
    }
    for (const x of [-1.9, 0, 1.9]) {
      cylinder(hall, 0.64, 0.64, 0.12, colors.darkRed, x, 0.60, 1.05, 24);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.035, 7, 24), colors.gold);
      ring.rotation.x = Math.PI / 2; ring.position.set(x, 0.68, 1.05); hall.add(ring);
    }
  }
  altarInside(mainHall, colors.gold, mainTapestry);
  altarInside(westHall, colors.gold, themePanels.fortune, 0.45, 'fortune');
  altarInside(eastHall, colors.gold, themePanels.moon, 0.45, 'moon');
  // The reading and alchemy rooms have different, purpose-built back walls.
  // Furniture is kept against the rear wall so it does not obstruct existing interaction points.
  const bookColors=['#668176','#9c715c','#b09c72','#5b6c7d','#b17c72'];
  const books=new THREE.InstancedMesh(new THREE.BoxGeometry(.13,.43,.32),mat('#ffffff'),48);
  const bookTransform=new THREE.Object3D(), bookColor=new THREE.Color();
  let bookIndex=0;
  for(const side of [-1,1]) {
    const x=side*2.25;
    box(readingHall,1.65,2.95,.48,colors.darkWood,x,2.05,-2.53);
    box(readingHall,1.49,2.75,.08,colors.wood,x,2.05,-2.25);
    for(let row=0;row<3;row++) {
      const y=.77+row*.81;
      box(readingHall,1.57,.08,.52,colors.darkWood,x,y,-2.26);
      for(let col=0;col<8;col++) {
        const index=bookIndex++; bookTransform.position.set(x-.64+col*.18,y+.26,-2.12);bookTransform.rotation.set(0,0,(col%4-1.5)*.035);
        bookTransform.scale.set(1, .82+(col%3)*.09, 1);bookTransform.updateMatrix();books.setMatrixAt(index,bookTransform.matrix);
        books.setColorAt(index,bookColor.set(bookColors[(col+row+side+8)%bookColors.length]));
      }
    }
    for(const sx of [-.78,.78]) box(readingHall,.08,2.8,.55,colors.gold,x+sx,2.08,-2.24);
  }
  books.instanceMatrix.needsUpdate=true; if(books.instanceColor) books.instanceColor.needsUpdate=true; books.castShadow=true; readingHall.add(books);
  // A paper scroll and reading desk signal the activity even from the doorway.
  box(readingHall,1.65,.13,.82,colors.wood,0,1.14,-1.7);
  for(const x of [-.68,.68]) for(const z of [-2.01,-1.4]) box(readingHall,.09,.65,.09,colors.darkWood,x,.78,z);
  box(readingHall,.95,.03,.44,colors.paper,0,1.23,-1.68);
  for(const x of [-.49,.49]) {const roller=cylinder(readingHall,.06,.06,.5,colors.darkWood,x,1.25,-1.68,8);roller.rotation.x=Math.PI/2;}
  for(let j=0;j<4;j++) box(readingHall,.67,.003,.012,colors.ink,0,1.249,-1.84+j*.105,{shadow:false});

  const jarColors=['#668574','#c8bb9f','#a66e5b','#73808a'];
  const jars=new THREE.InstancedMesh(new THREE.CylinderGeometry(.13,.18,.34,12),mat('#ffffff'),24);
  const jarLids=new THREE.InstancedMesh(new THREE.CylinderGeometry(.15,.15,.045,12),colors.gold,24);
  const jarLabels=new THREE.InstancedMesh(new THREE.BoxGeometry(.11,.13,.01),colors.paper,24);
  const jarTransform=new THREE.Object3D(); let jarIndex=0;
  for(const side of [-1,1]) {
    const x=side*2.15;
    box(alchemyHall,1.85,2.9,.5,colors.darkWood,x,2.02,-2.5);
    box(alchemyHall,1.68,2.7,.08,colors.jade,x,2.03,-2.21);
    for(let row=0;row<3;row++) {
      const y=.78+row*.79;
      box(alchemyHall,1.8,.08,.55,colors.wood,x,y,-2.2);
      for(let col=0;col<4;col++) {
        const index=jarIndex++, px=x-.61+col*.4;
        jarTransform.position.set(px,y+.22,-2.08);jarTransform.rotation.set(0,0,0);jarTransform.scale.set(1,1,1);jarTransform.updateMatrix();jars.setMatrixAt(index,jarTransform.matrix);jars.setColorAt(index,bookColor.set(jarColors[(row+col+(side+1)/2)%jarColors.length]));
        jarTransform.position.y=y+.415;jarTransform.updateMatrix();jarLids.setMatrixAt(index,jarTransform.matrix);
        jarTransform.position.set(px,y+.22,-1.905);jarTransform.updateMatrix();jarLabels.setMatrixAt(index,jarTransform.matrix);
      }
    }
  }
  for(const mesh of [jars,jarLids,jarLabels]) {mesh.instanceMatrix.needsUpdate=true;mesh.castShadow=true;alchemyHall.add(mesh);}
  if(jars.instanceColor) jars.instanceColor.needsUpdate=true;
  // Dried herbs hang from the rafters in the alchemy room.
  for(const side of [-1,1]) for(let bundle=0;bundle<3;bundle++) {
    const x=side*(1.05+bundle*.53);
    cylinder(alchemyHall,.015,.015,.35,colors.paper,x,3.52,-2.02,6);
    for(let sprig=-1;sprig<=1;sprig++) {const stalk=cylinder(alchemyHall,.035,.065,.62,colors.leaf2,x+sprig*.065,3.05,-2.02,7);stalk.rotation.z=sprig*.17;}
    cylinder(alchemyHall,.07,.07,.07,colors.gold,x,3.28,-2.02,8);
  }
  // A real divination table gives the signing interaction an identifiable place in the hall.
  const divinationTable=new THREE.Group(); divinationTable.position.set(2.45,0,-16.65); scene.add(divinationTable);
  box(divinationTable,1.65,0.13,0.92,colors.darkWood,0,1.07,0);
  for(const x of [-0.68,0.68]) for(const z of [-0.3,0.3]) box(divinationTable,0.1,1.05,0.1,colors.wood,x,0.53,z);
  cylinder(divinationTable,0.28,0.23,0.64,colors.darkRed,-0.32,1.43,0,16);
  cylinder(divinationTable,0.3,0.3,0.06,colors.gold,-0.32,1.75,0,16);
  for(let i=0;i<9;i++) {
    const angle=i*Math.PI*2/9;
    const stick=cylinder(divinationTable,0.027,0.027,0.78,colors.paper,-0.32+Math.sin(angle)*0.14,2.05,Math.cos(angle)*0.14,6);
    stick.rotation.z=Math.sin(angle)*0.11; stick.rotation.x=Math.cos(angle)*0.11;
  }
  box(divinationTable,0.5,0.045,0.6,colors.paper,0.4,1.16,0);
  for(let i=0;i<4;i++) box(divinationTable,0.34,0.003,0.012,colors.wood,0.4,1.185,-0.17+i*0.1);
  // Courtyard terraces, planters and a winding garden edge.
  for (let z = 11; z >= -13; z -= 3) {
    for (const side of [-1, 1]) {
      box(scene, 0.32, 0.2, 2.5, colors.stoneLight, side * 6.5, 0.12, z);
      cylinder(scene, 0.17, 0.23, 0.65, colors.stoneLight, side * 6.5, 0.45, z, 8);
    }
  }
  for (const side of [-1, 1]) {
    box(scene, 0.18, 0.2, 26, colors.stone, side * 6.5, 0.79, -1);
    for (const z of [4,-7]) {
      cylinder(scene, 0.7, 0.55, 0.75, colors.darkRed, side * 8.0, 0.5, z, 12);
      sphere(scene, 0.9, colors.leaf2, side * 8.0, 1.4, z, 1.0, 0.7, 1);
      for (let k = 0; k < 4; k++) sphere(scene, 0.12, colors.peach, side * 8 + Math.sin(k * 1.6) * 0.65, 1.48, z + Math.cos(k * 1.6) * 0.6);
    }
  }
  // Drum and bell are real objects in the garden, placed near their shared pavilion.
  const drum = new THREE.Group(); drum.position.set(-12.8, 0, 9.3); scene.add(drum);
  const drumBody = cylinder(drum, 0.95, 0.95, 0.8, colors.darkRed, 0, 1.65, 0, 24); drumBody.rotation.z = Math.PI / 2;
  for (const side of [-1, 1]) { const skin = cylinder(drum, 0.85, 0.85, 0.06, colors.paper, side * 0.43, 1.65, 0, 24); skin.rotation.z = Math.PI / 2; }
  for (const x of [-0.42, 0.42]) box(drum, 0.15, 1.2, 0.9, colors.darkWood, x, 0.62, 0);
  for (const side of [-1,1]) {
    const trim=new THREE.Mesh(new THREE.TorusGeometry(0.8,0.045,8,24),colors.gold);
    trim.rotation.y=Math.PI/2; trim.position.set(side*0.47,1.65,0); drum.add(trim);
    for(let i=0;i<12;i++) {
      const angle=i*Math.PI*2/12;
      sphere(drum,0.045,colors.gold,side*0.49,1.65+Math.cos(angle)*0.78,Math.sin(angle)*0.78);
    }
  }
  // Hanging lanterns mark the entry and the hall's threshold.
  for (const [x,z] of [[-5.4,-15.3],[5.4,-15.3],[-18.6,-5],[18.6,-6]]) {
    sphere(scene, 0.38, colors.red, x, 3.5, z, 0.8, 1.25, 0.8);
    cylinder(scene, 0.05, 0.05, 0.35, colors.gold, x, 2.9, z, 8);
  }
  // The gate is guarded by a pair of carved stone creatures.
  for (const side of [-1, 1]) {
    const guardian = new THREE.Group(); guardian.position.set(side * 6.5, 0, 18.5); scene.add(guardian);
    box(guardian, 1.45, 0.4, 1.2, colors.stone, 0, 0.2, 0);
    sphere(guardian, 0.65, colors.stoneLight, 0, 1.04, 0, 0.75, 0.85, 0.95);
    sphere(guardian, 0.52, colors.stoneLight, 0, 1.72, 0.1, 1, 0.95, 0.9);
    sphere(guardian, 0.18, colors.stone, -0.38, 1.96, 0.08); sphere(guardian, 0.18, colors.stone, 0.38, 1.96, 0.08);
    sphere(guardian, 0.16, colors.stone, 0, 1.56, 0.53, 1.4, 0.8, 1);
    for (const x of [-0.35, 0.35]) cylinder(guardian, 0.17, 0.22, 0.65, colors.stoneLight, x, 0.72, 0.32, 8);
  }
  // Temple courtyard incense burner.
  const altar = new THREE.Group(); altar.position.set(0, 0, -3); scene.add(altar);
  cylinder(altar, 3.2, 3.2, 0.16, colors.stoneLight, 0, 0.08, 0, 48);
  cylinder(altar, 1.1, 0.74, 0.95, colors.darkWood, 0, 0.75, 0, 24);
  cylinder(altar, 1.18, 1.18, 0.13, colors.gold, 0, 1.25, 0, 24);
  cylinder(altar, 0.91, 0.91, 0.05, colors.stone, 0, 1.34, 0, 24);
  for (const [x, z] of [[-0.35,-0.2],[0.25,-0.15],[0.02,0.25]]) cylinder(altar, 0.025, 0.025, 0.7, colors.red, x, 1.7, z, 6);
  for (const side of [-1, 1]) { const handle = new THREE.Mesh(new THREE.TorusGeometry(0.37, 0.07, 8, 16), colors.gold); handle.position.set(side * 1.08, 1.08, 0); handle.rotation.y = Math.PI / 2; altar.add(handle); }
  const smokeGeometry = new THREE.BufferGeometry();
  const smokePositions = new Float32Array(27); smokeGeometry.setAttribute('position',new THREE.BufferAttribute(smokePositions,3));
  const smoke = new THREE.Points(smokeGeometry,new THREE.PointsMaterial({color:'#f5efe2',size:0.33,transparent:true,opacity:0.36,depthWrite:false}));
  smoke.position.set(0,2.1,-3); scene.add(smoke);
  // Pond, rocks, lilies and decorative fish.
  const pond = new THREE.Group(); pond.position.set(18, 0, 2); scene.add(pond);
  cylinder(pond, 5.2, 5.5, 0.22, colors.stone, 0, 0.04, 0, 32);
  cylinder(pond, 4.85, 4.85, 0.04, colors.water, 0, 0.17, 0, 40);
  for (let i = 0; i < 16; i++) { const a = i * Math.PI * 2 / 16; sphere(pond, 0.55 + (i % 3) * 0.12, colors.stoneLight, Math.cos(a) * 5.03, 0.25, Math.sin(a) * 5.03, 1.3, 0.65, 0.8); }
  // Scattered small bank stones break up the perfectly circular retaining wall.
  // One instanced mesh keeps their cost independent of the number of stones.
  const bankStones=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(.26,1),colors.stoneLight,44);
  const bankTransform=new THREE.Object3D();
  for(let i=0;i<44;i++) {
    const angle=i*2.399, radius=5.0+(i%4)*.10, size=.48+(i%5)*.12;
    bankTransform.position.set(Math.cos(angle)*radius,.19,Math.sin(angle)*radius);
    bankTransform.rotation.set(i*.19,angle,i*.11);bankTransform.scale.set(size*1.2,size*.48,size*.8);bankTransform.updateMatrix();bankStones.setMatrixAt(i,bankTransform.matrix);
  }
  bankStones.instanceMatrix.needsUpdate=true; bankStones.receiveShadow=true; pond.add(bankStones);
  // Refracted light is drawn above the surface in a single instanced mesh;
  // no reflection render target or per-frame geometry allocation is needed.
  const waterGlintMaterial=new THREE.MeshBasicMaterial({color:'#e4f4dd',transparent:true,opacity:.24,depthWrite:false,side:THREE.DoubleSide});
  const waterGlints=new THREE.InstancedMesh(new THREE.RingGeometry(.34,.375,20,1,0,Math.PI*.62),waterGlintMaterial,22);
  const glintTransform=new THREE.Object3D();
  for(let i=0;i<22;i++) {
    const angle=i*2.399,radius=.55+(i%6)*.66,size=.55+(i%4)*.15;
    glintTransform.position.set(Math.cos(angle)*radius,.205,Math.sin(angle)*radius);
    glintTransform.rotation.set(-Math.PI/2,0,angle);glintTransform.scale.set(size,size*.38,1);glintTransform.updateMatrix();waterGlints.setMatrixAt(i,glintTransform.matrix);
  }
  waterGlints.instanceMatrix.needsUpdate=true;waterGlints.renderOrder=2;pond.add(waterGlints);
  const fishGroup = new THREE.Group(); pond.add(fishGroup);
  const fishTails = [];
  for (let i = 0; i < 10; i++) {
    const a=i*2.4, r=1+(i%4)*0.8, fish=new THREE.Group();
    fish.position.set(Math.cos(a)*r,0.26,Math.sin(a)*r); fish.rotation.y=-a; fishGroup.add(fish);
    const bodyMaterial=i%3 ? colors.orange : colors.paper;
    sphere(fish,0.24,bodyMaterial,0,0,0,1.55,0.42,0.65);
    sphere(fish,0.08,i%3 ? colors.paper : colors.orange,-0.05,0.075,0,1.8,0.3,1);
    sphere(fish,0.022,colors.ink,-0.27,0.05,0.09);
    const tail=new THREE.Group(); tail.position.set(0.28,0,0); fish.add(tail);
    const fin=new THREE.Mesh(new THREE.ConeGeometry(0.15,0.25,4),bodyMaterial);
    fin.rotation.z=-Math.PI/2; fin.scale.set(1,1,0.36); fin.position.x=0.1; tail.add(fin); fishTails.push(tail);
  }
  const rippleMaterial = new THREE.MeshBasicMaterial({ color: '#e2f2df', transparent: true, opacity: 0.42, side: THREE.DoubleSide });
  const ripples=[];
  for (const [x,z,r] of [[-2,1,0.8],[2,-1,0.6],[0,3,0.48]]) {
    const ring = new THREE.Mesh(new THREE.RingGeometry(r, r + 0.045, 32), rippleMaterial);
    ring.rotation.x = -Math.PI / 2; ring.position.set(x, 0.24, z); pond.add(ring); ripples.push(ring);
  }
  const lilySites=[[-2,-1],[2,2],[0,3]];
  const lilyPetals=new THREE.InstancedMesh(new THREE.SphereGeometry(.13,8,6),colors.peach,lilySites.length*8);
  const lilyTransform=new THREE.Object3D();
  lilySites.forEach(([x,z],site)=>{
    cylinder(pond,.5,.5,.025,colors.leaf2,x,.22,z,20);
    cylinder(pond,.075,.075,.08,colors.gold,x,.31,z,10);
    for(let i=0;i<8;i++) {
      const angle=i*Math.PI/4;
      lilyTransform.position.set(x+Math.sin(angle)*.14,.29,z+Math.cos(angle)*.14);
      lilyTransform.rotation.set(Math.cos(angle)*.45,angle,-Math.sin(angle)*.45);
      lilyTransform.scale.set(.65,1.45,.8); lilyTransform.updateMatrix(); lilyPetals.setMatrixAt(site*8+i,lilyTransform.matrix);
    }
  });
  lilyPetals.instanceMatrix.needsUpdate=true; lilyPetals.receiveShadow=true; pond.add(lilyPetals);
  // Slender reeds and seed heads frame the water without obscuring the fish.
  const reeds=new THREE.InstancedMesh(new THREE.CylinderGeometry(.018,.035,1.0,5),colors.leaf,24);
  const reedHeads=new THREE.InstancedMesh(new THREE.SphereGeometry(.07,6,4),colors.wood,24);
  const reedTransform=new THREE.Object3D();
  for(let i=0;i<24;i++) {
    const angle=.2+i*.105, radius=4.58+(i%3)*.08, x=Math.cos(angle)*radius, z=Math.sin(angle)*radius, h=.65+(i%4)*.12;
    reedTransform.position.set(x,.24+h/2,z);reedTransform.rotation.set(Math.sin(angle)*.12,0,-Math.cos(angle)*.12);reedTransform.scale.set(1,h,1);reedTransform.updateMatrix();reeds.setMatrixAt(i,reedTransform.matrix);
    reedTransform.position.set(x+Math.cos(angle)*.05,.24+h,z+Math.sin(angle)*.05);reedTransform.scale.set(.75,1.8,.75);reedTransform.updateMatrix();reedHeads.setMatrixAt(i,reedTransform.matrix);
  }
  reeds.instanceMatrix.needsUpdate=true;reedHeads.instanceMatrix.needsUpdate=true;pond.add(reeds,reedHeads);
  // A separate tea stall stands beside the west path, with an open approach from the south.
  const teaStall = new THREE.Group(); teaStall.position.set(-19,0,3); scene.add(teaStall);
  for (const x of [-1.9,1.9]) for (const z of [-1,1]) {
    cylinder(teaStall,0.09,0.11,3.25,colors.darkWood,x,1.62,z,8);
    cylinder(teaStall,0.16,0.17,0.18,colors.stone,x,0.09,z,8);
  }
  const teaRoof = new THREE.Group(); teaStall.add(teaRoof); roofGroups.push(teaRoof);
  box(teaRoof,4.5,0.16,2.7,colors.darkWood,0,3.26,0);
  const awning=new THREE.Mesh(new THREE.BoxGeometry(4.7,0.14,2.9),colors.jade);
  awning.position.set(0,3.43,0); awning.rotation.x=-0.09; awning.castShadow=true; teaRoof.add(awning);
  for (let x=-2.05;x<=2.05;x+=0.41) box(teaRoof,0.06,0.08,2.8,colors.gold,x,3.51,0);
  sign(teaRoof,'山间茶事',0,3.05,1.4,2.2);
  box(teaStall,3.6,0.2,1.55,colors.wood,0,1.34,0.22);
  for(const x of [-1.45,1.45]) for(const z of [-0.31,0.76]) box(teaStall,0.15,1.25,0.15,colors.darkWood,x,0.66,z);
  box(teaStall,1.15,0.08,0.72,colors.darkWood,-0.45,1.47,0.3);
  const pot=new THREE.Group(); pot.position.set(-0.45,1.72,0.3); teaStall.add(pot);
  sphere(pot,0.26,colors.jade,0,0,0,1.15,0.8,1);
  cylinder(pot,0.17,0.2,0.08,colors.jade,0,0.22,0,16);
  sphere(pot,0.07,colors.gold,0,0.29,0);
  const spout=cylinder(pot,0.075,0.12,0.34,colors.jade,0.27,0.03,0,12); spout.rotation.z=Math.PI/2.8;
  const potHandle=new THREE.Mesh(new THREE.TorusGeometry(0.19,0.04,8,18,Math.PI*1.4),colors.jade);
  potHandle.position.set(-0.23,0.05,0); potHandle.rotation.z=Math.PI/2; pot.add(potHandle);
  for(const x of [0.18,0.55,0.92]) {
    cylinder(teaStall,0.13,0.085,0.16,colors.paper,x,1.6,0.48,16);
    cylinder(teaStall,0.1,0.1,0.008,colors.wood,x,1.685,0.48,16);
  }
  for(const x of [-1.25,-0.75,1.25]) {
    cylinder(teaStall,0.18,0.2,0.42,colors.cream,x,1.65,-0.3,14);
    cylinder(teaStall,0.18,0.18,0.055,colors.gold,x,1.88,-0.3,14);
  }
  for(const x of [-1.15,1.1]) {
    cylinder(teaStall,0.38,0.38,0.13,colors.wood,x,0.62,2,16);
    for(const dx of [-0.2,0.2]) cylinder(teaStall,0.06,0.07,0.55,colors.darkWood,x+dx,0.31,2,8);
  }
  // Reading table, scrolls, alchemy cauldron and bell.
  box(scene, 3.2, 0.18, 1.5, colors.wood, -15, 1.05, -4);
  for (const x of [-16.2, -13.8]) for (const z of [-4.5, -3.5]) box(scene, 0.15, 1.05, 0.15, colors.darkWood, x, 0.53, z);
  box(scene, 1.0, 0.13, 0.65, colors.paper, -15, 1.19, -4);
  cylinder(scene, 1.0, 0.7, 1.3, colors.darkWood, 15, 0.8, -5, 16);
  cylinder(scene, 1.08, 1.08, 0.13, colors.gold, 15, 1.47, -5, 16);
  cylinder(scene, 0.5, 1.0, 1.4, colors.gold, -16, 2.85, 9, 20);
  // Rope and striker establish the interaction point beneath the bell.
  const bellRope=cylinder(scene,0.04,0.04,2.35,colors.paper,-16.15,1.78,9.1,8);
  bellRope.rotation.z=-0.12;
  sphere(scene,0.09,colors.red,-16.0,0.62,9.1,1,1.8,1);
  const bellStriker=cylinder(scene,0.13,0.13,1.65,colors.wood,-14.7,1.35,10.1,10);
  bellStriker.rotation.z=Math.PI/2.8;
  cylinder(scene, 0.15, 0.15, 0.8, colors.wood, -15, 1.2, 10.3, 8);
  // Practice circles and a dedicated wooden fish are visible from the movement target.
  for(const [x,z] of [[13,14.4],[16,14.4],[19,14.4],[14.5,16.5],[17.5,16.5]]) {
    const ring=new THREE.Mesh(new THREE.RingGeometry(0.72,0.78,32),new THREE.MeshBasicMaterial({color:'#eae6d4',transparent:true,opacity:0.8,side:THREE.DoubleSide}));
    ring.rotation.x=-Math.PI/2; ring.position.set(x,0.075,z); scene.add(ring);
  }
  const woodenFish=new THREE.Group(); woodenFish.position.set(18.05,0,12.45); scene.add(woodenFish);
  cylinder(woodenFish,0.68,0.68,0.12,colors.darkRed,0,0.08,0,24);
  const cushionRing=new THREE.Mesh(new THREE.TorusGeometry(0.53,0.025,6,32),colors.gold);
  cushionRing.rotation.x=Math.PI/2; cushionRing.position.y=0.16; woodenFish.add(cushionRing);
  const smoothWood=new THREE.Mesh(new THREE.SphereGeometry(0.43,24,16),colors.wood);
  smoothWood.scale.set(1,0.7,0.9); smoothWood.position.set(0,0.48,0); smoothWood.castShadow=true; woodenFish.add(smoothWood);
  const carvedLine=new THREE.Mesh(new THREE.TorusGeometry(0.3,0.018,6,24,Math.PI*1.3),colors.darkWood);
  carvedLine.rotation.set(Math.PI/2,0,0.3); carvedLine.position.set(0,0.64,0); woodenFish.add(carvedLine);
  const mallet=cylinder(woodenFish,0.045,0.045,0.83,colors.darkWood,0.58,0.48,0.08,8);
  mallet.rotation.z=-0.7; sphere(woodenFish,0.12,colors.wood,0.3,0.8,0.08);
  // Hearth and jars make the alchemy station legible even before opening its controls.
  const hearth=new THREE.Group(); hearth.position.set(15,0,-5); scene.add(hearth);
  for(let i=0;i<5;i++) {
    const a=i*Math.PI*2/5;
    const log=cylinder(hearth,0.12,0.12,1.7,colors.darkWood,Math.cos(a)*0.3,0.18,Math.sin(a)*0.3,8);
    log.rotation.set(Math.PI/2,0,a);
    const flame=new THREE.Mesh(new THREE.ConeGeometry(0.14,0.58,8),i%2?colors.gold:colors.orange);
    flame.position.set(Math.cos(a)*0.52,0.3,Math.sin(a)*0.52); flame.rotation.z=Math.cos(a)*0.16; hearth.add(flame);
  }
  for(const [x,z] of [[13.4,-5.8],[13.7,-5.8],[16.3,-5.7]]) {
    cylinder(scene,0.18,0.22,0.4,colors.jade,x,0.23,z,12);
    cylinder(scene,0.2,0.2,0.05,colors.gold,x,0.46,z,12);
  }
  // Wishing tree with paper slips.
  const treeCrowns = []; let wishCrown=null;
  function tree(x, z, scale = 1, blossoms = false) {
    const g = new THREE.Group(); g.position.set(x, 0, z); g.scale.setScalar(scale); scene.add(g);
    const trunks=[cylinder(g, 0.19, 0.38, 3.4, colors.bark, 0, 1.7, 0, 9)];
    for (const side of [-1,1]) {
      const branch = cylinder(g,0.09,0.16,1.6,colors.bark,side*0.48,2.78,0,8);
      branch.rotation.z=-side*0.65; trunks.push(branch);
    }
    const crown = new THREE.Group(); g.add(crown); if(blossoms) wishCrown=crown; treeCrowns.push({mesh:crown,trunks,x,z,radius:2.1*scale,trunkRadius:0.5*scale});
    const leaves = blossoms ? [colors.peach, colors.cream, colors.peach] : [colors.leaf, colors.leaf2, colors.leaf3];
    sphere(crown, 1.9, leaves[0], 0, 3.7, 0, 1.2, 0.8, 1.05);
    sphere(crown, 1.45, leaves[1], -1.0, 3.15, 0.35, 1.2, 0.72, 1);
    sphere(crown, 1.55, leaves[2], 1.0, 3.45, -0.25, 1.15, 0.8, 1);
    // Small, individually lit clusters soften the large crown silhouettes. Instancing
    // keeps each tree to only two extra draw calls, and the clusters hide with its crown.
    const clusterGeometry = new THREE.IcosahedronGeometry(0.24, 1);
    for (let layer=0; layer<2; layer++) {
      const clusters = new THREE.InstancedMesh(clusterGeometry, leaves[(layer+1)%3], 24);
      const clusterTransform = new THREE.Object3D();
      for (let i=0; i<24; i++) {
        const a=i*2.399+layer*1.1, height=-0.72+((i*17)%24)/24*1.6;
        const radius=Math.sqrt(Math.max(0,1-(height/1.3)**2));
        clusterTransform.position.set(Math.cos(a)*2.05*radius,3.58+height,Math.sin(a)*1.78*radius);
        clusterTransform.rotation.set(i*.41,a,i*.22);
        clusterTransform.scale.set(1.2+(i%3)*.16,.6+(i%4)*.08,1.1+(i%2)*.15);
        clusterTransform.updateMatrix(); clusters.setMatrixAt(i,clusterTransform.matrix);
      }
      clusters.instanceMatrix.needsUpdate=true; clusters.castShadow=true; clusters.receiveShadow=true; crown.add(clusters);
    }
    if (blossoms) for (const [sx, sy, sz] of [[-0.8,2.3,0.8],[0.5,2.1,1.1],[1.2,2.4,0.3],[-1.2,2.4,-0.4]]) {
      box(crown, 0.025, 0.65, 0.025, colors.paper, sx, sy + 0.3, sz);
      box(crown, 0.22, 0.36, 0.04, colors.red, sx, sy, sz);
    }
  }
  tree(8.5, 6, 1.0, true);
  // Saved wishes become colored wooden tags; only the theme is rendered, never the text.
  const hangingWishes=[], wishTagColors={安然:colors.red,成长:colors.jade,团圆:colors.gold,新旅程:colors.blue}; let wishTagSerial=0;
  function hangWish(theme) {
    if(!wishCrown) return;
    const n=wishTagSerial++, a=n*2.399, radius=1.15+(n%3)*.2;
    const group=new THREE.Group(); group.position.set(Math.sin(a)*radius,2.0+(n%4)*.12,Math.cos(a)*radius); wishCrown.add(group);
    box(group,.025,.48,.025,colors.paper,0,.24,0);
    box(group,.26,.38,.055,wishTagColors[theme]||colors.red,0,-.12,0);
    box(group,.13,.015,.06,colors.paper,0,-.08,.031);
    hangingWishes.push(group);
    if(hangingWishes.length>12) { const oldest=hangingWishes.shift(); wishCrown.remove(oldest); oldest.traverse(item=>item.geometry?.dispose()); }
  }
  try { const saved=JSON.parse(localStorage.getItem('yunxi-activities-wishes')||'[]'); if(Array.isArray(saved)) saved.filter(item=>item && typeof item.text==='string').slice(0,12).reverse().forEach(item=>hangWish(item.theme)); } catch {}
  for (const [x,z,size] of [[-22,1,1.15],[-22,-13,1.0],[22,-16,1.15],[-10,-12,0.85],[10,-12,0.85],[23,12,0.9]]) tree(x,z,size);
  // Petals are generated into one point cloud to keep animation inexpensive.
  const petalCanvas=document.createElement('canvas'); petalCanvas.width=32; petalCanvas.height=32;
  const petalCtx=petalCanvas.getContext('2d'); petalCtx.fillStyle='#f5c3bd'; petalCtx.beginPath(); petalCtx.ellipse(16,16,6,12,0.6,0,Math.PI*2); petalCtx.fill();
  const petalTexture=new THREE.CanvasTexture(petalCanvas); petalTexture.colorSpace=THREE.SRGBColorSpace;
  const petalGeometry=new THREE.BufferGeometry(), petalPositions=new Float32Array(90);
  petalGeometry.setAttribute('position',new THREE.BufferAttribute(petalPositions,3));
  const petals=new THREE.Points(petalGeometry,new THREE.PointsMaterial({map:petalTexture,color:'#ffe5dc',size:0.26,transparent:true,alphaTest:0.03,depthWrite:false}));
  petals.position.set(8.5,0,6); scene.add(petals);
  // Seeded decoration keeps the same garden layout on every load.
  let seed = 1861; const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  const forestTrees=[];
  for (let i = 0; i < 110; i++) {
    const x = (random() - 0.5) * 95, z = (random() - 0.5) * 95;
    const reserved=[[-27,-15],[27,-15],[0,-28],[-23,-9.5],[23,-9.5],[-27,12],[27,16]];
    if ((Math.abs(x) < 24 && z > -29 && z < 28) || Math.abs(z) < 9 && Math.abs(x) < 29 || reserved.some(([rx,rz])=>Math.abs(x-rx)<7 && Math.abs(z-rz)<7)) continue;
    forestTrees.push({x,z,scale:0.65+random()*0.65});
  }
  const treeParts=[
    {geometry:new THREE.CylinderGeometry(0.19,0.38,3.4,7),material:colors.bark,x:0,y:1.7,z:0,scale:[1,1,1]},
    {geometry:new THREE.IcosahedronGeometry(1.9,1),material:colors.leaf,x:0,y:3.7,z:0,scale:[1.2,0.8,1.05]},
    {geometry:new THREE.IcosahedronGeometry(1.45,1),material:colors.leaf2,x:-1,y:3.15,z:0.35,scale:[1.2,0.72,1]},
    {geometry:new THREE.IcosahedronGeometry(1.55,1),material:colors.leaf3,x:1,y:3.45,z:-0.25,scale:[1.15,0.8,1]},
  ];
  for (const part of treeParts) {
    const instances=new THREE.InstancedMesh(part.geometry,part.material,forestTrees.length), transform=new THREE.Object3D();
    forestTrees.forEach((tree,index) => {
      transform.position.set(tree.x+part.x*tree.scale,part.y*tree.scale,tree.z+part.z*tree.scale);
      transform.scale.set(part.scale[0]*tree.scale,part.scale[1]*tree.scale,part.scale[2]*tree.scale);
      transform.updateMatrix(); instances.setMatrixAt(index,transform.matrix);
    });
    instances.castShadow=true; instances.receiveShadow=true; instances.instanceMatrix.needsUpdate=true; scene.add(instances);
  }
  // Pines and shallow grassy banks frame the far perimeter without entering the
  // walkable courtyard. Instancing adds only a few draw calls on mobile devices.
  const pines=[];
  for(let i=0;i<36;i++) {
    const angle=i*Math.PI*2/36+.06*Math.sin(i*2.7), radius=41+(i%4)*1.7;
    const x=Math.sin(angle)*radius,z=Math.cos(angle)*radius;
    if(Math.abs(x)<8 && z>30)continue; // Keep the mountain gate approach open.
    pines.push({x,z,scale:.75+(i%5)*.105,angle});
  }
  const pineTransform=new THREE.Object3D();
  const pineTrunks=new THREE.InstancedMesh(new THREE.CylinderGeometry(.13,.25,3.4,7),colors.bark,pines.length);
  const pineLower=new THREE.InstancedMesh(new THREE.ConeGeometry(1.2,3.0,7),colors.leaf,pines.length);
  const pineUpper=new THREE.InstancedMesh(new THREE.ConeGeometry(.93,2.7,7),colors.leaf2,pines.length);
  pines.forEach((tree,i)=>{
    pineTransform.rotation.set(0,tree.angle,0);pineTransform.scale.setScalar(tree.scale);
    for(const [mesh,y] of [[pineTrunks,1.7],[pineLower,3.6],[pineUpper,5.05]]) {
      pineTransform.position.set(tree.x,y*tree.scale,tree.z);pineTransform.updateMatrix();mesh.setMatrixAt(i,pineTransform.matrix);
    }
  });
  for(const mesh of [pineTrunks,pineLower,pineUpper]){mesh.instanceMatrix.needsUpdate=true;mesh.castShadow=true;mesh.receiveShadow=true;scene.add(mesh);}
  const hillMaterial=mat('#7c906b');
  const outerBanks=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1,1),hillMaterial,22);
  for(let i=0;i<22;i++){
    const angle=i*Math.PI*2/22, radius=45+(i%3)*1.1;
    pineTransform.position.set(Math.sin(angle)*radius,-.9,Math.cos(angle)*radius);
    pineTransform.rotation.set(0,angle,0);pineTransform.scale.set(4+(i%3)*.7,1.35,2.9+(i%4)*.25);pineTransform.updateMatrix();outerBanks.setMatrixAt(i,pineTransform.matrix);
  }
  outerBanks.instanceMatrix.needsUpdate=true;outerBanks.receiveShadow=true;scene.add(outerBanks);
  // Low shrubs grow under the perimeter trees; the open centre remains clear.
  const shrubs=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(.43,1),colors.leaf2,forestTrees.length*2);
  forestTrees.forEach((tree,i)=>{for(let j=0;j<2;j++){
    const a=i*2.399+j*2.4,r=1.5+j*.55;
    pineTransform.position.set(tree.x+Math.cos(a)*r,.22,tree.z+Math.sin(a)*r);
    pineTransform.rotation.set(0,a,0);pineTransform.scale.set(1.4,.48,1);pineTransform.updateMatrix();shrubs.setMatrixAt(i*2+j,pineTransform.matrix);
  }});
  shrubs.instanceMatrix.needsUpdate=true;shrubs.receiveShadow=true;scene.add(shrubs);
  for (const [x,z] of [[-7,12],[7,12],[-7,-10],[7,-10]]) {
    cylinder(scene, 0.25, 0.35, 0.5, colors.stone, x, 0.25, z, 8);
    box(scene, 0.55, 0.9, 0.55, colors.cream, x, 0.9, z);
    box(scene, 0.78, 0.18, 0.78, colors.darkWood, x, 1.45, z);
    sphere(scene, 0.16, colors.gold, x, 1.62, z);
  }

  // Low planted borders add seasonal color while keeping the paths completely clear.
  // Shared instanced geometry avoids hundreds of separate objects and draw calls.
  const plantingBeds = [[-10.2,17.2],[10.2,17.2],[-10.8,-15.2],[10.8,-15.2],[-24.5,3.8],[24.5,3.8]];
  const flowerStemMaterial=mat('#617c58'), flowerPink=mat('#dfaaa6'), flowerCream=mat('#e8dbc1');
  const flowerCount=plantingBeds.length*18, flowerTransform=new THREE.Object3D();
  const stems=new THREE.InstancedMesh(new THREE.CylinderGeometry(.025,.03,.52,5),flowerStemMaterial,flowerCount);
  const leavesA=new THREE.InstancedMesh(new THREE.SphereGeometry(.1,6,4),colors.leaf2,flowerCount*2);
  const blossomsA=new THREE.InstancedMesh(new THREE.SphereGeometry(.105,7,5),flowerPink,flowerCount);
  const blossomsB=new THREE.InstancedMesh(new THREE.SphereGeometry(.065,6,4),flowerCream,flowerCount);
  plantingBeds.forEach(([bx,bz],bedIndex)=>{
    // Stone edging is low enough to preserve long sightlines from the camera.
    box(scene,3.6,.12,1.55,colors.stone,bx,.07,bz,{shadow:false});
    box(scene,3.38,.07,1.33,colors.grassDark,bx,.15,bz,{shadow:false});
    for(let i=0;i<18;i++) {
      const n=bedIndex*18+i, x=bx-1.45+(i%6)*.57+(i%2)*.08, z=bz-.48+Math.floor(i/6)*.48;
      const h=.42+(i%4)*.055;
      flowerTransform.position.set(x,.16+h/2,z); flowerTransform.rotation.set(0,0,(i%3-1)*.1); flowerTransform.scale.set(1,h/.52,1); flowerTransform.updateMatrix(); stems.setMatrixAt(n,flowerTransform.matrix);
      for(let side=0;side<2;side++) {
        flowerTransform.position.set(x+(side?1:-1)*.09,.3+h*.18,z); flowerTransform.rotation.set(0,(i%5)*.6,(side?1:-1)*.5); flowerTransform.scale.set(1.5,.5,.75); flowerTransform.updateMatrix(); leavesA.setMatrixAt(n*2+side,flowerTransform.matrix);
      }
      flowerTransform.position.set(x,.18+h,z); flowerTransform.rotation.set(0,0,0); flowerTransform.scale.set(1.35,.65,1.35); flowerTransform.updateMatrix(); blossomsA.setMatrixAt(n,flowerTransform.matrix);
      flowerTransform.position.y+=.055; flowerTransform.scale.set(.6,.5,.6); flowerTransform.updateMatrix(); blossomsB.setMatrixAt(n,flowerTransform.matrix);
    }
  });
  for(const mesh of [stems,leavesA,blossomsA,blossomsB]) { mesh.instanceMatrix.needsUpdate=true; mesh.receiveShadow=true; scene.add(mesh); }

  // Three smaller sanctuaries continue the garden beyond the central courtyard.
  // Their roof groups follow all original roofs, so existing visibility indices remain stable.
  for (const side of [-1,1]) {
    box(scene,4.3,0.075,8,avenueMaterial,side*27,0.025,-8.4,{shadow:false});
    box(scene,5.4,0.08,3.4,crossMaterial,side*24.5,0.026,-6.5,{shadow:false});
  }
  const breezeHall=building(-27,-15,7,6,'清风殿');
  const joyHall=building(27,-15,7,6,'长乐殿');
  const cloudHall=building(0,-28,7,6,'望云殿');
  const lotusPink=mat('#d4a3a0'), lotusPale=mat('#ebd5bd'), nightBlue=mat('#4c6274');
  function sanctuaryAltar(hall,theme) {
    box(hall,5.4,2.7,0.08,themePanels[theme],0,2.3,-2.55);
    box(hall,5.5,0.13,1.0,colors.darkWood,0,1.16,-1.75);
    for (const x of [-2.25,2.25]) for (const z of [-2.1,-1.35]) box(hall,0.15,0.7,0.15,colors.wood,x,0.78,z);
    cylinder(hall,0.68,0.8,0.12,colors.gold,0,1.29,-1.78,24);
    if (theme==='breeze') {
      // A lotus arrangement and a pair of celadon vases evoke a quiet spring garden.
      cylinder(hall,0.4,0.55,0.35,colors.jade,0,1.5,-1.78,20);
      for(let i=0;i<8;i++) {
        const angle=i*Math.PI/4;
        const petal=sphere(hall,0.28,i%2?lotusPink:lotusPale,Math.sin(angle)*0.32,1.76,-1.78+Math.cos(angle)*0.32,0.58,1.4,0.72);
        petal.rotation.z=-Math.sin(angle)*0.5;petal.rotation.x=Math.cos(angle)*0.5;
      }
      sphere(hall,0.17,colors.gold,0,1.83,-1.78,1,0.7,1);
    } else if (theme==='joy') {
      // A warm vessel filled with fruit is distinct from the neighbouring altars.
      cylinder(hall,0.55,0.32,0.25,colors.gold,0,1.48,-1.78,24);
      for(const [x,y,z] of [[-.23,1.7,-1.8],[.2,1.68,-1.8],[0,1.84,-1.8],[-.06,1.67,-1.54]]) sphere(hall,0.19,colors.orange,x,y,z);
      for(const side of [-1,1]) {const arch=new THREE.Mesh(new THREE.TorusGeometry(0.5,0.045,8,24,Math.PI),colors.gold);arch.position.set(side*.74,1.6,-1.75);arch.rotation.y=Math.PI/2;hall.add(arch);}
    } else {
      // A circular moon gate and cloud ornament mark the farthest sanctuary.
      const moon=new THREE.Mesh(new THREE.TorusGeometry(0.72,0.065,10,40),colors.gold);moon.position.set(0,2.14,-1.86);hall.add(moon);
      sphere(hall,0.42,nightBlue,0,2.12,-1.94,1,1,0.18);
      for(const [x,y] of [[-.52,1.53],[0,1.46],[.5,1.54]]) sphere(hall,0.22,colors.paper,x,y,-1.52,1.7,.5,.65);
      sphere(hall,0.1,colors.gold,0.11,2.2,-1.74,1,1,0.35);
    }
    for(const side of [-1,1]) {
      cylinder(hall,.1,.13,.48,colors.red,side*1.8,1.45,-1.7,12);
      sphere(hall,.07,colors.gold,side*1.8,1.73,-1.7,.7,1.6,.7);
      cylinder(hall,.62,.62,.1,colors.darkRed,side*1.5,.58,.95,24);
      const matRing=new THREE.Mesh(new THREE.TorusGeometry(.48,.025,6,24),colors.gold);matRing.rotation.x=Math.PI/2;matRing.position.set(side*1.5,.64,.95);hall.add(matRing);
    }
  }
  sanctuaryAltar(breezeHall,'breeze'); sanctuaryAltar(joyHall,'joy'); sanctuaryAltar(cloudHall,'cloud');

  // Each consultation activity has its own location, host, table and roof.
  function consultationStall(x,z,name,kind) {
    const stall=new THREE.Group(); stall.position.set(x,0,z); scene.add(stall);
    for(const dx of [-1.65,1.65]) for(const dz of [-.9,.9]) {
      cylinder(stall,.09,.11,3.1,colors.darkWood,dx,1.55,dz,8);
      cylinder(stall,.15,.17,.16,colors.stone,dx,.08,dz,8);
    }
    const canopy=new THREE.Group(); stall.add(canopy); roofGroups.push(canopy);
    box(canopy,3.8,.15,2.3,colors.darkWood,0,3.05,0);
    box(canopy,3.9,.13,2.5,kind==='oracle'?colors.darkRed:nightBlue,0,3.2,0);
    for(let i=-4;i<=4;i++) box(canopy,.045,.05,2.45,colors.gold,i*.4,3.29,0);
    sign(canopy,name,0,2.85,1.18,2.35);
    box(stall,3.2,.16,1.2,colors.wood,0,1.2,.2);
    for(const dx of [-1.32,1.32]) for(const dz of [-.25,.7]) box(stall,.12,1.18,.12,colors.darkWood,dx,.6,dz);
    if(kind==='oracle') {
      cylinder(stall,.25,.2,.55,colors.darkRed,-.65,1.55,.2,16);
      for(let i=-2;i<=2;i++) { const stick=cylinder(stall,.018,.018,.55,colors.paper,-.65+i*.06,1.98,.2,6); stick.rotation.z=i*.04; }
      box(stall,.7,.07,.48,colors.paper,.55,1.32,.25);
      for(let i=0;i<3;i++) box(stall,.5,.004,.012,colors.wood,.55,1.36,.11+i*.12);
    } else {
      const orb=new THREE.Mesh(new THREE.SphereGeometry(.28,20,16),new THREE.MeshStandardMaterial({color:'#c9d4df',roughness:.22,metalness:.15,transparent:true,opacity:.82}));
      orb.position.set(-.8,1.62,.2);stall.add(orb);cylinder(stall,.25,.32,.12,colors.gold,-.8,1.34,.2,20);
      for(let i=0;i<4;i++) {const card=box(stall,.38,.025,.56,nightBlue,-.18+i*.4,1.3,.27);card.rotation.y=(i-1.5)*.12;}
    }
    const host=createAvatar(THREE);host.group.position.set(0,0,-.45);host.group.rotation.y=Math.PI;host.group.scale.setScalar(.72);stall.add(host.group);
    host.group.traverse(part=>{if(part.material?.color?.getHexString()==='bb7778')part.material.color.set(kind==='oracle'?'#718373':'#786a83');});
    const cap=new THREE.Mesh(new THREE.CylinderGeometry(.28,.4,.22,12),kind==='oracle'?colors.darkWood:nightBlue);cap.position.set(0,.67,.04);host.head.add(cap);
    return host;
  }
  const oracleHost=consultationStall(-23,-9.5,'问心小摊','oracle');
  const tarotHost=consultationStall(23,-9.5,'星象小摊','tarot');
  // A small music stage, with an original procedural light show and resident DJ.
  const musicStage=new THREE.Group(); musicStage.position.set(27,0,16); scene.add(musicStage);
  box(musicStage,7.8,.28,5.2,colors.stone,0,.14,0);
  box(musicStage,7.3,.08,4.8,colors.darkWood,0,.32,0);
  for(const x of [-3.45,3.45]) {
    cylinder(musicStage,.12,.16,3.8,colors.darkWood,x,2.25,-1.7,10);
    sphere(musicStage,.14,colors.gold,x,4.15,-1.7);
    box(musicStage,.9,1.9,.8,colors.darkWood,x*.83,1.3,.25);
    for(const y of [.8,1.6]) {const cone=cylinder(musicStage,.28,.28,.06,colors.roofLight,x*.83,y,.68,20);cone.rotation.x=Math.PI/2;}
  }
  box(musicStage,7.1,.24,.3,colors.darkWood,0,4.0,-1.7);
  sign(musicStage,'云间乐台',0,3.62,-1.48,2.6);
  box(musicStage,3.1,1.0,1.1,colors.wood,0,.84,-.9);
  for(const x of [-.8,.8]) {const disc=cylinder(musicStage,.42,.42,.06,colors.dark, x,1.39,-.92,24);disc.rotation.y=x*.2; cylinder(musicStage,.11,.11,.07,colors.gold,x,1.43,-.92,16);}
  const musicHost=createAvatar(THREE);musicHost.group.position.set(0,.32,-1.35);musicHost.group.rotation.y=Math.PI;musicHost.group.scale.setScalar(.72);musicStage.add(musicHost.group);
  musicHost.setVariant('plum');
  const danceLights=[];
  for(const [i,x] of [-2.35,-.8,.8,2.35].entries()) {
    const material=new THREE.MeshBasicMaterial({color:['#f0ad97','#f2d17c','#9ccab2','#a7b7e4'][i],transparent:true,opacity:.32,depthWrite:false});
    const spot=new THREE.Mesh(new THREE.CircleGeometry(.72,24),material);spot.rotation.x=-Math.PI/2;spot.position.set(x,.38,1.0);musicStage.add(spot);danceLights.push(spot);
    sphere(musicStage,.16,colors.gold,x,3.82,-1.45);
  }
  let danceActive=false;
  const setDanceActive=active=>{danceActive=Boolean(active);if(!danceActive){musicHost.leftArm.rotation.z=0;musicHost.rightArm.rotation.z=0;}};

  // Original letting-go nook: a seated keeper, a paper effigy and a little tea table.
  const releaseStage=new THREE.Group(); releaseStage.position.set(-27,0,12); scene.add(releaseStage);
  box(releaseStage,5.8,.22,4.2,colors.stone,0,.11,0);
  box(releaseStage,5.5,.08,3.9,colors.path,0,.25,0);
  for(const x of [-2.55,2.55]) {
    cylinder(releaseStage,.11,.13,2.9,colors.darkWood,x,1.67,-1.65,10);
    sphere(releaseStage,.14,colors.gold,x,3.2,-1.65);
    const lantern=cylinder(releaseStage,.16,.2,.38,colors.cream,x,2.65,-1.65,12);
    box(releaseStage,.34,.04,.34,colors.red,x,2.43,-1.65);
    box(releaseStage,.34,.04,.34,colors.red,x,2.87,-1.65);
  }
  box(releaseStage,5.4,.2,.2,colors.darkWood,0,3.13,-1.65);
  sign(releaseStage,'解忧处',0,2.8,-1.52,2.2);
  // Original cloth backdrop and awning distinguish the nook from the stone halls.
  // The hand-painted mountain motif uses a single canvas texture and no downloads.
  const nookCanvas=document.createElement('canvas'); nookCanvas.width=768; nookCanvas.height=256;
  const nookContext=nookCanvas.getContext('2d');
  nookContext.fillStyle='#e7ddc4';nookContext.fillRect(0,0,768,256);
  nookContext.strokeStyle='#bba77e';nookContext.lineWidth=5;nookContext.strokeRect(8,8,752,240);
  nookContext.fillStyle='#c4c8ae';nookContext.beginPath();nookContext.moveTo(0,220);nookContext.lineTo(130,110);nookContext.lineTo(205,181);nookContext.lineTo(340,70);nookContext.lineTo(468,180);nookContext.lineTo(570,95);nookContext.lineTo(768,225);nookContext.lineTo(768,256);nookContext.lineTo(0,256);nookContext.fill();
  nookContext.strokeStyle='#778c79';nookContext.lineWidth=4;nookContext.beginPath();
  nookContext.moveTo(0,220);nookContext.lineTo(130,110);nookContext.lineTo(205,181);nookContext.lineTo(340,70);nookContext.lineTo(468,180);nookContext.lineTo(570,95);nookContext.lineTo(768,225);nookContext.stroke();
  const nookTexture=new THREE.CanvasTexture(nookCanvas);nookTexture.colorSpace=THREE.SRGBColorSpace;
  const backdropMaterial=new THREE.MeshStandardMaterial({map:nookTexture,roughness:1,side:THREE.DoubleSide});
  const backdrop=new THREE.Mesh(new THREE.PlaneGeometry(4.7,1.6),backdropMaterial);
  backdrop.name='release-painted-backdrop';backdrop.position.set(0,1.62,-1.73);backdrop.receiveShadow=true;releaseStage.add(backdrop);
  box(releaseStage,5.25,.12,.18,colors.darkWood,0,2.48,-1.72);
  const releaseAwning=box(releaseStage,5.75,.10,1.1,colors.roof,0,3.32,-1.5);releaseAwning.name='release-awning';releaseAwning.rotation.x=-.13;
  box(releaseStage,5.8,.12,.12,colors.gold,0,3.31,-.96);
  // Little stitched slips hang as a fixed, instanced ornament rather than dozens of draw calls.
  const slipGeometry=new THREE.BoxGeometry(.20,.42,.028), slipMaterial=colors.paper;
  const slipInstances=new THREE.InstancedMesh(slipGeometry,slipMaterial,8);slipInstances.name='release-hanging-slips';
  const slipPose=new THREE.Object3D();
  const slipPositions=[-2.30,-2.02,-1.74,-1.46,1.46,1.74,2.02,2.30];
  for(let i=0;i<8;i++){slipPose.position.set(slipPositions[i],2.93,-1.06);slipPose.rotation.set(0,0,(i%2?1:-1)*.10);slipPose.updateMatrix();slipInstances.setMatrixAt(i,slipPose.matrix);}
  slipInstances.instanceMatrix.needsUpdate=true;releaseStage.add(slipInstances);
  // A woven circular mat connects the seated keeper and the paper figure visually.
  const ritualMat=cylinder(releaseStage,1.16,1.16,.025,colors.bark,-1.36,.315,-.23,28);ritualMat.name='release-woven-mat';ritualMat.castShadow=false;
  for(const radius of [.5,.78,1.04]){const ring=new THREE.Mesh(new THREE.TorusGeometry(radius,.012,5,32),colors.gold);ring.rotation.x=Math.PI/2;ring.position.set(-1.36,.333,-.23);releaseStage.add(ring);}
  // The keeper sits on a low wooden stool rather than standing in the scene.
  const stoolX=-1.9,stoolZ=-.55;
  box(releaseStage,.85,.12,.7,colors.wood,stoolX,.69,stoolZ);
  for(const dx of [-.3,.3])for(const dz of [-.22,.22])box(releaseStage,.08,.38,.08,colors.darkWood,stoolX+dx,.46,stoolZ+dz);
  const releaseHost=createAvatar(THREE); releaseHost.group.position.set(stoolX,.28,stoolZ); releaseHost.group.rotation.y=-Math.PI/2; releaseHost.group.scale.setScalar(.72); releaseStage.add(releaseHost.group);
  releaseHost.group.traverse(part=>{
    const color=part.material?.color?.getHexString();
    if(color==='bb7778')part.material.color.set('#718b79');
    if(color==='a9666b')part.material.color.set('#607a69');
    if(color==='493a34')part.material.color.set('#77736c');
  });
  // A cloth headband, glasses and apron distinguish this host from roaming avatars.
  const headband=new THREE.Mesh(new THREE.TorusGeometry(.53,.045,7,24),colors.jade);
  headband.name='release-keeper-headband';headband.rotation.x=Math.PI/2;headband.position.set(0,.23,.02);releaseHost.head.add(headband);
  const glasses=new THREE.Group();glasses.name='release-keeper-glasses';glasses.position.set(0,.025,-.55);releaseHost.head.add(glasses);
  for(const x of [-.20,.20]){const rim=new THREE.Mesh(new THREE.TorusGeometry(.12,.012,6,18),colors.gold);rim.position.x=x;glasses.add(rim);}
  box(glasses,.17,.023,.018,colors.gold,0,.02,0,{shadow:false});
  const apron=box(releaseHost.group,.55,.47,.04,colors.cream,0,.88,-.45);apron.name='release-keeper-apron';
  box(releaseHost.group,.38,.10,.045,colors.jade,0,.84,-.48,{shadow:false});
  releaseHost.leftLeg.rotation.x=Math.PI/2.5;releaseHost.rightLeg.rotation.x=Math.PI/2.5;
  releaseHost.leftArm.rotation.x=.24;releaseHost.rightArm.rotation.x=.25;
  // A wooden, rounded hand paddle, made from simple shapes and not a copied prop.
  const paddle=new THREE.Group();paddle.position.set(0,-.53,-.10);paddle.rotation.x=-.1;releaseHost.rightArm.add(paddle);
  cylinder(paddle,.045,.05,.63,colors.wood,0,-.28,0,10);
  const paddleFace=sphere(paddle,.26,colors.wood,0,-.69,0,.8,1.18,.34);
  sphere(paddle,.13,colors.gold,0,-.69,-.081,.75,1,.12);
  // A flat paper figure with a warm red sash stands on its own little frame.
  const releaseDummy=new THREE.Group(); releaseDummy.name='release-paper-figure'; releaseDummy.position.set(-.88,.26,-.16); releaseStage.add(releaseDummy);
  cylinder(releaseDummy,.50,.50,.10,colors.stone,0,.05,0,20);
  cylinder(releaseDummy,.045,.06,1.1,colors.darkWood,0,.58,-.12,8);
  box(releaseDummy,.62,.72,.09,colors.paper,0,.82,0);
  sphere(releaseDummy,.27,colors.paper,0,1.36,0,1,1,.2);
  for(const side of [-1,1]) {
    const arm=box(releaseDummy,.37,.16,.08,colors.paper,side*.45,.91,0);arm.rotation.z=side*.38;
    const leg=box(releaseDummy,.17,.36,.08,colors.paper,side*.18,.29,0);leg.rotation.z=-side*.11;
    for(const face of [-1,1])sphere(releaseDummy,.028,colors.dark,side*.085,1.39,face*.059,.7,1,.5);
  }
  for(const face of [-1,1]) {
    box(releaseDummy,.64,.12,.025,colors.red,0,.77,face*.063);
    sphere(releaseDummy,.09,colors.gold,0,.77,face*.085,1,.8,.2);
  }
  // Reused meshes and one material keep the visual impact inexpensive.
  const impactMaterial=new THREE.MeshBasicMaterial({color:'#f5d997',transparent:true,opacity:0,depthWrite:false});
  const impact=new THREE.Group();impact.position.set(-.88,1.25,.03);releaseStage.add(impact);
  for(let i=0;i<7;i++) {const a=i*Math.PI*2/7;const spark=box(impact,.065,.25,.03,impactMaterial,Math.cos(a)*.48,Math.sin(a)*.48,0,{shadow:false});spark.rotation.z=a-Math.PI/2;}
  impact.visible=false;
  // Eight shared-geometry flecks disperse after each tap and are hidden at rest.
  const flecks=new THREE.InstancedMesh(new THREE.OctahedronGeometry(.055,0),impactMaterial,8);
  flecks.name='release-impact-flecks';flecks.visible=false;flecks.castShadow=false;releaseStage.add(flecks);
  const fleckPose=new THREE.Object3D();
  // A low table and warm details make this corner recognizable at a distance.
  box(releaseStage,1.0,.1,.64,colors.wood,1.5,.68,-.6);
  for(const dx of [-.36,.36])for(const dz of [-.2,.2])box(releaseStage,.07,.39,.07,colors.darkWood,1.5+dx,.45,-.6+dz);
  cylinder(releaseStage,.14,.12,.2,colors.jade,1.27,.83,-.6,12);
  cylinder(releaseStage,.17,.17,.04,colors.cream,1.7,.76,-.59,12);
  let releaseActive=false,releaseTime=0;
  const setReleaseActive=active=>{
    releaseActive=Boolean(active);releaseTime=0;
    if(!releaseActive){releaseHost.rightArm.rotation.x=.25;releaseHost.head.rotation.z=0;releaseDummy.rotation.z=0;impact.visible=false;flecks.visible=false;impactMaterial.opacity=0;}
  };

  // Residents animate independently of the player's interactions.
  const sweeper = createAvatar(THREE);
  sweeper.group.position.set(-8.4, 0, 11.2);
  sweeper.group.rotation.y = -0.5;
  sweeper.group.scale.setScalar(0.86);
  scene.add(sweeper.group);
  sweeper.group.traverse(part => {
    if (part.material?.color?.getHexString() === 'bb7778') part.material.color.set('#7e9080');
  });
  const hat = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.5, 0.25, 12), colors.darkWood);
  hat.position.set(0, 0.63, 0.05); sweeper.head.add(hat);
  const hatTop = new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.34, 0.32, 12), colors.darkWood);
  hatTop.position.set(0, 0.88, 0.05); sweeper.head.add(hatTop);
  const broom = new THREE.Group(); broom.position.set(-0.07, -0.4, -0.2); broom.rotation.z = -0.28;
  const broomHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.8, 7), colors.wood);
  broomHandle.position.y = -0.55; broom.add(broomHandle);
  const broomHead = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.7, 9), colors.gold);
  broomHead.rotation.z = Math.PI; broomHead.position.y = -1.7; broom.add(broomHead);
  sweeper.rightArm.add(broom);
  const sweeperName = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 0.42), label('扫庭人'));
  sweeperName.position.set(0, 3.45, 0); sweeper.group.add(sweeperName);

  const teacher = createAvatar(THREE);
  teacher.group.position.set(16, 0, 10.1);
  teacher.group.rotation.y = Math.PI;
  teacher.group.scale.setScalar(0.9);
  scene.add(teacher.group);
  teacher.group.traverse(part => {
    if (part.material?.color?.getHexString() === 'bb7778') part.material.color.set('#6d8790');
  });
  const teacherHair = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 8), colors.darkWood);
  teacherHair.position.set(0, 0.65, 0.1); teacher.head.add(teacherHair);
  const teacherName = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 0.42), label('引练人'));
  teacherName.position.set(0, 3.45, 0); teacher.group.add(teacherName);

  const cat = new THREE.Group();
  const catFur = mat('#cd9562'), catLight = mat('#f1dfc3'), catFace = mat('#3d3730');
  sphere(cat, 0.43, catFur, 0, 0.48, 0, 1.25, 0.8, 0.7);
  sphere(cat, 0.33, catFur, -0.42, 0.77, 0, 1, 0.85, 0.95);
  sphere(cat, 0.18, catLight, -0.68, 0.66, -0.07, 1, 0.65, 0.7);
  for (const z of [-0.2, 0.2]) {
    const ear = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.26, 4), catFur);
    ear.position.set(-0.42, 1.08, z); ear.rotation.y = Math.PI / 4; cat.add(ear);
    sphere(cat, 0.035, catFace, -0.66, 0.79, z * 0.62);
    for (const x of [-0.25, 0.32]) cylinder(cat, 0.08, 0.09, 0.32, catFur, x, 0.19, z, 8);
  }
  const tail = new THREE.Group(); tail.position.set(0.48, 0.55, 0); cat.add(tail);
  const tailCurve = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.08, 8, 16, Math.PI * 1.2), catFur);
  tailCurve.rotation.z = -0.5; tailCurve.position.set(0.16, 0.15, 0); tail.add(tailCurve);
  cat.position.set(-8, 0, 5); scene.add(cat);
  const catHome = cat.position.clone();
  const heartCanvas=document.createElement('canvas'); heartCanvas.width=64; heartCanvas.height=64;
  const heartContext=heartCanvas.getContext('2d'); heartContext.fillStyle='#eea3a6'; heartContext.font='48px serif'; heartContext.textAlign='center'; heartContext.textBaseline='middle'; heartContext.fillText('♥',32,32);
  const heartTexture=new THREE.CanvasTexture(heartCanvas); heartTexture.colorSpace=THREE.SRGBColorSpace;
  const hearts=[];
  for(let i=0;i<3;i++) {
    const heart=new THREE.Sprite(new THREE.SpriteMaterial({map:heartTexture,transparent:true,depthWrite:false}));
    heart.scale.set(0.55,0.55,1); heart.visible=false; cat.add(heart); hearts.push(heart);
  }
  let petStarted=0, petUntil=0;
  function petCat() { petStarted=performance.now(); petUntil=petStarted+4000; }

  function updateWorld(dt, elapsed) {
    movingBanners.forEach((banner,index)=>{banner.rotation.z=Math.sin(elapsed*.8+index*.9)*.025;});
    fishGroup.rotation.y += dt * 0.13;
    fishTails.forEach((tail,i) => { tail.rotation.y=Math.sin(elapsed*5+i)*0.45; });
    ripples.forEach((ring,i) => ring.scale.setScalar(0.9+((elapsed*0.13+i*0.31)%0.5)));
    waterGlints.rotation.y=elapsed*.035; waterGlintMaterial.opacity=.19+.055*(.5+.5*Math.sin(elapsed*.8));
    for(let i=0;i<30;i++) {
      const t=(elapsed*0.075+i*0.137)%1, angle=i*2.399+elapsed*0.14;
      petalPositions[i*3]=Math.sin(angle)*(1.3+t*2.5)+t*1.3;
      petalPositions[i*3+1]=5-t*4.9;
      petalPositions[i*3+2]=Math.cos(angle)*2.3;
    }
    petalGeometry.attributes.position.needsUpdate=true;
    for (let i=0;i<9;i++) {
      const t=(elapsed*0.22+i/9)%1;
      smokePositions[i*3]=Math.sin(elapsed*0.7+i)*0.15*t;
      smokePositions[i*3+1]=t*2.25;
      smokePositions[i*3+2]=Math.cos(elapsed*0.5+i)*0.12*t;
    }
    smokeGeometry.attributes.position.needsUpdate=true;
    danceLights.forEach((spot,i)=>{spot.material.opacity=.14+.18*(.5+.5*Math.sin(elapsed*2+i*1.7));spot.position.z=1+Math.sin(elapsed*.8+i)*.38;});
    if(danceActive) {musicHost.leftArm.rotation.z=.35+Math.sin(elapsed*3)*.65;musicHost.rightArm.rotation.z=-.35-Math.sin(elapsed*3+1)*.65;musicHost.head.rotation.z=Math.sin(elapsed*2)*.12;}
    if(releaseActive) {
      releaseTime+=dt;
      // One stroke per 1.25 seconds, matching the activity's sound cue.
      const phase=(releaseTime%1.25)/1.25;
      const stroke=phase<.12?Math.sin(phase/.12*Math.PI/2):Math.exp(-(phase-.12)*8);
      releaseHost.rightArm.rotation.x=.25+stroke*1.1;
      releaseHost.head.rotation.z=-stroke*.06;
      releaseDummy.rotation.z=Math.sin(phase*10)*.12*Math.exp(-phase*5);
      impact.visible=phase<.18;impactMaterial.opacity=phase<.18?(1-phase/.18)*.9:0;
      impact.scale.setScalar(.6+phase*2.2);
      const scattering=phase<.24;flecks.visible=scattering;
      if(scattering){
        for(let i=0;i<8;i++){const angle=i*Math.PI/4,travel=.12+phase*2.5;fleckPose.position.set(-.88+Math.cos(angle)*travel,1.25+Math.sin(angle)*travel,.10+.05*Math.sin(i));fleckPose.scale.setScalar(1-phase*2.7);fleckPose.rotation.set(phase*4,0,angle);fleckPose.updateMatrix();flecks.setMatrixAt(i,fleckPose.matrix);}
        flecks.instanceMatrix.needsUpdate=true;
      }
    }
    sweeper.rightArm.rotation.x = -0.45 + Math.sin(elapsed * 2.2) * 0.3;
    sweeper.rightArm.rotation.z = -0.25 + Math.sin(elapsed * 2.2) * 0.24;
    sweeper.head.rotation.y = Math.sin(elapsed * 0.6) * 0.08;
    teacher.leftArm.rotation.z = 0.4 + Math.sin(elapsed * 0.9) * 0.7;
    teacher.rightArm.rotation.z = -0.4 - Math.sin(elapsed * 0.9) * 0.7;
    teacher.head.rotation.y = Math.sin(elapsed * 0.45) * 0.1;
    oracleHost.head.rotation.y = Math.sin(elapsed * .6) * .12;
    oracleHost.rightArm.rotation.x = -.5 + Math.sin(elapsed * 1.2) * .2;
    tarotHost.head.rotation.y = Math.sin(elapsed * .5 + 1) * .1;
    tarotHost.leftArm.rotation.x = -.35 + Math.sin(elapsed * .8) * .12;
    const petting=performance.now()<petUntil;
    if(!petting) {
      cat.position.x = catHome.x + Math.sin(elapsed * 0.34) * 1.2;
      cat.position.z = catHome.z + Math.sin(elapsed * 0.17) * 0.6;
      cat.rotation.y = Math.cos(elapsed * 0.34) > 0 ? Math.PI : 0;
    }
    cat.scale.y=THREE.MathUtils.lerp(cat.scale.y,petting?0.83:1,0.12);
    tail.rotation.x = Math.sin(elapsed * (petting?7:2)) * (petting?0.55:0.28);
    hearts.forEach((heart,i) => {
      heart.visible=petting;
      if(petting) {
        const phase=((performance.now()-petStarted)/1200+i/3)%1;
        heart.position.set(Math.sin(i*2.4+elapsed)*0.34,1.2+phase*1.15,Math.cos(i*2.4)*0.2);
        heart.material.opacity=Math.sin(phase*Math.PI)*0.9;
      }
    });
  }
  const turnSweeperToward=(x,z)=>{ const dx=x-sweeper.group.position.x,dz=z-sweeper.group.position.z; if(Math.hypot(dx,dz)>0.01) sweeper.group.rotation.y=Math.atan2(-dx,-dz); };
  const resetSweeper=()=>{ sweeper.group.rotation.y=-0.5; };
  return { roofGroups, interiorSigns, fishGroup, updateWorld, petCat, gateFront, distantRidges, treeCrowns, turnSweeperToward, resetSweeper, setReleaseActive, setDanceActive, hangWish, points: [
    { id: 'dance', name: '云间乐台', x: 27, z: 19, radius: 3 },
    { id: 'release', name: '打小人', x: -27, z: 13.5, radius: 2.8 },
    { id: 'breeze-hall', name: '清风殿', x: -27, z: -14.6, radius: 2.7 },
    { id: 'joy-hall', name: '长乐殿', x: 27, z: -14.6, radius: 2.7 },
    { id: 'cloud-hall', name: '望云殿', x: 0, z: -27.5, radius: 2.7 },
    { id: 'oracle-stall', name: '问心小摊', x: -23, z: -7.9, radius: 2.7 },
    { id: 'tarot-stall', name: '星象小摊', x: 23, z: -7.9, radius: 2.7 },
    { id: 'cat', name: '摸摸橘猫', x: -8, z: 5, radius: 3.0 },
    { id: 'tea', name: '喝一杯茶', x: -19, z: 4.7, radius: 2.8 },
    { id: 'monk', name: '与扫庭人聊聊', x: -8.4, z: 11.2, radius: 2.8 },
    { id: 'incense', name: '敬香', x: 0, z: 1, radius: 3.4 },
    { id: 'fortune', name: '摇签', x: 2.45, z: -16.65, radius: 2.8 },
    { id: 'wood', name: '敲木鱼', x: 18.05, z: 12.45, radius: 2.8 },
    { id: 'drum', name: '敲鼓', x: -12.8, z: 9.3, radius: 2.8 },
    { id: 'temple', name: '静心礼拜', x: 0, z: -18, radius: 3 },
    { id: 'blessing', name: '福缘殿', x: -15, z: -20, radius: 3 },
    { id: 'moon', name: '月华堂', x: 15, z: -20, radius: 3 },
    { id: 'pond', name: '喂锦鲤', x: 12, z: 1, radius: 3.5 },
    { id: 'reading', name: '翻阅心语', x: -15, z: -3, radius: 3 },
    { id: 'bell', name: '敲响心钟', x: -16, z: 12, radius: 3 },
    { id: 'alchemy', name: '炼制香丸', x: 15, z: -3, radius: 3 },
    { id: 'wish', name: '写下心愿', x: 8.5, z: 7, radius: 3 },
    { id: 'practice', name: '舒展身心', x: 16, z: 14, radius: 3 },
  ] };
}

export function createAvatar(THREE) {
  const group = new THREE.Group();
  const materials = {
    skin: new THREE.MeshStandardMaterial({ color: '#f2c8a8', roughness: 0.9 }),
    hair: new THREE.MeshStandardMaterial({ color: '#493a34', roughness: 1 }),
    coat: new THREE.MeshStandardMaterial({ color: '#bb7778', roughness: 1 }),
    trim: new THREE.MeshStandardMaterial({ color: '#ead9bd', roughness: 1 }),
    shoe: new THREE.MeshStandardMaterial({ color: '#624a45', roughness: 1 }),
    black: new THREE.MeshStandardMaterial({ color: '#332d2b' }),
    ornament: new THREE.MeshStandardMaterial({ color: '#d7ae6d', metalness: 0.25, roughness: 0.65 }),
    petal: new THREE.MeshStandardMaterial({ color: '#f1d5c5', roughness: 0.9 }),
    blush: new THREE.MeshStandardMaterial({ color: '#dc958f', roughness: 1 }),
    white: new THREE.MeshStandardMaterial({ color: '#fff8ed', roughness: 0.8 }),
    shadow: new THREE.MeshStandardMaterial({ color: '#755b52', roughness: 0.95 }),
    darkWood: new THREE.MeshStandardMaterial({ color: '#6f4b39', roughness: 0.94 }),
    lining: new THREE.MeshStandardMaterial({ color: '#a9666b', roughness: 1 }),
    embroidery: new THREE.MeshStandardMaterial({ color: '#dac597', roughness: 0.9, metalness: 0.08 }),
  };
  const sphere = (parent, r, material, x, y, z, sx = 1, sy = 1, sz = 1) => {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(r, 16, 12), material); mesh.scale.set(sx, sy, sz); mesh.position.set(x,y,z); mesh.castShadow = true; parent.add(mesh); return mesh;
  };
  const capsule = (parent, radius, length, material, x, y, z) => {
    const mesh = new THREE.Mesh(new THREE.CapsuleGeometry(radius, length, 4, 10), material); mesh.position.set(x,y,z); mesh.castShadow = true; parent.add(mesh); return mesh;
  };
  // Model front faces negative Z, so its back is seen on entry.
  const body = capsule(group, 0.45, 0.35, materials.coat, 0, 1.05, 0);
  // A separate, softly flared lower robe makes the little figure read as clothed
  // from behind as well as from the front without changing the animated limbs.
  const skirt = new THREE.Mesh(new THREE.CylinderGeometry(0.42,0.49,0.35,24), materials.lining);
  skirt.position.y=0.81; skirt.castShadow=true; skirt.receiveShadow=true; group.add(skirt);
  const skirtEdge = new THREE.Mesh(new THREE.TorusGeometry(0.478,0.028,6,28),materials.trim);
  skirtEdge.rotation.x=Math.PI/2; skirtEdge.position.y=0.655; group.add(skirtEdge);
  const pleatAngles=[-0.9,-0.45,0,0.45,0.9,Math.PI-0.7,Math.PI,Math.PI+0.7];
  const pleats=new THREE.InstancedMesh(new THREE.CylinderGeometry(0.009,0.009,0.27,5),materials.trim,pleatAngles.length);
  const pleatTransform=new THREE.Object3D();
  pleatAngles.forEach((angle,i)=>{
    pleatTransform.position.set(Math.sin(angle)*0.465,0.81,Math.cos(angle)*0.465);
    pleatTransform.rotation.set(Math.cos(angle)*0.13,0,-Math.sin(angle)*0.13);
    pleatTransform.updateMatrix(); pleats.setMatrixAt(i,pleatTransform.matrix);
  });
  pleats.instanceMatrix.needsUpdate=true; group.add(pleats);
  const collar = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.06, 8, 20), materials.trim); collar.rotation.x = Math.PI / 2; collar.position.set(0,1.57,0); group.add(collar);
  const belt = new THREE.Mesh(new THREE.CylinderGeometry(0.45,0.45,0.1,20), materials.trim); belt.position.y = 0.94; group.add(belt);
  const sash = new THREE.Mesh(new THREE.BoxGeometry(0.11,0.42,0.045),materials.trim); sash.position.set(0.12,0.74,-0.44); sash.rotation.z=0.16; group.add(sash);
  sphere(group,0.065,materials.ornament,0,1.27,-0.45);

  // Embroidered robe, cuffs and a soft skirt edge give the figure a layered silhouette.
  const hem = new THREE.Mesh(new THREE.CylinderGeometry(0.45,0.47,0.1,24), materials.trim);
  hem.position.set(0,0.72,0); group.add(hem);
  const lapel = new THREE.Mesh(new THREE.BoxGeometry(0.08,0.5,0.055), materials.trim);
  lapel.position.set(-0.09,1.34,-0.44); lapel.rotation.z=-0.45; group.add(lapel);
  const beltKnot = sphere(group,0.11,materials.ornament,0,0.96,-0.47,1,0.7,0.45);
  const knotTail = new THREE.Mesh(new THREE.BoxGeometry(0.065,0.27,0.045), materials.ornament);
  knotTail.position.set(-0.04,0.77,-0.48); knotTail.rotation.z=-0.24; group.add(knotTail);
  for (const x of [-0.34,0.34]) {
    for (const y of [0.82,0.92,1.02]) sphere(group,0.025,materials.ornament,x,y,-0.32,1,1,0.5);
  }
  const backBow = new THREE.Group(); backBow.position.set(0,1.02,0.44); group.add(backBow);
  sphere(backBow,0.11,materials.trim,0,0,0,1,0.75,0.5);
  for (const side of [-1,1]) {
    const loop=sphere(backBow,0.15,materials.trim,side*0.14,0,0,1,0.7,0.45);
    loop.rotation.z=side*0.35;
  }
  // A small embroidered cloud and flowing ribbons are visible in the main
  // third-person camera, where the rear of the coat is seen most often.
  const embroidery = new THREE.Group(); embroidery.position.set(0,1.3,0.438); group.add(embroidery);
  for (const [x,y,s] of [[-0.12,0,0.065],[0,0.045,0.085],[0.12,0,0.065]]) {
    const curl=new THREE.Mesh(new THREE.TorusGeometry(s,0.012,5,14,Math.PI),materials.embroidery);
    curl.position.set(x,y,0); embroidery.add(curl);
  }
  const cloudBase=new THREE.Mesh(new THREE.BoxGeometry(0.28,0.02,0.018),materials.embroidery);
  cloudBase.position.set(0,-0.01,0); embroidery.add(cloudBase);
  for (const side of [-1,1]) {
    const ribbon=new THREE.Mesh(new THREE.BoxGeometry(0.055,0.3,0.025),materials.trim);
    ribbon.position.set(side*0.085,0.8,0.467); ribbon.rotation.z=side*0.18; group.add(ribbon);
  }

  const head = new THREE.Group(); head.position.y = 2.0; group.add(head);
  sphere(head, 0.58, materials.skin, 0, 0, 0, 1, 0.95, 0.93);
  sphere(head, 0.59, materials.hair, 0, 0.19, 0.08, 1.02, 0.72, 0.99);
  sphere(head, 0.23, materials.hair, -0.43, 0.55, 0.03);
  sphere(head, 0.23, materials.hair, 0.43, 0.55, 0.03);
  // Short curved locks frame the face from both sides.
  for (const side of [-1,1]) {
    const lock=sphere(head,0.22,materials.hair,side*0.47,-0.02,-0.27,0.58,1.3,0.58);
    lock.rotation.z=side*0.18;
    sphere(head,0.105,materials.skin,side*0.55,-0.07,-0.02,0.55,0.85,0.75);
  }
  const fringe=sphere(head,0.36,materials.hair,0,0.32,-0.37,1.28,0.38,0.55);
  fringe.rotation.z=-0.08;
  const flower = new THREE.Group(); head.add(flower);
  for (let i = 0; i < 5; i++) {
    const a = i * Math.PI * 2 / 5;
    sphere(flower, 0.075, materials.petal, -0.43 + Math.cos(a) * 0.1, 0.57 + Math.sin(a) * 0.1, -0.17, 1, 0.8, 0.7);
  }
  sphere(flower, 0.065, materials.ornament, -0.43, 0.57, -0.23);
  const hairPin = new THREE.Group(); flower.add(hairPin);
  const pin=new THREE.Mesh(new THREE.CylinderGeometry(0.015,0.015,0.6,8),materials.ornament);
  pin.position.set(-0.37,0.56,-0.1); pin.rotation.z=-1.0; hairPin.add(pin);
  sphere(hairPin,0.045,materials.petal,-0.1,0.72,-0.1);
  for (let i=0;i<3;i++) {
    const bead=sphere(hairPin,0.027,materials.ornament,-0.54-i*0.025,0.43-i*0.09,-0.23);
    bead.scale.y=1.25;
  }
  for (const side of [-1,1]) {
    const tassel = new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.028,0.28,8), materials.ornament);
    tassel.position.set(side*0.53,0.33,-0.03); head.add(tassel);
    sphere(head,0.055,materials.petal,side*0.53,0.18,-0.03,1,1.2,1);
  }
  const rabbitHat = new THREE.Group(); head.add(rabbitHat);
  const hatMaterial = new THREE.MeshStandardMaterial({color:'#d7e1d0',roughness:1});
  const earInner = new THREE.MeshStandardMaterial({color:'#d5aeab',roughness:1});
  sphere(rabbitHat, 0.55, hatMaterial, 0, 0.24, 0.08, 1.12, 0.65, 1);
  for (const x of [-0.27, 0.27]) {
    sphere(rabbitHat, 0.18, hatMaterial, x, 0.84, 0.08, 0.8, 2.2, 0.8);
    sphere(rabbitHat, 0.12, earInner, x, 0.87, -0.06, 0.7, 2.1, 0.4);
  }
  const hatBand=new THREE.Mesh(new THREE.TorusGeometry(0.53,0.032,7,24),materials.trim);
  hatBand.rotation.x=Math.PI/2; hatBand.position.set(0,0.17,0.09); rabbitHat.add(hatBand);
  sphere(rabbitHat,0.055,materials.petal,0,0.33,-0.465,1,0.8,0.4);
  const cap = new THREE.Group(); head.add(cap);
  const capMaterial = new THREE.MeshStandardMaterial({color:'#c79862',roughness:1});
  sphere(cap,0.56,capMaterial,0,0.25,0.08,1.1,0.68,1);
  for (const x of [-0.37, 0.37]) {
    sphere(cap,0.19,capMaterial,x,0.57,0.05,1,1,0.8);
    sphere(cap,0.10,materials.petal,x,0.59,-0.09,1,1,0.45);
  }
  const capBand=new THREE.Mesh(new THREE.TorusGeometry(0.54,0.035,7,24),materials.trim);
  capBand.rotation.x=Math.PI/2; capBand.position.set(0,0.17,0.08); cap.add(capBand);
  sphere(cap,0.07,materials.trim,0,0.33,-0.475,1.4,0.65,0.4);
  rabbitHat.visible = false; cap.visible = false;

  for (const side of [-1,1]) {
    sphere(head, 0.065, materials.black, side*0.20, -0.035, -0.515, 0.75, 1.28, 0.48);
    sphere(head, 0.022, materials.white, side*0.185, 0.003, -0.552, 0.85, 1.15, 0.5);
    sphere(head, 0.011, materials.white, side*0.215, -0.062, -0.551, 1, 1, 0.45);
    sphere(head, 0.07, materials.blush, side*0.32, -0.18, -0.47, 1.15, 0.43, 0.32);
    const brow=new THREE.Mesh(new THREE.TorusGeometry(0.075,0.009,5,14,Math.PI*0.8),materials.hair);
    brow.position.set(side*0.2,0.11,-0.51); brow.rotation.z=0.32; head.add(brow);
    sphere(head,0.026,materials.ornament,side*0.55,-0.15,-0.075,0.8,1.2,0.6);
  }
  sphere(head, 0.032, materials.skin, 0, -0.16, -0.55, 1, 0.8, 0.5);
  const smile = new THREE.Mesh(new THREE.TorusGeometry(0.068, 0.012, 6, 18, Math.PI), materials.shadow);
  smile.position.set(0,-0.215,-0.538); smile.rotation.z=Math.PI; head.add(smile);
  function limb(x, y, material, isArm) {
    const pivot = new THREE.Group(); pivot.position.set(x, y, 0); group.add(pivot);
    capsule(pivot, isArm ? 0.19 : 0.21, isArm ? 0.36 : 0.35, material, 0, -0.3, 0);
    if (isArm) {
      const cuff=new THREE.Mesh(new THREE.CylinderGeometry(0.19,0.19,0.08,16),materials.trim);
      cuff.position.y=-0.48; pivot.add(cuff);
      const seam=new THREE.Mesh(new THREE.CylinderGeometry(0.193,0.193,0.025,16),materials.ornament);
      seam.position.y=-0.42; pivot.add(seam);
    }
    sphere(pivot, isArm ? 0.16 : 0.19, isArm ? materials.skin : materials.shoe, 0, -0.58, isArm ? 0 : -0.08, 1, 0.75, 1.2);
    return pivot;
  }
  const leftArm = limb(-0.52, 1.4, materials.coat, true);
  const rightArm = limb(0.52, 1.4, materials.coat, true);
  const leftLeg = limb(-0.22, 0.68, materials.coat, false);
  const rightLeg = limb(0.22, 0.68, materials.coat, false);
  // Optional interaction props use the same hand pivot as the character's animation.
  const props = {};
  const makeProp = name => { const item = new THREE.Group(); item.name=name; item.visible=false; item.position.set(0,-0.61,-0.13); rightArm.add(item); props[name]=item; return item; };
  const incenseProp=makeProp('incense');
  for (const x of [-0.045,0,0.045]) {
    const stick=new THREE.Mesh(new THREE.CylinderGeometry(0.012,0.014,0.65,7),materials.darkWood);
    stick.position.set(x,0.34,0); incenseProp.add(stick);
    sphere(incenseProp,0.019,materials.ornament,x,0.67,0);
  }
  const fanProp=makeProp('fan');
  const fanHandle=new THREE.Mesh(new THREE.CylinderGeometry(0.025,0.03,0.32,8),materials.darkWood);
  fanHandle.position.y=0.12; fanProp.add(fanHandle);
  const fanFace=new THREE.Mesh(new THREE.SphereGeometry(0.27,20,12),materials.petal);
  fanFace.scale.set(1,1.15,0.12); fanFace.position.y=0.47; fanProp.add(fanFace);
  const cupProp=makeProp('cup');
  const cupBody=new THREE.Mesh(new THREE.CylinderGeometry(0.15,0.11,0.26,16),materials.trim);
  cupBody.position.y=0.11; cupProp.add(cupBody);
  const cupRim=new THREE.Mesh(new THREE.TorusGeometry(0.15,0.025,8,20),materials.ornament);
  cupRim.rotation.x=Math.PI/2; cupRim.position.y=0.25; cupProp.add(cupRim);
  const bookProp=makeProp('book');
  const book=new THREE.Mesh(new THREE.BoxGeometry(0.42,0.3,0.08),materials.trim);
  book.position.set(0,0.12,0); book.rotation.x=-0.35; bookProp.add(book);
  const bookSpine=new THREE.Mesh(new THREE.BoxGeometry(0.035,0.3,0.09),materials.ornament);
  bookSpine.position.set(0,0.12,-0.05); bookSpine.rotation.x=-0.35; bookProp.add(bookSpine);
  const fortuneProp=makeProp('fortune');
  const fortuneBody=new THREE.Mesh(new THREE.CylinderGeometry(0.18,0.15,0.42,16),materials.darkWood);
  fortuneBody.position.y=0.22; fortuneProp.add(fortuneBody);
  const fortuneRim=new THREE.Mesh(new THREE.TorusGeometry(0.18,0.026,8,20),materials.ornament);
  fortuneRim.rotation.x=Math.PI/2; fortuneRim.position.y=0.44; fortuneProp.add(fortuneRim);
  const fortuneBand=new THREE.Mesh(new THREE.CylinderGeometry(0.172,0.169,0.045,16),materials.ornament);
  fortuneBand.position.y=0.1; fortuneProp.add(fortuneBand);
  for (const [x,z,height] of [[-0.085,-0.03,0.72],[0.015,0.07,0.79],[0.08,-0.02,0.69],[-0.045,0.06,0.75]]) {
    const fortuneStick=new THREE.Mesh(new THREE.CylinderGeometry(0.018,0.018,height-0.38,7),materials.trim);
    fortuneStick.position.set(x,(height+0.38)/2,z); fortuneProp.add(fortuneStick);
  }
  const malletProp=makeProp('mallet');
  const malletHandle=new THREE.Mesh(new THREE.CylinderGeometry(0.036,0.04,0.58,9),materials.darkWood);
  malletHandle.position.y=0.24; malletHandle.rotation.z=-0.18; malletProp.add(malletHandle);
  const malletHead=new THREE.Mesh(new THREE.CylinderGeometry(0.14,0.14,0.31,12),materials.darkWood);
  malletHead.position.set(0.05,0.54,0); malletHead.rotation.z=Math.PI/2-0.18; malletProp.add(malletHead);
  for (const side of [-1,1]) {
    const end=new THREE.Mesh(new THREE.CylinderGeometry(0.145,0.145,0.025,12),materials.ornament);
    end.position.set(0.05+side*0.155,0.54,0); end.rotation.z=Math.PI/2-0.18; malletProp.add(end);
  }
  function setProp(name) {
    for (const [key,item] of Object.entries(props)) item.visible = key === name;
  }
  // The five later variants have their own silhouette details. Build them lazily:
  // most garden residents use the default look and do not need unused meshes.
  const variantDecor = {};
  function makeVariantDecor(id) {
    const bodyDetail=new THREE.Group(), headDetail=new THREE.Group();
    bodyDetail.name=`avatar-detail-${id}-body`;headDetail.name=`avatar-detail-${id}-head`;
    group.add(bodyDetail);head.add(headDetail);
    const ellipsoid=(parent,r,material,x,y,z,sx=1,sy=1,sz=1)=>sphere(parent,r,material,x,y,z,sx,sy,sz);
    const strip=(parent,w,h,d,material,x,y,z,rotation=0)=>{
      const part=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);
      part.position.set(x,y,z);part.rotation.z=rotation;parent.add(part);return part;
    };
    if(id==='plum') {
      // A butterfly-shaped ornament and a long asymmetric ribbon.
      for(const side of [-1,1]) {
        const wing=ellipsoid(headDetail,.14,materials.petal,.42+side*.12,.6,-.27,1,.7,.38);
        wing.rotation.z=side*.5;
      }
      ellipsoid(headDetail,.045,materials.ornament,.42,.6,-.34,.65,1.15,.5);
      strip(bodyDetail,.08,.5,.04,materials.petal,.3,.87,.48,-.18);
      ellipsoid(bodyDetail,.075,materials.ornament,.3,1.12,.49,1,.7,.5);
    } else if(id==='sky') {
      // A little scarf with two trailing ends gives the rabbit hood a second outline.
      const scarf=new THREE.Mesh(new THREE.TorusGeometry(.32,.06,7,20),materials.petal);
      scarf.rotation.x=Math.PI/2;scarf.position.set(0,1.57,.03);bodyDetail.add(scarf);
      for(const side of [-1,1]) strip(bodyDetail,.10,.55,.04,materials.petal,side*.16,1.25,.48,side*.14);
      ellipsoid(headDetail,.07,materials.ornament,.28,1.12,.08);
    } else if(id==='ink') {
      // Rounded shoulder cape and a compact satchel, readable from behind.
      ellipsoid(bodyDetail,.51,materials.lining,0,1.44,.12,1.3,.32,.8);
      strip(bodyDetail,.075,.73,.04,materials.trim,-.23,1.18,.47,-.48);
      const bag=new THREE.Mesh(new THREE.BoxGeometry(.32,.3,.14),materials.darkWood);
      bag.position.set(.23,.93,.47);bodyDetail.add(bag);
      ellipsoid(bodyDetail,.045,materials.ornament,.23,.94,.55,1,1,.5);
    } else if(id==='mint') {
      // Leaf sprigs and a small flower basket make the silhouette distinct.
      const leafMaterial=new THREE.MeshStandardMaterial({color:'#769878',roughness:1});
      for(const side of [-1,1]) {
        const leaf=ellipsoid(headDetail,.12,leafMaterial,.42+side*.13,.67,-.10,.65,1.4,.32);
        leaf.rotation.z=-side*.7;
      }
      const basket=new THREE.Mesh(new THREE.CylinderGeometry(.19,.15,.24,12),materials.darkWood);
      basket.position.set(-.3,.83,.49);bodyDetail.add(basket);
      const handle=new THREE.Mesh(new THREE.TorusGeometry(.15,.025,6,16,Math.PI),materials.ornament);
      handle.position.set(-.3,.95,.49);bodyDetail.add(handle);
      for(const x of [-.38,-.3,-.22])ellipsoid(bodyDetail,.055,materials.petal,x,1,.49);
    } else if(id==='cloud') {
      // A broad soft brim and long side ties distinguish the grey bear cap.
      const brim=new THREE.Mesh(new THREE.TorusGeometry(.57,.065,8,24),materials.trim);
      brim.rotation.x=Math.PI/2;brim.position.set(0,.13,.08);headDetail.add(brim);
      for(const side of [-1,1]) {
        strip(headDetail,.09,.42,.05,materials.trim,side*.5,-.04,.09,side*.12);
        ellipsoid(headDetail,.055,materials.petal,side*.52,-.26,.09,1,1.3,.8);
      }
      const pack=new THREE.Mesh(new THREE.SphereGeometry(.23,14,10),materials.trim);
      pack.scale.set(1,.85,.45);pack.position.set(0,1.17,.49);bodyDetail.add(pack);
      ellipsoid(bodyDetail,.045,materials.ornament,0,1.19,.6,1,1,.5);
    }
    return [bodyDetail,headDetail];
  }
  function setVariant(id) {
    const variants={
      rose:['#bb7778','#a9666b','flower'], sage:['#75968a','#638476','rabbit'], amber:['#c89a65','#ae8051','bear'],
      plum:['#8d789c','#746181','flower'], sky:['#7896aa','#607e94','rabbit'], ink:['#52677a','#405264','bear'],
      mint:['#88a88d','#708e77','flower'], cloud:['#a9a398','#8b857e','bear']
    };
    const detailId=Object.hasOwn(variants,id)?id:'rose';
    const [coat,lining,headwear]=variants[detailId];
    materials.coat.color.set(coat); materials.lining.color.set(lining);
    flower.visible=headwear==='flower'; rabbitHat.visible=headwear==='rabbit'; cap.visible=headwear==='bear';
    if(['plum','sky','ink','mint','cloud'].includes(detailId) && !variantDecor[detailId]) variantDecor[detailId]=makeVariantDecor(detailId);
    for(const [name,parts] of Object.entries(variantDecor)) parts.forEach(part=>{part.visible=name===detailId;});
  }
  return { group, head, leftArm, rightArm, leftLeg, rightLeg, setVariant, setProp };
}
