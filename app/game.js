//Globales
let score = 0;
let lives = 3;
let setVelocityX;
let setVelocityY;
let scoreText;
let livesText;
let timerElement;
let gameOver = false;
let player;
let platforms;
let cursors;
let stars;
let bombs;
let scene;
let countdownInterval;
let timeRemaining = 30;
let isMusicMuted = false;
let bgMusic;

let gameState = {
    score: 0,
    lives: 3,
    timeRemaining: 30,
    gameOver: false,
    player: null,
    platforms: null,
    cursors: null,
    stars: null,
    bombs: null,
    scene: null,
    countdownInterval: null,
};

const apiKey = "NZjROKG4gC1cieYTrg8G9TQDgJz3n8Lf";
const apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=alien`;
const apiUrlcelebration = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=celebration`;

// Función: crear estrellas - 1
function collectStar(_player, star) {
    star.disableBody(true, true);
    score += 10;
    scoreText.setText("Score: " + score);
    if (stars && stars.countActive && typeof stars.countActive === "function") {
        if (stars.countActive(true) === 0) {
            stars.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
            });
            bombs = this.physics.add.group();
            createBombs(scene);
        }
    }
}

// FUNCIÓN: crear bombas - 1
function createBombs(scene, bombsGroup) {
    if (bombsGroup && bombsGroup.children && bombsGroup.children.size > 0) {
        bombsGroup.clear(true, true);
    } else {
        bombsGroup = scene.physics.add.group();
    }
    for (var i = 0; i < 5; i++) {
        var x = Phaser.Math.Between(0, window.innerWidth);
        var bomb = bombsGroup.create(x, 16, "bomb");
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
    scene.physics.add.collider(bombsGroup, platforms);
    scene.physics.add.collider(player, bombsGroup, hitBomb, null, scene);
}

// BOMBAS - 2
function createBombs2(scene, bombsGroup) {
    if (bombsGroup && bombsGroup.children && bombsGroup.children.size > 0) {
        bombsGroup.clear(true, true);
    } else {
        bombsGroup = scene.physics.add.group();
    }
    for (var i = 0; i < 5; i++) {
        var x = Phaser.Math.Between(0, window.innerWidth);
        var bomb = bombsGroup.create(x, 16, "bomb");
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
    scene.physics.add.collider(bombsGroup, platforms);
    scene.physics.add.collider(player, bombsGroup, hitBomb2, null, scene);
}

// FUNCIÓN: impacto de las bombas en el jugador - 1
function hitBomb(player, _bomb) {
    console.log("Bomba golpeada");
    if (!gameOver) {
        lives--;
        livesText.setText("Lives: " + lives);
        player.setTint(0xff0000);
        scene.tweens.add({
            targets: player,
            alpha: 0,
            duration: 100,
            ease: "Power2",
            yoyo: true,
            repeat: 1,
            onComplete: function () {
                player.clearTint();
            },
        });
        if (lives === 0) {
            endGame(); 
        } else {
            player.setX(100);
            player.setY(window.innerHeight - 100);
        }
    }
}

// IMPACTO - 2
function hitBomb2(player, _bomb) {
    console.log("Bomba golpeada");
    if (!gameOver) {
        lives--;
        livesText.setText("Lives: " + lives);
        player.setTint(0xff0000);
        scene.tweens.add({
            targets: player,
            alpha: 0,
            duration: 100,
            ease: "Power2",
            yoyo: true,
            repeat: 1,
            onComplete: function () {
                player.clearTint();
            },
        });
        if (lives === 0) {
            endGame2(); 
        } else {
            player.setX(100);
            player.setY(window.innerHeight - 100);
        }
    }
}

// FUNCIÓN: finalizar juego - 1
function endGame() {
    gameOver = true;
    scene.physics.pause();
    clearInterval(countdownInterval);
    scene.game.history = {
        score: score,
        lives: lives,
        timeRemaining: timeRemaining,
        gameOver: gameOver,
        player: player,
        platforms: platforms,
        cursors: cursors,
        stars: stars,
        bombs: bombs,
        scene: scene,
        countdownInterval: countdownInterval,
    };

    var style = {
        fontSize: "64px",
        fill: "rgba(0, 0, 0, 0)",
        stroke: "#ff0000",
        strokeThickness: 5,
        padding: {
            x: 10,
            y: 5,
        },
    };

    var gameOverText = scene.add
        .text(window.innerWidth / 2, window.innerHeight / 2, "Game Over", style)
        .setOrigin(0.5)
        .setName("gameOverText");
        style.fontSize = "32px";
        style.strokeThickness = 3;
        style.fill = "#ffffff";

    var restartText = scene.add
        .text(
            window.innerWidth / 2,
            window.innerHeight / 2 + 100,
            "Click to Restart",
            style
        )
        .setOrigin(0.5)
        .setName("restartText");

    // REINICIO DEL JUEGO
    restartText.setInteractive();
    restartText.on("pointerdown", function () {
        player.setX(100);
        player.setY(window.innerHeight - 100);
        score = 0;
        lives = 3;
        timeRemaining = 30;
        gameOver = false;
        scoreText.setText("Score: " + score);
        livesText.setText("Lives: " + lives);
        gameOverText.destroy();
        restartText.destroy();
        player.setVelocityX(0);
        player.setVelocityY(0);
        restartStarsAndBombs(scene);
        scene.physics.resume();
        startCountdown();
    });
}

// FUNCIÓN: finalizar el juego - 2
function endGame2() {
    gameOver = true;
    scene.physics.pause();
    clearInterval(countdownInterval);
    scene.game.history = {
        score: score,
        lives: lives,
        timeRemaining: timeRemaining,
        gameOver: gameOver,
        player: player,
        platforms: platforms,
        cursors: cursors,
        stars: stars,
        bombs: bombs,
        scene: scene,
        countdownInterval: countdownInterval,
    };

    var style = {
        fontSize: "64px",
        fill: "rgba(0, 0, 0, 0)",
        stroke: "#ff0000",
        strokeThickness: 5,
        padding: {
            x: 10,
            y: 5,
        },
    };

    var gameOverText = scene.add
        .text(window.innerWidth / 2, window.innerHeight / 2, "Game Over", style)
        .setOrigin(0.5)
        .setName("gameOverText");
    style.fontSize = "32px";
    style.strokeThickness = 3;
    style.fill = "#ffffff";
    
    var restartText = scene.add
        .text(
            window.innerWidth / 2,
            window.innerHeight / 2 + 100,
            "Click to Restart",
            style
        )
        .setOrigin(0.5)
        .setName("restartText");
    restartText.setInteractive();
    restartText.on("pointerdown", function () {
        player.setX(100);
        player.setY(window.innerHeight - 100);
        score = 0;
        lives = 3;
        gameOver = false;
        scoreText.setText("Score: " + score);
        livesText.setText("Lives: " + lives);
        gameOverText.destroy();
        restartText.destroy();
        player.setVelocityX(0);
        player.setVelocityY(0);
        restartStarsAndBombs2(scene);
        scene.physics.resume();
    });
}

//Reinicio de bombas
function restartStarsAndBombs(scene) {
    stars.clear(true, true);
    bombs.clear(true, true);
    stars = scene.physics.add.group({
        key: "star",
        repeat: 6,
        setXY: {
            x: window.innerWidth / 8,
            y: 0,
            stepX: window.innerWidth / 8,
        },
    });
    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
    scene.physics.add.collider(stars, platforms);
    scene.physics.add.overlap(player, stars, collectStar, null, scene);
}

//Reinicio de bombas - 2
function restartStarsAndBombs2(scene) {
    stars.clear(true, true);
    bombs.clear(true, true);
    stars = scene.physics.add.group({
        key: "star",
        setXY: {
            x: window.innerWidth / 8,
            y: 0,
            stepX: window.innerWidth / 8,
        },
    });
    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
    scene.physics.add.collider(stars, platforms);
    scene.physics.add.overlap(player, stars, collectStar, null, scene);
}

//Reinicio de juego - 1
function restartGame() {
    scene.leftAnimationCreated = false;
    scene.rightAnimationCreated = false;
    scene.turnAnimationCreated = false;
    player.setX(100);
    player.setY(window.innerHeight - 100);
    player.setVelocityX(0);
    player.setVelocityY(0);
    score = 0;
    lives = 3;
    timeRemaining = 30;
    timerElement = 30;
    gameOver = false;
    scoreText.setText("Score: " + score);
    livesText.setText("Lives: " + lives);
    updateTimerDisplay(timeRemaining);
    restartStarsAndBombs(scene);
    scene.physics.resume();
}
//Reinicio de juego - 2
function restartGameFinal() {
    cursors = gameState.scene.input.keyboard.createCursorKeys();
    player.setX(100);
    player.setY(window.innerHeight - 100);
    player.setVelocityX(0);
    player.setVelocityY(0);
    score = 0;
    lives = 3;
    timeRemaining = 30;
    gameOver = false;
    scoreText.setText("Score: " + score);
    livesText.setText("Lives: " + lives);
    restartStarsAndBombs(scene);
    scene.physics.resume();
}

// Función para iniciar la cuenta atrás del temporizador
function startCountdown() {
    timeRemaining = 30;
    updateTimerDisplay(timeRemaining);
    countdownInterval = setInterval(() => {
        timeRemaining--;
        if (timeRemaining < 0) {
            clearInterval(countdownInterval);
            if (score < 30) {
                endGame();
            }
        } else {
            updateTimerDisplay(timeRemaining);
        }
    }, 1000);
}

// Función para actualizar la pantalla del temporizador
function updateTimerDisplay(timeRemaining) {
    if (timerElement && typeof timerElement.setText === "function") {
        timerElement.setText("Time: " + timeRemaining);
    } else {
        console.error("timerElement is not initialized");
    }
}

class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: "MenuScene" });
        this.characterHistory = [];
    }

    preload() {
        this.cameras.main.setBackgroundColor("#000");
        this.load.image("backgroundmenu", "assets/img/backgroundmenu.png");
        this.load.spritesheet("dude", "assets/img/dude.png", {
            frameWidth: 32,
            frameHeight: 48,
        });
        this.load.spritesheet("dude2", "assets/img/dude2.png", {
            frameWidth: 32,
            frameHeight: 48,
        });
        this.load.audio("bgMusic", [
            "assets/audio/42309__showster1232000__loop63.wav",
        ]);
    }

    create() {
        let scene = this;
        this.bgMusic = this.sound.add("bgMusic", { loop: true, volume: 0.5 });
        if (isMusicMuted) {
            this.bgMusic.pause();
        } else {
            this.bgMusic.play();
        }

        //this.fetchGifs();

        this.backgroundMenu = this.add
            .image(
                window.innerWidth / 2,
                window.innerHeight / 2,
                "backgroundmenu"
            )
            .setDisplaySize(window.innerWidth, window.innerHeight)
            .setDepth(-1);

        this.muteButton = this.add
            .text(window.innerWidth - 300, 50, "Mute", {
                fontSize: "50px",
                fill: "#fff",
                fontFamily: "Orbitron",
            })
            .setInteractive({ useHandCursor: true });

        this.muteButton.on("pointerdown", function () {
            if (scene.bgMusic.isPlaying) {
                scene.bgMusic.pause();
                scene.muteButton.setText("Unmute");
                isMusicMuted = true;
            } else {
                scene.bgMusic.resume();
                scene.muteButton.setText("Mute");
                isMusicMuted = false;
            }
        });

        this.onButton = this.add
            .text(window.innerWidth / 3 - 200, window.innerHeight / 2.5, "GREEN", {
                fontSize: "70px",
                fill: "#fff",
                fontFamily: "Orbitron",
            })
            .setInteractive({ useHandCursor: true });

        this.onButton.on("pointerdown", function () {
            scene.onButton.setFill("#00FF00");
            scene.offButton.setFill("#FFFFFF");
            scene.startGameButton.setFill("#00FF00");
            let selectedCharacter = "dude";
            console.log(selectedCharacter);
            scene.characterHistory.push(selectedCharacter);
        });

        this.offButton = this.add
            .text(window.innerWidth / 2.5 + 50, window.innerHeight / 2.5, "RED", {
                fontSize: "70px",
                fill: "#fff",
                fontFamily: "Orbitron",
            })
            .setInteractive({ useHandCursor: true });

        this.offButton.on("pointerdown", function () {
            scene.offButton.setFill("#FF0000");
            scene.onButton.setFill("#FFFFFF");
            scene.startGameButton.setFill("#FF0000");
            let selectedCharacter = "dude2";
            console.log(selectedCharacter);
            scene.characterHistory.push(selectedCharacter);
        });

        this.startGameButton = this.add
            .text(
                window.innerWidth / 2 - -400,
                window.innerHeight / 2.5,
                "Start Game",
                {
                    fontSize: "60px",
                    fill: "#fff",
                    fontFamily: "Orbitron",
                }
            )
            .setInteractive({ useHandCursor: true });

        this.startGameButton.on("pointerdown", function () {
            if (scene.characterHistory.length === 0) {
                const characters = ["dude", "dude2"];
                let selectedCharacter = Phaser.Math.RND.pick(characters);
                console.log(
                    "Personaje aleatorio seleccionado: " + selectedCharacter
                );
                scene.characterHistory.push(selectedCharacter);
            }
            scene.scene.start("InstructionsScene");
        });

        this.scale.on("resize", this.resize, this);
        this.characterHistory = [];
    }

    resize(gameSize, baseSize, displaySize, resolution) {
        const width = gameSize.width;
        const height = gameSize.height;
        this.cameras.resize(width, height);
        this.backgroundMenu.setPosition(width / 2, height / 2);
        this.backgroundMenu.setDisplaySize(width, height);
        this.muteButton.setPosition(width - 300, 50);
        this.onButton.setPosition(width / 2 - 200, height / 2.5);
        this.offButton.setPosition(width / 2 + 50, height / 2.5);
        this.startGameButton.setPosition(width / 2 - 100, height / 1.5);
    }

    fetchGifs() {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                const gifs = data.data.map(
                    (gif) => gif.images.fixed_height.url
                );
                this.loadGifs(gifs);
            })
            .catch((error) => {
                console.error("Error fetching data from GIPHY API:", error);
            });
    }

    loadGifs(gifs) {
        gifs.forEach((gifUrl, index) => {
            this.load.image(`gif-${index}`, gifUrl);
        });
        this.load.once("complete", () => {
            this.showGifs(gifs);
        });
        this.load.start();
    }

    showGifs(gifs) {
        gifs.forEach((gifUrl, index) => {
            const x = Phaser.Math.Between(0, window.innerWidth);
            const y = Phaser.Math.Between(0, window.innerHeight);
            this.add
                .image(x, y, `gif-${index}`)
                .setDisplaySize(100, 100)
                .setDepth(-1);
        });
    }
}

