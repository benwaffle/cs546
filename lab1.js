function questionOne(arr) {
    return arr.map(x => x*x).reduce((x,y) => x+y, 0)
}

function questionTwo(num) { 
    if (num < 1) return 0
    if (num == 1) return 1
    return questionTwo(num-1) + questionTwo(num-2)
}

function questionThree(text) {
    return text.toLowerCase().split('').filter(c => 'aeiou'.indexOf(c) !== -1).length
}

function questionFour(num) {
    if (num < 0) return NaN
    if (num == 0) return 1 
    return num * questionFour(num - 1)
}

module.exports = {
    firstName: "Benjamin", 
    lastName: "Iofel", 
    studentId: "10409085",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
}