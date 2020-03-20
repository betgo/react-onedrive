
const Axios = require('axios')
const microsoft_base_url ='https://graph.microsoft.com/v1.0/me'


const Qs =require('qs')
const config = require('../config')

const { client_id, request_token_url, scope, client_secret,redirect_uri } = config.onedrive

//刷新token
async function fresh_token(refresh_token,ctx){
    const data = {
        client_id,
        grant_type: 'refresh_token',
        scope: scope,
        refresh_token,
        client_secret,
        redirect_uri
    }
    const result = await Axios({
        method: 'POST',
        url: request_token_url,
        data: Qs.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
    })
    if(result.status === 200 && (result.data && !result.data.error))
    {
        ctx.session.MICROSOFTAuth = result.data
        ctx.session.token_time = new Date()
    }
}


async function requestOnedrive(method,url,data,headers){
    return await Axios({
        method,
        url:`${microsoft_base_url}${url}`,
        data,
        headers,
    })
}
const isServer = typeof window === 'undefined'

async function request({method='GET',url,data={}},req,res) {
    if(!url) throw Error('url  invalid')
    if(isServer){
        const session = req.session
        const token_time = session.token_time
        const expires_in = session.MICROSOFTAuth.expires_in

        if(((new Date() -new Date(token_time))/1000 > expires_in ) )//超时刷新
        { 
            await fresh_token(session.MICROSOFTAuth.refresh_token,req)
            
        }
        const MICROSOFTAuth = session.MICROSOFTAuth || {}
        const headers = {}
        if (MICROSOFTAuth.access_token) {
            headers['Authorization'] = `${MICROSOFTAuth.token_type} ${
                MICROSOFTAuth.access_token
            }`
          }
          return await requestOnedrive(method,url,data,headers)
    }else{
        return await Axios({
            method,
            url: `${url}`,
            data,
          })
    }
}

module.exports = {
    requestOnedrive,
    request
}
