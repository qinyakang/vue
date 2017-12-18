<template>
  <div class="mui-content">
      <div class="detail">
        <div class="top">
            <swipe :imgUrl='imgUrl'></swipe>
        </div>
      </div>
        <div class="sell">
            <h4>{{goods.title}}</h4>
            <div class="price">
                市场价：<s>${{goods.market_price}}</s> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销售价：<span>${{goods.sell_price}}</span>
                <div class="num">
                    购买数量：<number @numberchange="numberchange" :stock="goods.stock_quantity"></number>
                     <transition 
                        v-on:before-enter="beforeEnter"
                        v-on:enter="enter"
                        v-on:after-enter="afterEnter"
                        v-on:after-leave="afterLeave"
                     >
                    <div v-show="isShow" class="ball"></div>
                    </transition>
                </div>
                <div class="button">
                    <button class="mui-btn mui-btn-primary">立即购买</button>
                    <button @click="addcart" class="mui-btn mui-btn-danger">加入购物车</button>
                </div>
            </div>           
        </div>
         <div class="param">
                <h5>商品参数</h5>
                <div class="info">
                <p>商品编号：{{goods.goods_no}}</p>
                <p>库存情况：{{goods.stock_quantity}}件</p>
                <p>上架时间：{{goods.add_titme | fmtdate('YYYY-MM-DD HH:mm:ss')}}</p>
                </div>
            </div>
            <div class="footer">
            <a class="mui-btn mui-btn-primary mui-btn-outlined">图文介绍</a>
            <a @click="spack" class="mui-btn mui-btn-danger mui-btn-outlined">商品评论</a>
        </div>
  </div>
</template>
<script>
import swipe from '../../Public/swipe.vue'
import number from '../../Public/number.vue'
import vueObj from '../../../config/communication'
import {setData} from '../../../config/localstorageHelp'
export default {
        data(){
            return{
                imgUrl: 'getthumimages/' + this.id,
                goods:{},
                count:1,
                isShow:false
            }
        },
        created(){
            this.getgoods()
        },
        props:['id'],
        methods:{
            getgoods(){
                this.axios
                .get('goods/getinfo/' + this.id)
                .then((res)=>{
                    if (res.status === 200 && res.data.status === 0) {
                    if (res.data.message.length === 0) {
                        return;
                    }
                    this.goods = res.data.message[0]
                 } else {
                 console.log('服务器内部错误');
                    }
                    })
                    .catch((err) => {
                    console.error(err);
                })

            },
            spack(){
                this.$router.push({name: 'commentDetail', params: {id: this.id}})
            },
            numberchange(count){
                // console.log(count);
                this.count=count
            },
            addcart(){
                // this.isShow=true;
                // vueObj.$emit('updateBadge',this.count)
                this.isShow=!this.isShow

                setData({id:this.id,count:this.count})

            },
            beforeEnter(el){
                el.style.transform='translate(0,0)'
            },
            enter(el,done){
                // console.log('enter');

                let elX= el.getBoundingClientRect().left;
                let elY = el.getBoundingClientRect().top;

                let badge = document.querySelector('.mui-badge');
                let badgeX = badge.getBoundingClientRect().left;
                let badgeY = badge.getBoundingClientRect().top;

                let x = badgeX - elX;
                let y = badgeY - elY;

                el.style.transform = `translate(${x}px, ${y}px)`;
                done();
            },
             afterEnter: function (el) {
            this.isShow = false;
            },
             afterLeave: function () {
            // 当动画小球完全离开的时候，更新badge
            // 触发事件
            vueObj.$emit('updateBadge', this.count);
            }
        
        },
        components:{
            swipe,
            number
        }
        
}
</script>
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0
}
 .num {
        position: relative;
    }
    
    .ball {
        left: 115px;
        top: 3px;
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 10px;
        background-color: red;
        transition: all 0.5s linear;
        z-index: 1000;      
    }
     .mui-content {
        background-color: #fff;
    }
     .top,
    .sell,
    .param,
    .footer {
        border: 1px solid rgba(92, 92, 92, 0.7);
        border-radius: 5px;
        margin: 5px;
        padding: 10px;
    }
     .sell h4 {
        color: dodgerblue;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(92, 92, 92, 0.5);
    }
     .price,
    .num,
    .button {
        margin: 10px;
        font-size: 15px;
    }
    .param h5 {
        font-weight: bold;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(92, 92, 92, 0.5);
    }
     .info {
        margin-top: 10px;
        margin-left: 20px;
    }
     .info p {
        margin: 0;
    }
    
    .footer .mui-btn {
        width: 100%;
    }
    
    .footer .mui-btn-danger {
        margin-top: 10px;
    }
</style>
