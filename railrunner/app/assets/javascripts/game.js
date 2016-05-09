function GameObject() {
    // 3D Transform
    var location    = [0,0,0];
    var orientation = [0,0,0];
    var scale       = [1,1,1];
    
    // Drawable Representation
    var avatar = new THREE.Mesh(
        new THREE.BoxGeometry(scale[0], scale[1], scale[2]),
        new THREE.MeshNormalMaterial(false, 1, false)
    );
    avatar.position.set(location[0], location[1], location[2]);
    
    return {
        constructor : GameObject,
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
        }
    }
    
}());