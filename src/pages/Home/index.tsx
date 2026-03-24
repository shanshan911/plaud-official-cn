import { useState, useRef, useEffect, memo, useCallback, useMemo } from 'react';
import './index.less';

// 首屏关键图片 - 立即加载
import heroProduct from '@/assets/images/home/hero-product.png';
import awards from '@/assets/images/home/awards.png';

// 非首屏图片 - 使用原生 loading="lazy"
import aiScene1 from '@/assets/images/home/aiScene1.png';
import aiScene2 from '@/assets/images/home/aiScene2.png';
import aiScene3 from '@/assets/images/home/aiScene3.png';
import aiScene4 from '@/assets/images/home/aiScene4.png';

import professionalExecutive from '@/assets/images/home/professional-executive.png';
import professionalSales from '@/assets/images/home/professional-sales.png';
import professionalMedical from '@/assets/images/home/professional-medical.png';
import professionalLawyer from '@/assets/images/home/professional-lawyer.png';
import professionalEducator from '@/assets/images/home/professional-educator.png';
import professionalCreator from '@/assets/images/home/professional-creator.png';

import productNotePro from '@/assets/images/home/product-note-pro.png';
import productNote from '@/assets/images/home/product-note.png';
import productNotePinS from '@/assets/images/home/product-notepin-s.png';

import plaudIntelligence1 from '@/assets/images/home/plaud-intelligence-1.png';
import plaudIntelligence2 from '@/assets/images/home/plaud-intelligence-2.png';
import plaudIntelligence3 from '@/assets/images/home/plaud-intelligence-3.png';
import plaudIntelligence4 from '@/assets/images/home/plaud-intelligence-4.png';
import plaudIntelligence5 from '@/assets/images/home/plaud-intelligence-5.png';

import logoPlaud from '@/assets/images/home/logoPlaud.png';
import channel from '@/assets/images/home/channel.png';
import jdQrCode from '@/assets/images/home/jd.png';
import tmQrCode from '@/assets/images/home/tm.jpg';
import serviceQrCode from '@/assets/images/home/service-account.png';
import videoQrCode from '@/assets/images/home/video-account.png';
import androidQrCode from '@/assets/images/home/android.png';
import iosQrCode from '@/assets/images/home/ios.png';

// 安全认证数据
const securityCerts = [
    {
        id: 'en18031',
        title: 'EN 18031',
        subtitle: 'Compliant',
        description: 'Meets European cybersecurity standards for secure wireless communication.',
        icon: 'en18031',
    },
    {
        id: 'iso27001',
        title: 'ISO 27001',
        subtitle: 'Compliant',
        description: 'Recognized worldwide for information security. Protects your data through rigorous controls that maintain confidentiality, integrity, and availability.',
        icon: 'iso27001',
    },
    {
        id: 'iso27701',
        title: 'ISO 27701',
        subtitle: 'Compliant',
        description: 'Global privacy management standard. Ensures personal data is handled responsibly, transparently, and in alignment with GDPR.',
        icon: 'iso27701',
    },
    {
        id: 'gdpr',
        title: 'GDPR',
        subtitle: 'Compliant',
        description: "Rigorous privacy protections that keep your data in line with Europe's strictest regulations.",
        icon: 'gdpr',
    },
    {
        id: 'soc2',
        title: 'SOC 2',
        subtitle: 'Compliant',
        description: 'Independently verified controls that meet industry standards for security, availability, and confidentiality.',
        icon: 'soc2',
    },
];

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

// 通用视频播放组件 - 优化切换不闪烁
const VideoPlayer = memo(({ src, isActive = true }: { src: string; isActive?: boolean }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [userPaused, setUserPaused] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    // 根据 isActive 控制播放/暂停
    useEffect(() => {
        if (videoRef.current) {
            if (isActive && !userPaused) {
                videoRef.current.play().catch(() => {});
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    }, [isActive, userPaused]);

    const togglePlay = useCallback(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
                setUserPaused(true);
            } else {
                videoRef.current.play();
                setUserPaused(false);
            }
            setIsPlaying(!isPlaying);
        }
    }, [isPlaying]);

    return (
        <div className="video-container">
            <video
                ref={videoRef}
                src={src}
                muted
                loop
                playsInline
                preload="auto"
            />
            <button 
                className="play-pause-btn"
                onClick={togglePlay}
                aria-label={isPlaying ? '暂停' : '播放'}
                type="button"
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
});

