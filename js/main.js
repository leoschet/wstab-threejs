var winWidth = window.innerWidth;
var winHeight = window.innerHeight;

var renderer;
var scene;
var camera;

var cube;

function init() {
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x000000, 1.0);
  renderer.setSize(winWidth, winHeight);
  renderer.shadowMapEnabled = true;

  camera = new THREE.PerspectiveCamera(45, winWidth/winHeight, 0.1, 1000);
  camera.position.x = 15;
  camera.position.y = 16;
  camera.position.z = 13;
  camera.lookAt(scene.position);

  controls = new THREE.OrbitControls(camera);

  objects();

  lights();

  document.body.appendChild(renderer.domElement);
  render();
}

function objects() {
  // add cube at scene

  var cubeGeometry = new THREE.CubeGeometry(6, 4, 6);
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color : "red",
  });

  cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.castShadow = true;
  scene.add(cube);


  // add plane at scene
  var planeGeometry = new THREE.PlaneGeometry(20, 20);
  var planeMaterial = new THREE.MeshLambertMaterial({color : 0xcccccc});

  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.y = -2;

  scene.add(plane);
}

function lights() {
  // add spotlight

  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(10, 20, 20);
  spotLight.shadowCameraNear = 20;
  spotLight.shadowCameraFar = 50;
  spotLight.castShadow = true;
  scene.add(spotLight);
}

function updateCube() {
  // ToDo
}

function render() {
  updateCube();
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render); // sets up the render loop
}

window.onload = init;