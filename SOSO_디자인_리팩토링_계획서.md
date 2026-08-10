# SOSO 디자인 통일감 리팩토링 계획서

## 1. 현재 상태 진단

### 1.1 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 서비스명 | SOSO (SoSo) — "소소하게 비워내는 일상의 틈" |
| 프론트엔드 | React 19 + TypeScript + Tailwind CSS v4 + Vite |
| 주요 페이지 | Landing, Todo, Calendar, Friends, Scheduling |
| 디자인 토큰 | `index.css`의 `@theme` 블록에서 관리 (색상 25종, 섀도우 2종) |

### 1.2 현재 디자인 키워드

- **베이스**: 파스텔 톤 (연한 블루 `#c8dbfe`, 라벤더 `#dccfff`, 핑크 `#ffd6e7`)
- **액센트**: 퍼플 `#7b61ff` (로고, 활성 네비게이션, CTA)
- **네오-브루탈리즘 요소**: `border-2 border-text`, `shadow-[Npx_Npx_0px_0px_#1e2538]` (랜딩 페이지 전반)
- **클린 요소**: `border(1px)`, `shadow-sm`, `rounded-2xl` (대시보드 Card, Input)

### 1.3 발견된 불일치 문제 (총 12건)

#### 문제 1. 버튼 스타일 5종 혼재

| 사용 위치 | 스타일 | 비고 |
|-----------|--------|------|
| `Button.tsx` (공유) | `rounded-full`, `border-2 border-primary`, `bg-primary-bg` | 파스텔 필라 |
| 랜딩 Hero CTA | `rounded-2xl`, `border-2 border-text`, `shadow-[2px_2px_0px]` | 네오-브루탈 |
| 랜딩 CTASection | `rounded-2xl`, `border-2 border-text`, `shadow-[4px_4px_0px]` | 네오-브루탈 (섀도우 크기 다름) |
| TodoPage/FriendsPage 모달 취소 | `rounded-xl`, `border-2 border-text`, `shadow-[2px_2px_0px]` | 인라인 네오-브루탈 |
| LoginForm/SignupForm 제출 | `rounded-xl`, `bg-primary`, border 없음 | 플랫 파스텔 |
| ConfirmModal 취소 | `rounded-xl`, `border(1px)`, 섀도우 없음 | 미니멀 플랫 |

→ **동일한 "취소" 버튼이 페이지마다 다르게 생김**

#### 문제 2. Card 컴포넌트 4종 혼재

| 컴포넌트 | 보더 | 라운딩 | 섀도우 | 배경 |
|----------|------|--------|--------|------|
| `Card` (default) | `border(1px)` | `rounded-2xl` | `shadow-sm` | `bg-card` |
| `Card` (landing/neo) | `border-3 border-text` | `rounded-3xl` | `shadow-[3px_3px_0px_0px]` | `bg-muted` |
| `ResultCard` | `border-3 border-text` | `rounded-3xl` | `shadow-[6px_6px_0px_0px_#edf4ff]` | `bg-white` |
| `DdayCard` | border 없음 | `rounded-2xl` | 섀도우 없음 | `bg-primary` |
| SchedulingResults 아이템 | `border-3 border-text` | `rounded-2xl` | `shadow-[4px_4px_0px_0px]` | `bg-white`/`bg-primary-bg` |

#### 문제 3. Input 컴포넌트 불일치

- 공유 `Input.tsx`: `border-slate-300` 사용
- `LoginForm` / `SignupForm`: 공유 Input을 쓰지 않고 인라인 `<input>` 사용, `border-border` 색상 상이
- `SchedulingForm` 친구 목록 영역: `border-slate-200`, `bg-slate-50` 사용 (테마 색상 아님)

#### 문제 4. 색상 하드코딩 (테마 토큰 미사용)

| 하드코딩 값 | 사용 위치 | 의미 |
|-------------|-----------|------|
| `#1e2538` | 네오-브루탈 섀도우 전반 | `--color-text`와 동일 |
| `#7b61ff` | CTASection 섀도우 | `--color-accent-purple`와 동일 |
| `#c8dbfe` | CalendarMockup 섀도우 | `--color-primary`와 동일 |
| `#edf4ff` | ResultCard 섀도우 | `--color-primary-bg`와 동일 |
| `#ff8c00` | CalendarView 이벤트 바 | 테마에 없는 오렌지 |
| `#cbd5e1` | CalendarView 격자선 | 테마에 없는 슬레이트 |
| `#e2e8f0` | CalendarView 헤더 배경 | 테마에 없는 슬레이트 |
| `#f5f5f5` | Footer 구분선 | 테마에 없는 그레이 |
| `bg-red-600` | FriendsPage 토스트 | 파스텔 테마와 충돌 |
| `bg-emerald-100/700`, `bg-amber-100/700` | SchedulingResults 배지 | 테마에 없는 색상 |

#### 문제 5. 텍스트 색상 체계 혼란

- `text-text`, `text-text-gray`, `text-slate-500`, `text-slate-400`, `text-muted-foreground`가 목적 없이 섞여 사용됨
- 동일한 "서브 텍스트" 역할에 4가지 색상 변수가 교차 사용됨

