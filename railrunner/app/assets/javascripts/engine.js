var RAIL_ENGINE = RAIL_ENGINE || (function(){
    var CANVAS = undefined;
    var CAMERA = undefined;
    var SCENE = undefined;
    
    var RENDERER = undefined;
    var PROJECTOR = undefined;
    var RAYCASTER = undefined;

    return {
        init : function(canvas_id) {
            // CREATE THE CANVAS
            CANVAS = document.getElementById(canvas_id);
            CANVAS.width = window.innerWidth;
            CANVAS.height = window.innerHeight;
            
            RENDERER = new THREE.WebGLRenderer({
                antialias : true,
                canvas : CANVAS
            });
            
            // CREATE THE SCENE
            SCENE = new THREE.Scene();
            
            // CREATE THE CAMERA
            CAMERA = new THREE.PerspectiveCamera(50, CANVAS.width / CANVAS.height, 0.1, 1000);
            CAMERA.position.set(0, 5, 20);
            
            PROJECTOR = new THREE.Projector();
            RAYCASTER = new THREE.Raycaster();
        },
        load_world : function() {
            SCENE.add(CAMERA);
            
            var ambientLight = new THREE.AmbientLight(0xffaa33);
            ambientLight.intensity = 1;
            SCENE.add(ambientLight);
            
            var spotLight = new THREE.SpotLight(0xffffff);
            spotLight.intensity = 2;
            spotLight.position.set(0, 10, 5);
            SCENE.add(spotLight);
            
            // [TEMP] Stand-In Cube
            var cube = new THREE.Mesh(
                new THREE.BoxGeometry(5,5,5),
                new THREE.MeshNormalMaterial(false, 1, false)
            );
            SCENE.add(cube);
            
            // [TEMP] Stand-In Ground
            var ground = new THREE.Mesh(
                new THREE.PlaneGeometry(100, 100),
                new THREE.MeshPhongMaterial({
                    color : 0xdddddd,
                    specular : 0x009900,
                    shininess : 30
                })
            );
            ground.position.set(0, -2.5, 0);
            ground.rotateX(-Math.PI / 2);
            SCENE.add(ground);
            
            RENDERER.render(SCENE, CAMERA);
        }
    };
}());