const fs = require("fs");
const test = true;
let testOrNot = test ? "./testinput.txt" : "./input.txt";
const input = fs
	.readFileSync(`${testOrNot}`, "utf8")
	.split("\n")
	.map((e) => e.replace("\r", ""));

const symbolsList = [
	"!",
	"@",
	"#",
	"$",
	"%",
	"^",
	"&",
	"*",
	"-",
	"=",
	"+",
	"/",
];
let symbolCoords = [];
//find coordinates of all symbols
for (let i = 0; i < input.length; i++) {
	const line = input[i];
	const row = i;
	for (let ii = 0; ii < line.length; ii++) {
		const character = line[ii];
		const column = ii;
		const isSymbol =
			symbolsList.filter((e) => character.includes(e)).length > 0
				? true
				: false;
		if (isSymbol) {
			symbolCoords.push([row, column]);
		}
	}
}
//find all numbers and their coordinates
let numsWithCoords = [];
for (let i = 0; i < input.length; i++) {
	const line = input[i];
	const row = i;
	for (let ii = 0; ii < line.length; ii++) {
		const character = line[ii];
		if (isNaN(character)) {
			continue;
		}
		const firstIndex = ii;
		let fullNumber = "";
		while (!isNaN(line[ii])) {
			fullNumber += line[ii];
			ii++;
		}
		const lastIndex = ii - 1;
		numsWithCoords.push({
			number: fullNumber,
			startIndex: firstIndex,
			endIndex: lastIndex,
			row: i,
		});
	}
}
// go through all numbers, and check if theres an ajacent symbol
let validNums = [];
for (const num of numsWithCoords) {
	const validSymbolColumnStart = num.startIndex - 1;
	const validSymbolColumnEnd = num.endIndex + 1;
	const validSymbolRowStart = num.row - 1;
	const validSymbolRowEnd = num.row + 1;
	//check for symbols in valid rows
	let rowValidated = symbolCoords.filter((e) => {
		let symbolRow = e[0];
		return validSymbolRowStart <= symbolRow && validSymbolRowEnd >= symbolRow;
	});
	if (rowValidated.length <= 0) {
		continue;
	}
	let columnValidated = rowValidated.filter((e) => {
		let symbolColumn = e[1];
		return (
			validSymbolColumnStart <= symbolColumn &&
			validSymbolColumnEnd >= symbolColumn
		);
	});
	if (columnValidated.length <= 0) {
		continue;
	}
	validNums.push(parseInt(num.number));
}
//part one output
console.log(validNums.reduce((a, b) => a + b, 0));
