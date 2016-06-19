var RAIL_ENGINE = RAIL_ENGINE || (function() {
    // THREE.JS Components
    var CANVAS = undefined;
    var RENDERER = undefined;
    var CAMERA = undefined;
    var SCENE = undefined;
    
    var player_objects = [];
    var death_objects = [];
    
    var clicked = false;
    
    var draw_frame_rate = 50; // [milliseconds]
    var draw_thread_active = false;
    function draw_frame() {
        RENDERER.render(SCENE, CAMERA);
        
        if (draw_thread_active) {
            window.requestAnimationFrame(draw_frame);
        }
    }

    var game_frame_rate = 25;
    var game_thread_active = false;
    function game_frame() {
        if (game_thread_active) {
            var l = player_objects.length;
            //var m = death_objects.length;
            for(var i = 0; i < l; i++) {
                player_objects[i].update(game_frame_rate, clicked);
                death_objects[i].update(game_frame_rate);

                var p_range = player_objects[i].get_x(); // 5
                var d_range = death_objects[i].get_x();  // 20
                console.log(p_range + " player");
                console.log(Math.abs(p_range) + " player");
                console.log(d_range + " death");
                console.log(Math.abs(death_objects[i].get_x())-(Math.abs(player_objects[i].get_x())));
                if (death_objects[i].get_x() - (Math.abs(player_objects[i].get_x())) < 0.5 && Math.abs(death_objects[i].get_x()) - (Math.abs(player_objects[i].get_x())) > -1)
                {
                    window.alert("game reset");
                    console.log("we have a hit!")
                }
            }
        }
    }
    
    return {
        init : function(canvas_id) {
            if (CANVAS) {
                return false;    
            }
            
            // CREATE THE CANVAS
            CANVAS = document.getElementById(canvas_id);
            CANVAS.width = window.innerWidth;
            CANVAS.height = window.innerHeight;
            
            RENDERER = new THREE.WebGLRenderer({
                antialias : true,
                canvas : CANVAS
            });
            
            // CREATE THE CAMERA
            CAMERA = new THREE.PerspectiveCamera(50, CANVAS.width / CANVAS.height, 0.1, 1000);
            CAMERA.position.set(0, 5, 20);
        },
        
        /**
         * Generate an empty world - ready to be drawn to the canvas.
         */
        generate_scene : function() {
            if (! CANVAS || SCENE) {
                return false;
            }
            
            // CREATE THE SCENE
            SCENE = new THREE.Scene();
            
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

        /**
         * Start the update cycles for Rendering and Game Frames
         */
        start_draw_thread : function() {
            if (! SCENE || draw_thread_active) {
                return false;
            }
            
            draw_thread_active = true;
            window.requestAnimationFrame(draw_frame);
        },
        start_game_thread : function() {
            if (! SCENE || game_thread_active) {
                return false;
            }
            
            game_thread_active = true;
            setInterval(game_frame, game_frame_rate);
        },

        /**
         * World CRUD operations
         */
        add_player_object : function(player_object) {
            player_objects.push(player_object);
        },
        add_death_object: function (death_object) {
            death_objects.push(death_object);
        },
        add_drawable : function(three_js_drawable) {
            if (! SCENE) {
                return false;
            }
            
            SCENE.add(three_js_drawable);
        },
        add_drawable_death: function (three_js_drawable) {
            if (!SCENE) {
                return false;
            }

            SCENE.add(three_js_drawable);
        },

        /**
         * Controller Input
         */
        set_clicked : function(c) {
            clicked = c;
        }
    };
}());