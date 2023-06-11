class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, cursors){
        super(scene, x, y, texture, frame);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.cursors = cursors;
        this.setVelocity(0, 180);
    }
    update(){
        if (this.cursors.left.isDown){
            this.setVelocity(-180, 180);
            this.flipX = true;
        }else if (this.cursors.right.isDown){
            this.setVelocity(180, 180);
            this.flipX = false;
        }else{
            this.setVelocity(0, 180);
            this.stop();
        }

        if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
            this.play("walk");
        }
        else if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
            this.play("walk");
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