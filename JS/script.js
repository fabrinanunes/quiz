//inital data
let currentQuestion = 0
let correctAnswers = 0

showQuestion()

//events
    //ativar o botão 'tentar novamente'
document.querySelector('.scoreArea button').addEventListener('click', resetEvent)

//functions

    //exibir as questões
function showQuestion(){
    if(questions[currentQuestion]){
        let q = questions[currentQuestion]

            //barra de progresso
        let progress = Math.floor((currentQuestion / questions.length) * 100)
        document.querySelector('.progress--bar').style.width = `${progress}%`
            //esconde a div do resultado
        document.querySelector('.scoreArea').style.display = 'none' 
            //mostra a div das questões
        document.querySelector('.questionArea').style.display = 'block'
            //mostrar a questão do js no html 
        document.querySelector('.question').innerHTML = q.question 

        //exibir as alternativas
        /*
        document.querySelector('.options').innerHTML = '' //limpa o campo
        for (let i in q.options){
            document.querySelector('.options').innerHTML += `<div>${q.options[i]}</div>`
        }*/

        let optionsHtml = ''
        for(let i in q.options){
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`
        }
            //insere as alternativas na tela
        document.querySelector('.options').innerHTML = optionsHtml 

        //evento de click na opção
        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent)
        })
    }else{
        //quando todas as questões já foram exibidas
        quizCompleted()
    }
}

    //evento de click na opção
function optionClickEvent(e){
    let selectedAnswer = parseInt(e.target.getAttribute('data-op')) //vem como string (e a resposta é um Number)

    if(questions[currentQuestion].answer === selectedAnswer){
        //acertou a questão
        correctAnswers++
    }

    currentQuestion++
    showQuestion()
}

    //mostra o resultado
function quizCompleted(){
    let score = Math.floor((correctAnswers / questions.length) * 100)

    if(score < 30){
        document.querySelector('.scoreText1').innerHTML = 'Continue estudando. Você consegue melhorar!'
        document.querySelector('.scorePct').style.color = '#FF0000'
    }else if(score >= 30 && score < 70){
        document.querySelector('.scoreText1').innerHTML = 'Continue, você está quase lá'
        document.querySelector('.scorePct').style.color = '#E9B71A'
    }else{
        document.querySelector('.scoreText1').innerHTML = 'Parabéns, você está no caminho certo'
        document.querySelector('.scorePct').style.color = '#0D630D'
    }

    document.querySelector('.scorePct').innerHTML = `Você acertou ${score}%`
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}`

    document.querySelector('.scoreArea').style.display = 'block' 
    document.querySelector('.questionArea').style.display = 'none'
    document.querySelector('.progress--bar').style.width = '100%'
}

    //reseta as infos
function resetEvent(){
    correctAnswers = 0
    currentQuestion = 0
    showQuestion()
}