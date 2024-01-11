const fs = require("fs");
const input = fs
	.readFileSync("./input.txt", "utf8")
	.split("\n")
	.map((e) => e.replace("\r", ""));

let numsArray = [];
let numsArrayPartTwo = [];

const wordMap = {
	one: "1",
	two: "2",
	three: "3",
	four: "4",
	five: "5",
	six: "6",
	seven: "7",
	eight: "8",
	nine: "9",
};
const validList = [
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
	"nine",
];
// part 1
function findCalVal(string) {
	let arr = string.split("");
	let nums = arr.filter((e) => !isNaN(e));
	const first = nums[0];
	const last = nums[nums.length - 1];
	return parseInt(first + last);
}
for (let string of input) {
	numsArray.push(findCalVal(string));
}
console.log(numsArray.reduce((a, b) => a + b, 0));
// end part 1

function findVal(string) {
	//start from front, find first match or number
	let firstNum = 0;
	for (let i = 0; i <= string.length; i++) {
		let substring = string.slice(0, i);
		let included = validList.filter((e) => substring.includes(e));
		if (included.length) {
			if (isNaN(included[0])) {
				included[0] = wordMap[included[0]];
			}
			firstNum = included[0];
			break;
		}
	}
	//start from back, find first match or number
	let secondNum = 0;
	for (let i = 1; i <= string.length; i++) {
		let substring = string.slice(-i);
		let included = validList.filter((e) => substring.includes(e));
		if (included.length) {
			if (isNaN(included[0])) {
				included[0] = wordMap[included[0]];
			}
			secondNum = included[0];
			break;
		}
	}
	return firstNum + secondNum;
}
for (let string of input) {
	numsArrayPartTwo.push(parseInt(findVal(string)));
}
console.log(numsArrayPartTwo.reduce((a, b) => a + b, 0));
