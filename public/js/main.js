// this file is dependent on path ->  "/js/babylon.js" />

"use strict";
//scene setup, must define below variable 
var canvas;
var engine;// must be defined and used below
var scene;
var camera;
var mesh; // or 3d object var
var light;

document.addEventListener("DOMContentLoaded", startBabylonJS, false);

function startBabylonJS() {
    if (BABYLON.Engine.isSupported()) {
        canvas = document.getElementById("renderCanvas"); // we check the users brower to see if they support our engine.

        engine = new BABYLON.Engine(canvas, true);// we used the above var to create a new engine, activate it with "true";
//--------- a scene MUST have a camera
// or u get an error
        scene = new BABYLON.Scene(engine);
        // we create the scene and give it the var engine. Lastly you MUST tell the var scene to render it's self *scene.render();* in the runRenderLoop method . 

//MAIN camera below

//new ArcRotateCamera(name, alpha, beta, radius, target, scene)

        var arcCamera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene); 

        // control height of camera BABYLON.Vector3(x, y, z) 
        //x is (left or right)
        //Y is (up and down)
        //z is (3d dim)

// NOTE - Very important, you need this line below because it allows the user to move around. based on arrow keys mouse movements

        arcCamera.attachControl(canvas); 
        arcCamera.checkCollisions = true;

 

// NOTE - if you have more then one camera activated it goes with 1st one    
        // camera = new BABYLON.FreeCamera("walkAroundCam", new BABYLON.Vector3(0, 1, -5), scene);

        // camera.attachControl(canvas); 


// == this carmera with .applyGravity allows you to walk around instead of fly   
        // camera.attachControl(canvas);

        // camera.checkCollisions = true;

// NOTE - .checkCollisions MUST also be on your mesh to work and pervent going through object 
        // camera.applyGravity = true;


// we can have more then one camera
         // birds eye view camera  
// var camera =  new BABYLON.ArcRotateCamera("Camera", Math.PI, Math.PI / 20, 150, BABYLON.Vector3.Zero(), scene);

//2nd you create light and meshes("floor","cube")              

// ----------------------- floor
//var ground = BABYLON.Mesh.CreateGround("name", sizeOfFloor, scene);
        var ground = new BABYLON.Mesh.CreateGround("ground", 52, 52, 12, scene);

        ground.checkCollisions = true;
// reflections on the meshes needs to have mirror applied to ground mesh
        var mirrorMaterial = new BABYLON.StandardMaterial("mirrorMaterial", scene);
        mirrorMaterial.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
        mirrorMaterial.reflectionTexture = new BABYLON.MirrorTexture("mirror", 1024, scene, true); //Create a mirror texture
        mirrorMaterial.reflectionTexture.mirrorPlane = new BABYLON.Plane(0, -1.0, 0, 0.0);
        mirrorMaterial.reflectionTexture.level = 0.6;//Select the level (0.0 > 1.0) of the reflection
        ground.material = mirrorMaterial;

        // ground.diffuse = new BABYLON.Color3.Black();
// ----------------------- light
//var light = BABYLON.HemisphericLight("light", directionOfLight, scene);
        light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
        // type of light asset .HemisphericLight
        light = new BABYLON.PointLight("pointlight", new BABYLON.Vector3(5, 10, -5), scene);
         // type of light asset .PointLight
         // I am choosing the color of the light for the scence
        light.diffuse = new BABYLON.Color3.Blue(); 
        // This will be the color of my BACKGROUND
// ----------------------- mesh(3d object)

//var cube = BABYLON.MeshBuilder.CreateBox("box", {height: 5, faceColors: myColors}, scene);

        // var cube = new BABYLON.Mesh.CreateBox("box", 2, scene);
var cube = BABYLON.Mesh.CreateSphere("sphere", 16, 2.5, scene, false,  BABYLON.Mesh.DEFAULTSIDE);

        cube.position = new BABYLON.Vector3(0, 3, 0);
 
        cube.checkCollisions = true;
// add materials to meshes
var cubeMat = new BABYLON.StandardMaterial("cubeMat", scene);
//select mesh I want to apply material to
cube.material = cubeMat;
// the color of object when light hits it is caled diffuseColor
cubeMat.diffuseColor = new BABYLON.Color3.Red();
// using .Color3 here to get red
// cubeMat.diffuseTexture = new BABYLON.Texture("/assets/wood.jpg", scene);

// cubeMat.bumpTexture = new BABYLON.Texture("normalMap.png", scene);
cubeMat.wireframe = true;
//add adove mirror to sphere 
mirrorMaterial.reflectionTexture.renderList.push(cube);


//----------
        var cube2 = new BABYLON.Mesh.CreateBox("box", 2, scene);

        cube2.position = new BABYLON.Vector3(-5, 1.5, 0);
 
        cube2.checkCollisions = true;

var cubeMat2 = new BABYLON.StandardMaterial("cubeMat2", scene);
cube2.material = cubeMat2;
cubeMat2.diffuseColor = new BABYLON.Color3.Blue();   
//addd mirror refelection
mirrorMaterial.reflectionTexture.renderList.push(cube2);  

//----------
        var cube3 = new BABYLON.Mesh.CreateBox("box", 2, scene);

        cube3.position = new BABYLON.Vector3(5, 1.5, 0);

        cube3.checkCollisions = true;

var cubeMat3 = new BABYLON.StandardMaterial("cubeMat3", scene);
cube3.material = cubeMat3;
cubeMat3.diffuseColor = new BABYLON.Color3.Green();
//add adove mirror to cube 
mirrorMaterial.reflectionTexture.renderList.push(cube3);  





 

// cube.onPointerDown = function (pickResult) {
//             // if the click hits square execute:
//             if (pickResult.hit) {
//                 console.log('hit');

//             }


//------------------------------------ 
//procedural texture, this is interesting but not sure if I will use it. commenting out for now. 
//what it dose is put dynamic upating texture, this example is of text. 
//------------------------------------
 var dynamicTexture = new BABYLON.DynamicTexture("dynamic texture", 512, scene, true);
        dynamicTexture.hasAlpha = true;
        cubeMat3.diffuseTexture = dynamicTexture;
        cubeMat3.backFaceCulling = false;
        //need for it to work
        var count = 0;

 // place in register before render       
  scene.registerBeforeRender(function () {
            var textureContext = dynamicTexture.getContext();
            var size = dynamicTexture.getSize();
            var text = count.toString();
            textureContext.clearRect(0, 0, size.width, size.height);
            textureContext.font = "bold 120px Calibri";
            var textSize = textureContext.measureText(text);
            textureContext.fillStyle = "white";
            textureContext.fillText(text, (size.width - textSize.width) / 2, (size.height - 120) / 2);
            dynamicTexture.update();
            count++;
        });
//------------------------------------
// -----------------------
        // Lastly, Once the scene is loaded. you have to set a render loop to see it (render) the mesh or object. 
        engine.runRenderLoop(function () {
            // .runRenderLoop will render every Frame
            // this is also were we put the game logic.
            cube.rotation.y += 0.01;
            //we are rotating on every frame here 
            cube.rotation.x += 0.01;

            cube2.rotation.y += 0.03;
            cube3.rotation.x += 0.03;

            scene.render();


            //count++;
// leave this truned OFF
            // engine.clear(new BABYLON.Color3(0.2, 0.2, 0.3), true);
// this code clears the frame and shows a Color3 asset color.
        });
    }
}