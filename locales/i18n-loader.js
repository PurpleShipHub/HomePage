/**
 * i18n Dynamic Loader
 * 필요한 언어 파일만 동적으로 로드하여 성능 최적화
 */

// 지원하는 언어 목록
const SUPPORTED_LANGUAGES = ['ko', 'en', 'zh', 'ja', 'es', 'fr', 'de', 'ru', 'ar', 'hi', 'vi'];
const DEFAULT_LANGUAGE = 'ko';

// 번역 데이터 캐시
let currentTranslations = null;
let currentLanguage = null;

/**
 * 브라우저 언어 감지
 */
function detectLanguage() {
  // localStorage에 저장된 언어 확인
  const savedLang = localStorage.getItem('preferred-language');
  if (savedLang && SUPPORTED_LANGUAGES.includes(savedLang)) {
    return savedLang;
  }
  
  // 브라우저 언어 확인
  const browserLang = navigator.language.split('-')[0].toLowerCase();
  if (SUPPORTED_LANGUAGES.includes(browserLang)) {
    return browserLang;
  }
  
  // 기본 언어 반환
  return DEFAULT_LANGUAGE;
}

/**
 * 언어 파일 로드
 * @param {string} lang - 언어 코드 (예: 'ko', 'en')
 * @returns {Promise<Object>} 번역 데이터
 */
async function loadLanguage(lang) {
  try {
    // 캐시 확인
    if (currentLanguage === lang && currentTranslations) {
      return currentTranslations;
    }
    
    // JSON 파일 로드
    const response = await fetch(`/locales/${lang}.json`);
    
    if (!response.ok) {
      throw new Error(`Failed to load language: ${lang}`);
    }
    
    const translations = await response.json();
    
    // 캐시 업데이트
    currentTranslations = translations;
    currentLanguage = lang;
    
    return translations;
  } catch (error) {
    console.error('Error loading language:', error);
    
    // 폴백: 기본 언어 로드
    if (lang !== DEFAULT_LANGUAGE) {
      return loadLanguage(DEFAULT_LANGUAGE);
    }
    
    throw error;
  }
}

/**
 * 중첩된 객체에서 값 가져오기
 * @param {Object} obj - 객체
 * @param {string} path - 점(.)으로 구분된 경로 (예: 'hero.title')
 * @returns {*} 값
 */
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => current && current[key], obj);
}

/**
 * 특정 앱의 번역 데이터 가져오기
 * @param {string} app - 앱 이름 ('movit', 'stampit', 'qnote' 등)
 * @param {string} key - 번역 키 (예: 'hero.title')
 * @returns {string} 번역된 텍스트
 */
function getTranslation(app, key) {
  if (!currentTranslations) {
    console.warn('Translations not loaded yet');
    return key;
  }
  
  // 앱별 번역 데이터
  const appTranslations = currentTranslations[app];
  if (!appTranslations) {
    // 루트 레벨 키일 수도 있음
    const value = getNestedValue(currentTranslations, key);
    return value || key;
  }
  
  const value = getNestedValue(appTranslations, key);
  return value || key;
}

/**
 * 페이지의 모든 i18n 요소 업데이트
 * @param {string} app - 앱 이름 (선택사항)
 */
function updatePageTranslations(app = null) {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    
    let value;
    if (app) {
      // 앱별 번역
      value = getTranslation(app, key);
    } else {
      // 루트 레벨 번역
      value = getNestedValue(currentTranslations, key);
    }
    
    if (value) {
      element.textContent = value;
    }
  });
}

/**
 * 언어 변경
 * @param {string} lang - 언어 코드
 * @param {string} app - 앱 이름 (선택사항)
 */
async function changeLanguage(lang, app = null) {
  if (lang === 'auto') {
    lang = detectLanguage();
  }
  
  if (!SUPPORTED_LANGUAGES.includes(lang)) {
    lang = DEFAULT_LANGUAGE;
  }
  
  try {
    // 언어 파일 로드
    await loadLanguage(lang);
    
    // localStorage에 저장
    localStorage.setItem('preferred-language', lang);
    
    // HTML lang 속성 업데이트
    document.documentElement.lang = lang;
    
    // 페이지 번역 업데이트
    updatePageTranslations(app);
    
    // Google Analytics 이벤트 (있는 경우)
    if (typeof gtag !== 'undefined') {
      gtag('event', 'language_change', {
        'language': lang
      });
    }
    
    return true;
  } catch (error) {
    console.error('Failed to change language:', error);
    return false;
  }
}

/**
 * 초기화 함수
 * @param {string} app - 앱 이름 (선택사항)
 */
async function initI18n(app = null) {
  const lang = detectLanguage();
  await changeLanguage(lang, app);
}

// 전역으로 노출
window.i18n = {
  init: initI18n,
  changeLanguage,
  detectLanguage,
  getTranslation,
  SUPPORTED_LANGUAGES
};

