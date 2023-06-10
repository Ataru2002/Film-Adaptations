class Play3 extends Phaser.Scene{
    constructor(){
        super("play3Scene");
    }
    preload(){
        this.load.image("platform", './assets/platform.png');
        this.load.image("bed", './assets/Bed.png');
        this.load.image("background3", './assets/background1.jpg');
        this.load.image("character", './assets/character.png');
        this.load.image("coffin", './assets/Coffin.png');
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
        this.background = this.add.sprite(game.config.width/2, game.config.height/2, 'background3');
        this.ground = this.physics.add.image(game.config.width/2, 450, 'platform').setScale(2);
        this.ground.setImmovable(true);
        this.ground.body.allowGravity = false;
        this.cursors = this.input.keyboard.createCursorKeys();

        //Bed Sprite
        this.bed = this.physics.add.image(game.config.width/2 + 250, game.config.height/2 + 30, "bed").setScale(0.15)
        this.bed.setImmovable(true);
        this.bed.body.allowGravity = false;
        this.physics.add.collider(this.bed, this.ground);
        
        //Character Sprite: Director, Sarah, and also the player
        this.director = this.physics.add.sprite(game.config.width/2 + 250, game.config.height/2 - 30, 'character');
        this.directortext = this.add.text(game.config.width/2 + 100, game.config.height/2 - 70, "Press F to kill the director", menuConfig);
        this.directortext.setVisible(false);
        this.physics.add.collider(this.bed, this.director);
        this.director.setVisible(false);
        this.player = new Player(this, game.config.width/2 + 150, game.config.height/2 + 10, 'character', 0, this.cursors);
        this.physics.add.collider(this.ground, this.player);
        this.sarah = this.physics.add.sprite(game.config.width/2 - 280, game.config.height/2 + 10, 'character');
        this.sarah.flipX = true;
        this.sarah.setActive(false);
        this.sarah.setVisible(false);
        this.physics.add.collider(this.ground, this.sarah);
        this.physics.add.collider(this.player, this.sarah, () => {
            //Lose the game when sarah touches suzy
            //the code right now will cause an error but it's use as a placeholder for the end of the game
            this.scene.reset();
        });

        //coffin
        this.coffin = this.add.sprite(game.config.width/2 - 280, game.config.height/2 - 30, 'coffin');

        //the coffin disappears and sarah appears
        this.time.delayedCall(1700, () => {
            this.sarah.setActive(true);
            this.sarah.setVisible(true);
            this.coffin.setActive(false);
            this.coffin.setVisible(false);
        }, null, this);
    }
    update(){
        this.player.update2(); //Suzy standing still
        if(this.sarah.active) this.sarah.setVelocityX(90); //Sarah rushing to Suzy
        if(this.sarah.active && !this.director.visible && Math.floor(Math.random() * 100) == 50){
            this.director.setVisible(true);
            this.time.delayedCall(1000, () => {
                this.director.setVisible(false);
                this.directortext.setVisible(false);
            })
        }
        if(this.director.visible && this.player.flipX){
            this.directortext.setVisible(true);
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                //Win the game if Suzy kills the director
                //the code right now will cause an error but it's use as a placeholder for the end of the game
                this.scene.reset();
            }
        }else{
            this.directortext.setVisible(false);
        }
    }
}