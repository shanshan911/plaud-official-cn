import { useState, useRef, useEffect } from 'react';
import './index.less';
// import banner0 from '@/assets/images/home/banner-0.png';
// import banner1 from '@/assets/images/home/banner-1.png';
// import banner2 from '@/assets/images/home/banner-2.png';
// import banner3 from '@/assets/images/home/banner-3.png';
// import banner4 from '@/assets/images/home/banner-4.png';
// import banner5 from '@/assets/images/home/banner-5.png';

import heroProduct from '@/assets/images/home/hero-product.png';
// 获奖徽章图片
import awards from '@/assets/images/home/awards.png';

// 放大人类智能 - 场景图片
import aiScene1 from '@/assets/images/home/aiScene1.png';
import aiScene2 from '@/assets/images/home/aiScene2.png';
import aiScene3 from '@/assets/images/home/aiScene3.png';
import aiScene4 from '@/assets/images/home/aiScene4.png';

// 各领域专业人士 - 场景图片
import professionalExecutive from '@/assets/images/home/professional-executive.png';
import professionalSales from '@/assets/images/home/professional-sales.png';
import professionalMedical from '@/assets/images/home/professional-medical.png';
import professionalLawyer from '@/assets/images/home/professional-lawyer.png';
import professionalEducator from '@/assets/images/home/professional-educator.png';
import professionalCreator from '@/assets/images/home/professional-creator.png';

// Plaud 产品系列图片
import productNotePro from '@/assets/images/home/product-note-pro.png';
import productNote from '@/assets/images/home/product-note.png';
import productNotePinS from '@/assets/images/home/product-notepin-s.png';


// plaud intelligence™ 图片
import plaudIntelligence1 from '@/assets/images/home/plaud-intelligence-1.png';
import plaudIntelligence2 from '@/assets/images/home/plaud-intelligence-2.png';
import plaudIntelligence3 from '@/assets/images/home/plaud-intelligence-3.png';
import plaudIntelligence4 from '@/assets/images/home/plaud-intelligence-4.png';
import plaudIntelligence5 from '@/assets/images/home/plaud-intelligence-5.png';


// 关注我们 - 图片
import logoPlaud from '@/assets/images/home/logoPlaud.png';
import channel from '@/assets/images/home/channel.png';
import jdQrCode from '@/assets/images/home/jd.png';
import tmQrCode from '@/assets/images/home/tm.jpg';
// 关注我们 - 二维码
import serviceQrCode from '@/assets/images/home/service-account.png';
import videoQrCode from '@/assets/images/home/video-account.png';

import androidQrCode from '@/assets/images/home/android.png';
import iosQrCode from '@/assets/images/home/ios.png';

// Tab 配置数据
const workSmarterTabs = [
    {
        id: 'capture',
        label: 'Capture',
        subtitle: 'Audio | Highlights | Text | Images',
        video: 'https://global.plaud.ai/cdn/shop/videos/c/vp/773473347c4a45959b60ccb8e97065c3/773473347c4a45959b60ccb8e97065c3.HD-720p-1.6Mbps-58423474.mp4?v=0', // 临时占位视频
    },
    {
        id: 'extract',
        label: 'Extract',
        subtitle: 'Transcription | Summary | Mind Map',
        video: '//global.plaud.ai/cdn/shop/videos/c/vp/1d9f8635d7124cd780f11dc84ca325ff/1d9f8635d7124cd780f11dc84ca325ff.HD-720p-2.1Mbps-58423031.mp4?v=0', // 临时占位视频
    },
    {
        id: 'utilize',
        label: 'Utilize',
        subtitle: 'Ask Plaud | AutoFlow | Integrate, Share & Export',
        video: '//global.plaud.ai/cdn/shop/videos/c/vp/27a928391db24f93a2b9270a2777e9d8/27a928391db24f93a2b9270a2777e9d8.HD-720p-1.6Mbps-58423030.mp4?v=0', // 临时占位视频
    },
];

