import './index.less';
import bootImage from '@/assets/images/product-introduction/20251011-135903.webp';
import standby1 from '@/assets/images/product-introduction/standby-1.webp';
import standby2 from '@/assets/images/product-introduction/standby-2.webp';
import standby3 from '@/assets/images/product-introduction/standby-3.webp';
import battery1 from '@/assets/images/product-introduction/battery-1.webp';
import battery2 from '@/assets/images/product-introduction/battery-2.webp';
import battery3 from '@/assets/images/product-introduction/battery-3.webp';
import recording from '@/assets/images/product-introduction/recording.webp';
import recordingHighlights from '@/assets/images/product-introduction/recording-highlights-.webp';
import transferBle from '@/assets/images/product-introduction/Transfer-ble.webp';
import transferWifi from '@/assets/images/product-introduction/Transfer-wifi.webp';
import transferWired from '@/assets/images/product-introduction/Transfer-wired.webp';
import ota from '@/assets/images/product-introduction/ota.webp';

const ProductIntroduction = () => {
    return (
        <div className="product-introduction">
            <h1>屏幕UI说明</h1>
            <p>
                <span className="mention-link_https%3A%2F%2Fnicebuild.feishu.cn%2Fwiki%2FObURwu4f6ixAApkbGbKc8mmpnRd mention-token_ObURwu4f6ixAApkbGbKc8mmpnRd mention-type_16 mention-uuid_rLkkKLyD4pei-1 mention-custom-icon-info_%7B%22type%22%3A0%2C%22key%22%3A%22%22%2C%22obj_type%22%3A22%2C%22file_type%22%3Anull%2C%22token%22%3A%22CrZ8dKZ76obO2ZxGC0XcUwWnnCe%22%2C%22version%22%3A85%7D"></span>
            </p>
            <p>注意：请在绑定设备后，在设备连接时升级固件</p>

            <h2 className="heading-2 ace-line old-record-id-doxcnGSWeowzk87zw4mdGm2Ahrh">
                开机 （gif）
            </h2>
            <div>
                <p className="img-container">
                    <img src={bootImage} alt="按住录音键以激活设备" />
                    <span>按住录音键以激活设备</span>
                </p>
            </div>

            <h2 className="heading-2 ace-line old-record-id-doxcnzBrdlCvDI6rqnoUTTOQIOg">
                待机状态(静态)
            </h2>
            <div className="img-container-list">
                <p className="img-container">
                    <img src={standby1} alt="未连接到应用程序；没有未传输的记录" />
                    <span>未连接到应用程序；没有未传输的记录</span>
                </p>
                <p className="img-container">
                    <img src={standby2} alt="未连接到应用程序；检测到未传输的记录" />
                    <span>未连接到应用程序；检测到未传输的记录</span>
                </p>
                <p className="img-container">
                    <img src={standby3} alt="已连接应用程序" />
                    <span>已连接应用程序</span>
                </p>
            </div>

            <h2 className="heading-2 ace-line old-record-id-doxcn34Pm0vChXCzRilPX5WP79d">
                Battery (静态)
            </h2>
            <div className="img-container-list">
                <p className="img-container">
                    <img src={battery1} alt="电量低" />
                    <span>电量低</span>
                </p>
                <p className="img-container">
                    <img src={battery2} alt="请充电" />
                    <span>请充电</span>
                </p>
                <p className="img-container">
                    <img src={battery3} alt="充电中" />
                    <span>充电中</span>
                </p>
            </div>

            <h2 className="heading-2 ace-line old-record-id-doxcnyxEp7EQfjLZk3tLTEBl62f">
                录音（.gif）
            </h2>
            <p className="img-container">
                <img src={recording} alt="录音中" />
                <span>录音中</span>
            </p>

            <h2 className="heading-2 ace-line old-record-id-doxcncNudGZ0Va8ZPqiPniOepRS">
                Highlight（.gif）
            </h2>
            <p className="img-container">
                <img src={recordingHighlights} alt="正在Highlight重点内容" />
                <span>正在Highlight重点内容</span>
            </p>
            <p>*在录制过程中，短按一次录音键标记重点信息</p>

            <h2 className="heading-2 ace-line old-record-id-doxcnxrzsMVnJqdTMIe25cHVqOh">
                文件传输
            </h2>
            <div className="img-container-list">
                <p className="img-container">
                    <img src={transferBle} alt="蓝牙传输" />
                    <span>蓝牙传输</span>
                </p>
                <p className="img-container">
                    <img src={transferWifi} alt="Wi-Fi 传输" />
                    <span>Wi-Fi 传输</span>
                </p>
                <p className="img-container">
                    <img src={transferWired} alt="有线传输" />
                    <span>有线传输</span>
                </p>
            </div>

            <h2 className="heading-2 ace-line old-record-id-doxcn2Wcr5YmflDVVg1kki6lTP8">
                <strong>固件更新</strong>
            </h2>
            <p className="img-container">
                <img src={ota} alt="正在更新固件" />
                <span>正在更新固件</span>
            </p>
            <p>
                <span className="lark-record-clipboard"></span>
            </p>
            <p>
                <br />
            </p>
        </div>
    );
};

export default ProductIntroduction;

