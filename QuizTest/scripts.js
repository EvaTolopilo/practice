import {
    start_btn,
    quiz_box,
    result_box,
    restart_btn,
    option_list,
    timeText,
    timeCount,
    theme_btn,
    next_btn,
    bottom_ques_counter,
    answer_btn,
    scoreText,
    que_text,
} from './constants.js';

import { questions } from './questions.js';

//тема
function darkmode() {
    const body = document.body;
    const  wasDarkMode = localStorage.getItem('darkmode') === 'true';
    localStorage.setItem('darkmode', !wasDarkMode)
    body.classList.toggle('darkmode', !wasDarkMode);
}
document.querySelector('.theme_btn').addEventListener('click', darkmode);
function onload() {
    document.body.classList.toggle('darkmode',  localStorage.getItem('darkmode') === 'true' );

}
document.addEventListener('DOMContentLoaded', onload);

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
    selectedAnswer = [];
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    timeText.textContent = "You have";
    next_btn.classList.remove("show");
}
let selectedAnswer = [];

// получение ответов
answer_btn.onclick = () => {
    if (selectedAnswer.length > 0) {
        clearInterval(counter);
        let correctAns = questions[que_count].answer;
        const allOptions = option_list.children.length;
        let isCorrect = true;

        selectedAnswer.forEach(answer => {
            let userAns = answer.textContent;
            if (Array.isArray(correctAns)) {
                if (!correctAns.includes(userAns)) {
                    isCorrect = false;
                    answer.classList.add("incorrect");
                } else {
                    answer.classList.add("correct");
                }
            } else {
                if (userAns !== correctAns) {
                    isCorrect = false;
                    answer.classList.add("incorrect");
                } else {
                    answer.classList.add("correct");
                }
            }
            answer.classList.remove("selected");
        });

        if (isCorrect && selectedAnswer.length === correctAns.length) {
            userScore += 1;
        } else {
            for (let i = 0; i < allOptions; i++) {
                if (Array.isArray(correctAns)) {
                    if (correctAns.includes(option_list.children[i].textContent)) {
                        option_list.children[i].setAttribute("class", "option correct");
                    }
                } else {
                    if (option_list.children[i].textContent === correctAns) {
                        option_list.children[i].setAttribute("class", "option correct");
                    }
                }
            }
        }

        for (let i = 0; i < allOptions; i++) {
            option_list.children[i].classList.add("disabled");
        }

        next_btn.classList.add("show");
        selectedAnswer = [];
    }
}

// переход к следующему вопросу/к результатам
next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        const hasSingleAnswer = questions[que_count].answer.length === 1;
        if (hasSingleAnswer) {
            clearInterval(counter);
            clearInterval(counterLine);
            startTimer(timeValue);
            timeText.textContent = "You have";
            next_btn.classList.remove("show");
        } else {
            openModal();
            clearInterval(counter);
            clearInterval(counterLine);
            startTimer(timeValue);
            timeText.textContent = "You have";
            next_btn.classList.remove("show");
        }
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        showResult();
    }
}


// вопросы
function showQuestions(index) {

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
    const hasSingleAnswer = questions[que_count].answer.length === 1;
    if (hasSingleAnswer) {
        const allOptions = Array.from(option_list.children);
        allOptions.forEach(option => {
            if (option !== answer) {
                option.classList.remove("selected");
            }
        });
        answer.classList.add("selected");
        selectedAnswer = [answer];
    } else {
        if (!selectedAnswer.includes(answer)) {
            selectedAnswer.push(answer);
            answer.classList.add("selected");
        } else {
            selectedAnswer = selectedAnswer.filter(opt => opt !== answer);
            answer.classList.remove("selected");
        }
    }
    answer_btn.classList.add("show");
}

// результат
function showResult() {
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
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
                if (Array.isArray(correctAns)) {
                    if (correctAns.includes(option_list.children[i].textContent)) {
                        option_list.children[i].setAttribute("class", "option correct");
                    }
                } else {
                    if (option_list.children[i].textContent === correctAns) {
                        option_list.children[i].setAttribute("class", "option correct");
                    }
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


const modal = document.getElementById("modal");
function openModal() {
    modal.style.display = "flex";
}

function closeModal() {
    modal.style.display = "none";
}

window.onclick = function (e) {
    if(e.target === modal) {
        closeModal();
    }
};