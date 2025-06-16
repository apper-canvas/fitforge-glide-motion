import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const ProgressChart = ({
  data = [],
  title = "Progress Chart",
  type = 'line',
  className = ''
}) => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: type,
        height: 300,
        background: 'transparent',
        toolbar: { show: false },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800
        }
      },
      theme: {
        mode: 'dark'
      },
      grid: {
        borderColor: '#374151',
        strokeDashArray: 3
      },
      xaxis: {
        type: 'datetime',
        labels: {
          style: {
            colors: '#9CA3AF'
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#9CA3AF'
          }
        }
      },
colors: ['#B19CD9', '#7FB3D3', '#A7E2CC', '#F4D19B'],
      stroke: {
        curve: 'smooth',
        width: 3
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.1,
          stops: [0, 100]
        }
      },
      tooltip: {
        theme: 'dark',
        style: {
          backgroundColor: '#1F2937'
        }
      },
      legend: {
        labels: {
          colors: '#9CA3AF'
        }
      }
    }
  });

  useEffect(() => {
    if (data.length > 0) {
      const series = [{
        name: 'Workouts',
        data: data.map(item => ({
          x: new Date(item.date).getTime(),
          y: item.value
        }))
      }];

      setChartData(prev => ({
        ...prev,
        series
      }));
    }
  }, [data]);

  const mockData = data.length === 0 ? [
    { date: '2024-01-01', value: 0 },
    { date: '2024-01-08', value: 3 },
    { date: '2024-01-15', value: 7 },
    { date: '2024-01-22', value: 12 },
    { date: '2024-01-29', value: 18 }
  ] : data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      <Card>
        <div className="flex justify-between items-center mb-4">
<h3 className="text-lg font-semibold text-surface-950 font-display">
            {title}
          </h3>
          
          <Button
            variant="ghost"
            size="sm"
            icon="Download"
          >
            Export
          </Button>
        </div>

        <div className="h-80">
          <Chart
            options={chartData.options}
            series={chartData.series.length > 0 ? chartData.series : [{
              name: 'Workouts',
              data: mockData.map(item => ({
                x: new Date(item.date).getTime(),
                y: item.value
              }))
            }]}
            type={type}
            height="100%"
          />
        </div>
      </Card>
    </motion.div>
  );
};

export default ProgressChart;