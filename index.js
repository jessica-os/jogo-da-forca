const questionElement = document.querySelector('.question');
const optionsElement = document.querySelector('.options');
const statusCorrect = document.querySelector(".status-correct");
const statusWrong = document.querySelector(".status-wrong");
const statusLost = document.querySelector(".status-lost");
const statusCongrats = document.querySelector(".status-congrats");

const hangmanImages = document.querySelectorAll('.error-img');
const nextQuestionButton = document.querySelector('.next-question');
const palmasImages = document.querySelectorAll('.palmas');
const cry = document.querySelector(".cry")
const line=document.querySelector(".line")

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
    },
    {
        question: "Qual serviço da AWS pode ser usado para carregar dados do Amazon S3, transformá-los e movê-los para outro destino?",
        options: ["Amazon RedShift", "AWS Glue", "Amazon Kinesis", "Amazon EMR"],
        answer: "AWS Glue"
    },
    {
        question: "Um pequeno empresário que não é especialista em tecnologia está procurando encontrar especialistas certificados pela AWS para um projeto de curto prazo. Eles precisam de um serviço que possa ajudá-los a se conectar com profissionais que podem oferecer conselhos e ajudar a implementar soluções da AWS rapidamente.Qual serviço da AWS eles devem usar?",
        options: ["AWS Training and Certification", "AWS Support", "AWS IQ", "AWS Marketplace"],
        answer: "AWS IQ"
    },
    {
        question: "Um profissional de nuvem quer saber se há serviços que podem proteger contra ataques DDoS (Negação de Serviço Distribuída) direcionados aos serviços da AWS.Qual serviço ou ferramenta da AWS fornecerá essa proteção?",
        options: ["AWS Shield", "Amazon GuardDuty", "Security group", "Network access control list (ACL)"],
        answer: "AWS Shield"
    },
    {
        question: "O que pode ser usado para permitir que um aplicativo em execução em uma instância do Amazon EC2 armazene dados com segurança em um bucket do Amazon S3 sem usar credenciais de longo prazo?",
        options: ["AWS Systems Manager", "AWS IAM role", "AWS IAM access key", "Amazon Connect"],
        answer: "AWS IAM role"
    },
    {
        question: "De acordo com o modelo de responsabilidade compartilhada, qual tarefa relacionada à segurança é de responsabilidade do cliente?",
        options: ["Manter a criptografia do lado do servidor", "Protegendo servidores e racks em data centers da AWS", "Manter configurações de firewall em nível de hardware.", "Manutenção da configuração de rede física"],
        answer: "Manter a criptografia do lado do servidor"
    },
    {
        question: "Um Cloud Practitioner requer um método simples para identificar se o acesso irrestrito aos recursos foi permitido por grupos de segurança. Qual serviço o Cloud Practitioner pode usar?",
        options: ["VPC Flow Logs", "AWS CloudTrail", "AWS Trusted Advisor", "Amazon CloudWatch"],
        answer: "AWS Trusted Advisor"
    },
    {
        question: "Qual serviço gerenciado pela AWS pode ser usado para processar grandes quantidades de dados usando uma estrutura Hadoop hospedada?",
        options: ["Amazon Redshift", "Amazon DynamoDB", "Amazon EMR", "Amazon Atena"],
        answer: "Amazon EMR"
    },
    {
        question: "Um usuário tem conhecimento limitado dos serviços da AWS, mas deseja implantar rapidamente um aplicativo Node.js escalável em uma Amazon VPC.Qual serviço deve ser usado para implantar o aplicativo?",
        options: ["Amazon EC2", "AWS Elastic Beanstalk", "AWS CloudFormation", "Amazon LightSail"],
        answer: "AWS Elastic Beanstalk"
    },
    {
        question: "Para que um profissional de nuvem pode usar a Calculadora de Custo Total de Propriedade (TCO) da AWS?",
        options: ["Habilitar alertas de cobrança para monitorar os custos reais da AWS em comparação com os custos estimados", "Gere relatórios que detalham os custos de computação da Nuvem AWS por duração, recurso ou tags", "Estime uma fatura mensal para os recursos da Nuvem AWS que serão usados", "Estimar economias ao comparar a Nuvem AWS com um ambiente local"],
        answer: "Estimar economias ao comparar a Nuvem AWS com um ambiente local"
    },
    {
        question: "Qual painel da AWS exibe informações relevantes e oportunas para ajudar os usuários a gerenciar eventos em andamento e fornece notificações proativas para ajudar a planejar atividades agendadas?",
        options: ["AWS Personal Health Dashboard", "Amazon CloudWatch dashboard", "AWS Service Health Dashboard", "AWS Trusted Advisor dashboard"],
        answer: "AWS Personal Health Dashboard"
    },
    {
        question: "Uma corporação com vários departamentos, cada um com suas próprias contas AWS, quer implementar uma solução para personalizar dados de faturamento para corresponder à sua lógica de negócios específica de showback ou chargeback. Eles desejam agrupar contas com proprietários financeiros semelhantes e gerar um Relatório de Custo e Uso (CUR) distinto para cada grupo.Qual serviço da AWS eles devem usar para atender a esses requisitos?",
        options: ["AWS Billing and Cost Management", "AWS Budgets", "AWS Billing Conductor", "AWS Cost Explorer"],
        answer: "AWS Billing Conductor"
    },
    {
        question: "Qual serviço da AWS o AWS Snowball Edge oferece suporte nativo?",
        options: ["AWS Trusted Advisor", "AWS Database Migration Service (AWS DMS)", "AWS Server Migration Service (AWS SMS)", "Amazon EC2"],
        answer: "Amazon EC2"
    },
    {
        question: "Qual tecnologia pode ajustar automaticamente a capacidade de computação conforme a demanda por um aplicativo aumenta ou diminui?",
        options: ["Tolerância ao erro", "Dimensionamento automático", "Balanceamento de carga", "Alta disponibilidade"],
        answer: "Dimensionamento automático"
    },
    {
        question: "Qual serviço da AWS pode ser usado para executar contêineres do Docker?",
        options: ["AWS Lambda", "Amazon ECS", "Amazon AMI", "Amazon ECR"],
        answer: "Amazon ECS"
    },
    {
        question: "Uma empresa precisa de uma conexão consistente e dedicada entre os recursos da AWS e um sistema local.Qual serviço da AWS pode atender a esse requisito?",
        options: ["AWS Direct Connect", "AWS Managed VPN", "Amazon Connect", "AWS DataSync"],
        answer: "AWS Direct Connect"
    },
    {
        question: "Uma empresa precisa de uma conexão consistente e dedicada entre os recursos da AWS e um sistema local.Qual serviço da AWS pode atender a esse requisito?",
        options: ["Atualizando sistemas operacionais", "Atualizando o firmware do host Amazon EC2", "Concedendo permissões a usuários e serviços", "Criptografando dados em repouso"],
        answer: "Atualizando o firmware do host Amazon EC2"
    },
    {
        question: "Um usuário precisa de um relatório automatizado de avaliação de segurança que identifique o acesso não intencional à rede em instâncias do Amazon EC2 e vulnerabilidades nessas instâncias.Qual serviço da AWS fornecerá este relatório de avaliação?",
        options: ["EC2 security groups", "AWS Conﬁg", "Amazon Macie", "Amazon Inspector"],
        answer: "Amazon Inspector"
    },
    {
        question: "Qual princípio de design de arquitetura de nuvem é suportado pela implantação de cargas de trabalho em várias Zonas de Disponibilidade?",
        options: ["Automatize a infraestrutura.", "Habilitar elasticidade.", "Projete para o fracasso.", "Design para agilidade."],
        answer: "Projete para o fracasso."
    },
    {
        question: "Qual princípio de design de arquitetura de nuvem é suportado pela implantação de cargas de trabalho em várias Zonas de Disponibilidade?",
        options: ["Automatize a infraestrutura.", "Habilitar elasticidade.", "Projete para o fracasso.", "Design para agilidade."],
        answer: "Projete para o fracasso."
    },
    {
        question: "Uma empresa precisa usar software de terceiros para sua carga de trabalho na AWS.Existe algum recurso ou serviço da AWS que a empresa pode usar para comprar o software?",
        options: ["AWS License Manager", "AWS Resource Access Manager", "AWS Managed Services", "AWS Marketplace"],
        answer: "Projete para o fracasso."
    },
    {
        question: "Qual serviço de armazenamento híbrido da AWS permite que os aplicativos locais de um usuário usem perfeitamente o armazenamento em nuvem da AWS?",
        options: ["AWS Direct Connect", "Amazon Connect", "AWS Backup", "AWS Storage Gateway"],
        answer: "AWS Storage Gateway"
    },
    {
        question: "Uma empresa precisa de um dashboard para relatórios ao usar uma solução de business intelligence. Qual serviço da AWS um Cloud Practitioner pode usar?Qual serviço da AWS pode ser usado?",
        options: ["Amazon Redshift", "Amazon Kinesis", "Amazon QuickSight", "Amazon Athena"],
        answer: "Amazon QuickSight"
    },
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
        palmasImages.forEach(img => img.style.display = 'none');

    } else {
        statusCorrect.style.display = 'block';
        optionsElement.innerHTML = '';
        nextQuestionButton.style.display = 'none';

    }
}

