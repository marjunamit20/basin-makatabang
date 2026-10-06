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
   NORMAL QUIZ VARIABLES
========================================================= */

let questions = [];

let currentQuestion = 0;

let score = 0;

let currentMode = "identification";

let answered = false;

let timer = null;

let timeLeft = 10;


/* =========================================================
   PICTURE + LETTERS VARIABLES
========================================================= */

let letterAnswer = "";

let selectedLetters = [];


/* =========================================================
   6 PICTURES VARIABLES
========================================================= */

let sixQuestions = [];

let sixPageQuestions = [];

let sixScore = 0;

let sixChecked = 0;

let sixPage = 1;

const sixPageSize = 6;

const sixTotalPages = 2;


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
                Math.random() *
                (i + 1)
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
   START NORMAL GAME
========================================================= */

function startGame(
    mode = "identification"
) {

    currentMode = mode;


    /*
        All 14 diagrams are used once.
        New order every game.
    */

    questions =
        shuffle(diagrams);


    currentQuestion = 0;

    score = 0;

    answered = false;


    stopTimer();

    closeQuizTypes();


    showScreen(
        "quizScreen"
    );


    document
        .getElementById(
            "scoreDisplay"
        )
        .textContent =
        "0";


    loadQuestion();

}


/* =========================================================
   LOAD NORMAL QUESTION
========================================================= */

function loadQuestion() {

    stopTimer();

    answered = false;


    document
        .getElementById(
            "feedback"
        )
        .textContent = "";


    document
        .getElementById(
            "feedback"
        )
        .className =
        "feedback";


    document
        .getElementById(
            "nextBtn"
        )
        .classList
        .add("hidden");


    const question =
        questions[
            currentQuestion
        ];


    document
        .getElementById(
            "questionNumber"
        )
        .textContent =
        `${currentQuestion + 1} / 14`;


    document
        .getElementById(
            "scoreDisplay"
        )
        .textContent =
        score;


    const progress =
        (
            currentQuestion /
            14
        ) * 100;


    document
        .getElementById(
            "progressBar"
        )
        .style.width =
        `${progress}%`;


    /* =====================================================
       4 CHOICES
    ====================================================== */

    if (
        currentMode ===
        "identification" ||
        currentMode ===
        "four"
    ) {

        document
            .getElementById(
                "normalQuestion"
            )
            .classList
            .remove("hidden");


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
            .add("hidden");


        document
            .getElementById(
                "modeLabel"
            )
            .textContent =
            currentMode === "four"
                ? "1 Picture 4 Choices"
                : "Identification";


        document
            .getElementById(
                "questionText"
            )
            .textContent =
            "Identify the UML diagram.";


        document
            .getElementById(
                "questionImage"
            )
            .src =
            question.image;


        createChoices(
            question
        );


        startTimer();

        return;
    }


    /* =====================================================
       PICTURE + LETTERS
    ====================================================== */

    if (
        currentMode ===
        "letters"
    ) {

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
            .remove("hidden");


        document
            .getElementById(
                "sixQuestion"
            )
            .classList
            .add("hidden");


        document
            .getElementById(
                "modeLabel"
            )
            .textContent =
            "Picture + Letters";


        document
            .getElementById(
                "letterImage"
            )
            .src =
            question.image;


        /*
            Unlimited time.
        */

        document
            .getElementById(
                "timerDisplay"
            )
            .textContent =
            "∞";


        createLetterGame(
            question
        );

    }

}


/* =========================================================
   TIMER
========================================================= */

function startTimer() {

    stopTimer();


    timeLeft = 10;


    document
        .getElementById(
            "timerDisplay"
        )
        .textContent =
        timeLeft;


    timer =
        setInterval(
            () => {

                timeLeft--;


                document
                    .getElementById(
                        "timerDisplay"
                    )
                    .textContent =
                    timeLeft;


                if (
                    timeLeft <= 0
                ) {

                    stopTimer();


                    if (
                        !answered
                    ) {

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
                            .remove(
                                "hidden"
                            );

                    }

                }

            },
            1000
        );

}


