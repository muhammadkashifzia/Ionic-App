import React from "react";
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonRouterOutlet } from "@ionic/react";
import { Route, Redirect, useLocation } from "react-router";
import {  clipboardOutline, personOutline } from "ionicons/icons";
import Home from "../tabs/Home";
import AddAssessment from "../tabs/Assessment";
import Comparison from "../tabs/ViewAssessment";
import Profile from "../tabs/Profile";
import HomeTabSvg from "../assets/svgs/homeTab.svg";
import AddAssessmentTabSvg from "../assets/svgs/addAssessmentTab.svg";
import ComparisonTabSvg from "../assets/svgs/comparisonTab.svg";
import ProfileTabSvg from "../assets/svgs/profileTab.svg";
const TabNavigation: React.FC = () => {
  const location = useLocation();

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/home" component={Home} />
        <Route exact path="/tabs/add-assessment" component={AddAssessment} />
        <Route exact path="/tabs/comparison" component={Comparison} />
        <Route exact path="/tabs/profile" component={Profile} />
        <Redirect exact from="/" to="/tabs/home" />
      </IonRouterOutlet>

      <IonTabBar slot="bottom" className="bg-teal-600 rounded-full px-4 py-3 mb-4 mx-4 flex items-center justify-between">
        
        {[
          { tab: "home", href: "/tabs/home", icon: HomeTabSvg, label: "ホーム" },
          { tab: "addAssessment", href: "/tabs/add-assessment", icon: AddAssessmentTabSvg, label: "入力" },
          { tab: "comparison", href: "/tabs/comparison", icon: ComparisonTabSvg, label: "閲覧" },
          { tab: "profile", href: "/tabs/profile", icon: ProfileTabSvg, label: "設定" },
        ].map(({ tab, href, icon, label }) => {
          const isActive = location.pathname === href;

          return (
            <IonTabButton 
              key={tab} 
              tab={tab} 
              href={href} 
              
              className={`flex flex-col items-center px-3 py-2 rounded-[100px] transition-all duration-300 !no-underline ${
                isActive ? "bg-white text-[#199A8E] shadow-md" : "text-white"
              }`}
            >
              <div className="flex flex-row items-center gap-1">
                <IonIcon icon={icon} className={`text-[24px] transition-all duration-300 !no-underline ${isActive ? "stroke-[#199A8E] fill-[#199A8E]" : "stroke-white fill-[#199A8E]"}`} />
                {isActive && <p className="text-xs font-semibold text-[#199A8E] !no-underline">{label}</p>}
              </div>
            </IonTabButton>
          );
        })}

      </IonTabBar>
    </IonTabs>
  );
};

export default TabNavigation;
