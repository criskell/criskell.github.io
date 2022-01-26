// Dados
const questions = [
	{
		statement: 'O que é um seletor CSS',
		responses: [
			{
				body: 'Seletores são padrões que correspondem com elementos HTML.',
				correct: true,
				choice: false,
			},
			{
				body: 'Seletores são funções do tipo (E -> E) -> Bool',
				correct: false,
				choice: false,
			},
			{
				body: 'Seletores selecionam atributos.',
				correct: false,
				choice: false,
			}
		]
	},
	{
		statement: 'Quais são os seletores de atributos',
		responses: [
			{
				body: 'Os seletores de atributos são [attr], [attr=value], [attr~=value], [attr^=value], [attr^=value], [attr$=value], [attr|=value].',
				correct: true,
				choice: false,
			},
			{
				body: 'Seletores são funções do tipo (E -> E) -> Bool',
				correct: false,
				choice: false,
			},
			{
				body: 'Seletores selecionam atributos.',
				correct: false,
				choice: false,
			}
		]
	},
];

let currentQuestion = 0;

// Mostra uma questão
function showQuestion(question) {
	document.querySelector('#question-next').classList.remove('active');
	document.querySelector('#question-statement').innerText = question.statement;

	const questionElement = document.querySelector('.question');
	const responsesElement = document.querySelector('#question-responses');

	responsesElement.innerHTML = '';

	question.responses.forEach((response) => {
		const responseElement = document.createElement('li');

		responseElement.innerText = response.body;
		responseElement.addEventListener('click', (e) => markChoice(e, response));

		responsesElement.appendChild(responseElement);
	});
}

function computeCorrectChoices() {
	const isChoiceCorrect = ({ correct, choice }) => choice && correct;

	return questions
		.map(question => question.responses.some(isChoiceCorrect) ? 1 : 0)
		.reduce((a, b) => a + b);
}

function showResults() {
	document.querySelector('.question').style.display = 'none';

	const correctPercent = computeCorrectChoices() * 100 / questions.length;
	const incorrectPercent = 100 - correctPercent;

	document.querySelector('#correctPercent').innerText = correctPercent;
	document.querySelector('#incorrectPercent').innerText = incorrectPercent;

	if (correctPercent < 75) {
		document.querySelector('#congratulations').style.display = 'none';
	}

	document.querySelector('.results').style.display = 'block';
}

// Manipulador de eventos
function markChoice(e, response) {
	document.querySelector('.question li.active')?.classList.remove('active');
	document.querySelector('#question-next').classList.add('active');

	e.target.classList.add('active');

	response.choice = true;
}

function nextQuestion() {
	if (! this.classList.contains('active')) {
		return;
	}

	if (currentQuestion + 1 === questions.length) {
		showResults();
		return;
	}

	showQuestion(questions[++currentQuestion]);
}

function prevQuestion() {
	if (currentQuestion < questions.length) {
		return;
	}

	showQuestion(questions[--currentQuestion]);
}

// Adiciona listeners de eventos
document.querySelector('#question-next')
	.addEventListener('click', nextQuestion);

document.querySelector('#question-prev')
	.addEventListener('click', prevQuestion);

// Exibe a primeira questão
showQuestion(questions[currentQuestion]);