const readline = require('readline')
const fs = require('fs')

const INPUT_FILE_PATH_COMMAND_LINE_ARG: string = "INPUT_FILE_PATH"

const LINE_FORMAT: RegExp = /^([0-9]+)\-([0-9]+) ([a-z]{1})\: ([a-z]+)$/

const getInputFilePathFromArgument = function (commandLineArgument: string): string {
    const inputFilePathArg = process.argv.slice(2).find(arg => arg.startsWith(commandLineArgument + "="))

    return inputFilePathArg!.split("=")[1]
}

const day2part1 = async function (inputFilePath: string): Promise<number> {
    
    /**
     * Set up to read file line-by-line. Line-by-line is not required, but is not
     * any less efficient for this puzzle, and we already used it in other puzzles.
     */ 
    const readInterface = readline.createInterface({
        input: fs.createReadStream(inputFilePath),
        console: false
    });
    
    let numberOfValidPasswords: number = 0

    for await (const line of readInterface) {
        /**
         * For each line:
         * - What is the minimum and maximum of which character allowed in the password?
         * - Does the password match?
         */

        const [, minimumCharacters, maximumCharacters, characterRequired, password] = line.match(LINE_FORMAT)

        const numberOfCharacterMatches: number = (password.match(new RegExp(characterRequired, "g")) || []).length

        if (numberOfCharacterMatches >= parseInt(minimumCharacters) 
            && numberOfCharacterMatches <= parseInt(maximumCharacters))
            numberOfValidPasswords++
    }

    return numberOfValidPasswords
}

day2part1(getInputFilePathFromArgument(INPUT_FILE_PATH_COMMAND_LINE_ARG)).then(answer => console.log(answer))

export { day2part1 }