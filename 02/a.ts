import fs from "node:fs";

const data = fs.readFileSync("02/input.txt", { encoding: "utf8" });

const reports = data.split("\n").map((line) => line.split(" ").map((item) => parseInt(item)));

let safeReports = 0;
reports.forEach((report) => {
    const sorted = [...report].sort((a, b) => a - b);
    const isSorted = report.every((item, index) => item === sorted[index]);

    const reversed = [...sorted].reverse();
    const isReversed = report.every((item, index) => item === reversed[index]);

    if (isSorted || isReversed) {
        let isSafe = true;
        for (let i = 0; i < report.length - 1; i++) {
            const diff = Math.abs(report[i] - report[i + 1]);
            if (diff === 0 || diff > 3) {
                isSafe = false;
            }
        }
        if (isSafe) {
            safeReports += 1;
        }
    }
});

console.log(safeReports);
