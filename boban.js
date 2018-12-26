var Boban = function(scene, emitter) {
    this.age = 5;
    this.health = 100;
    this.happines = 100;
    this.social = 100;
    this.quotes = [
        "Cao, ja sam Boban!"
    ];

    this.currentAction = "";

    this.settings = {
        healthDegradationInterval: 1000, // ms
        healthDegradationStep: 1,
        happinesDegradationInterval: 1000, // ms
        happinesDegradationStep: 5,
        socialIncreaseStep: 10,
        socialIncreaseInterval: 3000,
        socialDegradationInterval: 3000,
        socialDegradationStep: 5,
        ageIncreaseInterval: 1000 * 60 * 60 * 24 // day
    }

    this.EventEmitter = emitter;
    this.scene = scene;

    this.spawn = function() {
        var self = this;

        this.ageText = this.scene.add.text(100, 0, 'Godina: 5', { color: '#000000' });
        this.healthText = this.scene.add.text(100, 15, 'Zdravlje: 100%', { color: '#00ff00' });
        this.happinesText = this.scene.add.text(100, 30, 'Sreca: 100%', { color: '#f4c542' });
        this.socialText = this.scene.add.text(100, 45, 'Socijalizacija: 100%', { color: '#f4c542' });
        

        this.quoteText = this.scene.add.text(400, 250, 'Cao', { color: '#000000' });

        this.EventEmitter.on('ModifyHealth', this.modifyHealth, this);
        this.EventEmitter.on('ModifyHappines', this.modifyHappines, this);
        this.EventEmitter.on('ModifySocial', this.modifySocial, this);

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

        setInterval(function() {
            console.log(self.currentAction);
            if (! self.paused && self.currentAction !== "Socialize") {
                self.EventEmitter.emit('ModifySocial', self.social - self.settings.socialDegradationStep);
            }
            
        }, self.settings.socialDegradationInterval)
        

        this.idle();

        // this.interactiveTalk([
        //     "Cao, ja sam Boban! Dozvoli mi da se predstavim",
        //     "Kao sto sam rekao ja sam Boban, Boban se ne radja",
        //     "BOBAN SE POSTAJE!!!",
        //     "Zato ja imam 5 godina, a sta je pre toga bilo niko ne zna"
        // ]);

       
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

    this.friend = function() {
        var self = this; 
        if(this.currentAction == 'Socialize') {
            clearInterval(this.socialInterval);
            this.friend_vlada.destroy();
            this.quoteFriend.setText('');
            self.quoteText.setText('');
            document.getElementsByClassName("call-friend")[0].innerText = 'Zovi Vladu';
            this.currentAction = '';
        }

        else {
            this.currentAction = "Socialize";
            document.getElementsByClassName("call-friend")[0].innerText = 'Otkaci Vladu';

            var config = {
                key: 'friend',
                frames: this.scene.anims.generateFrameNumbers('char_friend'),
                frameRate: 2,
                yoyo: true,
                repeat: -1
            };
            
            anim = this.scene.anims.create(config);
        
            this.friend_vlada = this.scene.add.sprite(530, 355, 'char_friend').setScale(1.6);
        
            sprite.originX = 0;
            sprite.originY = 0;
        
            this.friend_vlada.anims.load('friend');
        
            this.friend_vlada.anims.play('friend');

            this.quoteFriend = this.scene.add.text(500, 250, '&#@%$%@%*!*', { color: '#000000' });
            self.quoteText = this.scene.add.text(380, 250, '@&^#*&^@*#', { color: '#000000' });

        
            this.socialInterval = setInterval(function() {
                if (! self.paused && self.currentAction !== "Socialize") {
                    self.EventEmitter.emit('ModifySocial', self.social + self.settings.socialIncreaseStep);
                }
                
            }, self.settings.socialIncreaseInterval);
            
        }
    }

    this.modifyHealth = function(number) {
        this.health = number;
        this.healthText.setText('Zdravlje: ' + this.health + '%');

        if (this.health < 90) {
            this.happines = 30;
            this.talk("Ne osecam se bas nesto srecno, ajde da se igramo?");
        }   
    }

    this.modifyHappines = function(number) {
        this.happines = number;
        this.happinesText.setText('Sreca: ' + this.happines + '%');  
    }

    this.modifySocial = function(number) {
        this.social = number;
        this.socialText.setText('Socijalizacija: ' + this.social + '%');  
    }

    this.callFriends = function() {
        console.log('friend called');
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
        this.currentAction = 'InteractiveTalk'
        this.pause();

        var counter = 0;
        this.quoteText.setText(text[counter]);

        this.scene.input.on("pointerdown", function() {
            counter++;

            if (counter <= text.length) {
                this.quoteText.setText(text[counter]);
            } else {
                self.unpause();
                self.currentAction = '';
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