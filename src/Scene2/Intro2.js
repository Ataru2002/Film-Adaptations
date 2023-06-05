class Intro2 extends Phaser.Scene {
    constructor() {
        super("intro2Scene");
    }

    create() {
        currentScene = "intro2Scene";
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        let textConfig = {
            fontFamily: "DotGothic",
            fontSize: "32px",
            align: "center"
        }
        this.add.text(game.config.width / 2, game.config.height / 2, "SCENE 2", textConfig).setOrigin(0.5, 0.5);
        textConfig.fontSize = "24px";
        this.add.text(game.config.width / 2, game.config.height / 2 + 50, "Get to sleep", textConfig).setOrigin(0.5, 0.5);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyF)){
            nextScene = "intro3Scene"
            this.scene.launch("transitionScene")
        }
    }
}