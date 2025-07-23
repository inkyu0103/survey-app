import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function UserInfo() {
  const [formData, setFormData] = useState({
    companyName: "",
    businessStartDate: "",
    mainBusiness: "",
    businessGroup: "",
    businessType: "",
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [showCalendar, setShowCalendar] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd");
      handleInputChange("businessStartDate", formattedDate);
      setShowCalendar(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("사업 정보:", formData);
    // 여기에 폼 제출 로직 추가
  };

  // 모든 필수 필드가 채워졌는지 확인
  const isFormValid =
    formData.companyName.trim() !== "" &&
    selectedDate !== undefined &&
    formData.businessType.trim() !== "";

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-center text-xl font-semibold mb-8">
          대표님의 사업에 대해 간단히 알려주세요
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 상호 */}
          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-sm font-medium">
              상호
            </Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange("companyName", e.target.value)
              }
              className="w-full"
            />
          </div>

          {/* 사업개시일 */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">사업개시일</Label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowCalendar(!showCalendar)}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-left flex items-center justify-between"
              >
                <span className={selectedDate ? "text-black" : "text-gray-500"}>
                  {selectedDate
                    ? format(selectedDate, "yyyy년 MM월 dd일", { locale: ko })
                    : "날짜를 선택해주세요"}
                </span>
                <CalendarIcon className="h-4 w-4 text-gray-400" />
              </button>
              {showCalendar && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    locale={ko}
                    className="p-3"
                    captionLayout="dropdown"
                  />
                </div>
              )}
            </div>
          </div>

          {/* 업종명 */}
          <div className="space-y-2">
            <Label htmlFor="businessType" className="text-sm font-medium">
              주업종(매출 비중이 가장 높은 업종)의 그룹 및 업종명
            </Label>
            <Input
              id="businessType"
              value={formData.businessType}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange("businessType", e.target.value)
              }
              className="w-full"
            />
          </div>

          {/* 업종 종류 안내 */}
          <div className="text-xs text-gray-600 mb-3">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>어떤 업종이 있나요?</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">그룹 1</h4>
                      <p className="text-sm leading-relaxed">
                        농업·임업·어업·광업, 도소매업, 제조업, 기타
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">그룹 2</h4>
                      <p className="text-sm leading-relaxed">
                        제조업, 숙박·음식업, 전기·가스·증기·공기조절 수급업,
                        수도·하수·폐기물 처리·환경복구업, 건설업·부동산업,
                        정보통신업, 금융·보험업, 전문·과학·기술서비스업,
                        사업시설관리·사업지원서비스업,
                        공공행정·국방·사회보장행정, 교육서비스업,
                        보건업·사회복지서비스업, 예술·스포츠·여가서비스업,
                        협회·단체, 수리·기타 개인 서비스, 가구 내 고용활동
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">그룹 3</h4>
                      <p className="text-sm leading-relaxed">
                        부동산 임대업, 전문·과학·기술 서비스업,
                        사업시설관리·사업시설지원서비스업,
                        예술·스포츠·여가서비스업, 협회·단체, 수리·기타 개인
                        서비스, 가구 내 고용활동
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* 제출 버튼 */}
          <div className="pt-6">
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={!isFormValid}
              onClick={() => {
                navigate("/survey");
              }}
            >
              다음 단계로
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
