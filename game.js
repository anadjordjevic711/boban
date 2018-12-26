var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    backgroundColor: "#fff",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var boban;
var game = new Phaser.Game(config);

function preload ()
{
    //this.load.setBaseURL('http://localhost/Boban');
    this.load.spritesheet('char_idle', 'assets/idle.png', { 
        frameWidth: 84, 
        frameHeight: 85,
    });

    boban = new Boban(this, (new Phaser.Events.EventEmitter()));
}

function create ()
{
    boban.spawn()
}

function update()
{
    
}