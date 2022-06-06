<template>
  <div class="form-group">
    <label>Core programs</label>
    <div id="v-model-select">
      <select class="form-control" v-model="activity" @change='passEvent'>
        <option disabled value="">Please select a program</option>
        <option v-for="selection in Selection" :key="selection._id">
          {{ selection.activity }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      Selection: [],
      selected: "",
      activity: ''
    };
  },
  created() {
    let apiURL = `http://localhost:3000/selections`;
    axios.get(apiURL).then((res) => {
      this.Selection = res.data;
    });
  },
  methods:{
    passEvent()
    {
      this.$emit('changeSelection', this.activity)
    }
  }
};
</script>