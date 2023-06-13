class End1 extends Phaser.Scene {
    constructor() {
        super("end1Scene");
    }

    preload() {
        this.load.image("pat", "./assets/pat.png");
        this.load.image("glass", "./assets/glass.png");
        this.load.audio("shatter", "./assets/sfx_shatter.mp3");
    }

    create() {
        currentScene = "end1Scene";

        this.add.image(game.config.width/2, game.config.height/2 - 80, 'background1');
        let pat = this.add.image(400, -480, "pat");
        this.ground = this.physics.add.image(game.config.width/2, 450, 'platform').setScale(2);
        this.ground.setImmovable(true);
        this.ground.body.allowGravity = false;
        this.player = this.physics.add.sprite(game.config.width/2 - 50, game.config.height/2 + 10, 'friend').setOrigin(0, 1);
        this.player.flipX = false;
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.ground);

        this.scream = this.sound.add('scream');
        this.scream.play();
        //pat in the noose falls from the stained glass
        let death_tween = this.add.tween({
            targets: pat,
            y: {from: -480, to: -40},
            duration: 3000,
            ease: "Bounce.easeInOut"
        })

        //her hanging body sways a little
        let sway_tween = this.tweens.chain({
            targets: pat,
            duration: 5000,
            repeat: -1,
            ease: "Quint.easeInOut",
            tweens: [{
                angle: {from: 0, to: 1}
            },
            {
                angle: {from: 1, to: 0}
            },
            {
                angle: {from: 0, to: -1}
            },
            {
                angle: {from: -1, to: 0}
            }]
        })

        //glass breaks and falls
        this.add.particles(400, -32, 'glass', { 
            gravityY: 300,
            speedX: {min: -150, max: 150},
            tint: [0xd53f3f, 0x3f50d5, 0xd1d53f],
            alpha: 0.7,
            lifespan: 5000,
            maxParticles: 20,
            delay: 1500
        });

        this.time.delayedCall(1700, () => {this.sound.play("shatter")}, null, this);
        this.time.delayedCall(3100, () => {
            this.player.setAngle(-90);
            this.player.setFrame("friend_dead");
        }, null, this); //player character death

        //go to next scene
        this.time.delayedCall(7000, () => {
            nextScene = "intro2Scene";
            this.scene.launch("transitionScene");
        }, null, this)
    }
}