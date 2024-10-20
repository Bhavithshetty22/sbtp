document.addEventListener("DOMContentLoaded", function() {
    const weeklyStudyData = [
      { day: "Mon", hours: 3 },
      { day: "Tue", hours: 4 },
      { day: "Wed", hours: 2 },
      { day: "Thu", hours: 5 },
      { day: "Fri", hours: 3 },
      { day: "Sat", hours: 6 },
      { day: "Sun", hours: 4 }
    ];
  
    const quizProgressData = {
      chemistry: [
        { week: 1, score: 70 },
        { week: 2, score: 75 },
        { week: 3, score: 80 },
        { week: 4, score: 85 }
      ],
      physics: [
        { week: 1, score: 65 },
        { week: 2, score: 70 },
        { week: 3, score: 75 },
        { week: 4, score: 78 }
      ],
      mathematics: [
        { week: 1, score: 75 },
        { week: 2, score: 80 },
        { week: 3, score: 85 },
        { week: 4, score: 90 }
      ]
    };
  
    // Calculate total and average study time
    const totalTimeStudied = weeklyStudyData.reduce((acc, day) => acc + day.hours, 0);
    const averageTimeStudied = totalTimeStudied / weeklyStudyData.length;
  
    // Display total and average time studied
    document.getElementById("total-time").textContent = `${totalTimeStudied} hours`;
    document.getElementById("average-time").textContent = `${averageTimeStudied.toFixed(1)} hours/day`;
  
    // Render Weekly Study Time Chart
    const ctx1 = document.getElementById("weekly-chart").getContext("2d");
    new Chart(ctx1, {
      type: 'line',
      data: {
        labels: weeklyStudyData.map(day => day.day),
        datasets: [{
          label: 'Hours Studied',
          data: weeklyStudyData.map(day => day.hours),
          backgroundColor: 'rgba(52, 152, 219, 0.2)',
          borderColor: '#3498db',
          borderWidth: 2,
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 10
          }
        }
      }
    });
  
    // Render Quiz Progress Charts
    renderQuizProgressChart("chemistry-quiz-chart", quizProgressData.chemistry);
    renderQuizProgressChart("physics-quiz-chart", quizProgressData.physics);
    renderQuizProgressChart("math-quiz-chart", quizProgressData.mathematics);
  
    function renderQuizProgressChart(elementId, data) {
      const ctx = document.getElementById(elementId).getContext("2d");
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.map(item => `Week ${item.week}`),
          datasets: [{
            label: 'Quiz Scores',
            data: data.map(item => item.score),
            backgroundColor: 'rgba(52, 152, 219, 0.2)',
            borderColor: '#2ecc71',
            borderWidth: 2,
            fill: true,
            tension: 0.3
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 100
            }
          }
        }
      });
    }
  });
  
  