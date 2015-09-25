Tetris.Board = {};

Tetris.Board.COLLISION = {NONE:0, WALL:1, GROUND:2};
Tetris.Board.FIELD = {EMPTY:0, ACTIVE:1, PETRIFIED:2};

Tetris.Board.fields = [];
 
Tetris.Board.init = function(_x,_y,_z) {
    for(var x = 0; x < _x; x++) {
        Tetris.Board.fields[x] = [];
        for(var y = 0; y < _y; y++) {
            Tetris.Board.fields[x][y] = [];     
            for(var z = 0; z < _z; z++) {
                Tetris.Board.fields[x][y][z] = Tetris.Board.FIELD.EMPTY;
            }               
        }
    }
};

Tetris.Block.petrify = function () {
    var shape = Tetris.Block.shape;
    for (var i = 0; i < shape.length; i++) {
        Tetris.addStaticBlock(Tetris.Block.position.x + shape[i].x, Tetris.Block.position.y + shape[i].y, Tetris.Block.position.z + shape[i].z);
        Tetris.Board.fields[Tetris.Block.position.x + shape[i].x][Tetris.Block.position.y + shape[i].y][Tetris.Block.position.z + shape[i].z] = Tetris.Board.FIELD.PETRIFIED;
    }
};


Tetris.Board.testCollision = function (ground_check) {
    var x, y, z, i;
 
    // shorthands
    var fields = Tetris.Board.fields;
    var posx = Tetris.Block.position.x, posy = Tetris.Block.position.y, 
        posz = Tetris.Block.position.z, shape = Tetris.Block.shape;
 
    for (i = 0; i < shape.length; i++) {
        // 4 walls detection for every part of the shape
        if ((shape[i].x + posx) < 0 || 
            (shape[i].y + posy) < 0 || 
            (shape[i].x + posx) >= fields.length || 
            (shape[i].y + posy) >= fields[0].length) {
            return Tetris.Board.COLLISION.WALL;
        }
        // to be continued

        if (fields[shape[i].x + posx][shape[i].y + posy][shape[i].z + posz - 1] === Tetris.Board.FIELD.PETRIFIED) {
    return ground_check ? Tetris.Board.COLLISION.GROUND : Tetris.Board.COLLISION.WALL;	
		}
// to be continued

  if((shape[i].z + posz) <= 0) {
            return Tetris.Board.COLLISION.GROUND;
        }
    }
};



