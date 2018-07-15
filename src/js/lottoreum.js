import Web3 from "web3";
import abi from "./abi.json";
import emoji from "./emoji.json"
import {getNonce, hexFormatForTrezor} from './ethereumHelper'
import EthereumTx from 'ethereumjs-tx'
import { resolve } from "../../node_modules/uri-js";
import { reject } from "rsvp";

const wallet = {
  publicKey: '0x5305a8CE096064dc11dA18556D7DA7dC86b5bE7f',
  privateKey: '6b6fd1d511cd8efaa99e9f89abb841da53aed67f2ad7ac370012d3a79cee02df'
}

export default class LottoReum {
  constructor(useInfura=false) {
    this.address = "0x24b549bdE7aDE8D37F8209FE709c1c938208FA6d"

    if (useInfura || undefined === window.web3) {
    // if (useInfura) {
      this.web3 = new Web3(
        new Web3.providers.HttpProvider(
          "https://ropsten.infura.io/8kkr6X3gKuB8cURFQsfa"
        )
      )

    } else {
      const web3js = window.web3
      this.web3 = new Web3(web3js.currentProvider)
    }
    this.contract = new this.web3.eth.Contract(abi, this.address)
  }

  async newPlayerWithLocalKey(number, power) {
    let address = wallet.publicKey
    var privateKey = Buffer.from(wallet.privateKey, 'hex')

    let data = this.contract.methods.newPlayer(number, power).encodeABI()

    let nonce = await getNonce(this.web3, address)
    console.log('nonce: ', nonce );

    var rawTx = {
        nonce: '0x' + hexFormatForTrezor( this.web3.utils.toHex(nonce) ),
        gasPrice: '0x174876E800', // 10 gwei = 0x02540BE400,  25 gwei = 5D21DBA00,   50 gwei = BA43B7400,   100 gwei = 174876E800
        gasLimit: '0x1F47D0',
        to: this.address,
        value: '0x00',
        data: data,
        // EIP 155 chainId - mainnet: 1, ropsten: 3
        chainId: 3
    }

    const tx = new EthereumTx(rawTx)
    tx.sign(privateKey)

    var serializedTx = tx.serialize();

    this.web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
    .on('error', function(error){
        console.log(error);
    })
    .on('transactionHash', function(transactionHash){
        console.log('transactionHash: ' + transactionHash);
    })
    .on('receipt', function(receipt){
        newContractAddress = receipt.contractAddress;
        console.log('receipt.contractAddress'  + receipt.contractAddress) // contains the new contract address
    })
    .on('confirmation', function(confirmationNumber, receipt){
        // console.log('confirmationNumber: ' + confirmationNumber);
        // console.log('receipt: ' + receipt);
    })
  }

  getAccounts() {
    return this.web3.eth.getAccounts();
  }

  getBlockNumber() {
    return this.web3.eth.getBlockNumber();
  }

  getBlock(block) {
    return this.web3.eth.getBlock(block);
  }

  async newPlayer(number, power) {
    let options = await this.getOptions();
    return this.contract.methods.newPlayer(number, power).send(options);
  }

  async processWinners() {
    let options = await this.getOptions();
    options.gas = 200000

    // return new Promise( (resolve, reject) => {
    return this.contract.methods.processWinner().send(options)
    //   .on('error', function(error){
    //     console.log(error);
    //   })
    //   .on('transactionHash', function(transactionHash){
    //       console.log('transactionHash: ' + transactionHash);
    //   })
    //   .on('receipt', function(receipt){
    //       newContractAddress = receipt.contractAddress;
    //       console.log('receipt.contractAddress'  + receipt.contractAddress) // contains the new contract address
    //       resolve(receipt)
    //   })
    //   .on('confirmation', function(confirmationNumber, receipt){
    //       // console.log('confirmationNumber: ' + confirmationNumber);
    //       // console.log('receipt: ' + receipt);
    //   })
    // })
  }

  getContract(abi, address) {
    return this.contract;
  }

  async getLottoNumber() {
    let lottoNumber = await this.contract.methods.playerCount().call();
    return lottoNumber;
  }

  getWinNumber(){
    return this.contract.methods.winnerCount().call();
  }

  async getWinners() {
    return this.contract.methods.winners().call();
  }

  async getfinalNumber() {
    return this.contract.methods.finalNumber().call();
  }

  async clearGame() {
    let options = await this.getOptions()
    options.gas = 200000

    return this.contract.methods.clearGame().send(options)
  }

  async getPlayers() {
    const lottoCount = await this.getLottoNumber();
    // console.log(lottoCount)
    let players = [];
    for (let i = 0; i < lottoCount; i++) {
      players.push({
        id: i,
        avatar: emoji[i],
        lotto_number: await this.contract.methods.players(i).call()
      });
    }
    //console.log(players)
    return players;
  }

  async getOptions() {
    let accounts = await this.getAccounts();
    const options = {
      from: accounts[0],
      gas: 90000,
      gasPrice: 100 * 10**9
    };
    return options;
  }

  async test() {
    let accounts = await this.getAccounts();
    let block = await this.getBlockNumber();
    // const options = {
    //   from: accounts[0]
    // }

    console.log(this.contract);
    console.log(block);
    console.log(accounts);

    // console.log(await this.getBlock(block))
    // this.contract = new this.web3.eth.Contract(abi, address)
    // // let block = await this.web3.eth.getBlock()
    // console.log(this.contract.methods.players(1).call())
    //console.log(await this.newPlayer(112, 128, options))
  }
}
