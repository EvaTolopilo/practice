function findFirstNonRepeatingCharacter(str) {
    const charCount = {};
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        charCount[char] = (charCount[char] || 0) + 1;
    }
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (charCount[char] === 1) {
            return char;
        }
    }
    return null;
}

const str1 = "abcabcbb";
const str2 = "banana";
console.log(findFirstNonRepeatingCharacter(str1));
console.log(findFirstNonRepeatingCharacter(str2));
