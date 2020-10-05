import { domStrings } from '../appSettings';
import { storeContents } from '../utils';
/*
  To handle the current date
 */

export function dateWidget() {
  let date = new Date();
  let month = date.getMonth();
  let dYear = date.getFullYear();
  let d = date.getDate();
  let h = date.getHours(); // 0 - 23
  let m = date.getMinutes(); // 0 - 59
  let s = date.getSeconds(); // 0 - 59
  const { currentTime, currentDate } = domStrings.timeBox;

  let addZero = (val) => (val < 10 ? `0${val}` : val);

  let time = `${dYear}-${month}-${d}`;

  let timeObj = {
    currentTime: `${h}:${addZero(m)} ${h < 12 ? 'AM' : 'PM'}`,
    currentDate: `${addZero(month)}-${addZero(d)}-${dYear}`,
  };

  let updatedTimeValues = storeContents('Current_Time', timeObj);
  // console.log(updatedTimeValues);
  currentTime.textContent = updatedTimeValues.currentTime;
  currentDate.textContent = updatedTimeValues.currentDate;

  return time;
}
