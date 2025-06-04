let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn =document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let count =0;

let turn0 = true; // playerO, playerX

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = ()=> {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}
boxes.forEach((box) => {
    box.addEventListener("click", ()=> {
        //console.log("box was clicked");
        if(turn0) {   //playerO
            box.style.color = "red";
            box.innerText = "O";
            turn0 = false
        }
        else{    //playerX
            box.style.color = "green"
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        count++;

        checkWinner();
    });
});

const disableBoxes = ()=> {
    for(let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = ()=> {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = ""
    }
}
const showWinner = (winner)=> {
    if(winner == "O")
        msg.innerText = `Congratulations! Winner is player 1 (${winner})`;
    else 
        msg.innerText = `Congratulations! Winner is player 2 (${winner})`;

    msgContainer.classList.remove("hide");
    disableBoxes();
    count = 0;
}
const drawSituation = ()=> {
    msg.innerText = `It's a Draw. Try Again!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    count = 0;
}
const checkWinner = ()=> {
    for(let pattern of winPatterns) {
        // console.log(pattern[0], pattern[1], pattern[2]);
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if(pos1Val == pos2Val && pos2Val == pos3Val) {
                showWinner(pos1Val);
            }
            else if(count == 9){ //draw condition
                drawSituation();
            }
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
