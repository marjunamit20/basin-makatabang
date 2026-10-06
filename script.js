// =====================================================
// UML DIAGRAM QUIZ
// 30 QUESTIONS
// 1 POINT EACH
// 10 SECONDS EACH
// =====================================================


// =====================================================
// UML TYPES
// =====================================================

const types = [
    "Use Case Diagram",
    "Class Diagram",
    "Activity Diagram",
    "Sequence Diagram",
    "State Machine Diagram",
    "Component Diagram",
    "Deployment Diagram",
    "Object Diagram",
    "Communication Diagram",
    "Package Diagram",
    "Interaction Diagram",
    "Timing Diagram",
    "Composite Structure Diagram",
    "Profile Diagram"
];


// =====================================================
// DOM
// =====================================================

const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const startBtn = document.getElementById("startBtn");

const restartBtn =
    document.getElementById("restartBtn");

const restartQuizBtn =
    document.getElementById("restartQuizBtn");

const nextBtn =
    document.getElementById("nextBtn");

const questionNumber =
    document.getElementById("questionNumber");

const scoreDisplay =
    document.getElementById("score");

const timerDisplay =
    document.getElementById("timer");

const timerBar =
    document.getElementById("timerBar");

const diagramContainer =
    document.getElementById("diagramContainer");

const answersContainer =
    document.getElementById("answers");

const feedback =
    document.getElementById("feedback");

const finalScore =
    document.getElementById("finalScore");

const percentage =
    document.getElementById("percentage");

const resultMessage =
    document.getElementById("resultMessage");


// =====================================================
// VARIABLES
// =====================================================

let questions = [];

let currentQuestion = 0;

let score = 0;

let timer = null;

let answered = false;

let seconds = 10;


// =====================================================
// SHUFFLE
// =====================================================

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


// =====================================================
// SVG
// =====================================================

function svg(content) {

    return `
        <svg
            viewBox="0 0 700 430"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
        >
            ${content}
        </svg>
    `;
}


function line(
    x1,
    y1,
    x2,
    y2,
    extra = ""
) {

    return `
        <line
            x1="${x1}"
            y1="${y1}"
            x2="${x2}"
            y2="${y2}"
            stroke="#1e293b"
            stroke-width="2"
            ${extra}
        />
    `;
}


function rect(
    x,
    y,
    width,
    height,
    text = ""
) {

    return `
        <rect
            x="${x}"
            y="${y}"
            width="${width}"
            height="${height}"
            fill="white"
            stroke="#1e293b"
            stroke-width="2"
            rx="4"
        />

        ${
            text
                ? `
                    <text
                        x="${x + width / 2}"
                        y="${y + height / 2 + 5}"
                        text-anchor="middle"
                        font-size="15"
                        fill="#1e293b"
                    >
                        ${text}
                    </text>
                `
                : ""
        }
    `;
}


function arrow(
    x1,
    y1,
    x2,
    y2
) {

    return `
        <defs>
            <marker
                id="arrow"
                markerWidth="10"
                markerHeight="10"
                refX="8"
                refY="3"
                orient="auto"
            >
                <path
                    d="M0,0 L0,6 L9,3 z"
                    fill="#1e293b"
                />
            </marker>
        </defs>

        <line
            x1="${x1}"
            y1="${y1}"
            x2="${x2}"
            y2="${y2}"
            stroke="#1e293b"
            stroke-width="2"
            marker-end="url(#arrow)"
        />
    `;
}


// =====================================================
// DIAGRAM GENERATOR
// =====================================================

