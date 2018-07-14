<template>
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

</template>

<script>
import LottoReum from "@/js/lottoreum"
export default {
  name: 'Lottereum',
  data () {
    return {
      app: null,
      temp: 0,
      power:0,
    }
  },
  methods: {
    addNewPlayer() {
      this.app.newPlayer(this.temp,this.power)
    }
  },
  async mounted() {
    this.app = new LottoReum()
  },

 }
</script>

<style>

</style>
