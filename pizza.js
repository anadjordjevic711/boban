var Pizza = function (game) {
    this.game = game;

    this.preload = function () {
        this.game.load.path = 'assets/pizza/';

        this.game.load.image('pizza01', 'pizzaaa01.png');
        this.game.load.image('pizza02', 'pizzaaa02.png');
        this.game.load.image('pizza03', 'pizzaaa03.png');
        this.game.load.image('pizza04', 'pizzaaa04.png');
        this.game.load.image('pizza05', 'pizzaaa05.png');
        this.game.load.image('pizza06', 'pizzaaa06.png');
        this.game.load.image('pizza07', 'pizzaaa07.png');
        this.game.load.image('pizza07', 'pizzaaa07.png');
        this.game.load.image('soda', 'soda640.png');
        this.game.load.audio('chew', 'chew.mp3');
        this.game.load.audio('slurp', 'slurp.mp3');
        this.game.load.audio('burp', 'burp.mp3');
    }

    this.create = function() {

        this.game.anims.create({
            key: 'eatpizza',
            frames: [
                {key: 'pizza01'},
                {key: 'pizza02'},
                {key: 'pizza03'},
                {key: 'pizza04'},
                {key: 'pizza05'},
                {key: 'pizza06'},
                {key: 'pizza07'}
            ],
            frameRate: 2,
            repeat: 0
        });

        this.game.anims.create({
            key: 'drinksoda',
            frames: [
                {key: 'soda'}
            ],
            frameRate: 1,
            repeat: 0
        });
    }

}