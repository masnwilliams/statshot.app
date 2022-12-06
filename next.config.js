const { login } = require('call-of-duty-api')
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

login(process.env.COD_SSO_TOKEN)

module.exports = nextConfig
