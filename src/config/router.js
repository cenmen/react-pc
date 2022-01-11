import { lazy } from 'react'

const lazyLoader = (path) => lazy(() => import(/* webpackChunkName: "chunk-[request]" */ `../pages/${path}`))

/* 建议最多3级菜单 path 应该不需要参数 管理员应该拥有所有路由权限*/
export const MENU = [
  {
    title: '人员管理',
    key: '人员管理',
    auth: ['admin', 'normal'],
    children: [
      {
        title: '用户',
        key: '用户',
        path: '/user',
        component: lazyLoader('user'),
        auth: ['admin', 'normal']
      },
      {
        title: '会员',
        key: '会员',
        path: '/member',
        component: lazyLoader('member'),
        auth: ['admin', 'normal']
      },
      {
        title: '名单管理',
        key: '名单管理',
        auth: ['admin', 'normal'],
        children: [
          {
            title: '黑名单',
            key: '黑名单',
            path: '/blacklist',
            component: lazyLoader('blacklist'),
            auth: ['admin', 'normal']
          },
          {
            title: '白名单',
            key: '白名单',
            path: '/whitelist',
            component: lazyLoader('whitelist'),
            auth: ['admin']
          }
        ]
      }
    ]
  },
  {
    title: '商品管理',
    key: '商品管理',
    auth: ['admin'],
    children: [
      {
        title: '手机',
        key: '手机',
        path: '/phone',
        component: lazyLoader('phone'),
        auth: ['admin']
      },
      {
        title: '手表',
        key: '手表',
        path: '/watch',
        component: lazyLoader('watch'),
        auth: ['admin']
      }
    ]
  }
]

export const getRoute = (role = 'normal') => {
  const getTarget = ({ children, route }) => {
    let list = []
    children.forEach((child) => {
      if (child.children) {
        list = [...list, ...getTarget({ ...child, route: [...route, child.key] })]
      } else {
        if (child.auth.includes(role)) list.push({ ...child, route: [...route, child.key] })
      }
    })
    return list
  }
  return MENU.map((item) => getTarget({ ...item, route: [item.key] })).flat()
}

export const getMenu = (role = 'normal') => {
  const getTarget = (list) => {
    return list.map((item) => {
      if (item.children) {
        item.children = getTarget(item.children).filter((val) => !!val)
        return item
      } else {
        const value = item.auth.includes(role) ? item : null
        return value
      }
    })
  }
  return getTarget(MENU).filter(({ children }) => children.length > 0)
}