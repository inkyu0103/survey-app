import {
  type ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../lib/firebase";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface PhoneAuthProps {
  onAuthSuccess: () => void;
}

export const PhoneAuth: React.FC<PhoneAuthProps> = ({ onAuthSuccess }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<"phone" | "verification">("phone");
  const [debugInfo, setDebugInfo] = useState("");

  // reCAPTCHA 설정
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "invisible",
            callback: () => {
              console.log("✅ reCAPTCHA 검증 성공");
              setDebugInfo((prev) => prev + "\n✅ reCAPTCHA 검증 완료");
            },
            "expired-callback": () => {
              const msg = "reCAPTCHA가 만료되었습니다. 다시 시도해주세요.";
              console.error("❌ reCAPTCHA 만료");
              setError(msg);
              setDebugInfo((prev) => prev + "\n❌ reCAPTCHA 만료");
            },
          }
        );
        console.log("✅ reCAPTCHA 설정 완료");
        setDebugInfo((prev) => prev + "\n✅ reCAPTCHA 설정 완료");
      } catch (err) {
        console.error("❌ reCAPTCHA 설정 실패:", err);
        setDebugInfo((prev) => prev + `\n❌ reCAPTCHA 설정 실패: ${err}`);
      }
    }
  };

  // 전화번호로 인증 코드 전송
  const sendVerificationCode = async () => {
    if (!phoneNumber) {
      setError("전화번호를 입력해주세요.");
      return;
    }

    setLoading(true);
    setError("");
    setDebugInfo("🚀 인증 코드 전송 시작...");

    try {
      setupRecaptcha();

      const formattedPhoneNumber = phoneNumber.startsWith("+82")
        ? phoneNumber
        : `+82${
            phoneNumber.startsWith("0") ? phoneNumber.slice(1) : phoneNumber
          }`;

      console.log("📱 포맷된 전화번호:", formattedPhoneNumber);
      setDebugInfo(
        (prev) => prev + `\n📱 포맷된 전화번호: ${formattedPhoneNumber}`
      );

      // Firebase Auth 상태 확인
      console.log("🔥 Firebase Auth 앱:", auth.app.name);
      console.log("🔑 Firebase 프로젝트 ID:", auth.app.options.projectId);
      setDebugInfo(
        (prev) =>
          prev + `\n🔥 Firebase 프로젝트 ID: ${auth.app.options.projectId}`
      );

      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedPhoneNumber,
        window.recaptchaVerifier!
      );

      console.log("✅ 인증 코드 전송 성공");
      setDebugInfo((prev) => prev + "\n✅ 인증 코드 전송 성공!");
      setConfirmationResult(confirmation);
      setStep("verification");
      setError("");
    } catch (err: any) {
      console.error("❌ 인증 코드 전송 실패:", err);
      console.error("에러 코드:", err.code);
      console.error("에러 메시지:", err.message);

      let errorMessage = `인증 코드 전송 실패: ${err.message}`;

      // 자주 발생하는 에러들에 대한 한국어 설명
      if (err.code === "auth/invalid-phone-number") {
        errorMessage =
          "유효하지 않은 전화번호입니다. 올바른 형식으로 입력해주세요.";
      } else if (err.code === "auth/missing-phone-number") {
        errorMessage = "전화번호가 누락되었습니다.";
      } else if (err.code === "auth/quota-exceeded") {
        errorMessage = "SMS 할당량이 초과되었습니다. 나중에 다시 시도해주세요.";
      } else if (err.code === "auth/user-disabled") {
        errorMessage = "이 사용자 계정이 비활성화되었습니다.";
      } else if (err.code === "auth/operation-not-allowed") {
        errorMessage =
          "전화번호 인증이 활성화되지 않았습니다. Firebase Console에서 활성화해주세요.";
      }

      setError(errorMessage);
      setDebugInfo((prev) => prev + `\n❌ 에러: ${err.code} - ${err.message}`);

      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    } finally {
      setLoading(false);
    }
  };

  // 인증 코드 확인
  const verifyCode = async () => {
    if (!verificationCode || !confirmationResult) {
      setError("인증 코드를 입력해주세요.");
      return;
    }

    setLoading(true);
    setError("");
    setDebugInfo((prev) => prev + "\n🔍 인증 코드 확인 중...");

    try {
      await confirmationResult.confirm(verificationCode);
      console.log("✅ 인증 성공!");
      setDebugInfo((prev) => prev + "\n✅ 인증 성공!");
      onAuthSuccess();
    } catch (err: any) {
      console.error("❌ 인증 실패:", err);

      let errorMessage = `인증 실패: ${err.message}`;
      if (err.code === "auth/invalid-verification-code") {
        errorMessage = "잘못된 인증 코드입니다. 다시 확인해주세요.";
      } else if (err.code === "auth/code-expired") {
        errorMessage =
          "인증 코드가 만료되었습니다. 새로운 코드를 요청해주세요.";
      }

      setError(errorMessage);
      setDebugInfo(
        (prev) => prev + `\n❌ 인증 실패: ${err.code} - ${err.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep("phone");
    setPhoneNumber("");
    setVerificationCode("");
    setConfirmationResult(null);
    setError("");
    setDebugInfo("");
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
      window.recaptchaVerifier = null;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>관리자 인증</CardTitle>
        <CardDescription>
          {step === "phone"
            ? "전화번호를 입력하여 인증을 시작하세요."
            : "전송된 인증 코드를 입력하세요."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {step === "phone" ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="phone">전화번호</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="010-1234-5678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={loading}
              />
              <p className="text-xs text-gray-500">
                예시: 010-1234-5678 또는 +82-10-1234-5678
              </p>
            </div>
            <Button
              onClick={sendVerificationCode}
              disabled={loading || !phoneNumber}
              className="w-full"
            >
              {loading ? "전송 중..." : "인증 코드 전송"}
            </Button>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <Label htmlFor="code">인증 코드</Label>
              <Input
                id="code"
                type="text"
                placeholder="123456"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                disabled={loading}
                maxLength={6}
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={verifyCode}
                disabled={loading || !verificationCode}
                className="flex-1"
              >
                {loading ? "확인 중..." : "인증 확인"}
              </Button>
              <Button variant="outline" onClick={resetForm} disabled={loading}>
                다시 시도
              </Button>
            </div>
          </>
        )}

        {error && (
          <div className="text-red-500 text-sm p-3 bg-red-50 rounded-md border border-red-200">
            <div className="font-medium">오류 발생:</div>
            <div>{error}</div>
          </div>
        )}

        {/* 디버그 정보 (개발 환경에서만 표시) */}
        {import.meta.env.DEV && debugInfo && (
          <div className="text-xs text-gray-600 p-3 bg-gray-50 rounded-md border border-gray-200 font-mono whitespace-pre-line">
            <div className="font-medium mb-1">디버그 정보:</div>
            {debugInfo}
          </div>
        )}

        {/* Firebase 설정 확인 (개발 환경에서만 표시) */}
        {import.meta.env.DEV && (
          <div className="text-xs text-gray-600 p-3 bg-blue-50 rounded-md border border-blue-200">
            <div className="font-medium mb-1">📋 설정 확인:</div>
            <div>프로젝트 ID: {auth.app.options.projectId}</div>
            <div>Auth 도메인: {auth.app.options.authDomain}</div>
            <div className="text-orange-600 mt-1">
              💡 실제 SMS가 오지 않는다면 Firebase Console에서 Phone
              Authentication이 활성화되어 있는지 확인하세요.
            </div>
          </div>
        )}

        {/* reCAPTCHA 컨테이너 */}
        <div id="recaptcha-container"></div>
      </CardContent>
    </Card>
  );
};
