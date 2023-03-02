output = document.querySelector(".output");
const history = [0];

const add = (number) => {
    lastNum = lastNum + number;
    history.push(lastNum);
}

const subtract = (number) => {
    lastNum = lastNum - number;
    history.push(lastNum);
}

const divide = (number) => {
    lastNum = lastNum / number;
    history.push(lastNum);
}

const mulitply = (number) => {
    lastNum = lastNum * number;
    history.push(lastNum);
}

refresh = () => {
    output.innerHTML = "<h2>" + lastNum + "</h2>";
}

buttons = document.querySelector(".buttons");
buttons.addEventListener("click", function (event) {

    if (event.target.innerHTML === "+") {
            add(lastNum);
    }

    // if (event.target.getAttribute("class") === ".operator") {
    //     if (target.getAttribute("class") === "add"){
    //         add(lastNum)
    //     }
    //     else if (target.getAttribute("class") === ".subtract"){
    //         subtract(lastNum)
    //     }
    //     else if (target.getAttribute("class") === "divide"){
    //         divide(lastNum)
    //     }
    //     else if (target.getAttribute("class") === "multiply"){
    //         mulitply(lastNum)
    //     }
    // }

    else {
        console.log(`You clicked on ${event.target.innerText}`);
        history.push(Number.parseInt(event.target.innerText))
        lastNum = history[history.length - 1];
        console.log(lastNum);
    }
    console.log(history)
    refresh();
});
