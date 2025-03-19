import { useEffect, useRef } from 'react';
import { Chart, registerables, CategoryScale } from 'chart.js';

Chart.register(...registerables, CategoryScale);

const MyChart = () => {
   const chartRef = useRef(null);
   const chartInstance = useRef(null);

   useEffect(() => {
      if (chartInstance.current) {
         chartInstance.current.destroy(); // Destroy existing chart before creating a new one
      }

      const ctx = chartRef.current.getContext('2d');

      chartInstance.current = new Chart(ctx, {
         type: 'line',
         data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
               {
                  label: 'Performance',
                  data: [75, 82, 78, 85, 90, 88],
                  borderColor: 'rgba(75, 192, 192, 1)',
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  tension: 0.4,
                  fill: true,
                  pointRadius: 6,
                  pointHoverRadius: 8,
                  pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                  pointHoverBackgroundColor: 'rgba(255, 99, 132, 1)',
               },
            ],
         },
         options: {
            responsive: true,
            plugins: {
               tooltip: {
                  enabled: true, // Show tooltip on hover
               },
            },
            scales: {
               x: {
                  type: 'category',
                  ticks: {
                     color: '#555',
                  },
               },
               y: {
                  beginAtZero: true,
                  ticks: {
                     color: '#555',
                  },
               },
            },
            onClick: (event, elements) => {
               if (elements.length > 0) {
                  const index = elements[0].index;
                  const value = chartInstance.current.data.datasets[0].data[index];
                  const label = chartInstance.current.data.labels[index];
                  alert(`Performance in ${label}: ${value}%`);
               }
            },
         },
      });

      return () => {
         if (chartInstance.current) {
            chartInstance.current.destroy(); // Clean up on unmount
         }
      };
   }, []);

   return <canvas ref={chartRef} />;
};

export default MyChart;