#### 문제 6. 보더 두께 4종 혼재

- `border` (1px) — 기본 Card, Input, CalendarView, EmptyState
- `border-2` — Button, 네오-브루탈 버튼/카드 전반
- `border-3` — Landing Card, ResultCard, SchedulingForm
- `border-4` — CTASection 메인 박스

#### 문제 7. 라운딩 6종 혼재

- `rounded-full` — Button, Badge
- `rounded-xl` — Input, 일부 인라인 버튼
- `rounded-2xl` — 기본 Card, DdayCard, 모달 내 버튼
- `rounded-3xl` — Landing Card, Modal 본체
- `rounded-4xl` — CalendarMockup
- `rounded-[36px]` — CTASection 메인 박스

#### 문제 8. 섀도우 체계 미정립

- `--shadow-card`, `--shadow-hover` 토큰이 정의되어 있으나 **사용되지 않음**
- 네오-브루탈 섀도우가 6종 크기로 인라인 하드코딩: `1px`, `2px`, `3px`, `4px`, `6px`, `8px`

#### 문제 9. 섹션 헤더 2종 패턴

- `ProblemSection`: `SectionHeader` 공유 컴포넌트 사용
- `FeatureSection`, `ProcessSection`, `ExampleSection`: 인라인 헤더 (배지 스타일 상이)
  - `bg-primary/30` + `border-2` vs `SectionHeader`의 `bg-primary/30` + `border-2` (유사하나 별도 구현)

#### 문제 10. 폰트 웨이트 체계 부재

- `font-medium`, `font-semibold`, `font-bold`, `font-extrabold`, `font-black`가 명확한 역할 없이 섞임
- 동일한 "제목" 역할에 `font-bold`와 `font-black`가 교차 사용됨

#### 문제 11. 폰트 패밀리 미설정

- 커스텀 폰트 없이 시스템 기본 폰트 사용
- SOSO의 "친근하면서도 깔끔한" 페르소나와 매칭되는 타이포그래피 부재

#### 문제 12. 토스트/알림 컴포넌트 부재

- `FriendsPage`에 인라인 토스트 구현 (`bg-red-600` — 파스텔 테마와 전혀 안 어울림)
- 공유 Toast 컴포넌트 없음

---

## 2. 디자인 방향성

### 2.1 SOSO 디자인 페르소나

> **"소소하게, 하지만 또렷하게"**
>
> 파스텔 톤의 부드러움을 베이스로 하되, 네오-브루탈리즘의 선명한 보더와 그림자 포인트로 **개성과 임팩트**를 더한다.
> 랜딩에서는 **개성(브루탈)**을, 대시보드에서는 **깔끔함(클린)**을 강조하되, **공통 디자인 토큰과 컴포넌트**로 둘을 자연스럽게 연결한다.

### 2.2 디자인 원칙

| 원칙 | 설명 |
|------|------|
| **1. 하나의 토큰 시스템** | 모든 색상, 섀도우, 라운딩, 보더는 `@theme` 토큰에서만 정의. 하드코딩 금지. |
| **2. 컴포넌트 단일 소스** | 버튼, 카드, 인풋 등은 공유 컴포넌트의 variant로 관리. 인라인 스타일 금지. |
| **3. 일관된 네오-브루탈 포인트** | 네오-브루탈 요소는 "포인트"로만 사용. 보더 두께, 섀도우 오프셋, 라운딩을 3단계로 표준화. |
| **4. 명확한 타이포그래피 스케일** | 폰트 패밀리 1종 + 웨이트 5단계 + 사이즈 6단계로 타이포그래피 체계 확립. |
| **5. 랜딩-대시보드 연속성** | 랜딩(브루탈 강조) → 대시보드(클린 강조)로 갈수록 "브루탈 포인트"를 줄이되, 액센트 컬러와 컴포넌트는 동일하게 유지. |

---

## 3. 토큰 시스템 재설계

### 3.1 색상 토큰 (`@theme` 재정의)

