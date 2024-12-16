import fs from "node:fs";

const lines = fs.readFileSync("13/input.txt", { encoding: "utf8" }).split("\n");
const machines: Machine[] = [];

while (lines.length > 0) {
    const machineLines = lines.splice(0, 4);
    machineLines.splice(3);

    const prize = parseLine(machineLines[2]);
    const machine: Machine = {
        a: parseLine(machineLines[0]),
        b: parseLine(machineLines[1]),
        prize: { x: prize.x + 10000000000000, y: prize.y + 10000000000000 },
    };

    machines.push(machine);
}

const result = machines.reduce((total, machine) => {
    let cost = 0;

    //I don't know linear algebra (anymore), so I copied a formula from the interwebs.
    const det = machine.a.x * machine.b.y - machine.b.x * machine.a.y;
    const a = (machine.prize.x * machine.b.y - machine.prize.y * machine.b.x) / det;
    const b = (machine.prize.y * machine.a.x - machine.prize.x * machine.a.y) / det;

    if (Number.isInteger(a) && Number.isInteger(b)) {
        cost = a * 3 + b;
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
