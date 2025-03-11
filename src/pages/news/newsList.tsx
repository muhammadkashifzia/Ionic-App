import { useEffect, useState } from "react";
import { useGetAllNews } from "../../hooks/useNews";
import NewsCard from "../../components/news/NewsCard";
import { IonButton, IonIcon } from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import { useIonRouter } from "@ionic/react";

export default function NewsSection() {
  const router = useIonRouter();
  const { mutate, data, isLoading } = useGetAllNews();
  const [newsItems, setNewsItems] = useState<any[]>([]);

  useEffect(() => {
    mutate();
    if (data && data.data) {
      const sortedNews = data.data
        .sort(
          (a: any, b: any) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
        .slice(0, 100);
      setNewsItems(sortedNews);
    }
  }, [data, mutate]);

  return (
    <div className="px-6 pb-[40px] z-30 mt-[20px] h-[100%] pb-[100px]">
   <div className="relative mb-[12px] w-full">
  <div>
  <button onClick={() => router.push('/tabs/home', 'back')} className="absolute top-[50%] translate-y-[-50%] left-0 z-50">
        <IonIcon icon={arrowBackOutline} className="text-[20px]" />
      </button>
  </div>

      <div className="mb-[20px] flex justify-center align-center relative">
        <h2 className="text-[20px] font-normal text-[#111827] font-[ABeeZee-Regular]">
          お知らせ
        </h2>
      </div>
   </div>
      
      <div className="py-4 border border-gray-200 w-full px-[15px] rounded-md flex flex-col gap-[20px] h-[100%] overflow-y-auto">
        {newsItems.map((item, index) => (
          <div key={index} className="mb-0">
            <NewsCard {...item} isLast={index === newsItems.length - 1} />
          </div>
        ))}
      </div>
    </div>
  );
}
