import Chart from 'chart.js/auto'

import { getAssetAmounts } from './athena'

async function load_assets() {

    let dateFilter = new Date().toISOString()

    let data = await getAssetAmounts(dateFilter);

    const chartdata = {
        labels: data.map(row => row.asset),
        datasets: [{
            data: data.map(row => row.amount_eur),
            backgroundColor: [
                'rgba(45, 135, 187, 0.6)',
                'rgba(254, 174, 101, 0.6)',
                'rgba(170, 222, 167, 0.6)',
                'rgba(230, 246, 157, 0.6)',
                'rgba(100, 194, 166, 0.6)',
                'rgba(246, 109, 68, 0.6)'
            ],
            spacing: '1'
        }]
    }

    new Chart(document.getElementById('assets'), {
        type: 'doughnut',
        data: chartdata,
        options: {
            responsive: true
        }
    })
}

load_assets();
