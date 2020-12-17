const fs = require('fs')

const INPUT_FILE_PATH_COMMAND_LINE_ARG: string = "INPUT_FILE_PATH"

const BAG_RULE_PARENT_REGEXP: RegExp = /^([a-z\s]+)\sbags\scontain\s((?:[0-9]\s(?:[a-z\s]+)\sbags?(?:,\s)?)+|no\sother\sbags)\.$/
const BAG_RULE_GET_CHILDREN_REGEXP: RegExp = /([0-9])\s([a-z\s]+)\sbags?/g
const NO_CHILDREN: string = 'no other bags'

const INPUT_BAG_COLOUR: string = 'shiny gold'

interface BagRule {
    parentColour: string
    childColours: { [colour: string]: number }
}

const getValueFromArgument = function (commandLineArgumentName: string): string {
    const arg = process.argv.slice(2).find(arg => arg.startsWith(commandLineArgumentName + "="))

    return arg!.split("=")[1]
}

const parseBagRule = function(rawBagRule: string): BagRule {
    const [, parentColour, rawChildColours] = rawBagRule.match(BAG_RULE_PARENT_REGEXP) || []

    const childColours: {[colour: string]: number } = {}

    if (rawChildColours !== NO_CHILDREN) {
        for (const match of rawChildColours.matchAll(BAG_RULE_GET_CHILDREN_REGEXP)) {
            childColours[match[2]] = parseInt(match[1])
        }
    }

    return { parentColour: parentColour, childColours: childColours }
}

const getNumberOfBagsContained = function (containingBagColour: string, bagRules: BagRule[]): number {
    const rule = bagRules.find(rule => rule.parentColour === containingBagColour)!
    console.log(`Current bag colour: ${containingBagColour}, child colours: ${Object.entries(rule.childColours)}`)

    var x = Object.entries(rule.childColours).map(([colour, count]) => {
        console.log(`Looking at child colour ${colour}, has a count of ${count}`)
        console.log(`Going to add the count ${count} as well as the children's count`)
        return count + (count * getNumberOfBagsContained(colour, bagRules))
    })

    return x.length > 0 ? x.reduce((a,b) => a+b) : 0
}

const day7part2 = function (inputFilePath: string): number {
    const bagRules: BagRule[] = fs.readFileSync(inputFilePath).toString()
        .split('\n')
        .map(parseBagRule)

    return getNumberOfBagsContained(INPUT_BAG_COLOUR, bagRules)
}

console.log(day7part2(getValueFromArgument(INPUT_FILE_PATH_COMMAND_LINE_ARG)))


export { day7part2 }