<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <!-- Update Client content -->
      <h3 class="text-center">Update Program</h3>
      <form @submit.prevent="handleUpdateForm">
        <div class="form-group">
          <label>Activty</label>
          <div id="v-model-select">
            <select class="form-control" v-model="program.activity">
              <option disabled value="">Please select one</option>
              <option v-for="selection in Selection" :key="selection._id">
                {{ selection.activity }}
              </option>
            </select>
            <span>Selected: {{ selected }}</span>
          </div>
        </div>

        <div class="form-group">
          <label>Start Date</label>
          <input
            type="text"
            class="form-control"
            v-model="program.startDate"
            required
          />
        </div>

        <div class="form-group">
          <label>End Date</label>
          <input
            type="text"
            class="form-control"
            v-model="program.endDate"
            required
          />
        </div>

        <div class="form-group">
          <label>Services Used</label>
          <input
            type="text"
            class="form-control"
            v-model="program.servicesUsed"
            required
          />
        </div>


        <button class="btn btn-danger mt-3">Update</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      program: {},
      Selection: [],
      selected: "",
    };
  },
  created() {
    let apiURL = `http://localhost:3000/program/${this.$route.params.id}`;

    axios.get(apiURL).then((res) => {
      this.program = res.data;
    });

    let apiURL1 = `http://localhost:3000/selections`;

    axios.get(apiURL1).then((res) => {
      this.Selection = res.data;
    });
  },
  methods: {
    handleUpdateForm() {
      let apiURL = `http://localhost:3000/program/${this.$route.params.id}`;

      axios
        .put(apiURL, this.program)
        .then((res) => {
          console.log(res);
          this.$router.push("/program/:id");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>