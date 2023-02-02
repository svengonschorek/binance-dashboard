import Chart from 'chart.js/auto'

import { getWalletAmount } from './athena'

async function load_wallet() {
    let data = await getWalletAmount();

    var dateformat = { year: 'numeric', month: 'long', day: 'numeric' };

    const chartdata = {
        labels: data.map(row => new Date(row.balance_on).toLocaleDateString('en-US', dateformat)),
        datasets: [{
            data: data.map(row => row.amount_eur),
            type: 'line',
            fill: true,
            backgroundColor: 'rgba(45, 135, 187, 0.3)',
            borderColor: 'rgba(100, 194, 166, 1)',
            tension: 0.1
        }]
    }

    new Chart(document.getElementById('wallet'), {
        type: 'bar',
        data: chartdata,
        options: {
            scales: {
                y: {
                    display: true,
                    grace: "30%",
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Asset Value in EUR',
                        font: {
                            size: "14px"
                        },
                        padding: {
                            top: 10,
                            bottom: 30
                        }
                    }
                }
            },
            plugins: {
                legend: false
            }
        }
        
    });
}

load_wallet();
