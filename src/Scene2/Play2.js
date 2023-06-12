class Play2 extends Phaser.Scene{
    constructor(){
        super("play2Scene");
    }
    preload(){
        this.load.image("background2", './assets/background1.jpg');
        this.load.image("platform", './assets/platform.png');
        this.load.image("bed2", './assets/Bed2.png');
        this.load.image("character", './assets/character.png');
    }
    create(){
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
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.background = this.add.sprite(game.config.width/2, game.config.height/2, 'background2');
        this.ground = this.physics.add.image(game.config.width/2, 450, 'platform').setScale(2);
        this.ground.setImmovable(true);
        this.ground.body.allowGravity = false;
        this.cursors = this.input.keyboard.createCursorKeys();

        //Sprites
        this.bed1 = this.physics.add.sprite(game.config.width/2 + 100, game.config.height/2 + 30, 'bed2').setScale(0.5);
        this.bed1txt = this.add.text(game.config.width/2 + 40, game.config.height/2 - 30, "Press F to sleep", menuConfig);
        this.bed1txt.setVisible(false);
        this.physics.add.collider(this.bed1, this.ground);

        this.bed2 = this.physics.add.sprite(game.config.width/2 + 250, game.config.height/2 + 30, 'bed2').setScale(0.5);
        this.bed2txt = this.add.text(game.config.width/2 + 190, game.config.height/2 - 30, "Press F to sleep", menuConfig);
        this.bed2txt.setVisible(false);
        this.physics.add.collider(this.bed2, this.ground);

        this.player = new Player(this, game.config.width/2 - 250, game.config.height/2 + 10, 'character', 0, this.cursors);
        this.player.flipX = true;
        this.physics.add.collider(this.ground, this.player);
        this.player.setCollideWorldBounds(true);

        this.physics.add.overlap(this.player, this.bed1);
        this.physics.add.overlap(this.player, this.bed2);
        
    }
    update(){
        this.player.update();
        if(this.checkCollision(this.player, this.bed1)){
            this.bed1txt.setVisible(true);
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                this.bed1txt.text = "Sarah is sleeping in this bed"
                this.time.delayedCall(500, () => {
                    this.bed1txt.text = "Press F to sleep"
                })
            }
        }else{
            this.bed1txt.setVisible(false);
        }
        if(this.checkCollision(this.player, this.bed2)){
            this.bed2txt.setVisible(true);
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                this.cameras.main.fadeOut(1000, 0, 0, 0);
                this.time.delayedCall(3000, () => {
                    this.scene.start("end2Scene");
                }, null, this)
                //this.cameras.main.fadeIn(1000, 0, 0, 0);

            }
        }else{
            this.bed2txt.setVisible(false);
        }
    }
    checkCollision(object1, object2){
        if((object1.body.touching.left && object2.body.touching.right) ||
        (object1.body.touching.right && object2.body.touching.left)){
            return true;
        }else{
            return false;
        }
    }
}