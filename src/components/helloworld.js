import Web3 from "web3"
import * as  abi from "./abi.json"
export default class HelloWorld {
  constructor() {
    //  this.web3 =  new Web3(
    //     new Web3.providers.HttpProvider(
    //       "https://ropsten.infura.io/8kkr6X3gKuB8cURFQsfa"
    //     )
    //   )
    this.address = "0x6349266409b761810E8e79619B4BaDe9451a98bB"
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

  newPlayer(number, power, options) {
    return this.contract.methods.newPlayer(number, power).send(options)
  }

  getContract(abi, address) {
    return this.contract
  }

  async test() {

    let accounts = await this.getAccounts()
    let block = await this.getBlockNumber()
    const options = {
      from: accounts[0]
    }
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
