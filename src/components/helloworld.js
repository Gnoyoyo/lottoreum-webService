import Web3 from "web3"
import * as  abi from "./abi.json"
export default class HelloWorld {
  web3
  contract
  constructor() {
    const address = "0xF02c112197832367c2c9506ED2E7401d00874B82"
    //  this.web3 =  new Web3(
    //     new Web3.providers.HttpProvider(
    //       "https://ropsten.infura.io/8kkr6X3gKuB8cURFQsfa"
    //     )
    //   )
    let web3js = window.web3
    this.web3 = new Web3(web3js.currentProvider)

    const getblock = async () => {
      let accounts =await this.getAccounts()
      let block = await this.getBlockNumber()
      this.contract = new this.web3.eth.Contract(abi, address)

      const options = {
        from: accounts[0]
      }
      console.log(  block)
      console.log( accounts)

      console.log(await this.getBlock(block))
      // this.contract = new this.web3.eth.Contract(abi, address)
      // // let block = await this.web3.eth.getBlock()
      // console.log(this.contract.methods.players(1).call())
       console.log(await this.newPlayer(112,128,options))

    }
    getblock()
  }

    getAccounts() {
    return  this.web3.eth.getAccounts()
    const options = {
      from: accounts[0]
    }
  }

    getBlockNumber(){
    return  this.web3.eth.getBlockNumber()
  }

    getBlock(block){
    return  this.web3.eth.getBlock(block)
  }

   newPlayer(number, power,options){
    return  this.contract.methods.newPlayer(number,power).send(options)
  }

}
