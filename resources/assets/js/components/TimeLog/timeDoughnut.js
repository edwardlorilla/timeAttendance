/**
 * Created by Lorilla on 29/08/2017.
 */
/**
 * Created by Lorilla on 28/08/2017.
 */
import { Doughnut } from 'vue-chartjs'

export default Doughnut.extend({
    props:['dataSet'],
    computed:{
        labelPluck(){
            return _.map(this.dataSet, function (data) {
                return data.key
            })
        },valPluck(){
            return _.map(this.dataSet, function (data) {
                return data.val
            })
        }
    },
    mounted () {
        var vm = this
        this.renderChart({
            labels: vm.labelPluck,
            datasets: [
                {
                    backgroundColor: [
                        '#41B883',
                        '#E46651',
                        '#00D8FF',
                        '#DD1B16'
                    ],
                    data: vm.valPluck
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