function diagram(type) {

    switch (type) {


        // =================================================
        // USE CASE
        // =================================================

        case "Use Case Diagram":

            return svg(`

                <rect
                    x="190"
                    y="40"
                    width="320"
                    height="340"
                    fill="white"
                    stroke="#1e293b"
                    stroke-width="2"
                />

                <text
                    x="350"
                    y="65"
                    text-anchor="middle"
                    font-size="18"
                    font-weight="bold"
                >
                    System
                </text>


                <ellipse
                    cx="350"
                    cy="130"
                    rx="75"
                    ry="30"
                    fill="white"
                    stroke="#1e293b"
                    stroke-width="2"
                />

                <text
                    x="350"
                    y="136"
                    text-anchor="middle"
                    font-size="14"
                >
                    Login
                </text>


                <ellipse
                    cx="350"
                    cy="215"
                    rx="90"
                    ry="30"
                    fill="white"
                    stroke="#1e293b"
                    stroke-width="2"
                />

                <text
                    x="350"
                    y="221"
                    text-anchor="middle"
                    font-size="14"
                >
                    Manage Account
                </text>


                <ellipse
                    cx="350"
                    cy="300"
                    rx="85"
                    ry="30"
                    fill="white"
                    stroke="#1e293b"
                    stroke-width="2"
                />

                <text
                    x="350"
                    y="306"
                    text-anchor="middle"
                    font-size="14"
                >
                    View Records
                </text>


                <circle
                    cx="100"
                    cy="150"
                    r="15"
                    fill="white"
                    stroke="#1e293b"
                    stroke-width="2"
                />

                ${line(100,165,100,215)}
                ${line(100,180,75,200)}
                ${line(100,180,125,200)}
                ${line(100,215,80,245)}
                ${line(100,215,120,245)}

                ${line(115,190,190,130)}

                <text
                    x="100"
                    y="275"
                    text-anchor="middle"
                    font-size="14"
                >
                    User
                </text>

            `);


        // =================================================
        // CLASS
        // =================================================

        case "Class Diagram":

            return svg(`

                <rect
                    x="70"
                    y="70"
                    width="230"
                    height="250"
                    fill="white"
                    stroke="#1e293b"
                    stroke-width="2"
                />

                <text
                    x="185"
                    y="105"
                    text-anchor="middle"
                    font-size="18"
                    font-weight="bold"
                >
                    Student
                </text>

                ${line(70,125,300,125)}

                <text x="85" y="155" font-size="14">
                    - studentId : int
                </text>

                <text x="85" y="180" font-size="14">
                    - name : string
                </text>

                <text x="85" y="205" font-size="14">
                    - course : string
                </text>

                ${line(70,225,300,225)}

                <text x="85" y="255" font-size="14">
                    + enroll()
                </text>

                <text x="85" y="280" font-size="14">
                    + login()
                </text>


                <rect
                    x="400"
                    y="70"
                    width="230"
                    height="250"
                    fill="white"
                    stroke="#1e293b"
                    stroke-width="2"
                />

                <text
                    x="515"
                    y="105"
                    text-anchor="middle"
                    font-size="18"
                    font-weight="bold"
                >
                    Course
                </text>

                ${line(400,125,630,125)}

                <text x="415" y="155" font-size="14">
                    - courseId : int
                </text>

                <text x="415" y="180" font-size="14">
                    - title : string
                </text>

                ${line(400,205,630,205)}

                <text x="415" y="240" font-size="14">
                    + addStudent()
                </text>

                ${line(300,200,400,200)}

            `);


        // =================================================
        // ACTIVITY
        // =================================================

        case "Activity Diagram":

            return svg(`

                <circle
                    cx="350"
                    cy="45"
                    r="15"
                    fill="#1e293b"
                />

                ${line(350,60,350,100)}

                <rect
                    x="270"
                    y="100"
                    width="160"
                    height="50"
                    rx="25"
                    fill="white"
                    stroke="#1e293b"
                    stroke-width="2"
                />

                <text
                    x="350"
                    y="130"
                    text-anchor="middle"
                    font-size="15"
                >
                    Login
                </text>


                ${line(350,150,350,190)}

                <polygon
                    points="350,190 390,230 350,270 310,230"
                    fill="white"
                    stroke="#1e293b"
                    stroke-width="2"
                />

                <text
                    x="350"
                    y="235"
                    text-anchor="middle"
                    font-size="13"
                >
                    Valid?
                </text>


                ${line(390,230,500,230)}

                <text
                    x="440"
                    y="220"
                    font-size="13"
                >
                    Yes
                </text>


                <rect
                    x="500"
                    y="205"
                    width="140"
                    height="50"
                    rx="25"
                    fill="white"
                    stroke="#1e293b"
                    stroke-width="2"
                />

                <text
                    x="570"
                    y="235"
                    text-anchor="middle"
                    font-size="15"
                >
                    Dashboard
                </text>


                ${line(310,230,190,230)}

                <text
                    x="245"
                    y="220"
                    font-size="13"
                >
                    No
                </text>


                <rect
                    x="60"
                    y="205"
                    width="130"
                    height="50"
                    rx="25"
                    fill="white"
                    stroke="#1e293b"
                    stroke-width="2"
                />

                <text
                    x="125"
                    y="235"
                    text-anchor="middle"
                    font-size="15"
                >
                    Try Again
                </text>

            `);


        // =================================================
        // SEQUENCE
        // =================================================

        case "Sequence Diagram":

            return svg(`

                <text x="120" y="35" text-anchor="middle" font-size="17">
                    User
                </text>

                <text x="350" y="35" text-anchor="middle" font-size="17">
                    System
                </text>

                <text x="580" y="35" text-anchor="middle" font-size="17">
                    Database
                </text>


                ${line(120,50,120,370,'stroke-dasharray="6,6"')}
                ${line(350,50,350,370,'stroke-dasharray="6,6"')}
                ${line(580,50,580,370,'stroke-dasharray="6,6"')}


                ${arrow(120,100,350,100)}

                <text
                    x="235"
                    y="90"
                    text-anchor="middle"
                    font-size="13"
                >
                    Login
                </text>


                ${arrow(350,160,580,160)}

                <text
                    x="465"
                    y="150"
                    text-anchor="middle"
                    font-size="13"
                >
                    Validate
                </text>


                ${arrow(580,220,350,220)}

                <text
                    x="465"
                    y="210"
                    text-anchor="middle"
                    font-size="13"
                >
                    Result
                </text>


                ${arrow(350,280,120,280)}

                <text
                    x="235"
                    y="270"
                    text-anchor="middle"
                    font-size="13"
                >
                    Response
                </text>

            `);


        // =================================================
        // STATE MACHINE
        // =================================================

        case "State Machine Diagram":

            return svg(`

                <circle
                    cx="80"
                    cy="200"
                    r="15"
                    fill="#1e293b"
                />

                ${line(95,200,190,200)}

                <rect
                    x="190"
                    y="175"
                    width="130"
                    height="50"
                    rx="25"
                    fill="white"
                    stroke="#1e293b"
                    stroke-width="2"
                />

                <text
                    x="255"
                    y="205"
                    text-anchor="middle"
                    font-size="15"
                >
                    Idle
                </text>


                ${line(320,200,410,200)}

                <rect
                    x="410"
                    y="175"
                    width="130"
                    height="50"
                    rx="25"
                    fill="white"
                    stroke="#1e293b"
                    stroke-width="2"
                />

                <text
                    x="475"
                    y="205"
                    text-anchor="middle"
                    font-size="15"
                >
                    Processing
                </text>


                ${line(540,200,625,200)}

                <circle
                    cx="640"
                    cy="200"
                    r="18"
                    fill="white"
                    stroke="#1e293b"
                    stroke-width="3"
                />

                <circle
                    cx="640"
                    cy="200"
                    r="10"
                    fill="#1e293b"
                />

            `);


        // =================================================
        // COMPONENT
        // =================================================

        case "Component Diagram":

            return svg(`

                ${rect(70,90,220,100,"Login Component")}
                ${rect(410,90,220,100,"Database Component")}

                ${rect(70,270,220,100,"User Interface")}
                ${rect(410,270,220,100,"Payment Module")}

                ${line(290,140,410,140)}
                ${line(180,190,180,270)}
                ${line(520,190,520,270)}
                ${line(290,320,410,320)}

            `);


        // =================================================
        // DEPLOYMENT
        // =================================================

        case "Deployment Diagram":

            return svg(`

                <!-- CLIENT DEVICE -->

                <polygon
                    points="
                        60,100
                        85,75
                        285,75
                        260,100
                    "
                    fill="#dbe7f2"
                    stroke="#173f67"
                    stroke-width="2"
                />

                <polygon
                    points="
                        260,100
                        285,75
                        285,285
                        260,310
                    "
                    fill="#c6d7e6"
                    stroke="#173f67"
                    stroke-width="2"
                />

                <rect
                    x="60"
                    y="100"
                    width="200"
                    height="210"
                    fill="white"
                    stroke="#173f67"
                    stroke-width="2"
                />

                <text
                    x="160"
                    y="125"
                    text-anchor="middle"
                    font-size="16"
                >
                    «device» Client PC
                </text>

                ${rect(90,160,140,60,"Web Browser")}


                <!-- SERVER -->

                <polygon
                    points="
                        410,100
                        435,75
                        635,75
                        610,100
                    "
                    fill="#dbe7f2"
                    stroke="#173f67"
                    stroke-width="2"
                />

                <polygon
                    points="
                        610,100
                        635,75
                        635,285
                        610,310
                    "
                    fill="#c6d7e6"
                    stroke="#173f67"
                    stroke-width="2"
                />

                <rect
                    x="410"
                    y="100"
                    width="200"
                    height="210"
                    fill="white"
                    stroke="#173f67"
                    stroke-width="2"
                />

                <text
                    x="510"
                    y="125"
                    text-anchor="middle"
                    font-size="16"
                >
                    «device» Server
                </text>

                ${rect(435,155,150,55,"Web App")}
                ${rect(435,225,150,55,"Database")}


                ${line(260,190,410,190)}

            `);


        // =================================================
        // OBJECT
        // =================================================

        case "Object Diagram":

            return svg(`

                <rect
                    x="70"
                    y="100"
                    width="230"
                    height="140"
                    fill="white"
                    stroke="#1e293b"
                    stroke-width="2"
                />

                <text
                    x="185"
                    y="135"
                    text-anchor="middle"
                    font-size="17"
                    text-decoration="underline"
                >
                    student1 : Student
                </text>

                ${line(70,150,300,150)}

                <text x="90" y="180" font-size="14">
                    name = "Juan"
                </text>

                <text x="90" y="210" font-size="14">
                    course = "BSIT"
                </text>


                <rect
                    x="400"
                    y="100"
                    width="230"
                    height="140"
                    fill="white"
                    stroke="#1e293b"
                    stroke-width="2"
                />

                <text
                    x="515"
                    y="135"
                    text-anchor="middle"
                    font-size="17"
                    text-decoration="underline"
                >
                    course1 : Course
                </text>

                ${line(400,150,630,150)}

                <text x="420" y="180" font-size="14">
                    title = "IT"
                </text>


                ${line(300,175,400,175)}

            `);


        // =================================================
        // COMMUNICATION
        // =================================================

        case "Communication Diagram":

            return svg(`

                <circle
                    cx="170"
                    cy="200"
                    r="55"
                    fill="white"
                    stroke="#1e293b"
                    stroke-width="2"
                />

                <text
                    x="170"
                    y="205"
                    text-anchor="middle"
                    font-size="15"
                >
                    User
                </text>


                <circle
                    cx="350"
                    cy="100"
                    r="55"
                    fill="white"
                    stroke="#1e293b"
                    stroke-width="2"
                />

                <text
                    x="350"
                    y="105"
                    text-anchor="middle"
                    font-size="15"
                >
                    System
                </text>


                <circle
                    cx="530"
                    cy="200"
                    r="55"
                    fill="white"
                    stroke="#1e293b"
                    stroke-width="2"
                />

                <text
                    x="530"
                    y="205"
                    text-anchor="middle"
                    font-size="15"
                >
                    Database
                </text>


                ${line(210,165,310,125)}
                ${line(390,125,490,165)}
                ${line(225,200,475,200)}

                <text
                    x="255"
                    y="145"
                    font-size="13"
                >
                    1: login()
                </text>

                <text
                    x="405"
                    y="145"
                    font-size="13"
                >
                    2: validate()
                </text>

                <text
                    x="350"
                    y="190"
                    text-anchor="middle"
                    font-size="13"
                >
                    3: return
                </text>

            `);


        // =================================================
        // PACKAGE
        // =================================================

        case "Package Diagram":

            return svg(`

                <rect
                    x="70"
                    y="100"
                    width="250"
                    height="220"
                    fill="white"
                    stroke="#1e293b"
                    stroke-width="2"
                />

                <rect
                    x="70"
                    y="100"
                    width="100"
                    height="35"
                    fill="white"
                    stroke="#1e293b"
                    stroke-width="2"
                />

                <text
                    x="120"
                    y="123"
                    text-anchor="middle"
                    font-size="14"
                >
                    Users
                </text>


                <text
                    x="100"
                    y="180"
                    font-size="14"
                >
                    User
                </text>

                <text
                    x="100"
                    y="210"
                    font-size="14"
                >
                    Admin
                </text>


                <rect
                    x="380"
                    y="100"
                    width="250"
                    height="220"
                    fill="white"
                    stroke="#1e293b"
                    stroke-width="2"
                />

                <rect
                    x="380"
                    y="100"
                    width="110"
                    height="35"
                    fill="white"
                    stroke="#1e293b"
                    stroke-width="2"
                />

                <text
                    x="435"
                    y="123"
                    text-anchor="middle"
                    font-size="14"
                >
                    Services
                </text>


                <text
                    x="410"
                    y="180"
                    font-size="14"
                >
                    Login
                </text>

                <text
                    x="410"
                    y="210"
                    font-size="14"
                >
                    Payment
                </text>


                ${line(320,200,380,200,'stroke-dasharray="7,5"')}

            `);


        // =================================================
        // INTERACTION
        // =================================================

        case "Interaction Diagram":

            return svg(`

                ${rect(70,100,160,70,"Object A")}
                ${rect(270,100,160,70,"Object B")}
                ${rect(470,100,160,70,"Object C")}

                ${line(230,135,270,135)}
                ${line(430,135,470,135)}

                ${line(150,170,150,310,'stroke-dasharray="6,6"')}
                ${line(350,170,350,310,'stroke-dasharray="6,6"')}
                ${line(550,170,550,310,'stroke-dasharray="6,6"')}

                ${line(150,210,350,210)}
                ${line(350,250,550,250)}

                <text
                    x="250"
                    y="200"
                    font-size="13"
                >
                    message
                </text>

                <text
                    x="450"
                    y="240"
                    font-size="13"
                >
                    message
                </text>

            `);


        // =================================================
        // TIMING
        // =================================================

        case "Timing Diagram":

            return svg(`

                ${line(100,320,630,320)}

                ${line(100,80,100,340)}

                <polyline
                    points="
                        100,180
                        180,180
                        180,280
                        270,280
                        270,150
                        380,150
                        380,250
                        470,250
                        470,120
                        560,120
                        560,280
                        630,280
                    "
                    fill="none"
                    stroke="#1e293b"
                    stroke-width="3"
                />

                <text
                    x="365"
                    y="380"
                    text-anchor="middle"
                    font-size="16"
                    font-weight="bold"
                >
                    Time →
                </text>

            `);


        // =================================================
        // COMPOSITE STRUCTURE
        // =================================================

        case "Composite Structure Diagram":

            return svg(`

                <rect
                    x="100"
                    y="70"
                    width="500"
                    height="290"
                    fill="white"
                    stroke="#1e293b"
                    stroke-width="3"
                />

                <text
                    x="350"
                    y="100"
                    text-anchor="middle"
                    font-size="19"
                    font-weight="bold"
                >
                    Order System
                </text>


                ${rect(150,150,130,70,"Order")}
                ${rect(420,150,130,70,"Payment")}
                ${rect(150,270,130,60,"Customer")}
                ${rect(420,270,130,60,"Product")}


                ${line(280,185,420,185)}
                ${line(215,220,215,270)}
                ${line(485,220,485,270)}


                <rect
                    x="340"
                    y="177"
                    width="12"
                    height="18"
                    fill="white"
                    stroke="#1e293b"
                />

                <rect
                    x="410"
                    y="177"
                    width="12"
                    height="18"
                    fill="white"
                    stroke="#1e293b"
                />

            `);


        // =================================================
        // PROFILE
        // =================================================

        case "Profile Diagram":

            return svg(`

                <rect
                    x="100"
                    y="100"
                    width="200"
                    height="180"
                    fill="white"
                    stroke="#1e293b"
                    stroke-width="2"
                />

                <text
                    x="200"
                    y="130"
                    text-anchor="middle"
                    font-size="18"
                    font-weight="bold"
                >
                    «profile»
                </text>

                <text
                    x="200"
                    y="160"
                    text-anchor="middle"
                    font-size="17"
                >
                    Web Profile
                </text>

                ${line(100,180,300,180)}

                <text
                    x="120"
                    y="210"
                    font-size="14"
                >
                    «stereotype»
                </text>

                <text
                    x="120"
                    y="240"
                    font-size="14"
                >
                    WebPage
                </text>


                <rect
                    x="400"
                    y="100"
                    width="200"
                    height="180"
                    fill="white"
                    stroke="#1e293b"
                    stroke-width="2"
                />

                <text
                    x="500"
                    y="130"
                    text-anchor="middle"
                    font-size="17"
                >
                    «metaclass»
                </text>

                <text
                    x="500"
                    y="170"
                    text-anchor="middle"
                    font-size="16"
                >
                    Class
                </text>

                ${line(400,190,600,190)}

                <text
                    x="420"
                    y="220"
                    font-size="14"
                >
                    attributes
                </text>

            `);


        default:

            return svg(`
                <text
                    x="350"
                    y="220"
                    text-anchor="middle"
                    font-size="25"
                >
                    UML Diagram
                </text>
            `);
    }
}


