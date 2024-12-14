import fs from "node:fs";

const lines = fs.readFileSync("13/input.txt", { encoding: "utf8" }).split("\n");
const machines: Machine[] = [];

while (lines.length > 0) {
    const machineLines = lines.splice(0, 4);
    machineLines.splice(3);

    const machine: Machine = {
        a: parseLine(machineLines[0]),
        b: parseLine(machineLines[1]),
        prize: parseLine(machineLines[2]),
    };

    machines.push(machine);
}

const result = machines.reduce((total, machine) => {
    const rounds = 100;
    let cost = 0;

    for (let i = rounds; i > 0; i--) {
        for (let j = 0; j < rounds; j++) {
            const x = j * machine.a.x + i * machine.b.x;
            const y = j * machine.a.y + i * machine.b.y;

            if (x === machine.prize.x && y === machine.prize.y) {
                cost = j * 3 + i;
            }
        }
    }

    return total + cost;
}, 0);

console.log(result);

function parseLine(line: string) {
    return {
        x: Number(line.substring(line.indexOf("X") + 1, line.indexOf(",")).replace("=", "")),
        y: Number(
            line
                .substring(line.indexOf("Y") + 1)
                .replace("=", "")
                .trim()
        ),
    };
}

type Machine = {
    a: {
        x: number;
        y: number;
    };
    b: {
        x: number;
        y: number;
    };
    prize: {
        x: number;
        y: number;
    };
};
