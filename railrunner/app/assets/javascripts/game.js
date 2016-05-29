var GAME = GAME || (function() {
    // Game Components
    var dude = undefined;
    var ground = undefined;
    var camera = undefined;
    
    // Game State
    var alive = true;
    
    return {
        init : function() {
            dude = new Player();
            RAIL_ENGINE.add_player_object(dude);
            RAIL_ENGINE.add_drawable(dude.get_avatar());
        }
    }
    
}());