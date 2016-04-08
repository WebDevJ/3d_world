// this file is dependent on path ->  "/js/babylon.js" />

"use strict";
//scene setup, must define below variable 
var canvas;
var engine;// must be defined and used below
var scene;
var camera;
var mesh; // or 3d object var
var light;
//game
var started = true;
console.log(started);

var g = document.getElementById.bind(document);//bind method see :https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind




document.addEventListener("DOMContentLoaded", startBabylonJS, false);

function startBabylonJS() {
    if (BABYLON.Engine.isSupported()) {


        canvas = document.getElementById("renderCanvas"); // we check the users brower to see if they support our engine.

        engine = new BABYLON.Engine(canvas, true);// we used the above var to create a new engine, activate it with "true";
        //keeps the size of my window
        window.addEventListener("resize", function () {
            engine.resize();
        });

         engine.enableOfflineSupport = false;

         //engine.displayLoadingUI();
         engine.loadingUIBackgroundColor = "blue";
         engine.loadingUIText = "HI THERE.... Loading your 3D galaxy. Please CLICK the above icon to start."
         
        

         


    //--------- a scene MUST have a camera
    // or u get an error
        scene = new BABYLON.Scene(engine);
        
        // var gravityVector = new BABYLON.Vector3(0,-9.81, 0);
        // var physicsPlugin = new BABYLON.CannonJSPlugin();
        // scene.enablePhysics(gravityVector, physicsPlugin);


        scene.enablePhysics(new BABYLON.Vector3(0, -1, 0), new BABYLON.CannonJSPlugin());


        //old depricated
        
        scene.gravity = new BABYLON.Vector3(0, 0.1, 0);
        // was -0.1
    var space = new BABYLON.Sound("space", "assets/space.mp3", scene, null, { loop: true, autoplay: true });

    var air = new BABYLON.Sound("air", "assets/air.mp3", scene, null);

        // sound
    //     var space = new BABYLON.Sound("space", "assets/space.mp3", scene, function () {
    //     console.log("Sound is now ready to be played.");
    //     // Play immediatly
    //     space.play();
    //     // Play after 3 seconds
    //     //gunshot.play(3);
    // });

          window.addEventListener("keydown", function (evt) {
        // Press space key to fire
        if (evt.keyCode === 37 || evt.keyCode === 39) {
            air.play();
        }
    });


        // now that I have gravity, next I set up physics
        //old depricated
        //scene.enablePhysics();
        //scene.setGravity(new BABYLON.Vector3(0,-10,0));
        
    // canvas.addEventListener("mousedown", function (evt, pickResult) {
    //         var pickResult = canvas.pick(evt.clientX, evt.clientY);
    //         if (pickResult.hit ) {
    //             engine.hideLoadingUI();
    //         }
    //     });

    
        // scene.getPhysicsEngine().setGravity(new BABYLON.Vector3(0, -0.5, 0, new BABYLON.OimoJSPlugin()));
        
        //cannon.js:5756 Uncaught TypeError: Cannot read property 'calculateWorldAABB' of undefined

        // below I test this on 'cubeTest' mesh

        // we create the scene and give it the var engine. Lastly you MUST tell the var scene to render it's self *scene.render();* in the runRenderLoop method . 

    //MAIN camera below

    //new ArcRotateCamera(name, alpha, beta, radius, target, scene)
    // last find I turned off @ 9am
        // var arcCamera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene); 
        //  arcCamera.attachControl(canvas); 
        // arcCamera.checkCollisions = true;

        // var arcCamera = new BABYLON.GamepadCamera("ArcRotateCamera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene); 


        // var arcCamera = new BABYLON.OculusCamera("ArcRotateCamera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene);


        // var arcCamera = new BABYLON.VirtualJoystickCamera("ArcRotateCamera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene);

        // control height of camera BABYLON.Vector3(x, y, z) 
        //x is (left or right)
        //Y is (up and down)
        //z is (3d dim)

    // NOTE - Very important, you need this line below because it allows the user to move around. based on arrow keys mouse movements

       

 

    // NOTE - if you have more then one camera activated it goes with 1st one    
    var    camera = new BABYLON.FreeCamera("walkAroundCam", new 

            BABYLON.Vector3(13, 150, 7), scene);
        //starting position of game 

        camera.attachControl(canvas); 


    // == this carmera with .applyGravity allows you to walk around instead of fly   

        camera.checkCollisions = true;

    // NOTE - .checkCollisions MUST also be on your mesh to work and pervent going through object 

        camera.applyGravity = true;


    // we can have more then one camera
         // birds eye view camera  
    // var camera =  new BABYLON.ArcRotateCamera("Camera", Math.PI, Math.PI / 20, 150, BABYLON.Vector3.Zero(), scene);

    //2nd you create light and meshes("floor","cube")              

    // ----------------------- floor
    //var ground = BABYLON.Mesh.CreateGround("name", sizeOfFloor, scene);
        var ground = new BABYLON.Mesh.CreateGround("ground", 52, 52, 12, scene);
             // NOT sure may need box for physics to work with collsions
    // var ground = new BABYLON.Mesh.CreateBox("ground", 52, scene);  

     var a =   ground.checkCollisions = true;
    // reflections on the meshes needs to have mirror applied to ground mesh
        var mirrorMaterial = new BABYLON.StandardMaterial("mirrorMaterial", scene);
        mirrorMaterial.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
        mirrorMaterial.reflectionTexture = new BABYLON.MirrorTexture("mirror", 1024, scene, true); //Create a mirror texture
        mirrorMaterial.reflectionTexture.mirrorPlane = new BABYLON.Plane(0, -1.0, 0, 0.0);
        mirrorMaterial.reflectionTexture.level = 0.6;//Select the level (0.0 > 1.0) of the reflection
        ground.material = mirrorMaterial;


        // var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
        // groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        // groundMaterial.diffuseTexture = new BABYLON.Texture("assets/wood.jpg", scene);
        // ground.material = groundMaterial;

        // ground.diffuse = new BABYLON.Color3.Black();
    //
    //created my own little galaxy universe /

    var universe = BABYLON.Mesh.CreateBox("skyBox", 800.0, scene);
    var universeMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    universeMaterial.backFaceCulling = false;
    universeMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/skybox", scene);
    universeMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    universeMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    universeMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    universe.material = universeMaterial;
    // so you don't fall out my world / galaxy  
    //universe.checkCollisions = true;


    // creating stars, hope this works
    // myStars
    var myStars = new BABYLON.ParticleSystem("particles", 4000, scene);
    myStars.particleTexture = new BABYLON.Texture("assets/star.png", scene);
    myStars.minAngularSpeed = -4.5;
    myStars.maxAngularSpeed = 4.5;
    myStars.minSize = 0.5;
    myStars.maxSize = 1.0;
    myStars.minLifeTime = 0.5;
    myStars.maxLifeTime = 2.0;
    myStars.minEmitPower = 0.5;
    myStars.maxEmitPower = 1.0;
    myStars.emitRate = 600;
    myStars.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
    myStars.minEmitBox = new BABYLON.Vector3(-25, 0, -25);
    myStars.maxEmitBox = new BABYLON.Vector3(25, 0, 25);
    myStars.direction1 = new BABYLON.Vector3(0, 1, 0);
    myStars.direction2 = new BABYLON.Vector3(0, 1, 0);
    myStars.color1 = new BABYLON.Color4(0, 0, 0, 1);
    myStars.color2 = new BABYLON.Color4(1, 1, 1, 1);
    myStars.gravity = new BABYLON.Vector3(0, 5, 0);
    myStars.emitter = new BABYLON.Vector3(0, -2, 0);
    myStars.start();
    //wow it worked




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
            cube.applyGravity = true;



    cubeMat.wireframe = true;
    //add adove mirror to sphere 
    mirrorMaterial.reflectionTexture.renderList.push(cube);


     cube.setPhysicsState({ impostor: BABYLON.PhysicsEngine.SphereImpostor, mass: 10, restitution: 0.0 });


    //----------
        var cube2 = new BABYLON.Mesh.CreateBox("box", 2, scene);

        cube2.position = new BABYLON.Vector3(-5, 1.5, 0);
 
        cube2.checkCollisions = true;

    var cubeMat2 = new BABYLON.StandardMaterial("cubeMat2", scene);
    cube2.material = cubeMat2;
    // cubeMat2.diffuseColor = new BABYLON.Color3.Blue();   
    cubeMat2.diffuseTexture = new BABYLON.Texture("assets/wood.jpg", scene);
    //addd mirror refelection
    mirrorMaterial.reflectionTexture.renderList.push(cube2);  

    //----------
        var cube3 = new BABYLON.Mesh.CreateBox("box", 2, scene);

        cube3.position = new BABYLON.Vector3(5, 1.5, 0);

        cube3.checkCollisions = true;

    var cubeMat3 = new BABYLON.StandardMaterial("cubeMat3", scene);
    cube3.material = cubeMat3;
     cubeMat3.diffuseColor = new BABYLON.Color3.Blue();
    cubeMat3.bumpTexture = new BABYLON.Texture("assets/normalMap.jpg", scene);
    //add adove mirror to cube 
    mirrorMaterial.reflectionTexture.renderList.push(cube3);  





 

    // cube.onPointerDown = function (pickResult) {
    //             // if the click hits square execute:
    //             if (pickResult.hit) {
    //                 console.log('hit');

    //             }


    //------------------------------------ 
    //procedural texture, this is interesting but not sure if I will use it. commenting out for now. 
    //what it dose is put a dynamic upating texture, this example is of text. 
    //------------------------------------
 // var dynamicTexture = new BABYLON.DynamicTexture("dynamic texture", 512, scene, true);
 //        dynamicTexture.hasAlpha = true;
 //        cubeMat3.diffuseTexture = dynamicTexture;
 //        cubeMat3.backFaceCulling = false;
 //        //need for it to work
 //        var count = 0;

 // // place in register before render       
 //  scene.registerBeforeRender(function () {
 //            var textureContext = dynamicTexture.getContext();
 //            var size = dynamicTexture.getSize();
 //            var text = count.toString();
 //            textureContext.clearRect(0, 0, size.width, size.height);
 //            textureContext.font = "bold 120px Calibri";
 //            var textSize = textureContext.measureText(text);
 //            textureContext.fillStyle = "white";
 //            textureContext.fillText(text, (size.width - textSize.width) / 2, (size.height - 120) / 2);
 //            dynamicTexture.update();
 //            count++;
 //        });
    //------------------------------------

    var cubeTest = BABYLON.Mesh.CreateSphere("sphere", 16, 2.5, scene, false,  BABYLON.Mesh.DEFAULTSIDE);

        cubeTest.position = new BABYLON.Vector3(13, 150, 10);
        cubeTest.applyGravity = true;
        cubeTest.checkCollisions = true;



//adding physics 4/8
cubeTest.gravity = new BABYLON.Vector3(0, 3, 0);




        // testing physics engine

        // cubeTest.setPhysicsState({impostor: BABYLON.PhysicsEngine.SphereImpostor, mass: 1, friction: 0.5, restitution: 0.7});

            cubeTest.setPhysicsState({ impostor: BABYLON.PhysicsEngine.SphereImpostor, mass: 1, restitution: 0.0 });


    canvas.addEventListener("mousedown", function (evt) {
        var pickResult = scene.pick(evt.clientX, evt.clientY);

        if (pickResult.hit) {
             var dir = pickResult.pickedPoint.subtract(scene.activeCamera.position);
             dir.normalize();
            cubeTest.applyImpulse(dir.scale(1), pickResult.pickedPoint);

            console.log('game hit mesh testing');

            //cube.applyImpulse(dir.scale(1), pickResult.pickedPoint);
             pickResult.pickedMesh.applyImpulse(dir.scale(50), pickResult.pickedPoint);
        }
    });

            // camera.setPhysicsState({ impostor: BABYLON.PhysicsEngine.SphereImpostor, mass: 100, restitution: 0.0 });
//TURNED OFF for game state to work
// ball will not bounce off ground instead end game


             ground.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, mass: 0, restitution: 0.0 });



        //ERROR -   Uncaught TypeError: Cannot use 'in' operator to search for 'friction' in 0.25

        //fixed -> changed to .SphereImpostor
        //ERROR -  cannon.js:5756 Uncaught TypeError: Cannot read property 'calculateWorldAABB' 

        //fixed ->  
         //'scene.getPhysicsEngine().setGravity()'
        
        // new BABYLON.PhysicsImpostor(object: IPhysicsEnabledObject, type: number, options: PhysicsImpostorParameters, scene:BABYLON.Scene);

        //sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, scene);


        // BABYLON.PhysicsImpostor.SphereImpostor;
        // BABYLON.PhysicsImpostor.BoxImpostor;
        // BABYLON.PhysicsImpostor.PlaneImpostor;
        // BABYLON.PhysicsImpostor.MeshImpostor;
        // BABYLON.PhysicsImpostor.CylinderImpostor;
        // BABYLON.PhysicsImpostor.ParticleImpostor;
        // BABYLON.PhysicsImpostor.HeightmapImpostor;


         
         //animation with cube 
    //------------------------------------------
    scene.registerBeforeRender(function () {
     // .runRenderLoop will render every Frame
            // this is also were we put the game logic.
            cube.rotation.y += 0.01;
            //we are rotating on every frame here 
            cube.rotation.x += 0.01;
        //The color is defined at run time with random()
        cube.material.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        // gives me a random color for RGB each frame

    });


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

            if (!started) {
                return;
            }

            checkCollisions(); // to tell if player fell off 

        });


    // document.getElementById("babylonjsLoadingDiv").addEventListener("click", function() {
    //     started = true;
    //     console.log('user clicked I am hiding user screen');
    //      engine.hideLoadingUI();


        //document.getElementById("gameOver").className = "hidden";
        //direction = new BABYLON.Vector3(0, 0, 0);
    //});
           
    // GAme logic
    // Lose
    // I need the carmera to know when I hit the ground
    //var point = cubeTest.position.clone();
    //point.y -= 0.5;


    //     canvas.addEventListener("mousedown", function(evt, pickResult) {
        
    //     console.log('user clicked');
    //     if (pickResult.hit) {
         
    //     }
        
    // });
    
     // camera.onCollide = function() {
     //        if(started === true){    
     //        loser();
     //        }

     //    }

    var winner = function () {
        
        //camera.position = new BABYLON.Vector3(0, 10, 0);
        // change class name so game over div displays


        document.getElementById("youWin").className = "";
        
        //
        //console.log(gameOver);

        //console.log( started +" started set to false , gameOver");

      // ('#restartGame').click(function() {
      //   
      //   });



     //      canvas.addEventListener("mousedown", function (evt) {
     //        console.log('I clicked the winner box');
     //        var pickResult = scene.pick(evt.clientX, evt.clientY);
     //        if (pickResult.hit ) {
     //            scene.reload();
     //        }
     //    });


     //        canvas.onPointerDown = function (evt, pickResult) {
     //            console.log('I clicked the winner box');
        
     //                if (pickResult.hit) {
     //                    //loser();
     //                }
     //        };



     //           canvas.addEventListener("mousedown", function (evt) {
     //                            console.log('I clicked the winner box');

     //        var pickResult = canvas.pick(evt.clientX, evt.clientY);
     //        if (pickResult.hit ) {
     //            loser();
     //        }
     //    });      




     // scene.onPointerDown = function (evt, pickResult) {
     //    // if the click hits the ground object, we change the impact position
     //    console.log('hit')
     //    var pickResult = scene;

     //    if (pickResult.hit) {
     //    engine.displayLoadingUI();
     //        }
     //    };



      g("youWin").onclick= function() {
         //scene.render();
           g("youWin").style.display="none";
        //engine.displayLoadingUI();
         location.reload(); // reload screen


        };




    }; // //////////////////closed WINNER function


   //  var sceneLoaded = function (sceneFile, babylonScene) {
          
   //        }
      
   // filesInput = new BABYLON.FilesInput(engine, null, canvas, sceneLoaded);

   //  window.addEventListener("keydown", function (evt) {
   //          // Press R to reload
   //          if (evt.keyCode === 82) {
   //              filesInput.reload();
   //          }
   //      });

        
    var loser = function () {
        
        //camera.position = new BABYLON.Vector3(0, 10, 0);
        // change class name so game over div displays


        document.getElementById("gameOver").className = "";


          g("gameOver").onclick= function() {
         //scene.render();
           g("gameOver").style.display="none";
        //engine.displayLoadingUI();
              //scene.reload();
              //reload();
               location.reload(); // reload screen 
    
        };// ///////////// closed event listener ONCLICK
        

        //
        //console.log(gameOver);

        console.log( started +" started set to false , gameOver");

        
    };// //////////////// closed LOSER function

    //   scene.onPointerDown = function (evt, pickResult) {
        
    //     if (pickResult.hit) {
    //         //loser();
    //     }
    // };


        //     canvas.addEventListener("mousedown", function (evt) {
        //     var pickResult = scene.pick(evt.clientX, evt.clientY);
        //     if (pickResult.hit ) {
        //         loser();
        //     }
        // });

     // scene.onPointerDown = function (evt, pickResult) {
     //    // if the click hits the ground object, we change the impact position
     //    console.log('hit')
     //    var pickResult = scene;

     //    if (pickResult.hit) {
     //        engine.hideLoadingUI();
     //        }
     //    };

    // Collisions to check if player fell off 
    var checkCollisions = function() {


        // if (BABYLON.Vector3.Distance(cubeTest.position, ground.position) < 1) {

        //     loser();
        //     //GOT this 

        // }

        //GOT this to work !!!
        // 1st test fo user
        if (cubeTest.intersectsMesh(ground, true)) {
            loser(); //TURN OFF FOR NON GAME MODE
            //EXPLOER MODE
            //turn physics on ground off to work


        }

        //2nd test for user, win state
         var point = cube.position.clone();
        //point.y -= 0.5;
        if (ground.intersectsPoint(point)) {
            //loser();
        }
        // if you push the ball off the ground you win    

        if (cube.intersectsMesh(ground, true)) {
            

            //loser(); //TURN OFF FOR NON GAME MODE
            //EXPLOER MODE
            //turn physics on ground off to work
//if i click the ball this triggers

        }

        if (ground.intersectsMesh(ground, true)) {
            


            //loser();


        }

        if (BABYLON.Vector3.Distance(cube.position, ground.position) < 1) {

         //loser(); // only when physics turn false on ground
        //     //GOT this to work

        }


//NOTE -- to self -- could USE THIS CODE -- change ground to !ground - when cube is pushed  off player wins. 
        var point = cubeTest.position;
        //point.y -= 0.5;
         if (ground.intersectsPoint(point)) {

            //loser(); TURNED OF FOR NON GAME MODE
        }



        //    if (BABYLON.Vector3.Distance(m.position, particleSystem.emitter.position) < 20) {

        // if (ground.intersectsPoint(point)) {
        //     //loser();
        //         camera.onCollide = function() {
                
        //         started = false;

        //         if(started === false){    
        //         //loser();
        //         }
        //     }

        // }

           if (BABYLON.Vector3.Distance(cube.position, ground.position) > 50) {

        
            winner();
                

        }





        // Target to match
        // if (BABYLON.Vector3.Distance(arcCamera.position, cube2.emitter) < 1.2) {
        //     loser();
        //     return;
        // }

        // var point = camera.onCollide;
        // //point.y -= 0.5;
        // if (!ground.intersectsPoint(point)) {

        //     loser();
        // }

    //------------------
            // if (cube.intersectsPoint(pointToIntersect)) {
            //                 loser();
        
         //carmera.onCollide = function(){
           
           // if (balloon3.intersectsPoint(pointToIntersect)) {
                            //loser();
                            //}
        //}
    //---------------KIND OF WoRKING ### 1 ###
        // camera.onCollide = function() {
        //     if(started === true){    
        //     loser();
        //     }

        // }
    //---------------KIND OF WoRKING ### 2 ###
    // var point = cube.position.clone();
    //     point.y -= 0.5;
    //     if (!skybox.intersectsPoint(point)) {
    //         //!ground = gameOver trigged
    //         //else loser function dose not run
    //         loser();
    //     }
    //---------------KIND OF WoRKING 

       

    };// close checkCollisions function


            //count++;
    // leave this truned OFF
            // engine.clear(new BABYLON.Color3(0.2, 0.2, 0.3), true);
    // this code clears the frame and shows a Color3 asset color.
    }
}
