import animationData from "@/assets/lottie/document.json";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import { Link } from "react-router";

export default function Results() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
      <div className="text-center space-y-6 max-w-2xl">
        {/* Lottie Animation with size constraint */}
        <div className="flex justify-center">
          <div className="w-64 h-64 max-w-full max-h-64">
            <Lottie animationData={animationData} loop={false} />
          </div>
        </div>

        {/* Improved text styling */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">
            설문이 완료되었습니다
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            9,900원으로 평가 리포트를 받아보세요
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-6">
          <Link to="/payment">
            <Button className="w-full max-w-md" variant="default" size="lg">
              💳 평가 리포트 구매하기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
