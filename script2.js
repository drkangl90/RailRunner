var main = function () {
    // CREATE THE CANVAS
    var CANVAS = document.getElementById("your_canvas");
    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;

    var RENDERER = new THREE.WebGLRenderer({
        antialias : true,
        canvas : CANVAS
    });


    // CREATE THE SCENE
    var SCENE = new THREE.Scene();

    // CREATE THE CAMERA
    var CAMERA = new THREE.PerspectiveCamera(50, CANVAS.width / CANVAS.height, 0.1, 1000);
    var posX = 0, posZ = 20;
    CAMERA.position.set(posX, 5, posZ);
    SCENE.add(CAMERA);

    // Controls
    var controls;
    var raycaster;

    // activating pointer lock 
    var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
    if (havePointerLock) {
        var element = document.body;
        var pointerlockchange = function (event) {
            if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {
                controlsEnabled = true;
                controls.enabled = true;
            }
            else {
                controls.enabled = false;
            }
        }
        // Hook pointer lock state change events
        document.addEventListener('pointerlockchange', pointerlockchange, false);
        document.addEventListener('mozpointerlockchange', pointerlockchange, false);
        document.addEventListener('webkitpointerlockchange', pointerlockchange, false);
        
        
    }

    // CREATE THE GROUND
    var planeGeometry = new THREE.PlaneGeometry(500, 500);
    var planeMaterial = new THREE.MeshPhongMaterial({
        ambient: 0x555555,
        color: 0xdddddd,
        specular: 0x009900,
        map: THREE.ImageUtils.loadTexture('resources/moss.jpg'),
        shininess: 30
    });
    var planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

    planeMaterial.map.wrapS = THREE.RepeatWrapping;
    planeMaterial.map.wrapT = THREE.RepeatWrapping;
    planeMaterial.map.repeat.set(500, 500);

    // center of the ground quad
    planeMesh.position.set(-2.5, -2.5, -2.5);
    // set it horizontally because planeGeometry is along X,Y
    planeMesh.rotateX(-Math.PI / 2); 

    planeMaterial.map.repeat.x = planeMaterial.map.repeat.y = 20;
    SCENE.add(planeMesh);

    // CREATE CUBE
    var geometry = new THREE.BoxGeometry(5, 5, 5);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    SCENE.add(cube);


    // ADD THE LIGHTS
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.intensity = 2;
    spotLight.position.set(0, 10, 5);

    // ambient light
    var ambientLight = new THREE.AmbientLight(0xffaa33);
    ambientLight.intensity = 1;
    SCENE.add(ambientLight);

    SCENE.add(spotLight);

    // RENDER LOOP
    var animate = function () {
        RENDERER.render(SCENE, CAMERA);

        //cube.rotation.x += 0.1;
        //cube.rotation.y += 0.1;

        requestAnimationFrame(animate);
    };
    animate();
}