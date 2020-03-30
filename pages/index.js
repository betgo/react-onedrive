import { Button, Breadcrumb, List } from 'antd';
import getCofnig from 'next/config'
import { connect } from 'react-redux';
import Axios from 'axios';
import { LeftOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import PageLoading from '../components/PageLoading';
import MyList from '../components/view/List';


import './css/index.css'

const api = require('../lib/api')
const { publicRuntimeConfig } = getCofnig()

let cachedUserRepos
const isServer = typeof window === 'undefined'
const loading_Start_Action = { type: 'start' }
const loading_End_Action = { type: 'end' }

const Index = ({ user, userRepos,loading,handleLoadingStart,handleLoadingEnd }) => {

  const [rep, setRep] = useState([userRepos]);
  const [dep, setDep] = useState(0);
  const [arr, setArr] = useState([]);
  useEffect(() => {
    if (!isServer) {
      cachedUserRepos = userRepos
    }
    const timeout = setTimeout(() => {
      cachedUserRepos = null

    }, 1000 * 60 * 10)

  }, [cachedUserRepos]);



  const handleClick = async (name, e) => {
    e.preventDefault()
    var url = ''
    if (arr.length) {

      for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        url = url + '/' + element
      }
    }
    url = url + '/' + name
    const queryString = `/drive/root:${url}:/children?select=name,size,folder,@microsoft.graph.downloadUrl,lastModifiedDateTime`
    // loading({type:'start'})
    console.log(1)
    handleLoadingStart()
    const result = await Axios.get(queryString)
    handleLoadingEnd()
    if (result.status === 200) {
      rep.push(result.data.value)
      arr.push(name)
      setRep(rep)
      setDep(dep + 1)
      setArr(arr)
    }
    // console.log(arr)
    // console.log(result.data.value)
  }

  const handleBack = () => {
    console.log(arr);
    rep.pop()
    arr.pop()
    setRep(rep)
    setDep(dep - 1)
    setArr(arr)
  }
  const BreadcrumbList = (n) => {
    
    var items = []
    for (let index = 0; index < n; index++) {
      items.push(<Breadcrumb.Item>{arr[index]}</Breadcrumb.Item>)
    }
    return items
  }
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
     { loading.loading? <PageLoading />:null}
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        {
          BreadcrumbList(dep)
        }
      </Breadcrumb>
      <div className="site-layout-content">
        {/* <Button onClick={handleClick}>aaa</Button> */}
        {/* <span> {user.userPrincipalName}</span>
        <span> {user.displayName}</span> */}

        {/* {
          rep.map((repo, index) => (
            <div key={index}>{repo.name}</div>
          ))
        } */}
        <div className="header">
          <div className="pre">
            {
              dep ? <LeftOutlined style={{ fontSize: '20px' }} onClick={handleBack} /> : null
            }

          </div>
          <div className="title">名称</div>
          <div className="size">大小</div>
          <div className="download">下载</div>
        </div>
        <MyList repos={rep[dep]} next={handleClick} />

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
  if (isServer) {
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
      loading:state.loading
    }
  },
  function mapDispatchToProps(dispatch) {
    return {
      handleLoadingStart: () => dispatch(loading_Start_Action),
      handleLoadingEnd:  () => dispatch(loading_End_Action)
    }
  }
)(Index)