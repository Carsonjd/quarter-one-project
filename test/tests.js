const expect = chai.expect


describe('evaluate', function(){
  it('is a function', function(){
    expect(evaluate).to.be.a('function')
  })
  it('divides numbers', function(){
    expect(evaluate())
  })
})
