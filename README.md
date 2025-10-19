# Converter - 단위 변환 PWA

## 📱 완료된 업데이트 (v1.0.5)

### ✅ 통화 표시 개선
- **통화 기호 → 통화 코드로 변경**
  - 이전: ₩, ¥
  - 이후: KRW, JPY
- `getCurrencySymbol` 함수 제거
- 더 명확한 통화 표시 (₩/kg → KRW/kg)

### ✅ Default 버튼 동작 개선
- **자동 환율 가져오기 기능 추가**
  - 이전: 고정값 1400으로 리셋
  - 이후: API에서 실시간 환율 자동 가져오기
  - 오프라인 시 기본값(1400) 폴백

### ✅ 신발 사이즈 변환 로직 수정
- **모든 출력을 MM 단위로 표시**
  - 입력: MM → 출력: US 사이즈 → **MM (M/Y/F)**
  - 입력: US → 출력: MM → **MM (M/Y/F)**
  - 입력: EU → 출력: MM → **MM (M/Y/F)**
- **예시**:
  - US 8.5 입력 → 265 mm M / 275 mm Y / 255 mm F
  - US 10 입력 → 280 mm M / 290 mm Y / 270 mm F
  - EU 40 입력 → 250 mm M / 260 mm Y / 270 mm F

---

## 🚀 주요 기능

### 완전한 오프라인 지원
- **온라인**: 자동 업데이트 확인 및 다운로드
- **오프라인**: 캐시된 데이터로 완전 작동
- **설정 저장**: LocalStorage에 영구 보관 (재부팅 후에도 유지)

### 지원 플랫폼
- ✅ **Android** (Chrome, Samsung Internet, Firefox)
- ✅ **iOS** (Safari, Chrome)
- ✅ **Windows/Mac/Linux** (모든 최신 브라우저)

---

## 📲 설치 방법

### 1. 로컬 서버 실행

```bash
# 폴더로 이동
cd C:\Data\Claude\Converter

# Python 서버 실행
python -m http.server 8000
```

또는 `서버시작.bat` 파일을 더블클릭

### 2. 브라우저에서 접속

```
http://localhost:8000
```

### 3. 스마트폰에 설치

**Android (Chrome):**
1. 같은 WiFi에 연결
2. PC의 IP 주소 확인: `ipconfig` (예: 192.168.0.100)
3. 스마트폰 Chrome에서 `http://192.168.0.100:8000` 접속
4. 화면 하단 "설치" 배너 클릭 또는
5. Chrome 메뉴 → "홈 화면에 추가" → "설치"

**iOS (Safari):**
1. Safari에서 위 주소 접속
2. 하단 공유 버튼 (□↑) 탭
3. "홈 화면에 추가" 선택
4. "추가" 탭

### 4. 독립 앱으로 실행
홈 화면의 "Converter" 아이콘을 터치하면 일반 앱처럼 전체화면으로 실행됩니다.

---

## 🎯 사용 방법

### 신발 사이즈 변환 (shoes)

**사용 예시:**

```
250 입력 →
  US Men: 7
  US Women: 8
  US Youth: 6

8.5 입력 →
  자동으로 mm 변환
  EU 사이즈 표시

42 입력 (EU) →
  자동으로 mm 변환
  US 사이즈 표시
```

**지원 범위:**
- **한국(mm)**: 145-300mm (5mm 단위)
- **US 사이즈**: 0.5-13 (Men's, Women's, Youth)
- **EU 사이즈**: 25-48 (Men's, Women's, Kids)

### 환율 설정

1. **Settings** 버튼 클릭
2. 환율 입력:
   - 첫 번째 칸: 환율 (예: 1400)
   - 두 번째 칸: 통화 코드 (예: KRW, JPY)
3. **현재 환율** 버튼 클릭 (온라인 필요)
4. **Save** 클릭하여 저장

**KRW/JPY 교차 환율:**
```
통화 코드란에 "KRW/JPY" 입력
→ 현재 환율 버튼 클릭
→ 자동으로 100엔당 원화 계산
```

