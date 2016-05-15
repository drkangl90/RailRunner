
function GameObject() {
    // 3D Transform
    var location    = [-5,0,0];
    var orientation = [0,0,0];
    var size = [5, 5, 5];

    
    // Drawable Representation (cube currently)
    var avatar = new THREE.Mesh(
        new THREE.BoxGeometry(size[0], size[1], size[2]),
        new THREE.MeshNormalMaterial(false, 1, false)
    );
    avatar.position.set(location[0], location[1], location[2]);
    
    return {
        constructor : GameObject,
        update: function (clock_tick, clicked) {
            

            // location of object
            // have object up up
            if (clicked) {
                if (location[1] < 10)
                {
                    location[1] += 0.1;
                    avatar.position.y = location[1];
                }
                // rotation of object
                orientation[0] += 0.15;
                orientation[1] += 0.15;
                avatar.rotation.x = orientation[0];
                avatar.rotation.y = orientation[1];
            }
            
            // have object go downward
            if (!clicked)
            {
                if (location[1] > 0)
                {
                    location[1] -= 0.1;
                    avatar.position.y = location[1];
                    // rotation of object
                    orientation[0] += 0.15;
                    orientation[1] += 0.15;
                    avatar.rotation.x = orientation[0];
                    avatar.rotation.y = orientation[1];
                }

                if (location[1] <= 0) {
                    location[1] = 0;

                    // modify orientation
                }
            }
            
            
        },
        get_avatar : function() {
            return avatar;
        }
    }
}

var GAME = GAME || (function() {
    // Game Components
    var dude = undefined;
    var ground = undefined;
    var camera = undefined;
    
    // Game State
    var alive = true;
    
    return {
        init : function() {
            dude = new GameObject();
            RAIL_ENGINE.add_game_object(dude);
            RAIL_ENGINE.add_drawable(dude.get_avatar());
        }
    }
    
}());