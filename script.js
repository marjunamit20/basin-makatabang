/* =========================================================
   UML DIAGRAM DATA
========================================================= */

const diagrams = [

    {
        name: "Use Case Diagram",
        short: "USECASE",
        image: "images/use-case.png"
    },

    {
        name: "Class Diagram",
        short: "CLASS",
        image: "images/class.png"
    },

    {
        name: "Activity Diagram",
        short: "ACTIVITY",
        image: "images/activity.png"
    },

    {
        name: "Sequence Diagram",
        short: "SEQUENCE",
        image: "images/sequence.png"
    },

    {
        name: "State Machine Diagram",
        short: "STATE",
        image: "images/state-machine.png"
    },

    {
        name: "Component Diagram",
        short: "COMPONENT",
        image: "images/component.png"
    },

    {
        name: "Deployment Diagram",
        short: "DEPLOYMENT",
        image: "images/deployment.png"
    },

    {
        name: "Object Diagram",
        short: "OBJECT",
        image: "images/object.png"
    },

    {
        name: "Communication Diagram",
        short: "COMMUNICATION",
        image: "images/communication.png"
    },

    {
        name: "Package Diagram",
        short: "PACKAGE",
        image: "images/package.png"
    },

    {
        name: "Interaction Diagram",
        short: "INTERACTION",
        image: "images/interaction.png"
    },

    {
        name: "Timing Diagram",
        short: "TIMING",
        image: "images/timing.png"
    },

    {
        name: "Composite Structure Diagram",
        short: "COMPOSITE",
        image: "images/composite-structure.png"
    },

    {
        name: "Profile Diagram",
        short: "PROFILE",
        image: "images/profile.png"
    }

];


/* =========================================================
   GLOBAL VARIABLES
========================================================= */

let questions = [];

let currentQuestion = 0;

let score = 0;

let currentMode = "identification";

let answered = false;

let timer = null;

let timeLeft = 10;


/* =========================================================
   LETTER GAME VARIABLES
========================================================= */

let letterAnswer = "";

let selectedLetters = [];


/* =========================================================
   SIX PICTURES VARIABLES
========================================================= */

let sixQuestions = [];

let sixScore = 0;

let sixChecked = 0;


/* =========================================================
   SHUFFLE
========================================================= */

function shuffle(array) {

    const arr = [...array];


    for (
        let i = arr.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );


        [
            arr[i],
            arr[j]
        ] = [
            arr[j],
            arr[i]
        ];

    }


    return arr;
}


/* =========================================================
   SCREEN
========================================================= */

function showScreen(id) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove(
                "active"
            );

        });


    document
        .getElementById(id)
        .classList.add("active");

}


/* =========================================================
   START GAME
========================================================= */

function startGame(mode = "identification") {

    currentMode = mode;


    /*
        Every new game gets all 14 diagrams
        shuffled.

        No duplicate diagram.
    */

    questions =
        shuffle(diagrams);


    currentQuestion = 0;

    score = 0;

    answered = false;


    stopTimer();


    closeQuizTypes();


    showScreen("quizScreen");


    document
        .getElementById("scoreDisplay")
        .textContent = "0";


    loadQuestion();

}


/* =========================================================
   LOAD QUESTION
========================================================= */

function loadQuestion() {

    stopTimer();

    answered = false;


    document
        .getElementById("feedback")
        .textContent = "";


    document
        .getElementById("feedback")
        .className =
        "feedback";


    document
        .getElementById("nextBtn")
        .classList
        .add("hidden");


    const question =
        questions[currentQuestion];


    document
        .getElementById("questionNumber")
        .textContent =
        `${currentQuestion + 1} / 14`;


    document
        .getElementById("scoreDisplay")
        .textContent =
        score;


    const progress =
        (
            currentQuestion /
            14
        ) * 100;


    document
        .getElementById("progressBar")
        .style.width =
        `${progress}%`;


    /* =====================================================
       4 CHOICES
    ====================================================== */

    if (
        currentMode === "identification" ||
        currentMode === "four"
    ) {

        document
            .getElementById("normalQuestion")
            .classList
            .remove("hidden");


        document
            .getElementById("letterQuestion")
            .classList
            .add("hidden");


        document
            .getElementById("sixQuestion")
            .classList
            .add("hidden");


        document
            .getElementById("modeLabel")
            .textContent =
            currentMode === "four"
                ? "1 Picture 4 Choices"
                : "Identification";


        document
            .getElementById("questionText")
            .textContent =
            "Identify the UML diagram.";


        document
            .getElementById("questionImage")
            .src =
            question.image;


        createChoices(question);


        startTimer();

        return;
    }


    /* =====================================================
       PICTURE + LETTERS
    ====================================================== */

    if (
        currentMode === "letters"
    ) {

        document
            .getElementById("normalQuestion")
            .classList
            .add("hidden");


        document
            .getElementById("letterQuestion")
            .classList
            .remove("hidden");


        document
            .getElementById("sixQuestion")
            .classList
            .add("hidden");


        document
            .getElementById("modeLabel")
            .textContent =
            "Picture + Letters";


        document
            .getElementById("letterImage")
            .src =
            question.image;


        /*
            UNLIMITED TIME
        */

        document
            .getElementById("timerDisplay")
            .textContent =
            "∞";


        createLetterGame(question);

    }

}