class InstructionsScene extends Phaser.Scene {
    constructor() {
        super({ key: "InstructionsScene" });
    }

    create() {
        this.cameras.main.setBackgroundColor("#000"); 
        this.fetchGifs();
        this.windowRect = this.add.rectangle(
            window.innerWidth / 2,
            window.innerHeight / 2,
            600,
            400,
            0xffffff
        );

        let text =
            "Tu nave se acaba de estrellar contra el suelo terrícola. Ahora que estás condenado a llevar una vida terrestre tendrás que aprender sobre hábitos humanos. Aclaro, estos mamíferos de dos patas utilizan lo que ellos llaman 'moda', para nosotros 'stop going naked'.";
        this.instructionText = this.add
            .text(window.innerWidth / 2, window.innerHeight / 2, text, {
                fontSize: "25px",
                fill: "#000",
                fontFamily: "Orbitron",
                align: "center",
                wordWrap: { width: 500 },
            })
            .setOrigin(0.5);

        this.skipButton = this.add
            .text(window.innerWidth - 50, window.innerHeight - 50, "Skip", {
                fontSize: "24px",
                fill: "#fff",
                backgroundColor: "#000",
                padding: { x: 10, y: 5 },
                fontFamily: "Orbitron",
            })
            .setOrigin(1, 1)
            .setInteractive({ useHandCursor: true });
        this.skipButton.on(
            "pointerdown",
            function () {
                this.scene.start("InstructionsScene2"); 
            },
            this
        );

        this.scale.on("resize", this.resize, this);
    }

