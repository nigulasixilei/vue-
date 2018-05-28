// 创建本地存储的键名
const key='goods'

// 导出获取本地存储的数据的方法
export const getnumloca=()=>{
    const obj=zhgs();
    let num1=0;
    for(const key in obj){
        num1+=obj[key]
    }
    // 返回购物总数
    return num1
}

// 把获取的本地数据格式转换成对象
export const zhgs=()=>{
    return JSON.parse(localStorage.getItem(key) || '{}')
}

// 导出添加本地数据的方法
export const addnumloca=(goods)=>{
    const obj=zhgs()
    if(obj[goods.id]){
        obj[goods.id]+=goods.num2
    }else{
        obj[goods.id]=goods.num2
    }
    // 把本地存储转换成id为属性数量为值的json对象
    localStorage.setItem(key,JSON.stringify(obj))
    // 返回购物总数
    return getnumloca()
}