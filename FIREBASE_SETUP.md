# Firebase 전화번호 인증 설정 가이드

## 1. Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com/)에 접속
2. "프로젝트 추가" 클릭
3. 프로젝트 이름 입력 (예: survey-app)
4. Google Analytics 설정 (선택사항)
5. 프로젝트 생성 완료

## 2. 웹 앱 추가

1. 프로젝트 개요에서 웹 아이콘(`</>`) 클릭
2. 앱 닉네임 입력
3. Firebase Hosting 설정 체크 (선택사항)
4. "앱 등록" 클릭
5. **Firebase 구성 정보 복사** (중요!)

```javascript
// 이런 형태의 구성 정보가 나타납니다
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef",
};
```

## 3. 전화번호 인증 활성화

1. 왼쪽 메뉴에서 **Authentication** 클릭
2. **Sign-in method** 탭 클릭
3. **Phone** 제공업체에서 **사용 설정** 클릭
4. **사용 설정됨** 토글을 켜기
5. **저장** 클릭

## 4. 환경변수 설정

프로젝트 루트에 `.env` 파일 생성:

```bash
VITE_FIREBASE_API_KEY=AIzaSyC...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
```

## 5. 테스트 전화번호 설정 (개발용)

실제 SMS를 받기 전에 테스트 번호로 먼저 확인해보세요:

1. Firebase Console > Authentication > Sign-in method
2. **Phone** 섹션에서 **고급** 클릭
3. **테스트 전화번호 추가**
4. 테스트할 전화번호와 확인 코드 입력:
   - 전화번호: `+82 10 1234 5678`
   - 확인 코드: `123456`
5. **추가** 클릭

### 테스트 번호 사용법

- 앱에서 `+82 10 1234 5678` 입력
- 실제 SMS 대신 설정한 확인 코드 `123456` 입력
- 인증 성공!

## 6. 도메인 승인 (배포 시 필요)

1. Firebase Console > Authentication > Settings
2. **승인된 도메인** 섹션
3. 도메인 추가 (예: your-domain.com)

## 7. 문제 해결

### 일반적인 오류들:

#### `auth/operation-not-allowed`

- **원인**: Phone Authentication이 활성화되지 않음
- **해결**: 위의 3단계 확인

#### `auth/invalid-phone-number`

- **원인**: 잘못된 전화번호 형식
- **해결**: +82 형식 사용 (예: +82 10 1234 5678)

#### `auth/quota-exceeded`

- **원인**: SMS 할당량 초과
- **해결**: Firebase 요금제 확인 또는 시간을 두고 재시도

#### `auth/too-many-requests`

- **원인**: 너무 많은 요청
- **해결**: 잠시 기다린 후 재시도

### 개발 환경에서 확인사항:

1. 브라우저 개발자 도구 콘솔 확인
2. Firebase 설정 상태 로그 확인
3. 디버그 정보 패널 활용

### 실제 SMS가 오지 않는 경우:

1. **Firebase 설정 확인**:

   - 환경변수가 올바르게 설정되었는지
   - Firebase Console에서 Phone Authentication 활성화 상태

2. **전화번호 형식 확인**:

   - 국가 코드 포함 (+82)
   - 올바른 번호 형식

3. **Firebase 요금제 확인**:

   - Spark 플랜에서는 SMS 제한이 있을 수 있음
   - Blaze 플랜 업그레이드 고려

4. **테스트 번호로 먼저 테스트**:
   - 실제 SMS 전에 테스트 번호로 플로우 확인

## 8. 보안 고려사항

- `.env` 파일을 `.gitignore`에 추가
- 프로덕션에서는 환경변수를 안전하게 관리
- Firebase 보안 규칙 설정
- 승인된 도메인만 허용
