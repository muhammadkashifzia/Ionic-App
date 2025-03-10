import React, { useState } from 'react';
import  TabButton  from '../components/profile/TabButton';
import  PersonalTab  from '../components/profile/personal';
import  EmailTab  from '../components/profile/email';
import  PasswordTab from '../components/profile/password';



const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'personal' | 'email' | 'password'>('personal');


  const renderContent = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalTab />;
      case 'email':
        return <EmailTab />;
      case 'password':
        return <PasswordTab />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center relative py-5 px-5 border-b border-gray-200">
        {/* <button  className="absolute left-5">
          <ArrowLeft className="w-6 h-6 text-black" />
        </button> */}
        <h1 className="text-lg font-medium text-gray-900">プロフィール設定</h1>
      </div>

      <div className="flex space-x-4 px-5 py-3">
        <TabButton title="プロフィール" isActive={activeTab === 'personal'} onPress={() => setActiveTab('personal')} />
        <TabButton title="メール" isActive={activeTab === 'email'} onPress={() => setActiveTab('email')} />
        <TabButton title="パスワード" isActive={activeTab === 'password'} onPress={() => setActiveTab('password')} />
      </div>

      <div className=" px-5 py-4">{renderContent()}</div>
    </div>
  );
};

export default Profile;
