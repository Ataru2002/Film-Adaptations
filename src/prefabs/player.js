class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, cursors, animate){
        super(scene, x, y, texture, frame);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.cursors = cursors;
        this.setVelocity(0, 180);
        this.animate = animate
    }

    update(){
        if (this.cursors.left.isDown){
            this.setVelocity(-180, 180);
            this.flipX = true;
        }else if (this.cursors.right.isDown){
            this.setVelocity(180, 180);
            this.flipX = false;
        }else{
            this.stop();
            this.setVelocity(0, 180);
        }

        if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
            if(this.animate == "walk")
                this.play("walk");
            if(this.animate == "walk2")
                this.play("walk2");
        }
        else if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
            if(this.animate == "walk")
                this.play("walk");
            if(this.animate == "walk2")
                this.play("walk2");
        }
    }

    update2(){
        if (this.cursors.left.isDown){
            this.flipX = true;
        }else if (this.cursors.right.isDown){
            this.flipX = false;
        }else{
            this.setVelocity(0, 180);
        }
    }

    movepos(x, y){
        this.x = x;
        this.y = y;
    }
}