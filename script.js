const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [{
        label: 'Monthly Sales',
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: [65, 59, 80, 81, 56],
    }],
};

const config = {
    type: 'bar',
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `Sales: ${context.parsed.y}`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'white', // Change the color of the y-axis labels
                }
            },
            x: {
                ticks: {
                    color: 'white', // Change the color of the x-axis labels
                }
            }
        }
    },
};

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, config);

myChart.options.hover = {
    onHover: function(event, chartElement) {
        event.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
    }
};
myChart.options.onClick = function(event, chartElement) {
    if (chartElement.length > 0) {
        const dataIndex = chartElement[0].index;
        const salesData = myChart.data.datasets[0].data[dataIndex];
        alert(`Sales for ${myChart.data.labels[dataIndex]}: ${salesData}`);
    }
};

// Smooth animation on initial load
anime({
    targets: myChart.data.datasets[0].data,
    easing: 'easeInOutQuad',
    duration: 1000,
    delay: anime.stagger(100),
    loop: false,
    direction: 'normal',
    update: function(anim) {
        myChart.update();
    }
});

// Hover effect on bars
document.getElementById('myChart').addEventListener('mousemove', function(event) {
    const bars = myChart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
    if (bars.length) {
        const bar = bars[0];
        bar._model.backgroundColor = 'rgba(75, 192, 192, 1)';
        myChart.update();
    }
});

document.getElementById('myChart').addEventListener('mouseleave', function() {
    myChart.data.datasets[0].backgroundColor = 'rgba(75, 192, 192, 0.6)';
    myChart.update();
});