    resize(gameSize, baseSize, displaySize, resolution) {
        const width = gameSize.width;
        const height = gameSize.height;
        this.cameras.resize(width, height);
        this.windowRect.setPosition(width / 2, height / 2);
        this.instructionText.setPosition(width / 2, height / 2);
        this.skipButton.setPosition(width - 50, height - 50);
    }

    fetchGifs() {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                const gifs = data.data.map(
                    (gif) => gif.images.fixed_height.url
                );
                this.loadGifs(gifs);
            })
            .catch((error) => {
                console.error("Error fetching data from GIPHY API:", error);
            });
    }

    loadGifs(gifs) {
        gifs.forEach((gifUrl, index) => {
            this.load.image(`gif-${index}`, gifUrl);
        });
        this.load.once("complete", () => {
            this.showGifs(gifs);
        });
        this.load.start();
    }

    showGifs(gifs) {
        gifs.forEach((gifUrl, index) => {
            const x = Phaser.Math.Between(0, window.innerWidth);
            const y = Phaser.Math.Between(0, window.innerHeight);
            this.add
                .image(x, y, `gif-${index}`)
                .setDisplaySize(100, 100)
                .setDepth(-1);
        });
    }
}

class InstructionsScene2 extends Phaser.Scene {
    constructor() {
        super({ key: "InstructionsScene2" });
    }

