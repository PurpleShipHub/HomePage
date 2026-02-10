---
name: check-site
description: 사이트 전체를 점검합니다. 링크, i18n 키 일관성, 보존 항목, 반응형 등을 확인합니다.
---

# /check-site - 사이트 전체 점검

Purpleship 사이트의 5개 페이지를 전체 점검합니다.

## 점검 항목

### 1. 보존 항목 확인
- [ ] PayPal 폼 ID `PN2WRW4NEXA2L` 존재 확인
- [ ] Google Analytics `G-PQGB9Q3SNE` 존재 확인
- [ ] Movit 앱스토어 링크 (iOS: `id6747708096`, Android: `com.siltarae.projectf`)
- [ ] Stampit 앱스토어 링크 (iOS: `id6753583567`)
- [ ] 서비스 URL (worldcanvas.art)
- [ ] 연락처 이메일 (`captain@purpleship.io`)

### 2. i18n 일관성
- [ ] HTML `data-i18n` 키가 모든 11개 JSON 파일에 존재
- [ ] JSON 키가 HTML에서 실제 참조됨
- [ ] 언어 선택기가 5개 페이지에서 동일 (11개 언어 + auto)

### 3. 네비게이션 일관성
- [ ] 모든 페이지의 nav 구조 일관성
- [ ] 모바일 메뉴 (index.html) 동작 확인
- [ ] 페이지 간 링크 정확성 (`/movit/`, `/stampit/`, `/worldcanvas/`, `/pricing/`)

### 4. WebGL 셰이더
- [ ] 5개 페이지의 셰이더 코드 동일 여부
- [ ] vertex/fragment shader 쌍 존재 확인

### 5. CSS 일관성
- [ ] 모든 페이지에서 `styles/common.css` 로드
- [ ] 각 페이지의 `--page-accent` 설정 확인
- [ ] 인라인 스타일의 하드코딩 색상이 CSS 변수와 불일치하지 않는지

### 6. SEO (index.html)
- [ ] meta description, keywords
- [ ] Open Graph 태그 (og:title, og:description, og:image, og:url)
- [ ] Twitter 카드 태그
- [ ] JSON-LD 구조화 데이터
- [ ] sitemap.xml 정확성

## 사용 예시

```
/check-site
/check-site i18n만 확인해줘
/check-site 보존 항목만 점검해줘
```
