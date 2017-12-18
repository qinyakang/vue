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

import shopDetail from '../components/Home/Buy/detail.vue'

import commentDetail from '../components/Home/Buy/comment.vue'
let router=new VueRouter({
    linkActiveClass: 'mui-active',
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',meta:{title:'首页'},component:home},
        {path:'/search',meta:{title:'搜索'},component:search},
        {path:'/shopcar',meta:{title:'购物车'},component:shopcar},
        {path:'/member',meta:{title:'会员'},component:member},

        {path: '/news', component: news},
        {path: '/buy', component: buy},
        {path: '/contact', component: contact},
        {path: '/feedback', component: feedback},
        {path: '/share', component: share},
        {path: '/video', component: video},

        {name:'newsDetail',path:'/news/:id',component:newsDetail,props:true},
        {name:'shareDetail',path:'/share/:id',component:shareDetail,props:true},
        {name:'shopDetail',path:'/buy/:id',component:shopDetail,props:true},
        {name:'commentDetail',path:'/buy/comment/:id',component:commentDetail,props:true}
    ]
});
router.afterEach((to,from)=>{
    if(to.meta.title){
        document.title=to.meta.title
    }else{
        document.title='It is me'
    }
})
export default router;