import { domStrings } from '../appSettings';
import { formattedMonth, storeContents } from '../utils';
/*
  To handle the dateTimeWidget
 */

export function dateTimeWidget() {
  let date = new Date();
  let dYear = date.getFullYear();
  let d = date.getDate();
  let h = date.getHours(); // 0 - 23
  let m = date.getMinutes(); // 0 - 59
  let s = date.getSeconds(); // 0 - 59

  const months = formattedMonth(date.getMonth());

  const { currentTime, currentDate, greetings } = domStrings.dateTimeBox;

  let addZeroToElement = (val) => (val < 10 ? `0${val}` : val);

  const greetUsers = () => {
    if (h < 12) {
      return (greetings.textContent = 'Good Morning');
    } else if (h > 12 && h < 18) {
      return (greetings.textContent = 'Good Afternoon');
    } else return (greetings.textContent = 'Good Evening');
  };
  const renderDateTime = () => {
    currentTime.textContent = `${h}:${addZeroToElement(m)} ${
      h < 12 ? 'AM' : 'PM'
    }`;
    currentDate.textContent = `${addZeroToElement(d)}-${months}-${dYear}`;
    greetUsers();
  };

  setInterval(renderDateTime, 1000);
}
