
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


//Global Variables
let rootContainer = document.getElementsByClassName('mainContainer')[0];
let leftContainer = document.getElementsByClassName('leftColumnContainer')[0];
let rightContainer = document.getElementsByClassName('rightColumnContainer')[0];

let titleName = "Vertical Circular Motion";
let questionHTMLArray = ["<span class='semiBold'>Which force(s) here is acting as the centripetal force ?</span>&nbsp;&nbsp;[The force that causes a body to move in a circular path]",
    "<span class='semiBold'>Which force(s) here is acting as the centripetal force ?</span>&nbsp;&nbsp;[The force that causes a body to move in a circular path]",
    "When the string is cut at a point, the tension force vanishes; <span class='semiBold'>What is the path taken by the object from that point ?</span>"];
let optionArray = [["Tension", "Gravity", "Tension and Gravity"]
    , ["Tension", "Gravity", "Tension and Gravity"]
    , ["Tangentially", "Parabolically"]];
let correctOptionIndex = [2, 2, 1];

//Controlls - Global Variables
let checkboxArray = ["Show  Gravity", "Show  Tension", "Show  Velocity"];
let sliderArray = ["Set Total Energy🚀", "Set Mass"];

class QuestionColumn {
    constructor(questionNumber) {
        //Title
        let rootElement = this;
        this.titleDiv = document.createElement('DIV');
        leftContainer.appendChild(this.titleDiv);
        this.titleDiv.classList.add('titleSim');
        this.titleDiv.innerText = titleName;

        //Question
        this.QuestionDiv = document.createElement('DIV');
        leftContainer.appendChild(this.QuestionDiv);
        this.QuestionDiv.classList.add('questionText');
        this.QuestionDiv.innerHTML = questionHTMLArray[questionNumber];

        //Options + Label
        let n = optionArray[questionNumber].length;
        this.optionContainer = [];
        this.optionDivArray = [];
        this.optionLabelArray = [];

        for (let i = 0; i < n; i++) {
            //Option Container Div(for each option)
            this.optionContainer[i] = document.createElement('DIV');
            leftContainer.appendChild(this.optionContainer[i]);
            this.optionContainer[i].classList.add('optionsContainerClass');

            //Option
            this.optionDivArray[i] = document.createElement('input');
            this.optionContainer[i].appendChild(this.optionDivArray[i]);
            this.optionDivArray[i].setAttribute('type', 'radio');
            this.optionDivArray[i].setAttribute('value', optionArray[questionNumber][i]);
            this.optionDivArray[i].setAttribute('name', "options");
            this.optionDivArray[i].setAttribute('id', questionNumber + i.toString());
            this.optionDivArray[i].classList.add('radioButton');

            //Label
            this.optionLabelArray[i] = document.createElement('label');
            this.optionContainer[i].appendChild(this.optionLabelArray[i]);
            this.optionLabelArray[i].setAttribute('for', questionNumber + i.toString());
            this.optionLabelArray[i].innerText = optionArray[questionNumber][i];
            this.optionLabelArray[i].classList.add('radioLabel');

            //break
            this.break1 = document.createElement('br');
            leftContainer.appendChild(this.break1);

        }

        // Correct✔ , Wrong Answer ✖
        this.answerPopup = document.createElement('DIV');
        leftContainer.appendChild(this.answerPopup);
        this.answerPopup.classList.add('answerPopupClass');
        this.answerPopup.innerText = "Good Job!! 🥳";
        // this.answerPopup.innerText = "🔍 Incorrect";
        this.answerPopup.style.opacity = "0";

        //break
        this.break2 = document.createElement('br');
        leftContainer.appendChild(this.break2);

        // Submit Button Container
        this.submitButtonContainer = document.createElement('DIV');
        leftContainer.appendChild(this.submitButtonContainer);
        this.submitButtonContainer.style.display = "flex";
        this.submitButtonContainer.style.flexDirection = "row";
        this.submitButtonContainer.style.justifyContent = "space-evenly";

        //submit button
        this.submitButton = document.createElement('DIV');
        this.submitButtonContainer.appendChild(this.submitButton);
        this.submitButton.classList.add('submitButtonClass');
        this.submitButton.innerText = "Submit";

        this.hintButton = document.createElement('DIV');
        this.submitButtonContainer.appendChild(this.hintButton);
        this.hintButton.classList.add('hintButtonClass');
        this.hintButton.innerText = "Hint ?";



        this.submitButton.onclick = function () {
            let optionClicked = -1;
            let isAnswerCorrect = false;
            for (let i = 0; i < n; i++) {
                if (rootElement.optionDivArray[i].checked && correctOptionIndex[questionNumber] == i) {
                    isAnswerCorrect = true;
                    //Show correct answer dialogs etc
                    rootElement.answerPopup.innerText = "Good Job!! 🥳";
                    rootElement.answerPopup.style.opacity = "1";

                    //disable the options
                    rootElement.submitButton.classList.add('unclickable');
                    for (let i = 0; i < n; i++) {
                        rootElement.optionContainer[i].classList.remove('optionsContainerClass');
                        rootElement.optionContainer[i].classList.add('optionsContainerClassNoHover');
                        rootElement.optionDivArray[i].classList.add('unclickable');
                        rootElement.optionLabelArray[i].classList.add('unclickable');
                    }

                }
                if (rootElement.optionDivArray[i].checked) {
                    optionClicked = i;
                }
            }

            if (!isAnswerCorrect & optionClicked > -1) {
                rootElement.answerPopup.innerText = "🔍 Incorrect";
                rootElement.answerPopup.style.opacity = "1";

                //disable the options
                rootElement.optionDivArray[optionClicked].classList.add('fadeDisabled');
                rootElement.optionLabelArray[optionClicked].classList.add('fadeDisabled');
                rootElement.submitButton.classList.add('unclickable');
                for (let i = 0; i < n; i++) {
                    rootElement.optionContainer[i].classList.remove('optionsContainerClass');
                    rootElement.optionContainer[i].classList.add('optionsContainerClassNoHover');
                    rootElement.optionDivArray[i].classList.add('unclickable');
                    rootElement.optionLabelArray[i].classList.add('unclickable');
                }

            }
            if (optionClicked > -1) {
                //Option Selected and Submitted
                rootElement.optionContainer[correctOptionIndex[questionNumber]].style.background = "#11111122";
                //Change labels of Submit and Hint button
                rootElement.submitButton.innerText = "Okay";
                rootElement.hintButton.innerText = "Explanation";

                //show Correct Option TICK
                rootElement.tickMark = document.createElement('IMG');
                rootElement.optionContainer[correctOptionIndex[questionNumber]].appendChild(rootElement.tickMark);
                rootElement.tickMark.src = `./assets/Checkbox.png`;
                rootElement.tickMark.classList.add('tickmark');
            }
        }
        this.hintButton.onclick = function () {
            console.log("Hint");
        }
    }
}

