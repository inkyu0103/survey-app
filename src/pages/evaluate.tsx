import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import doc_scan from "../assets/lottie/doc_scan.json";

// 결제 완료 -> 이메일 전송
export default function Evaluate() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const messages = [
    "데이터를 분석하고 있습니다.",
    "맞춤형 리포트를 작성하고 있습니다.",
    "결과를 정리하고 있습니다.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setIsVisible(false);

      // 문구 변경 후 fade in
      setTimeout(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
        setIsVisible(true);
      }, 300); // fade out 완료 후 문구 변경
    }, 3000); // 3초마다 문구 변경

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="flex flex-col h-screen w-screen items-center justify-start pt-32 md:pt-40 lg:pt-48 gap-4 md:gap-6 lg:gap-8">
      <p
        className={`text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {messages[currentMessageIndex]}
      </p>

      <section className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 bg-gray-50 rounded-2xl">
        <Lottie animationData={doc_scan} loop={true} />
      </section>
    </div>
  );
}