// 认证徽章图标组件 - memo 优化
const CertIcon = memo(({ type }: { type: string }) => {
    switch (type) {
        case 'en18031':
            return (
                <div className="cert-icon cert-icon-en18031">
                    <svg viewBox="0 0 80 80" fill="none">
                        <circle cx="40" cy="40" r="36" fill="#E8F5E9" stroke="#4CAF50" strokeWidth="2"/>
                        <text x="40" y="36" textAnchor="middle" fill="#2E7D32" fontSize="10" fontWeight="bold">EN</text>
                        <text x="40" y="50" textAnchor="middle" fill="#2E7D32" fontSize="12" fontWeight="bold">18031</text>
                    </svg>
                </div>
            );
        case 'iso27001':
            return (
                <div className="cert-icon cert-icon-iso">
                    <div className="sensiba-badge">Sensiba</div>
                    <svg viewBox="0 0 80 80" fill="none">
                        <circle cx="40" cy="40" r="36" fill="#E3F2FD" stroke="#1976D2" strokeWidth="2"/>
                        <text x="40" y="30" textAnchor="middle" fill="#1565C0" fontSize="8">ISO/IEC 27001</text>
                        <text x="40" y="42" textAnchor="middle" fill="#1565C0" fontSize="7">Certified</text>
                        <path d="M32 52 L40 58 L48 52 L48 46 L40 40 L32 46 Z" fill="#1976D2"/>
                    </svg>
                </div>
            );
        case 'iso27701':
            return (
                <div className="cert-icon cert-icon-iso">
                    <div className="sensiba-badge">Sensiba</div>
                    <svg viewBox="0 0 80 80" fill="none">
                        <circle cx="40" cy="40" r="36" fill="#FFF3E0" stroke="#FF9800" strokeWidth="2"/>
                        <text x="40" y="30" textAnchor="middle" fill="#E65100" fontSize="8">ISO/IEC 27701</text>
                        <text x="40" y="42" textAnchor="middle" fill="#E65100" fontSize="7">Certified</text>
                        <path d="M32 52 L40 58 L48 52 L48 46 L40 40 L32 46 Z" fill="#FF9800"/>
                    </svg>
                </div>
            );
        case 'gdpr':
            return (
                <div className="cert-icon cert-icon-gdpr">
                    <svg viewBox="0 0 80 80" fill="none">
                        <circle cx="40" cy="40" r="36" fill="#1A237E"/>
                        <circle cx="40" cy="40" r="28" fill="#283593"/>
                        <text x="40" y="44" textAnchor="middle" fill="#FFC107" fontSize="14" fontWeight="bold">GDPR</text>
                        {[...Array(12)].map((_, i) => (
                            <circle key={i} cx={40 + 32 * Math.cos((i * 30 - 90) * Math.PI / 180)} cy={40 + 32 * Math.sin((i * 30 - 90) * Math.PI / 180)} r="2" fill="#FFC107"/>
                        ))}
                    </svg>
                </div>
            );
        case 'soc2':
            return (
                <div className="cert-icon cert-icon-soc">
                    <svg viewBox="0 0 80 80" fill="none">
                        <circle cx="40" cy="40" r="36" fill="#E3F2FD" stroke="#64B5F6" strokeWidth="2"/>
                        <text x="40" y="38" textAnchor="middle" fill="#1565C0" fontSize="16" fontWeight="bold">SOC</text>
                        <text x="40" y="54" textAnchor="middle" fill="#1565C0" fontSize="14" fontWeight="bold">2</text>
                    </svg>
                </div>
            );
        default:
            return null;
    }
});

