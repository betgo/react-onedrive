
import { useState, useCallback } from 'react'
import getCofnig from 'next/config'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'

import axios from 'axios'

import Link from 'next/link'
import {
  Button,
  Layout,
  Input,
  Avatar,
  Tooltip,
  Dropdown,
  Menu,
} from 'antd'

//import Container from './Container'

import { logout } from '../store/store'

const { Header, Content, Footer } = Layout

const { publicRuntimeConfig } = getCofnig()
import './css/Layout.css'

 function MyLayout({children}){
    return (
        <Layout>
            <Header></Header>
            <Content>{children}</Content>
            <Footer></Footer>
        </Layout>
        
    )
}

export default connect(function mapStateToProps(state){
    return{
        user:state.user
    }
} )(withRouter(MyLayout))