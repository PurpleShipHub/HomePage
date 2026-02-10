---
name: redesign
description: 사이트 전체 리디자인을 수행합니다. 디자인 전문가와 정적 페이지 전문가를 함께 활용합니다.
---

# /redesign - 전체 리디자인

사용자의 디자인 요구사항을 분석하고, Purpleship 사이트 전체를 리디자인합니다.

## 작업 순서

1. **요구사항 분석**: 사용자가 제공한 레퍼런스 URL이나 디자인 방향 파악
2. **현재 상태 확인**: `styles/common.css`와 주요 HTML 파일의 현재 디자인 상태 확인
3. **계획 수립**: 변경 범위 결정 (색상 체계, 타이포그래피, 레이아웃, 셰이더 등)
4. **CSS 변수 변경**: `styles/common.css` `:root` 변수부터 수정 (design-expert 영역)
5. **인라인 스타일 수정**: 5개 HTML 파일의 인라인 `<style>` 태그 수정
6. **셰이더 교체**: 필요 시 WebGL fragment shader를 5개 파일 모두 교체
7. **콘텐츠 구조 변경**: 필요 시 HTML 구조 변경 (static-page-expert 영역)
8. **i18n 키 동기화**: 새 키가 필요하면 11개 JSON 파일 모두 업데이트
9. **검증**: 전체 페이지 일관성, 반응형, 링크, 보존 항목 확인

## 보존 필수 항목

절대 변경하지 마세요:
- PayPal 폼 (`PN2WRW4NEXA2L`)
- 앱스토어 링크 (Movit iOS/Android, Stampit iOS)
- 서비스 URL (worldcanvas.art)
- Google Analytics (`G-PQGB9Q3SNE`)
- i18n `data-i18n` 속성의 기존 키 이름 (값은 변경 가능)
- sitemap.xml 구조

## 사용 예시

```
/redesign 다크 테마로 변경해줘
/redesign https://example.com 이 사이트 참고해서 리디자인해줘
/redesign 글래스모피즘 효과 강화하고 셰이더 교체해줘
```