// =====================================================
// START QUIZ
// =====================================================

function startQuiz() {

    /*
        14 UML types are guaranteed
        to appear at least once.

        Additional 16 are randomized.

        Total = 30.
    */

    questions = shuffle([
        ...types,
        ...shuffle(types).slice(0, 16)
    ]);

    currentQuestion = 0;

    score = 0;

    startScreen.classList.add("hidden");

    resultScreen.classList.add("hidden");

    quizScreen.classList.remove("hidden");

    showQuestion();
}


// =====================================================
// SHOW QUESTION
// =====================================================

function showQuestion() {

    clearInterval(timer);

    answered = false;

    seconds = 10;


    const correctAnswer =
        questions[currentQuestion];


    // QUESTION NUMBER

    questionNumber.textContent =
        `${currentQuestion + 1} / 30`;


    // SCORE

    scoreDisplay.textContent =
        score;


    // TIMER

    timerDisplay.textContent =
        seconds;

    timerBar.style.width =
        "100%";


    // DIAGRAM

    diagramContainer.innerHTML =
        diagram(correctAnswer);


    // RESET FEEDBACK

    feedback.className =
        "feedback hidden";

    feedback.textContent =
        "";


    // HIDE NEXT

    nextBtn.classList.add("hidden");


    // =================================================
    // WRONG ANSWERS
    // =================================================

    const wrongAnswers =
        shuffle(
            types.filter(
                type =>
                    type !== correctAnswer
            )
        ).slice(0, 3);


    // =================================================
    // RANDOMIZE ANSWERS
    // =================================================

    const choices =
        shuffle([
            correctAnswer,
            ...wrongAnswers
        ]);


    answersContainer.innerHTML = "";


    // =================================================
    // CREATE BUTTONS
    // =================================================

    choices.forEach(choice => {

        const button =
            document.createElement("button");

        button.className =
            "answer-btn";

        button.textContent =
            choice;


        button.addEventListener(
            "click",
            () => {

                answerQuestion(
                    button,
                    choice,
                    correctAnswer
                );

            }
        );


        answersContainer.appendChild(
            button
        );

    });


    // =================================================
    // TIMER
    // =================================================

    timer = setInterval(() => {

        seconds--;

        timerDisplay.textContent =
            seconds;

        timerBar.style.width =
            `${seconds * 10}%`;


        if (seconds <= 0) {

            clearInterval(timer);

            timeOut();

        }

    }, 1000);
}


