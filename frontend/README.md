# All-In-One Scheduler Frontend

## 프로젝트 소개

All-In-One Scheduler는 단순한 ToDo 관리 서비스를 넘어, 여러 사용자의 일정을 분석하여 최적의 공통 가능 시간을 찾아주는 일정 조율 플랫폼입니다.

Frontend는 React + TypeScript 기반으로 구축되며, Zustand를 사용하여 전역 상태를 관리합니다.

---

## 기술 스택

### Core

- React
- TypeScript
- Vite

### State Management

- Zustand

### Routing

- React Router DOM

### API Communication

- Axios

### UI

- CSS Modules
- FullCalendar (예정)

---

## 프로젝트 구조

```text
src
├── app
├── shared
├── features
├── pages
├── layouts
├── App.tsx
└── main.tsx
```

### app

애플리케이션 전역 설정

- Router
- ProtectedRoute
- Zustand Store
- Provider

### shared

여러 기능에서 공통 사용

- API
- Components
- Hooks
- Utils
- Types

### features

기능 단위 모듈

- auth
- todo
- calendar
- friends
- scheduling
- notification

### pages

라우터와 1:1 매핑

- LandingPage
- LoginPage
- SignupPage
- TodoPage
- CalendarPage
- FriendsPage
- SchedulingPage

---

## 실행 방법

### 패키지 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 빌드

```bash
npm run build
```

### Preview

```bash
npm run preview
```

---

## 환경 변수

`.env`

```env
VITE_API_URL=http://localhost:8080
```

예시

```env
VITE_API_URL=https://api.myservice.com
```

---

## 인증 방식

JWT Bearer Token 사용

로그인 성공 시:

```json
{
  "accessToken": "..."
}
```

토큰은 localStorage에 저장하며 Axios Interceptor를 통해 자동 전송됩니다.

예시:

```http
Authorization: Bearer eyJhb...
```

---

## 개발 규칙

### Component

하나의 컴포넌트는 하나의 역할만 수행

예시:

```text
TodoList.tsx
TodoItem.tsx
TodoForm.tsx
```

### API 호출

컴포넌트에서 직접 Axios 사용 금지

❌

```ts
axios.get(...)
```

✅

```ts
taskApi.getTasks();
```

### 타입 관리

공통 타입은

```text
shared/types
```

에서 관리

예시:

```ts
export interface Task {
  id: number;
  title: string;
  completed: boolean;
}
```

---

## 향후 개발 예정

- 친구 시스템
- 실시간 알림
- 일정 조율 엔진
- FullCalendar 연동
- 모바일 반응형 UI
- PWA 지원

src/
├── app/ # 애플리케이션 전역 설정 영역
│ ├── router/
│ │ ├── Router.tsx # 전체 라우팅 정의
│ │ └── ProtectedRoute.tsx # JWT 로그인 여부 검사 후 접근 제어
│ │
│ ├── providers/
│ │ └── AuthProvider.tsx # 앱 시작 시 인증 상태 초기화 및 유지
│ │
│ └── store/
│ ├── authStore.ts # 로그인 사용자 정보/JWT 상태 관리 (Zustand)
│ ├── taskStore.ts # Todo 상태 관리
│ └── eventStore.ts # Event(일정) 상태 관리
│
├── shared/ # 여러 기능에서 공통으로 사용하는 코드
│ ├── api/
│ │ ├── axios.ts # Axios 인스턴스 생성 및 인터셉터 설정
│ │ ├── authApi.ts # 로그인/회원가입 API
│ │ ├── taskApi.ts # Todo API
│ │ ├── eventApi.ts # Event API
│ │ ├── friendApi.ts # 친구 관련 API
│ │ └── schedulingApi.ts # 일정 조율 API
│ │
│ ├── components/
│ │ ├── Button.tsx # 공통 버튼 컴포넌트
│ │ ├── Input.tsx # 공통 입력 컴포넌트
│ │ ├── Modal.tsx # 공통 모달 컴포넌트
│ │ ├── Header.tsx # 상단 네비게이션
│ │ ├── Sidebar.tsx # 좌측 메뉴바
│ │ ├── Loading.tsx # 로딩 UI
│ │ └── EmptyState.tsx # 데이터 없음 UI
│ │
│ ├── hooks/
│ │ ├── useAuth.ts # 인증 관련 커스텀 훅
│ │ ├── useDebounce.ts # 입력 디바운싱
│ │ └── useModal.ts # 모달 상태 관리
│ │
│ ├── utils/
│ │ ├── date.ts # 날짜 포맷 유틸
│ │ ├── token.ts # JWT 저장/삭제 유틸
│ │ ├── validation.ts # 입력값 검증 함수
│ │ └── constants.ts # 상수 관리
│ │
│ └── types/
│ ├── auth.ts # 로그인/회원가입 타입
│ ├── task.ts # Todo 타입 정의
│ ├── event.ts # Event 타입 정의
│ ├── friend.ts # 친구 타입 정의
│ └── scheduling.ts # 일정 조율 타입 정의
│
├── features/ # 기능 단위 모듈
│
│ ├── auth/
│ │ ├── components/ # 로그인/회원가입 UI
│ │ ├── hooks/ # 인증 관련 훅
│ │ └── services/ # 인증 비즈니스 로직
│ │
│ ├── todo/
│ │ ├── components/ # Todo 목록/생성/수정 UI
│ │ ├── hooks/ # Todo 관련 훅
│ │ └── services/ # Todo 기능 로직
│ │
│ ├── calendar/
│ │ ├── components/ # 달력, 일정 카드 UI
│ │ ├── hooks/ # 달력 관련 훅
│ │ └── services/ # 캘린더 비즈니스 로직
│ │
│ ├── friends/
│ │ ├── components/ # 친구 목록/친구 요청 UI
│ │ ├── hooks/ # 친구 기능 훅
│ │ └── services/ # 친구 기능 로직
│ │
│ ├── scheduling/
│ │ ├── components/ # 일정 조율 화면
│ │ ├── hooks/ # 일정 조율 훅
│ │ └── services/ # 일정 교집합 계산 결과 처리
│ │
│ └── notification/
│ ├── components/ # 알림 UI
│ ├── hooks/ # 알림 관련 훅
│ └── services/ # 알림 처리 로직
│
├── pages/ # Router와 1:1 매핑되는 페이지
│ ├── LandingPage.tsx # 서비스 소개 페이지
│ ├── LoginPage.tsx # 로그인 페이지
│ ├── SignupPage.tsx # 회원가입 페이지
│ ├── TodoPage.tsx # Todo 메인 페이지
│ ├── CalendarPage.tsx # 캘린더 페이지
│ ├── FriendsPage.tsx # 친구 관리 페이지
│ ├── SchedulingPage.tsx # 일정 조율 페이지
│ ├── NotificationPage.tsx # 알림 페이지
│ └── NotFoundPage.tsx # 404 페이지
│
├── layouts/
│ ├── MainLayout.tsx # 로그인 후 공통 레이아웃
│ │ # (Header + Sidebar + Content)
│ │
│ └── AuthLayout.tsx # 로그인/회원가입 전용 레이아웃
│
├── App.tsx # 최상위 컴포넌트
│ # Router 연결
│
└── main.tsx # React 애플리케이션 진입점 # ReactDOM 렌더링
