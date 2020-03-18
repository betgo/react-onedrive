import { Component } from "react";
import createstore  from "../store/store";

const isServer = typeof window === 'undefined'
const __NEXT_REUDX_STORE__ = '__NEXT_REUDX_STORE__'
// 服务端:创建新store 客户端:获取store  使store同步
function getOrCreateStore(initialState){
        if(isServer){
            return createstore(initialState)
        }
        if (!window[__NEXT_REUDX_STORE__]) {
            window[__NEXT_REUDX_STORE__] = createstore(initialState)
          }
          return window[__NEXT_REUDX_STORE__]
}

export default Comp =>{
    class WithReduxApp extends Component{
        constructor(props){
            super(props)
            this.reduxStore = getOrCreateStore(props.initialReduxState)
        }

        render(){
            const {Component, pageProps,...rest} = this.props
            return(
                <Comp  
                Component={Component}
                pageProps={pageProps}
                {...rest}
                reduxStore={this.reduxStore}
                >

                </Comp>
            )
        }
    }

    WithReduxApp.getInitialProps = async ctx=>{
        let reduxStore
        if (isServer) {
            const { req } = ctx.ctx

            const session = req.session

            if (session && session.userInfo) {
              reduxStore = getOrCreateStore({
                user: session.userInfo,
              })
            } else {
              reduxStore = getOrCreateStore()
            }
          } else {
            reduxStore = getOrCreateStore()
          }
      
          ctx.reduxStore = reduxStore
      
          let appProps = {}
          if (typeof Comp.getInitialProps === 'function') {
            appProps = await Comp.getInitialProps(ctx)
          }
      
          return {
            ...appProps,
            initialReduxState: reduxStore.getState(),
          }
        }
      
        return WithReduxApp
    
}