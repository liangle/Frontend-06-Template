function match(string) {
    for (const char of string) {
        if (char === "a")
            return true;
    }
    
    return false;
}