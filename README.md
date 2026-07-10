# All-In-One Scheduler

All-In-One Scheduler는 ToDo 관리, 일정 캘린더, 친구 관리, 스마트 일정 조율 기능을 제공하는 웹 애플리케이션입니다.

## 프로젝트 구조

- `backend/` - Spring Boot 기반 REST API 서버
- `frontend/` - React + TypeScript + Vite 앱

## 주요 기능

- JWT Access Token + httpOnly Refresh Token 기반 인증
- Todo CRUD
- 캘린더 일정 등록/조회/수정/삭제
- 친구 목록 관리
- 친구 및 본인의 일정을 기반으로 한 일정 조율 결과 추천

## 인증 방식

- Access Token은 프론트엔드 메모리에 저장하며 API 요청 시 `Authorization: Bearer <access_token>` 헤더로 전송됩니다.
- Refresh Token은 httpOnly, SameSite=None 쿠키로 저장되어 브라우저에서 직접 접근할 수 없습니다.
- Access Token 만료 시 프론트엔드는 `/api/auth/refresh`를 호출해 새로운 Access Token과 Refresh Token을 발급받습니다.
- 로그아웃 시 서버에서 Refresh Token을 무효화하고 쿠키를 삭제합니다.

## 실행 방법

### 1. 백엔드 실행

```bash
cd backend
./gradlew bootRun -Dspring.profiles.active=local
```

Windows PowerShell:

```powershell
cd backend
./gradlew.bat bootRun -Dspring.profiles.active=local
```

### 2. 프론트엔드 실행

```bash
cd frontend
npm install
npm run dev
```

### 3. 환경 변수

프로젝트 루트 또는 실행 환경에 다음 변수를 설정합니다.

```env
DB_USERNAME=root
DB_PASSWORD=password
JWT_SECRET=my-secret-key-my-secret-key-my-secret-key
VITE_API_URL=http://localhost:8080
```

백엔드 로컬 설정은 `backend/src/main/resources/application-local.properties`에 정의되어 있으며 기본 값은 위와 같습니다.

## 문서

- `frontend/README.md` - 프론트엔드 관련 실행 및 구조 안내
- `backend/README.md` - 백엔드 관련 실행 및 인증/보안 안내

## 향후 개선

- 프로덕션용 CORS 및 쿠키 보안 강화
- Refresh Token 만료 및 로그아웃 시 세션 무효화 강화
- E2E 테스트 및 컴포넌트 테스트 추가
- 일정 조율 알고리즘 고도화
