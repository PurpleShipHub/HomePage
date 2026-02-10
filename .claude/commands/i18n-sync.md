---
name: i18n-sync
description: i18n 키를 11개 언어 파일에 동기화합니다. 누락된 키를 찾아 번역을 추가합니다.
---

# /i18n-sync - 다국어 동기화

Purpleship의 11개 언어 JSON 파일 간 i18n 키를 동기화합니다.

## 작업 순서

1. **기준 파일 확인**: `locales/ko.json`을 기준으로 모든 키 목록 추출
2. **누락 키 탐지**: 11개 파일 각각에서 누락된 키 식별
3. **HTML 참조 확인**: `data-i18n` 속성에서 사용하는 키가 모두 존재하는지 확인
4. **미사용 키 탐지**: JSON에 존재하지만 HTML에서 참조하지 않는 키 식별
5. **번역 추가**: 누락된 키에 적절한 번역 추가
6. **결과 보고**: 추가/삭제된 키 목록 출력

## 파일 목록

```
locales/ko.json  (기준)
locales/en.json
locales/zh.json
locales/ja.json
locales/es.json
locales/fr.json
locales/de.json
locales/ru.json
locales/ar.json
locales/hi.json
locales/vi.json
```

## 키 네이밍 규칙

- camelCase + dot notation: `movit.hero.title`, `pricingPage.plans.starter.price`
- 네임스페이스: 제품명(`movit`, `stampit`, `worldcanvas`) + 섹션(`hero`, `features`, `nav`, `footer`)

## 사용 예시

```
/i18n-sync
/i18n-sync movit.features 섹션에 newFeature 키 추가해줘
/i18n-sync 누락된 키만 찾아줘
```
