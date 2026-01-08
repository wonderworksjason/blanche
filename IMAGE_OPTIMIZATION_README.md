# 🖼️ Blanche 웹사이트 이미지 최적화 가이드

## 📊 현재 상태

### 문제점
- **초대형 PNG 파일**: 7개 이미지가 각각 17-25MB (총 ~140MB)
- **느린 로딩 속도**: 모바일에서 10-30초 이상 소요
- **구형 포맷**: 모든 이미지가 PNG (WebP 대비 2-3배 큰 용량)
- **반응형 미지원**: 모든 기기에서 동일한 대용량 파일 다운로드

### 이미 완료된 최적화
✅ HTML 코드에 `<picture>` 엘리먼트 추가
✅ 반응형 이미지 지원 (srcset)
✅ Width/Height 속성 추가 (레이아웃 시프트 방지)
✅ 히어로 이미지 Preload 추가
✅ Lazy loading 최적화

### 필요한 작업
⚠️ **이미지 파일을 WebP 포맷으로 변환하고 여러 크기로 만들어야 합니다**

---

## 🎯 최적화 목표

| 항목 | 현재 | 목표 | 개선율 |
|------|------|------|--------|
| 총 용량 | ~153 MB | ~5-8 MB | **94-95% 감소** |
| 로딩 시간 | 10-30초 | 1-3초 | **90% 개선** |
| 모바일 경험 | 매우 느림 | 빠름 | - |

---

## 📋 변환이 필요한 이미지 목록

### 🔴 우선순위 1: 초대형 이미지 (17-25 MB)
다음 7개 이미지를 각각 4가지 크기로 변환해야 합니다:

**원본 파일:**
- `004.png` (22 MB, 6000x4002px)
- `019.png` (20 MB, 6000x4002px)
- `023.png` (17 MB, 6000x4002px)
- `032.png` (18 MB, 6000x4002px)
- `037.png` (17 MB, 6000x4002px)
- `069.png` (25 MB, 4002x6000px)
- `075.png` (21 MB, 6000x4002px)

**필요한 변환:**
- `004-small.webp` (640px wide, quality 85)
- `004-medium.webp` (1024px wide, quality 85)
- `004-large.webp` (1920px wide, quality 85)
- `004-thumbnail.webp` (400px wide, quality 80)

*위 패턴을 모든 7개 이미지에 적용*

### 🟡 우선순위 2: 제품 이미지 (2.8-3.6 MB)
다음 3개 이미지를 각각 3가지 크기로 변환:

**원본 파일:**
- `2.png` (2.8 MB, 1800x1800px - 히어로 이미지)
- `3.png` (3.6 MB, 1800x1800px)
- `5.png` (3.5 MB, 1800x1800px)

**필요한 변환:**
- `2-small.webp` (640px wide, quality 85)
- `2-medium.webp` (1024px wide, quality 85)
- `2-large.webp` (1920px wide, quality 85)

*위 패턴을 모든 3개 이미지에 적용*

### 🟢 우선순위 3: 리뷰 이미지 (1.1-2 MB)
다음 4개 이미지를 각각 2가지 크기로 변환:

**원본 파일:**
- `Review-0.png` (2.0 MB, 1800x1800px)
- `Review-1.png` (1.9 MB, 1800x1800px)
- `Review-2.png` (1.1 MB, 1800x1800px)
- `Review-3.png` (1.3 MB, 1800x1800px)

**필요한 변환:**
- `Review-0-small.webp` (640px wide, quality 85)
- `Review-0-medium.webp` (1024px wide, quality 85)

*위 패턴을 모든 4개 이미지에 적용*

---

## 🛠️ 이미지 최적화 방법

### 방법 1: Squoosh (가장 쉬움, 추천!)

**웹사이트:** https://squoosh.app

**장점:**
- 구글에서 만든 무료 도구
- 브라우저에서 직접 처리 (업로드 불필요, 안전함)
- 실시간 미리보기 및 품질 비교
- 배치 처리 가능

**사용 방법:**

