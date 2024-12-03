import fs from "node:fs"

const data = fs.readFileSync("02/input.txt", { encoding: "utf8" })
const reports = data
    .split("\n")
    .map((line) => line.split(" ").map((item) => parseInt(item)))

const safeReports = reports.filter((report) => {
    if (isSafe(report)) {
        return true
    }

    for (let i = 0; i < report.length; i++) {
        if (isSafe(report.slice(0, i).concat(report.slice(i + 1)))) {
            return true
        }
    }

    return false
})

console.log(safeReports.length)

function isSafe(report: number[]) {
    const diffs: number[] = []
    for (let i = 1; i < report.length; i++) {
        diffs.push(report[i] - report[i - 1])
    }

    let previousDiff
    for (let i = 0; i < diffs.length; i++) {
        const currentDiff = diffs[i]
        if (previousDiff && currentDiff * previousDiff < 0) {
            return false
        }
        if (currentDiff === 0 || Math.abs(currentDiff) > 3) {
            return false
        }
        previousDiff = currentDiff
    }
    return true
}
