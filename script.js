let firstCard = null;
let secondCard = null;
let matchedPairs = 0;
let timeLeft = 150;  // Kezdő idő 60 másodperc
let timer;
let cards = [];

function createCards() {
    const gameContainer = document.querySelector('.game');
    const images = [
        "1.jpg", "2.jpg", "3.jpg", "4.jpg",
        "5.jpg", "6.jpg", "7.jpg", "8.jpg",
        "9.jpg", "10.jpg", "11.jpg", "12.jpg"
    ];

    cards = [...images, ...images]; // Párok létrehozása
    cards.sort(() => Math.random() - 0.5);  // Keverés

    gameContainer.innerHTML = '';  // Törli a régi kártyákat
    cards.forEach((image, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">?</div>
                <div class="card-back">
                    <img src="${image}" alt="Kép ${index}">
                </div>
            </div>
        `;

        card.addEventListener('click', () => flipCard(card));
        gameContainer.appendChild(card);
    });
}

function flipCard(card) {
    if (card.classList.contains('flipped')) return;
    
    card.classList.add('flipped');

    if (!firstCard) {
        firstCard = card;
    } else if (!secondCard) {
        secondCard = card;
        checkMatch();
    }
}

function checkMatch() {
    if (firstCard.querySelector('.card-back img').src === secondCard.querySelector('.card-back img').src) {
        matchedPairs++;
        reset();
        if (matchedPairs === 12) {  // Minden pár megtalálva
            clearInterval(timer);
            alert("Gratulálok, nyertél!");
            document.getElementById('restartBtn').style.display = 'block';
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            reset();
        }, 1000);
    }
}

function reset() {
    firstCard = null;
    secondCard = null;
}

function startTimer() {
    const timerDisplay = document.getElementById('timer');
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = `Idő: ${timeLeft} másodperc`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Lejárt az idő!");
            document.getElementById('restartBtn').style.display = 'block';
        }
    }, 1000);
}

function restartGame() {
    timeLeft = 150;
    matchedPairs = 0;
    document.getElementById('restartBtn').style.display = 'none';
    createCards();
    startTimer();
}

window.onload = () => {
    createCards();
    startTimer();
}

function startTimer() {
    const timerDisplay = document.getElementById('timer');
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = `Idő: ${timeLeft} másodperc`;

        // Ha 15 másodperc van hátra, háttér pirosra vált és villog
        if (timeLeft === 15) {
            document.body.classList.add('flashing');
        }

        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Lejárt az idő!");
            document.getElementById('restartBtn').style.display = 'block';
            document.body.classList.remove('flashing'); // Villogás kikapcsolása, ha lejár az idő
        }
    }, 1000);
}