class ControlsColumn {
    constructor() {
        //Title
        let rootElement = this;
        this.titleDiv = document.createElement('DIV');
        leftContainer.appendChild(this.titleDiv);
        this.titleDiv.classList.add('titleSim');
        this.titleDiv.innerText = titleName;

        //break
        this.break1 = document.createElement('br');
        leftContainer.appendChild(this.break1);

        //Checkbox + Label
        let chkBoxCount = checkboxArray.length;
        this.controlContainer = [];
        this.checkboxes = [];
        this.checkboxLabel = [];

        for (let i = 0; i < chkBoxCount; i++) {
            //Checkbox Container Div(for each Checkbox)
            this.controlContainer[i] = document.createElement('DIV');
            leftContainer.appendChild(this.controlContainer[i]);
            this.controlContainer[i].classList.add('controllsContainerClass');

            //Checkbox
            this.checkboxes[i] = document.createElement('input');
            this.controlContainer[i].appendChild(this.checkboxes[i]);
            this.checkboxes[i].setAttribute('type', 'checkbox');
            this.checkboxes[i].setAttribute('value', checkboxArray[i]);
            this.checkboxes[i].setAttribute('name', "chkbox");
            this.checkboxes[i].setAttribute('id', "chkbox" + i.toString());
            this.checkboxes[i].classList.add('checkboxClass');

            //Label
            this.checkboxLabel[i] = document.createElement('label');
            this.controlContainer[i].appendChild(this.checkboxLabel[i]);
            this.checkboxLabel[i].setAttribute('for', "chkbox" + i.toString());
            this.checkboxLabel[i].innerText = checkboxArray[i];
            this.checkboxLabel[i].classList.add('checkboxLabel');

            //break
            this.break1 = document.createElement('br');
            leftContainer.appendChild(this.break1);

        }
        //Slider + Label
        let sliderCount = sliderArray.length;
        // this.controlContainer = [];
        this.sliders = [];
        this.sliderLabel = [];

        for (let i = chkBoxCount; i < sliderCount + chkBoxCount; i++) {
            //Control Container Div(for each option)
            this.controlContainer[i] = document.createElement('DIV');
            leftContainer.appendChild(this.controlContainer[i]);
            this.controlContainer[i].classList.add('controllsContainerClassSlider');

            //Slider
            this.sliders[i] = document.createElement('input');
            this.controlContainer[i].appendChild(this.sliders[i]);
            this.sliders[i].setAttribute('type', 'range');
            this.sliders[i].setAttribute('min', '0');
            this.sliders[i].setAttribute('max', '10');
            this.sliders[i].setAttribute('step', '1');
            this.sliders[i].setAttribute('value', "5");
            this.sliders[i].setAttribute('name', "slider");
            this.sliders[i].setAttribute('id', "sliderNo" + i.toString());
            this.sliders[i].classList.add('slider');

            //break
            this.break1 = document.createElement('br');
            leftContainer.appendChild(this.break1);

            //Label
            this.sliderLabel[i] = document.createElement('DIV');
            this.controlContainer[i].appendChild(this.sliderLabel[i]);
            // this.sliderLabel[i].setAttribute('for', "slider" + i.toString());
            this.sliderLabel[i].innerText = sliderArray[i - chkBoxCount];
            this.sliderLabel[i].classList.add('sliderLabel');

            //break
            this.break1 = document.createElement('br');
            leftContainer.appendChild(this.break1);
        }
        //NEXT button
        let NextBtnDiv;
        this.NextBtnDiv = document.createElement("DIV");
        rightContainer.appendChild(this.NextBtnDiv);
        this.NextBtnDiv.innerText = ">";
        this.NextBtnDiv.classList.add('nextBtnSymbol');
    }
}