// 安全认证轮播组件 - 无限循环 + 性能优化
const SecurityCarousel = memo(({ isMobile = false }: { isMobile?: boolean }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const carouselRef = useRef<HTMLDivElement>(null);
    const itemsPerView = isMobile ? 2 : 4.5;
    const totalItems = securityCerts.length;
    
    // 使用 useMemo 缓存扩展数组
    const extendedCerts = useMemo(() => 
        [...securityCerts, ...securityCerts, ...securityCerts], 
        []
    );

    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => {
            setCurrentIndex(prev => prev + 1);
        }, 3000);
        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    // 处理无限循环的边界跳转
    useEffect(() => {
        if (currentIndex >= totalItems * 2) {
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(totalItems);
            }, 500);
            setTimeout(() => {
                setIsTransitioning(true);
            }, 550);
        } else if (currentIndex < totalItems) {
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(totalItems + (currentIndex % totalItems));
            }, 500);
            setTimeout(() => {
                setIsTransitioning(true);
            }, 550);
        }
    }, [currentIndex, totalItems]);

    // 初始化到中间位置
    useEffect(() => {
        setIsTransitioning(false);
        setCurrentIndex(totalItems);
        setTimeout(() => {
            setIsTransitioning(true);
        }, 50);
    }, [totalItems]);

    const handlePrev = useCallback(() => {
        setIsAutoPlaying(false);
        setCurrentIndex(prev => prev - 1);
    }, []);

    const handleNext = useCallback(() => {
        setIsAutoPlaying(false);
        setCurrentIndex(prev => prev + 1);
    }, []);

    const handleMouseEnter = useCallback(() => setIsAutoPlaying(false), []);
    const handleMouseLeave = useCallback(() => setIsAutoPlaying(true), []);

    const displayIndex = ((currentIndex % totalItems) + totalItems) % totalItems;
    const progressWidth = ((displayIndex + 1) / totalItems) * 100;
    const cardWidth = 100 / itemsPerView;
    const translateX = currentIndex * cardWidth;

    return (
        <div className="security-carousel" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="carousel-viewport">
                <div 
                    className="carousel-track" 
                    ref={carouselRef}
                    style={{ 
                        transform: `translateX(-${translateX}%)`,
                        transition: isTransitioning ? 'transform 0.5s ease' : 'none'
                    }}
                >
                    {extendedCerts.map((cert, index) => (
                        <div key={`${cert.id}-${index}`} className="cert-card" style={{ flex: `0 0 ${cardWidth}%` }}>
                            <div className="cert-card-inner">
                                <CertIcon type={cert.icon} />
                                <h4 className="cert-title">{cert.title}</h4>
                                <p className="cert-subtitle">{cert.subtitle}</p>
                                <p className="cert-description">{cert.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="carousel-controls">
                <button className="carousel-arrow carousel-prev" onClick={handlePrev} type="button">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <div className="carousel-progress">
                    <div className="carousel-progress-bar" style={{ width: `${progressWidth}%` }}></div>
                </div>
                <button className="carousel-arrow carousel-next" onClick={handleNext} type="button">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
    );
});

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

                    <div className="video-tabs-container">
                        {workSmarterTabs.map(tab => (
                            <div 
                                key={tab.id} 
                                className={`video-tab-panel ${activeTab === tab.id ? 'active' : ''}`}
                            >
                                <VideoPlayer src={tab.video} isActive={activeTab === tab.id} />
                            </div>
                        ))}
                    </div>
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

            {/* 安全认证模块 - 桌面端 */}
            <div className="section-security section-security-pc">
                <div className="section-container">
                    <h2 className="section-title-center">Enterprise-grade security</h2>
                    <p className="section-subtitle">Built with privacy at the core</p>
                    <SecurityCarousel isMobile={false} />
                    <a href="https://plaud.ai/security" target="_blank" className="learn-more-btn">Learn More</a>
                </div>
            </div>

            {/* 安全认证模块 - 移动端 */}
            <div className="section-security section-security-mobile">
                <div className="section-container">
                    <h2 className="section-title-center">Enterprise-grade security</h2>
                    <p className="section-subtitle">Built with privacy at the core</p>
                    <SecurityCarousel isMobile={true} />
                    <a href="https://plaud.ai/security" target="_blank" className="learn-more-btn">Learn More</a>
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
                <div className="footer-banner-left">
                    <p>地址：深圳市南山区南山街道登良社区东滨路与南光路交汇处永新时代广场2号楼20层2001 邮编 518000</p>
                    <p>
                    电话：0755-86706325
                    </p>
                    <div>
                        <a
                            href="https://beian.mps.gov.cn/#/query/webSearch?code=44030002011219"
                            rel="noreferrer"
                            target="_blank"
                        >
                            <img
                                src="https://www.beian.gov.cn/img/ghs.png"
                                alt="粤公网安备44030002011219号"
                                style={{ verticalAlign: 'middle', marginRight: 6, height: 16, marginBottom:3 }}
                            />
                            粤公网安备44030002011219号
                        </a>
                     </div>
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
