<template>
<div class="mui-content">
<comment :id="id"></comment>
</div>
    
</template>
<script>
import comment from '../../Public/comment.vue'
export default {
    props:['id'],
    components:{
        comment
    }
}
</script>

