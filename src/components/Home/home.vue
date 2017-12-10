<template>
    <div class="mui-content">
       <!-- 轮播图  -->
       <swipe :imgUrl="img_url"></swipe>
    <!-- 九宫格   -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">


            <li v-for="item in menus" :key="item.url" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link :to="item.url">
                    <span class="mui-icon" :class="item.className"></span>
                    <div class="mui-media-body">{{item.title}}</div>
                </router-link>
            </li>
        </ul> 
    </div>  
</template>
<script>
import swipe from '../Public/swipe.vue'
    export default{
        data:function(){
            return{
                 img_url:'getlunbo',
                 menus:[]  
            }
        },
        created(){
         
            this.getmenus();
        },
         methods: {
            getmenus(){
            this.$http
            .get('getmenus')
            .then((res)=>{
            // console.log(res);
            if(res.status==200 && res.data.status==0){
            this.menus=res.data.message;
            }else{
            console.log('内部错误');
            }
            })
            .catch((err)=>{
            cosole.error(err)
            })
            }
        },
        components:{
            swipe
        }
}
</script>
<style scoped>
.mint-swipe{
    height: 250px;
}
.mint-swipe img{
    height: 100%;
    width: 100%;
}
.mui-grid-view.mui-grid-9{
    background-color: #fff;
}
.icon-news{
    width: 50px;
    height: 50px;
    background-image: url(../../../statics/images/menu1.png);
    background-size: cover;
}
.icon-share{
width: 50px;
    height: 50px;
    background-image: url(../../../statics/images/menu2.png);
    background-size: cover;
}
.icon-buy{
width: 50px;
    height: 50px;
    background-image: url(../../../statics/images/menu3.png);
    background-size: cover;
}
.icon-feedback{
width: 50px;
    height: 50px;
    background-image: url(../../../statics/images/menu4.png);
    background-size: cover;
}
.icon-video{
width: 50px;
    height: 50px;
    background-image: url(../../../statics/images/menu5.png);
    background-size: cover;
}
.icon-contact{
width: 50px;
    height: 50px;
    background-image: url(../../../statics/images/menu6.png);
    background-size: cover;
}
</style>
