import fs from "node:fs";

type Calculation = {
    result: number;
    values: number[];
    permutations: Permutation[];
};

type Permutation = (string | number)[];

const calculations: Calculation[] = fs
    .readFileSync("07/input.txt", { encoding: "utf8" })
    .split("\n")
    .map((line) => {
        const result = line.split(":");
        const values = result[1].trim().split(" ").map(Number);
        return { result: parseInt(result[0]), values, permutations: [] };
    });

const total = 0;
const result = calculations
    .map((calculation) => {
        calculation.permutations = getPermutations(calculation.values);
        return calculation;
    })
    .filter((calculation) =>
        calculation.permutations.find((permutation) => calculation.result === calculate(permutation))
    )
    .reduce((accumulator, calculation) => accumulator + calculation.result, 0);

console.log(result);

function calculate(permutation: Permutation) {
    let result = 0;
    let operator = "+";
    permutation.forEach((element, index) => {
        if (index === 0) {
            result = Number(element);
            return;
        }
        if (index % 2 == 0) {
            result = eval(`${result} ${operator} ${element}`);
        } else {
            operator = String(element);
        }
    });
    return result;
}

function getPermutations(operands: number[]) {
    const operators = ["*", "+"];
    const results: Permutation[] = [];
    const numOperators = operands.length - 1; // Number of operators needed is one less than the number of operands

    function buildPermutation(currentCombination: Permutation, index: number) {
        if (index === numOperators) {
            // If all operators are placed, save the current combination
            results.push([...currentCombination]);
            return;
        }

        // Add each operator at the current position and recurse
        for (let op of operators) {
            currentCombination.push(op, operands[index + 1]); // Add operator and next operand
            buildPermutation(currentCombination, index + 1); // Recurse
            currentCombination.pop(); // Remove last operator
            currentCombination.pop(); // Remove last operand
        }
    }

    // Start with the first operand
    buildPermutation([operands[0]], 0);

    return results;
}
