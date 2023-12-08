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
    for(var i = 0; i<scannedTextObj.length; ++i){
        const scanText = scannedTextObj[i].Content
        
        for(var j = 0; j < scanText.length; ++j){
            const line = scanText[j].Text.replace(/[^\w\s\'\-]/g, '')
            const tokens = line.split(/\s+/);
            // console.log("debug started "+j)
            console.log(tokens)
            // console.log("debug ended "+j)

            //check breaking word
            const lastWord = tokens[tokens.length-1]
            const lastWordSize = tokens[tokens.length-1].length
            if(j <= scanText.length -2&&
               lastWord.substring(lastWordSize-1) ==="-" &&
               lastWord.length>1){
                console.log("debug: " + lastWord)
                const lineNext = scanText[j+1].Text.replace(/[^\w\s\'\-]/g, '')
                const tokensNext = lineNext.split(/\s+/);
                
                const  nextFirst = tokensNext[0]

                const concatWord = lastWord.substring(0,lastWordSize-1) + nextFirst
                console.log("debug: " + concatWord)
                if(concatWord === searchTerm){
                    result.Results.push({
                        "ISBN": scannedTextObj[i].ISBN,
                        "Page": scanText[j].Page,
                        "Line": scanText[j].Line
                    })           
                }  
            }

            
            for (var k = 0; k < tokens.length; ++k){

                if(tokens[k] === searchTerm){
                    console.log("I am here.")
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
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
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
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
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
const test1result = findSearchTermInBooks("darkness", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

// /** We could choose to check that we get the right number of results. */
// const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
// if (test2result.Results.length == 1) {
//     console.log("PASS: Test 2");
// } else {
//     console.log("FAIL: Test 2");
//     console.log("Expected:", twentyLeaguesOut.Results.length);
//     console.log("Received:", test2result.Results.length);
// }

// /** We could choose to check that we get the 0 number of results if it is no found. */
// const test3result = findSearchTermInBooks(" ", twentyLeaguesIn);
// if (test3result.Results.length === 0) {
//     console.log("PASS: Test 3");
// } else {
//     console.log(test3result)
//     console.log("FAIL: Test 3");
//     console.log("Expected:", 0);
// }

