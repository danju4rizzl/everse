import axios from 'axios';
import ApexCharts from 'apexcharts';
import { appConfig, domStrings } from '../appSettings';
import { dateFormatted } from '../utils';
import {
  addToLocalStorage,
  getFromLocalStorage,
  storeContents,
} from '../utils';

// ? 2) change the covid api to use NOVELCOVID API in postman

/*
  To handle the Covid-19 update according to the value (current date) from print_date()
  */

export function covidWidget(usersCountry) {
  const { confirmed, deaths, recovered } = domStrings.covidBox;
  const { covidUrl } = appConfig;

  axios
    .get(
      `https://corona.lmao.ninja/v2/countries/${usersCountry}?yesterday&strict&query `
    )
    .then(function (response) {
      let {
        country,
        cases,
        deaths,
        recovered,
        critical,
        tests,
      } = response.data;

      renderPieChart(
        [cases, recovered, deaths],
        ['Cases', 'Recovered', 'Deaths']
      );
    })
    .catch(function (error) {
      console.log(error);
    });

  const renderPieChart = (statsValues, statsNames) => {
    let options = {
      series: statsValues,
      // To handle the charts canvas
      chart: {
        type: 'donut',
        width: 300,
        height: 200,
      },
      // To handle the charts responsive behaviour
      responsive: [
        {
          breakpoint: 500,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              show: true,
              position: 'center',
              width: undefined,
              height: undefined,
            },
          },
        },
      ],

      // To handle the charts labels/names in the chart and legend
      labels: statsNames,

      // To style the charts labels ONLY
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '0.8rem',
        },
      },
      // To handle how the charts is being displayed
      plotOptions: {
        pie: {
          size: '45%',
          dataLabels: {
            offset: -5,
          },
        },
      },

      // To handle the charts colors
      theme: {
        mode: 'light',
        palette: 'palette3',
        monochrome: {
          enabled: true,
          // color: '#1e272e',
          color: '#3E7774',
          shadeTo: 'light',
          shadeIntensity: 0.98,
        },
      },

      //  To handle the charts legend
      legend: {
        show: true,
        position: 'bottom',
        labels: {
          colors: '#ffffff',
          useSeriesColors: false,
        },
      },

      // To handle how the charts stroke is being drawn
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
