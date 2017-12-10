import Vue from 'vue';
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import home from '../components/Home/home.vue';
import search from '../components/Search/search.vue';
import shopcar from '../components/Shopcar/shopcar.vue';
import member from '../components/Member/member.vue';

import news from '../components/Home/News/news.vue';
import buy from '../components/Home/Buy/buy.vue';
import contact from '../components/Home/contact/contact.vue';
import feedback from '../components/Home/feedback/feedback.vue';
import share from '../components/Home/share/share.vue';
import video from '../components/Home/video/video.vue';

import newsDetail from '../components/Home/News/detail.vue' 

import shareDetail from '../components/Home/Share/detail.vue'

let router=new VueRouter({
    linkActiveClass: 'mui-active',
    routes:[
        {path:'/home',component:home},
        {path:'/search',component:search},
        {path:'/shopcar',component:shopcar},
        {path:'/member',component:member},

        {path: '/news', component: news},
        {path: '/buy', component: buy},
        {path: '/contact', component: contact},
        {path: '/feedback', component: feedback},
        {path: '/share', component: share},
        {path: '/video', component: video},

        {name:'newsDetail',path:'/news/:id',component:newsDetail,props:true},
        {name:'shareDetail',path:'/share/:id',component:shareDetail,props:true}
    ]
});

export default router;