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
    scene: [Menu, Transition, Play1, Play3, Intro1, End1, Intro2, Intro3, End]
}

let game = new Phaser.Game(config);

let keyF, keyR, keyN, keyLEFT, keyRIGHT;
let currentX, currentY;
let gamespeed = 2;
let floorcnt = 0;

let currentScene = 0
let nextScene = 1