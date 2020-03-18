import { Button } from 'antd';
import Link from 'next/link';
import getCofnig from 'next/config'
import { connect } from 'react-redux';

const { publicRuntimeConfig } = getCofnig()
const Index = ({ user }) => {


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

    <div>
      <span> {user.userPrincipalName}</span>
      <span> {user.displayName}</span>
    </div>

  )
}

Index.getInitialProps = async ({ ctx, reduxStore }) => {


  return {};
}


export default connect(
  function mapStateToProps(state) {
    return {
      user: state.user,
    }
  }
)(Index)