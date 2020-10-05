import axios from 'axios';
import { appConfig, domStrings } from '../appSettings';
import { dateWidget } from './dateWidget';
import {
  addToLocalStorage,
  getFromLocalStorage,
  storeContents,
} from '../utils';

/*
  To handle the Covid-19 update according to the value (current date) from print_date()
  */

export function covidWidget(usersCountry) {
  const { confirmed, deaths, recovered } = domStrings.covidBox;
  const { covidUrl } = appConfig;

  axios
    .get(covidUrl)
    .then(function (response) {
      const country = usersCountry === 'United States' ? 'US' : usersCountry;

      const covidLocation = response.data[country];
      covidLocation.filter((item) => {
        const { confirmed: confirm, deaths: death, recovered: recover } = item;
        const filteredDay = item.date;

        if (filteredDay === dateWidget()) {
          const covidObj = {
            confirm,
            death,
            recover,
          };
          const covidUpdate = storeContents('Current_covid', covidObj);
          confirmed.textContent = `Cases: ${covidUpdate.confirm}`;
          deaths.textContent = `Death: ${covidUpdate.death}`;
          recovered.textContent = `Recovered: ${covidUpdate.recover} `;
        }
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}
