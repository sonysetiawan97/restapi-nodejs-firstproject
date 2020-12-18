import Vue from 'vue'
import VueCookie from 'vue-cookie';
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'HelloWorld',
            component: () => import('./components/HelloWorld.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./components/login/login.vue'),
        },
        {
            path: '/book',
            name: 'book',
            component: () => import('./components/book/list.vue'),
            beforeEnter: isLoggedIn
        }
    ]
})

function isLoggedIn(to, from, next) {
    if (!VueCookie.get('token')) {
        next({ path: '/login' })
    }
    next()
}

export default router