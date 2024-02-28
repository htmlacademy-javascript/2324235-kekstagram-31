const checkStringLength = (checkString = '', maxLength = 1) => checkString.length <= maxLength;

checkStringLength('проверяемая строка', 20);
checkStringLength('проверяемая строка', 18);
checkStringLength('проверяемая строка', 10);


console.log(checkStringLength('проверяемая строка', 20));
console.log(checkStringLength('проверяемая строка', 18));
console.log(checkStringLength('проверяемая строка', 10));


const checkPhrase = (palindromeString) => {
  palindromeString = palindromeString.replaceAll(' ' , '').toLowerCase();

  let checkPalindrome = '';

  for (let i = palindromeString.length - 1; i >= 0; i--) {
    checkPalindrome += palindromeString[i];
  }

  return palindromeString === checkPalindrome;
};


checkPhrase('топот');
checkPhrase('ДовОд');
checkPhrase('Кекс');
checkPhrase('Лёша на полке клопа нашёл');
  
console.log(checkPhrase('топот'));
console.log(checkPhrase('ДовОд'));
console.log(checkPhrase('Кекс'));
console.log(checkPhrase('Лёша на полке клопа нашёл'));

const sortsString = (checkSortsString) => {
  let result = '';

  checkSortsString = checkSortsString.toString();

  for (let i = 0; i <= checkSortsString.length - 1; i++) {
    if (Number.isNaN(parseInt(checkSortsString[i], 10)) === false) {
      result += checkSortsString[i];
    }
  }

  return result === '' ? NaN : Number(result);
};

console.log(sortsString('2023 год'));
console.log(sortsString('1 кефир, 0.5 батона'));
console.log(sortsString('ECMAScript 2022'));
console.log(sortsString('агент 007'));
console.log(sortsString('а я томат'));

console.log(sortsString(2023));
console.log(sortsString(-1));
console.log(sortsString(1.5));