function stopTimer() {

    if (
        timer !== null
    ) {

        clearInterval(
            timer
        );

        timer = null;

    }

}


/* =========================================================
   CREATE 4 CHOICES
========================================================= */

function createChoices(
    correctQuestion
) {

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

        ).slice(
            0,
            3
        );


    const choices =
        shuffle([
            correctQuestion,
            ...wrongChoices
        ]);


    choices.forEach(
        choice => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "choice-btn";


            button.textContent =
                choice.name;


            button.onclick =
                () => {

                    answerChoice(
                        button,
                        choice,
                        correctQuestion
                    );

                };


            container.appendChild(
                button
            );

        }
    );

}


/* =========================================================
   ANSWER CHOICE
========================================================= */

function answerChoice(
    button,
    selected,
    correct
) {

    if (
        answered
    ) {

        return;

    }


    answered = true;

    stopTimer();


    const buttons =
        document.querySelectorAll(
            ".choice-btn"
        );


    buttons.forEach(
        btn => {

            btn.disabled = true;

        }
    );


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


        buttons.forEach(
            btn => {

                if (
                    btn.textContent ===
                    correct.name
                ) {

                    btn.classList.add(
                        "correct"
                    );

                }

            }
        );


        showWrongAnswer(
            correct.name
        );

    }


    document
        .getElementById(
            "nextBtn"
        )
        .classList
        .remove(
            "hidden"
        );

}


/* =========================================================
   CREATE PICTURE + LETTERS
========================================================= */

function createLetterGame(
    question
) {

    /*
        Picture + Letters uses
        the short one-word answer.

        Example:

        Class Diagram
        -> CLASS

        Composite Structure Diagram
        -> COMPOSITE
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
        Create answer boxes.
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
    */

    let letters =
        letterAnswer.split("");


    /*
        Extra random letters.
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


    const extraCount =
        Math.max(
            6,
            letterAnswer.length
        );


    const extras =
        shuffle(
            extraLetters
        ).slice(
            0,
            extraCount
        );


    /*
        Combine + shuffle.
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


            button.onclick =
                () => {

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
        CHECK disabled until
        all boxes are filled.
    */

    document
        .getElementById(
            "checkAnswerBtn"
        )
        .disabled =
        true;

}


/* =========================================================
   SELECT LETTER
========================================================= */

function selectLetter(
    button,
    letter
) {

    if (
        answered
    ) {

        return;

    }


    /*
        If all boxes are already
        full, do NOTHING.

        It will NOT be marked wrong.
    */

    if (
        selectedLetters.length >=
        letterAnswer.length
    ) {

        return;

    }


    selectedLetters.push(
        letter
    );


    button.classList.add(
        "used"
    );


    const index =
        selectedLetters.length -
        1;


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
        Enable CHECK only when
        every box is filled.

        No automatic checking.
    */

    if (
        selectedLetters.length ===
        letterAnswer.length
    ) {

        document
            .getElementById(
                "checkAnswerBtn"
            )
            .disabled =
            false;

    }

}


/* =========================================================
   CLEAR LETTERS
========================================================= */

function clearLetters() {

    if (
        answered
    ) {

        return;

    }


    selectedLetters = [];


    document
        .querySelectorAll(
            ".answer-box"
        )
        .forEach(
            box => {

                box.textContent =
                    "";

                box.classList.remove(
                    "filled"
                );

            }
        );


    document
        .querySelectorAll(
            ".letter-btn"
        )
        .forEach(
            button => {

                button.classList.remove(
                    "used"
                );

                button.disabled =
                    false;

            }
        );


    document
        .getElementById(
            "checkAnswerBtn"
        )
        .disabled =
        true;


    const feedback =
        document.getElementById(
            "feedback"
        );


    feedback.textContent =
        "";


    feedback.className =
        "feedback";

}


