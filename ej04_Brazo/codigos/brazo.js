var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0xDDDDDD, 1);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(80, WIDTH / HEIGHT);
camera.position.z = 4.5;
camera.position.x = -1.2;
camera.position.y = 2;
camera.rotation.set(0, -0.5, 0);
scene.add(camera);

var controls = new THREE.OrbitControls(camera, renderer.domElement);

// ** Cubo y esfera **
/*
* BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments)
    width (float): Ancho; es decir, la longitud de las aristas paralelas al eje X. Opcional; el valor predeterminado es 1.
    height (float): altura; es decir, la longitud de las aristas paralelas al eje Y. Opcional; el valor predeterminado es 1.
    depth (float): profundidad; es decir, la longitud de las aristas paralelas al eje Z. Opcional; el valor predeterminado es 1.
    widthSegments (integer): Número de caras rectangulares segmentadas a lo largo del ancho de los lados. Opcional; el valor predeterminado es 1.
    heightSegments (integer): Número de caras rectangulares segmentadas a lo largo de la altura de los lados. Opcional; el valor predeterminado es 1.
    depthSegments (integer): Número de caras rectangulares segmentadas a lo largo de la profundidad de los lados. Opcional; por defecto es 1.
*/

// ** Datos **
// Array figuras
var cubos = [];
// Dimensiones cubos
const w = 0.2; // Ancho del cubo
const h = 0.2; // Alto del cubo
const d = 0.2; // Profundo del cubo
// Escalado cubos
const vs = [1, 5, 1]; // Array de escalado
const sx = 1; // Escalado en X
const sy = 5; // Escalado en Y
const sz = 1; // Escalado en Z
// Ángulos rotación
const a = 15; // Angulo Alfa a rotar en grados
const b = 60; // Angulo Beta a rotar en grados
const g = 60; // Angulo Gamma a rotar en grados
const ar = (90 - a) * Math.PI / 180; // Angulo Alfa a rotar en radianes
const br = (90 - b) * Math.PI / 180; // Angulo Beta a rotar en radianes
const gr = (90 - g) * Math.PI / 180; // Angulo Gamma a rotar en radianes
// Colores
color = [0xCC99FF, 0x7F0C29]; // Array para almacenar colores
// Materiales
material = []; // Array para almacenar materiales
for (i = 0; i < 3; i++) {
    material.push(new THREE.MeshPhongMaterial({ color: color[i], wireframe: true }));
    //material.push(new THREE.MeshPhongMaterial({ color: color[i] }));
}

// ** Dibujar cubos **
var geomcube = new THREE.BoxGeometry(w, h, d, 5, 20);
for (i = 0; i < 2; i++) {
    cubos.push(new THREE.Mesh(geomcube, material[i]));
}

// ** Adicionar cubos ** 
for (i = 0; i < 2; i++) {
    scene.add(cubos[i]);
}

// ** Escalar cubos **
// Escalado - L sería h*sy, en este caso L = 5*0.2 = 1
for (i = 0; i < 2; i++) {
    cubos[i].scale.y = 5; // Escalar cubis solamnet en Y
}

// ** Traslaciones de cubos **
cubos[0].translateY(h * sy / 2); // Traslacion cubo 1
cubos[1].translateY(1.5 * h * sy); // Traslacion cubo 2

// ** Girar y trasladar cubo 2 **
cubos[1].rotateX(br);
cubos[1].position.set(0, 1.5 * h * sy, 0.5 * h * sy * Math.sin(br));

// ** Agrupar en 'brazo' **
const brazo = new THREE.Group(); // Crear grupo 'brazo'
for (i = 0; i < 2; i++) {
    brazo.add(cubos[i]); // Adiciona los cubos al grupo 'brazo'
}
scene.add(brazo);

// ** Rotaciones grupo 'brazo' **
brazo.rotateY(br);
brazo.rotateX(gr);

// ** Luz **
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(-1, 2, 4);
scene.add(light);

// ** Cuadrícula **
const size = 150;
const divisions = 160;
const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);
const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}


render();