1. Squoosh 웹사이트 접속
2. 이미지 파일을 드래그 앤 드롭
3. 오른쪽 패널에서 설정:
   - **Format**: WebP 선택
   - **Quality**: 85
   - **Resize**: Width를 원하는 크기로 (640, 1024, 1920 등)
   - **Aspect Ratio**: 유지 (Maintain aspect ratio 체크)
4. 다운로드 버튼 클릭
5. 파일명을 적절하게 변경 (예: `004-large.webp`)
6. `images/blanche/` 폴더에 저장

**예시:**
```
004.png를 변환하려면:
1. Squoosh에 004.png 업로드
2. Width: 1920, Quality: 85, Format: WebP
3. 다운로드 → 파일명을 004-large.webp로 변경
4. Width: 1024로 변경 → 다운로드 → 004-medium.webp
5. Width: 640으로 변경 → 다운로드 → 004-small.webp
6. Width: 400으로 변경 → 다운로드 → 004-thumbnail.webp
```

---

### 방법 2: TinyPNG

**웹사이트:** https://tinypng.com

**장점:**
- 매우 간단한 인터페이스
- 한 번에 최대 20개 파일 처리
- 자동 최적화

**사용 방법:**
1. TinyPNG 접속
2. 이미지를 드래그 앤 드롭
3. 자동 압축 후 다운로드
4. 수동으로 크기 조정이 필요하므로 Squoosh 병행 사용 권장

---

### 방법 3: ImageOptim (Mac 사용자)

**다운로드:** https://imageoptim.com

**장점:**
- Mac 네이티브 앱
- 배치 처리 우수
- Finder 통합

**사용 방법:**
1. ImageOptim 설치
2. 이미지 파일을 앱에 드롭
3. 자동 최적화 완료

---

### 방법 4: 명령줄 도구 (고급 사용자)

#### FFmpeg 사용:
```bash
# 단일 파일 변환
ffmpeg -i 004.png -vf scale=1920:-1 -c:v libwebp -quality 85 004-large.webp

# 여러 크기 생성 스크립트
for size in small:640 medium:1024 large:1920 thumbnail:400; do
  name=${size%%:*}
  width=${size##*:}
  ffmpeg -i 004.png -vf scale=$width:-1 -c:v libwebp -quality 85 004-$name.webp
done
```

#### Sharp CLI 사용:
```bash
# 설치
npm install -g sharp-cli

# 변환
sharp -i 004.png -o 004-large.webp -f webp --quality 85 --width 1920
sharp -i 004.png -o 004-medium.webp -f webp --quality 85 --width 1024
sharp -i 004.png -o 004-small.webp -f webp --quality 85 --width 640
```

---

## 📁 파일 구조

변환 후 다음과 같은 구조가 되어야 합니다:

```
images/blanche/
├── 004.png (원본 - 보관용, 폴백으로 사용)
├── 004-small.webp (신규)
├── 004-medium.webp (신규)
├── 004-large.webp (신규)
├── 004-thumbnail.webp (신규)
├── 2.png (원본)
├── 2-small.webp (신규)
├── 2-medium.webp (신규)
├── 2-large.webp (신규)
├── Review-0.png (원본)
├── Review-0-small.webp (신규)
├── Review-0-medium.webp (신규)
└── ... (나머지 이미지들도 동일한 패턴)
```

---

## ✅ 체크리스트

변환이 완료되었는지 확인하세요:

### 초대형 이미지 (7개)
- [ ] 004.png → 004-{small,medium,large,thumbnail}.webp
- [ ] 019.png → 019-{small,medium,large,thumbnail}.webp
- [ ] 023.png → 023-{small,medium,large,thumbnail}.webp
- [ ] 032.png → 032-{small,medium,large,thumbnail}.webp
- [ ] 037.png → 037-{small,medium,large,thumbnail}.webp
- [ ] 069.png → 069-{small,medium,large,thumbnail}.webp
- [ ] 075.png → 075-{small,medium,large,thumbnail}.webp

### 제품 이미지 (3개)
- [ ] 2.png → 2-{small,medium,large}.webp
- [ ] 3.png → 3-{small,medium,large}.webp
- [ ] 5.png → 5-{small,medium,large}.webp

