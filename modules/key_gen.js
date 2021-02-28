exports.randomString = function(length = 64) {
	var result = '';
  for (var i = length; i > 0; --i) {
    num = Math.floor(Math.random() * (126 - 33 + 1) + 33)
    result += String.fromCharCode(num)
  }
  return result
}