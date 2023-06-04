class Intro1 extends Phaser.Scene {
    constructor() {
        super("intro1Scene");
    }

    create() {
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        let textConfig = {
            fontFamily: "DotGothic",
            fontSize: "32px",
            align: "center"
        }
        this.add.text(game.config.width / 2, game.config.height / 2, "SCENE 1", textConfig).setOrigin(0.5, 0.5)
        textConfig.fontSize = "24px"
        this.add.text(game.config.width / 2, game.config.height / 2 + 50, "Your friend is in trouble,\ntry to get help from the neighbors", textConfig).setOrigin(0.5, 0.5)
    }

    update() {
        //fade transition
        if(Phaser.Input.Keyboard.JustDown(keyF)) {
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                this.scene.start("play1Scene");
            });
        }
    }
}