/* =========================================================
   TIMER
   Only 4-choice / identification.
========================================================= */

function startTimer() {

    stopTimer();


    timeLeft = 10;


    document
        .getElementById("timerDisplay")
        .textContent =
        timeLeft;


    timer =
        setInterval(() => {

            timeLeft--;


            document
                .getElementById("timerDisplay")
                .textContent =
                timeLeft;


            if (
                timeLeft <= 0
            ) {

                stopTimer();


                if (!answered) {

                    answered = true;


                    showWrongAnswer(
                        questions[
                            currentQuestion
                        ].name,
                        "Time's up!"
                    );


                    document
                        .getElementById(
                            "nextBtn"
                        )
                        .classList
                        .remove("hidden");

                }

            }

        }, 1000);

}


function stopTimer() {

    if (timer !== null) {

        clearInterval(timer);

        timer = null;

    }

}


/* =========================================================
   CREATE CHOICES
========================================================= */

function createChoices(correctQuestion) {

    const container =
        document
            .getElementById(
                "choicesContainer"
            );


    container.innerHTML = "";


    const wrongChoices =
        shuffle(
            diagrams.filter(
                item =>
                    item.name !==
                    correctQuestion.name
            )
        ).slice(0, 3);


    const choices =
        shuffle([
            correctQuestion,
            ...wrongChoices
        ]);


    choices.forEach(choice => {

        const button =
            document.createElement(
                "button"
            );


        button.className =
            "choice-btn";


        button.textContent =
            choice.name;


        button.onclick = () => {

            answerChoice(
                button,
                choice,
                correctQuestion
            );

        };


        container.appendChild(
            button
        );

    });

}


/* =========================================================
   ANSWER CHOICE
========================================================= */

function answerChoice(
    button,
    selected,
    correct
) {

    if (answered) return;


    answered = true;

    stopTimer();


    const buttons =
        document.querySelectorAll(
            ".choice-btn"
        );


    buttons.forEach(btn => {

        btn.disabled = true;

    });


    if (
        selected.name ===
        correct.name
    ) {

        button.classList.add(
            "correct"
        );


        score++;


        document
            .getElementById(
                "scoreDisplay"
            )
            .textContent =
            score;


        showCorrectAnswer();

    }

    else {

        button.classList.add(
            "wrong"
        );


        buttons.forEach(btn => {

            if (
                btn.textContent ===
                correct.name
            ) {

                btn.classList.add(
                    "correct"
                );

            }

        });


        showWrongAnswer(
            correct.name
        );

    }


    document
        .getElementById("nextBtn")
        .classList
        .remove("hidden");

}


/* =========================================================
   CREATE LETTER GAME
========================================================= */

