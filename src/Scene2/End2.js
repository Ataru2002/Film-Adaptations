class End2 extends Phaser.Scene {
    constructor() {
        super("end2Scene");
    }

    preload() {
        this.load.image("director", "./assets/director.png");
        this.load.audio("snore", "./assets/Snoring.wav");
    }

    create() {
        currentScene = "end2Scene";

        this.add.sprite(game.config.width/2, game.config.height/2, 'background2').setTint(0x942222);
        this.director = this.add.sprite(game.config.width/2, game.config.height - 125, 'director').setScale(5);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.background = this.add.sprite(game.config.width/2, game.config.height/2, 'background2').setTint(0x942222).setAlpha(0.7);
        this.snore = this.sound.add("snore");
        this.snore.play();

        this.time.delayedCall(7000, () => {
            this.snore.stop();
            nextScene = "intro3Scene";
            this.scene.launch("transitionScene");
        }, null, this)
    }
}