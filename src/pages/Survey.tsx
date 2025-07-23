import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function Survey() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const progress = ((currentQuestion + 1) / surveyQuestions.length) * 100;

  const handleAnswer = (value: string) => {
    const optionIndex = parseInt(value);
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < surveyQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // 설문 완료 처리
      console.log("설문 완료:", answers);
      alert("설문이 완료되었습니다!");
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const canGoNext = answers.hasOwnProperty(currentQuestion);
  const isLastQuestion = currentQuestion === surveyQuestions.length - 1;
  const currentQuestionData = surveyQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-2xl mx-auto">
        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-muted-foreground">
              {currentQuestion + 1} / {surveyQuestions.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% 완료
            </span>
          </div>
          <Progress value={progress} className="mb-8" />
        </div>

        {/* Question Section */}
        <div className="mb-12">
          <h1 className="text-xl font-semibold mb-6">
            Q{currentQuestion + 1}. {currentQuestionData.question}
          </h1>

          <RadioGroup
            value={answers[currentQuestion]?.toString() ?? ""}
            onValueChange={handleAnswer}
            className="space-y-4"
          >
            {currentQuestionData.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-3">
                <RadioGroupItem
                  value={index.toString()}
                  id={`option-${index}`}
                />
                <Label
                  htmlFor={`option-${index}`}
                  className="text-base font-normal cursor-pointer"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Navigation Section */}
        <div className="flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            size="lg"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            이전
          </Button>

          <Button onClick={handleNext} disabled={!canGoNext} size="lg">
            {isLastQuestion ? "완료" : "다음"}
            {!isLastQuestion && <ChevronRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </div>
    </div>
  );
}

interface Question {
  question: string;
  options: string[];
}

const surveyQuestions: Question[] = [
  {
    question: "현재 개인사업자의 연간 순이익은 어느 정도인가요?",
    options: [
      "1,400만 원 이하",
      "1,400만 원 초과 ~ 5,000만 원 이하",
      "5,000만 원 초과 ~ 8,800만 원 이하",
      "8,800만 원 초과 ~ 1억 5천만 원 이하",
      "1억 5천만 원 초과",
    ],
  },
  {
    question: "개인사업자 외에 추가적인 수익이 있으신가요? (순이익 기준)",
    options: [
      "1,400만 원 이하",
      "1,400만 원 초과 ~ 5,000만 원 이하",
      "5,000만 원 초과 ~ 8,800만 원 이하",
      "8,800만 원 초과 ~ 1억 5천만 원 이하",
      "1억 5천만 원 초과 ~ 3억 이하",
      "3억 초과",
    ],
  },
  {
    question: "가장 최근 연도의 개인사업자 주업종의 매출은 얼마입니까?",
    options: ["10억", "7.5억", "5억"],
  },
  {
    question: "가장 최근 연도의 개인사업자 주업종의 성실매출 수준은?",
    options: [
      "성실매출 30% 이하",
      "성실매출 50%",
      "성실매출 70%",
      "성실매출 직전",
      "성실매출 달성",
    ],
  },
  {
    question:
      "대표자 본인 외에도 가족 등에게 급여를 지급할 수 있는 인적 구성이 되어 있나요?",
    options: [
      "본인만",
      "본인 + 배우자",
      "본인 + 배우자 + 가족 1명",
      "본인 + 배우자 + 가족 2명",
      "본인 + 배우자 + 가족 3명",
    ],
  },
  {
    question: "사업상 발생하는 비용을 세금상 비용 처리로 인정받고 있나요?",
    options: [
      "대부분 받고 있다",
      "약간 받고 있다",
      "보통이다 / 잘 모르겠다",
      "잘 받고 있지 못하다",
      "대부분 받고 있지 못하다",
    ],
  },
  {
    question: "향후 누진세율 적용에 따라 세부담이 높아질 가능성이 있나요?",
    options: [
      "전혀 그렇지 않다",
      "별로 그렇지 않다",
      "보통이다 / 잘 모르겠다",
      "다소 그렇다",
      "매우 그렇다",
    ],
  },
  {
    question:
      "법인 설립 및 운영에 따른 추가 행정 비용(기장, 세무신고 등)에 부담을 느끼시나요?",
    options: [
      "전혀 부담스럽지 않다",
      "별로 부담스럽지 않다",
      "보통이다 / 잘 모르겠다",
      "다소 부담스럽다",
      "매우 부담스럽다",
    ],
  },
  {
    question: "상업용 부동산(빌딩 등)으로 자산을 증대할 계획이 있으십니까?",
    options: [
      "전혀 고려하지 않고 있다",
      "별로 고려하지 않고 있다",
      "잘 모르겠다",
      "고려 중이다",
      "반드시 할 예정이다",
    ],
  },
  {
    question:
      "사업 관련 채무에 대해 대표자가 무한책임을 지는 상황이 부담스럽나요?",
    options: [
      "전혀 걱정되지 않는다",
      "별로 걱정되지 않는다",
      "보통이다 / 잘 모르겠다",
      "다소 걱정된다",
      "매우 걱정된다",
    ],
  },
  {
    question: "본인 외의 함께 동업할 사람이 있습니까?",
    options: ["전혀 없다", "잘 모르겠다", "찾고 있다", "있다"],
  },
  {
    question: "사업을 위하여 투자 등 자금 조달이 필수적입니까?",
    options: [
      "전혀 필요하지 않다",
      "별로 필요하지 않다",
      "보통이다 / 잘 모르겠다",
      "다소 필요하다",
      "필수이다",
    ],
  },
  {
    question:
      "임대차 계약, 고용계약 등에서 개인 명의가 아닌 법인 명의가 유리하다고 판단되나요?",
    options: [
      "전혀 그렇지 않다",
      "별로 그렇지 않다",
      "보통이다 / 잘 모르겠다",
      "다소 그렇다",
      "매우 그렇다",
    ],
  },
  {
    question: "사업 운영의 투명성 확보가 중요한가요?",
    options: [
      "전혀 중요하지 않다",
      "별로 중요하지 않다",
      "보통이다 / 잘 모르겠다",
      "다소 중요하다",
      "매우 중요하다",
    ],
  },
  {
    question:
      "법인 설립 목적이 달성되면 법인을 없애거나 단기간만 운영할 계획이 있나요?",
    options: [
      "전혀 그렇지 않다",
      "별로 그렇지 않다",
      "보통이다 / 잘 모르겠다",
      "다소 그렇다",
      "매우 그렇다",
    ],
  },
  {
    question:
      "사업의 외형 성장(매출 증대, 고용 인원 증가 등)을 계획하고 있나요?",
    options: [
      "전혀 그렇지 않다",
      "별로 그렇지 않다",
      "보통이다 / 잘 모르겠다",
      "다소 그렇다",
      "매우 그렇다",
    ],
  },
  {
    question:
      "외부 기관(은행, 정부, 지자체 등)으로부터 자금 조달이나 보조금 지원을 계획 중인가요?",
    options: [
      "전혀 그렇지 않다",
      "별로 그렇지 않다",
      "보통이다 / 잘 모르겠다",
      "다소 그렇다",
      "매우 그렇다",
    ],
  },
  {
    question:
      "브랜드 이미지, 신뢰도, 대외 협상력 향상을 위해 법인 명의가 필요하다고 느끼시나요?",
    options: [
      "전혀 필요하지 않다",
      "별로 필요하지 않다",
      "보통이다 / 잘 모르겠다",
      "다소 필요하다",
      "필수이다",
    ],
  },
  {
    question:
      "직원 채용 및 복지제도(4대 보험 등)를 체계적으로 운영하고자 하나요?",
    options: [
      "전혀 필요하지 않다",
      "별로 필요하지 않다",
      "보통이다 / 잘 모르겠다",
      "다소 필요하다",
      "매우 필요하다",
    ],
  },
  {
    question: "사업 승계 또는 자녀에게의 이전을 고려하고 계신가요?",
    options: [
      "전혀 고려하지 않고 있다",
      "별로 고려하지 않고 있다",
      "잘 모르겠다",
      "승계 또는 이전하면 좋을 것 같다",
      "승계 또는 이전을 해야만 한다",
    ],
  },
  {
    question: "가족 구성원과 지분 분할 또는 공동 경영 구상을 하고 있나요?",
    options: [
      "할 생각이 없다",
      "생각해본 적 없다",
      "잘 모르겠다",
      "지분 분할은 계획하고 있다",
      "지분 분할 + 공동경영도 구상하고 있다",
    ],
  },
  {
    question: "재산 분리(사업 자산과 개인 자산의 분리)가 필요한가요?",
    options: [
      "전혀 필요하지 않다",
      "별로 필요하지 않다",
      "보통이다 / 잘 모르겠다",
      "다소 필요하다",
      "매우 필요하다",
    ],
  },
];
