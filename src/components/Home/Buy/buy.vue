<template>
    <div ref="muicontent" class="mui-content">
      <mt-loadmore :autoFill="false" @bottom-status-change="statusChange" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <ul class="mui-table-view mui-grid-view">
        <li v-for="item in goodslist" :key="item.id" class="mui-table-view-cell mui-media mui-col-xs-6">
            <router-link v-bind="{to:'/buy/'+item.id}">
                <img class="mui-media-object" :src="item.img_url">
                <div class="mui-media-body">{{ item.title }}</div>
            </router-link>
            <div class="bottom">
                <h6>
                    <span>￥{{ item.sell_price }}</span>
                    <s>￥{{ item.market_price }}</s>
                </h6>
                <div class="sell">
                    <span>热卖中</span>
                    <span>剩余{{ item.stock_quantity }}件</span>
                </div>
            </div>     
        </li>
      </ul> 
      </mt-loadmore>
    </div>
        
</template>

<script>
    export default {
        data() {
            return {
              goodslist: [],
              allLoaded:false,
              pageindex:1
            }
        },
        created() {
          this.getgoods();
        },
        mounted(){
          let height=document.documentElement.clientHeight;
          console.log(this.$refs);
          // this.$refs.muicontent.style.height=height+'px'
          this.$refs.muicontent.style.height=height+'px';
         
        },
        methods: {
          getgoods() {
            this.axios
              .get('getgoods?pageindex='+this.pageindex)
              .then((res) => {
                if (res.status === 200 && res.data.status === 0) {
                  if(res.data.message.length==0){
                    this.allLoaded = true;
                  }
                  this.goodslist = this.goodslist.concat(res.data.message);
                  this.$refs.loadmore.onBottomLoaded();
                }
              })
              .catch((err) => {
                console.error(err);
              })
          },
          loadBottom() {
            // console.log(123);
            // this.allLoaded = true;// 若数据已全部获取完毕
            this.pageindex++
            this.getgoods()
            
            },
            statusChange(status){
              console.log(status);
            }
        }
    }
</script>

<style scoped>
    .mui-table-view:before {
        display: none;
    }
    
    .mui-table-view:after {
        display: none;
    }
    
    .mui-content>.mui-table-view:first-child {
        margin-top: 0px;
    }
    
    .mui-table-view.mui-grid-view .mui-table-view-cell {
        margin-right: 0px;
        padding: 0px;
    }
    
    .mui-table-view.mui-grid-view {
        padding: 5px;
    }
    
    .mui-table-view-cell {
        border: 1px solid rgba(92, 92, 92, 0.5);
        box-shadow: 0 0 4px #666;
        padding: 4px;
        margin-top: 5px;
        margin-left: 5px;
        width: 48%;
    }
    
    .mui-table-view-cell img {
        width: 100%;
    }
    
    .mui-table-view-cell:after {
        display: none;
    }
    
    .mui-table-view-cell>a {
        margin: 0;
    }
    
    .mui-table-view.mui-grid-view .mui-table-view-cell>a:not(.mui-btn) {
        margin: 0;
        margin-bottom: 5px;
        text-align: left;
        color: #000;
    }
    
    .bottom {
        text-align: left;
        background-color: rgba(92, 92, 92, 0.1);
        padding: 5px;
    }
    
    .bottom>h6>span {
        color: red;
        font-size: 14px;
        margin-right: 20px;
    }
    
    .bottom>.sell {
        margin-top: 15px;
        color: rgba(92, 92, 92, 0.8);
        font-size: 13px;
        display: flex;
        justify-content: space-between;
    }
</style>