    create() {
        this.cameras.main.setBackgroundColor("#000"); // Fondo negro
        this.fetchGifs();
        let windowRect = this.add.rectangle(
            window.innerWidth / 2,
            window.innerHeight / 2,
            600,
            400,
            0xffffff
        );
        let text =
            "Primero te llevaré a una lavandería, te he conseguido petos de color blanco. Sin embargo, antes de vestirte debes lavarlos porque han sido usados. Es una acción que tendrás que repetir cada vez que tu ropa huela mal o reciba alguna mancha de comida, pintura o viceversa.";
        this.add
            .text(window.innerWidth / 2, window.innerHeight / 2, text, {
                fontSize: "25px",
                fill: "#000",
                fontFamily: "Orbitron",
                align: "center",
                wordWrap: { width: 500 },
            })
            .setOrigin(0.5);

        let skipButton = this.add
            .text(window.innerWidth - 50, window.innerHeight - 50, "Skip", {
                fontSize: "24px",
                fill: "#fff",
                backgroundColor: "#000",
                padding: { x: 10, y: 5 },
                fontFamily: "Orbitron",
            })
            .setOrigin(1, 1)
            .setInteractive({ useHandCursor: true });

        skipButton.on(
            "pointerdown",
            function () {
                this.scene.start("InstructionsScene3"); 
            },
            this
        );
    }

    fetchGifs() {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                const gifs = data.data.map(
                    (gif) => gif.images.fixed_height.url
                );
                this.loadGifs(gifs);
            })
            .catch((error) => {
                console.error("Error fetching data from GIPHY API:", error);
            });
    }

    loadGifs(gifs) {
        gifs.forEach((gifUrl, index) => {
            this.load.image(`gif-${index}`, gifUrl);
        });
        this.load.once("complete", () => {
            this.showGifs(gifs);
        });
        this.load.start();
    }

    showGifs(gifs) {
        gifs.forEach((gifUrl, index) => {
            const x = Phaser.Math.Between(0, window.innerWidth);
            const y = Phaser.Math.Between(0, window.innerHeight);
            this.add
                .image(x, y, `gif-${index}`)
                .setDisplaySize(100, 100) 
                .setDepth(-1);
        });
    }
}

class InstructionsScene3 extends Phaser.Scene {
    constructor() {
        super({ key: "InstructionsScene3" });
    }

    create() {
        this.cameras.main.setBackgroundColor("#000"); 
        this.fetchGifs();
        let windowRect = this.add.rectangle(
            window.innerWidth / 2,
            window.innerHeight / 2,
            600,
            400,
            0xffffff
        );
        let text =
            "Para seguir aprendiendo sobre hábitos humanos tendrás que superar una prueba en la lavandería, tendrás que recoger un mínimo 3 petos de color blanco. Si lo consigues antes de que se acabe el tiempo o antes de que pierdas todas tus vidas, te llevaré a otro sitio.";
        this.add
            .text(window.innerWidth / 2, window.innerHeight / 2, text, {
                fontSize: "25px",
                fill: "#000",
                fontFamily: "Orbitron",
                align: "center",
                wordWrap: { width: 500 },
            })
            .setOrigin(0.5);

        let skipButton = this.add
            .text(window.innerWidth - 50, window.innerHeight - 50, "Skip", {
                fontSize: "24px",
                fill: "#fff",
                backgroundColor: "#000",
                padding: { x: 10, y: 5 },
                fontFamily: "Orbitron",
            })
            .setOrigin(1, 1)
            .setInteractive({ useHandCursor: true });
        skipButton.on(
            "pointerdown",
            function () {
            this.scene.start("InstructionsScene4"); 
            },
            this
        );
    }

