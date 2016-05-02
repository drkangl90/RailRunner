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

    // CONTROLS
    var GRAVITY = 9.8; //Gravity on the Earth in kg/s²
    var Vy = 0;        //Tux velocity along the vertical axis
    var VIEWPORTVECTOR = new THREE.Vector3();
    var DIRECTIONVECTOR = new THREE.Vector3();

    var PROJECTOR = new THREE.Projector();
    var RAYCASTER = new THREE.Raycaster();

    var drag = false, oldX, oldY, dX = 0, dY = 0, rotX = 0, rotY = 0;
    window.onmousedown = function (event) {
        var x = 2 * event.clientX / CANVAS.width - 1;
        var y = -(2 * event.clientY / CANVAS.height - 1);

        VIEWPORTVECTOR.set(x, y, 1);
        DIRECTIONVECTOR.copy(VIEWPORTVECTOR);
        PROJECTOR.unprojectVector(DIRECTIONVECTOR, CAMERA);

        //DIRECTIONVECTOR is not a vector, but the targeted point which is
        //in the camera Zfar plane.

        //to get the real pointer direction, we must substract the camera position
        DIRECTIONVECTOR.sub(CAMERA.position);

        //We normalize it
        DIRECTIONVECTOR.normalize();
        //We give to the raycaster all information about the ray (origin, direction)
        RAYCASTER.set(CAMERA.position, DIRECTIONVECTOR);

        //Ask the raycaster for intersects with all objects in the scene:
        // (The second arguments means "recursive")
        var intersects = RAYCASTER.intersectObjects(SCENE.children, true);

        if (intersects.length) {
            //there is at least 1 intersected object
            Vy = 10;
            cube.rotation.y += 5;
        }
    };

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
    var material = new THREE.MeshNormalMaterial(false, 1, false);
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
    var old_time = 0;
    var animate = function (timestamp) {

        var dt = (timestamp - old_time) / 1e3; //time step in milliseconds
        old_time = timestamp;

        //apply acceleration to update TUX vertical velocity
        Vy += -GRAVITY * dt;

        //apply velocity to update TUX position
        cube.position.setY(cube.position.y + dt * Vy);

        //if cube hits the ground
        if (cube.position.y < 1.6) {
            cube.position.setY(1.6);
            Vy = 0;
        }
        RENDERER.render(SCENE, CAMERA);

        //cube.rotation.x += 0.1;
        //cube.rotation.y += 0.1;
       
        requestAnimationFrame(animate);
    };
    animate(0);
}