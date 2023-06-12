class Transition extends Phaser.Scene {
    constructor() {
        super("transitionScene")
    }

    create() {
        let curtains_left = this.add.image(0, 0, "curtains_left").setOrigin(1, 0);
        let curtains_right = this.add.image(game.config.width, 0, "curtains_right").setOrigin(0, 0);

        //curtains close quickly
        let transitionConfig1 = {
            targets: curtains_left,
            x: this.game.config.width / 2,
            ease: "Quint.easeIn",
            duration: 1000,
            completeDelay: 1000
        };
        //curtains open slowly
        let transitionConfig2 = {
            targets: curtains_left,
            x: 0,
            ease: "Linear",
            duration: 2000,
        };

        //curtain transition in
        this.tweens.add(transitionConfig1);
        transitionConfig1.targets = curtains_right;
        transitionConfig1.onComplete = () => {
            //curtain transition out once scene is switched beneath it
            this.tweens.add(transitionConfig2);
            transitionConfig2.targets = curtains_right;
            transitionConfig2.x = game.config.width;
            transitionConfig2.onComplete = () => {
                this.scene.stop("transitionScene") //stop transition scene so it can be launched again later
            }
            this.tweens.add(transitionConfig2);
        }
        this.tweens.add(transitionConfig1);
        this.sound.play("curtains_close")

        //switch out the scenes
        //using a timer because onComplete wasn't getting the timing right
        this.time.delayedCall(transitionConfig1.duration + 200, () => {
            this.scene.stop(currentScene);
            this.scene.launch(nextScene);
            this.scene.moveBelow(this, nextScene)
        }, null, this)
    }
}