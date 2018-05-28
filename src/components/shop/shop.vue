<template>
    <div>
        <div class="section">
    <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/cart.html">购物车</a>
    </div>
</div>

<div class="section">
    <div class="wrapper">
        <div class="bg-wrap">
            <!--购物车头部-->
            <div class="cart-head clearfix">
                <h2>
                    <i class="iconfont icon-cart"></i>我的购物车</h2>
                <div class="cart-setp">
                    <ul>
                        <li class="first active">
                            <div class="progress">
                                <span>1</span>
                                放进购物车
                            </div>
                        </li>
                        <li>
                            <div class="progress">
                                <span>2</span>
                                填写订单信息
                            </div>
                        </li>
                        <li class="last">
                            <div class="progress">
                                <span>3</span>
                                支付/确认订单
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!--购物车头部-->
            <!--商品列表-->
            <div class="cart-box">
                <input id="jsondata" name="jsondata" type="hidden">
                <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                    <tbody>
                        <tr>
                            <th width="48" align="center">
                                <a>选择</a>
                            </th>
                            <th align="left" colspan="2">商品信息</th>
                            <th width="84" align="left">单价</th>
                            <th width="104" align="center">数量</th>
                            <th width="104" align="left">金额(元)</th>
                            <th width="54" align="center">操作</th>
                        </tr>
                        <tr v-for='item in shop' :key='item.id'>
                            <th width="48" align="center">
                                <el-switch
                                v-model="item.boolen"
                                active-color="#13ce66"
                                inactive-color="#555555">
                                </el-switch>
                            </th>
                            <th align="left" colspan="2">
                                <div class="xiangqing">
                                    <img :src="item.img_url" style="width:50px;height:50px;margin-right: 10px" alt="">
                                    <span>{{item.title}}</span>
                                </div>
                            </th>
                            <th width="84" align="left">{{item.sell_price}}</th>
                            <th width="104" align="center">{{item.buycount}}</th>
                            <th width="104" align="left">金额(元){{item.sell_price*item.buycount}}</th>
                            <th width="54" align="center">操作</th>
                        </tr>
                        <tr v-if='shop.length==0'>
                            <td colspan="10">
                                <div class="msg-tips">
                                    <div class="icon warning">
                                        <i class="iconfont icon-tip"></i>
                                    </div>
                                    <div class="info">
                                        <strong>购物车没有商品！</strong>
                                        <p>您的购物车为空，
                                            <a href="/index.html">马上去购物</a>吧！</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th align="right" colspan="8">
                                已选择商品
                                <b class="red" id="totalQuantity">{{getcount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                <span class="red">￥</span>
                                <b class="red" id="totalAmount">{{getprice}}</b>元
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!--/商品列表-->
            <!--购物车底部-->
            <div class="cart-foot clearfix">
                <div class="right-box">
                    <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                    <button class="submit" onclick="formSubmit(this, '/', '/shopping.html');">立即结算</button>
                </div>
            </div>
            <!--购物车底部-->
        </div>
    </div>
</div>
    </div>
</template>
<style>
    .xiangqing{
        display: flex;
        align-items: center;

    }
</style>

<script>
    // 导入转换本地存储的方法模块
    import {zhgs} from '../../locastagro/locastagro.js'

    // 导出实例化的vue对象
    export default{
        data(){
            return{
                shop:[]
            }
        },
        created(){
            this.getshoplist()
        },
        methods:{
            getshoplist(){
                const obj=zhgs();
                const arr=[];
                for(const key in obj){
                    arr.push(key)
                }
                let str=arr.join(',');

                const url='site/comment/getshopcargoods/'+str
                //发起请求
                this.$axios.get(url).then(res=>{
                    res.data.message.forEach(item => {
                        // 把本地数据赋值给获取到的数据渲染
                        item.buycount=obj[item.id];
                        item.boolen=true
                    });
                    this.shop=res.data.message
                })
            }
        },
        computed:{
            getcount(){
                let num=0;
                this.shop.forEach(item=>{
                    if(item.boolen){
                        num+=item.buycount
                    }
                })
                return num
            },
            getprice(){
                let num1=0;
                this.shop.forEach(item=>{
                    if(item.boolen){
                        num1+=item.buycount*item.sell_price
                    }
                })
                return num1
            },
        }
    }
</script>
