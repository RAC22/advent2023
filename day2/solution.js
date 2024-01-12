const fs = require("fs");
const input = fs
	.readFileSync("./input.txt", "utf8")
	.split("\n")
	.map((e) => e.replace("\r", ""));

//which games would have been possible if the bag contained only
// 12 red cubes,
// 13 green cubes,
// and 14 blue cubes?
let arrGameIds = [];
let arrOfPowers = [];

for (let game of input) {
	let gameID = parseInt(game.split(":")[0].replace("Game", "").trim());
	console.log(`Game ID: ${gameID} -------------`);
	let games = game.split(":")[1].split(";");
	console.log(`GAMES: ${games}`);
	let highestGreen = 0;
	let highestRed = 0;
	let highestBlue = 0;
	for (let entry of games) {
		let scores = entry.split(",");
		console.log(`------------`);
		for (let score of scores) {
			score.trim();
			let val = parseInt(score.split(" ")[1]);
			let color = score.split(" ")[2];
			console.log(`val = ${val} color = ${color} score:${score}`);
			switch (color) {
				case "green":
					val > highestGreen ? (highestGreen = val) : "";
					break;
				case "blue":
					val > highestBlue ? (highestBlue = val) : "";
					break;
				case "red":
					val > highestRed ? (highestRed = val) : "";
					break;
			}
		}
	}
	console.log(`END`);
	console.log(`green:${highestGreen} blue:${highestBlue} red:${highestRed}`);
	const powerOfCubeSet = highestBlue * highestGreen * highestRed;
	arrOfPowers.push(powerOfCubeSet);
	//possible?
	const lowGreen = 13;
	const lowRed = 12;
	const lowBlue = 14;
	if (
		highestGreen <= lowGreen &&
		highestBlue <= lowBlue &&
		highestRed <= lowRed
	) {
		arrGameIds.push(gameID);
	}
}
//part1 answer
console.log(arrGameIds.reduce((a, b) => a + b, 0));

//part2 answer
console.log(arrOfPowers.reduce((a, b) => a + b, 0));
