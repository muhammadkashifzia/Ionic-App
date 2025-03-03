import { IonPage, IonContent, IonButton } from "@ionic/react";
import { useEffect, useState } from "react";
import { useGetAllNews } from "../../hooks/useNews";
import NewsCard from "../../components/news/NewsCard";

export default function NewsSection() {
  const { mutate, data, isLoading } = useGetAllNews();
  const [newsItems, setNewsItems] = useState<any[]>([]);

  useEffect(() => {
    mutate(); // Fetch news data

    if (data && data.data) {
      const sortedNews = data.data
        .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 3);
      setNewsItems(sortedNews);
    }
  }, [data, mutate]);

  return (

        <div className="px-6 mb-6 z-30 mt-[20px]">
          <div className="flex justify-between mb-[12px]">
            <h2 className="text-sm font-normal text-gray-900  font-[\'ABeeZee-Regular\']">お知らせ</h2>
            <button  className="text-sm w-[75px] text-green-600 font-normal">
              すべて表示
            </button>
          </div>
          <div className="py-4 border border-gray-200 w-full px-[15px] rounded-md flex flex-col gap-[20px]">
            {newsItems.map((item, index) => (
              <div key={index} className="mb-0">
                <NewsCard {...item} isLast={index === newsItems.length - 1} />
              </div>
            ))}
          </div>
        </div>
  );
}
