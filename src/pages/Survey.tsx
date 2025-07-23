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
    question: "현재 개인사업자로 사업을 운영하고 계신가요?",
    options: [
      "예, 개인사업자입니다",
      "아니요, 법인사업자입니다",
      "사업을 준비 중입니다",
    ],
  },
  {
    question: "연간 매출 규모는 어느 정도인가요?",
    options: [
      "1억원 미만",
      "1억원 이상 3억원 미만",
      "3억원 이상 10억원 미만",
      "10억원 이상",
    ],
  },
  {
    question: "현재 세금 부담에 대해 어떻게 느끼시나요?",
    options: ["매우 부담스럽다", "부담스럽다", "보통이다", "부담스럽지 않다"],
  },
  {
    question: "사업 확장을 위한 자금이 필요하신가요?",
    options: ["매우 필요하다", "필요하다", "보통이다", "필요하지 않다"],
  },
  {
    question: "향후 사업 확장 계획이 있으신가요?",
    options: ["적극적으로 계획 중", "어느 정도 계획 중", "미정", "계획 없음"],
  },
  {
    question: "현재 직원은 몇 명 정도 고용하고 계신가요?",
    options: ["없음 (혼자)", "1-2명", "3-5명", "6명 이상"],
  },
  {
    question: "사업상 위험(책임)에 대한 부담을 느끼시나요?",
    options: ["매우 부담스럽다", "부담스럽다", "보통이다", "부담스럽지 않다"],
  },
  {
    question: "거래처에서 법인과의 거래를 선호한다고 느끼시나요?",
    options: ["매우 그렇다", "그렇다", "보통이다", "그렇지 않다"],
  },
  {
    question: "현재 성실신고확인 대상자이신가요?",
    options: ["예, 해당됩니다", "아니요", "잘 모르겠습니다"],
  },
  {
    question: "현재 종합소득세율은 어느 정도인가요?",
    options: ["24% 미만", "24% 이상 35% 미만", "35% 이상", "잘 모르겠습니다"],
  },
  {
    question: "사업용 부동산을 소유하고 계신가요?",
    options: [
      "예, 소유하고 있습니다",
      "아니요, 임차입니다",
      "부동산 없이 운영",
    ],
  },
  {
    question: "연구개발이나 설비투자 계획이 있으신가요?",
    options: ["적극적으로 계획 중", "어느 정도 계획 중", "미정", "계획 없음"],
  },
  {
    question: "수출업을 하고 계시거나 계획하고 계신가요?",
    options: ["현재 수출 중", "수출 계획 중", "관심 있음", "해당 없음"],
  },
  {
    question: "정부 지원사업에 참여해보신 적이 있으신가요?",
    options: ["자주 참여", "가끔 참여", "참여해본 적 있음", "참여한 적 없음"],
  },
  {
    question: "사업 승계를 고려하고 계신가요?",
    options: ["적극적으로 계획 중", "어느 정도 고려 중", "미정", "계획 없음"],
  },
  {
    question: "사업 소득의 안정성은 어떠신가요?",
    options: ["매우 안정적", "안정적", "불안정", "매우 불안정"],
  },
  {
    question: "사업자금 조달에 어려움이 있으신가요?",
    options: ["매우 어렵다", "어렵다", "보통이다", "어렵지 않다"],
  },
  {
    question: "법인카드 혜택을 활용하고 싶으신가요?",
    options: ["매우 필요하다", "필요하다", "보통이다", "필요하지 않다"],
  },
  {
    question: "장기적인 사업 운영 계획은 어떠신가요?",
    options: ["10년 이상 장기", "5-10년", "3-5년", "단기"],
  },
  {
    question: "사업의 신뢰도 향상이 필요하다고 생각하시나요?",
    options: ["매우 필요하다", "필요하다", "보통이다", "필요하지 않다"],
  },
  {
    question: "세무 관리의 투명성을 높이고 싶으신가요?",
    options: ["매우 중요하다", "중요하다", "보통이다", "중요하지 않다"],
  },
  {
    question: "사업 파트너십이나 합작을 고려하고 계신가요?",
    options: ["적극적으로 고려", "어느 정도 고려", "미정", "고려하지 않음"],
  },
  {
    question: "은퇴 후 사업 전환 계획이 있으신가요?",
    options: ["구체적인 계획 있음", "어느 정도 계획", "미정", "계획 없음"],
  },
];
