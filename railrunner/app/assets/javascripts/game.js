
function GameObject() {
    // 3D Transform
    var location    = [-5,0,0];
    var orientation = [0,0,0];
    var size        = [5, 5, 5];

    // Jumping
    var jumpHeight  = 10;
    var jumpSpeed   = 0.3;
    var jumpStarted = false;
    var jumpPeaked  = false;

    // Drawable Representation (cube currently)
    var avatar = new THREE.Mesh(
        new THREE.BoxGeometry(size[0], size[1], size[2]),
        new THREE.MeshNormalMaterial(false, 1, false)
    );
    avatar.position.set(location[0], location[1], location[2]);
    
    return {
        constructor : GameObject,
        update: function (clock_tick, clicked) {

            if (clicked) {
                jumpStarted = true;
            }

            //- Jump Behavior ----------------------------=
            //
            if (jumpStarted) {
                // Going Up
                if (! jumpPeaked) {
                    if (location[1] < jumpHeight) {
                        location[1] += jumpSpeed;
                    } else {
                        jumpPeaked = true;
                    }
                }
                // Going Down
                else {
                    location[1] -= jumpSpeed;

                    if (location[1] <= 0) {
                        location[1] = 0;

                        jumpStarted = false;
                        jumpPeaked = false;
                    }
                }

                // Apply Lateral Spin
                orientation[1] += 0.15;
            }

            //- Update Avatar ----------------------------=
            //
            // Location
            avatar.position.x = location[0];
            avatar.position.y = location[1];
            avatar.position.z = location[2];
            //
            // Orientation
            avatar.rotation.x = orientation[0];
            avatar.rotation.y = orientation[1];
            avatar.rotation.z = orientation[2];
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