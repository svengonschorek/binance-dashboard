import Chart from 'chart.js/auto'

import { getAssetAmounts } from './athena'

var ctx = document.getElementById('assets').getContext('2d');
var doughnut_chart = new Chart(ctx, {
    type: 'doughnut',
    data: {},
    options: {
        responsive: true
    }
})

async function load_assets() {

    let dateFilter = new Date().toISOString()

    let data = await getAssetAmounts(dateFilter);

    const initial_data = {
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

    doughnut_chart.data = initial_data
    doughnut_chart.update()

}
load_assets()

filter = document.getElementById('dropdown')
filter.onchange = async function(){
    filtervalue = new Date(filter.value).toISOString()
    let data = await getAssetAmounts(filtervalue);

    const filter_data = {
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

    doughnut_chart.data = filter_data
    doughnut_chart.update()
};
