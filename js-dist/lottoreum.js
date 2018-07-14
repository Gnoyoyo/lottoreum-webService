import _regeneratorRuntime from "babel-runtime/regenerator";
import _asyncToGenerator from "babel-runtime/helpers/asyncToGenerator";
import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";
import Web3 from "web3";
import abi from "./abi.json";
import emoji from "./emoji.json";
import { getNonce, hexFormatForTrezor } from './ethereumHelper';
import EthereumTx from 'ethereumjs-tx';

var wallet = {
  publicKey: '0x5305a8CE096064dc11dA18556D7DA7dC86b5bE7f',
  privateKey: '6b6fd1d511cd8efaa99e9f89abb841da53aed67f2ad7ac370012d3a79cee02df'
};

var LottoReum = function () {
  function LottoReum() {
    var useInfura = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    _classCallCheck(this, LottoReum);

    if (useInfura) {
      this.web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/8kkr6X3gKuB8cURFQsfa"));
    } else {
      this.address = "0x4128f0274cd7794ac18D9C07fF1041e06e91d87f";
      var web3js = window.web3;
      this.web3 = new Web3(web3js.currentProvider);
    }
    this.contract = new this.web3.eth.Contract(abi, this.address);
  }

  _createClass(LottoReum, [{
    key: "newPlayerWithLocalKey",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(number, power) {
        var address, privateKey, data, nonce, rawTx, tx, serializedTx;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                address = wallet.publicKey;
                privateKey = Buffer.from(wallet.privateKey, 'hex');
                data = this.contract.methods.newPlayer(number, power).encodeABI();
                _context.next = 5;
                return getNonce(this.web3, address);

              case 5:
                nonce = _context.sent;

                console.log('nonce: ', nonce);

                rawTx = {
                  nonce: '0x' + hexFormatForTrezor(this.web3.utils.toHex(nonce)),
                  gasPrice: '0x174876E800', // 10 gwei = 0x02540BE400,  25 gwei = 5D21DBA00,   50 gwei = BA43B7400,   100 gwei = 174876E800
                  gasLimit: '0x1F47D0',
                  to: '0x4128f0274cd7794ac18d9c07ff1041e06e91d87f',
                  value: '0x00',
                  data: data,
                  // EIP 155 chainId - mainnet: 1, ropsten: 3
                  chainId: 3
                };
                tx = new EthereumTx(rawTx);

                tx.sign(privateKey);

                serializedTx = tx.serialize();


                this.web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('error', function (error) {
                  console.log(error);
                }).on('transactionHash', function (transactionHash) {
                  console.log('transactionHash: ' + transactionHash);
                }).on('receipt', function (receipt) {
                  newContractAddress = receipt.contractAddress;
                  console.log('receipt.contractAddress' + receipt.contractAddress); // contains the new contract address
                }).on('confirmation', function (confirmationNumber, receipt) {
                  // console.log('confirmationNumber: ' + confirmationNumber);
                  // console.log('receipt: ' + receipt);
                });

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function newPlayerWithLocalKey(_x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return newPlayerWithLocalKey;
    }()
  }, {
    key: "getAccounts",
    value: function getAccounts() {
      return this.web3.eth.getAccounts();
    }
  }, {
    key: "getBlockNumber",
    value: function getBlockNumber() {
      return this.web3.eth.getBlockNumber();
    }
  }, {
    key: "getBlock",
    value: function getBlock(block) {
      return this.web3.eth.getBlock(block);
    }
  }, {
    key: "newPlayer",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(number, power) {
        var options;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.getOptions();

              case 2:
                options = _context2.sent;
                return _context2.abrupt("return", this.contract.methods.newPlayer(number, power).send(options));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function newPlayer(_x4, _x5) {
        return _ref2.apply(this, arguments);
      }

      return newPlayer;
    }()
  }, {
    key: "getContract",
    value: function getContract(abi, address) {
      return this.contract;
    }
  }, {
    key: "getLottoNumber",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
        var lottoNumber;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.contract.methods.playerCount().call();

              case 2:
                lottoNumber = _context3.sent;
                return _context3.abrupt("return", lottoNumber);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getLottoNumber() {
        return _ref3.apply(this, arguments);
      }

      return getLottoNumber;
    }()
  }, {
    key: "getPlayers",
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
        var lottoCount, players, i;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.getLottoNumber();

              case 2:
                lottoCount = _context4.sent;

                // console.log(lottoCount)
                players = [];
                i = 0;

              case 5:
                if (!(i < lottoCount)) {
                  _context4.next = 17;
                  break;
                }

                _context4.t0 = players;
                _context4.t1 = i;
                _context4.t2 = emoji[i];
                _context4.next = 11;
                return this.contract.methods.players(i).call();

              case 11:
                _context4.t3 = _context4.sent;
                _context4.t4 = {
                  id: _context4.t1,
                  avatar: _context4.t2,
                  lotto_number: _context4.t3
                };

                _context4.t0.push.call(_context4.t0, _context4.t4);

              case 14:
                i++;
                _context4.next = 5;
                break;

              case 17:
                return _context4.abrupt("return", players);

              case 18:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getPlayers() {
        return _ref4.apply(this, arguments);
      }

      return getPlayers;
    }()
  }, {
    key: "getOptions",
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5() {
        var accounts, options;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.getAccounts();

              case 2:
                accounts = _context5.sent;
                options = {
                  from: accounts[0],
                  gas: 90000
                };
                return _context5.abrupt("return", options);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getOptions() {
        return _ref5.apply(this, arguments);
      }

      return getOptions;
    }()
  }, {
    key: "test",
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6() {
        var accounts, block;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.getAccounts();

              case 2:
                accounts = _context6.sent;
                _context6.next = 5;
                return this.getBlockNumber();

              case 5:
                block = _context6.sent;

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

              case 9:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function test() {
        return _ref6.apply(this, arguments);
      }

      return test;
    }()
  }]);

  return LottoReum;
}();

export default LottoReum;