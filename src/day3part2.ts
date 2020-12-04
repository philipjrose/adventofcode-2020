const readline = require('readline')
const fs = require('fs')

const INPUT_FILE_PATH_COMMAND_LINE_ARG: string = "INPUT_FILE_PATH"

const TREE_CHARACTER: string = "#"

const getValueFromArgument = function (commandLineArgumentName: string): string {
    const arg = process.argv.slice(2).find(arg => arg.startsWith(commandLineArgumentName + "="))

    return arg!.split("=")[1]
}

const countTrees = function (linesOfFile: string[], horizontalPositionIncrement: number, verticalPositionIncrement: number): number {
    let numberOfTrees: number = 0
    let currentHorizontalPosition: number = 1
    let currentVerticalPosition: number = 1

    /**
     * First, check whether we should check for a tree on this line, or skip over it.
     * 
     * For each line we should check:
     * - What is the right index to check, given that we need to simulate the lines
     *   repeating endlessly?
     * - If the character at the index is a tree, count one
     * - Increment the horizontal position
     */
    for (const line of linesOfFile) {

        if ((currentVerticalPosition - 1) % verticalPositionIncrement === 0) {

            const targetIndexInLine: number = ((currentHorizontalPosition - 1) % line.length)

            if (line[targetIndexInLine] === TREE_CHARACTER) {
                numberOfTrees++
            }

            currentHorizontalPosition += horizontalPositionIncrement
        }
        
        currentVerticalPosition++
    }

    return numberOfTrees
}

const day3part2 = function (inputFilePath: string): number {
    const arrayOfLines: string[] = fs.readFileSync(inputFilePath).toString().split('\n')
    
    const results: number[] = [
        countTrees(arrayOfLines, 1, 1),
        countTrees(arrayOfLines, 3, 1),
        countTrees(arrayOfLines, 5, 1),
        countTrees(arrayOfLines, 7, 1),
        countTrees(arrayOfLines, 1, 2)
    ]

    return results.reduce((x, y) => x * y)
}

console.log(day3part2(getValueFromArgument(INPUT_FILE_PATH_COMMAND_LINE_ARG)))

export { day3part2 }