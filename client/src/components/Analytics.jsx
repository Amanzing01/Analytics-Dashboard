import React, { useState, useEffect, useRef } from 'react';
import * as Chart from 'chart.js';

Chart.Chart.register(
  Chart.CategoryScale,
  Chart.LinearScale,
  Chart.BarElement,
  Chart.ArcElement,
  Chart.Title,
  Chart.Tooltip,
  Chart.Legend,
  Chart.PieController,
  Chart.DoughnutController,
  Chart.BarController
);

const Analytics = () => {
  const [genderData, setGenderData] = useState(null);
  const [ageData, setAgeData] = useState(null);
  const [skinData, setSkinData] = useState(null);
  const [loading, setLoading] = useState({ gender: true, age: true, skin: true });
  const [error, setError] = useState({ gender: null, age: null, skin: null });

  const genderChartRef = useRef(null);
  const ageChartRef = useRef(null);
  const skinChartRef = useRef(null);
  const genderChartInstance = useRef(null);
  const ageChartInstance = useRef(null);
  const skinChartInstance = useRef(null);

  const fetchGenderDistribution = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/dashboard/gender-distribution');
      if (!response.ok) throw new Error('Failed to fetch gender data');
      const data = await response.json();
      setGenderData(data);
      setLoading(prev => ({ ...prev, gender: false }));
    } catch (err) {
      setError(prev => ({ ...prev, gender: err.message }));
      setLoading(prev => ({ ...prev, gender: false }));
    }
  };

  const fetchAgeDistribution = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/dashboard/age-distribution');
      if (!response.ok) throw new Error('Failed to fetch age data');
      const data = await response.json();
      setAgeData(data);
      setLoading(prev => ({ ...prev, age: false }));
    } catch (err) {
      setError(prev => ({ ...prev, age: err.message }));
      setLoading(prev => ({ ...prev, age: false }));
    }
  };

  const fetchSkinTypeDistribution = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/dashboard/skin-type-distribution');
      if (!response.ok) throw new Error('Failed to fetch skin type data');
      const data = await response.json();
      setSkinData(data);
      setLoading(prev => ({ ...prev, skin: false }));
    } catch (err) {
      setError(prev => ({ ...prev, skin: err.message }));
      setLoading(prev => ({ ...prev, skin: false }));
    }
  };

  useEffect(() => {
    fetchGenderDistribution();
    fetchAgeDistribution();
    fetchSkinTypeDistribution();
  }, []);

  useEffect(() => {
    if (genderData && genderChartRef.current) {
      if (genderChartInstance.current) {
        genderChartInstance.current.destroy();
      }

      const ctx = genderChartRef.current.getContext('2d');
      const labels = genderData.map(item => item._id || 'Unknown');
      const data = genderData.map(item => item.count);
      const colors = ['#FFA1A1', '#93AAFD', '#FBD7E0','#C893FD',  '#E0C6FD'];

      genderChartInstance.current = new Chart.Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            data: data,
            backgroundColor: colors,
            borderWidth: 0,
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 20,
                usePointStyle: true,
                font: {
                  size: 12
                }
              }
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = ((context.raw / total) * 100).toFixed(1);
                  return `${context.label}: ${context.raw} (${percentage}%)`;
                }
              }
            }
          }
        }
      });
    }
  }, [genderData]);

  useEffect(() => {
    if (ageData && ageChartRef.current) {
      if (ageChartInstance.current) {
        ageChartInstance.current.destroy();
      }

      const ctx = ageChartRef.current.getContext('2d');
      const labels = Object.keys(ageData);
      const data = Object.values(ageData);

      ageChartInstance.current = new Chart.Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Number of Users',
            data: data,
            backgroundColor: '#FFA1A1',
            borderColor: '#FFA1A1',
            borderWidth: 1,
            borderRadius: 12,
            borderSkipped: false,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `Users: ${context.raw}`;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              },
              grid: {
                color: '#f0f0f0'
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          }
        }
      });
    }
  }, [ageData]);

  useEffect(() => {
    if (skinData && skinChartRef.current) {
      if (skinChartInstance.current) {
        skinChartInstance.current.destroy();
      }

      const ctx = skinChartRef.current.getContext('2d');
      const labels = skinData.map(item => item._id || 'Unknown');
      const data = skinData.map(item => item.count);
      const colors = ['#FFA1A1', '#93AAFD', '#FBD7E0','#C893FD',  '#E0C6FD'];
      const total = data.reduce((a, b) => a + b, 0);

      skinChartInstance.current = new Chart.Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            data: data,
            backgroundColor: colors,
            borderWidth: 0,
            hoverOffset: 4,
            cutout: '80%'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          rotation: -90,
          circumference: 180,         
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 20,
                usePointStyle: true,
                font: {
                  size: 12
                }
              }
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const percentage = ((context.raw / total) * 100).toFixed(1);
                  return `${context.label}: ${context.raw} (${percentage}%)`;
                }
              }
            }
          }
        }
        ,
        plugins: [{
          beforeDraw: function (chart) {
            const ctx = chart.ctx;
            ctx.save();
            const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
            const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = 'bold 24px Arial';
            ctx.fillStyle = '#374151';
            ctx.fillText('Total Count', centerX, centerY - 10);
            ctx.font = 'bold 32px Arial';
            ctx.fillStyle = '#1f2937';
            ctx.fillText(total.toString(), centerX, centerY + 15);
            ctx.restore();
          }
        }]
      });
    }
  }, [skinData]);

  useEffect(() => {
    return () => {
      if (genderChartInstance.current) genderChartInstance.current.destroy();
      if (ageChartInstance.current) ageChartInstance.current.destroy();
      if (skinChartInstance.current) skinChartInstance.current.destroy();
    };
  }, []);

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      <span className="ml-2 text-gray-600">Loading...</span>
    </div>
  );

  const ErrorMessage = ({ message }) => (
    <div className="flex items-center justify-center h-64">
      <div className="text-red-500 text-center">
        <p className="text-lg font-semibold">Error loading data</p>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Gender Distribution
        </h3>
        <div className="relative">
          {loading.gender && <LoadingSpinner />}
          {error.gender && <ErrorMessage message={error.gender} />}
          {!loading.gender && !error.gender && (
            <div className="h-64">
              <canvas ref={genderChartRef}></canvas>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Age Distribution
        </h3>
        <div className="relative">
          {loading.age && <LoadingSpinner />}
          {error.age && <ErrorMessage message={error.age} />}
          {!loading.age && !error.age && (
            <div className="h-64">
              <canvas ref={ageChartRef}></canvas>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Skin Type Distribution
        </h3>
        <div className="relative">
          {loading.skin && <LoadingSpinner />}
          {error.skin && <ErrorMessage message={error.skin} />}
          {!loading.skin && !error.skin && (
            <div className="h-64">
              <canvas ref={skinChartRef}></canvas>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;