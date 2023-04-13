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

// ** Esfera **
/*
* SphereGeometry(radius, widthSegments, heightSegments, phiStart : Float, phiLength : Float, thetaStart : Float, thetaLength : Float)
    radius (float): radio de la esfera. El valor predeterminado es 1.
    widthSegments (integer): n�mero de segmentos horizontales. El valor m�nimo es 3 y el predeterminado es 32.
    heightSegments (integer): n�mero de segmentos verticales. El valor m�nimo es 2 y el valor predeterminado es 16.
    phiStart (float): especifique el �ngulo inicial horizontal. El valor predeterminado es 0.
    phiLength (float): especifique el tama�o del �ngulo de barrido horizontal. El valor predeterminado es Math.PI * 2.
    thetaStart (float): especifique el �ngulo de inicio vertical. El valor predeterminado es 0.
    thetaLength (float): especifique el tama�o del �ngulo de barrido vertical. El valor predeterminado es Math.PI.
*
*/

const r = 1; // Radio de la esfera
var geometry = new THREE.SphereGeometry(r);
var material = new THREE.MeshPhongMaterial({ color: 0xCC99FF });
//var material = new THREE.MeshPhongMaterial({ color: 0xCC99FF, wireframe: true });
var sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Posici�n 1 - Figura (e)
const sx = 0.5; // Escalado en X
const sy = 0.5; // Escalado en Y
const sz = 3; // Escalado en Z
sphere.scale.set(sx, sy, sz); // Escalado esfera

// Posici�n 2 - Figura (f)
const a = 60; // Angulo a rotar en grados
const ang = a * Math.PI / 180; // Angulo a rotar en radianes
sphere.rotation.set(-ang, ang, ang); // Rotaci�n de esfera
sphere.translateZ(sz); // Traslaci�n en eje Z

// ** Luz **
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(-1, 2, 4);
scene.add(light);

// ** Cuadr�cula **
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