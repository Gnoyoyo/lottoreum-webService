<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
     <br>
        <div v-for="item in players" :key="item.id">
            <section class="columns is-centered">
                <b-message>
                    {{ item.lotto_number }}
                </b-message>
             </section>
        </div>
    </div>
</template>
<script>
import Lottereum from "./../js/lottoreum"
export default {
  name: 'Lottereum',
  data () {
    return {
      msg: 'Welcome to Lottereum',
      app: null,
      temp: 0,
      power:0,
      players: [],
    }
  },
  methods: {
    async getPlayers() {
      this.players = await this.app.getPlayers()
    },
    startGetPlayers(){
      setInterval(
       async ()=>{
         this.getPlayers()
       },1000
      )
    }
  },
  async mounted() {
    this.app = new Lottereum()
    this.startGetPlayers()
  },

 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
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
