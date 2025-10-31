import './index.less';
import banner0 from '@/assets/images/home/banner-0.png';
import banner1 from '@/assets/images/home/banner-1.png';
import banner2 from '@/assets/images/home/banner-2.png';
import banner3 from '@/assets/images/home/banner-3.png';
import banner4 from '@/assets/images/home/banner-4.png';
import banner5 from '@/assets/images/home/banner-5.png';

const Home = () => {
    return (
        <div className="home">
            {/* 主体图片 */}
            <img src={banner0} alt="PLAUD 产品介绍" className="main-img" />
            <img src={banner1} alt="PLAUD 产品介绍" className="main-img" />
            <img src={banner2} alt="PLAUD 产品介绍" className="main-img" />
            <img src={banner3} alt="PLAUD 产品介绍" className="main-img" />
            <img src={banner4} alt="PLAUD 产品介绍" className="main-img" />
            <img src={banner5} alt="PLAUD 产品介绍" className="main-img" />

            {/* 底部横幅 */}
            <div className="footer-banner">
                <div className="footer-banner-left">
                    <p>Copyright@2025 深圳机智连接科技有限公司</p>
                    <p>
                        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">
                            粤ICP备2025405986号
                        </a>
                    </p>
                </div>
                <div className="footer-banner-right">
                    <p>反馈给 Plaud：<a href="mailto:support@plaud.cn">Support@plaud.cn</a></p>
                    <p>
                        <a href="https://app.plaud.cn/terms-service/user-agreement-cn.html" target="_blank" rel="noopener noreferrer">
                            用户协议
                        </a>
                        {' | '}
                        <a href="https://app.plaud.cn/terms-service/privacy-cn.html" target="_blank" rel="noopener noreferrer">
                            隐私政策
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home;
