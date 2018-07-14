import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
export var getNonce = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(web3, address) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return web3.eth.getTransactionCount(address);

          case 2:
            return _context.abrupt('return', _context.sent);

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getNonce(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

export var hexFormatForTrezor = function hexFormatForTrezor(hex) {
  var output = hex.replace('0x', '');
  if (1 == output.length % 2) {
    output = '0' + output;
  }
  return output;
};