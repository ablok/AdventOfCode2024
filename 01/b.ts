import fs from "node:fs";

const data = fs.readFileSync("01/input.txt", { encoding: "utf8" });
var leftNrs: number[] = [];
var rightNrs: number[] = [];

data.split("\n")
    .map((line) => line.split("   "))
    .forEach((value) => {
        leftNrs.push(parseInt(value[0]));
        rightNrs.push(parseInt(value[1]));
    });

var total = 0;

leftNrs.forEach((leftNr) =>
    rightNrs.forEach((rightNr) => {
        if (rightNr === leftNr) {
            total = total + leftNr;
        }
    })
);

console.log(total);
