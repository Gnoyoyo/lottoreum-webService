export const getNonce = async function(web3, address) {
  return await web3.eth.getTransactionCount(address)
}

export const hexFormatForTrezor = function(hex) {
  let output = hex.replace('0x', '');
  if (1 == output.length % 2) {
      output = '0' + output
  }
  return output
}
