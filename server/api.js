
const microsoft_base_url ='https://graph.microsoft.com/v1.0/me'

const {requestOnedrive,fresh_token} =require('../lib/api')

module.exports=server=>{

    server.use(async(ctx,next)=>{
        const path = ctx.path
        const method = ctx.method
        if(path.startsWith('/drive/')){
            console.log('server quest')
            console.log(path)
            const session  = ctx.session
            const MICROSOFTAuth = session && session.MICROSOFTAuth
            const headers = {}
            if(MICROSOFTAuth && MICROSOFTAuth.access_token){
                headers['Authorization'] = `${MICROSOFTAuth.token_type} ${MICROSOFTAuth.access_token}`
            }
            // fresh_token(ctx)
            const result = await requestOnedrive(
                method,
                ctx.url,
                ctx.request.body || {},
                headers
            )
                console.log(result.data)
            ctx.status = result.status
            ctx.body = result.data
            // ctx.redirect((ctx.session && ctx.session.urlBeforeOAuth) || '/')
        }else{
            await next()
        }

    })
}