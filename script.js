const wordEL = document.getElementById("word");
const wrongLettersEL = document.getElementById("wrong_letters");
const playAgainBtn = document.getElementById("play_again");
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

displayWord();