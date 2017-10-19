import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
import homeTap from '@/components/home/homeTap'
import homeHeader from '@/components/home/homeHeader'
import kefu from '@/components/kefu'
import userMes from '@/components/home/common/userMes/selfMes'
import auth from '@/components/home/common/userMes/authenthcation/auth'
import login from '@/components/user/login'
import changePssWord from '@/components/home/common/userMes/changePassWord'
import changeUserMes from '@/components/home/common/userMes/changeUserMes'
import voucher from '@/components/home/common/shopVoucher/voucher'
import wallet from '@/components/home/common/wallet/wallet'
import order from '@/components/home/common/order/order'
import orderMes from '@/components/home/common/order/orderMes'
import mesControl from  '@/components/home/common/IMmessage/messageControl'
Vue.use(Router)
export default new Router({
    routes: [
        {
            path: '/home',
            name: 'home',
            component: home,
            children: [
                {
                    path: 'kefu',
                    name: 'kefu',
                    component: kefu,
                },
                {
                    path: 'userMes',
                    name: 'userMes',
                    component: userMes,
                },
                {
                    path: 'auth',
                    name: 'auth',
                    component: auth
                },
                {
                    path: 'changePssWord',
                    name: 'changePssWord',
                    component: changePssWord
                },
                {
                    path: 'changeUserMes',
                    name: 'changeUserMes',
                    component: changeUserMes
                },
                {
                    path: 'voucher',
                    name: 'voucher',
                    component: voucher
                },
                {
                    path: 'wallet',
                    name: 'wallet',
                    component: wallet
                },
                {
                    path: 'order',
                    name: 'order',
                    component: order
                },
                {
                    path: 'orderMes',
                    name: 'orderMes',
                    component: orderMes
                },
                {
                    path: 'mesControl',
                    name: 'mesControl',
                    component: mesControl
                }
            ]
        },
        {
            path: '/',
            name: 'login',
            component: login,
        },
        {
            path:'*', redirect: '/login'
        }
    ],
    linkActiveClass:"active"
})
