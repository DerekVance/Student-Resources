module.exports = function (subject, url, description, title) {
var arr = []
  if(subject === 'none') {
    arr.push('Please Select a Subject')
  }
  if(title.trim() === '') {
    arr.push('Please Add a Title')
  }
  if(url.trim() === '') {
    arr.push('Please Fill in the Resource Url')
  }
  if(description.trim() === '') {
    arr.push('Please Fill Out a Description')
  }
return arr;
}
