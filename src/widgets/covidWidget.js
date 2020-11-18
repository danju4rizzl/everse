import axios from 'axios';
import ApexCharts from 'apexcharts';
import { appConfig, domStrings } from '../appSettings';
import { dateFormatted } from '../utils';
import {
  addToLocalStorage,
  getFromLocalStorage,
  storeContents,
} from '../utils';

// ? 1)  use https://apexcharts.com/javascript-chart-demos/pie-charts/simple-donut/ to render the charts

// ? 2) change the covid api to use NOVELCOVID API in postman

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

        if (filteredDay === dateFormatted()) {
          const covidObj = {
            confirm,
            death,
            recover,
          };
          const covidUpdate = storeContents('Current_covid', covidObj);

          /**
           * To prints out the covid info for covidWidget 
            confirmed.textContent = `Cases: ${covidUpdate.confirm}`;
            deaths.textContent = `Death: ${covidUpdate.death}`;
            recovered.textContent = `Recovered: ${covidUpdate.recover} `;
          */

          renderPieChart(
            [covidUpdate.confirm, covidUpdate.recover, covidUpdate.death],
            ['Confirmed', 'Recovered', 'Deaths'],
            ['#636e72', '#2d3436', '#ff5252']
          );
        }
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  const renderPieChart = (statsValues, statsNames, statsColors) => {
    let options = {
      series: statsValues,
      chart: {
        type: 'donut',
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
      labels: statsNames,
      //colors can be styled using hex code only
      colors: statsColors,

      legend: {
        color: '#ffffff',
      },
      stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'butt',
        colors: undefined,
        width: 2,
        dashArray: 0,
      },
    };

    let chart = new ApexCharts(document.querySelector('#chart'), options);

    chart.render();
  };
}