    fetchGifs() {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                const gifs = data.data.map(
                    (gif) => gif.images.fixed_height.url
                );
                this.loadGifs(gifs);
            })
            .catch((error) => {
                console.error("Error fetching data from GIPHY API:", error);
            });
    }

    loadGifs(gifs) {
        gifs.forEach((gifUrl, index) => {
            this.load.image(`gif-${index}`, gifUrl);
        });
        this.load.once("complete", () => {
            this.showGifs(gifs);
        });
        this.load.start();
    }

    showGifs(gifs) {
        gifs.forEach((gifUrl, index) => {
            const x = Phaser.Math.Between(0, window.innerWidth);
            const y = Phaser.Math.Between(0, window.innerHeight);
            this.add
                .image(x, y, `gif-${index}`)
                .setDisplaySize(100, 100)
                .setDepth(-1);
        });
    }
}

class InstructionsScene4 extends Phaser.Scene {
    constructor() {
        super({ key: "InstructionsScene4" });
    }

    create() {
        this.cameras.main.setBackgroundColor("#000"); 
        this.fetchGifs();
        let windowRect = this.add.rectangle(
            window.innerWidth / 2,
            window.innerHeight / 2,
            600,
            400,
            0xffffff
        );

        let text =
            "Si te preguntas como no perder vidas, evita la ropa de colores. Por cada prenda de color con la que colisiones perderás una vida. Lección: Los humanos separan la ropa antes de lavarla en: ROPA BLANCA, ROPA NEGRA/OSCURA Y ROPA DE COLOR.";
        this.add
            .text(window.innerWidth / 2, window.innerHeight / 2, text, {
                fontSize: "25px",
                fill: "#000",
                fontFamily: "Orbitron",
                align: "center",
                wordWrap: { width: 500 },
            })
            .setOrigin(0.5);

        let skipButton = this.add
            .text(window.innerWidth - 50, window.innerHeight - 50, "Skip", {
                fontSize: "24px",
                fill: "#fff",
                backgroundColor: "#000",
                padding: { x: 10, y: 5 },
                fontFamily: "Orbitron",
            })
            .setOrigin(1, 1)
            .setInteractive({ useHandCursor: true });
        skipButton.on(
            "pointerdown",
            function () {
                this.scene.start("GameScene"); 
                createBombs(this); 
            },
            this
        );
    }

