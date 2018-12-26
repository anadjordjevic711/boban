var Boban = function(scene, emitter) {
    this.age = 5;
    this.health = 100;
    this.happines = 100;
    this.quotes = [
        "Cao, ja sam Boban!"
    ];

    this.currentAction = "";

    this.settings = {
        healthDegradationInterval: 1000, // ms
        healthDegradationStep: 1,
        happinesDegradationInterval: 1000, // ms
        happinesDegradationStep: 5,
        ageIncreaseInterval: 1000 * 60 * 60 * 24 // day
    }

    this.EventEmitter = emitter;
    this.scene = scene;

    this.spawn = function() {
        var self = this;

        this.ageText = this.scene.add.text(100, 0, 'Godina: 5', { color: '#000000' });
        this.healthText = this.scene.add.text(100, 15, 'Zdravlje: 100%', { color: '#00ff00' });
        this.happinesText = this.scene.add.text(100, 30, 'Sreca: 100%', { color: '#f4c542' });

        this.quoteText = this.scene.add.text(400, 250, 'Cao', { color: '#000000' })

        this.EventEmitter.on('ModifyHealth', this.modifyHealth, this);
        this.EventEmitter.on('ModifyHappines', this.modifyHeappines, this);

        setInterval(function() {
            if (! self.paused) {
                self.EventEmitter.emit('ModifyHealth', self.health - self.settings.healthDegradationStep);
            }
            
        }, self.settings.healthDegradationInterval)

        setInterval(function() {
            if (! self.paused) {
                self.EventEmitter.emit('ModifyHappines', self.happines - self.settings.happinesDegradationStep);
            }
            
        }, self.settings.happinesDegradationInterval)
        

        this.idle();

        this.interactiveTalk([
            "Cao, ja sam Boban! Dozvoli mi da se predstavim",
            "Kao sto sam rekao ja sam Boban, Boban se ne radja",
            "BOBAN SE POSTAJE!!!",
            "Zato ja imam 5 godina, a sta je pre toga bilo niko ne zna"
        ]);
    }

    this.idle = function() {
        var config = {
            key: 'idle',
            frames: this.scene.anims.generateFrameNumbers('char_idle'),
            frameRate: 6,
            yoyo: true,
            repeat: -1
        };
        
        anim = this.scene.anims.create(config);
    
        sprite = this.scene.add.sprite(400, 300, 'char_idle').setScale(1.2);
    
        sprite.originX = 0;
        sprite.originY = 0;
    
        sprite.anims.load('idle');
    
        sprite.anims.play('idle');
    }

    this.modifyHealth = function(number) {
        this.health = number;
        this.healthText.setText('Zdravlje: ' + this.health + '%');

        if (this.health < 90) {
            this.happines = 30;
            this.talk("Ne osecam se bas nesto srecno, ajde da se igramo?");
        }   
    }

    this.modifyHeappines = function(number) {
        this.happines = number;
        this.happinesText.setText('Sreca: ' + this.happines + '%');  
    }

    this.talk = function(text) {
        var self = this;

        self.currentAction = "talking";
        this.quoteText.setText(text);
    
        var tween = this.scene.tweens.add({
            targets: this.quoteText,
            alpha: 0,
            ease: 'Power1',
            duration: 3000,
            onComplete: function() {
                self.currentAction = '';
            }
        });
    }

    this.interactiveTalk = function(text) {
        var self = this;
        this.pause();

        var counter = 0;
        this.quoteText.setText(text[counter]);

        this.scene.input.on("pointerdown", function() {
            counter++;

            if (counter <= text.length) {
                this.quoteText.setText(text[counter]);
            } else {
                self.unpause();
            }
        }, this)
    }

    this.pause = function() {
        this.paused = true;
    }

    this.unpause = function() {
        this.paused = false;
    }
}