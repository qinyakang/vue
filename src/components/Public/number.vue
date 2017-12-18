<template>
  <div class="number">
      <div class="left" @click="add">+</div><div class="middle">{{count}}</div><div @click="sub" class="right">-</div>
  </div>
</template>
<script>
export default {
        data(){
            return{
                count:1
            }
        },
        created(){
            this.count=this.num?this.num:1
        },
        props:['stock','num'],
        methods:{
            add(){
                if(this.count>=this.stock){
                    return;
                }
                this.count++

                this.notify()
            },
            sub(){
                 if (this.count<2) {
                    return;
                }
                this.count--
                this.notify()
            },
            notify(){

                this.$emit('numberchange',this.count)
            }
        }

}
</script>
<style scoped>
.number{
    display: inline-block;
    text-align: center;
}
.left,
.middle,
.right{
    display: inline-block;
     width: 30px;
  height: 25px;
  border: 1px solid rgba(92, 92, 92, 0.5);
}
.number .middle {
  width: 40px;
  border-right: 0px;
  border-left: 0px;
}
</style>

