import {
    start_btn,
    quiz_box,
    result_box,
    restart_btn,
    option_list,
    timeText,
    timeCount,
    theme_btn
} from './constants.js';

import { questions } from './questions.js';

// смена темы
theme_btn.onclick = () => {
    let theme = document.getElementById("theme");
    if (theme.getAttribute("href") === "style.css") {
        theme.href = "dark_style.css";
    } else {
        theme.href = "style.css";
    }
}

// запуск квиза
start_btn.onclick = () => {
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(1);
    startTimer(15);
}


let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;

// перезапуск
restart_btn.onclick = () => {
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    timeValue = 15;
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    timeText.textContent = "You have";
    next_btn.classList.remove("show");
}
let selectedAnswer = [];
const next_btn = quiz_box.querySelector(".buttons .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");
const answer_btn = quiz_box.querySelector(".buttons .answer_btn");

// получение ответов
answer_btn.onclick = () => {
    if (selectedAnswer) {
        clearInterval(counter);
        let userAns = selectedAnswer.textContent;
        let correctAns = questions[que_count].answer;
        const allOptions = option_list.children.length;

        if (userAns === correctAns) {
            userScore += 1;
            selectedAnswer.classList.add("correct");
        } else {
            selectedAnswer.classList.add("incorrect");
            for (let i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent === correctAns) {
                    option_list.children[i].setAttribute("class", "option correct");
                }
            }

        }

        for (let i = 0; i < allOptions; i++) {
            option_list.children[i].classList.add("disabled");
        }

        next_btn.classList.add("show");
        selectedAnswer = null;
    }
}

// переход к следующему вопросу/к результатам
next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(timeValue);
        timeText.textContent = "You have";
        next_btn.classList.remove("show");
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        showResult();
    }
}

// вопросы
function showQuestions(index) {
    const que_text = document.querySelector(".que_text");

    let que_tag = `<span>${questions[index].numb}. ${questions[index].question}</span>`;
    let option_tag = questions[index].options.map(option => `<div class="option"><span>${option}</span></div>`).join('');

    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const options = option_list.querySelectorAll(".option");

    options.forEach(option => {
        option.addEventListener("click", () => optionSelected(option));
    });
}

// выбор варианта
function optionSelected(answer) {
    selectedAnswer = answer;
    answer.classList.add("selected");
    const allOptions = option_list.children.length;

    answer_btn.classList.add("show");
}

// результат
function showResult() {
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");
    scoreText.innerHTML = `<span>You got <p>${userScore}</p> out of <p>${questions.length}</p></span>`;
}

// таймер
function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;

        if (time < 0) {
            clearInterval(counter);
            timeText.textContent = "Time Off";
            const allOptions = option_list.children.length;
            let correctAns = questions[que_count].answer;
            for (let i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent === correctAns) {
                    option_list.children[i].setAttribute("class", "option correct");
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for (let i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled");
            }
            next_btn.classList.add("show");
        }
    }
}

function queCounter(index) {
    bottom_ques_counter.innerHTML = `<span><p>${index}</p> of <p>${questions.length}</p></span>`;
}
