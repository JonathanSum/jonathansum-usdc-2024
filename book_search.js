/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */
function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */

    var result = {
        "SearchTerm": searchTerm,
        "Results": []
    };
    //TODO: use the replace function to replace the escape letter
    for (var i = 0; i < scannedTextObj.length; ++i) {
        const scanText = scannedTextObj[i].Content

        for (var j = 0; j < scanText.length; ++j) {
            const line = scanText[j].Text.replace(/[^\w\s\'\-]/g, '')
            const tokens = line.split(/\s+/);


            //check breaking word
            const lastWord = tokens[tokens.length - 1]
            const lastWordSize = tokens[tokens.length - 1].length
            if (j <= scanText.length - 2 &&
                lastWord.substring(lastWordSize - 1) === "-" &&
                lastWord.length > 1) {

                const lineNext = scanText[j + 1].Text.replace(/[^\w\s\'\-]/g, '')
                const tokensNext = lineNext.split(/\s+/);

                const nextFirst = tokensNext[0]
                if (nextFirst.length >= 1) {
                    const concatWord = lastWord.substring(0, lastWordSize - 1) + nextFirst

                    if (concatWord === searchTerm) {
                        result.Results.push({
                            "ISBN": scannedTextObj[i].ISBN,
                            "Page": scanText[j].Page,
                            "Line": scanText[j].Line
                        })
                    }
                }

            }

            // After checking the break word, we can start to search the searchTerm that matches any words in any lines.
            for (var k = 0; k < tokens.length; ++k) {

                if (tokens[k] === searchTerm) {
                    result.Results.push({
                        "ISBN": scannedTextObj[i].ISBN,
                        "Page": scanText[j].Page,
                        "Line": scanText[j].Line
                    })
                }
            }


        }
    }


    return result;
}

/** Example input object. */
const twentyLeaguesIn = [{
    "Title": "Twenty Thousand Leagues Under the Sea",
    "ISBN": "9780000528531",
    "Content": [{
            "Page": 31,
            "Line": 8,
            "Text": "now simply went on by her own momentum.  The dark-"
        },
        {
            "Page": 31,
            "Line": 9,
            "Text": "ness was then profound; and however good the Canadian\'s"
        },
        {
            "Page": 31,
            "Line": 10,
            "Text": "eyes were, I asked myself how he had managed to see, and"
        }
    ]
}]
const twentyLeaguesInS = [{
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [{
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            }
        ]
    },
    {
        "Title": "Apple Company",
        "ISBN": "9780000528555",
        "Content": [{
                "Page": 1,
                "Line": 2,
                "Text": "now simply went on by her own momentum.  The app-"
            },
            {
                "Page": 1,
                "Line": 3,
                "Text": "le was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 1,
                "Line": 4,
                "Text": "eyes were, I asked myself how he had good to see, and"
            }
        ]
    }
]
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [{
        "ISBN": "9780000528531",
        "Page": 31,
        "Line": 9
    }]
}

const darknessOut = {
    "SearchTerm": "darkness",
    "Results": [{
        "ISBN": "9780000528531",
        "Page": 31,
        "Line": 8
    }]
}
const canadianOut = {
    "SearchTerm": "Canadian\'s",
    "Results": [{
        "ISBN": "9780000528531",
        "Page": 31,
        "Line": 9
    }]
}
const appleOut = {
    "SearchTerm": "apple",
    "Results": [{
        "ISBN": "9780000528555",
        "Page": 1,
        "Line": 2
    }]
}
const moreThanOneOut = {
    "SearchTerm": "the",
    "Results": [{
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        },
        {
            "ISBN": "9780000528555",
            "Page": 1,
            "Line": 3
        }
    ]
}
const goodOut = {
    "SearchTerm": "good",
    "Results": [{
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        },
        {
            "ISBN": "9780000528555",
            "Page": 1,
            "Line": 3
        },
        {
            "ISBN": "9780000528555",
            "Page": 1,
            "Line": 4
        },
    ]
}
const upperThe = {
    "SearchTerm": "The",
    "Results": [{
        "ISBN": "9780000528531",
        "Page": 31,
        "Line": 8
    }]
}
/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn);
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

/** We could choose to check that we get the 0 number of results if it is no found. */
const test3result = findSearchTermInBooks(" ", twentyLeaguesIn);
if (test3result.Results.length === 0) {
    console.log("PASS: Test 3");
} else {
    console.log(test3result)
    console.log("FAIL: Test 3");
    console.log("Expected:", 0);
}

//Test result for searching the term darkness
const test4result = findSearchTermInBooks("darkness", twentyLeaguesIn);
if (JSON.stringify(darknessOut) === JSON.stringify(test4result)) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", darknessOut);
    console.log("Received:", test4result);
}

//Test result for searching the term Canadian's
const test5result = findSearchTermInBooks("Canadian's", twentyLeaguesIn);
if (JSON.stringify(canadianOut) === JSON.stringify(test5result)) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", canadianOut);
    console.log("Received:", test5result);
}

//Test result for searching the term apple
const test6result = findSearchTermInBooks("apple", twentyLeaguesInS);
if (JSON.stringify(appleOut) === JSON.stringify(test6result)) {
    console.log("PASS: Test 6");
} else {
    console.log("FAIL: Test 6");
    console.log("Expected:", appleOut);
    console.log("Received:", test6result);
}

//Test result for searching the term the in a document that has two books with the word the
const test7result = findSearchTermInBooks("the", twentyLeaguesInS);
if (JSON.stringify(moreThanOneOut) === JSON.stringify(test7result)) {
    console.log("PASS: Test 7");
} else {
    console.log("FAIL: Test 7");
    console.log("Expected:", moreThanOneOut);
    console.log("Received:", test7result);
}

//Test result for searching the term good
const test8result = findSearchTermInBooks("good", twentyLeaguesInS);
if (JSON.stringify(goodOut) === JSON.stringify(test8result)) {
    console.log("PASS: Test 8");
} else {
    console.log("FAIL: Test 8");
    console.log("Expected:", goodOut);
    console.log("Received:", test8result);
}

//Test result for searching the term upper case of The to test the casing requirements
const test9result = findSearchTermInBooks("The", twentyLeaguesIn);
if (JSON.stringify(upperThe) === JSON.stringify(test9result)) {
    console.log("PASS: Test 9");
} else {
    console.log("FAIL: Test 9");
    console.log("Expected:", upperThe);
    console.log("Received:", test9result);
}
