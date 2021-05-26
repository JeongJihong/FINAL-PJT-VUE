import { Bar, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: ['options'],

  mounted () {
    this.renderChart(this.chartData, {
      scales: {
        yAxes: [{
          ticks: {
            min: 0,
          }
        }],
      },
    });
  },

  watch: {
    chartData () {
      this.$data._chart.update()
    }
  },
}