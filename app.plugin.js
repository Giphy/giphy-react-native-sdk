const withGiphyRNSdk = (config) => {
  if (!config.ios) config.ios = {}
  if (!config.ios.infoPlist) config.ios.infoPlist = {}

  return config
}

module.exports = withGiphyRNSdk
