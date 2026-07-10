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

애플리케이션 전역 설정 및 스토어

- routes/router.tsx
- routes/ProtectedRoute.tsx
- store/authStore.ts

### shared

여러 기능에서 공통으로 사용되는 인프라 레이어

- api/axios.ts (Axios 공통 인스턴스)
- components (공통 UI, Layout, Modal, Header 등)
- hooks (향후 확장 예정)
- utils (향후 확장 예정)
- types (향후 확장 예정)

### features

도메인별 비즈니스 로직 및 기능 컴포넌트 분할 영역

- auth (LoginForm, SignupForm 등)
- todo (TodoItem, TodoFilters 등)
- calendar (CalendarView, EventEditModal 등)
- friends (FriendList, AddFriendModal 등)
- scheduling (SchedulingForm, SchedulingResults 등)
- landing (HeroSection, FeatureSection 등)

### pages

라우터와 1:1 매핑되는 최상위 페이지 컨테이너

- LandingPage.tsx
- TodoPage.tsx
- CalendarPage.tsx
- FriendsPage.tsx
- SchedulingPage.tsx

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

프론트엔드는 백엔드와 분리된 도메인/포트에서 실행되므로 `withCredentials: true`를 사용하여 httpOnly Refresh Token 쿠키를 전송합니다.

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
├── app/                  # 애플리케이션 전역 설정 영역
│   ├── routes/           # 라우팅 정의 및 가드
│   │   ├── router.tsx    # 전체 라우트 정의 (LoginForm/SignupForm을 자식으로 내포)
│   │   └── ProtectedRoute.tsx # JWT 로그인 검사 및 접근 제어
│   └── store/
│       └── authStore.ts   # 로그인 사용자 정보/JWT 상태 관리 (Zustand)
│
├── shared/               # 여러 기능에서 공통으로 사용하는 코드
│   ├── api/
│   │   └── axios.ts      # Axios 인스턴스 생성 및 인터셉터 설정
│   ├── components/       # 재사용 가능한 프리미엄 컴포넌트 목록
│   │   ├── badge/
│   │   ├── button/
│   │   ├── card/
│   │   ├── footer/
│   │   ├── header/
│   │   ├── layout/
│   │   ├── loading/
│   │   ├── modal/
│   │   ├── state/
│   │   └── ui/
│   ├── hooks/            # 공통 훅 (향후 확장 예정)
│   ├── utils/            # 공통 유틸리티 (향후 확장 예정)
│   └── types/            # 공통 타입 정의 (향후 확장 예정)
│
├── features/             # 기능 단위 도메인 모듈 (비즈니스 로직 및 컴포넌트)
│   ├── auth/
│   │   ├── api/
│   │   │   └── authApi.ts # 로그인/회원가입 API
│   │   └── components/   # 로그인/회원가입 UI 폼 컴포넌트
│   │       ├── LoginForm.tsx
│   │       ├── LogoutButton.tsx
│   │       └── SignupForm.tsx
│   ├── todo/
│   │   ├── api/
│   │   │   └── tasks.ts   # Todo Mock 데이터
│   │   └── components/   # 할 일 필터 및 아이템 컴포넌트
│   │       ├── TodoFilters.tsx
│   │       ├── TodoInputForm.tsx
│   │       ├── TodoItem.tsx
│   │       └── TodoStats.tsx
│   ├── calendar/
│   │   ├── components/   # 달력 뷰 및 추가/상세/수정 모달
│   │   ├── hooks/
│   │   │   └── useCalendarModals.ts # 달력 내 상태 & 모달 제어 커스텀 훅
│   │   └── store/
│   │       └── EventStore.ts # 일정 상태 관리 (Zustand)
│   ├── friends/
│   │   └── components/   # 친구 목록 & 초대 모달 컴포넌트
│   │       ├── FriendList.tsx
│   │       └── AddFriendModal.tsx
│   ├── scheduling/
│   │   └── components/   # 일정 조율 조건 폼 & 매칭 결과 컴포넌트
│   │       ├── SchedulingForm.tsx
│   │       └── SchedulingResults.tsx
│   └── landing/
│       └── components/   # 랜딩 소개 각 섹션 컴포넌트
│
├── pages/                # Router와 1:1 매핑되는 페이지 컨테이너
│   ├── LandingPage.tsx   # 서비스 소개 페이지
│   ├── TodoPage.tsx      # 할 일 관리 메인 페이지
│   ├── CalendarPage.tsx  # 캘린더 일정 관리 페이지
│   ├── FriendsPage.tsx   # 친구 목록 관리 페이지
│   └── SchedulingPage.tsx # 스마트 일정 조율 페이지
│
├── layouts/
│   ├── MainLayout.tsx    # 로그인 후 레이아웃 (Header + Sidebar + Content)
│   └── AuthLayout.tsx    # 로그인/회원가입 전용 레이아웃
│
├── App.tsx               # 최상위 컴포넌트 (Router 연결)
└── main.tsx              # React 애플리케이션 진입점 및 ReactDOM 렌더링

