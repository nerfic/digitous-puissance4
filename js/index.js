$(document).ready(function () {

    var board = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ];

    var player = 1;
    var line = [5, 5, 5, 5, 5, 5, 5]
    var pionPlayer = 'player1';

    function printBoard() {
        var boardHtml = `<div class="container">`;
        for (var i = 0; i < 6; i++) {
            boardHtml += `<div class="row" id="row${i}">`; // Génère les lignes
            for (var j = 0; j < 7; j++) {
                boardHtml += `<div class="col-1 case" id="${i}-${j}">${board[i][j]}</div>`; // Génère les colonnes
            }
            boardHtml += `</div>`;
        }
        boardHtml += `<div class="row">`;
        for (var k = 0; k < 7; k++) { // Génère les button
            boardHtml += `<div class="col-1"><input type="button" value="${k + 1}" id="column${k}" alt="play at ${k + 1}"></div>`;
        }
        boardHtml += `</div>`;
        $('#board').html(boardHtml)
    }

    function choosePlayer() { // Fonction pour choisir le joueur
        if (player === 2) { // Nombre pair = joueur2
            player = 1;
            pionPlayer = 'player1';
            $(`#tour`).html('<p>Au tour du joueur 1</p>')
        } else { // Nombre impaire = joueur1
            player = 2;
            pionPlayer = 'player2'
            $(`#tour`).html('<p>Au tour du joueur 2</p>')
        }
    }

    function playOnColumn(column) { // Fonction pour jouer sur la colonne

        if (board[line[column]][column] === 0) { // Si la dernière ligne = 0
            $(`#${line[column]}-${column}`).addClass(pionPlayer) // Alors j'ajoute un pion
            board[line[column]][column] = player; // Remplace par le chiffre du joueur
            checkRow(line[column], player);
            // checkColumn(line[column], player);
        } else if (board[line[column]][column] === 1 || board[line[column]][column] === 2) { // Si non si la ligne = 1
            if (line[column] === 0) { // Si le joueur essaye de jouer sur la première ligne
                console.log("fin de la colonne, impossible de rajoute des pions"); // Alors j'indique qu'on ne peut plus mettre de pion
            } else { // Si non
                line[column]--;
                $(`#${line[column]}-${column}`).addClass(pionPlayer) // Je joue le pion
                board[line[column]][column] = player; // Remplace par le chiffre du joueur
                checkRow(line[column], player);
                // checkColumn(line[column], player);
            }
        }
        choosePlayer();
    }

    function checkRow(row, player) {
        for (var i = 0; i < 7; i++) {
            if (board[row][i] === player &&
                board[row][i + 1] === player &&
                board[row][i + 2] === player &&
                board[row][i + 3] === player) {
                console.log("Gagné! en ligne par le joueurs", player);
            }
        }
    }

    function checkColumn(column, player) {
        for (var i = 0; i < 6; i++) {
            if (board[i][column] === player &&
                board[i + 1][column] === player &&
                board[i + 2][column] === player &&
                board[i + 3][column] === player) {
                console.log("Gagné! en colonne par le joueurs", player)
                break;
            } else {
                console.log("Pas de win colonne")
            }
        }
    }

    function playWithButton() { // Fonction boutton pour jouer sur la colonne
        $(`#column0`).click(() => { playOnColumn(0) })
        $(`#column1`).click(() => { playOnColumn(1) })
        $(`#column2`).click(() => { playOnColumn(2) })
        $(`#column3`).click(() => { playOnColumn(3) })
        $(`#column4`).click(() => { playOnColumn(4) })
        $(`#column5`).click(() => { playOnColumn(5) })
        $(`#column6`).click(() => { playOnColumn(6) })
        $(`#column7`).click(() => { playOnColumn(7) })
    }

    // function playWithCase() { // Boutton pour cliquer sur les cases
    //     $(`#0-0`).click(() => { playOnColumn(0) })
    //     $(`#0-1`).click(() => { playOnColumn(1) })
    //     $(`#0-2`).click(() => { playOnColumn(2) })
    //     $(`#0-3`).click(() => { playOnColumn(3) })
    //     $(`#0-4`).click(() => { playOnColumn(4) })
    //     $(`#0-5`).click(() => { playOnColumn(5) })
    //     $(`#0-6`).click(() => { playOnColumn(6) })
    // }

    printBoard()
    playWithButton()

})