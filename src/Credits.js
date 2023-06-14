class Credits extends Phaser.Scene {
    constructor() {
        super("creditScene")
    }

    preload() {
        this.load.image("credits", "./assets/Credits.png");
    }

    create() {
        this.add.image(game.config.width / 2, 0, "credits").setOrigin(0.5, 0);

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        currentScene = "creditScene";
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyF)){
            nextScene = "menuScene";
            this.scene.launch("transitionScene");
        }
    }
}