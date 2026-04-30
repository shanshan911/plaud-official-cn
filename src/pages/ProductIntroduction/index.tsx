import './index.less';
import bootImage from '@/assets/images/product-introduction/20251011-135903.webp';
import standby1 from '@/assets/images/product-introduction/standby-1.webp';
import standby2 from '@/assets/images/product-introduction/standby-2.webp';
import standby3 from '@/assets/images/product-introduction/standby-3.webp';
import battery1 from '@/assets/images/product-introduction/battery-1.webp';
import battery2 from '@/assets/images/product-introduction/battery-2.webp';
import battery3 from '@/assets/images/product-introduction/battery-3.webp';
import recording from '@/assets/images/product-introduction/recording.webp';
import recordingHighlights from '@/assets/images/product-introduction/recording-highlights.webp';
import transferBle from '@/assets/images/product-introduction/Transfer-ble.webp';
import transferWifi from '@/assets/images/product-introduction/Transfer-wifi.webp';
import transferWired from '@/assets/images/product-introduction/Transfer-wired.webp';
import ota from '@/assets/images/product-introduction/ota.webp';

const ProductIntroduction = () => {
    return (
        <div className="product-introduction">
            <h1 className="text-center">Plaud Note Pro-屏幕实时显示指引</h1>
            <p className="text-center">请在连接设备后，激活设备之前，点击APP首页左上角产品图标，确认产品固件是否已更新至最新版本。</p>
            <br />
            <br />
            <h2 className="heading-2 text-center">
                开机及激活
            </h2>
            <div>
                <p className="img-container">
                    <span>长按录音键直至屏幕亮起，表示设备已被激活</span>
                    <img src={bootImage} alt="按住录音键以激活设备" width={768} height={476} />
                </p>
            </div>
            <br />
            <br />
            <h2 className="heading-2 text-center">
                待机状态
            </h2>
            <div className="img-container-list">
                <p className="img-container">
                    <span>未连接到应用程序；检测到无未传输的文件</span>
                    <img src={standby1} alt="未连接到应用程序；没有未传输的记录" width={768} height={476} />
                </p>
                <p className="img-container">
                    <span>未连接到应用程序；检测到有未传输的文件</span>
                    <img src={standby2} alt="未连接到应用程序；检测到未传输的记录" width={768} height={476} />
                </p>
                <p className="img-container">
                    <span>已连接应用程序</span>
                    <img src={standby3} alt="已连接应用程序" width={768} height={476} />
                </p>
            </div>
            <br />
            <br />
            <h2 className="heading-2 text-center">
                电量及充电状态
            </h2>
            <div className="img-container-list">
                <p className="img-container">
                    <span>电量低</span>
                    <img src={battery1} alt="电量低" width={768} height={476} />
                </p>
                <p className="img-container">
                    <span>请充电</span>
                    <img src={battery2} alt="请充电" width={768} height={476} />
                </p>
                <p className="img-container">
                    <span>充电中</span>
                    <img src={battery3} alt="充电中" width={768} height={476} />
                </p>
            </div>
            <br />
            <br />
            <h2 className="heading-2 text-center">
                录音状态
            </h2>
            <p className="img-container">
                <span>录音中</span>
                <img src={recording} alt="录音中" width={768} height={476} />
            </p>
            <br />
            <br />
            <h2 className="heading-2 text-center">
                一键标记
            </h2>
            <p className="text-center">*在录制过程中，短按一次录音键标记重点信息</p>
            <p className="img-container">
                <span>正在标记重点内容</span>
                <img src={recordingHighlights} alt="正在标记重点内容" width={768} height={476} />
            </p>
            <br />
            <br />
            <h2 className="heading-2 text-center">
                文件传输
            </h2>
            <div className="img-container-list">
                <p className="img-container">
                    <span>蓝牙传输</span>
                    <img src={transferBle} alt="蓝牙传输" width={768} height={476} />
                </p>
                <p className="img-container">
                    <span>Wi-Fi 传输</span>
                    <img src={transferWifi} alt="Wi-Fi 传输" width={768} height={476} />
                </p>
                <p className="img-container">
                    <span>有线传输</span>
                    <img src={transferWired} alt="有线传输" width={768} height={476} />
                </p>
            </div>
            <br />
            <br />
            <h2 className="heading-2 text-center">
                <strong>固件更新</strong>
            </h2>
            <p className="img-container">
                <span>正在更新固件</span>
                <img src={ota} alt="正在更新固件" width={768} height={476} />
            </p>
        </div>
    );
};

export default ProductIntroduction;
