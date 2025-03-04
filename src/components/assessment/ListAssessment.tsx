import React, { useEffect, useState } from 'react';
// import { SvgXml } from 'react-native-svg';
// import { calenderSvgIcon } from '../../assets/svgsComps/checkSvg';
import { useGetAllAssessments } from '../../hooks/useAssessments';
import ListAssessmentShimmer from '../../shimmers/AssessmentShimmer';

const ListAssessment: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDropdown, setShowDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [selectedYear, setSelectedYear] = useState(selectedDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(selectedDate.getMonth() + 1);

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const { data, isPending, refetch } = useGetAllAssessments({ selectedMonth, selectedYear });
  const [monthlyDataBackend, setMonthlyDataBackend] = useState<any[]>([]);

  useEffect(() => {
    refetch();
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    if (data) {
      setMonthlyDataBackend(
        Array.isArray(data) ? [...data].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) : []
      );
    }
  }, [data]);

  const handleMonthSelect = (month: number) => {
    setSelectedMonth(month);
    setSelectedDate(new Date(selectedYear, month - 1, 1));
    setShowDropdown(false);
  };

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    setSelectedDate(new Date(year, selectedMonth - 1, 1));
    setShowYearDropdown(false);
  };

  return (
    <div>
      <button className="ml-auto flex justify-end" onClick={() => setShowDropdown(!showDropdown)}>
        {/* <SvgXml xml={calenderSvgIcon} /> */}
      </button>

      {showDropdown && (
        <div className="absolute bg-white p-4 rounded-lg shadow-lg mt-2 right-0">
          <button
            className="w-full text-center border p-2 mb-2 rounded-lg"
            onClick={() => setShowYearDropdown(!showYearDropdown)}
          >
            {selectedYear}年
          </button>

          {showYearDropdown && (
            <div className="grid grid-cols-3 gap-2 mb-2">
              {years.map(year => (
                <button
                  key={year}
                  className={`p-2 rounded-lg text-center ${selectedYear === year ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                  onClick={() => handleYearSelect(year)}
                >
                  {year}
                </button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-3 gap-2">
            {months.map(month => (
              <button
                key={month}
                className={`p-2 rounded-lg text-center ${selectedMonth === month ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                onClick={() => handleMonthSelect(month)}
              >
                {month}月
              </button>
            ))}
          </div>
        </div>
      )}

      {isPending ? (
        <ListAssessmentShimmer />
      ) : monthlyDataBackend.length === 0 ? (
        <div className="flex justify-center items-center h-96">
          <p className="text-gray-500 text-lg">No assessments available</p>
        </div>
      ) : (
        <div className="space-y-4 mt-4">
          {monthlyDataBackend.map((assessment, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-700 text-sm mb-2">
                {new Date(assessment.createdAt).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <div className="flex items-center space-x-4">
                <img
                  src={assessment.nailPhoto || 'https://www.cleancredit.com.au/wp-content/uploads/elementor/thumbs/credit-repair-services-australia-q7ik0kwgn0capirxtasxuvbb9wkxymk4cqjze3d2fc.jpeg'}
                  alt="Assessment"
                  className="w-16 h-16 rounded-lg"
                />
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm">症状の程度:</span>
                    <div className="bg-[#199A8E] text-white px-3 py-1 rounded-lg text-xs">
                      {assessment.pointRating}/5
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm">エクササイズ:</span>
                    <div className="bg-[#199A8E] text-white px-3 py-1 rounded-lg text-xs">
                      {assessment.starRating}/3
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListAssessment;
