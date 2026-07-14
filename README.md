# All-In-One Scheduler

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.1.0-6DB33F?logo=spring&logoColor=white)](https://spring.io/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

> **ToDo, 캘린더, 메모, 친구 관계, 스마트 일정 조율**을 한 번에 관리하는 일정 관리 플랫폼

**SOSO(All-In-One Scheduler)**는 Spring Boot 기반 백엔드와 React + TypeScript 기반 프론트엔드로 구축된 일정 관리 애플리케이션입니다. 개인의 할 일과 일정은 물론, 친구들의 캘린더를 함께 분석해 최적의 약속 시간을 추천합니다. Docker Compose와 OCI 스크립트를 통해 쉽게 배포할 수 있습니다.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Local Development](#local-development)
  - [Docker Compose](#docker-compose)
- [Environment Variables](#environment-variables)
- [Authentication Flow](#authentication-flow)
- [Deployment](#deployment)
- [Testing](#testing)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **사용자 인증**
  - JWT Access Token + Refresh Token rotation
  - Refresh Token은 httpOnly 쿠키로 안전하게 저장
  - Silent Refresh 및 로그아웃 처리
- **ToDo 관리**
  - 할 일 CRUD, 완료 상태 토글, 마감일 기반 D-Day 카드
  - 필터(전체/진행 중/완료) 및 검색
- **캘린더**
  - FullCalendar 기반 월/주 뷰
  - 일정 추가/상세/수정/삭제
  - 다가오는 일정과 이번 주 일정 요약 사이드바
- **친구 관계**
  - 친구 요청/수락/거절/삭제
  - 받은 요청/보낸 요청 관리
- **스마트 일정 조율**
  - 친구들과 기간을 설정하면 참여 가능 시간을 분석
  - 최적의 약속 시간을 자동 추천하고 캘린더에 등록
- **모바일 반응형**
  - Tailwind CSS 기반 모바일 최적화 UI
  - 모바일 헤더 햄버거 메뉴, 반응형 그리드, 터치 친화적인 모달
- **배포**
  - Docker Compose로 로컬/서버 일괄 배포
  - OCI 배포 스크립트 제공

## Tech Stack

### Backend

| Category  | Technology                         |
| --------- | ---------------------------------- |
| Language  | Java 21                            |
| Framework | Spring Boot 4.1.0                  |
| Security  | Spring Security, JWT (jjwt 0.12.5) |
| Data      | Spring Data JPA, Flyway            |
| Database  | MySQL 8.4                          |
| Build     | Gradle                             |

### Frontend

| Category     | Technology                     |
| ------------ | ------------------------------ |
| Framework    | React 19                       |
| Language     | TypeScript 6                   |
| Build Tool   | Vite 8                         |
| Routing      | React Router DOM 7             |
| State        | Zustand 5                      |
| Server State | TanStack Query (React Query) 5 |
| HTTP         | Axios                          |
| Styling      | Tailwind CSS 4                 |
| Calendar     | FullCalendar 6                 |
| Icons        | Lucide React                   |
| E2E Test     | Playwright                     |

### Infrastructure

- Docker, Docker Compose
- Nginx (프론트엔드 정적 배포)
- OCI (Oracle Cloud Infrastructure) 배포 스크립트

## Project Structure

```text
all-in-one-scheduler/
├── backend/              # Spring Boot backend
│   ├── src/main/java/    # Application code
│   ├── src/main/resources/
│   ├── build.gradle
│   └── Dockerfile
├── frontend/             # React + TypeScript frontend
│   ├── src/
│   ├── index.html
│   ├── package.json
│   ├── playwright.config.ts
│   └── Dockerfile
├── scripts/
│   └── deploy-oci.sh     # OCI one-command deployment
├── docker-compose.yml
├── .env.example
└── .env.production.example
```

## Getting Started

### Prerequisites

- Java 21+
- Node.js 20+ & npm 9+
- MySQL 8.0+ (or Docker)
- Docker & Docker Compose (optional)

### Local Development

1. Clone the repository

```bash
git clone https://github.com/donghyeon01/all-in-one-scheduler.git
cd all-in-one-scheduler
```

1. Start the backend

```bash
cd backend
./gradlew bootRun -Dspring.profiles.active=local
```

Windows:

```powershell
./gradlew.bat bootRun -Dspring.profiles.active=local
```

1. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

### Docker Compose

로컬에서 전체 스택을 한 번에 실행하려면:

```bash
cp .env.example .env
docker-compose up --build
```

- Frontend: <http://localhost>
- Backend API: <http://localhost:8080>
- MySQL: `localhost:3306`

## Environment Variables

### `.env.example` (로컬 개발)

```env
# Local DB / JWT
DB_USERNAME=root
DB_PASSWORD=password
JWT_SECRET=my-secret-key-my-secret-key-my-secret-key
VITE_API_URL=http://localhost:8080

# Docker / OCI defaults
MYSQL_ROOT_PASSWORD=password
MYSQL_DATABASE=scheduler
APP_SECURITY_CORS_ALLOWED_ORIGINS=http://localhost
APP_SECURITY_COOKIE_SECURE=false
APP_SECURITY_COOKIE_SAME_SITE=Lax
APP_SECURITY_COOKIE_DOMAIN=
FLYWAY_ENABLED=true
```

### `.env.production.example` (프로덕션 배포)

```env
MYSQL_ROOT_PASSWORD=password
MYSQL_DATABASE=scheduler
DB_USERNAME=scheduler_user
DB_PASSWORD=scheduler_password
JWT_SECRET=change-me-change-me-change-me-change-me
VITE_API_URL=http://localhost:8080
APP_SECURITY_CORS_ALLOWED_ORIGINS=http://localhost
APP_SECURITY_COOKIE_SECURE=false
APP_SECURITY_COOKIE_SAME_SITE=Lax
APP_SECURITY_COOKIE_DOMAIN=
FLYWAY_ENABLED=true
```

> **보안 주의**: `JWT_SECRET`과 DB 비밀번호는 프로덕션 환경에서 반드시 강력한 값으로 교체하세요.

## Authentication Flow

1. 로그인 성공 시 Access Token과 Refresh Token을 발급합니다.
2. Access Token은 프론트엔드 메모리(Zustand)에 저장됩니다.
3. API 요청 시 `Authorization: Bearer <accessToken>` 헤더를 사용합니다.
4. Refresh Token은 `refreshToken`이라는 httpOnly 쿠키로 저장됩니다.
5. `/api/auth/refresh` 호출 시 새로운 Access Token과 Refresh Token을 발급하고 기존 Refresh Token을 교체(Rotation)합니다.
6. `/api/auth/logout` 호출 시 Refresh Token 쿠키를 만료 처리합니다.

## Testing

프론트엔드 E2E 테스트는 Playwright로 실행합니다.

```bash
cd frontend
npm install
npm run test:e2e
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/awesome-feature`)
3. Commit your changes (`git commit -m 'Add awesome feature'`)
4. Push to the branch (`git push origin feature/awesome-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
