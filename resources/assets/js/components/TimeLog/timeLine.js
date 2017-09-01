/**
 * Created by Lorilla on 28/08/2017.
 */
import { Bar } from 'vue-chartjs'

export default ({
    props: ["dataSet", "type"],
    template: '<canvas width="400" height="200"></canvas>',
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
    mounted: function() {
        new Chart(this.$el, {
            type: this.type,
            data: {
                labels: this.labelPluck,
                datasets: [
                    {
                        data: this.valPluck,
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.6)",
                            "rgba(54, 162, 235, 0.6)",
                            "rgba(255, 206, 86, 0.6)",
                            "rgba(75, 192, 192, 0.6)",
                            "rgba(153, 102, 255, 0.6)",
                            "rgba(255, 159, 64, 0.6)"
                        ],
                        borderColor: [
                            "rgba(255,99,132,1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
                            "rgba(153, 102, 255, 1)",
                            "rgba(255, 159, 64, 1)"
                        ],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    ]
                }
            }
        });
    }

})