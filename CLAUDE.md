# Purpleship - Claude Code 프로젝트 가이드

## 프로젝트 개요
Purpleship은 정적 웹사이트(5개 HTML 페이지)로, GitHub Pages에서 호스팅됩니다.
도메인: purpleship.io

## 기술 스택
- **HTML/CSS/JS**: 프레임워크 없이 순수 정적 페이지
- **CSS 시스템**: `styles/common.css` (공유) + 각 페이지 인라인 `<style>`
- **i18n**: 11개 언어 (ko, en, zh, ja, es, fr, de, ru, ar, hi, vi) - `locales/*.json`
- **WebGL**: 모든 페이지에 셰이더 배경 효과 (흰색 라인 on 블랙)
- **디자인**: 2026 프리미엄 다크 테마, 퍼플 틴트 글래스모피즘, 오로라 효과

## 페이지 구조
| 경로 | 설명 | accent |
|------|------|--------|
| `/index.html` | 메인 (Bento grid 제품 소개, PayPal 기부) | purple |
| `/movit/` | 탐험 지도 앱 | #10B981 (green) |
| `/stampit/` | 회원권 관리 앱 | #F59E0B (amber) |
| `/worldcanvas/` | 협업 캔버스 | #3B82F6 (blue) |
| `/pricing/` | WorldCanvas 가격 | #F59E0B (gold) |

## 에이전트 활용 규칙

작업 시 반드시 적절한 에이전트를 적극 활용할 것:

### design-expert (디자인 전문가)
- CSS 변수/색상/테마 변경
- 글래스모피즘, 셰이더, 애니메이션
- 타이포그래피, 반응형 레이아웃
- **항상 `styles/common.css` 변수부터 시작**

### static-page-expert (정적 페이지 전문가)
- HTML 구조/마크업 변경
- i18n 키 추가/번역
- SEO 메타태그, 네비게이션
- 링크/URL 관리

### 협업 패턴
- **리디자인**: `/redesign` 스킬 사용 (design-expert + static-page-expert 순차)
- **i18n 동기화**: `/i18n-sync` 스킬 사용
- **사이트 점검**: `/check-site` 스킬 사용
- **병렬 처리**: 독립적인 작업은 Task 도구로 병렬 실행

## 보존 필수 항목 (절대 변경 금지)
- PayPal 폼: `PN2WRW4NEXA2L` (index.html)
- 앱스토어 링크: Movit/Stampit (iOS/Android)
- 서비스 URL: worldcanvas.art
- Google Analytics: `G-PQGB9Q3SNE` (모든 페이지에 포함 필수)
- `data-i18n` 속성의 기존 키 이름
- WebGL 셰이더 코드 (vertexShader, fragmentShader)
- sitemap.xml 구조

## CSS 디자인 토큰 (2026 Edition)
```css
--bg-primary: #000000          /* 깊은 블랙 */
--brand-purple-light: #A78BFA  /* 생생한 퍼플 */
--surface-glass: rgba(139, 92, 246, 0.03)  /* 퍼플 틴트 글래스 */
--glow-purple: 0 0 24px rgba(167, 139, 250, 0.3)  /* 보라 글로우 */
--space-3xl: 96px              /* 넓은 여백 */
```

## 작업 순서 원칙
1. CSS 변수 변경 (common.css) -> 2. 인라인 스타일 수정 (5개 HTML) -> 3. i18n 키 동기화 (11개 JSON) -> 4. 검증
