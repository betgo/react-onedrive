
const MICROSOFT_OAUTH_URL ='https://login.microsoftonline.com/common/oauth2/v2.0/authorize'
const client_id = 'ec8c548a-a28e-4f38-879e-c3e2ae349454';
const scope = 'offline_access files.readwrite.all user.read'
const redirect_uri='http://localhost:3000/auth'
module.exports = {
    onedrive: {
      request_token_url: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
      client_id,
      client_secret:'L-/R=LAm3y]6h1tj06d=YIHmTi0d1AT-',
      scope,
      redirect_uri,
    },
    MICROSOFT_OAUTH_URL,
    OAUTH_URL: `${MICROSOFT_OAUTH_URL}?client_id=${client_id}&scope=${scope}&response_type=code&redirect_uri=${redirect_uri}`,
  }
  