### 버튼 순서 변경

1. Settings 화면 진입
2. 버튼을 드래그하여 원하는 위치로 이동
3. Save 버튼으로 저장

---

## 🔄 변환 기능

1. **$/lb** - 파운드당 가격 → kg당 가격
2. **lb.oz** - 파운드.온스 → kg/g
3. **lb** - 파운드 → kg/g
4. **F** - 화씨 ↔ 섭씨
5. **shoes** - 신발 사이즈 (mm ↔ US ↔ EU)
6. **ft.in** - 피트.인치 → m/cm
7. **ft** - 피트 → m/cm
8. **$** - 달러 ↔ 원화 (또는 다른 통화)
9. **mile** - 마일 → km
10. **mpg** - MPG ↔ km/L
11. **gallon** - 갤런 → 리터
12. **yard** - 야드 → 미터

---

## 🌐 온라인 배포 (선택사항)

### GitHub Pages (무료)

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/사용자명/converter.git
git push -u origin main

# GitHub 저장소 → Settings → Pages → main 브랜치 선택
```

접속: `https://사용자명.github.io/converter/`

### Netlify (가장 쉬움)

1. netlify.com 가입
2. "New site from Git" 또는 폴더 드래그 앤 드롭
3. 자동 배포 완료
4. 무료 HTTPS URL 제공

---

## 🔧 파일 구조

```
C:\Data\Claude\Converter/
├── index.html          # 메인 앱 (v1.0.5)
├── manifest.json       # PWA 설정
├── sw.js              # Service Worker (v1.0.5)
├── version.json       # 버전 정보
├── icon-192.png       # 앱 아이콘
├── icon-512.png       # 앱 아이콘
├── 서버시작.bat        # 간편 실행
└── old/               # 백업 폴더
```

---

## 📝 버전 히스토리

### v1.0.5 (2025-10-19) - 현재 버전
- ✅ 통화 기호 → 코드 변경 (₩ → KRW, ¥ → JPY)
- ✅ Default 버튼 실시간 환율 자동 가져오기
- ✅ 신발 사이즈 출력을 모두 MM 단위로 통일 (mm M/Y/F)
- ✅ index.html 7곳 수정
- ✅ version.json, sw.js 버전 업데이트

### v1.0.4 (2025-10-19)
- ✅ 신발 사이즈 변환 테이블 완전 업데이트 (PDF 데이터 기반)
- ✅ mm ↔ US ↔ EU 양방향 변환 완벽 지원
- ✅ 모바일 Settings UI 개선 (환율 입력 세로 배치)
- ✅ KRW/JPY 교차 환율 계산 지원
- ✅ 환율 API 오류 처리 개선

### v1.0.3
- 기본 변환 기능 구현

---

## 🐛 문제 해결

### 앱이 설치되지 않음
- **원인**: HTTPS 필요 (localhost는 예외)
- **해결**: GitHub Pages, Netlify 등 사용 (자동 HTTPS)

### 오프라인에서 작동하지 않음
- **원인**: Service Worker 미등록
- **해결**: 온라인 상태에서 최소 1회 접속 필요

### 설정이 저장되지 않음
- **원인**: LocalStorage 비활성화 또는 시크릿 모드
- **해결**: 일반 모드로 전환, 쿠키 허용

### 환율 가져오기 실패
- **원인**: 오프라인 또는 API 문제
- **해결**: 인터넷 연결 확인 후 재시도, 또는 수동 입력

---

## 💡 팁

1. **빠른 변환**: 자주 쓰는 버튼을 첫 줄에 배치
2. **신발 구매**: mm 사이즈를 기억하면 해외 쇼핑 편리
3. **환율**: 여행 전 미리 설정하면 오프라인에서도 사용 가능
4. **백업**: 중요한 설정은 스크린샷으로 보관

---

## 📄 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능

---

## ✨ 개선 완료!

모든 파일이 `C:\Data\Claude\Converter` 폴더에 업데이트되었습니다.
이전 버전은 `old/` 폴더에 백업되어 있습니다.

즐거운 사용 되세요! 🎉
