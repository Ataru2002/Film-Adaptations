class Play3 extends Phaser.Scene{
    constructor(){
        super("play3Scene");
    }

    preload(){
        this.load.image("platform", './assets/platform.png');
        this.load.image("bed", './assets/Bed.png');
        this.load.image("background3", './assets/background3.png');
        this.load.image("lightning", "./assets/lightning_effect.png");
        this.load.atlas("suzy", "./assets/suzy.png", "./assets/suzy.json");
        this.load.atlas("sara", "./assets/sara.png", "./assets/sara.json");
        this.load.atlas("helena", "./assets/helena.png", "./assets/helena.json");
        this.load.audio("storm", "./assets/storm.wav");
        this.load.audio("director_scream", "./assets/monster_scream.wav");
        this.load.audio("stab", "./assets/stab.mp3");
        
    }

    create(){
        this.storm = this.sound.add("storm");
        this.storm.volume = 0.3;
        this.storm.play();
        this.storm.loop = true;

        //text settings
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
        let gameOverConfig = {
            fontFamily: "DotGothic",
            fontSize: "24px",
            align: "center"
        }

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.background = this.add.sprite(game.config.width/2, game.config.height/2, 'background3');
        this.ground = this.physics.add.image(game.config.width/2 - 32, 466, 'platform').setScale(2.2);
        this.ground.setImmovable(true);
        this.ground.body.allowGravity = false;
        this.cursors = this.input.keyboard.createCursorKeys();

        //bed
        this.bed = this.add.image(game.config.width/2 + 250, game.config.height/2 + 26, "bed").setScale(1.2);
        
        //sara animation
        this.animsConfig = {
            key: "walk3",
            frames: this.anims.generateFrameNames("sara", {
                prefix: "sara_",
                start: 1,
                end: 2
            }),
            frameRate: 2,
            repeat: -1
        };
        this.friendAnim = this.anims.create(this.animsConfig);

        //win/lose states
        this.win = false;
        this.gameOver = false;

        //characters
        this.director = this.add.sprite(game.config.width/2 + 250, game.config.height/2 - 5, 'helena');
        this.directortext = this.add.text(game.config.width/2 + 100, game.config.height/2 - 70, "Press F to kill the director", menuConfig);
        this.directortext.setVisible(false);
        this.director.setVisible(false);
        this.player = new Player(this, game.config.width/2 + 200, game.config.height/2 + 10, 'suzy', 0, this.cursors).setOrigin(1, 1);
        this.player.flipX = true;
        this.player.setFrame("suzy_armed");
        this.physics.add.collider(this.ground, this.player);
        this.sarah = this.physics.add.sprite(-32, game.config.height/2 + 10, 'sara');
        this.sarah.play("walk3");
        this.sarah.setActive(false);
        this.sarah.setVisible(false);
        this.physics.add.collider(this.ground, this.sarah);
        this.physics.add.collider(this.player, this.sarah, () => {
            //Lose the game when sarah touches suzy
            if(!this.gameOver) {
                this.player.setFrame("suzy_dead");
                this.player.setAngle(90);
                this.sarah.setFrame("sara_stab");
                this.sarah.setActive(false);
                this.sound.play("stab");
                this.add.text(game.config.width / 2, game.config.height / 4, " YOU DIED\nPress R to restart the scene", gameOverConfig).setOrigin(0.5, 0.5);
                this.gameOver = true;
            }
        });

        //sarah walks in
        this.time.delayedCall(1700, () => {
            this.sarah.setActive(true);
            this.sarah.setVisible(true);
        }, null, this);

        //lightning flash effect
        this.lightning = this.add.image(0, 0, "lightning").setAlpha(0.8).setScale(2);
        this.lightning.setVisible(false);
    }

    update(){
        this.player.update2(); //Suzy standing still
        if(this.sarah.active) this.sarah.setVelocityX(30); //Sarah rushing to Suzy
        if(this.sarah.active && !this.director.visible && Math.floor(Math.random() * 100) == 50){
            this.director.setVisible(true);
            this.lightning.setVisible(true);
            this.add.tween({
                targets: this.lightning,
                alpha: {from: 0.8, to: 0},
                duration: 1000,
                onComplete: () => {
                    this.lightning.setAlpha(0.8);
                    this.lightning.setVisible(false);
                }
            })
            this.time.delayedCall(1000, () => {
                if (!this.win) {
                    this.director.setVisible(false);
                }
                this.directortext.setVisible(false);
            })
        }
        if(this.director.visible && !this.player.flipX){
            this.directortext.setVisible(true);
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                //Win the game if Suzy kills the director
                this.win = true;
                this.director.setVisible(true);
                this.director.setFrame("helena_dead");
                this.player.setFrame("suzy_1");
                this.sound.play("stab");
                this.sound.play("director_scream");
                this.sarah.setActive(false);
                this.sarah.setVelocityX(0);
                let death_tween = this.add.tween({
                    targets: this.sarah,
                    alpha: {from: 1, to: 0},
                    duration: 3000
                })

                this.time.delayedCall(4000, () => {
                    this.cameras.main.fadeOut(1000, 0, 0, 0);
                    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                        this.scene.start("endScene");
                    });
                })
            }
        }else{
            this.directortext.setVisible(false);
        }

        if(Phaser.Input.Keyboard.JustDown(keyR) && this.gameOver) {
            this.scene.restart();
        }
    }
}