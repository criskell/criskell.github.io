const questions = [
  {
    statement: "O que eu mais gosto em você?",
    responses: [
      {
        body: "Olhos",
      },
      {
        body: "Sorriso",
        correct: true,
      },
      {
        body: "Bochecha",
      },
      {
        body: "Mãos",
      },
    ],
  },
  {
    statement: "Períodos em que penso em você:",
    responses: [
      {
        body: "Manhã",
      },
      {
        body: "Tarde",
      },
      {
        body: "O dia todo, exceto dormindo",
        correct: true,
      },
      {
        body: "Antes de dormir",
      },
    ],
  },
  {
    statement: "Uma música que me faz lembrar momentos com você:",
    responses: [
      {
        body: "Ouvir dizer",
        correct: true,
      },
      {
        body: "Era uma vez",
      },
      {
        body: "Conto os dias",
      },
      {
        body: "Domingo de manhã",
      },
    ],
  },
  {
    statement: "Uma música que me faz lembrar você:",
    responses: [
      {
        body: "Ouvir dizer",
      },
      {
        body: "Era uma vez",
      },
      {
        body: "Conto os dias",
        correct: true,
      },
      {
        body: "Domingo de manhã",
      },
    ],
  },
  {
    statement: "O que me impressiona em você?",
    responses: [
      {
        body: "Humor",
        correct: true,
      },
      {
        body: "Paciência",
      },
      {
        body: "Inteligência",
      },
      {
        body: "Eficiência",
      },
    ],
  },
  {
    statement: "Data do primeiro encontro:",
    responses: [
      {
        body: "13/08",
      },
      {
        body: "17/08",
      },
      {
        body: "15/08",
        correct: true,
      },
      {
        body: "03/08",
      },
    ],
  },
  {
    statement: "Meu lugar preferido contigo?",
    responses: [
      {
        body: "Carro",
      },
      {
        body: "Ao ar livre",
        correct: true,
      },
      {
        body: "Em casa",
      },
      {
        body: "Cinema",
      },
    ],
  },
  {
    statement: "Como eu me sinto ao estar ao seu lado?",
    responses: [
      {
        body: "Livre",
      },
      {
        body: "Segura",
      },
      {
        body: "Em paz",
        correct: true,
      },
      {
        body: "Leve",
      },
    ],
  },
  {
    statement: "Uma palavra sua que me causa borboletas no estômago?",
    responses: [
      {
        body: "Saudade",
        correct: true,
      },
      {
        body: "Novidade",
      },
      {
        body: "Morango",
      },
      {
        body: "Não sei",
      },
    ],
  },
  {
    statement: "Como eu te descreveria?",
    responses: [
      {
        body: "Incrível",
        correct: true,
      },
      {
        body: "Amigável",
      },
      {
        body: "Saudável",
      },
      {
        body: "Inimaginável",
      },
    ],
  },
  {
    statement:
      "O que, principalmente, eu poderia fazer com você por um longo período de tempo?",
    responses: [
      {
        body: "Andar",
      },
      {
        body: "Dormir",
      },
      {
        body: "Abraçar",
        correct: true,
      },
      {
        body: "Filme",
      },
    ],
  },
  {
    statement: "Quando estamos longe?",
    responses: [
      {
        body: "Gosto de ler livros",
      },
      {
        body: "Sorrio ao receber uma mensagem sua",
        correct: true,
      },
      {
        body: "Sorrio ao cantar uma música",
      },
      {
        body: "Lembro de pantufas",
      },
    ],
  },
  {
    statement: "Um fato sobre mim:",
    responses: [
      {
        body: "Sou tímida",
      },
      {
        body: "Sou chorona",
      },
      {
        body: "Tenho um crush com a língua portuguesa",
        correct: true,
      },
      {
        body: "Sou medrosa",
      },
    ],
  },
  {
    statement: "Em que momento acredita que percebi gostar de você?",
    responses: [
      {
        body: "Quando se tornou difícil não pensar em você",
        correct: true,
      },
      {
        body: "Quando eu estou com fome",
      },
      {
        body: "Enquanto durmo",
      },
      {
        body: "Enquanto estou no trem",
      },
    ],
  },
  {
    statement:
      "Escolha uma das três frases que eu poderia ter escolhido previamente:",
    responses: [
      {
        body: "Um carinho ou um sorriso seu, valem mais que mil palavras",
        correct: true,
      },
      {
        body: "Não andeis ansiosos pela vossa vida",
      },
      {
        body: "A vida é um morango",
      },
      {
        body: "Ser feliz sem motivo é a mais autêntica forma de felicidade",
      },
    ],
  },
];

let currentQuestion = 0;

function computeCorrectChoices() {
  const isChoiceCorrect = ({ correct = false, choice = false }) =>
    choice && correct;

  return questions
    .map((question) => (question.responses.some(isChoiceCorrect) ? 1 : 0))
    .reduce((a, b) => a + b);
}

function showQuestion(question) {
  document.querySelector(".question-next").classList.remove("active");
  document.querySelector("#question-statement").innerText = question.statement;

  const responsesElement = document.querySelector("#question-responses");
  responsesElement.innerHTML = "";

  question.responses.forEach((response) => {
    const responseElement = document.createElement("li");

    if (response.choice) {
      document.querySelector(".question-next").classList.add("active");
      responseElement.classList.add("active");
    }

    responseElement.innerText = response.body;
    responseElement.addEventListener("click", (e) =>
      markChoice(e.target, response, question)
    );

    responsesElement.appendChild(responseElement);
  });
}
function showResults() {
  document.querySelector(".question").style.display = "none";

  const correctPercent = Math.floor(
    (computeCorrectChoices() * 100) / questions.length
  );
  const incorrectPercent = 100 - correctPercent;

  document.querySelector("#correctPercent").innerText = correctPercent;
  document.querySelector("#incorrectPercent").innerText = incorrectPercent;

  if (correctPercent < 75) {
    document.querySelector("#congratulations").style.display = "none";
    document.querySelector("#fails").style.display = "block";
  } else {
    document.querySelector("#congratulations").style.display = "block";
    document.querySelector("#fails").style.display = "none";
  }

  document.querySelector(".results").style.display = "block";
}

function markChoice(element, response, question) {
  document.querySelector(".question li.active")?.classList.remove("active");
  document.querySelector(".question-next").classList.add("active");

  element.classList.add("active");

  question.responses.forEach((response) => {
    response.choice = false;
  });

  response.choice = true;
}

function nextQuestion() {
  if (!this.classList.contains("active")) {
    return;
  }

  if (currentQuestion + 1 === questions.length) {
    showResults();
    return;
  }

  showQuestion(questions[++currentQuestion]);
}

function prevQuestion() {
  if (currentQuestion - 1 < 0) {
    return;
  }

  showQuestion(questions[--currentQuestion]);
}

document
  .querySelector(".question-next")
  .addEventListener("click", nextQuestion);

document
  .querySelector(".question-prev")
  .addEventListener("click", prevQuestion);

showQuestion(questions[currentQuestion]);
