const readline = require('readline')
const fs = require('fs')

const INPUT_FILE_PATH_COMMAND_LINE_ARG: string = "INPUT_FILE_PATH"

const LINE_FORMAT: RegExp = /^([0-9]+)\-([0-9]+) ([a-z]{1})\: ([a-z]+)$/

const getInputFilePathFromArgument = function (commandLineArgument: string): string {
    const inputFilePathArg = process.argv.slice(2).find(arg => arg.startsWith(commandLineArgument + "="))

    return inputFilePathArg!.split("=")[1]
}

const day2part2 = async function (inputFilePath: string): Promise<number> {
    
    /**
     * Set up to read file line-by-line. Line-by-line is not required, but is not
     * any less efficient for this puzzle, and we already used it in other puzzles.
     */ 
    const readInterface = readline.createInterface({
        input: fs.createReadStream(inputFilePath),
        console: false
    });
    
    let numberOfValidPasswords: number = 0
    
    /**
     * For each line:
     * - What is the first position the character can appear in?
     * - What is the second position the character can appear in?
     */
    for await (const line of readInterface) {
        

        const [, firstPosition, secondPosition, characterRequired, password] = line.match(LINE_FORMAT)

        const firstPositionContainsCharacter: boolean = password[parseInt(firstPosition) - 1] === characterRequired
        const secondPositionContainsCharacter: boolean = password[parseInt(secondPosition) - 1] === characterRequired

        if ((firstPositionContainsCharacter && !secondPositionContainsCharacter)
            || (!firstPositionContainsCharacter && secondPositionContainsCharacter))
            numberOfValidPasswords++
    }

    return numberOfValidPasswords
}

day2part2(getInputFilePathFromArgument(INPUT_FILE_PATH_COMMAND_LINE_ARG)).then(answer => console.log(answer))

export { day2part2 }