```css
@theme {
  /* === 배경 레이어 === */
  --color-background: #f8fbff;          /* 전체 배경 */
  --color-surface: #ffffff;             /* 카드/모달 배경 */
  --color-surface-muted: #edf4ff;       /* 섹션 구분 배경 (구 primary-bg) */

  /* === 프라이머리 (블루 계열) === */
  --color-primary: #c8dbfe;             /* 버튼/배지 배경 */
  --color-primary-hover: #b3ccfa;       /* 호버 상태 */
  --color-primary-dark: #3b568f;        /* 보더/텍스트 강조 */

  /* === 액센트 (퍼플 — SOSO 시그니처) === */
  --color-accent: #7b61ff;              /* 로고, 활성 상태, CTA (구 accent-purple) */
  --color-accent-soft: #dccfff;         /* 액센트 배경 (구 secondary) */
  --color-accent-pink: #ffd6e7;         /* 핑크 포인트 (구 accent) */

  /* === 텍스트 === */
  --color-text: #1e2538;                /* 메인 텍스트 + 네오-브루탈 보더/섀도우 */
  --color-text-secondary: #616b82;      /* 서브 텍스트 (구 text-gray) */
  --color-text-muted: #94a3b8;          /* 플레이스홀더, 비활성 (구 muted-foreground 통합) */

  /* === 상태 색상 === */
  --color-success: #9bf78f;             /* 성공 배지 */
  --color-success-soft: #e6f4ea;        /* 성공 배경 */
  --color-success-text: #2b6938;        /* 성공 텍스트 */
  --color-warning: #ffe5b8;             /* 경고 배지 */
  --color-warning-text: #86640d;        /* 경고 텍스트 */
  --color-danger: #ffd6d6;              /* 위험 배지 */
  --color-danger-text: #b91c1c;         /* 위험 텍스트 */

  /* === 보더 === */
  --color-border: #dbe7ff;              /* 기본 보더 */
  --color-border-strong: #1e2538;       /* 네오-브루탈 보더 (text와 동일, 의미 분리) */
  --color-input: #dbe7ff;               /* 인풋 보더 */

  /* === 마이크 === */
  --color-milk-white: #fcfbf7;          /* 따뜻한 화이트 포인트 */

  /* === 링 === */
  --color-ring: #7b61ff;                /* 포커스 링 (accent로 통일) */

  /* === 섀도우 === */
  --shadow-card: 0 2px 10px rgba(0, 0, 0, 0.04);       /* 클린 카드 */
  --shadow-hover: 0 12px 30px rgba(0, 0, 0, 0.08);     /* 호버 카드 */
  --shadow-brutal-sm: 2px 2px 0px 0px var(--color-text);       /* 네오-브루탈 S */
  --shadow-brutal-md: 4px 4px 0px 0px var(--color-text);       /* 네오-브루탈 M */
  --shadow-brutal-lg: 6px 6px 0px 0px var(--color-text);       /* 네오-브루탈 L */
  --shadow-brutal-accent: 6px 6px 0px 0px var(--color-accent); /* 네오-브루탈 액센트 */
}
```

### 3.2 타이포그래피 스케일

```css
@theme {
  /* 폰트 패밀리 — Pretendard (한국어 친화적, 깔끔 + 친근) */
  --font-sans: "Pretendard Variable", Pretendard, -apple-system, sans-serif;

  /* 폰트 웨이트 5단계 */
  --font-weight-medium: 500;    /* 본문 */
  --font-weight-semibold: 600;  /* 라벨, 강조 본문 */
  --font-weight-bold: 700;      /* 소제목, 버튼 */
  --font-weight-extrabold: 800; /* 페이지 제목, 카드 타이틀 */
  --font-weight-black: 900;     /* 히어로 타이틀, 로고 */
}
```

| 레벨 | 클래스 | 웨이트 | 사이즈 | 용도 |
|------|--------|--------|--------|------|
| Display | `text-4xl sm:text-5xl font-black` | 900 | 36-48px | 랜딩 히어로 타이틀 |
| H1 | `text-3xl sm:text-4xl font-extrabold` | 800 | 30-36px | 페이지 헤더 (PageHeader) |
| H2 | `text-2xl sm:text-3xl font-extrabold` | 800 | 24-30px | 섹션 헤더 (랜딩) |
| H3 | `text-xl font-bold` | 700 | 20px | 카드 타이틀, 모달 타이틀 |
| Body | `text-base font-medium` | 500 | 16px | 본문 텍스트 |
| Label | `text-sm font-semibold` | 600 | 14px | 라벨, 배지, 버튼 텍스트 |
| Caption | `text-xs font-medium` | 500 | 12px | 캡션, 메타 정보 |

### 3.3 라운딩 스케일 (4단계)

| 토큰 | 값 | 용도 |
|------|----|------|
| `rounded-lg` | 8px | 배지, 작은 버튼 |
| `rounded-xl` | 12px | 인풋, 일반 버튼 |
| `rounded-2xl` | 16px | 카드 (클린), 모달 내 버튼 |
| `rounded-3xl` | 24px | 카드 (네오-브루탈), 모달 본체 |

→ `rounded-full`은 필라형 버튼/배지에만 사용
→ `rounded-4xl`, `rounded-[36px]` 제거

### 3.4 보더 두께 스케일 (3단계)

| 토큰 | 값 | 용도 |
|------|----|------|
| `border` | 1px | 클린 모드 (기본 Card, Input) |
| `border-2` | 2px | 네오-브루탈 S (버튼, 배지, 작은 카드) |
| `border-3` | 3px | 네오-브루탈 L (랜딩 카드, CTA 박스) |

→ `border-4` 제거, `border-3`로 통일

### 3.5 네오-브루탈 섀도우 스케일 (4종)

| 토큰 | 오프셋 | 용도 |
|------|--------|------|
| `shadow-brutal-sm` | 2px | 버튼, 배지, 작은 카드 |
| `shadow-brutal-md` | 4px | 중간 카드, CTA 버튼 |
| `shadow-brutal-lg` | 6px | 랜딩 대형 카드, CalendarMockup |
| `shadow-brutal-accent` | 6px (액센트 색) | 포인트 카드 (CalendarMockup 알림, ResultCard) |

