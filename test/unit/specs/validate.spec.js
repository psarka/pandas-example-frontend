import validate from '@/components/validate'

chai.config.truncateThreshold = 0

describe('validate', () => {
  it('should validate object', () => {
    expect(validate.validate('hi', 'object')).to.deep.equal({
      'correct': true,
      'errorMessage': ''
    })
  })
  it('should validate int64', () => {
    expect(validate.validate('hi', 'int64')).to.deep.equal({
      'correct': false,
      'errorMessage': 'hi is not an integer'
    })
    expect(validate.validate('1.0', 'int64')).to.deep.equal({
      'correct': false,
      'errorMessage': '1.0 is not an integer'
    })
    expect(validate.validate('1', 'int64')).to.deep.equal({
      'correct': true,
      'errorMessage': ''
    })
    expect(validate.validate('', 'int64')).to.deep.equal({
      'correct': false,
      'errorMessage': 'int64 does not support missing values'
    })
  })
  it('should validate float64', () => {
    expect(validate.validate('hi', 'float64')).to.deep.equal({
      'correct': false,
      'errorMessage': 'hi is not a float'
    })
    expect(validate.validate('1.0', 'float64')).to.deep.equal({
      'correct': true,
      'errorMessage': ''
    })
    expect(validate.validate('1', 'float64')).to.deep.equal({
      'correct': true,
      'errorMessage': ''
    })
  })
  it('should validate bool', () => {
    expect(validate.validate('hi', 'bool')).to.deep.equal({
      'correct': false,
      'errorMessage': 'hi is not a bool, True or False expected'
    })
    expect(validate.validate('', 'bool')).to.deep.equal({
      'correct': false,
      'errorMessage': 'bool does not support missing values'
    })
    expect(validate.validate('True', 'bool')).to.deep.equal({
      'correct': true,
      'errorMessage': ''
    })
  })
})
