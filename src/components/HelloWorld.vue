<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
      <div class="columns is-mobile is-centered">
        <div class="column is-half is-narrow">
            <b-field label="Temperature">
                <b-input type="number" v-model="temp"></b-input>
            </b-field>
            <b-field label="Power">
                <b-input type="number" v-model="power"></b-input>
            </b-field>
            <button class="button is-medium is-primary" @click="addNewPlayer()">
                  Add New Player
            </button>

              <button class="button is-medium is-primary" @click="getPlayers()">
                  getPlayers
            </button>
        </div>
      </div>
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
import HelloWorld from "./../js/helloworld"
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Lottereum',
      app: new HelloWorld(),
      temp: 0,
      power:0,
      players:[ ],
    }
  },
  methods: {
    addNewPlayer() {
      this.app.newPlayer(this.temp,this.power)
    },
    getPlayers() {
      this.app.getPlayers()
    }
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
