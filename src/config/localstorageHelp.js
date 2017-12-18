export function getData(){
    return JSON.parse(localStorage.getItem('goodslist')|| '[]')
}

export function setData(json){
    let data=getData()

    let hasData=false
    data.forEach(item => {
        if (item.id == json.id) {
          hasData = true;
          // 如果有， 累加
          item.count += json.count;
        } 
      });
    if(hasData!=true){
        data.push(json)
    }
    localStorage.setItem('goodslist',JSON.stringify(data))
}