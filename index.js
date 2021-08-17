const fs = require('fs');

//pegando a data atual
const date = new Date();
const day = String(date.getDate()).padStart(2, '0');
const month = String(date.getMonth()).padStart(2, '0');
const year = date.getFullYear();
const currentDate = day + '_' + month + '_' + year;
const currentDate2 = day + '/' + month + '/' + year;
console.log(currentDate)


//criando as questões 
const questions = [
  "what did you learn today?",
  "What upset me? how to improve it?",
  "What made me happy today?",
  "How many people did I help today?"
]

const ask = ( index = 0 )=>{
  process.stdout.write("\n\n" + questions[index] + " > ")
}

const answers = []

process.stdin.on("data", data => {

  answers.push(data.toString().trim());
  if (answers.length < questions.length){
    ask(answers.length)
  }else{
    process.exit()
  }

})


//toString vai transformar o "data" em string
//o trim vai tirar os possíveis espaços da string

process.on("exit", ()=>{
  console.log(`
  Hi Vini!
  
  Today you learned:
  ${answers[0]}

  What upset you today? and how could you improve it?
  ${answers[1]}

  What made you happy today?
  ${answers[2]}

  You helped ${answers[3]} friends today!!

  See you Tomorrow!! 
  `)

  const writeAnswers = `
  Daily Questions - Vini - ${currentDate2}
  --------------------------------------------

  Today you learned:
  ${answers[0]}

  What upset you today? and how could you improve it?
  ${answers[1]}

  What made you happy today?
  ${answers[2]}

  You helped ${answers[3]} friends today!!

  --------------------------------------------
  FIM DO SEU DIA!!
  `;

  fs.appendFileSync(`dailyReport_${currentDate}.txt`, writeAnswers);

})


ask()


