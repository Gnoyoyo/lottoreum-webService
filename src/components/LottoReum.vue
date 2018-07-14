<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
     <br>
     <div class="columns is-mobile is-centered">
        <div class="column is-half is-narrow">
      <b-table
          :data="players"
          :columns="columns"
          :row-class="(row, index) => row.lotto_number === '97' && 'is-info' ">
      </b-table>
    </div>
     </div>
  </div>
</template>
<script>
import Lottereum from "./../js/lottoreum";
export default {
  name: "LotteReum",
  data() {
    return {
      msg: "Welcome to Lottereum",
      app: null,
      temp: 0,
      power: 0,
      players: [],
      columns: [
        {
          field: "id",
          label: "ID",
          width: "40",
          numeric: true,
           centered: true
        },
        {
          field: "lotto_number",
          label: "Number",
          centered: true
        }
      ]
    };
  },
  methods: {
    async getPlayers() {
      this.players = await this.app.getPlayers();
    },
    startGetPlayers() {
      setInterval(async () => {
        this.getPlayers();
      }, 1000);
    }
  },
  async mounted() {
    this.app = new Lottereum();
    this.startGetPlayers();
  }
};
</script>

<style>
tr.is-info {
    background: #167df0;
    color: #fff;
}
</style>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}


</style>
