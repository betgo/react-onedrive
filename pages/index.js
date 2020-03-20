import { Button, Breadcrumb } from 'antd';
import Link from 'next/link';
import getCofnig from 'next/config'
import { connect } from 'react-redux';
import Axios from 'axios';
import {useEffect} from 'react';

import './css/index.css'

const api = require('../lib/api')
const { publicRuntimeConfig } = getCofnig()

let cachedUserRepos
const isServer = typeof window === 'undefined'
const Index = ({ user, userRepos }) => {


  useEffect(() => {
    if (!isServer) {
      cachedUserRepos = userRepos
    }
    const timeout = setTimeout(() => {
      cachedUserRepos = null
      cachedUserStaredRepos = null
    }, 1000 * 60 * 10)

  }, [cachedUserRepos]);

  if (!user || !user.id)
    return (
      <>
        <div className="root">
          <p>亲，您还没有登录哦~</p>
          <Button type="primary" href={publicRuntimeConfig.OAUTH_URL}>登录</Button>
        </div>
        <style jsx>
          {` 
         .root{
            height:400px;
            display:flex;
            flex-direction: column;
            justify-content:center;
            align-items:center;
            
          }`
          }
        </style>
      </>
    )

  return (

    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-content">
        <span> {user.userPrincipalName}</span>
        <span> {user.displayName}</span>
        {
          userRepos.map((repo, index) => (
            <div key={index}>{repo.name}</div>
          ))
        }
      </div>

    </>

  )
}

Index.getInitialProps = async ({ ctx, reduxStore }) => {

  // const result = await Axios.get('/drive/root/children?select=name,size,folder,@microsoft.graph.downloadUrl,lastModifiedDateTime')
  // .then(res=>console.log(res))
  const user = reduxStore.getState().user
  if (!user || !user.id) {
    return {
      isLogin: false,
    }
  }

  if (!isServer) {

    console.log('浏览器')
    if (cachedUserRepos) {
      return {
        userRepos: cachedUserRepos,
      }
    }
  }
  if(isServer){
    console.log('服务器')
  }

  const userRepos = await api.request(
    {
      url: '/drive/root/children?select=name,size,folder,@microsoft.graph.downloadUrl,lastModifiedDateTime',
    },
    ctx.req,
    ctx.res,
  )
  return {
    isLogin: true,
    userRepos: userRepos.data.value
  };
}


export default connect(
  function mapStateToProps(state) {
    return {
      user: state.user,
    }
  }
)(Index)