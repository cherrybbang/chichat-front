# ChitChat

AI 챗봇과 자유롭게 대화할 수 있는 웹 채팅 애플리케이션입니다.

---

## 소개

ChitChat은 사용자가 AI 챗봇에게 질문하고 대화할 수 있는 서비스입니다.  
Supabase를 기반으로 인증과 데이터 저장을 처리하며, OpenAI API와 연동하여 봇 응답을 실시간으로 제공합니다.

---

## 주요 기능

- **회원가입 / 로그인** — 이메일 + 비밀번호 기반 인증 (이메일 인증 포함)
- **새 채팅 시작** — 메시지 입력 즉시 채팅방 생성 후 AI API 호출
- **실시간 메시지** — Supabase Realtime(Postgres Changes)으로 봇 응답을 구독
- **타이핑 인디케이터** — AI가 응답을 생성하는 동안 말풍선 애니메이션 표시
- **채팅 목록 조회** — 과거 대화 기록을 미리보기(첫 메시지)와 함께 날짜순 표시
- **채팅 삭제** — 채팅방과 소속 메시지 일괄 삭제

---

## 기술 스택

| 구분 | 기술 |
|------|------|
| 프레임워크 | React 19 + TypeScript |
| 빌드 도구 | Vite 8 |
| 라우팅 | React Router DOM v7 |
| 백엔드 / DB | Supabase (PostgreSQL + Auth + Realtime) |
| AI API | 외부 REST API (`VITE_API_URL`) |
| 배포 | Vercel |

---

## 아키텍처

```
사용자 브라우저
│
├── React App (SPA)
│   ├── AuthProvider      # Supabase Auth 세션 전역 관리
│   ├── Header            # 네비게이션
│   └── Pages
│       ├── MainPage      # 랜딩
│       ├── Login         # 로그인 / 회원가입
│       ├── NewChat       # 채팅방 생성 + 첫 메시지 전송
│       ├── ChatDetail    # 채팅 상세 (실시간 메시지 수신)
│       └── ChatList      # 채팅 기록 목록
│
├── Supabase
│   ├── Auth              # 이메일/비밀번호 인증, 세션 발급
│   ├── DB (PostgreSQL)
│   │   ├── rooms         # 채팅방 (id, user_id, created_at)
│   │   └── messages      # 메시지 (id, room_id, content, role, created_at)
│   └── Realtime          # messages 테이블 INSERT 이벤트 구독
│
└── AI API Server         # POST /chat → 봇 응답 생성 후 messages에 저장
```

**채팅 흐름**

```
1. 사용자가 메시지 입력
2. Supabase에 rooms 레코드 생성
3. /chat/:roomId 로 즉시 이동 (낙관적 UI)
4. AI API에 비동기 POST 요청 (Authorization: Bearer <token>)
5. AI API가 messages 테이블에 bot 응답 INSERT
6. Realtime 구독이 응답을 감지 → 화면에 표시
```

---

## 폴더 구조

```
src/
├── assets/           # 이미지, 아이콘 등 정적 파일
├── components/
│   ├── Header.tsx    # 공통 헤더 (네비게이션)
│   └── MainPage.tsx  # 메인(랜딩) 페이지 컴포넌트
├── contexts/
│   ├── AuthContext.ts    # Context 타입 정의 및 생성
│   └── AuthProvider.tsx  # 인증 상태 관리 및 Provider
├── hooks/
│   └── useAuth.ts    # AuthContext 소비 커스텀 훅
├── lib/
│   └── supabase.ts   # Supabase 클라이언트 초기화
├── pages/
│   ├── Login.tsx         # 로그인 / 회원가입 페이지
│   ├── NewChat.tsx       # 새 채팅 시작 페이지
│   ├── ChatDetail.tsx    # 채팅 상세 (실시간 메시지)
│   └── ChatList.tsx      # 채팅 기록 목록 페이지
├── types/
│   └── chat.ts       # Message, Room 타입 정의
├── App.tsx           # 라우터 및 전체 레이아웃
├── main.tsx          # 앱 진입점
└── index.css         # 전역 스타일
```

---

## 개발 환경 설정

### 1. 저장소 클론

```bash
git clone <repository-url>
cd chichat-front
```

### 2. 패키지 설치

```bash
npm install
```

### 3. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 아래 값을 입력합니다.

```env
VITE_SUPABASE_URL=https://<your-project>.supabase.co
VITE_SUPABASE_KEY=<your-anon-key>
VITE_API_URL=<your-ai-api-server-url>
```

| 변수 | 설명 |
|------|------|
| `VITE_SUPABASE_URL` | Supabase 프로젝트 URL |
| `VITE_SUPABASE_KEY` | Supabase anon (public) API 키 |
| `VITE_API_URL` | AI 응답을 처리하는 백엔드 서버 URL |

### 4. 개발 서버 실행

```bash
npm run dev
```