function createLetterGame(question) {

    /*
        Example:

        Class Diagram
        = CLASS

        Object Diagram
        = OBJECT
    */

    letterAnswer =
        question.short;


    selectedLetters = [];


    const answerBoxes =
        document
            .getElementById(
                "answerBoxes"
            );


    const letterButtons =
        document
            .getElementById(
                "letterButtons"
            );


    answerBoxes.innerHTML = "";

    letterButtons.innerHTML = "";


    /*
        Create one box per letter.
    */

    for (
        let i = 0;
        i < letterAnswer.length;
        i++
    ) {

        const box =
            document.createElement(
                "div"
            );


        box.className =
            "answer-box";


        box.dataset.index =
            i;


        answerBoxes.appendChild(
            box
        );

    }


    /*
        Correct letters.
        If answer is CLASS,
        there will be:

        C
        L
        A
        S
        S
    */

    let letters =
        letterAnswer.split("");


    /*
        Add random wrong letters.
    */

    const alphabet =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            .split("");


    const extraLetters =
        alphabet.filter(
            letter =>
                !letters.includes(
                    letter
                )
        );


    /*
        Number of extra letters.
    */

    const extraCount =
        Math.max(
            6,
            letterAnswer.length
        );


    const extras =
        shuffle(extraLetters)
            .slice(
                0,
                extraCount
            );


    /*
        Combine and shuffle.
    */

    letters =
        shuffle([
            ...letters,
            ...extras
        ]);


    /*
        Create letter buttons.
    */

    letters.forEach(
        (letter, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "letter-btn";


            button.textContent =
                letter;


            button.dataset.index =
                index;


            button.onclick = () => {

                selectLetter(
                    button,
                    letter
                );

            };


            letterButtons
                .appendChild(
                    button
                );

        }
    );


    /*
        CHECK is disabled initially.

        It becomes enabled ONLY when
        every box has a letter.

        But filling the boxes NEVER
        automatically checks the answer.
    */

    document
        .getElementById(
            "checkAnswerBtn"
        )
        .disabled = true;

}


/* =========================================================
   SELECT LETTER
========================================================= */

function selectLetter(
    button,
    letter
) {

    /*
        If already answered,
        don't allow changes.
    */

    if (answered) {

        return;

    }


    /*
        If all boxes are full,
        DON'T DO ANYTHING.

        Most importantly:
        DON'T MARK WRONG.
    */

    if (
        selectedLetters.length >=
        letterAnswer.length
    ) {

        return;

    }


    /*
        Add selected letter.
    */

    selectedLetters.push(
        letter
    );


    /*
        Mark that particular
        letter button as used.
    */

    button.classList.add(
        "used"
    );


    /*
        Put letter inside
        next available box.
    */

    const index =
        selectedLetters.length - 1;


    const box =
        document.querySelector(
            `.answer-box[data-index="${index}"]`
        );


    if (box) {

        box.textContent =
            letter;

        box.classList.add(
            "filled"
        );

    }


    /*
        IMPORTANT:

        If all boxes are filled,
        ENABLE CHECK ANSWER.

        DO NOT CHECK AUTOMATICALLY.
    */

    if (
        selectedLetters.length ===
        letterAnswer.length
    ) {

        document
            .getElementById(
                "checkAnswerBtn"
            )
            .disabled = false;

    }

}


/* =========================================================
   CLEAR LETTERS
========================================================= */

function clearLetters() {

    if (answered) {

        return;

    }


    selectedLetters = [];


    /*
        Clear boxes.
    */

    document
        .querySelectorAll(
            ".answer-box"
        )
        .forEach(box => {

            box.textContent = "";

            box.classList.remove(
                "filled"
            );

        });


    /*
        Enable letters again.
    */

    document
        .querySelectorAll(
            ".letter-btn"
        )
        .forEach(button => {

            button.classList.remove(
                "used"
            );

        });


    /*
        Disable CHECK again.
    */

    document
        .getElementById(
            "checkAnswerBtn"
        )
        .disabled = true;


    /*
        Clear feedback.
    */

    const feedback =
        document.getElementById(
            "feedback"
        );


    feedback.textContent = "";

    feedback.className =
        "feedback";

}


/* =========================================================
   CHECK LETTER ANSWER
========================================================= */

function checkLetterAnswer() {

    /*
        If already checked,
        don't check again.
    */

    if (answered) {

        return;

    }


    /*
        IMPORTANT:

        If not all boxes are filled,
        DON'T mark wrong.

        Just tell the user to complete it.
    */

    if (
        selectedLetters.length <
        letterAnswer.length
    ) {

        const feedback =
            document.getElementById(
                "feedback"
            );


        feedback.textContent =
            `⚠ Please fill all ${letterAnswer.length} boxes first.`;


        feedback.className =
            "feedback wrong";


        return;

    }


    /*
        NOW and ONLY NOW,
        we check the answer.
    */

    const userAnswer =
        selectedLetters.join("");


    answered = true;


    /*
        Disable CHECK.
    */

    document
        .getElementById(
            "checkAnswerBtn"
        )
        .disabled = true;


    /*
        Disable all letter buttons.
    */

    document
        .querySelectorAll(
            ".letter-btn"
        )
        .forEach(button => {

            button.disabled = true;

        });


    /*
        CHECK.
    */

    if (
        userAnswer ===
        letterAnswer
    ) {

        /*
            CORRECT
        */

        score++;


        document
            .getElementById(
                "scoreDisplay"
            )
            .textContent =
            score;


        showCorrectAnswer();

    }

    else {

        /*
            WRONG

            Only now will the wrong
            answer be counted.
        */

        showWrongAnswer(
            letterAnswer
        );

    }


    /*
        Show NEXT.
    */

    document
        .getElementById(
            "nextBtn"
        )
        .classList
        .remove("hidden");

}