class GameScene {
    constructor() {
        //create Canvas - FILLS RIGHT CONTAINER
        let canvas;
        let rootElement = this;
        this.canvas = document.createElement('canvas');
        rightContainer.appendChild(this.canvas);
        this.canvas.classList.add('CanvasId');
        this.canvas.setAttribute('width', rightContainer.clientWidth.toString());
        this.canvas.setAttribute('height', rightContainer.clientHeight.toString());

        let ctx = this.canvas.getContext("2d");
        // ctx.fillStyle = "#220099";
        // ctx.fillRect(0, 0, rightContainer.clientWidth, rightContainer.clientHeight);

        ctx.beginPath();
        ctx.setLineDash([25, 25]);
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#B9B9B9";
        ctx.beginPath();
        ctx.arc(rightContainer.clientWidth / 2, rightContainer.clientHeight / 2.2, rightContainer.clientWidth / 5, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();


        //create ball, arrows
        https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createLinearGradient
        

    }
}







window.onload = function () {
    quesNo = 0;
    // new QuestionColumn(quesNo);
    new ControlsColumn();
    new GameScene();
}













// let tutorialStage = 1;
// let istutorialStage1Shown = false;
// let istutorialStage2Shown = false;
// let istutorialStage3Shown = false;

// async function tutorial() {
//     while (tutorialStage == 1) {
//         if (!istutorialStage1Shown) {
//             // ----Stage 1------
//             // popup 1
//             fadeInElement("popup1");
//             await sleep(5000);
//             fadeOutElement("popup1");
//             await sleep(1000);
//             // popup 2
//             fadeInElement("popup2");
//             await sleep(5000);
//             fadeOutElement("popup2");
//             await sleep(1000);
//             // popup 3
//             fadeInElement("popup3");
//             await sleep(5000);
//             fadeOutElement("popup3");
//             await sleep(1000);
//             istutorialStage1Shown = true;
//         }
//     }
//     while (tutorialStage == 2) {
//         if (!istutorialStage2Shown) {
//             // ----Stage 2------
//             // popup 1
//             fadeInElement("popup1");
//             await sleep(5000);
//             fadeOutElement("popup1");
//             await sleep(1000);
//             // popup 2
//             fadeInElement("popup2");
//             await sleep(5000);
//             fadeOutElement("popup2");
//             await sleep(1000);
//             // popup 3
//             fadeInElement("popup3");
//             await sleep(5000);
//             fadeOutElement("popup3");
//             await sleep(1000);
//             istutorialStage2Shown = true;
//         }
//         await sleep(1000);
//         //keep checking if tutorial stage changed
//     }
//     while (tutorialStage == 3) {
//         if (!istutorialStage3Shown) {
//             // ----Stage 3------
//             // popup 1
//             fadeInElement("popup1");
//             await sleep(5000);
//             fadeOutElement("popup1");
//             await sleep(1000);
//             // popup 2
//             fadeInElement("popup2");
//             await sleep(5000);
//             fadeOutElement("popup2");
//             await sleep(1000);
//             // popup 3
//             fadeInElement("popup3");
//             await sleep(5000);
//             fadeOutElement("popup3");
//             await sleep(1000);
//             istutorialStage3Shown = true;
//         }
//         await sleep(1000);
//         //keep checking if tutorial stage changed
//     }
// }

// // tutorial();

// //NextButton
// document.getElementById("NextBtn").onclick = async function () {
//     fadeOutElement("NextBtn");
//     await sleep(1000);

// }

// //Finish Button
// document.getElementById("FinishBtn").onclick = async function () {
//     fadeOutElement("FinishBtn");
//     await sleep(1000);

// }

// //Modal close Button
// document.getElementById("crossBtn").onclick = async function () {
//     fadeOutElement("modal1");
//     document.getElementById("blurid").style.display = "none";
//     await sleep(1000);

// }
// //Modal open Button
// document.getElementById("iButton").onclick = async function () {
//     fadeInElement("modal1");
//     document.getElementById("blurid").style.display = "block";
//     await sleep(1000);

// }


// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }
// //fade in element
// async function fadeInElement(htmlElementid) {
//     let htmlElement = document.getElementById(htmlElementid);
//     console.log("Fading in-", htmlElementid);
//     htmlElement.style.display = "block";
//     htmlElement.classList.add("fadein");
//     await sleep(1000);
//     htmlElement.style.opacity = "1";
//     htmlElement.classList.remove("fadein");
// }
// // fade out element
// async function fadeOutElement(htmlElementid) {
//     let htmlElement = document.getElementById(htmlElementid);
//     console.log("Fade  out-", htmlElementid);
//     htmlElement.classList.add("fadeout");
//     await sleep(1000);
//     htmlElement.style.display = "none";
//     htmlElement.style.opacity = "0";
//     htmlElement.classList.remove("fadeout");

// }