    fetchGifs() {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                const gifs = data.data.map(
                    (gif) => gif.images.fixed_height.url
                );
                this.loadGifs(gifs);
            })
            .catch((error) => {
                console.error("Error fetching data from GIPHY API:", error);
            });
    }

    loadGifs(gifs) {
        gifs.forEach((gifUrl, index) => {
            this.load.image(`gif-${index}`, gifUrl);
        });
        this.load.once("complete", () => {
            this.showGifs(gifs);
        });
        this.load.start();
    }

    showGifs(gifs) {
        gifs.forEach((gifUrl, index) => {
            const x = Phaser.Math.Between(0, window.innerWidth);
            const y = Phaser.Math.Between(0, window.innerHeight);
            this.add
                .image(x, y, `gif-${index}`)
                .setDisplaySize(100, 100) 
                .setDepth(-1);
        });
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" }); 
    }

    preload() {
        this.load.image("background", "assets/img/background.png");
        this.load.image("ground", "assets/img/platform.png");
        this.load.image("star", "assets/img/star.png");
        this.load.image("bomb", "assets/img/bomb.png");
        this.load.spritesheet("dude", "assets/img/dude.png", {
            frameWidth: 32,
            frameHeight: 48,
        });
        this.load.spritesheet("dude2", "assets/img/dude2.png", {
            frameWidth: 32,
            frameHeight: 48,
        });
    }

    create() {
        gameState.scene = this;
        this.leftAnimationCreated = false;
        this.rightAnimationCreated = false;
        this.turnAnimationCreated = false;
        scene = this;
        this.background = this.add
            .image(window.innerWidth / 2, window.innerHeight / 2, "background")
            .setDisplaySize(window.innerWidth, window.innerHeight);

        platforms = this.physics.add.staticGroup();
        this.ground = platforms
            .create(window.innerWidth / 2, window.innerHeight - 16, "ground")
            .setDisplaySize(window.innerWidth, 32)
            .refreshBody();
        this.platform1 = platforms.create(
            600,
            window.innerHeight - 150,
            "ground"
        );
        this.platform2 = platforms.create(
            210,
            window.innerHeight - 250,
            "ground"
        );
        this.platform3 = platforms.create(
            750,
            window.innerHeight - 280,
            "ground"
        );
        this.platform4 = platforms.create(
            window.innerWidth - 210,
            window.innerHeight - 200,
            "ground"
        );
        this.platform5 = platforms.create(
            window.innerWidth - 600,
            window.innerHeight - 150,
            "ground"
        );

        const menuScene = this.scene.get("MenuScene");
        const selectedCharacter =
            menuScene.characterHistory[menuScene.characterHistory.length - 1];

        player = this.physics.add.sprite(
            100,
            window.innerHeight - 100,
            selectedCharacter
        );
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers(selectedCharacter, {
                start: 0,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: "turn",
            frames: [{ key: selectedCharacter, frame: 4 }],
            frameRate: 20,
        });
        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers(selectedCharacter, {
                start: 5,
                end: 8,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.physics.add.collider(player, platforms);
        cursors = this.input.keyboard.createCursorKeys();
        stars = this.physics.add.group({
            key: "star",
            repeat: 6,
            setXY: {
                x: window.innerWidth / 8,
                y: 0,
                stepX: window.innerWidth / 8,
            },
        });

        stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        this.physics.add.collider(stars, platforms);
        this.physics.add.overlap(player, stars, collectStar, null, this);
        scoreText = this.add.text(25, 60, "Score: 0", {
            fontSize: "27px",
            fill: "#fff",
            fontFamily: "Orbitron",
        });

        livesText = this.add.text(25, 20, "Lives: 3", {
            fontSize: "27px",
            fill: "#fff",
            fontFamily: "Orbitron",
        });

        timerElement = this.add.text(window.innerWidth / 2, 40, "Time: 30", {
            fontSize: "27px",
            fill: "#fff",
            fontFamily: "Orbitron",
        });
        timerElement.setOrigin(0.5);
        bombs = this.physics.add.group();
        createBombs(this);
        startCountdown();

        this.game.history = {
            score: score,
            lives: lives,
            timeRemaining: timeRemaining,
            gameOver: gameOver,
            player: player,
            platforms: platforms,
            cursors: cursors,
            stars: stars,
            bombs: bombs,
            scene: scene,
            countdownInterval: countdownInterval,
        };

        this.scale.on("resize", this.resize, this);
    }

    resize(gameSize, baseSize, displaySize, resolution) {
        const width = gameSize.width;
        const height = gameSize.height;
        this.cameras.resize(width, height);
        this.background
            .setPosition(width / 2, height / 2)
            .setDisplaySize(width, height);
        this.ground
            .setPosition(width / 2, height - 16)
            .setDisplaySize(width, 32)
            .refreshBody();
        this.platform4.setPosition(width - 210, height - 200).refreshBody();
        this.platform5.setPosition(width - 600, height - 150).refreshBody();
        timerElement.setPosition(width / 2, 40);
    }

    update() {
        if (gameOver) {
            return;
        }
        if (cursors.left.isDown) {
            player.setVelocityX(-160);
            player.anims.play("left", true);
        } else if (cursors.right.isDown) {
            player.setVelocityX(160);
            player.anims.play("right", true);
        } else {
            player.setVelocityX(0);
            player.anims.play("turn");
        }
        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-330);
        }
        if (score >= 30 && !gameOver) {
            gameOver = true;
            this.physics.pause();
            clearInterval(countdownInterval);
            let winnerText = this.add
                .text(window.innerWidth / 2, window.innerHeight / 2, "Winner", {
                    fontSize: "64px",
                    fill: "#00ff00",
                    stroke: "#ffffff",
                    strokeThickness: 5,
                    padding: { x: 10, y: 5 },
                })
                .setOrigin(0.5);

            let backToMenuButton = this.add
                .text(
                    window.innerWidth / 2,
                    window.innerHeight / 2 + 100,
                    "Back to menu",
                    {
                        fontSize: "32px",
                        fill: "#ffffff",
                        stroke: "#000000",
                        strokeThickness: 3,
                    }
                )
                .setOrigin(0.5);

            let nextLevelButton = this.add
                .text(
                    window.innerWidth / 2,
                    window.innerHeight / 2 + 160,
                    "Next Level",
                    {
                        fontSize: "32px",
                        fill: "#ffffff",
                        stroke: "#000000",
                        strokeThickness: 3,
                    }
                )
                .setOrigin(0.5);
            backToMenuButton.setInteractive();
            backToMenuButton.on(
                "pointerdown",
                function () {
                    this.scene.start("MenuScene");
                    restartGame();
                },
                this
            );
            nextLevelButton.setInteractive();
            nextLevelButton.on(
                "pointerdown",
                function () {
                    restartGame();
                    this.scene.start("InstructionsSceneA");
                },
                this
            );
        }
    }
}

class InstructionsSceneA extends Phaser.Scene {
    constructor() {
        super({ key: "InstructionsSceneA" });
    }

    create() {
        this.cameras.main.setBackgroundColor("#000"); 
        this.fetchGifs();
        let windowRect = this.add.rectangle(
            window.innerWidth / 2,
            window.innerHeight / 2,
            600,
            400,
            0xffffff
        );

        let text =
            "¡Enhorabuena, ahora cuentas con un mínimo de prendas! Ahora que has aprendido que la ropa blanca se separa de la ropa oscura y de la ropa de color, es importante que empieces a familiarizarte con lugares públicos como los baños. Cuando vistas de blanco recuerda tener cuidado con las manchas (algunas no salen).";
        this.add
            .text(window.innerWidth / 2, window.innerHeight / 2, text, {
                fontSize: "25px",
                fill: "#000",
                fontFamily: "Orbitron",
                align: "center",
                wordWrap: { width: 500 },
            })
            .setOrigin(0.5);

        let skipButton = this.add
            .text(window.innerWidth - 50, window.innerHeight - 50, "Skip", {
                fontSize: "24px",
                fill: "#fff",
                backgroundColor: "#000",
                padding: { x: 10, y: 5 },
                fontFamily: "Orbitron",
            })
            .setOrigin(1, 1)
            .setInteractive({ useHandCursor: true });
        skipButton.on(
            "pointerdown",
            function () {
                this.scene.start("InstructionsSceneB");
            },
            this
        );
    }

