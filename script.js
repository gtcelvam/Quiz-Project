// Id name of start button
const startButton = document.getElementById("start-btn");
// Id name of Next Button
const nextButton = document.getElementById("next-btn");
//Id name of Score board
const ScoreBoard = document.getElementById("score");
// Id name of Question Container
const questionContainerElement = document.getElementById("questain-container");
// Id name of Question
const questionElement = document.getElementById("question");
// Id name of Answer buttons
const answerButtonElement = document.getElementById("answer-buttons")
// Creating two constants to shuffle questions and to give index
let shuffledQuestions, currentQuestionIndex


/* Clicking start to button  */
startButton.addEventListener("click",startGame)
nextButton.addEventListener("click",()=>{
    currentQuestionIndex++;
    setNextQuestion();
})
function startGame(){
    startButton.classList.add("hide");
    ScoreBoard.classList.remove("hide");
    questionContainerElement.classList.remove("hide");
    shuffledQuestions = questions.sort(()=> Math.random() - 0.5);
    currentQuestionIndex = 0;
    setNextQuestion();
}

function setNextQuestion(){
    clearStatusClass(document.body)
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}
function showQuestion(index){
    questionElement.textContent = index.question;
    shuffledAnswers = index.answers.sort(()=> Math.random() - 0.5);
    shuffledAnswers.forEach(object => {
        const button = document.createElement("button");
        button.classList.add("btn");
        button.innerText = object.text;
        if(object.correct){
            button.dataset.correct = object.correct;
        }
        button.addEventListener("click",selectAnswer);
        answerButtonElement.appendChild(button);
    });
}
function resetState(){
    nextButton.classList.add("hide");
    while(answerButtonElement.firstChild){
        answerButtonElement.removeChild(answerButtonElement.firstChild);
    }
}
function selectAnswer(e){
    const selectedAnswer = e.target;
    const correct = selectedAnswer.dataset.correct;
    setStatusClass(document.body, correct) 
    Array.from(answerButtonElement.children).forEach(button=>{
        setStatusClass(button,button.dataset.correct);
    })
    if(shuffledQuestions.length > currentQuestionIndex + 1){
        nextButton.classList.remove("hide");
    }
    else{
        startButton.innerText = "Reset";
        startButton.classList.remove("hide");
        startButton.addEventListener("click",()=>{
            ScoreBoard.classList.add("hide");
        })
    }
    Scores(correct);
}   
function Scores(correct){
    let num = 0;
    if(correct){
        num++;
        ScoreBoard.textContent = num;
    }
    ScoreBoard.classList.remove("hide");
}
function setStatusClass(element, correct){
    clearStatusClass(element);
    if(correct){
        element.classList.add("correct");
    }else{
        element.classList.add("wrong");
    }
}
function clearStatusClass(element){
    element.classList.remove("correct");
    element.classList.remove("wrong");
}    
const questions = [
    {question : "What is 2 + 2?",
answers : [
    {text : "4",correct : true},
    {text : "6",correct : false}
]},  {question : "Capital of India ?",
answers : [
    {text : "Delhi",correct : true},
    {text : "Mumbai",correct : false}
]},  {question : "Chennai is capital of ?",
answers : [
    {text : "Tamilnadu",correct : true},
    {text : "Andhra Pradesh",correct : false}
]}]