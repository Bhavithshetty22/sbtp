const body = document.querySelector("body"),
    sidebar = body.querySelector(".sidebar"),
    toggle=body.querySelector(".toggle"),
    modeSwitch=body.querySelector(".toggle-switch"),
    modeText=body.querySelector(".mode-text");

    toggle.addEventListener("click",() =>{
        sidebar.classList.toggle("close");
    });
    modeSwitch.addEventListener("click",() =>{
        body.classList.toggle("dark");

        if(body.classList.contains("dark")){
            modeText.innerText ="Light Mode"
        }
        else{
            modeText.innerText="Dark Mode"
        }
    });

    const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");
// getting new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();
// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";
    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }
    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }
    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;
}
renderCalendar();
prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
        if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
    });
});
//graph
const ctx = document.getElementById('myChart').getContext('2d');

// Function to create gradient fill with opacity variation
function createGradient(ctx, color1, color2) {
    let gradient = ctx.createLinearGradient(0, 0, 0, 350); // Vertical gradient
    gradient.addColorStop(0.2, color1);  // Near the line, less opaque
    gradient.addColorStop(0.8, color2);  // Away from the line, more opaque
    return gradient;
}

// Create gradients for datasets
// Assuming 'ctx' is your canvas context
const blueGradient = createGradient(ctx, 'rgba(255, 201, 60, 0.3)', 'rgba(255, 201, 60, 0.1)');
// Assuming 'ctx' is your canvas context
const orangeGradient = createGradient(ctx, 'rgba(255, 111, 60, 0.3)', 'rgba(255, 111, 60, 0.1)');


// Create the chart
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
        datasets: [
            {
                label: 'POMODORO',
                data: [5.7, 4.5, 4, 6.5, 6.2, 9, 6.3],
                borderColor: '#ffc93c',
                backgroundColor: blueGradient,
                borderWidth: 4,
                fill: true,
                tension: 0.4,
                pointRadius: 0, // Hide dots
                pointHoverRadius: 7, // Show dots on hover
                hidden: false
            },
            {
                label: 'TO-DO LIST',
                data: [6.1, 5.5, 7.8, 3.5, 4.2, 2.1, 3.9],
                borderColor: '#ff9a3c',
                backgroundColor: orangeGradient,
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 0, // Hide dots
                pointHoverRadius: 7, // Show dots on hover
                hidden: false
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',  // Center the legend at the top
                align: 'center',  // Align the legend in the center
                labels: {
                    font: {
                        size: 14,
                        family: 'Poppins, sans-serif',
                        weight: 'bold'
                    },
                    padding: 20,
                    boxWidth: 12,  // Change to smaller width for a circle (you can adjust this value)
                    usePointStyle: true, // Use point style (circle) for the legend items
                    padding: 10, // Adjust spacing between legend items
                },
                onClick: (e, legendItem, legend) => {
                    const chart = legend.chart;
                    const datasets = chart.data.datasets;
                    const index = legendItem.datasetIndex;
                    const isOnlyVisible = datasets.every((ds, i) => i === index || ds.hidden);
    
                    // Toggle visibility: If one is visible, show both; otherwise, hide the others.
                    datasets.forEach((ds, i) => {
                        ds.hidden = isOnlyVisible ? false : i !== index;
                    });
    
                    chart.update();
                }
            },
            tooltip: {
                enabled: true,
                mode: 'index',
                intersect: false,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#f1f1f1',
                bodyColor: '#f1f1f1',
                bodyFont: {
                    size: 14,
                    family: 'Poppins, sans-serif',
                    weight: 'normal',
                    style: 'normal'
                },
                padding: 15,
                displayColors: false,
                caretSize: 8,
                cornerRadius: 6,
                boxWidth: 10,
                bodySpacing: 5
            }
        },
        scales: {
            x: {
                title: { display: false },
                grid: { display: false }
            },
            y: {
                title: { display: false },
                min: 1,
                max: 10,
                grid: { display: false },
                ticks: {
                    color: '#555',
                    font: {
                        family: 'Poppins, sans-serif',
                        size: 12,
                        weight: 'bold'
                    },
                    padding: 10
                }
            }
        },
        layout: {
            padding: {
                left: 20,
                right: 20,
                top:0,
                bottom: 20
            }
        },
        elements: {
            line: {
                tension: 0.3,
                borderWidth: 3,
                borderColor: '#42A5F5',
                backgroundColor: 'rgba(66, 165, 245, 0.2)'
            },
            point: {
                radius: 5,
                backgroundColor: '#42A5F5'
            }
        }
    }
});