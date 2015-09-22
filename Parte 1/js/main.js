var winWidth = window.innerWidth;
var winHeight = window.innerHeight;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, winWidth/winHeight, 0.1, 100);
controls = new THREE.OrbitControls( camera );
controls.userPan = false;
controls.addEventListener( 'change', render );

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
scene.add( square );

var cubeTexture = THREE.ImageUtils.loadTexture('./box.png');
var cubeGeometry = new THREE.BoxGeometry( 5, 5, 5 );
var cubeMaterial = new THREE.MeshLambertMaterial( { color: 0x1ec876, map : cubeTexture } );
var cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
scene.add( cube );

// light changes
//var pointLight = new THREE.PointLight(0xFFFFF);
var ambientLight = new THREE.AmbientLight( 0xFFFFF );
//pointLight.position.z = 10;
//scene.add(pointLight);
scene.add(ambientLight);

// camera changes
camera.position.z = 10;

var render = function()
{
	requestAnimationFrame( render );
	//cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	renderer.render(scene, camera);
};

render();