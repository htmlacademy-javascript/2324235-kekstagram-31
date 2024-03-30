const checkStringLength = (checkString = '', maxLength = 1) => checkString.length <= maxLength;

checkStringLength('проверяемая строка', 20);
checkStringLength('проверяемая строка', 18);
checkStringLength('проверяемая строка', 10);


const checkPhrase = (palindromeString) => {
  palindromeString = palindromeString.replaceAll(' ', '').toLowerCase();

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

sortsString('kek');


// 5.16. Функции возвращаются

const convertTimeToNumber = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const isMeetingInWorkTime = (workStart, workEnd, meetingStart, meetingMinutes) => {

  workStart = convertTimeToNumber(workStart);
  workEnd = convertTimeToNumber(workEnd);
  meetingStart = convertTimeToNumber(meetingStart);

  return meetingStart + meetingMinutes <= workEnd && meetingStart >= workStart;
};

isMeetingInWorkTime('08:00', '17:30', '14:00', 90);
isMeetingInWorkTime('8:0', '10:0', '8:0', 120);
isMeetingInWorkTime('08:00', '14:30', '14:00', 90);
isMeetingInWorkTime('14:00', '17:30', '08:0', 90);
isMeetingInWorkTime('8:00', '17:30', '08:00', 900);
