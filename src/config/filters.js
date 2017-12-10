import Vue from 'vue';

import moment from 'moment';
Vue.filter('fmtdate',(data,time)=>
moment(data).format(time)
)