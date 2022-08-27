//import threejs, gltfloader, orbitcontrols
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.127/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.127/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.127/examples/jsm/controls/OrbitControls.js';



const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(devicePixelRatio);
renderer.setClearColor("#e5e5e5");
document.body.appendChild( renderer.domElement );
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
})


//light
const hlight = new THREE.AmbientLight(0xFFFFFF,1);
scene.add(hlight);

const backlight = new THREE.DirectionalLight(0xffffff,0.4);
backlight.position.set(5,5,5);
scene.add(backlight);


//load 3d model
const loader = new GLTFLoader();
camera.position.z = 100;

let a = loader.load('blender/FairmontFinal.gltf', function ( gltf ) {
    const cubeMesh = gltf.scene.children.find((child) => child.name === "Cube");
    const textEng = gltf.scene.children.find((child) => child.name === "309B");
    scene.add(textEng);
    textEng.name="textEnglish";
    scene.add(cubeMesh);
    scene.position.set(9,10,-10);
    renderer.render(scene, camera);

}, undefined, function ( error ) {
    console.error( error );
} );


//languages
function changelang(){
    let a3 = loader.load('blender/FairmontFinal.gltf', function ( gltf ) {
        const textEng = gltf.scene.children.find((child) => child.name === "309B");
        const textViet = gltf.scene.children.find((child) => child.name === "Viet164");
        const textJap = gltf.scene.children.find((child) => child.name === "TrentArenaJap");
        const textSpan = gltf.scene.children.find((child) => child.name === "TrentSpanish");
        const textFrench = gltf.scene.children.find((child) => child.name === "TrentFrench");

        textEng.name="textEnglish";
        textViet.name="textVietnamese";
        textJap.name="textJapanese";
        textSpan.name="textSpanish";
        textFrench.name="textFrench";

        var language = document.getElementById("langselection").value
        if (language=="english"){
            scene.add(textEng);
        } else if (language == "vietnamese") {
            scene.add(textViet);
        } else if (language == "japanese") {
            scene.add(textJap);
        } else if (language == "french") {
            scene.add(textFrench);
        } else if (language == "spanish") {
            scene.add(textSpan); 
        }

        renderer.render(scene, camera);
        
    }, undefined, function ( error ) {
        console.error( error );
    } );
}

//destination point
var cubeList=[""];
    let a2 = loader.load('blender/fairmontdestpoint.gltf', function ( gltf ) {
        for (var i=1; i<167; i++) {
            var text = "destpoint"+i;
            cubeList.push(gltf.scene.children.find((child) => child.name === text));
            cubeList[i].name = "cubeText" + i; 
            scene.add(cubeList[i]);
            cubeList[i].visible=false;
        }
        renderer.render(scene, camera);
        
        }, undefined, function ( error ) {
            console.error( error );
        } )
        ;
  
function destpoint(obnum) {
    for (var i=1; i<167; i++) {
        cubeList[i].visible = false;
        if (i==obnum) {
            cubeList[i].visible = true;
        }
    }
};
    

const controls = new OrbitControls( camera, renderer.domElement );

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 10, 20, 20 );
controls.update();

function animate() {
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );
}
animate();


//ROOM SEARCH
document.getElementById("roomselection").addEventListener("change", roomSearch);

function roomSearch() {
    var roomNumber = document.getElementById("roomselection").value;
    for (var i = 0; i<167; i++) {
        if (roomNumber == i) {
            destpoint(i);
        }
    }
}

//delete existing language text on screen when changing language
function deleteobject(obj) {
    var selectedObject = scene.getObjectByName(obj);
    scene.remove(selectedObject);
    animate();
}

//change languages
document.getElementById("langselection").addEventListener("change", changelanguage);

function changelanguage() {
    deleteobject("textEnglish");
    deleteobject("textVietnamese");
    deleteobject("textSpanish");
    deleteobject("textFrench");
    deleteobject("textJapanese");

    changelang();
}


