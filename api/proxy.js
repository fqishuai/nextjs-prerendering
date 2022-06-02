const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (req, res) => {
  let destination = '';
  if (req.url.startsWith('/api')) {
    destination = 'http://localhost:3000'
  }
  createProxyMiddleware({
    target: destination,
    changeOrigin: true,
    pathRewrite: {
      '^/api/': '/'
    }
  })(req, res)
}