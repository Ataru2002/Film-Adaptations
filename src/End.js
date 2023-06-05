class End extends Phaser.Scene {
    constructor() {
        super("endScene");
    }

    create() {
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        let textConfig = {
            fontFamily: "DotGothic",
            fontSize: "32px",
            align: "center"
        }
        this.add.text(game.config.width / 2, game.config.height / 2, "THE END", textConfig).setOrigin(0.5, 0.5);
    }
}