/* =========================================================
   CORRECT FEEDBACK
========================================================= */

function showCorrectAnswer() {

    const feedback =
        document.getElementById(
            "feedback"
        );


    feedback.textContent =
        "✓ CORRECT!";


    feedback.className =
        "feedback correct";

}


/* =========================================================
   WRONG FEEDBACK
========================================================= */

function showWrongAnswer(
    correctAnswer,
    customMessage = ""
) {

    const feedback =
        document.getElementById(
            "feedback"
        );


    if (customMessage) {

        feedback.textContent =
            `✗ ${customMessage} Correct answer: ${correctAnswer}`;

    }

    else {

        feedback.textContent =
            `✗ WRONG! Correct answer: ${correctAnswer}`;

    }


    feedback.className =
        "feedback wrong";

}


/* =========================================================
   NEXT QUESTION
========================================================= */

function nextQuestion() {

    if (!answered) {

        return;

    }


    currentQuestion++;


    if (
        currentQuestion >=
        questions.length
    ) {

        finishQuiz();

        return;

    }


    loadQuestion();

}


/* =========================================================
   FINISH QUIZ
========================================================= */

function finishQuiz() {

    stopTimer();


    document
        .getElementById(
            "progressBar"
        )
        .style.width =
        "100%";


    showResult(
        score,
        14
    );

}


/* =========================================================
   RESULT
========================================================= */

function showResult(
    finalScore,
    totalQuestions
) {

    showScreen(
        "resultScreen"
    );


    document
        .getElementById(
            "finalScore"
        )
        .textContent =
        `${finalScore} / ${totalQuestions}`;


    const percentage =
        Math.round(
            (
                finalScore /
                totalQuestions
            ) * 100
        );


    document
        .getElementById(
            "finalPercentage"
        )
        .textContent =
        `${percentage}%`;


    let message;


    if (percentage >= 90) {

        message =
            "Excellent! You really know your UML diagrams!";

    }

    else if (percentage >= 75) {

        message =
            "Great job! Keep practicing!";

    }

    else if (percentage >= 50) {

        message =
            "Good effort! Review the UML diagrams again.";

    }

    else {

        message =
            "Keep practicing! You can improve your UML identification.";

    }


    document
        .getElementById(
            "resultMessage"
        )
        .textContent =
        message;

}


/* =========================================================
   TRY AGAIN
========================================================= */

function tryAgain() {

    stopTimer();


    /*
        Restart SAME MODE.

        Example:

        Picture + Letters
        -> Picture + Letters

        1 Picture 4 Choices
        -> 1 Picture 4 Choices

        6 Pictures
        -> 6 Pictures
    */

    if (
        currentMode === "six"
    ) {

        startSixPictures();

    }

    else {

        startGame(
            currentMode
        );

    }

}


/* =========================================================
   HOME
========================================================= */

function goHome() {

    stopTimer();

    showScreen(
        "homeScreen"
    );

}


/* =========================================================
   SIX PICTURES
========================================================= */

function startSixPictures() {

    closeQuizTypes();


    currentMode =
        "six";


    sixQuestions =
        shuffle(diagrams)
            .slice(0, 6);


    sixScore = 0;

    sixChecked = 0;


    document
        .getElementById(
            "scoreDisplay"
        )
        .textContent =
        "0";


    document
        .getElementById(
            "questionNumber"
        )
        .textContent =
        "6 PICTURES";


    document
        .getElementById(
            "timerDisplay"
        )
        .textContent =
        "∞";


    document
        .getElementById(
            "modeLabel"
        )
        .textContent =
        "6 Pictures";


    document
        .getElementById(
            "progressBar"
        )
        .style.width =
        "100%";


    document
        .getElementById(
            "normalQuestion"
        )
        .classList
        .add("hidden");


    document
        .getElementById(
            "letterQuestion"
        )
        .classList
        .add("hidden");


    document
        .getElementById(
            "sixQuestion"
        )
        .classList
        .remove("hidden");


    document
        .getElementById(
            "feedback"
        )
        .textContent =
        "";


    document
        .getElementById(
            "sixResultMessage"
        )
        .textContent =
        "";


    document
        .getElementById(
            "sixNextBtn"
        )
        .classList
        .add("hidden");


    showScreen(
        "quizScreen"
    );


    renderSixPictures();

}


