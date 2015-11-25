var winWidth = window.innerWidth;
var winHeight = window.innerHeight;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, winWidth/winHeight, 0.1, 100);

var cubes = new Array();
var selectedCube = 0;

var materialColor = new THREE.Color();
materialColor.setRGB( 1.0, 1.0, 1.0 );
var flatMaterial = new THREE.MeshPhongMaterial( { color: materialColor, specular: 0x0, shading: THREE.FlatShading, side: THREE.DoubleSide } );
var gouraudMaterial = new THREE.MeshLambertMaterial( { color: materialColor, shading: THREE.SmoothShading, side: THREE.DoubleSide } );

controls = new THREE.OrbitControls( camera );
controls.userPan = false;

var renderer = new THREE.WebGLRenderer({antialias : true});
renderer.setSize(winWidth, winHeight);
document.body.appendChild(renderer.domElement);

THREEx.WindowResize(renderer, camera);

// geometry changes

var triangleGeometry = new THREE.Geometry();
triangleGeometry.vertices.push( new THREE.Vector3( 1, 1, 0 ));
triangleGeometry.vertices.push( new THREE.Vector3( 3, 1, 0 ));
triangleGeometry.vertices.push( new THREE.Vector3( 3, 3, 0 ));

triangleGeometry.faces.push(new THREE.Face3( 0, 1, 2));

var squareGeometry = new THREE.Geometry();
squareGeometry.vertices.push( new THREE.Vector3( 0, 0, 0 ) );
squareGeometry.vertices.push( new THREE.Vector3( 1, 0, 0 ) );
squareGeometry.vertices.push( new THREE.Vector3( 1, 1, 0 ) );
squareGeometry.vertices.push( new THREE.Vector3( 0, 1, 0 ) );

squareGeometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
squareGeometry.faces.push( new THREE.Face3( 2, 3, 0 ) );

var square = new THREE.Mesh(squareGeometry, new THREE.MeshBasicMaterial(0x1ec876));
scene.add(square);

var addCubes = function()
{
  var cubeTexture = THREE.ImageUtils.loadTexture('./box.png');
  var cubeGeometry = new THREE.BoxGeometry( 5, 5, 5 );
  var cubeMaterial = new THREE.MeshLambertMaterial( { color: 0x1ec876, map : cubeTexture } );

  var cube = new THREE.Mesh( cubeGeometry, cubeMaterial);
  cubes.push(cube);
  scene.add(cube);
}

new THREE.JSONLoader().load("js/teapot.json", function(geometry)
{
  var teapot = new THREE.Mesh( geometry, gouraudMaterial);
  scene.add(teapot);
});

// light changes

//var pointLight = new THREE.PointLight(0xFFFFF);
var ambientLight = new THREE.AmbientLight( 0xFFFFF );
var light = new THREE.DirectionalLight( 0xFFFFFF, 1.0 );
//pointLight.position.z = 10;
//scene.add(pointLight);
scene.add(ambientLight);
scene.add(light);

// controls

window.addEventListener('keydown', function (event) {
  var key = event.which ? event.which : event.keyCode;
 
  console.info(key);

  switch(key)
  { 
    case 32: // space
      addCubes();
      break;
    case 87:
      cubes[selectedCube].position.z -= 5;
      break;
    case 65:
      cubes[selectedCube].position.x -= 5;
      break;
    case 68:
      cubes[selectedCube].position.x += 5;
      break;
    case 83:
      cubes[selectedCube].position.z += 5;
      break;
    case 85:
      cubes[selectedCube].position.y += 5;
      break;
    case 66:
      cubes[selectedCube].position.y -= 5;
      break;
    case 190:
      selectedCube = Math.min(selectedCube + 1, cubes.length);
      break;
    case 188:
      selectedCube = Math.max(selectedCube -   1, 0);
      break;
  }
}, false);

// camera changes
camera.position.z = 10;

var render = function()
{
	requestAnimationFrame( render );
	renderer.render(scene, camera);
	controls.update();
};

render();
