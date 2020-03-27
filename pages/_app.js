import App, {Container}from 'next/app'

import 'antd/dist/antd.css'
import Router from 'next/router'
import { Provider } from 'react-redux'
import Layout from '../components/Layout'
import WithRedux from '../lib/with_redux'
import PageLoading from '../components/PageLoading';
class MyApp extends App{


    static async getInitialProps(ctx) {
        const { Component  } = ctx
        console.log('app init')
        let pageProps = {}
        if (Component.getInitialProps) {
          pageProps = await Component.getInitialProps(ctx)
        }
        return {
          pageProps,
        }
      }
      render() {
        const { Component, pageProps,reduxStore } = this.props
        console.log(reduxStore)
        return (
          <Container>
            <Provider store={reduxStore}>
            {this.state.loading ? <PageLoading /> : null}
                <Layout>
                   <Component {...pageProps} />
                </Layout>
            </Provider>
          </Container>
        )
      }
}

export default WithRedux(MyApp)