/* =========================================================
   RENDER SIX PICTURES
========================================================= */

function renderSixPictures() {

    const container =
        document
            .getElementById(
                "sixPicturesContainer"
            );


    container.innerHTML = "";


    sixQuestions.forEach(
        (question, index) => {


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "six-card";


            card.innerHTML = `

                <div class="six-image">

                    <img
                        src="${question.image}"
                        alt="UML Diagram ${index + 1}"
                    >

                </div>


                <input
                    type="text"
                    class="six-input"
                    id="sixInput${index}"
                    placeholder="Answer"
                    autocomplete="off"
                >


                <button
                    class="six-check"
                    onclick="checkSixAnswer(${index})">

                    CHECK

                </button>

            `;


            container.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   CHECK SIX PICTURE ANSWER
========================================================= */

function checkSixAnswer(index) {

    const question =
        sixQuestions[index];


    const input =
        document.getElementById(
            `sixInput${index}`
        );


    const card =
        input.closest(
            ".six-card"
        );


    const button =
        card.querySelector(
            ".six-check"
        );


    const userAnswer =
        input.value
            .trim()
            .toUpperCase()
            .replace(
                /\s+/g,
                ""
            );


    const correctAnswer =
        question.short
            .toUpperCase()
            .replace(
                /\s+/g,
                ""
            );


    if (!userAnswer) {

        return;

    }


    if (
        card.dataset.checked ===
        "true"
    ) {

        return;

    }


    card.dataset.checked =
        "true";


    input.disabled = true;

    button.disabled = true;


    if (
        userAnswer ===
        correctAnswer
    ) {

        sixScore++;


        card.classList.add(
            "correct"
        );


        button.textContent =
            "✓ CORRECT";

    }

    else {

        card.classList.add(
            "wrong"
        );


        button.textContent =
            `✗ ${question.short}`;

    }


    sixChecked++;


    document
        .getElementById(
            "scoreDisplay"
        )
        .textContent =
        sixScore;


    if (
        sixChecked ===
        sixQuestions.length
    ) {

        document
            .getElementById(
                "sixResultMessage"
            )
            .textContent =
            `You got ${sixScore} / 6 pictures correct.`;


        document
            .getElementById(
                "sixNextBtn"
            )
            .classList
            .remove("hidden");

    }

}


/* =========================================================
   FINISH SIX
========================================================= */

function finishSixPictures() {

    showResult(
        sixScore,
        6
    );

}


/* =========================================================
   QUIZ TYPES MODAL
========================================================= */

function openQuizTypes() {

    document
        .getElementById(
            "quizTypesModal"
        )
        .classList
        .add("show");

}


function closeQuizTypes() {

    document
        .getElementById(
            "quizTypesModal"
        )
        .classList
        .remove("show");

}


/* =========================================================
   DIAGRAM GALLERY
========================================================= */

function openDiagrams() {

    const gallery =
        document
            .getElementById(
                "diagramGallery"
            );


    gallery.innerHTML = "";


    diagrams.forEach(
        diagram => {


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "diagram-card";


            card.innerHTML = `

                <img
                    src="${diagram.image}"
                    alt="${diagram.name}"
                >

                <h4>
                    ${diagram.name}
                </h4>

            `;


            gallery.appendChild(
                card
            );

        }
    );


    document
        .getElementById(
            "diagramModal"
        )
        .classList
        .add("show");

}


function closeDiagrams() {

    document
        .getElementById(
            "diagramModal"
        )
        .classList
        .remove("show");

}


/* =========================================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
========================================================= */

window.addEventListener(
    "click",
    function(event) {

        const quizModal =
            document.getElementById(
                "quizTypesModal"
            );


        const diagramModal =
            document.getElementById(
                "diagramModal"
            );


        if (
            event.target ===
            quizModal
        ) {

            closeQuizTypes();

        }


        if (
            event.target ===
            diagramModal
        ) {

            closeDiagrams();

        }

    }
);