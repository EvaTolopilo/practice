'use strict';

function countVowels(str) {
    str = str.toLowerCase();
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    let count = 0;
    for (let char of str) {
        if (vowels.includes(char)) {
            count++;
        }
    }
    return count;
}
const str = "JavaScript is awesome!";
const vowelCount = countVowels(str);
console.log(`Количество гласных букв в строке: ${vowelCount}`);