→ 모든 섀도우 색상은 `var(--color-text)` 또는 `var(--color-accent)` 사용

### 3.6 애니메이션 토큰

```css
@theme {
  --animate-hover-lift: translateY(-2px);
  --transition-fast: 150ms ease;
  --transition-normal: 200ms ease;
  --transition-slow: 300ms ease;
}
```

| 클래스 | 효과 | 용도 |
|--------|------|------|
| `hover:-translate-y-0.5` | 2px 상승 | 작은 버튼, 배지 |
| `hover:-translate-y-1` | 4px 상승 | 카드, 중간 버튼 |
| `hover:-translate-y-1.5` | 6px 상승 | 대형 CTA 버튼 |
| `transition-all duration-200` | 200ms | 기본 전환 |

---

## 4. 컴포넌트 리팩토링 계획

### 4.1 Button — variant 4종으로 통일

```typescript
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "brutal" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}
```

| variant | 외형 | 용도 |
|---------|------|------|
| `primary` | `rounded-full`, `border-2 border-primary`, `bg-surface-muted`, 호버 시 `border-primary-dark` | 대시보드 기본 버튼 (현재 Button.tsx) |
| `brutal` | `rounded-xl`, `border-2 border-border-strong`, `bg-accent`, `text-white`, `shadow-brutal-sm` | 랜딩 CTA, 모달 확인 버튼 |
| `ghost` | `rounded-xl`, `border-2 border-border-strong`, `bg-surface`, `shadow-brutal-sm` | 모달 취소, 보조 버튼 |
| `danger` | `rounded-xl`, `border-2 border-border-strong`, `bg-danger`, `shadow-brutal-sm` | 삭제, 거절 버튼 |

| size | 패딩 | 폰트 |
|------|------|------|
| `sm` | `px-3 py-1.5` | `text-xs` |
| `md` | `px-4 py-2` | `text-sm` |
| `lg` | `px-6 py-3.5` | `text-base` |

**대상 파일**: `shared/components/button/Button.tsx`
**영향 받는 파일**: 모든 인라인 버튼을 사용하는 페이지 (TodoPage, FriendsPage, LandingHeader, CTASection, HeroSection, FriendList, SchedulingResults, AddFriendModal, ConfirmModal)

### 4.2 Card — variant 3종으로 통일

```typescript
interface CardProps {
  variant?: "clean" | "brutal" | "brutal-accent";
  // ... 기존 props 유지
}
```

| variant | 외형 | 용도 |
|---------|------|------|
| `clean` | `rounded-2xl`, `border(1px) border-border`, `bg-surface`, `shadow-card` | 대시보드 카드 (TodoItem, TodoStats, CalendarSidebar) |
| `brutal` | `rounded-3xl`, `border-3 border-border-strong`, `bg-surface-muted`, `shadow-brutal-lg` | 랜딩 카드 (FeatureSection, ProblemSection, ProcessSection) |
| `brutal-accent` | `rounded-3xl`, `border-3 border-border-strong`, `bg-surface`, `shadow-brutal-accent` | 포인트 카드 (ResultCard, CalendarMockup 알림) |

→ 기존 `landing` / `neo` variant는 `brutal`로 통합
→ `DdayCard`는 `clean` variant에 `bg-primary` 추가하는 방식으로 통일
→ `SchedulingResults` 아이템은 `brutal` variant 사용

**대상 파일**: `shared/components/card/Card.tsx`, `shared/components/card/DdayCard.tsx`, `shared/components/card/ResultCard.tsx`

### 4.3 Input — 단일 컴포넌트로 통일

```typescript
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?: "default" | "brutal";
}
```

| variant | 외형 | 용도 |
|---------|------|------|
| `default` | `rounded-xl`, `border border-border`, `bg-surface`, `focus:border-accent` | 대시보드 인풋 |
| `brutal` | `rounded-xl`, `border-2 border-border-strong`, `bg-surface`, `shadow-brutal-sm` | 랜딩/모달 인풋 (필요 시) |

**핵심 변경**:
- `border-slate-300` → `border-border` (테마 토큰 사용)
- `LoginForm` / `SignupForm`의 인라인 `<input>` → 공유 `Input` 컴포넌트로 교체
- `SchedulingForm` 친구 목록 영역의 `border-slate-200`, `bg-slate-50` → `border-border`, `bg-surface-muted`

**대상 파일**: `shared/components/ui/Input.tsx`, `features/auth/components/LoginForm.tsx`, `features/auth/components/SignupForm.tsx`, `features/scheduling/components/SchedulingForm.tsx`

### 4.4 Modal — 섀도우 토큰 적용

- `rounded-3xl` → 유지 (모달 본체는 가장 큰 라운딩 유지)
- `border-border` → `border-2 border-border` (보더 두께 명확화)
- `shadow-md` → `shadow-brutal-md` (네오-브루탈 섀도우 적용)
- 닫기 버튼 `✕` 텍스트 → Lucide `X` 아이콘으로 통일

**대상 파일**: `shared/components/modal/Modal.tsx`, `shared/components/modal/ConfirmModal.tsx`

