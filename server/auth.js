const axios = require('axios')
const Qs =require('qs')
const config = require('../config')

const { client_id, request_token_url, scope, client_secret,redirect_uri } = config.onedrive

module.exports = server => {
    server.use(async (ctx, next) => {
        if (ctx.path === '/auth') {
            console.log('auth', ctx.query)
            const code = ctx.query.code
            if (!code) {
                console.log('no code exist!')
                return
            }
            const data = {
                client_id,
                grant_type: 'authorization_code',
                scope: scope,
                code,
                client_secret,
                redirect_uri
            }
            const result = await axios({
                method: 'POST',
                url: request_token_url,
                data: Qs.stringify(data),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
            })

            console.log(result.status, result.data)

            if (result.status === 200 && (result.data && !result.data.error)) {
                ctx.session.MICROSOFTAuth = result.data
                const { access_token, token_type,refresh_token } = result.data
                const userInfoResp = await axios({
                    method: 'GET',
                    url: 'https://graph.microsoft.com/v1.0/me',
                    headers: {
                        Authorization: `${token_type} ${access_token}`,
                    },
                })

                // console.log(userInfoResp.data)
                ctx.session.userInfo = userInfoResp.data
                ctx.redirect((ctx.session && ctx.session.urlBeforeOAuth) || '/')
                ctx.session.urlBeforeOAuth = ''
            } else {
                const errorMsg = result.data && result.data.error
                ctx.body = `request token failed ${errorMsg}`
            }
        } else {
            await next()
          }
        }
    )
}