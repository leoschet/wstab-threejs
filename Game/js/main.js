var fieldWidth = 640;
var fieldHeight = 420;

var planeWidth = fieldWidth,
    planeHeight = fieldHeight,
    planeQuality = 10;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, fieldWidth/fieldHeight, 0.1, 10000);

camera.position.z = 320;

var renderer = new THREE.WebGLRenderer({antialias : true});
renderer.setSize(fieldWidth, fieldHeight);

var c = document.getElementById("gameCanvas");
c.appendChild(renderer.domElement);

// create the sphere's material
var ball = new THREE.Mesh(new THREE.SphereGeometry(5, 6, 6), 
                          new THREE.MeshLambertMaterial({ color: 0xD43001 }));

scene.add(ball);

// create the playing surface plane
var plane = new THREE.Mesh(
    new THREE.PlaneGeometry(
    planeWidth * 0.95,  // 95% of table width, since we want to show where the ball goes out-of-bounds
    planeHeight,
    planeQuality,
    planeQuality),
    planeMaterial);

//scene.add(plane);


var paddleWidth = 10,
    paddleHeight = 30,
    paddleDepth = 10,
    paddleQuality = 1;

// set up paddle 1
paddle1 = new THREE.Mesh(
  new THREE.CubeGeometry(
  paddleWidth,
  paddleHeight,
  paddleDepth,
  paddleQuality,
  paddleQuality,
  paddleQuality),
  paddle1Material);

// add the paddle to the scene
scene.add(paddle1);

// Set up the second paddle
paddle2 = new THREE.Mesh(
  new THREE.CubeGeometry(
  paddleWidth,
  paddleHeight,
  paddleDepth,
  paddleQuality,
  paddleQuality,
  paddleQuality),
  paddle2Material);

// Add the second paddle to the scene
scene.add(paddle2);

// set paddles on each side of the table
// paddle1.position.x = -fieldWidth/2 + paddleWidth
paddle2.position.x = fieldWidth/2 - paddleWidth;
//paddle2.position.x = 190;

// lift paddles over playing surface
paddle1.position.z = paddleDepth;
paddle2.position.z = paddleDepth;


// // create a point light
pointLight = new THREE.PointLight(0xF8D898);

// set its position
pointLight.position.x = -1000;
pointLight.position.y = 0;
pointLight.position.z = 1000;
pointLight.intensity = 2.9;
pointLight.distance = 10000;

// add to the scene
scene.add(pointLight);


var render = function()
{
	requestAnimationFrame( render );
	renderer.render(scene, camera);
};

render();