    fetchGifs() {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                const gifs = data.data.map(
                    (gif) => gif.images.fixed_height.url
                );
                this.loadGifs(gifs);
            })
            .catch((error) => {
                console.error("Error fetching data from GIPHY API:", error);
            });
    }

    loadGifs(gifs) {
        gifs.forEach((gifUrl, index) => {
            this.load.image(`gif-${index}`, gifUrl);
        });
        this.load.once("complete", () => {
            this.showGifs(gifs);
        });
        this.load.start();
    }

    showGifs(gifs) {
        gifs.forEach((gifUrl, index) => {
            const x = Phaser.Math.Between(0, window.innerWidth);
            const y = Phaser.Math.Between(0, window.innerHeight);
            this.add
                .image(x, y, `gif-${index}`)
                .setDisplaySize(100, 100) 
                .setDepth(-1);
        });
    }
}

class InstructionsSceneB extends Phaser.Scene {
    constructor() {
        super({ key: "InstructionsSceneB" });
    }

    create() {
        this.cameras.main.setBackgroundColor("#000"); 
        this.fetchGifs();
        let windowRect = this.add.rectangle(
            window.innerWidth / 2,
            window.innerHeight / 2,
            600,
            400,
            0xffffff
        );

        let text =
            "El plan ahora es superar la dificultad del nivel 2, aunque no estés en una lavandería, no debes olvidar lo que has aprendido estés donde estés. ¡Mucha suerte! El lugar es un incentivo para nuevos aprendizajes, además, no tendrás un temporizador :)";
        this.add
            .text(window.innerWidth / 2, window.innerHeight / 2, text, {
                fontSize: "25px",
                fill: "#000",
                fontFamily: "Orbitron",
                align: "center",
                wordWrap: { width: 500 },
            })
            .setOrigin(0.5);

        let skipButton = this.add
            .text(window.innerWidth - 50, window.innerHeight - 50, "Skip", {
                fontSize: "24px",
                fill: "#fff",
                backgroundColor: "#000",
                padding: { x: 10, y: 5 },
                fontFamily: "Orbitron",
            })
            .setOrigin(1, 1)
            .setInteractive({ useHandCursor: true });
        skipButton.on(
            "pointerdown",
            function () {
            this.scene.start("GameScene2"); 
            },
            this
        );
    }

    fetchGifs() {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                const gifs = data.data.map(
                (gif) => gif.images.fixed_height.url
                );
                this.loadGifs(gifs);
            })
            .catch((error) => {
                console.error("Error fetching data from GIPHY API:", error);
            });
    }

    loadGifs(gifs) {
        gifs.forEach((gifUrl, index) => {
            this.load.image(`gif-${index}`, gifUrl);
        });
        this.load.once("complete", () => {
            this.showGifs(gifs);
        });
        this.load.start();
    }

    showGifs(gifs) {
        gifs.forEach((gifUrl, index) => {
            const x = Phaser.Math.Between(0, window.innerWidth);
            const y = Phaser.Math.Between(0, window.innerHeight);
            this.add
                .image(x, y, `gif-${index}`)
                .setDisplaySize(100, 100)
                .setDepth(-1);
        });
    }
}