### 리뷰 이미지 (4개)
- [ ] Review-0.png → Review-0-{small,medium}.webp
- [ ] Review-1.png → Review-1-{small,medium}.webp
- [ ] Review-2.png → Review-2-{small,medium}.webp
- [ ] Review-3.png → Review-3-{small,medium}.webp

**총 파일 수:**
- 초대형: 7 x 4 = 28개
- 제품: 3 x 3 = 9개
- 리뷰: 4 x 2 = 8개
- **합계: 45개의 WebP 파일 필요**

---

## 🧪 테스트 방법

변환 후 다음 사항을 확인하세요:

### 1. 로컬 테스트
```bash
# 간단한 HTTP 서버 실행
python3 -m http.server 8000

# 또는 Node.js 사용
npx http-server
```

브라우저에서 `http://localhost:8000` 접속

### 2. 확인 사항
- [ ] 모든 이미지가 정상적으로 표시되는가?
- [ ] 이미지 품질이 적절한가?
- [ ] 페이지 로딩 속도가 개선되었는가?
- [ ] 모바일에서도 빠르게 로드되는가?
- [ ] 브라우저 개발자 도구에서 WebP 파일이 로드되는지 확인

### 3. 성능 측정
- Chrome DevTools → Network 탭에서 총 용량 확인
- Lighthouse 실행하여 성능 점수 확인
- PageSpeed Insights (https://pagespeed.web.dev) 테스트

---

## 💡 추가 팁

### WebP 미지원 브라우저
- HTML 코드에 이미 폴백이 구현되어 있습니다
- 구형 브라우저는 자동으로 PNG 파일을 사용합니다
- `<picture>` 엘리먼트가 이를 처리합니다

### 원본 파일 보관
- 원본 PNG 파일은 삭제하지 마세요
- 폴백용으로 계속 필요합니다
- 향후 재변환이 필요할 수 있습니다

### CDN 사용 권장
최상의 성능을 위해 이미지를 CDN에 업로드하는 것을 고려하세요:
- **Cloudinary** (무료 플랜: 25GB/월)
- **imgix**
- **Cloudflare Images**

CDN을 사용하면:
- 자동 WebP/AVIF 변환
- 자동 리사이징
- 전 세계 빠른 배포
- 캐싱 및 최적화

---

## 🎉 예상 결과

모든 이미지를 최적화하면:

| 항목 | 개선 |
|------|------|
| **페이지 용량** | 153 MB → 5-8 MB (94-95% 감소) |
| **로딩 시간** | 10-30초 → 1-3초 (90% 개선) |
| **Lighthouse 점수** | 30-40점 → 90-100점 |
| **모바일 경험** | 매우 느림 → 빠름 |
| **사용자 이탈률** | 감소 예상 |
| **SEO 점수** | 향상 |

---

## ❓ 문제 해결

### Q: WebP 파일이 로드되지 않아요
A: 브라우저 캐시를 지우고 새로고침하세요 (Ctrl+Shift+R 또는 Cmd+Shift+R)

### Q: 이미지 품질이 떨어져 보여요
A: Quality 값을 85에서 90으로 높이세요 (용량은 약간 증가)

### Q: 파일명을 잘못 지정했어요
A: 파일명이 정확히 일치해야 합니다. HTML에서 지정한 이름과 동일하게 변경하세요

### Q: 모든 이미지를 변환하기 너무 힘들어요
A: 우선순위 1(초대형 이미지 7개)만 먼저 변환해도 큰 효과를 볼 수 있습니다

---

## 📞 도움이 필요하신가요?

이 가이드를 따라하는 데 어려움이 있으시면:
1. `image-optimization-guide.html` 파일을 브라우저로 열어보세요
2. Squoosh (https://squoosh.app)를 사용하는 것이 가장 쉽습니다
3. 처음에는 1-2개 이미지로 테스트해보세요

---

**작성일:** 2026-01-08
**작성자:** Claude Code
**버전:** 1.0