### 4.5 Badge — 테마 색상 적용

- `bg-slate-100` → `bg-surface-muted`
- `bg-success-dark` → `bg-success`
- `bg-warn` → `bg-warning`
- `bg-danger` → `bg-danger` (유지)
- 텍스트 색상: `text-text-secondary` 통일

**대상 파일**: `shared/components/badge/Badge.tsx`

### 4.6 EmptyState — 테마 색상 적용

- `border-dashed` → `border-2 border-dashed border-border`
- `text-slate-500` → `text-text-secondary`
- `rounded-2xl` 유지

**대상 파일**: `shared/components/state/EmptyState.tsx`

### 4.7 Avatar — 섀도우 토큰 적용

- `shadow-[1px_1px_0px_0px_rgba(0,0,0,0.3)]` → `shadow-brutal-sm` (또는 별도 `shadow-avatar` 토큰)
- `bg-primary` 유지

**대상 파일**: `shared/components/ui/Avatar.tsx`

### 4.8 Toast (신규) — 공통 토스트 컴포넌트 생성

```typescript
interface ToastProps {
  message: string;
  variant?: "info" | "success" | "danger";
  onClose: () => void;
}
```

| variant | 배경 | 아이콘 |
|---------|------|--------|
| `info` | `bg-accent text-white` | Info |
| `success` | `bg-success text-success-text` | CheckCircle |
| `danger` | `bg-danger text-danger-text` | AlertCircle |

→ `FriendsPage` 인라인 토스트 (`bg-red-600`)를 이 컴포넌트로 교체

**대상 파일**: `shared/components/toast/Toast.tsx` (신규), `pages/FriendsPage.tsx`

### 4.9 SectionHeader — 모든 랜딩 섹션에 적용

- `FeatureSection`, `ProcessSection`, `ExampleSection`의 인라인 헤더를 `SectionHeader` 컴포넌트로 통일
- 배지 스타일: `rounded-full bg-surface-muted border-2 border-border px-4 py-2 text-sm font-bold text-text-secondary`

**대상 파일**: `features/landing/components/FeatureSection.tsx`, `features/landing/components/ProcessSection.tsx`, `features/landing/components/ExampleSection.tsx`

### 4.10 CalendarView — 인라인 CSS 테마 토큰화

- `<style dangerouslySetInnerHTML>` 내 하드코딩 색상을 CSS 변수로 교체
- `#ff8c00` (이벤트 바) → `--color-accent` 기반 파레트에 새 색상 추가 또는 `--color-primary-dark` 활용
- `#cbd5e1` → `var(--color-border)`
- `#e2e8f0` → `var(--color-surface-muted)`
- `rgba(118, 75, 162, ...)` → `var(--color-accent)` 기반 rgba

**대상 파일**: `features/calendar/components/CalendarView.tsx`

### 4.11 Footer — 테마 색상 적용

- `border-[#f5f5f5]` → `border-border`
- `text-text-muted` → `text-text-muted` (토큰 재매핑)
- `text-primary-light-foreground` → `text-text-secondary`

**대상 파일**: `shared/components/footer/Footer.tsx`

---

## 5. 페이지별 리팩토링 상세

### 5.1 Landing Page

| 섹션 | 현재 상태 | 변경 사항 |
|------|-----------|-----------|
| HeroSection | 인라인 버튼 (네오-브루탈) | `Button variant="brutal" size="lg"` 적용 |
| HeroSection 배지 | `bg-primary` 인라인 | `bg-surface-muted border-2 border-border` 배지 컴포넌트화 |
| ProblemSection | `SectionHeader` + `Card variant="landing"` | `SectionHeader` 유지 + `Card variant="brutal"` |
| FeatureSection | 인라인 헤더 + `Card variant="landing"` | `SectionHeader` 적용 + `Card variant="brutal"` |
| ProcessSection | 인라인 헤더 + `Card variant="landing"` | `SectionHeader` 적용 + `Card variant="brutal"` |
| ExampleSection | 인라인 헤더 + `ResultCard` | `SectionHeader` 적용 + `Card variant="brutal-accent"` |
| CTASection | `rounded-[36px]`, `border-4`, `shadow-[8px_8px_0px]` | `rounded-3xl`, `border-3`, `shadow-brutal-lg` |
| CalendarMockup | `rounded-4xl`, `shadow-[6px_6px_0px_0px_#c8dbfe]` | `rounded-3xl`, `shadow-brutal-accent` |
| LandingHeader | 회원가입 버튼 인라인 | `Button variant="brutal" size="sm"` 적용 |

### 5.2 Todo Page

| 요소 | 현재 상태 | 변경 사항 |
|------|-----------|-----------|
| PageHeader | `text-slate-500` 설명 | `text-text-secondary` |
| TodoStats | `Card` (default) + `text-slate-500` | `Card variant="clean"` + `text-text-secondary` |
| DdayCard | border 없음, 섀도우 없음 | `Card variant="clean"` 기반 + `bg-primary` 유지 |
| TodoItem | `Card` (default) + `text-slate-500` | `Card variant="clean"` + `text-text-secondary` |
| TodoFilter | `bg-success-muted`, `shadow-[1px_1px_0px]` | `bg-surface-muted` + `shadow-brutal-sm` (활성 시) |
| 모달 취소 버튼 | 인라인 네오-브루탈 | `Button variant="ghost" size="md"` |
| 모달 등록 버튼 | `Button` (공유) | `Button variant="primary" size="md"` |
| EmptyState | `text-slate-500` | `text-text-secondary` |

