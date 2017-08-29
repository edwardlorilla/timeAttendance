/**
 * Created by Lorilla on 29/08/2017.
 */
import { Line } from 'vue-chartjs'

export default Line.extend({
    props:['dataSet', 'label'],
    mounted () {
        var vm = this
        this.renderChart({
            labels: vm.label,
            datasets: [
                {
                    backgroundColor: [
                        '#41B883',

                    ],
                    label: 'Month Chart',
                    data:  vm.dataSet
                }
            ]
        }, {
            responsive: true,
            maintainAspectRatio: false,
            pieceLabel: {
                mode: 'percentage',
                precision: 1
            }
        })
    }
})