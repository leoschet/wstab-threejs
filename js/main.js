var winWidth = window.innerWidth;
var winHeight = window.innerHeight;

var renderer;
var scene;
var camera;

// objects of scene
var cube, sphere, cloud, bGGeometry;

var controls;

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

  // add cube at scene
  var cubeGeometry = new THREE.CubeGeometry(6, 4, 6);
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color : "red",
  });

  cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.castShadow = true;
  scene.add(cube);

  // background cube
  bGGeometry = new THREE.SphereGeometry(300, 30, 30);
  bg = new THREE.Mesh(bGGeometry, createBGMaterial());
  scene.add(bg);

  // add sphere at scene
  var sphereGeometry = new THREE.SphereGeometry(10, 30, 30);
  //var sphereMaterial = new THREE.MeshNormalMaterial({color: 0x7777ff});
  //var sphereMaterial = new THREE.MeshBasicMaterial({color: "red"});

  sphere = new THREE.Mesh(sphereGeometry, createEarthMaterial());
  scene.add(sphere);

  var cloudGeometry = new THREE.SphereGeometry(10.15, 30, 30);
  cloud = new THREE.Mesh(cloudGeometry, createCloundMaterial());

  scene.add(cloud);

  // add plane at scene
  var planeGeometry = new THREE.PlaneGeometry(20, 20);
  var planeMaterial = new THREE.MeshLambertMaterial({color : 0xcccccc});

  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.y = -2;

  //scene.add(plane);

  // add ambient light

  var ambientLight = new THREE.AmbientLight( 0x111111 );
  scene.add(ambientLight);

  // add spotlight
  // var spotLight = new THREE.SpotLight(0xffffff);
  // spotLight.position.set(10, 20, 20);
  // spotLight.shadowCameraNear = 20;
  // spotLight.shadowCameraFar = 50;
  // spotLight.castShadow = true;
  // scene.add(spotLight);

  // add directional light
  var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position = new THREE.Vector3( 100, 10, -50 );


  scene.add(directionalLight);

  document.body.appendChild(renderer.domElement);
  render();
}

function createEarthMaterial() {

    var earthTexture = THREE.ImageUtils.loadTexture("assets/textures/planets/earthmap4k.jpg");
    var earthMaterial = new THREE.MeshPhongMaterial();
    earthMaterial.map = earthTexture;

    return earthMaterial;
}

function createCloundMaterial() {

    var cloudTexture = THREE.ImageUtils.loadTexture("assets/textures/planets/fair_clouds_4k.png");
    var cloudMaterial = new THREE.MeshPhongMaterial();

    cloudMaterial.map = cloudTexture;
    cloudMaterial.transparent = true;

    return cloudMaterial;
}

function createBGMaterial() {
  var startsTexture = THREE.ImageUtils.loadTexture("assets/textures/planets/starry_background.jpg");
  var material = new THREE.MeshBasicMaterial();

  material.map = startsTexture;
  material.side = THREE.BackSide;

  return material;
}

function updateCube() {
  if(Key.isDown(Key.W)) {
    cube.position.y += 0.5;
  }

  if(Key.isDown(Key.S)) {
    cube.position.y -= 0.5;
  }
}

function updateEarth() {
  sphere.rotation.y += 0.005;
  cloud.rotation.y += 0.005
}

function render() {
  updateCube();
  updateEarth();
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render); // sets up the render loop
}

window.onload = init;