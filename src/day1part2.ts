const readline = require('readline')
const fs = require('fs')

const INPUT_FILE_PATH_COMMAND_LINE_ARG: string = "INPUT_FILE_PATH"

const TOTAL_OF_SUMMED_NUMBERS: number = 2020
const COUNT_OF_NUMBERS_TO_BE_SUMMED: number = 3

const getInputFilePathFromArgument = function (): string {
    const inputFilePathArg = process.argv.slice(2).find(arg => arg.startsWith(INPUT_FILE_PATH_COMMAND_LINE_ARG + "="))

    return inputFilePathArg!.split("=")[1]
}

const day1part2 = async function (inputFilePath: string): Promise<number | null> {
    
    /**
     * Read the input file line-by-line, so that we can stop reading the file as soon as
     * we find the answer.
     */
    const readInterface = readline.createInterface({
        input: fs.createReadStream(inputFilePath),
        console: false
    });

    const priorNumbers: number[] = []

    const summedNumbers: Record<number, number[]> = {}

    /**
     * Store each number, and store each number summed with each previous number (unless it 
     * exceeds the total of the summed numbers).
     * 
     * If the three numbers equal 2020, return the numbers multiplied together.
     */

    for await (const line of readInterface) {
        const currentNumber: number = parseInt(line)
        console.log("Current number is: " + currentNumber)

        const newSummedNumbersToAdd: Record<number, number[]> = {}

        console.log("Iterating through existing summed numbers..")

        for (const summedNumber in summedNumbers) {
            // If the total already has three component numbers, ignore it
            if (summedNumbers[summedNumber].length === COUNT_OF_NUMBERS_TO_BE_SUMMED) continue

            // Create a new array of sub-numbers with the new one added
            const newSummedNumbers: number[] = [...summedNumbers[summedNumber], currentNumber]
            const totalOfNewSummedNumbers: number = newSummedNumbers.reduce((x, y) => x + y)

            if (newSummedNumbers.length === COUNT_OF_NUMBERS_TO_BE_SUMMED
                    && totalOfNewSummedNumbers === TOTAL_OF_SUMMED_NUMBERS) {
                    console.log("Three numbers found that equal 2020!")
                    console.log(`Three numbers are: ${newSummedNumbers[0]}, ${newSummedNumbers[1]} and ${newSummedNumbers[2]}`)
                    return newSummedNumbers.reduce((x, y) => x * y)
            }
                
            else if (totalOfNewSummedNumbers >= TOTAL_OF_SUMMED_NUMBERS)
                continue
            else
                newSummedNumbersToAdd[totalOfNewSummedNumbers] = newSummedNumbers
        }

        console.log("Adding any new summed numbers..")
        // Adding any new summed numbers
        for (const newSummedNumberToAdd in newSummedNumbersToAdd) {
            summedNumbers[newSummedNumberToAdd] = newSummedNumbersToAdd[newSummedNumberToAdd]
        }

        console.log("Adding this number on its own..")
        // Store the number as its own record
        summedNumbers[currentNumber] = [currentNumber]
    }

    return null
}

export { day1part2 }

day1part2(getInputFilePathFromArgument()).then((value) => console.log(value))
