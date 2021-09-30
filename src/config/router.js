import { lazy } from 'react'

const lazyLoader = (path) => lazy(() => import(/* webpackChunkName: "chunk-[request]" */ `../pages/${path}`))

/* 建议最多3级菜单 path 应该不需要参数*/
export const MENU = [
  {
    title: '人员管理',
    key: '人员管理',
    children: [
      {
        title: '用户',
        key: '用户',
        path: '/user',
        component: lazyLoader('user')
      },
      {
        title: '会员',
        key: '会员',
        path: '/member',
        component: lazyLoader('member')
      },
      {
        title: '名单管理',
        key: '名单管理',
        children: [
          {
            title: '黑名单',
            key: '黑名单',
            path: '/blacklist',
            component: lazyLoader('blacklist')
          },
          {
            title: '白名单',
            key: '白名单',
            path: '/whitelist',
            component: lazyLoader('whitelist')
          }
        ]
      }
    ]
  },
  {
    title: '商品管理',
    key: '商品管理',
    children: [
      {
        title: '手机',
        key: '手机',
        path: '/phone',
        component: lazyLoader('phone')
      },
      {
        title: '手表',
        key: '手表',
        path: '/watch',
        component: lazyLoader('watch')
      }
    ]
  }
]

export const ROUTE = (() => {
  const getTarget = ({ children, route }) => {
    let list = []
    children.forEach((child) => {
      if (child.children) {
        list = [...list, ...getTarget({ ...child, route: [...route, child.key] })]
      } else {
        list.push({ ...child, route: [...route, child.key] })
      }
    })
    return list
  }
  return MENU.map((item) => getTarget({ ...item, route: [item.key] })).flat()
})()
