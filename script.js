const wordEL = document.getElementById("word");
const wrongLettersEL = document.getElementById("wrong_letters");
const playAgainBtn = document.getElementById("play_button");
const popup = document.getElementById("popup_container");
const notification = document.getElementById("notification_container");
const finalMessage = document.getElementById("final_message");

const figureParts = document.querySelectorAll(".figure_part");

const words = ["chef","chemical","child","chocolate"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

//show hidden word

function displayWord() {
    wordEL.innerHTML = ` ${selectedWord
        .split('')
        .map(letter => `
            <span class="letter">
                ${correctLetters.includes(letter)?letter:''}
            </span>
        `).join('')
    }`;

    const innerWord = wordEL.innerText.replace(/\n/g,'');

    if(innerWord === selectedWord) {
        finalMessage.innerText = "Congratulations u won !!";
        popup.style.display = "flex";
    }

}

// update wrong letters

function updateWrongLetterEl() {
    wrongLettersEL.innerHTML = `
        ${wrongLettersEL.length > 0 ? <p>Wrong</p> : ''}
        ${wrongLettersEL.map( letter => `<span>${letter}</span>`)}
    `;

    figureParts.forEach((part,index) => {
        const errors = wrongLettersEL.length;
        if(index < errors) {
            part.style.display = "block";
        }
        else {
            part.style.display = "none";
        }
    });

    if(wrongLettersEL === figureParts.length) {
        finalMessage.innerText = " You Lost. Better Luck next time."
        popup.style.display = "flex";
    }
}

// show notification 

function showNotification() {
    notification.classList.add("show");

    setTimeout( () => {
            notification.classList.remove("show");
    },2000);
}

// Key event listner

window.addEventListener('keydown', e => {
    if(e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if(selectedWord.includes(letter)) {
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            }
            else {
                showNotification();
            }
        }
        else {
            if(!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetterEl();
            }
            else {
                showNotification();
            }
        }
    }
});

// Restart the game

playAgainBtn.addEventListener("click", () => {
    correctLetters.splice(0);
    wrongLettersEL.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLetterEl();

    popup.style.display = "none";
});

displayWord();