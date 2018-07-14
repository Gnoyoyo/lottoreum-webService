import Web3 from "web3"
import abi from "./abi.json"
export default class HelloWorld {
  constructor() {
    this.address = "0x4128f0274cd7794ac18D9C07fF1041e06e91d87f"
    const web3js = window.web3
    this.web3 = new Web3(web3js.currentProvider)
    this.contract = new this.web3.eth.Contract(abi, this.address)
  }

  getAccounts() {
    return this.web3.eth.getAccounts()
  }

  getBlockNumber() {
    return this.web3.eth.getBlockNumber()
  }

  getBlock(block) {
    return this.web3.eth.getBlock(block)
  }

  async newPlayer(number, power) {
    let options = await this.getOptions()
    return this.contract.methods.newPlayer(number, power).send(options)
  }

  getContract(abi, address) {
    return this.contract
  }

  async getLottoNumber(){
     let lottoNumber = await this.contract.methods.playerCount().call()
     return lottoNumber
  }

  async getPlayers(){
    const lottoCount = await this.getLottoNumber()
    console.log(lottoCount)
    let players = []
    for( let i= 0; i<lottoCount ;i++)
    {
      players.push(await this.contract.methods.players(i).call())
    }
    console.log(players)
    return players
  }

  async getOptions() {
    let accounts = await this.getAccounts()
    const options = {
      from: accounts[0]
    }
   return options
  }

  async test() {

    let accounts = await this.getAccounts()
    let block = await this.getBlockNumber()
    // const options = {
    //   from: accounts[0]
    // }

    console.log(this.contract)
    console.log(block)
    console.log(accounts)

    // console.log(await this.getBlock(block))
    // this.contract = new this.web3.eth.Contract(abi, address)
    // // let block = await this.web3.eth.getBlock()
    // console.log(this.contract.methods.players(1).call())
    //console.log(await this.newPlayer(112, 128, options))

  }

}
