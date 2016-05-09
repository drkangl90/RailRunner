var RAIL_ENGINE = RAIL_ENGINE || (function() {
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
            
            // Lighting
            var ambientLight = new THREE.AmbientLight(0xffaa33);
            ambientLight.intensity = 1;
            SCENE.add(ambientLight);

            var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
            hemiLight.color.setHSL(0.6, 1, 0.6);
            hemiLight.groundColor.setHSL(0.095, 1, 0.75);
            hemiLight.position.set(0, 500, 0);
            SCENE.add(hemiLight);
            
                        
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
        },
        add_drawable : function(threeJsDrawable) {
            SCENE.add(threeJsDrawable);
        },
        draw_world : function() {
            RENDERER.render(SCENE, CAMERA);
        }
        
    };
}());