// Função para lidar com a resposta do usuário
function handleAnswer(selectedOption) {
    const questionData = questions[currentQuestionIndex];
    // Esconde todas as mensagens de status
    statusCorrect.style.display = 'none';
    statusWrong.style.display = 'none';
    statusLost.style.display = 'none';
    statusCongrats.style.display = 'none';

    if (selectedOption === questionData.answer) {
        statusCorrect.style.display = 'block';
        nextQuestionButton.style.display = 'block';
        // Seleciona aleatoriamente uma imagem de palmas para exibir
        const randomIndex = Math.floor(Math.random() * palmasImages.length);
        palmasImages[randomIndex].style.display = 'block';

        nextQuestionButton.style.display = 'block';
    } else {
        attemptsLeft--;
        statusWrong.style.display = 'block';
        document.getElementById('attempts-left').textContent = attemptsLeft;
        hangmanImages[6 - attemptsLeft].style.display = 'block';

        if (attemptsLeft === 0) {
            statusLost.style.display = 'block'
            questionElement.style.display = 'none';
            optionsElement.innerHTML = '';
            nextQuestionButton.style.display = 'none';
            cry.style.display = "block"
            line.style.display="block"

        }
    }
}

// Inicializa o jogo
function init() {
    hangmanImages.forEach(img => img.style.display = 'none');
    currentQuestionIndex = 0;
    attemptsLeft = 6;
    loadQuestion();

    nextQuestionButton.addEventListener('click', nextQuestion);
}

// Função para carregar a próxima pergunta
function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
    statusCorrect.style.display = 'none';
    statusWrong.style.display = 'none';
    statusLost.style.display = 'none';
    statusCongrats.style.display = 'none';
}

// Inicia o jogo quando a página é carregada
window.onload = init;
