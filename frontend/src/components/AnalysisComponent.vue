<template>
    <div class="row">
        <div class="col-md-12">
          <div>
            <br>
            <h2>Count of activities for each date</h2>
            <line-chart :date="countPrograms(startDates)"></line-chart>
            <br>
            <h2>Count of Core Activities used by clients</h2>
            <pie-chart :date="countPrograms(Programs)"></pie-chart>
            <br>
          </div>
        </div>
    </div>
</template>

<script>
// import axios for API Endpoints & charts
    import axios from "axios";
    import 'chartkick/chart.js';

    export default {
        data() {
            return {
                Programs: [],
                startDates: [],
                loading: false,
                error: null,
            };
        },
        created() {
            let apiURL = 'http://localhost:3000/program';
            axios.get(apiURL).then(res => {
                this.Programs = res.data;
            }).catch(error => {
                console.log(error)
            });
        },
        methods: {
            assortDates(Programs) {

            const arr = Programs;

            const sortDate = arr => {
                const sorter = (a,b) => {
                  return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
                }
                arr.sort(sorter);
            };
            sortDate(arr);
            return(arr);
            },
            async fetchData() {
            try {
                this.error = null;
                this.loading = true;
                const url = 'http://localhost:3000/program';
                const response = await axios.get(url);

                this.startDates = response.data.map((item) => item.startDate);
                this.Programs = response.data.map((item) => item.activity);
            } catch (err) {
                if (err.response) {
                this.error = {
                  title: "Server Response",
                  message: err.message,
                };
                } else if (err.request) {
                this.error = {
                    title: "Unable to reach server",
                    message: err.message,
                };
                } else {
                this.error = {
                    title: "Application Error",
                    message: err.message,
                };
                }
          }
          this.loading = false;
        },
    },
    mounted() {
    this.fetchData();
  },
};
</script>