let int64Regexp = /^\d+$/
let float64Regexp = /^[-+]?[0-9]*\.?[0-9]*$/  // includes empty, which is ok for float nan
let boolRegexp = /^True|False$/

let correct = {
  'correct': true,
  'errorMessage': ''
}

let doesNotSupportMissing = (type) => {
  return {
    'correct': false,
    'errorMessage': type + ' does not support missing values'
  }
}

let isNotAType = (value, aType) => {
  return {
    'correct': false,
    'errorMessage': value + ' is not ' + aType
  }
}

exports.validate = (value, type) => {
  switch (type) {
    case 'object':
      return correct
    case 'int64':
      return validInt64(value)
    case 'float64':
      return validFloat64(value)
    case 'bool':
      return validBool(value)
  }
}

let validInt64 = (value) => {
  if (value === '') {
    return doesNotSupportMissing('int64')
  } else if (int64Regexp.test(value)) {
    return correct
  } else {
    return isNotAType(value, 'an integer')
  }
}

let validFloat64 = (value) => {
  if (float64Regexp.test(value)) {
    return correct
  } else {
    return isNotAType(value, 'a float')
  }
}

let validBool = (value) => {
  if (value === '') {
    return doesNotSupportMissing('bool')
  } else if (boolRegexp.test(value)) {
    return correct
  } else {
    return isNotAType(value, 'a bool, True or False expected')
  }
}

