var winWidth = window.innerWidth;
var winHeight = window.innerHeight;

var renderer;
var scene;
var camera;

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


  document.body.appendChild(renderer.domElement);
  render();
}

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render); // sets up the render loop
}

window.onload = init;