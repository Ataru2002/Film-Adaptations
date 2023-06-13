class Play2 extends Phaser.Scene{
    constructor(){
        super("play2Scene");
    }

    preload(){
        this.load.image("background2", './assets/background2.png');
        this.load.image("platform", './assets/platform.png');
        this.load.atlas("beds", './assets/beds.png', "./assets/beds.json");
        this.load.atlas("suzy", "./assets/suzy.png", "./assets/suzy.json");
    }

    create(){
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.background = this.add.sprite(game.config.width/2, game.config.height/2, 'background2');
        this.ground = this.physics.add.image(game.config.width/2, 450, 'platform').setScale(2);
        this.ground.setImmovable(true);
        this.ground.body.allowGravity = false;
        this.cursors = this.input.keyboard.createCursorKeys();

        //walking animation
        this.animsConfig = {
            key: "walk2",
            frames: this.anims.generateFrameNames("suzy", {
                prefix: "suzy_",
                start: 1,
                end: 2
            }),
            frameRate: 5,
            repeat: -1
        }
        this.suzyAnim = this.anims.create(this.animsConfig);

        //Sprites
        this.bed1 = this.physics.add.sprite(game.config.width/2 - 40, game.config.height/2 + 30, 'beds').setScale(1.5);
        this.bed1.setFrame("bed_sara");
        this.physics.add.collider(this.bed1, this.ground);

        this.bed2 = this.physics.add.sprite(game.config.width/2 + 40, game.config.height/2 + 30, 'beds').setScale(1.5);
        this.physics.add.collider(this.bed2, this.ground);

        this.player = new Player(this, game.config.width/2 - 250, game.config.height/2 + 10, 'suzy', 0, this.cursors, "walk2");
        this.player.flipX = true;
        this.physics.add.collider(this.ground, this.player);
        this.player.setCollideWorldBounds(true);  
    }

    update(){
        this.player.update();
        
        if(this.checkCollision(this.player, this.bed2)){
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                this.player.setVisible(false);
                this.bed2.setFrame("bed_suzy");
                this.time.delayedCall(2000, () => {
                        this.scene.start("end2Scene");
                })
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