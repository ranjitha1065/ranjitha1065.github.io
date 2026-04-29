import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function WeekChart({ habits }) {
  const ref = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const days = [];
    const labels = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const label   = d.toLocaleDateString('en-GB', { weekday: 'short' });
      const done    = habits.filter(h => h.logs.some(l => l.date === dateStr && l.done)).length;
      const rate    = habits.length ? Math.round(done / habits.length * 100) : 0;
      days.push(rate);
      labels.push(label);
    }

    if (chartRef.current) chartRef.current.destroy();
    const today = new Date().toLocaleDateString('en-GB', { weekday: 'short' });
    chartRef.current = new Chart(ref.current, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: '% completed',
          data: days,
          backgroundColor: labels.map(l => l === today ? '#3B6D11' : '#97C459'),
          borderRadius: 5,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { min: 0, max: 100, ticks: { callback: v => v + '%' } },
          x: { grid: { display: false } }
        }
      }
    });
    return () => chartRef.current?.destroy();
  }, [habits]);

  return (
    <div className="chart-section">
      <p className="chart-title">Weekly completion rate</p>
      <div style={{ position: 'relative', height: '180px' }}>
        <canvas ref={ref} role="img" aria-label="Bar chart of weekly habit completion rates">
          Weekly completion rates for the past 7 days.
        </canvas>
      </div>
    </div>
  );
}

export default WeekChart;
