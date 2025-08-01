# IT 인사/자산/태스크 관리 시스템 [🖼️Figma](https://www.figma.com/design/syTpJAN33Lo1M6aVSwSvNK/morenakun?node-id=0-1&t=SpKqzkK5TLnneKg5-1)

**Next.js 14**, **PostgreSQL**, **Prisma**, **Docker** 기반으로 구축되는 웹 애플리케이션입니다.  
인사 이벤트 기반의 태스크 자동 생성, IT 자산 관리를 지원합니다.  

---

## 🧱 기술 스택

- **Next.js 14 (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **PostgreSQL**
- **Prisma ORM**
- **Docker**
- **Axios**

---

## 📁 프로젝트 구조 및 규칙

```bash
src/
├── app/                # Next.js App Router
├── api/                # API 호출 및 외부 서비스와의 통신 처리
├── components/         # UI 컴포넌트
├── utils/              # 유틸 함수와 상수 저장
├── styles/             # 글로벌 CSS, Tailwind 포함
├── types/              # TypeScript의 공용 타입 정의
├── assets/             # 폰트, 이미지 등 정적 파일 저장
├── hooks/              # 커스텀 React 훅
└── store/              # 전역 상태 관리
```

---

## 🐘 PostgreSQL 개발환경 (Docker)

Docker를 사용해 PostgreSQL을 구동합니다.

### PostgreSQL 실행 방법

```bash
# PostgreSQL 컨테이너 실행
docker compose up -d
```

---

## 🛠 Prisma 초기 설정

```bash
# Prisma 초기화
npx prisma init

# 마이그레이션 실행
npx prisma migrate dev --name init
```

---

## 📦 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

### 3. 브라우저 확인

http://localhost:3000

---

## ✅ 주요 목표 기능
- 권한별 사용자 관리 (관리자 / 인사부 / 총무부 / 열람자)
- 이벤트 기반 태스크 자동 생성 및 상태 관리
- 사원 정보 CRUD
- IT 자산 정보 CRUD (PC, 스마트폰 등)
- 자산 계약 및 만료일 알림 (태스크 자동 발생)
- 인사 이벤트 등록 (입사 / 퇴사 / 이동 / 복직 / 휴직 / 고용형태 변경)
---
