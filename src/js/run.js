// require babel-register and set Babel presets options to es2015
require('babel-register')({
  presets: [ 'es2015' ]
});

const LottoReum = require("./lottoreum.js").default;
const lottoReum = new LottoReum(true)

let temp = process.argv[2]
let power = process.argv[3]
console.log('temp: ', temp)
console.log('power: ', power)
console.log(lottoReum.newPlayerWithLocalKey(temp, power))
