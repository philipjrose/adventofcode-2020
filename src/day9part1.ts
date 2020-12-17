const fs = require('fs')
const readline = require('readline')

const INPUT_FILE_PATH_COMMAND_LINE_ARG: string = "INPUT_FILE_PATH"

const PREAMBLE_LENGTH: number = 25


const getValueFromArgument = function (commandLineArgumentName: string): string {
    const arg = process.argv.slice(2).find(arg => arg.startsWith(commandLineArgumentName + "="))

    return arg!.split("=")[1]
}

const day9part1 = async function (inputFilePath: string): Promise<number> {
    /**
     * Set up to read file line-by-line. Line-by-line is not required, but is not
     * any less efficient for this puzzle, and we already used it in other puzzles.
     */ 
    const readInterface = readline.createInterface({
        input: fs.createReadStream(inputFilePath),
        console: false
    });

    const previousNumbers: number[] = []

    /**
     * For each line:
     * - What is the right index to check, given that we need to simulate the lines
     *   repeating endlessly?
     * - If the character at the index is a tree, count one
     * - Increment the horizontal position
     */
    for await (const line of readInterface) {
        const currentNumber: number = parseInt(line)

        if (previousNumbers.length === PREAMBLE_LENGTH) {
            let sumFound = false

            loopThroughPreviousNumbers: for (let i = 0; i < previousNumbers.length; i++) {
                if (previousNumbers[i] < currentNumber) {
                    for (let j = i + 1; j < previousNumbers.length; j++) {
                        if (previousNumbers[j] !== previousNumbers[i] 
                            && previousNumbers[i] + previousNumbers[j] === currentNumber) {
                                sumFound = true
                                break loopThroughPreviousNumbers
                        }
                    }
                }
            }

            if (!sumFound)
                return currentNumber

            // Get rid of the oldest number, as we only track the last PREAMBLE_LENGTH numbers
            previousNumbers.shift()
        }

        previousNumbers.push(currentNumber)
    }

    return 0
}

day9part1(getValueFromArgument(INPUT_FILE_PATH_COMMAND_LINE_ARG)).then(value => console.log(value))

export { day9part1 }