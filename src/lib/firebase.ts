import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase 설정 - 환경변수에서 값을 가져옵니다
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "your-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "your-auth-domain",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "your-storage-bucket",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ||
    "your-messaging-sender-id",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "your-app-id",
};

// 개발 환경에서 Firebase 설정 상태 로깅
if (import.meta.env.DEV) {
  console.log("🔥 Firebase Config Status:");
  console.log(
    "- API Key:",
    firebaseConfig.apiKey === "your-api-key" ? "❌ Not Set" : "✅ Set"
  );
  console.log(
    "- Auth Domain:",
    firebaseConfig.authDomain === "your-auth-domain" ? "❌ Not Set" : "✅ Set"
  );
  console.log(
    "- Project ID:",
    firebaseConfig.projectId === "your-project-id" ? "❌ Not Set" : "✅ Set"
  );
  console.log(
    "- App ID:",
    firebaseConfig.appId === "your-app-id" ? "❌ Not Set" : "✅ Set"
  );
  console.log("📋 Full Config:", firebaseConfig);
}

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Auth 인스턴스 내보내기
export const auth = getAuth(app);
export default app;