### 5.3 Calendar Page

| 요소 | 현재 상태 | 변경 사항 |
|------|-----------|-----------|
| CalendarView 컨테이너 | `border-slate-200`, `shadow-sm` | `border-border`, `shadow-card` |
| CalendarView 인라인 CSS | 6종 하드코딩 색상 | CSS 변수로 전면 교체 |
| CalendarSidebar | `Card` (default) + `text-slate-500` | `Card variant="clean"` + `text-text-secondary` |
| 로딩/에러 | `text-slate-500`, `text-red-500` | `text-text-secondary`, `text-danger-text` |
| 이벤트 바 색상 | `#ff8c00` (오렌지) | `--color-accent` 기반 색상 또는 새 토큰 추가 |

### 5.4 Friends Page

| 요소 | 현재 상태 | 변경 사항 |
|------|-----------|-----------|
| 토스트 | `bg-red-600 text-white` 인라인 | `Toast variant="info"` 컴포넌트 |
| 섹션 제목 | `border-b-2 border-text` 인라인 | `SectionHeader` 또는 별도 `SubSectionHeader` 컴포넌트 |
| FriendList 빈 상태 | `border-2 border-dashed border-text` 인라인 | `EmptyState` 컴포넌트 사용 |
| FriendList 아바타 | 인라인 네오-브루탈 | `Avatar` 컴포넌트 사용 |
| FriendList 버튼들 | 4종 인라인 네오-브루탈 | `Button variant="ghost/danger" size="sm"` |
| 삭제 확인 모달 | 인라인 네오-브루탈 버튼 | `Button variant="ghost/danger"` |
| 로딩 텍스트 | `text-slate-400` | `text-text-muted` |

### 5.5 Scheduling Page

| 요소 | 현재 상태 | 변경 사항 |
|------|-----------|-----------|
| SchedulingForm | `Card className="border-3"` | `Card variant="brutal"` |
| SchedulingForm 라벨 | `text-text` 유지 | 유지 |
| SchedulingForm 친구 목록 | `border-slate-200`, `bg-slate-50` | `border-border`, `bg-surface-muted` |
| SchedulingForm 제출 버튼 | `Button` (공유) + 이모지 | `Button variant="brutal" size="md"` |
| SchedulingResults 아이템 | 인라인 네오-브루탈 | `Card variant="brutal"` |
| SchedulingResults 배지 | `bg-emerald-100`, `bg-amber-100` | `bg-success-soft text-success-text`, `bg-warning text-warning-text` |
| SchedulingResults 확정 버튼 | 인라인 네오-브루탈 | `Button variant="ghost" size="sm"` |
| SchedulingResults 빈 상태 | `border-border` 인라인 | `EmptyState` 컴포넌트 사용 |

### 5.6 Auth (Login/Signup)

| 요소 | 현재 상태 | 변경 사항 |
|------|-----------|-----------|
| 폼 인풋 | 인라인 `<input>`, `border-border` | 공유 `Input` 컴포넌트 사용 |
| 제출 버튼 | `bg-primary`, border 없음 | `Button variant="primary" size="lg"` (풀와이드) |
| 로고 텍스트 | `text-3xl font-bold` | `text-3xl font-black text-accent` (헤더 로고와 통일) |
| 스위치 링크 | `font-semibold hover:underline` | `text-accent font-semibold hover:underline` |

---

## 6. 폰트 도입 계획

### 6.1 Pretendard Variable 적용

```html
<!-- index.html <head>에 추가 -->
<link rel="stylesheet" as="style" crossorigin
  href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css" />
```

```css
/* index.css @theme에 추가 */
--font-sans: "Pretendard Variable", Pretendard, -apple-system, sans-serif;
```

```css
/* index.css 전역 적용 */
body {
  font-family: var(--font-sans);
}
```

### 6.2 도입 이유

- 한국어 가독성 최고 수준 (Apple SD Gothic 호환)
- Variable 폰트로 웨이트 100-900 단일 파일 커버
- 시스템 폰트 대비 디자인 일관성 확보 (OS별 렌더링 차이 제거)
- "소소하게" 친근하면서도, 웨이트 900에서 임팩트 있는 타이포 가능

---

## 7. 애니메이션/인터랙션 표준화

### 7.1 호버 인터랙션

| 컴포넌트 | 호버 효과 | 전환 |
|----------|-----------|------|
| `Button` (primary) | `border-primary-dark` | `transition-all duration-200` |
| `Button` (brutal) | `-translate-y-0.5`, `shadow-brutal-md` | `transition-all duration-200` |
| `Button` (ghost) | `bg-surface-muted` | `transition-all duration-200` |
| `Card` (clean) | `shadow-hover` | `transition-shadow duration-200` |
| `Card` (brutal) | `-translate-y-1` | `transition-all duration-300` |
| `Card` (brutal-accent) | `-translate-y-1` | `transition-all duration-300` |
| 네비게이션 링크 | `text-accent` | `transition-colors duration-200` |

