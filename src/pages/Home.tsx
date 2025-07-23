import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BadgeCheckIcon,
  RocketIcon,
  ShieldCheckIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "lucide-react";
import { Link } from "react-router";

export default function HomePage() {
  return (
    <>
      <section className="container mx-auto space-y-8 px-4 py-20 md:px-6 2xl:max-w-[1400px]">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold">
            <span className="block">소중한 내 사업,</span>
            <span className="block">법인 전환이 맞을까?</span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            개인사업자를 운영하는 분들, 법인 설립을 고민하는 분들을 위한 법인이
            본인 사업에 맞는지 궁금하신가요?
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="p-0">
              <CardContent className="space-y-2 p-6">
                <feature.icon className="text-primary h-12 w-12" />
                <h3 className="font-bold">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Fixed CTA Button */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">
        <Link to="/survey">
          <Button className="w-full" variant="default" size="lg">
            🎯 설문 시작하고 평가 리포트 받기
          </Button>
        </Link>
      </div>
    </>
  );
}

const features = [
  {
    icon: TrendingDownIcon,
    title: "세금 부담 절감",
    description:
      "더 낮은 세율로 세금을 줄이고 성실신고확인 대상에서도 벗어날 수 있어요.",
  },
  {
    icon: TrendingUpIcon,
    title: "자금 조달이 쉬워짐",
    description:
      "대출, 투자, 정부 지원 등 자금 확보가 개인사업자보다 유리합니다.",
  },
  {
    icon: ShieldCheckIcon,
    title: "경영 리스크 분산",
    description: "사업상 채무에 대해 대표가 개인적으로 책임지지 않아도 됩니다.",
  },
  {
    icon: RocketIcon,
    title: "사업 확장의 기반",
    description:
      "법인 전환은 지점 설립, 외부 파트너십 등 확장 전략을 더 유연하게 만들어줍니다.",
  },
  {
    icon: BadgeCheckIcon,
    title: "신뢰도 향상",
    description: "거래처, 공공기관 입찰 등 법인 명의는 신뢰의 상징이 됩니다.",
  },
];