/* =========================================================
   CHECK LETTER ANSWER
========================================================= */

function checkLetterAnswer() {

    if (
        answered
    ) {

        return;

    }


    /*
        Incomplete answer:
        NOT counted as wrong.
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
        Only CHECK ANSWER will
        actually evaluate it.
    */

    const userAnswer =
        selectedLetters.join("");


    answered = true;


    document
        .getElementById(
            "checkAnswerBtn"
        )
        .disabled =
        true;


    document
        .querySelectorAll(
            ".letter-btn"
        )
        .forEach(
            button => {

                button.disabled =
                    true;

            }
        );


    if (
        userAnswer ===
        letterAnswer
    ) {

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

        showWrongAnswer(
            letterAnswer
        );

    }


    document
        .getElementById(
            "nextBtn"
        )
        .classList
        .remove(
            "hidden"
        );

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


    if (
        customMessage
    ) {

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
   NEXT NORMAL QUESTION
========================================================= */

function nextQuestion() {

    if (
        !answered
    ) {

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
   FINISH NORMAL QUIZ
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
   SHOW RESULT
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


    if (
        percentage >= 90
    ) {

        message =
            "Excellent! You really know your UML diagrams!";

    }

    else if (
        percentage >= 75
    ) {

        message =
            "Great job! Keep practicing!";

    }

    else if (
        percentage >= 50
    ) {

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
        If the previous game was
        6 Pictures, start a completely
        new 12-picture game.

        The diagrams will be shuffled
        again.
    */

    if (
        currentMode ===
        "six"
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
   START 6 PICTURES
========================================================= */

function startSixPictures() {

    closeQuizTypes();


    currentMode =
        "six";


    /*
        IMPORTANT:

        Shuffle all 14 diagrams.

        Take 12 only.

        Page 1 = items 0-5
        Page 2 = items 6-11

        Because the array is shuffled ONCE,
        there will be NO duplicates between
        Page 1 and Page 2.
    */

    sixQuestions =
        shuffle(
            diagrams
        ).slice(
            0,
            12
        );


    sixScore = 0;

    sixChecked = 0;

    sixPage = 1;


    sixPageQuestions = [];


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
        "PAGE 1 / 2";


    /*
        Unlimited time.
    */

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


    /*
        Page 1 = 50%.
    */

    document
        .getElementById(
            "progressBar"
        )
        .style.width =
        "50%";


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
            "sixNextPageBtn"
        )
        .classList
        .add("hidden");


    document
        .getElementById(
            "sixResultBtn"
        )
        .classList
        .add("hidden");


    showScreen(
        "quizScreen"
    );


    renderSixPage();

}


/* =========================================================
   RENDER CURRENT 6-PICTURE PAGE
========================================================= */

function renderSixPage() {

    const container =
        document
            .getElementById(
                "sixPicturesContainer"
            );


    container.innerHTML =
        "";


    /*
        PAGE 1:

        startIndex = 0
        endIndex = 6

        PAGE 2:

        startIndex = 6
        endIndex = 12
    */

    const startIndex =
        (
            sixPage - 1
        ) *
        sixPageSize;


    const endIndex =
        startIndex +
        sixPageSize;


    sixPageQuestions =
        sixQuestions.slice(
            startIndex,
            endIndex
        );


    /*
        Reset current page count.
    */

    sixChecked = 0;


    /*
        Update page title.
    */

    document
        .getElementById(
            "questionNumber"
        )
        .textContent =
        `PAGE ${sixPage} / ${sixTotalPages}`;


    document
        .getElementById(
            "sixPageIndicator"
        )
        .textContent =
        `Page ${sixPage} of ${sixTotalPages}`;


    /*
        Update progress.
    */

    const progress =
        sixPage === 1
            ? 50
            : 100;


    document
        .getElementById(
            "progressBar"
        )
        .style.width =
        `${progress}%`;


    /*
        Create six cards.
    */

    sixPageQuestions.forEach(
        (
            question,
            index
        ) => {


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
                        alt="${question.name}"
                    >

                </div>


                <input
                    type="text"
                    class="six-input"
                    id="sixInput${index}"
                    placeholder="Enter full diagram name"
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


    /*
        Reset page buttons.
    */

    document
        .getElementById(
            "sixNextPageBtn"
        )
        .classList
        .add("hidden");


    document
        .getElementById(
            "sixResultBtn"
        )
        .classList
        .add("hidden");


    document
        .getElementById(
            "sixResultMessage"
        )
        .textContent =
        "";

}


/* =========================================================
   CHECK SIX-PICTURE ANSWER
========================================================= */

function checkSixAnswer(
    index
) {

    const question =
        sixPageQuestions[index];


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


    /*
        Normalize user answer.

        Example:

        "composite    structure diagram"

        becomes:

        "COMPOSITE STRUCTURE DIAGRAM"
    */

    const userAnswer =
        input.value
            .trim()
            .toUpperCase()
            .replace(
                /\s+/g,
                " "
            );


    /*
        FULL diagram name.

        NOT question.short.

        Therefore:

        Composite Structure Diagram
        is required.
    */

    const correctAnswer =
        question.name
            .toUpperCase()
            .replace(
                /\s+/g,
                " "
            );


    /*
        Empty answer:
        no penalty.
    */

    if (
        !userAnswer
    ) {

        return;

    }


    /*
        Don't check the same card again.
    */

    if (
        card.dataset.checked ===
        "true"
    ) {

        return;

    }


    card.dataset.checked =
        "true";


    input.disabled =
        true;


    button.disabled =
        true;


    /*
        CORRECT
    */

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


    /*
        WRONG
    */

    else {

        card.classList.add(
            "wrong"
        );


        /*
            Show COMPLETE answer.

            Example:

            ✗ Composite Structure Diagram
        */

        button.textContent =
            `✗ ${question.name}`;

    }


    sixChecked++;


    /*
        Update total score.
    */

    document
        .getElementById(
            "scoreDisplay"
        )
        .textContent =
        sixScore;


    /*
        ALL SIX ON CURRENT PAGE
        HAVE BEEN ANSWERED.
    */

    if (
        sixChecked ===
        sixPageQuestions.length
    ) {


        /* =============================================
           PAGE 1 FINISHED
        ============================================== */

        if (
            sixPage === 1
        ) {

            document
                .getElementById(
                    "sixResultMessage"
                )
                .textContent =
                `Page 1 complete! Current score: ${sixScore} / 6`;


            document
                .getElementById(
                    "sixNextPageBtn"
                )
                .classList
                .remove(
                    "hidden"
                );

        }


        /* =============================================
           PAGE 2 FINISHED
        ============================================== */

        else {

            document
                .getElementById(
                    "sixResultMessage"
                )
                .textContent =
                `All 12 pictures complete! Final score: ${sixScore} / 12`;


            document
                .getElementById(
                    "sixResultBtn"
                )
                .classList
                .remove(
                    "hidden"
                );

        }

    }

}


/* =========================================================
   NEXT 6-PICTURE PAGE
========================================================= */

function nextSixPage() {

    /*
        Don't allow Page 2 until
        all 6 Page 1 pictures
        have been checked.
    */

    if (
        sixChecked !==
        sixPageQuestions.length
    ) {

        return;

    }


    /*
        Move to Page 2.
    */

    sixPage = 2;


    /*
        IMPORTANT:

        renderSixPage() takes:

        Page 1 = sixQuestions[0..5]

        Page 2 = sixQuestions[6..11]

        So NO diagram repeats.
    */

    renderSixPage();

}


/* =========================================================
   FINISH SIX PICTURES
========================================================= */

function finishSixPictures() {

    showResult(
        sixScore,
        12
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
   ALL DIAGRAMS
========================================================= */

function openDiagrams() {

    const gallery =
        document
            .getElementById(
                "diagramGallery"
            );


    gallery.innerHTML =
        "";


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