import React, { useEffect, useState, Suspense } from 'react'
import { HashRouter as Router, Route, Switch, useLocation } from 'react-router-dom'
import axios from 'axios'
import { Breadcrumb } from 'antd'
import css from 'styled-jsx/css'
import { getMenu, getRoute } from '../config/router'
import Sider from '../components/sider'
import api from '../api/index'
import Home from './homepage'
import Login from './login'

const Main = () => {
  const TOTAL = getRoute('admin')
  const location = useLocation()
  const [breads, setBreads] = useState(null)
  const [route, setRoute] = useState([])
  const [menu, setMenu] = useState([])
  const [isLogin, setIsLogin] = useState(true)

  useEffect(() => {
    const { route } = TOTAL.find((val) => val.path.includes(location.pathname))
    setBreads(route)
  }, [location])

  useEffect(() => {
    // 添加响应拦截器
    axios.interceptors.response.use(
      (res) => res,
      (err) => {
        // 超出 2xx 范围的状态码都会触发该函数。
        if (err.message.includes('401')) setIsLogin(false)
        throw err
      }
    )
    init()
  }, [])

  const init = async () => {
    try {
      const role = await api.role()
      if (!role) throw new Error("==> [can't find the role]")
      setRoute(getRoute(role))
      setMenu(getMenu(role))
      setIsLogin(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container">
      {!isLogin ? (
        <Login
          onSuccess={() => {
            init()
          }}
        ></Login>
      ) : (
        <>
          <div className="sider-container">
            <div className="logo">I&apos;m logo</div>
            <div className="menu-container">
              <Sider route={menu} current={breads}></Sider>
            </div>
          </div>
          <div className="main-container">
            {breads && (
              <div className="header">
                <Breadcrumb>
                  {breads.map((val, index) => (
                    <Breadcrumb.Item key={index}>{val}</Breadcrumb.Item>
                  ))}
                </Breadcrumb>
              </div>
            )}
            <div className="main-content">
              <Suspense fallback={<p>加载中...</p>}>
                <Switch>
                  <Route exact path="/" component={Home} />
                  {route.map((val) => (
                    <Route exact path={val.path} component={val.component} key={val.key} />
                  ))}
                </Switch>
              </Suspense>
            </div>
          </div>
        </>
      )}
      <style jsx>{styles}</style>
    </div>
  )
}

export default () => {
  return (
    <Router>
      <Main></Main>
    </Router>
  )
}

const styles = css`
  .container {
    display: flex;
  }
  .sider-container {
    background: #001529;
    min-height: 100vh;
    width: 12vw;
  }
  .logo {
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    font-weight: bold;
    color: #ffffff;
  }
  .main-container {
    width: 88vw;
    margin: 0px 10px;
  }
  .header {
    background: #fafafa;
    min-height: 60px;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    display: flex;
    align-items: center;
  }
  .main-content {
    width: 100%;
  }
`
