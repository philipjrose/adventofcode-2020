const readline = require('readline')
const fs = require('fs')

const INPUT_FILE_PATH_COMMAND_LINE_ARG: string = "INPUT_FILE_PATH"

const TREE_CHARACTER: string = "#"
const HORIZONTAL_POSITION_INCREMENT: number = 3

const getInputFilePathFromArgument = function (commandLineArgument: string): string {
    const inputFilePathArg = process.argv.slice(2).find(arg => arg.startsWith(commandLineArgument + "="))

    return inputFilePathArg!.split("=")[1]
}

const day3part1 = async function (inputFilePath: string): Promise<number> {
    
    /**
     * Set up to read file line-by-line. Line-by-line is not required, but is not
     * any less efficient for this puzzle, and we already used it in other puzzles.
     */ 
    const readInterface = readline.createInterface({
        input: fs.createReadStream(inputFilePath),
        console: false
    });
    
    let numberOfTrees: number = 0
    let currentHorizontalPositionInLine: number = 1
    
    /**
     * For each line:
     * - What is the right index to check, given that we need to simulate the lines
     *   repeating endlessly?
     * - If the character at the index is a tree, count one
     * - Increment the horizontal position
     */
    for await (const line of readInterface) {
        const targetIndexInLine: number = ((currentHorizontalPositionInLine - 1) % line.length)

        if (line[targetIndexInLine] === TREE_CHARACTER)
            numberOfTrees++
            
            currentHorizontalPositionInLine += HORIZONTAL_POSITION_INCREMENT
    }

    return numberOfTrees
}

day3part1(getInputFilePathFromArgument(INPUT_FILE_PATH_COMMAND_LINE_ARG)).then(answer => console.log(answer))

export { day3part1 }