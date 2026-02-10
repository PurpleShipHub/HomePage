---
name: orchestrate
description: Purpleship 사이트 작업 시 적절한 에이전트를 선택하고 조율하는 오케스트레이터.
---

# Orchestrate - Purpleship 작업 조율기

사용자의 요청을 분석하여 적절한 에이전트(design-expert, static-page-expert)를 선택하고 작업을 조율합니다.

## 에이전트 라우팅 규칙

### design-expert 단독
- CSS 변수/색상 변경
- 다크/라이트 테마 전환
- WebGL 셰이더 교체/수정
- 타이포그래피 조정 (font-size, line-height, letter-spacing)
- 반응형 브레이크포인트 수정
- 글래스모피즘/애니메이션 효과
- backdrop-filter, box-shadow, border 조정

### static-page-expert 단독
- HTML 구조/마크업 변경
- i18n 키 추가/삭제/번역 수정
- SEO 메타태그 수정
- 네비게이션 메뉴 변경
- 페이지 추가/삭제
- 링크/URL 수정
- 콘텐츠 텍스트 변경

### 양쪽 협업 (순서: design-expert → static-page-expert)
- 전체 리디자인 (테마 + 구조 + 콘텐츠)
- 새 제품 페이지 추가 (스타일 + HTML + i18n)
- 레이아웃 대규모 변경 (CSS 그리드 + HTML 구조)
- 새 섹션 추가 (디자인 + 마크업 + 번역)

## 작업 분배 원칙

1. **CSS 우선**: 디자인 변경은 반드시 `styles/common.css` CSS 변수부터 시작
2. **일관성**: common.css 변경 → 5개 페이지 모두 영향 확인
3. **i18n 완전성**: 키 추가 시 반드시 11개 언어 파일 모두 업데이트
4. **보존 우선**: PayPal, 앱스토어, GA 코드는 어떤 경우에도 보존
5. **병렬 처리**: 독립적인 작업은 동시에 진행 (CSS와 HTML이 독립적일 때)

## 품질 검증

작업 완료 후 확인:
- [ ] 5개 HTML 파일 모두 정상 구조
- [ ] 11개 i18n 파일 키 동기화 완료
- [ ] 셰이더 코드 5개 파일 동일
- [ ] 보존 항목 무결성
- [ ] CSS 변수 ↔ 인라인 스타일 일관성
