import { useEffect, useState } from 'react';
import {
  IonText,
  IonIcon,
} from '@ionic/react';
import { notificationsOutline, logOutOutline } from 'ionicons/icons';
import logoutSvg from '../../assets/svgs/logout.svg';
import { useHistory } from 'react-router-dom';

const WelcomeHeader: React.FC = () => {
  const [userName, setUserName] = useState<string>('Dummy User');
  const [allPoints, setAllPoints] = useState<number>(120);
 
  const history = useHistory();

  const logout = async () => {
    history.push('/signin');
  };

  return (
    <div className="bg-[#199A8E] px-6 pt-[14px] pb-[25.72px] text-white relative z-10"> 
      <div className="flex justify-between">
        <div>
          <p className="text-lg">こんにちは、{userName}さん 👋 </p>
          <p className="block text-sm">本アプリへお帰りなさい！</p>
          <div className="mt-[10px]">
            <p className="text-xl font-semibold mb-[13px]">今月の合計ポイント ✨</p>
            <div className="flex items-center gap-2 mt-1">
              <p className="bg-green-700 px-3 py-1 rounded-full">{allPoints}ポイント</p>
              <p>継続して頑張りましょう。</p>
            </div>
          </div>
        </div>
        <div className='gap-3 flex items-start'>
          <button>
            <IonIcon icon={notificationsOutline} className="text-white text-2xl" />
          </button>
          <button onClick={logout}>
            <IonIcon icon={logoutSvg} className="text-white text-2xl" />
          </button>
        </div>
      </div>
    
    </div>
  );
};

export default WelcomeHeader;