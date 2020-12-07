const fs = require('fs')

const INPUT_FILE_PATH_COMMAND_LINE_ARG: string = "INPUT_FILE_PATH"

const PASSPORT_FIELDS_REGEXP: RegExp = /(([a-z]{3})\:([^\s\n]+)[\s|\n]?)/gm

const PASSPORT_REQUIRED_FIELDS: string[] = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]


const getValueFromArgument = function (commandLineArgumentName: string): string {
    const arg = process.argv.slice(2).find(arg => arg.startsWith(commandLineArgumentName + "="))

    return arg!.split("=")[1]
}

const parsePassportFields = function (rawPassportData: string): { [key: string]: string } {
    const passportFields: { [key: string]: string } = {}

    for (const match of rawPassportData.matchAll(PASSPORT_FIELDS_REGEXP)) {
        passportFields[match[2]] = match[3]
    }

    return passportFields
}

const isPassportValid = function (passportFields: { [key: string]: string }): boolean {
    for (const requiredField of PASSPORT_REQUIRED_FIELDS) {
        if (passportFields[requiredField] === undefined)
            return false
    }
    
    return true
}

const day4part1 = function (inputFilePath: string): number {
    const arrayOfRawPassportData: string[] = fs.readFileSync(inputFilePath).toString().split('\n\n')
    
    return arrayOfRawPassportData
        .map(parsePassportFields)
        .map(isPassportValid)
        .filter(isValid => isValid === true)
        .length
}

console.log(day4part1(getValueFromArgument(INPUT_FILE_PATH_COMMAND_LINE_ARG)))

export { day4part1 }