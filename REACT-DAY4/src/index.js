import React from 'react';
import ReactDOM from 'react-dom';
import Banner from "./component/banner";

/*--这里导入的样式一般都是公共样式--*/
import './css/reset.min.css';

/*--准备轮播图需要的数据（真实项目中这部分数据是从服务器端获取的）--*/
const IMG_DATA = [{
    id: 1,
    title: '珠峰培训REACT框架课程开课啦',
    img: require('./images/1.jpg')
}, {
    id: 2,
    title: '独家讲解VUE源码，千万不要错过',
    img: require('./images/2.jpg')
}, {
    id: 3,
    title: '全面拥抱微信小程序，让APP做起来如此简单',
    img: require('./images/3.jpg')
}];

ReactDOM.render(<div>
    <Banner
        IMG_DATA={IMG_DATA}
        interval={1000}/>
</div>, window.root);

/*
 * 1、基于REACT框架使用WEBPACK打包，在JS（或者是JSX）中使用图片，我们不能直接的给SRC赋值相对的地址，这样编译完成后，是找不到资源文件的，需要把使用的图片通过REQUIRE导入进来，然后在赋值给其SRC
 *    <img src={require('../images/1.jpg')} alt=""/>
 *
 * 2、在JS中修改CSS3中过渡动画的样式
 *    div.style.transitionDuration = '0s';
      //...
      div.style.transitionDuration = '0.3s';

      第一条修改指令发送给浏览器,浏览器没有立即处理,它是等当前同步任务队列中的任务都完成后,才会进行处理;此时如果同步任务队列中出现了第二条类似的指令,最后浏览器以最后一次发送的指令为执行标准；想要解决这个问题，我们可以把第二次指令写成异步操作；
 */