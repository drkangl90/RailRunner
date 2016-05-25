function main() {
    RAIL_ENGINE.init('game_canvas');
    RAIL_ENGINE.generate_scene();
    
    GAME.init();
    DEATH.init();
    
    RAIL_ENGINE.start_draw_thread();
    RAIL_ENGINE.start_game_thread();
    //RAIL_ENGINE.set_clicked(true);
    window.onmousedown = function(event) {
        RAIL_ENGINE.set_clicked(true);
    }
    window.onmouseup = function(event) {
        RAIL_ENGINE.set_clicked(false);
    }
}

