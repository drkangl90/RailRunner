function GameObject() {
    // 3D Transform
    var location    = [0,0,0];
    var orientation = [0,0,0];
    var size        = [5,5,5];
    
    // Drawable Representation (cube currently)
    var avatar = new THREE.Mesh(
        new THREE.BoxGeometry(size[0], size[1], size[2]),
        new THREE.MeshNormalMaterial(false, 1, false)
    );
    avatar.position.set(location[0], location[1], location[2]);
    
    return {
        constructor : GameObject,
        update : function(clock_tick) {
            orientation[0] += 0.1;
            orientation[1] += 0.1;
            avatar.rotation.x = orientation[0];
            avatar.rotation.y = orientation[1];
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
            RAIL_ENGINE.add_drawable(dude.get_avatar());
            
            setInterval(dude.update, 100);
        }
    }
    
}());