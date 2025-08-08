import { useEffect, useRef } from "react";

export default function PerformanceCharts() {
  const performanceChartRef = useRef<HTMLCanvasElement>(null);
  const financialChartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Dynamically import Chart.js to avoid SSR issues
    import('chart.js/auto').then((Chart) => {
      if (performanceChartRef.current) {
        const ctx = performanceChartRef.current.getContext('2d');
        if (ctx) {
          new Chart.default(ctx, {
            type: 'line',
            data: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              datasets: [{
                label: 'Average Performance (%)',
                data: [89, 91, 88, 94, 96, 95],
                borderColor: '#4facfe',
                backgroundColor: 'rgba(79, 172, 254, 0.1)',
                fill: true,
                tension: 0.4
              }, {
                label: 'Active Agents',
                data: [18, 19, 17, 20, 22, 19],
                borderColor: '#00f2fe',
                backgroundColor: 'rgba(0, 242, 254, 0.1)',
                fill: false,
                tension: 0.4
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  labels: {
                    color: '#e0e0e0'
                  }
                }
              },
              scales: {
                x: {
                  ticks: {
                    color: '#8892b0'
                  },
                  grid: {
                    color: '#2a3f5f'
                  }
                },
                y: {
                  ticks: {
                    color: '#8892b0'
                  },
                  grid: {
                    color: '#2a3f5f'
                  }
                }
              }
            }
          });
        }
      }

      if (financialChartRef.current) {
        const ctx = financialChartRef.current.getContext('2d');
        if (ctx) {
          new Chart.default(ctx, {
            type: 'bar',
            data: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              datasets: [{
                label: 'Cost ($K)',
                data: [8.2, 9.1, 10.5, 11.2, 12.8, 12.4],
                backgroundColor: 'rgba(239, 68, 68, 0.7)',
                borderColor: '#ef4444',
                borderWidth: 1
              }, {
                label: 'Revenue ($K)',
                data: [28.5, 32.4, 38.9, 41.2, 47.8, 45.9],
                backgroundColor: 'rgba(16, 185, 129, 0.7)',
                borderColor: '#10b981',
                borderWidth: 1
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  labels: {
                    color: '#e0e0e0'
                  }
                }
              },
              scales: {
                x: {
                  ticks: {
                    color: '#8892b0'
                  },
                  grid: {
                    color: '#2a3f5f'
                  }
                },
                y: {
                  ticks: {
                    color: '#8892b0'
                  },
                  grid: {
                    color: '#2a3f5f'
                  }
                }
              }
            }
          });
        }
      }
    });
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-dark-card p-6 rounded-xl border border-dark-border">
        <h3 className="text-xl font-semibold text-white mb-4">Performance Trends</h3>
        <div className="chart-container">
          <canvas ref={performanceChartRef}></canvas>
        </div>
      </div>

      <div className="bg-dark-card p-6 rounded-xl border border-dark-border">
        <h3 className="text-xl font-semibold text-white mb-4">Cost vs Revenue</h3>
        <div className="chart-container">
          <canvas ref={financialChartRef}></canvas>
        </div>
      </div>
    </div>
  );
}