class GameScene2 extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene2" });
    }

    preload() {
        this.load.image("background2", "assets/img/background2.png");
        this.load.image("ground", "assets/img/platform.png");
        this.load.image("star", "assets/img/star.png");
        this.load.image("bomb", "assets/img/bomb.png");
        this.load.spritesheet("dude", "assets/img/dude.png", {
            frameWidth: 32,
            frameHeight: 48,
        });
        this.load.spritesheet("dude2", "assets/img/dude2.png", {
            frameWidth: 32,
            frameHeight: 48,
        });
    }

    create() {
        gameState.scene = this;
        this.leftAnimationCreated = false;
        this.rightAnimationCreated = false;
        this.turnAnimationCreated = false;
        scene = this;
        this.background = this.add
            .image(window.innerWidth / 2, window.innerHeight / 2, "background2")
            .setDisplaySize(window.innerWidth, window.innerHeight);

        platforms = this.physics.add.staticGroup();
        this.ground = platforms
            .create(window.innerWidth / 2, window.innerHeight - 16, "ground")
            .setDisplaySize(window.innerWidth, 32)
            .refreshBody();
        this.platform1 = platforms
            .create(600, 450, "ground")
            .setScale(2)
            .refreshBody();
        this.platform2 = platforms.create(200, 150, "ground");
        this.platform3 = platforms.create(750, 300, "ground");
        this.platform4 = platforms
            .create(1100, 600, "ground")
            .setScale(1)
            .refreshBody();
        this.platform5 = platforms.create(750, 750, "ground");
        this.platform6 = platforms.create(500, 350, "ground");
        const menuScene = this.scene.get("MenuScene");
        const selectedCharacter =
            menuScene.characterHistory[menuScene.characterHistory.length - 1];

        player = this.physics.add.sprite(
            100,
            window.innerHeight - 100,
            selectedCharacter
        );
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers(selectedCharacter, {
                start: 0,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: "turn",
            frames: [{ key: selectedCharacter, frame: 4 }],
            frameRate: 20,
        });
        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers(selectedCharacter, {
                start: 5,
                end: 8,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.physics.add.collider(player, platforms);
        cursors = this.input.keyboard.createCursorKeys();
        stars = this.physics.add.group({
            key: "star",
            setXY: { x: 12, y: 0, stepX: 70 },
        });

        this.physics.add.collider(stars, platforms);
        this.physics.add.overlap(player, stars, this.collectStar, null, this);

        scoreText = this.add.text(25, 60, "Score: 0", {
            fontSize: "27px",
            fill: "#fff",
            fontFamily: "Orbitron",
        });

        livesText = this.add.text(25, 20, "Lives: 3", {
            fontSize: "27px",
            fill: "#fff",
            fontFamily: "Orbitron",
        });

        bombs = this.physics.add.group();
        createBombs2(this);
        this.game.history = {
            score: score,
            lives: lives,
            timeRemaining: timeRemaining,
            gameOver: gameOver,
            player: player,
            platforms: platforms,
            cursors: cursors,
            stars: stars,
            bombs: bombs,
            scene: scene,
            countdownInterval: countdownInterval,
        };
        this.scale.on("resize", this.resize, this);
    }

    resize(gameSize, baseSize, displaySize, resolution) {
        const width = gameSize.width;
        const height = gameSize.height;
        this.cameras.resize(width, height);
        this.background
            .setPosition(width / 2, height / 2)
            .setDisplaySize(width, height);
        this.ground
            .setPosition(width / 2, height - 16)
            .setDisplaySize(width, 32)
            .refreshBody();
        this.platform4.setPosition(1100, height - 100).refreshBody();
    }

    collectStar(player, star) {
        star.disableBody(true, true);
        score += 10;
        scoreText.setText("Score: " + score);
        if (stars.countActive(true) === 0) {
            platforms.remove(this.platform4, true, true);
        }
    }

    update() {
        if (gameOver) {
            return;
        }
        if (cursors.left.isDown) {
            player.setVelocityX(-160);
            player.anims.play("left", true);
        } else if (cursors.right.isDown) {
            player.setVelocityX(160);
            player.anims.play("right", true);
        } else {
            player.setVelocityX(0);
            player.anims.play("turn");
        }
        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-330);
        }
        if (score >= 10 && !gameOver) {
            gameOver = true;
            this.physics.pause();
            clearInterval(countdownInterval);
            restartGameFinal();
            this.scene.start("WinScene");
        }
    }
}

class WinScene extends Phaser.Scene {
    constructor() {
        super({ key: "WinScene" });
    }

    create() {
        this.cameras.main.setBackgroundColor("#000");
        this.fetchGifs2();
        let windowRect = this.add.rectangle(window.innerWidth / 2, window.innerHeight / 2, 600, 400, 0xffffff);
        let text =
            "POR FIN EL ALIEN HA APRENDIDO SOBRE LA VIDA HUMANA. ¡BIEEEEN! HIZO MUCHOS AMIGOS Y FUE MUY FELIZ DESPUÉS DE ESTE APRENDIZAJE";
        this.add
            .text(window.innerWidth / 2, window.innerHeight / 2, text, {
                fontSize: "25px",
                fill: "#000",
                fontFamily: "Orbitron",
                align: "center",
                wordWrap: { width: 500 },
            })
            .setOrigin(0.5);

        //"Back to menu"
        let backToMenuButton = this.add
            .text(
                window.innerWidth / 2,
                window.innerHeight / 2 + 100,
                "Back to menu",
                {
                    fontSize: "32px",
                    fill: "#ffffff",
                    stroke: "#000000",
                    strokeThickness: 3,
                }
            )
            .setOrigin(0.5);
        backToMenuButton.setInteractive();
        backToMenuButton.on(
            "pointerdown",
            function () {
                this.scene.start("MenuScene"); 
            },
            this
        );
    }

    fetchGifs2() {
        fetch(apiUrlcelebration)
            .then((response2) => response2.json())
            .then((data2) => {
                const gifs2 = data2.data.map(
                    (gif2) => gif2.images.fixed_height.url
                );
                this.loadGifs2(gifs2);
            })
            .catch((error) => {
                console.error("Error fetching data from GIPHY API:", error);
            });
    }

    loadGifs2(gifs2) {
        gifs2.forEach((gifUrl2, index2) => {
            this.load.image(`gif2-${index2}`, gifUrl2);
        });
        this.load.once("complete", () => {
            this.showGifs2(gifs2);
        });
        this.load.start();
    }

    showGifs2(gifs2) {
        const rows = 10; 
        const cols = 10; 
        const cellWidth = window.innerWidth / cols;
        const cellHeight = window.innerHeight / rows;
        let index2 = 0;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = col * cellWidth + cellWidth / 2;
                const y =
                    row * cellHeight + cellHeight / 2 + (cellHeight - 100) / 2;
                this.add
                    .image(x, y, `gif2-${index2}`)
                    .setDisplaySize(150, 150) 
                    .setDepth(-1);
                index2++;
                if (index2 >= gifs2.length) {
                    index2 = 0;
                }
            }
        }
    }
}

// GameScene y GameScene2
const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 300 },
            debug: false,
        },
    },
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth,
        height: window.innerHeight,
    },
    scene: [
        MenuScene,
        InstructionsScene,
        InstructionsScene2,
        InstructionsScene3,
        InstructionsScene4,
        GameScene,
        InstructionsSceneA,
        InstructionsSceneB,
        GameScene2,
        WinScene,
    ],
};

const game = new Phaser.Game(config);