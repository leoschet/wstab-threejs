var Tetris = {};

Tetris.init = function ()
{
	var WIDTH = window.innerWidth;
	var HEIGHT = window.innerHeight;

	var VIEW_ANGLE = 45,
		ASPECT = WIDTH/HEIGHT,
		NEAR = 0.1
		FAR = 10000;

	Tetris.renderer = new THREE.WebGLRenderer({antialias : true});
	Tetris.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	Tetris.scene = new THREE.Scene();
	
	Tetris.controls = new THREE.OrbitControls( Tetris.camera );

	Tetris.camera.position.z = 600;
	Tetris.scene.add(Tetris.camera);
	Tetris.renderer.setSize(WIDTH, HEIGHT);

	document.body.appendChild(Tetris.renderer.domElement);

	var boundingBoxConfig = {
	  width: 360,
	  height: 360,
	  depth: 1200,
	  splitX: 6,
	  splitY: 6,
	  splitZ: 20
	};

	Tetris.boundingBoxConfig = boundingBoxConfig;
	Tetris.blockSize = boundingBoxConfig.width/boundingBoxConfig.splitX;

	var boundingBox = new THREE.Mesh(
	  new THREE.CubeGeometry(
	    boundingBoxConfig.width, boundingBoxConfig.height, boundingBoxConfig.depth, 
	    boundingBoxConfig.splitX, boundingBoxConfig.splitY, boundingBoxConfig.splitZ), 
	  new THREE.MeshBasicMaterial( { color: 0xffaa00, wireframe: true } )
	);

	Tetris.scene.add(boundingBox);

	// first render
	Tetris.renderer.render(Tetris.scene, Tetris.camera);


	Tetris.gameStepTime = 1000;
	Tetris.frameTime = 0; // ms
	Tetris.cumulatedFrameTime = 0; // ms
	Tetris._lastFrameTime = Date.now(); // timestamp
	 
	Tetris.gameOver = false;

	Tetris.Board.init(boundingBoxConfig.splitX, boundingBoxConfig.splitY, boundingBoxConfig.splitZ);
	Tetris.Block.generate(); 
	Tetris.animate();
};

Tetris.animate = function()
{
  var time = Date.now();
  Tetris.frameTime = time - Tetris._lastFrameTime;
  Tetris._lastFrameTime = time;
  Tetris.cumulatedFrameTime += Tetris.frameTime;
 
  Tetris.controls.update();

  while(Tetris.cumulatedFrameTime > Tetris.gameStepTime)
  {
    // block movement will go here
    Tetris.cumulatedFrameTime -= Tetris.gameStepTime;
  	Tetris.Block.move(0,0,-1);
  }
  

  Tetris.renderer.render(Tetris.scene, Tetris.camera);
     
  if(!Tetris.gameOver) window.requestAnimationFrame(Tetris.animate);
}


Tetris.staticBlocks = [];
Tetris.zColors = [
  0x6666ff, 0x66ffff, 0xcc68EE, 0x666633, 0x66ff66, 0x9966ff, 0x00ff66, 0x66EE33, 0x003399, 0x330099, 0xFFA500, 0x99ff00, 0xee1289, 0x71C671, 0x00BFFF, 0x666633, 0x669966, 0x9966ff
];

Tetris.addStaticBlock = function(x, y, z)
{
  if(Tetris.staticBlocks[x] === undefined) Tetris.staticBlocks[x] = [];
  if(Tetris.staticBlocks[x][y] === undefined) Tetris.staticBlocks[x][y] = [];
 
  var mesh = THREE.SceneUtils.createMultiMaterialObject(new THREE.CubeGeometry( Tetris.blockSize, Tetris.blockSize, Tetris.blockSize), [
    new THREE.MeshBasicMaterial({color: 0x000000, shading: THREE.FlatShading, wireframe: true, transparent: true}),
    new THREE.MeshBasicMaterial({color: Tetris.zColors[z]}) 
  ] );
     
  mesh.position.x = (x - Tetris.boundingBoxConfig.splitX/2) * Tetris.blockSize + Tetris.blockSize/2;
  mesh.position.y = (y - Tetris.boundingBoxConfig.splitY/2) * Tetris.blockSize + Tetris.blockSize/2;
  mesh.position.z = (z - Tetris.boundingBoxConfig.splitZ/2) * Tetris.blockSize + Tetris.blockSize/2;
  mesh.overdraw = true;
     
  Tetris.scene.add(mesh);   
  Tetris.staticBlocks[x][y][z] = mesh;
};

