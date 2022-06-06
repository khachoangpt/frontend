const makeFactoryClass =
  (MockModel, RealModel) =>
  (env, opts = {}) => {
    if (env === 'local') {
      return new MockModel(opts)
    }
    return new RealModel(opts)
  }

export default makeFactoryClass