// =====================================================
// ANSWER
// =====================================================

function answerQuestion(
    button,
    selectedAnswer,
    correctAnswer
) {

    if (answered) {
        return;
    }

    answered = true;

    clearInterval(timer);


    const allButtons =
        document.querySelectorAll(
            ".answer-btn"
        );


    allButtons.forEach(btn => {

        btn.disabled = true;

    });


    // CORRECT

    if (
        selectedAnswer ===
        correctAnswer
    ) {

        score += 1;

        button.classList.add(
            "correct"
        );

        feedback.className =
            "feedback correct-feedback";

        feedback.textContent =
            "✓ CORRECT! +1 point";

    }


    // WRONG

    else {

        button.classList.add(
            "wrong"
        );


        allButtons.forEach(btn => {

            if (
                btn.textContent ===
                correctAnswer
            ) {

                btn.classList.add(
                    "correct"
                );

            }

        });


        feedback.className =
            "feedback wrong-feedback";

        feedback.textContent =
            `✗ WRONG! Correct answer: ${correctAnswer}`;

    }


    scoreDisplay.textContent =
        score;


    feedback.classList.remove(
        "hidden"
    );


    nextBtn.classList.remove(
        "hidden"
    );
}


// =====================================================
// TIME OUT
// =====================================================

function timeOut() {

    if (answered) {
        return;
    }

    answered = true;


    const correctAnswer =
        questions[currentQuestion];


    const allButtons =
        document.querySelectorAll(
            ".answer-btn"
        );


    allButtons.forEach(btn => {

        btn.disabled = true;


        if (
            btn.textContent ===
            correctAnswer
        ) {

            btn.classList.add(
                "correct"
            );

        }

    });


    feedback.className =
        "feedback wrong-feedback";

    feedback.textContent =
        `⏰ TIME'S UP — Correct answer: ${correctAnswer}`;


    nextBtn.classList.remove(
        "hidden"
    );
}


