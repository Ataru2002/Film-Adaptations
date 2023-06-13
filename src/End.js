class End extends Phaser.Scene {
    constructor() {
        super("endScene");
    }

    create() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        let textConfig = {
            fontFamily: "DotGothic",
            fontSize: "32px",
            align: "center"
        }
        this.add.text(game.config.width / 2, game.config.height / 2, "THE END\nPress R to play again", textConfig).setOrigin(0.5, 0.5);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.start("menuScene");
        }
    }
}