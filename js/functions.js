const checkStringLength = (checkString, maxLength) => checkString.length <= maxLength;

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

console.log(checkPhrase('топот'));
console.log(checkPhrase('ДовОд'));
console.log(checkPhrase('Кекс'));
console.log(checkPhrase('Лёша на полке клопа нашёл'));
