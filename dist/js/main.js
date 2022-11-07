var quiz;

function showResults() {
    // confere as respostas e continua se todas estiverem respondidas
    if (quiz.checkAnswers()) {
        var quizScorePercent = quiz.result.scorePercentFormatted; 
        var quizResultElement = document.getElementById('quiz-result');
        quizResultElement.style.display = 'block';
        document.getElementById('quiz-score').innerHTML = quiz.result.score.toString();
        document.getElementById('quiz-max-score').innerHTML = quiz.result.totalQuestions.toString();
        document.getElementById('quiz-percent').innerHTML = quizScorePercent.toString();

        // muda a cor da div de acordo com a porcentagem
        if (quizScorePercent >= 75) quizResultElement.style.backgroundColor = '#4caf50';
        else if (quizScorePercent >= 50) quizResultElement.style.backgroundColor = '#ffc107';
        else if (quizScorePercent >= 25) quizResultElement.style.backgroundColor = '#ff9800';
        else if (quizScorePercent >= 0) quizResultElement.style.backgroundColor = '#f44336';
        
        // marca as questões que foram marcadas corretas
        quiz.highlightResults(handleAnswers);
    }
}

/** Callback de Quiz.highlightResults. Marca as questões corretas das questões que foram respondidas incorretamente
 * Os parâmetros são: o objeto quiz, o elemento da questão, o número da questão, flag da respondida corretamente
 */
function handleAnswers(quiz, question, no, correct) {
    if (!correct) {
        var answers = question.getElementsByTagName('input');
        for (var i = 0; i < answers.length; i++) {
            if (answers[i].type === "checkbox" || answers[i].type === "radio"){ 
                // Se o elemento atual é parte da resposta correta, o marque
                if (quiz.answers[no].indexOf(answers[i].value) > -1) {
                    answers[i].parentNode.classList.add(Quiz.Classes.CORRECT);
                }
            } else {
                // Se o inpute é qualquer coia que não seja um checkbox ou radio button, mostra a resposta correta proxima ao elemento
                var correctAnswer = document.createElement('span');
                correctAnswer.classList.add(Quiz.Classes.CORRECT);
                correctAnswer.classList.add(Quiz.Classes.TEMP);
                correctAnswer.innerHTML = quiz.answers[no];
                correctAnswer.style.marginLeft = '10px';
                answers[i].parentNode.insertBefore(correctAnswer, answers[i].nextSibling);
            }
        }
    }
}

window.onload = function() {
    quiz = new Quiz('quiz', [
        'L',
        'b',
        'c',
        'a',
        ['b', 'c', 'd']
    ]);
};
