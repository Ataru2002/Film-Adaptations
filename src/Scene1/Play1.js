class play1 extends Phaser.Scene{
    constructor(){
        super("play1Scene");
    }
    preload(){
        this.load.audio("footsteps", './assets/footsteps.mp3');
        this.load.audio("knocking", './assets/knocking.mp3');
        this.load.audio("scream", './assets/scream.wav');
        this.load.image("background1", './assets/background1.jpg');
        this.load.image("platform", './assets/platform.png');
        this.load.image("door", './assets/door.png');
        this.load.image("entrance", './assets/entrance.png');
        this.load.image("character", './assets/character.png');
    }
    create(){
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '13px',
            backgroundColor: '#000000',
            color: '#FFFF00',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }
        this.doorknock = this.sound.add('knocking');
        this.footsteps = this.sound.add('footsteps');
        this.scream = this.sound.add('scream');
        this.background = this.add.sprite(game.config.width/2, game.config.height/2, 'background1');
        this.ground = this.physics.add.image(game.config.width/2, 450, 'platform').setScale(2);
        this.ground.setImmovable(true);
        this.ground.body.allowGravity = false;

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        if(!(floorcnt % 2)){
            this.door1 = this.add.sprite(game.config.width/2 + 150, game.config.height/2 + 10, 'door').setScale(0.5);
            this.door1txt = this.add.text(game.config.width/2 + 50, game.config.height/2 - 50, "Press F to knock the door", menuConfig);
            this.door1txt.setVisible(false);

            this.door2 = this.add.sprite(game.config.width/2 - 50, game.config.height/2 + 10, 'door').setScale(0.5);
            this.door2txt = this.add.text(game.config.width/2 - 150, game.config.height/2 - 50, "Press F to knock the door", menuConfig);
            this.door2txt.setVisible(false);

            this.door3 = this.add.sprite(game.config.width/2 - 200, game.config.height/2 + 10, 'door').setScale(0.5);
            this.door3txt = this.add.text(game.config.width/2 - 300, game.config.height/2 - 50, "Press F to knock the door", menuConfig);
            this.door3txt.setVisible(false);

            if(floorcnt < 5){
                this.entrance = this.add.sprite(game.config.width/2 - 200, game.config.height/2 + 10, 'entrance').setScale(0.5);
                this.entrancetxt = this.add.text(game.config.width/2 - 300, game.config.height/2 - 50, "Press F to go to the next floor", menuConfig);
                this.entrancetxt.setVisible(false);
            }
            this.cursors = this.input.keyboard.createCursorKeys();
            this.player = this.physics.add.sprite(game.config.width/2 + 250, game.config.height/2 + 10, 'character');
            this.player.setCollideWorldBounds(true);
            this.physics.add.collider(this.player, this.ground);
        }else{
            this.door1 = this.add.sprite(game.config.width/2 - 150, game.config.height/2 + 10, 'door').setScale(0.5);
            this.door1txt = this.add.text(game.config.width/2 - 250, game.config.height/2 - 50, "Press F to knock the door", menuConfig);
            this.door1txt.setVisible(false);

            this.door2 = this.add.sprite(game.config.width/2 + 50, game.config.height/2 + 10, 'door').setScale(0.5);
            this.door2txt = this.add.text(game.config.width/2 - 50, game.config.height/2 - 50, "Press F to knock the door", menuConfig);
            this.door2txt.setVisible(false);

            this.door3 = this.add.sprite(game.config.width/2 + 200, game.config.height/2 + 10, 'door').setScale(0.5);
            this.door3txt = this.add.text(game.config.width/2 + 100, game.config.height/2 - 50, "Press F to knock the door", menuConfig);
            this.door3txt.setVisible(false);

            if(floorcnt < 5){
                this.entrance = this.add.sprite(game.config.width/2 + 200, game.config.height/2 + 10, 'entrance').setScale(0.5);
                this.entrancetxt = this.add.text(game.config.width/2 + 100, game.config.height/2 - 50, "Press F to go to the next floor", menuConfig);
                this.entrancetxt.setVisible(false);
            }

            this.cursors = this.input.keyboard.createCursorKeys();
            this.player = this.physics.add.sprite(game.config.width/2 - 250, game.config.height/2 + 10, 'character');
            this.player.setCollideWorldBounds(true);
            this.physics.add.collider(this.player, this.ground);
        }
    }
    update(){
        if (this.cursors.left.isDown){
            this.player.setVelocityX(-180);
            this.player.flipX = false;
        }else if (this.cursors.right.isDown){
            this.player.setVelocityX(180);
            this.player.flipX = true;
        }else{
            this.player.setVelocityX(0);
        }
        if(floorcnt == 5 && this.checkCollision(this.player, this.door3)){
            this.door3txt.setVisible(true);
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                this.doorknock.play();
            }
        }else if(floorcnt == 5){
            this.door3txt.setVisible(false);
        }
        if(this.checkCollision(this.player, this.entrance)){
            this.entrancetxt.setVisible(true);
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                this.footsteps.play();
                floorcnt++;
                this.scene.restart();
            }
        }else{
            this.entrancetxt.setVisible(false);
        }
        if(this.checkCollision(this.player, this.door1)){
            this.door1txt.setVisible(true);
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                this.doorknock.play();
                if(Math.floor(Math.random() * 4) == 3){
                    this.scream.play();
                }
            }
        }else{
            this.door1txt.setVisible(false);
        }

        if(this.checkCollision(this.player, this.door2)){
            this.door2txt.setVisible(true);
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                this.doorknock.play();
                if(Math.floor(Math.random() * 4) == 3){
                    this.scream.play();
                }
            }
        }else{
            this.door2txt.setVisible(false);
        }

        
    }
    checkCollision(object1, object2) {
        // simple AABB checking
        if (object1.x < object2.x + object2.width && 
            object1.x + object1.width > object2.x && 
            object1.y < object2.y + object2.height &&
            object1.height + object1.y > object2.y) {
            return true;
        } else {
            return false;
        }
    }
}