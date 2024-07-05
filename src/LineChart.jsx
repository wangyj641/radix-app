import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const LineChart = ({ data }) => {
  const chartRef = useRef(null);
  //console.log(data);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);
    var option;

    option = {
      xAxis: [{
        type: 'category',
        data: data.map(item => item.time.slice(-2))
      }],
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: data.map(item => item.value),
          type: 'line',
          smooth: true
        }
      ]
    };

    chart.setOption(option);

    // Destruction
    return () => {
      chart.dispose();
    };
  }, [data]);

  return (
    <div ref={chartRef} style={{ width: '100%', height: '500px' }}></div>
  );
};

export default LineChart;
