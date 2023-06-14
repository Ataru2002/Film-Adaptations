class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        this.load.image("curtains_left", "./assets/curtains_left.png");
        this.load.image("curtains_right", "./assets/curtains_right.png");
        this.load.image("title_screen", "./assets/title_screen.png");
        this.load.audio("curtains_close", "./assets/curtains_close.wav");
    }

    create() {
        this.add.image(game.config.width / 2, 0, "title_screen").setOrigin(0.5, 0);

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        currentScene = "menuScene";
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyC)){
            nextScene = "creditScene";
            this.scene.launch("transitionScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyF)){
            nextScene = "intro1Scene";
            this.scene.launch("transitionScene");
        }
    }
}