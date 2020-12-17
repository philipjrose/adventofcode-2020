const fs = require('fs')

const INPUT_FILE_PATH_COMMAND_LINE_ARG: string = "INPUT_FILE_PATH"

enum InstructionName {
    NoOperation = 'nop',
    ModifyAccumulator = 'acc',
    Jump = 'jmp'
}

enum Modifier {
    Plus = '+',
    Minus = '-'
}

const getValueFromArgument = function (commandLineArgumentName: string): string {
    const arg = process.argv.slice(2).find(arg => arg.startsWith(commandLineArgumentName + "="))

    return arg!.split("=")[1]
}

const day8part1 = function (inputFilePath: string): number {
    const instructions: string[] = fs.readFileSync(inputFilePath).toString().split('\n')

    const alreadyExecutedInstructions: number[] = []
    let accumulator: number = 0

    for (let i = 0; i < instructions.length;) {

        if (alreadyExecutedInstructions.includes(i)) {
            break;
        }
        
        alreadyExecutedInstructions.push(i)

        const instruction = instructions[i]
        const instructionName = instruction.substring(0, 3)
        
        switch (instructionName) {
            case InstructionName.NoOperation:
                i++

                break

            case InstructionName.ModifyAccumulator:
                const accumulatorModifier = instruction.substring(4, 5)
                const accumulatorModifiedAmount = parseInt(instruction.substring(5, instruction.length))

                if (accumulatorModifier === Modifier.Plus) {
                    accumulator += accumulatorModifiedAmount
                } else {
                    accumulator -= accumulatorModifiedAmount
                }

                i++

                break

            case InstructionName.Jump:
                const indexModifier = instruction.substring(4, 5)
                const indexModifiedAmount = parseInt(instruction.substring(5, instruction.length))

                if (indexModifier === Modifier.Plus) {
                    i += indexModifiedAmount
                } else {
                    i -= indexModifiedAmount
                }

                break
        }
    }

    return accumulator
}

console.log(day8part1(getValueFromArgument(INPUT_FILE_PATH_COMMAND_LINE_ARG)))


export { day8part1 }