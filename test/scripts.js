const DATA =[
    {
        question: ' According to dictionary entries, which language has the largest number of words (more than 200,000 words)?',
        answers: [
            {
                id:'1',
                value: 'Chinese',
                correct: false,
            },
            {
                id:'2',
                value: 'English',
                correct: true,
            },
            {
                id:'3',
                value: 'Spanish',
                correct: true,
            },
            {
                id:'4',
                value: 'Russian',
                correct: true,
            },
        ]
    },
    {
        question: 'What is the rarest blood type?',
        answers: [
            {
                id:'5',
                value: 'I',
                correct: false,
            },
            {
                id:'6',
                value: 'II',
                correct: false,
            },
            {
                id:'7',
                value: 'III',
                correct: false,
            },
            {
                id:'8',
                value: 'IV',
                correct: true,
            },
        ]
    },
    {
        question: 'Which country consumes the most chocolate?',
        answers: [
            {
                id:'9',
                value: 'Spain',
                correct: false,
            },
            {
                id:'10',
                value: 'Germany',
                correct: false,
            },
            {
                id:'11',
                value: 'USA',
                correct: false,
            },
            {
                id:'12',
                value: 'Switzerland',
                correct: true,
            },
        ]
    },
    {
        question: 'Which company owns Bugatti, Bentley, Lamborghini, Audi and Porsche?',
        answers: [
            {
                id:'13',
                value: 'BMW',
                correct: false,
            },
            {
                id:'14',
                value: 'Mercedes',
                correct: false,
            },
            {
                id:'15',
                value: 'FIAT',
                correct: false,
            },
            {
                id:'16',
                value: 'Volkswagen',
                correct: true,
            },
        ]
    },
    {
        question: 'Which cartoon character lives in a pineapple underwater?',
        answers: [
            {
                id:'17',
                value: 'Flounder',
                correct: false,
            },
            {
                id:'18',
                value: 'SpongeBob SquarePants',
                correct: false,
            },
            {
                id:'19',
                value: 'Rick and Morty',
                correct: false,
            },
            {
                id:'20',
                value: 'Nemo',
                correct: true,
            },
        ]
    },
];

let localResults = {};
const quiz = document.getElementById("quiz");
const questions = document.getElementById("questions");
const indicator = document.getElementById("indicator");
const results = document.getElementById("results");
const next = document.getElementById("next");
const restart = document.getElementById("restart");
  const renderQuestions = (index) => {
     renderIndicator(index + 1);
     questions.dataset.currentStep = index;
     const renderAnswers = () => DATA[index].answers
         .map((answer) => `
             <li>
                 <label>
                     <input class="answer-input" type="radio" name=${index} value=${answer.id}>
                     ${answer.value}
                 </label>
             </li>
         `)
         .join('');

     questions.innerHTML = `
      <div class="quiz-questions-item">
            <div class="quiz-questions-item-question">${DATA[index].question}</div>
            <ul class="quiz-questions-item-answers">${renderAnswers()}</ul>
      </div>
     `;
 };
 const renderResults = () => {
     let content = '';
     const getClassname = () => {
         let classname = '';
         if (!answer.correct && answer.id === localResults[questionIndex]) {
             classname = 'answer--invalid';
         } else if (answer.correct) {
             classname = 'answer--valid';
         }

         return classname;
     };
     const getAnswers = (questionIndex) => DATA[questionIndex].answers
         .map((answer) => `<li class=${getClassname(answer, questionIndex)}>${answer.value}</li>`)
         .join('');

     DATA.forEach((question, index) => {
         content += `
             <div class="quiz-results-item">
                 <div class="quiz-results-item-question">${question.question}</div>
                 <ul class="quiz-results-item-answers">${getAnswers(index)}</ul>
             </div> 
         `;

     });
     results.innerHTML = content;
 };
 const renderIndicator = (currentStep)=> {
     indicator.innerHTML = `${currentStep}/${DATA.length}`;
 };

 quiz.addEventListener('change', (event) => {
     //логика ответа

     if (event.target.classList.contains('answer-input')) {
         console.log('input');
         localResults[event.target.name] = event.target.value;
         next.disabled = false;
         console.log(localResults);
     }
 });

quiz.addEventListener('click', (event) => {
    //вперед\сначала
    if (event.target.classList.contains('btn-next')) {
        const nextQuestionIndex = Number(questions.dataset.currentStep) + 1;
        if (DATA.length === nextQuestionIndex) {
            questions.classList.add('questions--hidden');
            indicator.classList.add('indicator--hidden');
            results.classList.add('results--visible');
            next.classList.add('next--hidden');
            restart.classList.add('restart--visible');
            renderResults();
        } else {
            renderQuestions(nextQuestionIndex);
        }
        next.disabled = true;
    }
    if (event.target.classList.contains('btn-restart')) {
        localResults = {};
        results.innerHTML = '';
        questions.classList.remove('questions--hidden');
        indicator.classList.remove('indicator--hidden');
        results.classList.remove('results--visible');
        next.classList.remove('next--hidden');
        restart.classList.remove('restart--visible');
        renderQuestions(0);
    }
});




renderQuestions(0);