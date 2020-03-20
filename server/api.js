
const microsoft_base_url ='https://graph.microsoft.com/v1.0/me'

const {requestOnedrive} =require('../lib/api')

module.exports=server=>{

    server.use(async(ctx,next)=>{
        const path = ctx.path
        const method = ctx.method
        if(path.startsWith('/drive/')){
            console.log('server quest')
            console.log(ctx.request.body)
            const session  = ctx.session
            const MICROSOFTAuth = session && session.MICROSOFTAuth
            const headers = {}
            if(MICROSOFTAuth && MICROSOFTAuth.access_token){
                headers['Authorization'] = `${MICROSOFTAuth.token_type} ${MICROSOFTAuth.access_token}`
            }
            const result = await requestOnedrive(
                method,
                ctx.url,
                ctdx.request.body || {},
                headers
            )

            ctx.status = result.status
            ctx.body = result.body
        }else{
            await next()
        }

    })
}