### 7.2 모달 진출/퇴출

- 진출: `fade-in zoom-in-95 duration-200` (현재 유지)
- 퇴출: `fade-out zoom-out-95 duration-150` (추가 필요 — 현재 퇴출 애니메이션 없음)

### 7.3 토스트 애니메이션

- 진출: `slide-down-fade-in duration-200`
- 퇴출: `fade-out duration-150` (1초 후 자동 소멸)

---

## 8. 실행 로드맵

### Phase 1: 토큰 시스템 재설계 (기반 작업)

| 순서 | 작업 | 대상 파일 | 예상 시간 |
|------|------|-----------|-----------|
| 1-1 | `index.css` `@theme` 토큰 전면 재정의 | `src/index.css` | 0.5h |
| 1-2 | Pretendard 폰트 CDN 추가 + 전역 적용 | `index.html`, `src/index.css` | 0.5h |
| 1-3 | 기존 색상 토큰 → 신규 토큰 매핑 문서 작성 | (참고용) | 0.5h |

### Phase 2: 공유 컴포넌트 리팩토링

| 순서 | 작업 | 대상 파일 | 예상 시간 |
|------|------|-----------|-----------|
| 2-1 | `Button` variant/size 시스템 구현 | `shared/components/button/Button.tsx` | 1h |
| 2-2 | `Card` variant 시스템 구현 (clean/brutal/brutal-accent) | `shared/components/card/Card.tsx` | 1h |
| 2-3 | `Input` variant 시스템 + 테마 색상 교체 | `shared/components/ui/Input.tsx` | 0.5h |
| 2-4 | `Modal` 섀도우/보더 토큰 적용 + 닫기 버튼 아이콘화 | `shared/components/modal/Modal.tsx` | 0.5h |
| 2-5 | `Badge` 테마 색상 교체 | `shared/components/badge/Badge.tsx` | 0.5h |
| 2-6 | `EmptyState` 테마 색상 교체 | `shared/components/state/EmptyState.tsx` | 0.5h |
| 2-7 | `Avatar` 섀도우 토큰 적용 | `shared/components/ui/Avatar.tsx` | 0.5h |
| 2-8 | `DdayCard` → `Card variant="clean"` 기반으로 재작성 | `shared/components/card/DdayCard.tsx` | 0.5h |
| 2-9 | `ResultCard` → `Card variant="brutal-accent"` 기반으로 재작성 | `shared/components/card/ResultCard.tsx` | 0.5h |
| 2-10 | `ConfirmModal` Button 컴포넌트 적용 | `shared/components/modal/ConfirmModal.tsx` | 0.5h |
| 2-11 | `Toast` 신규 컴포넌트 생성 | `shared/components/toast/Toast.tsx` | 1h |
| 2-12 | `SectionHeader` 배지 스타일 통일 | `shared/components/header/SectionHeader.tsx` | 0.5h |
| 2-13 | `Footer` 테마 색상 교체 | `shared/components/footer/Footer.tsx` | 0.5h |

### Phase 3: 페이지별 인라인 스타일 제거

| 순서 | 작업 | 대상 파일 | 예상 시간 |
|------|------|-----------|-----------|
| 3-1 | Landing: 모든 섹션 인라인 버튼 → `Button` 컴포넌트 | `HeroSection`, `CTASection`, `LandingHeader` | 1.5h |
| 3-2 | Landing: 인라인 헤더 → `SectionHeader` 통일 | `FeatureSection`, `ProcessSection`, `ExampleSection` | 1h |
| 3-3 | Landing: CTASection/Mockup 라운딩·보더·섀도우 토큰화 | `CTASection`, `CalendarMockup` | 1h |
| 3-4 | Todo: 인라인 버튼 → `Button`, 색상 토큰 교체 | `TodoPage`, `TodoItem`, `TodoStats`, `TodoFilters` | 1h |
| 3-5 | Calendar: 인라인 CSS 하드코딩 → CSS 변수화 | `CalendarView` | 1.5h |
| 3-6 | Calendar: 사이드바/로딩 색상 토큰 교체 | `CalendarSidebar`, `CalendarPage` | 0.5h |
| 3-7 | Friends: 인라인 버튼 → `Button`, 토스트 → `Toast` 컴포넌트 | `FriendsPage`, `FriendList`, `AddFriendModal` | 1.5h |
| 3-8 | Scheduling: 인라인 스타일 → 컴포넌트, 색상 토큰 교체 | `SchedulingForm`, `SchedulingResults`, `SchedulingPage` | 1h |
| 3-9 | Auth: 인라인 인풋 → `Input`, 버튼 → `Button` | `LoginForm`, `SignupForm` | 1h |

### Phase 4: 검증 및 마무리

