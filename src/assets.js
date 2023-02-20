import Chart from 'chart.js/auto'

import { getAssetAmounts, getProfitLoss } from './athena'

var ctx = document.getElementById('assets').getContext('2d');
var doughnut_chart = new Chart(ctx, {
    type: 'doughnut',
    data: {},
    options: {
        responsive: true
    }
})

window.onload = async function() {

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

    let kpi_data = await getProfitLoss();

    yearly_value = kpi_data.map(row => row.yearly_pl)[0].toFixed(2)
    monthly_value = kpi_data.map(row => row.monthly_pl)[0].toFixed(2)
    daily_value = kpi_data.map(row => row.daily_pl)[0].toFixed(2)

    document.getElementById('yearly_value').innerHTML = yearly_value + "€"
    document.getElementById('monthly_value').innerHTML = monthly_value + "€"
    document.getElementById('daily_value').innerHTML = daily_value + "€"

}

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
