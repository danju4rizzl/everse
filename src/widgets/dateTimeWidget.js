import { domStrings } from '../appSettings';
import { storeContents } from '../utils';
/*
  To handle the current date
 */

export function dateTimeWidget() {
  setInterval(() => {
    let date = new Date();
    let month = date.getMonth();
    let dYear = date.getFullYear();
    let d = date.getDate();
    let h = date.getHours(); // 0 - 23
    let m = date.getMinutes(); // 0 - 59
    let s = date.getSeconds(); // 0 - 59
    const { currentTime, currentDate, greetings } = domStrings.dateTimeBox;

    let addZero = (val) => (val < 10 ? `0${val}` : val);

    let timeObj = {
      currentTime: `${h}:${addZero(m)} ${h < 12 ? 'AM' : 'PM'}`,
      currentDate: `${addZero(month)}-${addZero(d)}-${dYear}
      `,
    };

    const greetUsers = () => {
      if (h < 12) {
        return (greetings.textContent = 'Good Morning');
      } else if (h > 12 && h < 18) {
        return (greetings.textContent = 'Good Afternoon');
      } else return (greetings.textContent = 'Good Evening');
    };
    let updatedTimeValues = storeContents('Current_Time', timeObj);

    currentTime.textContent = updatedTimeValues.currentTime;
    currentDate.textContent = updatedTimeValues.currentDate;
    greetUsers();
  }, 1000);
}
