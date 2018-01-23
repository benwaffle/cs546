const lab1 = require("./lab1")
const assert = require("assert")

/**
 * question 1
 */

assert(lab1.questionOne([]) === 0)
assert(lab1.questionOne([-1, -2, -3]) === 14)
assert(lab1.questionOne([1, 2, 3]) === 14)
assert(lab1.questionOne([5, 3, 10]) === 134)
assert(lab1.questionOne([2, 1, 2]) === 9)
assert(lab1.questionOne([5, 10, 9]) === 206)

console.log(lab1.questionOne([]))
// 0

console.log(lab1.questionOne([1, 2, 3]))
// 14

console.log(lab1.questionOne([5, 3, 10]))
// 134

console.log(lab1.questionOne([2, 1, 2]))
// 9

console.log(lab1.questionOne([5, 10, 9]))
// 206

/**
 * question 2
 */

assert(lab1.questionTwo(0) === 0)
assert(lab1.questionTwo(1) === 1)
assert(lab1.questionTwo(2) === 1)
assert(lab1.questionTwo(3) === 2)
assert(lab1.questionTwo(4) === 3)
assert(lab1.questionTwo(5) === 5)
assert(lab1.questionTwo(6) === 8)
assert(lab1.questionTwo(7) === 13)

console.log(lab1.questionTwo(7))
// 13

/**
 * question 3
 */

assert(lab1.questionThree("") === 0)
assert(lab1.questionThree("Mr. and Mrs. Dursley, of number four, Privet Drive, were  proud  to  say  that  they  were  perfectly  normal,  thank you  very  much. They  were  the  last  people  youd  expect  to  be  involved in anything strange or mysterious, because they just didn't hold with such nonsense. \n Mr. Dursley was the director of a firm called Grunnings, which  made  drills.  He  was  a  big,  beefy  man  with  hardly  any  neck,  although he did have a very large mustache. Mrs. Dursley was thin and blonde and had nearly twice the usual amount of neck, which came in very useful as she spent so much of her time craning over garden fences, spying on the neighbors. The Dursleys had a small son  called  Dudley  and  in  their  opinion  there  was no finer boy anywhere.") === 196)
assert(lab1.questionThree("abcdefghijklmnopqrstuvwxyz") === 5)
assert(lab1.questionThree("ben") === 1)
assert(lab1.questionThree("BEN") === 1)

console.log(lab1.questionThree("Mr. and Mrs. Dursley, of number four, Privet Drive, were  proud  to  say  that  they  were  perfectly  normal,  thank you  very  much. They  were  the  last  people  youd  expect  to  be  involved in anything strange or mysterious, because they just didn't hold with such nonsense. \n Mr. Dursley was the director of a firm called Grunnings, which  made  drills.  He  was  a  big,  beefy  man  with  hardly  any  neck,  although he did have a very large mustache. Mrs. Dursley was thin and blonde and had nearly twice the usual amount of neck, which came in very useful as she spent so much of her time craning over garden fences, spying on the neighbors. The Dursleys had a small son  called  Dudley  and  in  their  opinion  there  was no finer boy anywhere."))
// 196

/**
 * question 4
 */

assert(isNaN(lab1.questionFour(-2)))
assert(lab1.questionFour(0) === 1)
assert(lab1.questionFour(1) === 1)
assert(lab1.questionFour(2) === 2)
assert(lab1.questionFour(3) === 6)
assert(lab1.questionFour(4) === 24)
assert(lab1.questionFour(5) === 120)
assert(lab1.questionFour(10) === 3628800)

console.log(lab1.questionFour(10))
// 3628800