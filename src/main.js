/*
*   Components used in this project
*       + Physics System: Player's physics
*       + Camera: Camera fading in and out
*       + Text Objects: Text appears whenever a player do a certain interaction
*       + Timer: Delaying events
*       + Particle effects: Glass shattering effects
*   Team Members: Nhan Nguyen and Lily Demos
*/



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
    scene: [Menu, Transition, Credits, Play1, Play3, Intro1, End1, Intro2, Play2, End2, Intro3, End]
}

let game = new Phaser.Game(config);

let keyF, keyR, keyC, keyLEFT, keyRIGHT;
let currentX, currentY;
let gamespeed = 2;
let floorcnt = 0;

let currentScene = 0
let nextScene = 1