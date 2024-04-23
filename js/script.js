const loadData = async (file) => {
  const response = await fetch(file);
  const text = await response.text();
  const rows = text.split(/\n/ig);

  const dataset = [];

  for (let i = 0; i < rows.length; i += 2) {
    const [time, value] = rows[i].split(',');
    if (i != 0) {
      dataset.push([
        new Date(time).getTime(),
        Number(value)
      ])
    }
  }

  return dataset;
}

const showChart = async () => {
  const humidity = await loadData("ESP32_CAM-humidity.csv");
  const temperature = await loadData("ESP32_CAM-temperature.csv");

  Highcharts.chart('container', {
    chart: {
      type: 'line',
      zoomType: 'xy'
    },
    credits: { enabled: false },
    title: { text: 'Temperatura e Umidade do Ar' },
    xAxis: {
      lineColor: "rgb(204, 214, 235)",
      tickColor: 'rgb(204, 214, 235)',
      type: 'datetime',
      labels: {
        style: {
          fontFamily: "Lucida Grande, Lucida Sans Unicode, Arial, Helvetica, sans-serif",
          color: "rgb(127, 140, 141)",
          fontSize: 10
        }
      }
    },
    yAxis: [
      {
        title: { text: "Temperatura (C°)" },
        labels: {
          format: '{value:.3f}',
          style: {
            fontFamily: "Lucida Grande, Lucida Sans Unicode, Arial, Helvetica, sans-serif",
            color: "rgb(127, 140, 141)",
            fontSize: 10
          }
        }
      },
      {
        title: { text: "Umidade (%)" },
        opposite: true,
        labels: {
          format: '{value:.3f}',
          style: {
            fontFamily: "Lucida Grande, Lucida Sans Unicode, Arial, Helvetica, sans-serif",
            color: "rgb(127, 140, 141)",
            fontSize: 10
          }
        }
      }
    ],
    tooltip: {
      padding: 12,
      backgroundColor: '#4e5b61',
      style: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: "Open Sans, Lucida Grande, lucida, verdana, sans-serif"
      },
      borderRadius: 14,
      followPointer: true,
      shape: 'square',
      useHTML: true
    },
    series: [
      {
        name: 'Temperatura',
        data: temperature,
        yAxis: 0,
        tooltip: {
          valueSuffix: '°C',
          valueDecimals: 3
        }
      },
      {
        name: 'Umidade',
        data: humidity,
        yAxis: 1,
        tooltip: {
          valueSuffix: '%',
          valueDecimals: 3
        }
      }
    ]
  });
}

showChart()