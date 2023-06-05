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
            this.flipX = false;
        }else if (this.cursors.right.isDown){
            this.setVelocity(180, 180);
            this.flipX = true;
        }else{
            this.setVelocity(0, 180);
        }
    }
    movepos(x, y){
        this.x = x;
        this.y = y;
    }
}