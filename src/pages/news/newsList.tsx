import { useEffect, useState } from "react";
import { useGetAllNews } from "../../hooks/useNews";
import NewsCard from "../../components/news/NewsCard";

export default function NewsSection() {
  const { mutate, data, isLoading } = useGetAllNews();
  const [newsItems, setNewsItems] = useState<any[]>([]);

  useEffect(() => {
    mutate(); 

    if (data && data.data) {
      const sortedNews = data.data
        .sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        .slice(0, 100);
      setNewsItems(sortedNews);
    }
  }, [data, mutate]);

  return (

        <div className="px-6 pb-[40px] z-30 mt-[20px] h-[100%] overflow-y-auto">
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
