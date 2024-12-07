import fs from "node:fs";

const lines = fs.readFileSync("05/input.txt", { encoding: "utf8" }).split("\n");

type Rule = {
    left: number;
    right: number;
};
const rules: Rule[] = [];
const updates = [];

for (const line of lines) {
    if (line.indexOf("|") >= 0) {
        const split = line.split("|");
        rules.push({ left: parseInt(split[0]), right: parseInt(split[1]) });
    }
    if (line.indexOf(",") >= 0) {
        updates.push(line.split(",").map(Number));
    }
}

let counter = 0;
for (const update of updates) {
    if (validateUpdateAgainstRules(update, rules)) {
        const index = Math.round((update.length - 1) / 2);
        counter = counter + update[index];
    }
}

console.log(counter);

function validateUpdateAgainstRules(update: number[], rules: Rule[]) {
    let isValid = true;
    for (const rule of rules) {
        const leftRulePos = update.indexOf(rule.left);
        const rightRulePos = update.indexOf(rule.right);
        if ((leftRulePos >= 0 && rightRulePos === -1) || (leftRulePos === -1 && rightRulePos >= 0)) {
            continue;
        }
        if (leftRulePos <= rightRulePos) {
            continue;
        }
        isValid = false;
    }
    return isValid;
}
