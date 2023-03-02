GET_WORD = "https://words.dev-apis.com/word-of-the-day";
VALIDATE_WORD = "https://words.dev-apis.com/validate-word";

const ANSWER_LENGTH = 5;
const ROUNDS = 6;
const infoBar = document.querySelector(".info-bar");
const letters = document.querySelectorAll(".scoreboard-letter");

function Submit() {
}



// function handleWord() {

//     let index = 0;

//     while (index < 5) {
//         let currentElement = document.getElementById(`letter-${index}`);
//         console.log(currentElement)

//         addEventListener("keydown", (e) => {
//             console.log(e.key);
//             if (isLetter(e.key)) {
//             handleLetter(e.key, currentElement);
//             } else if (e.key == "Enter") {
//             handleSubmit(completeWord);
//             }
//     })

//         index += 1
//         removeEventListener("keydown", null);
// }
// }

async function init() {

  let currentGuess = "";
  let currentRow = 0;
  let isLoading = true;
  let done = false;

  console.log(letters.parentNode)

  const res = await fetch(GET_WORD);
  const { word: wordRes } = await res.json();
  const word = wordRes.toUpperCase();
  const wordParts = word.split("");
  isLoading = false;
  setLoading(isLoading)


    function addLetter(letter) {
        if (currentGuess.length < ANSWER_LENGTH) {
            currentGuess += letter;
        }
        else {
            currentGuess = currentGuess.substring(0,currentGuess.length-1) + letter;
            console.log(currentGuess);
        }

        letters[currentRow * ANSWER_LENGTH + currentGuess.length-1].innerText = letter;

    }

    async function Submit() {
        if (currentGuess.length < 5) {
            Flash(letters[currentRow * ANSWER_LENGTH + currentGuess.length-1]);
            return;
        } 

        isLoading = true;
        setLoading(isLoading);
        const res = await fetch(VALIDATE_WORD, {
            method: "POST",
            body: JSON.stringify({word: currentGuess})
        });

        const { validWord } = await res.json();
        isLoading = false;
        setLoading(isLoading);

        if (!validWord) {
            Flash(letters[currentRow * ANSWER_LENGTH + currentGuess.length-1]);
            return;
        }

        const guessParts = currentGuess.split("");
        const map = makeMap(wordParts);
        let allRight = true;

        for (let i = 0; i < ANSWER_LENGTH; i++) {
            if (wordParts[i] === guessParts[i]) {
                letters[currentRow * ANSWER_LENGTH + i].classList.add("correct");
                map[guessParts[i]]--;
            }
        }

        for (let i = 0; i < ANSWER_LENGTH; i++) {
            if (guessParts[i] === wordParts[i]){

            }
            else if (map[guessParts[i]] && map[guessParts[i]] > 0) {
                allRight = false;
                letters[currentRow * ANSWER_LENGTH + i].classList.add("close");
                map[guessParts[i]]--;
            }
            else {
                allRight = false;
                letters[currentRow * ANSWER_LENGTH + i].classList.add("wrong");
            }
            
        }

        currentRow++;
        currentGuess = "";

        if (allRight) {
            alert("You win");
            document.querySelector('.brand').classList.add('winner');
            done = true;
        } else if(currentRow === ROUNDS) {
            alert("You lose");
            done = true;
        }
    }

    function Flash(element) {
        element.animate(
            [
               {
                opacity: 0,
                color: "#fff"
               } ,
               {
                opacity: 1,
                color: "#000"
               }
            ], 2000);
    }

  document.addEventListener("keydown", (e) => {
    const action = e.key;

    console.log(e.key);

    if(e.key === "Enter") {
        Submit()
    } else if(e.key === "Backspace") {
        Backspace();
    } else if(/^[a-zA-Z]$/.test(e.key)) {
        addLetter(e.key.toUpperCase());
    }

  });

    function setLoading(isLoading) {
        infoBar.classList.toggle("hidden", !isLoading)
    }

}

function makeMap(array) {
    const obj = {}
    for (let i = 0; i < array.length; i++) {
        if (obj[array[i]]) {
                obj[array[i]]++;
        }
        else {
            obj[array[i]] = 1;
        }
    }

    return obj;
}


init();
