import { useState, useEffect } from "react";
import { IonIcon } from "@ionic/react";
import CheckIcon from "../assets/svgs/checkIn.svg";
import UnCheckIcon from "../assets/svgs/unCheckIn.svg";
import ComparisonIcon from "../assets/svgs/ComparisonIcon.svg";
import { useGetAllAssessments } from "../hooks/useAssessments";
import PhotoComparisonScreen from "../comparison/PhotoComparisonScreen";

const ComparisonScreen = () => {
  const {
    data,
    isPending,
    refetch,
  }: { data: any; isPending: boolean; refetch: () => void } =
    useGetAllAssessments({
      selectedMonth: 2,
      selectedYear: 2025,
    });

  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [selectedImages, setSelectedImages] = useState<any[]>([]);
  const [show, setShow] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [imageData, setImageData] = useState<any[]>([]);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const formattedImages = data
        .map((item: any, index: number) => ({
          id: index,
          date: `${new Date(item.createdAt)
            .getFullYear()
            .toString()
            .slice(2)}/${new Date(item.createdAt).getMonth() + 1}/${new Date(
            item.createdAt
          ).getDate()}`,
          image: item.nailPhoto !== "" ? item.nailPhoto : null,
          createdAt: new Date(item.createdAt),
        }))
        .filter((item) => item.image)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

      setImageData(formattedImages);
    }
  }, [data]);

  useEffect(() => {
    setDisabled(selectedImages.length !== 2);
  }, [selectedImages]);

  const handleCheckboxChange = (id: number) => {
    setCheckedItems((prevState) => {
      const isChecked = prevState[id];
      const checkedIds = Object.keys(prevState).filter(
        (key) => prevState[Number(key)]
      );

      if (!isChecked && checkedIds.length >= 2) {
        alert("You can only select up to 2 images for comparison.");
        return prevState;
      }

      const updatedState = { ...prevState, [id]: !isChecked };
      const updatedCheckedIds = Object.keys(updatedState).filter(
        (key) => updatedState[Number(key)]
      );
      const images = updatedCheckedIds.map((key) =>
        imageData.find((d) => d.id.toString() === key)
      );

      setSelectedImages(images.slice(0, 2));
      return updatedState;
    });
  };

  const handleComparisonPress = () => {
    if (selectedImages.length === 2) {
      setShow(true);
    } else {
      alert("Please select exactly 2 images to compare.");
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="overflow-y-auto h-full">
      {show ? (
        <PhotoComparisonScreen
          selectedImages={selectedImages}
          setShow={setShow}
        />
      ) : (
        <div>
          <p className="text-[14px] font-[400] mb-4">
            2枚の写真を選択し、比較することができます。
          </p>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
            {imageData.map((item) => (
              <button
                key={item.id}
                onClick={() => handleCheckboxChange(item.id)}
                className="relative group"
              >
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-[80px] rounded-lg object-cover border border-[#fff group-hover:border-[#199A8E]"
                />
                <div className="absolute top-2 right-2">
                  {checkedItems[item.id] ? (
                    <IonIcon icon={CheckIcon} />
                  ) : (
                    <IonIcon icon={UnCheckIcon} />
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50  text-center rounded-t-lg ">
                  <span className="text-white text-[14px]">{item.date}</span>
                </div>
              </button>
            ))}
          </div>
          <button
            disabled={disabled}
            onClick={handleComparisonPress}
            className={`mt-6 flex items-center justify-center gap-2 px-6 py-2 rounded-[6px] mx-auto font-medium transition w-full max-w-[160px] h-[32px] text-white text-[12px] ${
              disabled
                ? "bg-[#199A8E] opacity-50 cursor-not-allowed"
                : "bg-[#199A8E] hover:bg-teal-700"
            }`}
          >
            <IonIcon icon={ComparisonIcon} className="text-[14.2px]"/> 比較
          </button>
        </div>
      )}
    </div>
  );
};

export default ComparisonScreen;
