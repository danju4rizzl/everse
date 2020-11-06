import { domStrings } from '../appSettings';
import { formattedMonth, storeContents } from '../utils';
/*
  To handle the current date
 */

export function dateTimeWidget() {
  let date = new Date();
  let dYear = date.getFullYear();
  let d = date.getDate();
  let h = date.getHours(); // 0 - 23
  let m = date.getMinutes(); // 0 - 59
  let s = date.getSeconds(); // 0 - 59
  // let month = new Array();
  // month[0] = 'January';
  // month[1] = 'February';
  // month[2] = 'March';
  // month[3] = 'April';
  // month[4] = 'May';
  // month[5] = 'June';
  // month[6] = 'July';
  // month[7] = 'August';
  // month[8] = 'September';
  // month[9] = 'October';
  // month[10] = 'November';
  // month[11] = 'December';

  // month[date.getMonth()]

  const months = formattedMonth(date.getMonth());
  console.log(typeof months);

  const { currentTime, currentDate, greetings } = domStrings.dateTimeBox;

  let addZeroToElement = (val) => (val < 10 ? `0${val}` : val);

  const greetUsers = () => {
    if (h < 12) {
      return (greetings.textContent = 'Good Morning');
    } else if (h > 12 && h < 18) {
      return (greetings.textContent = 'Good Afternoon');
    } else return (greetings.textContent = 'Good Evening');
  };

  let timeObj = {
    currentTime: `${h}:${addZeroToElement(m)} ${h < 12 ? 'AM' : 'PM'}`,
    currentDate: `${addZeroToElement(d)}-${months}-${dYear}
    `,
  };
  setInterval(() => {
    let updatedTimeValues = storeContents('Current_Time', timeObj);

    currentTime.textContent = updatedTimeValues.currentTime;
    currentDate.textContent = updatedTimeValues.currentDate;
    greetUsers();
  }, 1000);
}