// =====================================================
// NEXT
// =====================================================

function nextQuestion() {

    if (!answered) {
        return;
    }


    currentQuestion++;


    if (
        currentQuestion >= 30
    ) {

        finishQuiz();

    }

    else {

        showQuestion();

    }
}


// =====================================================
// FINISH
// =====================================================

function finishQuiz() {

    clearInterval(timer);


    quizScreen.classList.add(
        "hidden"
    );

    resultScreen.classList.remove(
        "hidden"
    );


    const maxScore = 30;


    const percent =
        Math.round(
            (score / maxScore) * 100
        );


    finalScore.textContent =
        `${score} / ${maxScore}`;


    percentage.textContent =
        `${percent}%`;


    if (percent >= 90) {

        resultMessage.textContent =
            "Excellent! You really know your UML diagrams!";

    }

    else if (percent >= 75) {

        resultMessage.textContent =
            "Good job! You have a strong understanding of UML.";

    }

    else if (percent >= 50) {

        resultMessage.textContent =
            "Not bad! A little more practice and you'll improve.";

    }

    else {

        resultMessage.textContent =
            "Keep practicing! Review the UML diagram symbols again.";

    }
}


// =====================================================
// RESTART
// =====================================================

function restartQuiz() {

    clearInterval(timer);

    quizScreen.classList.add(
        "hidden"
    );

    resultScreen.classList.add(
        "hidden"
    );

    startScreen.classList.remove(
        "hidden"
    );

    score = 0;

    currentQuestion = 0;
}


// =====================================================
// BUTTONS
// =====================================================

startBtn.addEventListener(
    "click",
    startQuiz
);


nextBtn.addEventListener(
    "click",
    nextQuestion
);


restartBtn.addEventListener(
    "click",
    restartQuiz
);


restartQuizBtn.addEventListener(
    "click",
    restartQuiz
);