| 순서 | 작업 | 예상 시간 |
|------|------|-----------|
| 4-1 | 전체 페이지 시각적 회귀 테스트 (랜딩 → 대시보드 5페이지) | 1h |
| 4-2 | 모바일 반응형 검증 (375px, 768px, 1024px) | 1h |
| 4-3 | 잔여 하드코딩 색상/섀도우 grep 검사 | 0.5h |
| 4-4 | 다크 모드 대비 점검 (선택적, 향후 확장 고려) | 0.5h |

---

## 9. 색상 토큰 마이그레이션 매핑표

| 구 토큰 | 신규 토큰 | 비고 |
|---------|----------|------|
| `--color-primary-bg` | `--color-surface-muted` | 의미 명확화 |
| `--color-card` | `--color-surface` | 의미 명확화 |
| `--color-card-foreground` | `--color-text-secondary` | 통합 |
| `--color-primary-foreground` | `--color-text` | 통합 |
| `--color-primary-light` | (제거) | 미사용 |
| `--color-primary-light-foreground` | (제거) | 미사용 |
| `--color-text-gray` | `--color-text-secondary` | 이름 통일 |
| `--color-secondary` | `--color-accent-soft` | 의미 명확화 |
| `--color-secondary-foreground` | (제거) | `text-text`로 통일 |
| `--color-accent` | `--color-accent-pink` | 핑크 포인트로 재명명 |
| `--color-accent-purple` | `--color-accent` | 시그니처 컬러로 승격 |
| `--color-accent-foreground` | (제거) | 미사용 |
| `--color-success-muted` | `--color-success-soft` | 이름 통일 |
| `--color-success-pastel` | (제거) | 미사용 |
| `--color-success-dark` | `--color-success` | 간소화 |
| `--color-success-foreground` | `--color-success-text` | 접미사 통일 |
| `--color-success-light` | (제거 또는 별도 토큰) | CalendarView용 |
| `--color-warn` | `--color-warning` | 이름 통일 |
| `--color-warn-foreground` | `--color-warning-text` | 접미사 통일 |
| `--color-muted` | `--color-surface-muted` | 통합 |
| `--color-muted-foreground` | `--color-text-muted` | 통합 |
| `--color-destructive` | `--color-danger` | 이름 통일 |
| `--color-border` | `--color-border` | 유지 |
| `--color-ring` | `--color-ring` (값만 `accent`로 변경) | 포커스 통일 |

---

## 10. 기대 효과

### 10.1 디자인 통일감

- **버튼 1종 → 4종 variant**: 모든 버튼이 동일한 컴포넌트에서 파생
- **카드 4종 → 3종 variant**: 클린/브루탈/브루탈-액센트로 명확 분류
- **인풋 2종 → 1종 컴포넌트**: 공유 Input으로 단일화
- **색상 하드코딩 10건 → 0건**: 모든 색상이 토큰에서 관리
- **섀도우 8종 인라인 → 4종 토큰**: 섀도우 체계 확립

### 10.2 SOSO 개성 강화

- **액센트 퍼플 (`#7b61ff`)**: 로고, 활성 네비게이션, CTA, 포커스 링에 일관 적용 → 브랜드 컬러로 정착
- **네오-브루탈 포인트**: 랜딩에서 강조, 대시보드에서 점진적 감소 → "개성 있지만 깔끔한" 균형
- **Pretendard 폰트**: 한국어 서비스에 최적화된 타이포그래피로 "친근함" 강화

### 10.3 유지보수성

- **토큰 단일 소스**: 색상/섀도우 변경 시 `index.css` 1곳만 수정
- **컴포넌트 단일 소스**: 버튼/카드 스타일 변경 시 공유 컴포넌트 1곳만 수정
- **인라인 스타일 제거**: 향후 새 페이지/컴포넌트 추가 시 자연스럽게 토큰 시스템 따르게 됨

---

## 11. 작업 우선순위 요약

```
Phase 1 (토큰) ──→ Phase 2 (컴포넌트) ──→ Phase 3 (페이지) ──→ Phase 4 (검증)
     1.5h                8h                   9.5h                3h
                                                       
총 예상 시간: 약 22시간 (3일 집중 작업 기준)
```

| 우선순위 | 작업 | 이유 |
|----------|------|------|
| **P0** | 토큰 시스템 재설계 (Phase 1) | 모든 후속 작업의 기반 |
| **P0** | Button, Card, Input 리팩토링 (Phase 2-1 ~ 2-3) | 가장 많은 페이지에 영향 |
| **P1** | Modal, Badge, EmptyState, Avatar (Phase 2-4 ~ 2-7) | 공유 컴포넌트 완성 |
| **P1** | Landing 페이지 인라인 제거 (Phase 3-1 ~ 3-3) | 첫인상 영역, 가장 많은 인라인 스타일 |
| **P2** | Todo, Friends, Scheduling, Auth (Phase 3-4 ~ 3-9) | 대시보드 통일감 |
| **P2** | CalendarView CSS 변수화 (Phase 3-5) | 독립적인 작업, 영향 범위 제한적 |
| **P3** | Toast 신규 컴포넌트 (Phase 2-11) | FriendsPage 1곳만 교체하면 됨 |
| **P3** | 검증 및 마무리 (Phase 4) | 전체 품질 보증 |
