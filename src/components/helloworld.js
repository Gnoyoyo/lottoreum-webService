import Web3 from "web3"
import abi from "./abi"
export default class HelloWorld {

  web3
  contract
  constructor () {
   const address = "0xF02c112197832367c2c9506ED2E7401d00874B82"
   this.web3 =  new Web3(
      new Web3.providers.HttpProvider(
        "https://ropsten.infura.io/8kkr6X3gKuB8cURFQsfa"
      )
    )
    const getblock = async ()=>{
      let block = await this.web3.eth.getBlockNumber()
      console.log(block)
      console.log(await this.web3.eth.getBlock(block))
      this.contract = new this.web3.eth.Contract(abi,address)
      // let block = await this.web3.eth.getBlock()
      console.log( await this.contract.methods.players(1).call())

    }
    getblock()


  }
}
