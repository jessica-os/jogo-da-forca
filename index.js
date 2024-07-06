const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const statusElement = document.getElementById('status');
const hangmanImages = document.querySelectorAll('.error-img');
const nextQuestionButton = document.getElementById('next-question');

let currentQuestionIndex = 0;
let attemptsLeft = 6;

const questions = [
    {
        question: "Qual serviço da AWS é usado para gerenciar certificados SSL/TLS?",
        options: ["AWS Certificate Manager", "AWS KMS", "AWS Storage Gateway"],
        answer: "AWS Certificate Manager"
    },
    {
        question: "Qual serviço da AWS é usado para criptografia de dados?",
        options: ["AWS DMS", "AWS KMS", "AWS SWF"],
        answer: "AWS KMS"
    },
    {
        question: "Qual serviço da AWS conecta um software no local com armazenamento em nuvem?",
        options: ["AWS Storage Gateway", "AWS ElastiCache", "AWS DMS"],
        answer: "AWS Storage Gateway"
    },
    {
        question: "Qual das opções a seguir pode ser usada para identificar um usuário específico que encerrou uma instância de banco de dados do Amazon RDS?",
        options: ["AWS CloudTrail", "Amazon Inspector", "AWS Trusted Advisor", "Amazon CloudWatch"],
        answer: "AWS CloudTrail"
    },
    {
        question: "Qual ferramenta do Amazon EC2 atua como um firewall virtual para controlar o tráfego de entrada e saída para uma instância do EC2?",
        options: ["AWS WAF", "Security group", "AWS Shield", "Network access control list (ACL)"],
        answer: "Security group"
    }
];


// Função para carregar a pergunta atual
function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        const questionData = questions[currentQuestionIndex];
        questionElement.innerHTML = questionData.question;
        optionsElement.innerHTML = '';
        questionData.options.forEach(option => {
            const button = document.createElement('button');
            button.innerHTML = option;
            button.addEventListener('click', () => handleAnswer(option));
            optionsElement.appendChild(button);
        });
        nextQuestionButton.style.display = 'none'; // Oculta o botão "Próxima Questão"
        statusElement.innerHTML = ''; // Limpa a mensagem de status
    } else {
        statusElement.innerHTML = "Parabéns! Você completou todas as perguntas.";
        optionsElement.innerHTML = '';
        nextQuestionButton.style.display = 'none';
    }
}

// Função para lidar com a resposta do usuário
function handleAnswer(selectedOption) {
    const questionData = questions[currentQuestionIndex];
    if (selectedOption === questionData.answer) {
        statusElement.innerHTML = "Resposta correta!";
        nextQuestionButton.style.display = 'block';
    } else {
        attemptsLeft--;
        statusElement.innerHTML = `Resposta errada! Tentativas restantes: ${attemptsLeft}`;
        hangmanImages[6 - attemptsLeft].style.display = 'block';

        if (attemptsLeft === 0) {
            statusElement.innerHTML = `Você perdeu!`;
            optionsElement.innerHTML = '';
            nextQuestionButton.style.display = 'none';
        }
    }
}

// Inicializa o jogo
function init() {
    hangmanImages.forEach(img => img.style.display = 'none');
    currentQuestionIndex = 0;
    attemptsLeft = 6;
    loadQuestion();
    statusElement.innerHTML = '';
    nextQuestionButton.addEventListener('click', nextQuestion);
}

// Função para carregar a próxima pergunta
function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

// Inicia o jogo quando a página é carregada
window.onload = init;
