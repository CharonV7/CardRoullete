function fillCards(){
    const cards = [];
    for (let i = 0; i < 4; i++){
        cards.push(1);
        cards.push(2);
        cards.push(3);
        cards.push(4);
        cards.push(5);
        cards.push(6);
        cards.push(7);
        cards.push(8);
        cards.push(9);
        cards.push(10);
        cards.push("J");
        cards.push("Q");
        cards.push("K");
        cards.push("A");
    }
    return cards;
}


// Choosing two random cards
function getRandomCard(num){
    return Math.floor(Math.random() * num);
}

function changeCard(userCard, botCard){
    const playerh = document.querySelector("#player");
    const both = document.querySelector("#bot");

    playerh.textContent = userCard;
    both.textContent = botCard;

}

// This language is fucking shit, what is this shit???
function buttonClick(cont){
    let prom = new Promise(function(resolve){
        function handler(){
            cont.removeEventListener("click",handler);
            resolve();
        }

        cont.addEventListener("click",handler);
    });

    return prom;
}

async function whoWonRound(userCard,botCard,points){
    let pointsUser;
    let pointsBot;

    if (userCard === "Q" || userCard === "K" || userCard === "J"){
       pointsUser = 10; 
    }
    else if (userCard === "A"){
        pointsUser = 11;
    }
    else{
        pointsUser = userCard;
    }

    if (botCard === "Q" || botCard === "K" || botCard === "J"){
       pointsBot = 10; 
    }
    else if (botCard === "A"){
        pointsBot = 11;
    }
    else{
        pointsBot = botCard;
    }

    const won = document.querySelector("#roundWon");

    if (pointsUser > pointsBot){
        const pointU = document.querySelector("#userP");
        points[0]++;
        pointU.textContent = points[0];

        won.hidden = false;
        won.textContent = "User Won!";

    }
    else if (pointsBot > pointsUser){
        const pointB = document.querySelector("#botP");
        points[1]++;
        pointB.textContent = points[1];

        won.hidden = false;
        won.textContent = "Bot Won!";

    }
    else{
        // its a tie no points given!
        won.hidden = false;
        won.textContent = "It's a tie";
    }

    const cont = document.querySelector("#continue");
    cont.hidden = false;

    await buttonClick(cont);

    return points;

}

function reset(points){
    // hide all the stuff
    const cont = document.querySelector("#continue");
    cont.hidden = true;

    const won = document.querySelector("#roundWon");
    won.hidden = true;


    const playButton = document.querySelector("#play");
    playButton.hidden = false;
    playButton.addEventListener("click",main);

    if (points[0] > points[1]){
        const gwon = document.querySelector("#gameWon");
        gwon.textContent = "The User won the game!";
        gwon.hidden = false;
    }
    else if (points[0] < points[1]){
        const gwon = document.querySelector("#gameWon");
        gwon.textContent = "The Bot won the game!";
        gwon.hidden = false;
    }
    else{
        const gwon = document.querySelector("#gameWon");
        gwon.textContent = "The game is a tie!";
        gwon.hidden = false;
    }

}

// game loop
async function main(){
    let numCards = 52;
    let i = 0;
    let points = [0,0];
    let cards = fillCards();

    const playButton = document.querySelector("#play");
    playButton.hidden = true;

    const gwon = document.querySelector("#gameWon");
    gwon.hidden = true;

    const pointB = document.querySelector("#botP");
    pointB.textContent = 0;

    const pointU = document.querySelector("#userP");
    pointU.textContent = 0;

    // 10 rounds will be played 
    while (i < 10){
        let random = getRandomCard(numCards);
        let playerCard = cards[random];
        numCards = numCards - 1;
        cards.splice(random,1);

        random = getRandomCard(numCards);
        let botCard = cards[random];
        numCards = numCards - 1;
        cards.splice(random,1);

        changeCard(playerCard,botCard);

        points = await whoWonRound(playerCard,botCard,points);

        i++;
    }

    reset(points);
}

const playButton = document.querySelector("#play");
playButton.addEventListener("click",main);

