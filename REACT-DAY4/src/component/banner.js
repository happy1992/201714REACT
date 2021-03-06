import React from 'react';
import PropTypes from 'prop-types';
import BannerFocus from "./banner-focus";
import BannerArrow from "./banner-arrow";
import '../css/banner.less';

class Banner extends React.Component {
    static defaultProps = {
        interval: 3000
    };

    static propTypes = {
        IMG_DATA: PropTypes.array.isRequired,
        interval: PropTypes.number
    };

    constructor(props) {
        super(props);

        this.state = {
            step: 1,
            speed: '.3s'
        };
    }

    componentWillMount() {
        let {IMG_DATA} = this.props;
        IMG_DATA.unshift(IMG_DATA[IMG_DATA.length - 1]);
        IMG_DATA.push(IMG_DATA[1]);
        this.IMG_DATA = IMG_DATA;
    }

    componentDidMount() {
        this.autoMove();
    }

    shouldComponentUpdate(nextProps, nextState) {
        let {step} = nextState,
            len = this.IMG_DATA.length;

        //=>右边界处理
        if (step >= len) {
            this.setState({
                step: 1,
                speed: '0s'
            }, () => {
                setTimeout(() => {
                    this.setState({
                        step: 2,
                        speed: '.3s'
                    });
                }, 0);
            });
            return false;
        }

        //=>左边界处理
        if (step <= -1) {
            this.setState({
                step: len - 2,
                speed: '0s'
            }, () => {
                setTimeout(() => {
                    this.setState({
                        step: len - 3,
                        speed: '.3s'
                    });
                }, 0);
            });
            return false
        }

        return true;
    }

    render() {
        let IMG_DATA = this.IMG_DATA,
            {step, speed} = this.state;

        //=>动态计算WRAPPER的样式
        const wrapperStyle = {
            width: `${IMG_DATA.length * 1000}px`,
            left: `${-step * 1000}px`,
            transition: speed
        };

        return <div className="container"
                    onMouseEnter={ev => {
                        clearInterval(this.autoTimer);
                    }}
                    onMouseLeave={ev => {
                        this.autoMove();
                    }}>
            {/*WRAPPER:轮播图部分*/}
            <div className="wrapper"
                 style={wrapperStyle}>
                {
                    IMG_DATA.map(({img, title}, index) => {
                        return <div className="slide" key={index}>
                            <img src={img} alt={title}/>
                        </div>;
                    })
                }
            </div>

            {/*FOCUS:焦点*/}
            <BannerFocus num={IMG_DATA.length - 2}
                         cur={step}/>

            {/*ARROW:箭头*/}
            <BannerArrow callback={this.handArrow} step={step}/>
        </div>;
    }

    //=>设置自动轮播图
    autoMove = () => {
        //=>把自动轮播图定时器的返回值挂载到实例上
        this.autoTimer = setInterval(() => {
            let step = this.state.step;
            step++;
            this.setState({step});
        }, this.props.interval);
    };

    //=>左右切换(传递给子组件的方法)
    handArrow = (newStep) => this.setState({step: newStep});
}

export default Banner;