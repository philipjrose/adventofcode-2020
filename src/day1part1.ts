import { rawListeners } from "process";

const readline = require('readline')
const fs = require('fs')

const INPUT_FILE_PATH_COMMAND_LINE_ARG: string = "INPUT_FILE_PATH"

const TOTAL_OF_SUMMED_NUMBERS: number = 2020

const getInputFilePathFromArgument = function (): string {
    const inputFilePathArg = process.argv.slice(2).find(arg => arg.startsWith(INPUT_FILE_PATH_COMMAND_LINE_ARG + "="))

    return inputFilePathArg!.split("=")[1]
}

const day1part1 = async function (inputFilePath: string): Promise<number | null> {
    
    /**
     * Read the input file line-by-line, so that we can stop reading the file as soon as
     * we find the answer.
     */
    const readInterface = readline.createInterface({
        input: fs.createReadStream(inputFilePath),
        console: false
    });

    /**
     * Store the _deltas_ between the total number (2020) and each number in turn, so that 
     * we can then compare later numbers to the deltas. If one matches then that's the answer,
     * and we only need one of the numbers to get the other.
     */  
    const deltasWithTotalOfSummedNumbers: number[] = []

    for await (const line of readInterface) {
        const currentNumber: number = parseInt(line)
        const deltaWithTotalOfSummedNumbers: number = (TOTAL_OF_SUMMED_NUMBERS - currentNumber)

        if (deltasWithTotalOfSummedNumbers.includes(currentNumber)) {
            return (currentNumber * deltaWithTotalOfSummedNumbers)
        } else {
            deltasWithTotalOfSummedNumbers.push(deltaWithTotalOfSummedNumbers)
        }
    }

    return null
}

day1part1(getInputFilePathFromArgument()).then(answer => console.log(answer))