// 通用视频播放组件 - 独立控制播放状态
const VideoPlayer = ({ src }: { src: string }) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(() => {});
            setIsPlaying(true);
        }
    }, [src]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="video-container">
            <video
                ref={videoRef}
                src={src}
                autoPlay
                muted
                loop
                playsInline
            />
            <button 
                className="play-pause-btn"
                onClick={togglePlay}
                aria-label={isPlaying ? '暂停' : '播放'}
            >
                {isPlaying ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10.5" stroke="currentColor" strokeWidth="1"/>
                        <rect x="8.5" y="7.5" width="2" height="9" rx="0.5" fill="currentColor"/>
                        <rect x="13.5" y="7.5" width="2" height="9" rx="0.5" fill="currentColor"/>
                    </svg>
                ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10.5" stroke="currentColor" strokeWidth="1"/>
                        <path d="M10 7.5V16.5L16 12L10 7.5Z" fill="currentColor"/>
                    </svg>
                )}
            </button>
        </div>
    );
};

const Home = () => {
    const [activeTab, setActiveTab] = useState('capture');
    const activeTabData = workSmarterTabs.find(tab => tab.id === activeTab);

    return (
        <div className="home">
            {/* 顶部横幅 */}
            <div className="hero-banner">
                <div className="hero-content">
                    <div className="hero-left">
                        <div className="hero-left-content">
                            <h2>全球畅销的AI纪要产品</h2>

                            <div className="stats">
                                <div className="stat-item">
                                    <div> <span className="stat-number">170+</span>
                                        <span className="stat-label">国家/地区</span></div>
                                    <span className="stat-desc">产品畅销全球</span>
                                </div>
                                <div className="stat-item">
                                    <div><span className="stat-number">1000+</span></div>
                                    <span className="stat-label">全球媒体推荐</span>
                                </div>
                            </div>

                            <div className="awards">
                                <img src={awards} alt="获奖徽章" />
                            </div>
                        </div>
                    </div>

                    <div className="hero-right">
                        <img className="product-showcase" alt="产品图片" src={heroProduct} />
                    </div>
                </div>
            </div>

            <div className="hero-banner-mobile">
                <div className="hero-content">
                    <h2>全球畅销的AI纪要产品</h2>
                    <div className="hero-content-desc">
                        <img className="product-showcase" alt="产品图片" src={heroProduct} />
                        <div className="stats">
                            <div className="stat-item">
                                <div>
                                    <span className="stat-number">170+</span>
                                    <span className="stat-label">国家/地区</span></div>
                                <span className="stat-desc">产品畅销全球</span>
                            </div>
                            <div className="stat-item">
                                <div><span className="stat-number">1000+</span></div>
                                <span className="stat-label">全球媒体推荐</span>
                            </div>
                        </div>
                        <div className="awards">
                            <img src={awards} alt="获奖徽章" />
                        </div>
                    </div>
                </div>
            </div>


            {/* 第二块：放大人类智能 */}
            <div className="section-ai-intelligence">
                <div className="section-container">
                    <div className="text-block">
                        <h2 >放大人类智能</h2>
                        <p className="section-description">
                            我们相信对话即智能。对话是智能的一种载体，它是思想的开端、决策制定和意义的分享之地，是对世界认知的投射。但过去这些智能从未被捕捉、被理解、更未能转化为正确的决策和实际行动。
                        </p>
                        <p className="section-description">
                            Plaud以“放大人类智能”为使命，致力于构建下一代智能基础设施与交互界面，旨在帮助用户从所听、所说、所见、所想中捕捉、提取和运用智能，成为全球专业人士最值得信赖的AI工作伙伴，全面提升生产力并创造更多价值。
                        </p>
                    </div>
                    <div className="image-grid-4">
                        <div className="grid-item">
                            <img src={aiScene1} alt="场景1" />
                        </div>
                        <div className="grid-item">
                            <img src={aiScene2} alt="场景2" />
                        </div>
                        <div className="grid-item">
                            <img src={aiScene3} alt="场景3" />
                        </div>
                        <div className="grid-item">
                            <img src={aiScene4} alt="场景4" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 第三块：各领域专业人士 */}
            <div className="section-professionals">
                <div className="section-container">
                    <h2 className="section-title-center">各领域专业人士值得信赖的AI工作伙伴<br />提升生产力和价值创造</h2>
                    <div className="image-grid-6">
                        <div className="grid-item">
                            <img src={professionalExecutive} alt="高管" />
                            <span className="grid-label">高管</span>
                        </div>
                        <div className="grid-item">
                            <img src={professionalSales} alt="销售人士" />
                            <span className="grid-label">销售人士</span>
                        </div>
                        <div className="grid-item">
                            <img src={professionalMedical} alt="医疗专业人士" />
                            <span className="grid-label">医疗专业人士</span>
                        </div>
                        <div className="grid-item">
                            <img src={professionalLawyer} alt="律师" />
                            <span className="grid-label">律师</span>
                        </div>
                        <div className="grid-item">
                            <img src={professionalEducator} alt="教育工作者" />
                            <span className="grid-label">教育工作者</span>
                        </div>
                        <div className="grid-item">
                            <img src={professionalCreator} alt="内容创作者" />
                            <span className="grid-label">内容创作者</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 第四块：Plaud 产品系列 */}
            <div className="section-products">
                <div className="section-container">
                    <h2 className="section-title-center"><span style={{ fontFamily: 'Jokker' }}>Plaud</span> 硬件产品系列<br />由 <span style={{ fontFamily: 'Jokker' }}>Plaud Intelligence™</span> 驱动</h2>


                    <div className="product-cards">
                        <div className='card-item'>
                           <img src={productNotePro} alt="Plaud Note Pro" />
                           <div className="button_cart">
                              <a className="button_back" href="https://detail.tmall.com/item.htm?id=964623891296" target='_blank'>
                                立即购买
                              </a>
                           </div>
                        </div>
                         <div className='card-item'>
                           <img src={productNote} alt="Plaud Note" />
                           <div className="button_cart">
                              <a className="button_back" href="https://detail.tmall.com/item.htm?id=963977914722" target='_blank'>
                                立即购买
                              </a>
                           </div>
                        </div>
                         <div className='card-item'>
                            <img src={productNotePinS} alt="Plaud NotePin S" />
                           <div className="button_cart">
                              <a className="button_back" href="https://detail.tmall.com/item.htm?id=965213262371" target='_blank'>
                                立即购买
                              </a>
                           </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* 第五块：Plaud Intelligence™ */}
            <div className="section-plaud-intelligence">
                <div className="section-container">
                    <h2 className="section-title-center" style={{ fontFamily: 'Jokker' }}>Plaud Intelligence™</h2>
                    <div className="product-cards">
                        <img src={plaudIntelligence1} alt="多模态输入" />
                        <img src={plaudIntelligence2} alt="精准转写" />
                        <img src={plaudIntelligence3} alt="多维总结" />
                        <img src={plaudIntelligence4} alt="ask plaud" />
                        <img src={plaudIntelligence5} alt="自动工作流" />
                    </div>
                </div>
            </div>

            <div className="section-work-smarter section-work-smarter-pc">
                <div className="section-container">
                    <h2 className="section-title-center">Work smarter, not harder</h2>
                    <p className="section-subtitle">Personalized AI note-taking enhances your productivity</p>
                    
                    <div className="tabs-container">
                        <div className="tabs-nav">
                            {workSmarterTabs.map(tab => (
                                <div
                                    key={tab.id}
                                    className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
                                    onMouseEnter={() => setActiveTab(tab.id)}
                                >
                                    {tab.label}
                                </div>
                            ))}
                        </div>
                        <div className="tab-subtitle">
                            {activeTabData?.subtitle}
                        </div>
                    </div>

                    <VideoPlayer key={activeTab} src={activeTabData?.video || ''} />
                </div>
            </div>

            <div className="section-work-smarter section-work-smarter-mobile">
                <div className="section-container">
                    <h2 className="section-title-center">Work smarter, not harder</h2>
                    <p className="section-subtitle">Personalized AI note-taking enhances your productivity</p>
                    
                    {workSmarterTabs.map(tab => (
                        <div key={tab.id} className={`mobile-video-block mobile-video-block-${tab.id}`}>
                            <h3 className="mobile-tab-label">{tab.label}</h3>
                            <p className="mobile-tab-subtitle">{tab.subtitle}</p>
                            <VideoPlayer src={tab.video} />
                        </div>
                    ))}
                </div>
            </div>

            {/* 第六块：关注我们 */}
            <div className="section-follow-us">
                <div className="section-container">
                    <div className="logo">
                        <img src={logoPlaud} alt="Plaud" />
                    </div>

                    <div className="follow-title">
                        <div>
                            <h3>FOLLOW US</h3>
                            <h4>关注我们</h4>
                        </div>
                    </div>



                    <div className='social-wrapper'>
                        <div className="shop-group">
                            <div className="shop-group-content">
                                <div className="shop-item">
                                    <div className="qr-placeholder">
                                        <img src={jdQrCode} alt="Android 下载" />
                                    </div>
                                    <a href='https://mall.jd.com/index-77096652.html?from=pc' className="text-link" target="_blank">京东旗舰店</a>
                                </div>
                                <div className="shop-item">
                                    <div className="qr-placeholder">
                                        <img src={tmQrCode} alt="iOS 下载" />
                                    </div>
                                    <a href='https://plaud.tmall.com/shop/view_shop.htm?spm=pc_detail.30350276.shop_block.dshopinfo.22ef7dd6ndSGiE'  className="text-link" target="_blank">天猫旗舰店</a>
                                </div>
                            </div>
                        </div>
                        <div><img src={channel} alt="channel" className="channel-list"/></div>
                        <div className="qr-section">

                            <div className="qr-group">
                                <div className="qr-item">
                                    <div className="qr-placeholder">
                                        <img src={serviceQrCode} alt="Plaud 服务号" />
                                    </div>
                                    <p>Plaud 服务号</p>
                                </div>
                                <div className="qr-item">
                                    <div className="qr-placeholder">
                                        <img src={videoQrCode} alt="Plaud 视频号" />
                                    </div>
                                    <p>Plaud 视频号</p>
                                </div>
                            </div>





                            <div className="qr-group">
                                <div className="qr-item">
                                    <div className="qr-placeholder">
                                        <img src={androidQrCode} alt="Android 下载" />
                                    </div>
                                    <p>Android 下载</p>
                                </div>
                                <div className="qr-item">
                                    <div className="qr-placeholder">
                                        <img src={iosQrCode} alt="iOS 下载" />
                                    </div>
                                    <p>ios 下载</p>
                                </div>
                            </div>
                        </div>
                    </div>
                      <div className="follow-title">

                         <div>
                            <h3>CONTACT US</h3>
                            <h4>联系我们</h4>
                        </div>
                        <div className="contact_us">
                            <div className="contact_item">
                                 <div>技术支持</div>
                                 <div>support@plaud.cn</div>
                            </div>
                            <div className="contact_item">
                                 <div>经销合作</div>
                                 <div>sales@plaud.cn</div>
                            </div>
                            <div className="contact_item">
                                 <div>市场合作</div>
                                 <div>marketing@plaud.cn</div>
                            </div>
                            <div className="contact_item">
                                 <div>媒体合作</div>
                                 <div>pr@plaud.cn</div>
                            </div>
                            <div className="contact_item">
                                 <div>礼品团购</div>
                                 <div>sales@plaud.cn</div>
                            </div>
                            <div className="contact_item">
                                 <div>供应商合作</div>
                                 <div>supplychain@plaud.cn</div>
                            </div>
                        </div>
                    </div>

                    <div>
                    温馨提示：如法律要求，请您在开始记录前先获得所有被记录者的同意。尊重隐私，遵守法律。
                    </div>
                    
                </div>
            </div>


            {/* 底部横幅 */}
            <div className="footer-banner">
              
                <div className="footer-banner-left">
                    <p>Copyright@2025 深圳机智连接科技有限公司</p>
                    <div>生成式人工智能服务登记号：Guangdong-Plaud-20251229S0027</div>
                    <p>
                        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">
                            粤ICP备2025405986号
                        </a>
                    </p>
                </div>
                <div className="footer-banner-right">
                    <p>反馈给 Plaud：<a href="mailto:support@plaud.cn">Support@plaud.cn</a></p>
                    <p>
                        <a href="https://app.plaud.cn/terms-service/business-principles.html" target="_blank" rel="noopener noreferrer">
                           商业准则
                        </a>
                        {' | '}
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
