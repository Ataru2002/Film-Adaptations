let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    autoCenter: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 },
            debug: false
        }
    },
    scene: [Menu, Transition, Play1]
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let keyF, keyR, keyN, keyLEFT, keyRIGHT;
let currentX, currentY;
let gamespeed = 2;
let floorcnt = 0;

let sceneManager = ["menuScene", "play1Scene"]; 
let currentScene = 0
let nextScene = 1