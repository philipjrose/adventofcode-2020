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

const executeInstructions = function (instructions: string[]): [executedAnInstructionTwice: boolean, accumulator: number] {
    const alreadyExecutedInstructions: number[] = []

    let executedAnInstructionTwice: boolean = false
    let accumulator: number = 0

    for (let i = 0; i < instructions.length;) {

        if (alreadyExecutedInstructions.includes(i)) {
            executedAnInstructionTwice = true
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

    return [executedAnInstructionTwice, accumulator]
}

const day8part1 = function (inputFilePath: string): number {
    const instructions: string[] = fs.readFileSync(inputFilePath).toString().split('\n')

    for (let i = 0; i < instructions.length; i++) {
        const originalInstruction = instructions[i]

        const instructionName = originalInstruction.substring(0, 3)

        console.log(`Iterating through instructions.. current instruction: ${originalInstruction}`)

        if (instructionName === InstructionName.NoOperation || instructionName === InstructionName.Jump) {
            if (instructionName === InstructionName.NoOperation)
                instructions[i] = InstructionName.Jump + originalInstruction.substring(3, originalInstruction.length)
            else if (instructionName === InstructionName.Jump)
                instructions[i] = InstructionName.NoOperation + originalInstruction.substring(3, originalInstruction.length)

            console.log(`Modified instruction: ${instructions[i]}`)

            const [executedAnInstructionTwice, accumulator] = executeInstructions(instructions)

            console.log(`Executed an instruction twice in this run? ${executedAnInstructionTwice}`)
            console.log(`Accumulator: ${accumulator}`)

            if (executedAnInstructionTwice)
                instructions[i] = originalInstruction
            else
                return accumulator
        }
    }

    return 0
}

console.log(day8part1(getValueFromArgument(INPUT_FILE_PATH_COMMAND_LINE_ARG)))


export { day8part1 }