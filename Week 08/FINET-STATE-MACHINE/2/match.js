function match(string) {
    let FoundA = false, FoundB = false, FoundC = false, FoundD = false, FoundE = false;

    for (const char of string) {
        if (char === "a") {
            FoundA = true;
            FoundB = FoundC = FoundD = FoundE = false;
        } else if (FoundA && char === "b") {
            FoundB = true;
            FoundC = FoundD = FoundE = false;
        } else if (FoundB && char === "c") {
            FoundC = true;
            FoundD = FoundE = false;
        } else if (FoundC && char === "d") {
            FoundD = true;
            FoundE = false;
        } else if (FoundD && char === "e") {
            FoundE = true;
        } else if (FoundE && char === "f") {
            return true;
        } else {
            FoundA = FoundB = FoundC = FoundD = FoundE = false;
        }
    }
    
    return false;
}

console.log(match("testabacdefabcdefd"));