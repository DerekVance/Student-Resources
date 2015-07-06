module.exports = function (emailin, passwordin) {
  var arr = []

  if(emailin.trim() === '') {
    arr.push('Please enter an email Address')
  }
  if(passwordin.trim() === '') {
    arr.push('Please enter a password')
  }
  return arr;
}
