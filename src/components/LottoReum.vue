<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
     <br>
     <div class="columns is-mobile is-centered">
        <div class="column is-half is-narrow">
          <b-table
            :data="players"
            :row-class="(row, index) => winners.includes(index) && 'is-info' ">
                <template slot-scope="props">
                  <b-table-column field="id" label="Player" width="15" :centered="true">
                    <emoji class="emoji" :emoji="props.row.avatar" set="emojione"></emoji>
                  </b-table-column>
                  <b-table-column field="lotto_number" label="Lotto Number" width="40" numeric :centered="true">
                      <span class="lotto_number">{{ props.row.lotto_number}}</span>
                  </b-table-column>
                </template>
          </b-table>
        </div>
     </div>
         <section>
          <button class="button is-medium is-primary" @click="lotto()">
                  ให้คุกกี้ทำนายกัน
          </button>
          <button class="button is-medium is-danger" @click="clear()">
                  Clear
          </button>
         </section>

        <div v-if="finalNumber !== 0" style="color:white; font-size:30px;">
          เลขที่ออก {{ finalNumber }}
        </div>

        <b-modal :active.sync="isImageModalActive">
          <div class="columns is-mobile is-centered modal_final_number">
            <div class="column is-half is-narrow content">
              เลขที่ออก {{ finalNumber }}
            </div>
          </div>
        </b-modal>
    </div>
</template>
<script>
import Lottereum from "./../js/lottoreum";
export default {
  name: "LotteReum",
  data() {
    return {
      msg: "",
      app: null,
      temp: 0,
      power: 0,
      players: [],
      winners: [],
      columns: [
        {
          field: "avatar",
          label: "ID",
          width: "40",
          numeric: true,
          centered: true,
          renderHtml: true
        },
        {
          field: "lotto_number",
          label: "Number",
          centered: true
        }
      ],
      emoji: null,
      winnersObj: null,
      winnerIndexs: [],
      finalNumber: '...',

      isImageModalActive: false
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
    },
    clear() {
      this.app.clearGame()
      console.log("clear clicked!!")
    },
    async lotto(){
      console.log("lotto clicked!!")

      // Show modal
      this.finalNumber = '...'
      this.isImageModalActive = true

      // Find winners
      this.winnersObj = await this.app.processWinners()
      console.log(`winnersObj ${this.winnersObj}`)


      // Get winners
      setTimeout(async () => {
        this.winnerIndexs = await this.app.getWinners()
        this.winners = this.winnerIndexs.map(index => parseInt(index))
      }, 1000);

      // Get Final Numbers
      this.finalNumber = await this.app.getfinalNumber()

      setTimeout(() => {
        this.isImageModalActive = false
      }, 5000);
    }
  },
  async mounted() {
    this.app = new Lottereum();
    this.startGetPlayers();
  },
  async getWinnumber() {

  }
};
</script>

<style>
tr.is-info {
  background: #54BF42;
  color: #fff;
}
.emoji span {
  width: 45px !important;
  height: 45px !important;
}
.lotto_number {
  font-size: 30px;
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
.modal_final_number {
  background-color: gray;
  height: 300px;
  color: white;
  font-size: 30px;
}
.modal_final_number .content {
  height: 50px;
  margin-top: 106px;
}
</style>
