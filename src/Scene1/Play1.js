class Play1 extends Phaser.Scene{
    constructor(){
        super("play1Scene");
    }

    preload(){
        this.load.audio("footsteps", './assets/footsteps.mp3');
        this.load.audio("knocking", './assets/knocking.mp3');
        this.load.audio("scream", './assets/girl_scream.mp3');
        this.load.audio("bgmusic", './assets/bgmusic.mp3');
        this.load.image("background1", './assets/background1.png');
        this.load.image("platform", './assets/platform.png');
        this.load.image("door", './assets/door.png');
        this.load.image("entrance", './assets/entrance.png');
        this.load.image("arrow", "./assets/arrow.png");
        this.load.image("wall_light", "./assets/wall_light.png");
        this.load.atlas("friend", './assets/friend.png', "./assets/friend.json");
    }

    create(){
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        //walking animation
        this.animsConfig = {
            key: "walk",
            frames: this.anims.generateFrameNames("friend", {
                prefix: "friend_",
                start: 1,
                end: 2
            }),
            frameRate: 5,
            repeat: -1
        }
        this.friendAnim = this.anims.create(this.animsConfig);

        let floorConfig = {
            fontFamily: "DotGothic",
            color: '#59e05e',
            stroke: "##000000",
            strokeThickness: 4
        }
    
        //General settings: Audio, Keyboard inputs, Sprites
        this.doorknock = this.sound.add('knocking');
        this.footsteps = this.sound.add('footsteps');
        this.bgmusic = this.sound.add('bgmusic');
        this.bgmusic.play();
        this.scream = this.sound.add('scream').setVolume(0.3);
        this.background = this.add.sprite(game.config.width/2, game.config.height/2 - 80, 'background1');
        this.ground = this.physics.add.image(game.config.width/2, 450, 'platform').setScale(2);
        this.ground.setImmovable(true);
        this.ground.body.allowGravity = false;
        this.cursors = this.input.keyboard.createCursorKeys();

        //Door and entrance Sprites
        this.floorLabel = this.add.text(game.config.width/2, game.config.height/2 - 60, "Floor " + (6 - floorcnt), floorConfig).setOrigin(0.5, 0.5);
        this.door1 = this.add.sprite(game.config.width/2 + 150, game.config.height/2 + 10, 'door').setScale(0.5);
        this.door2 = this.add.sprite(game.config.width/2 - 50, game.config.height/2 + 10, 'door').setScale(0.5);
        this.door3 = this.add.sprite(game.config.width/2 - 200, game.config.height/2 + 10, 'door').setScale(0.5);
        this.entrance = this.add.sprite(game.config.width/2 - 200, game.config.height/2 + 10, 'entrance').setScale(0.5);
        this.arrow = this.add.image(this.entrance.x, this.entrance.y - 60, "arrow").setScale(0.8);
        this.wall_light1 = this.add.image(this.door1.x - 50, this.door1.y - 10, "wall_light").setScale(0.75);
        this.wall_light2 = this.add.image(this.door1.x + 50, this.door1.y - 10, "wall_light").setScale(0.75);
        this.wall_light3 = this.add.image(this.door2.x - 50, this.door2.y - 10, "wall_light").setScale(0.75);
        this.wall_light4 = this.add.image(this.door2.x + 50, this.door2.y - 10, "wall_light").setScale(0.75);
        this.door3.setActive(false);
        this.door3.setActive(false);

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.cursors = this.input.keyboard.createCursorKeys();


        this.player = new Player(this, game.config.width/2 + 250, game.config.height/2 + 20, 'friend', 0, this.cursors, "walk");
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.ground);
        this.flag1 = true;
        this.flag2 = true;
    }

    update(){
        if(Math.floor(Math.random() * 1000) == 500){
            this.scream.play();
        }
        //update player's movement
        this.player.update();
        //Update doors based on the position
        if(floorcnt % 2){
            if(this.flag1){
                this.player.movepos(game.config.width/2 - 250, game.config.height/2 + 20);
                this.flag1 = false;
            }
            this.floorLabel.text = "Floor " + (6 - floorcnt);
            this.door1.x = game.config.width/2 - 150; this.door1.y = game.config.height/2 + 10;
            this.door2.x = game.config.width/2 + 50; this.door2.y = game.config.height/2 + 10;
            this.entrance.x = game.config.width/2 + 200; this.entrance.y = game.config.height/2 + 10;
            this.arrow.x = this.entrance.x;
            this.door3.x = game.config.width/2 + 200; this.door3.y = game.config.height/2 + 10;
            this.wall_light1.x = this.door1.x - 50;
            this.wall_light2.x = this.door1.x + 50;
            this.wall_light3.x = this.door2.x - 50;
            this.wall_light4.x = this.door2.x + 50;
            //This door will only appear if the player reached floor 5, hide the entrance away
            if(floorcnt == 5){
                this.arrow.setVisible(false);
                this.door3.setActive(true);
                this.door3.setVisible(true);
                this.entrance.setActive(false);
                this.entrance.setVisible(false);
            }
        }else{
            if(this.flag1){
                this.player.movepos(game.config.width/2 + 250, game.config.height/2 + 20);
                this.flag1 = false;
            }
            this.floorLabel.text = "Floor " + (6 - floorcnt);
            this.door1.x = game.config.width/2 + 150; this.door1.y = game.config.height/2 + 10;
            this.door2.x = game.config.width/2 - 50; this.door2.y = game.config.height/2 + 10;
            this.entrance.x = game.config.width/2 - 200; this.entrance.y = game.config.height/2 + 10;
            this.arrow.x = this.entrance.x;
            this.door3.x = game.config.width/2 - 200; this.door3.y = game.config.height/2 + 10;
            this.wall_light1.x = this.door1.x - 50;
            this.wall_light2.x = this.door1.x + 50;
            this.wall_light3.x = this.door2.x - 50;
            this.wall_light4.x = this.door2.x + 50;
        }

        if(floorcnt < 5 && this.checkCollision(this.player, this.entrance)){
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                this.footsteps.play();
                floorcnt++;
                this.flag1 = true;
            }
        }

        if(this.checkCollision(this.player, this.door1)){
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                this.doorknock.play();
            }
        }

        if(this.checkCollision(this.player, this.door2)){
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                this.doorknock.play();
            }
        }

        if(floorcnt == 5 && this.checkCollision(this.player, this.door3)){
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                this.bgmusic.stop();
                this.scene.start("end1Scene")
            }
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