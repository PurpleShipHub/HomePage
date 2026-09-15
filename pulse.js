(() => {
  'use strict';

  const ENDPOINT = 'https://pulse-api.purpleshiphub.workers.dev/api/v1/ping';
  const PROJECT_ID = 'pp_purpleship_7f96f8d2';
  const VERSION = 'web-20260916';
  const INSTALL_KEY = 'purpleship:pulse:install_id';
  const LAST_ATTEMPT_KEY = 'purpleship:pulse:last_attempt_utc';

  function detectOs() {
    const ua = navigator.userAgent || '';
    const platform = navigator.userAgentData?.platform || navigator.platform || '';
    if (/Android/i.test(ua)) return 'android';
    if (/iPhone|iPad|iPod/i.test(ua) || (platform === 'MacIntel' && navigator.maxTouchPoints > 1)) return 'ios';
    if (/Win/i.test(platform) || /Windows/i.test(ua)) return 'windows';
    if (/Mac/i.test(platform) || /Mac OS/i.test(ua)) return 'macos';
    if (/Linux/i.test(platform) || /Linux/i.test(ua)) return 'linux';
    return 'other';
  }

  function createInstallId() {
    if (crypto.randomUUID) return crypto.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = crypto.getRandomValues(new Uint8Array(1))[0] & 15;
      return (c === 'x' ? r : (r & 3) | 8).toString(16);
    });
  }

  async function pingOncePerDay() {
    try {
      const todayUtc = new Date().toISOString().slice(0, 10);
      if (localStorage.getItem(LAST_ATTEMPT_KEY) === todayUtc) return;

      let installId = localStorage.getItem(INSTALL_KEY);
      if (!installId) {
        installId = createInstallId();
        localStorage.setItem(INSTALL_KEY, installId);
      }

      localStorage.setItem(LAST_ATTEMPT_KEY, todayUtc);
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 2000);
      try {
        await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            project_id: PROJECT_ID,
            install_id: installId,
            version: VERSION,
            os: detectOs(),
            platform: 'web',
            schema_version: 2
          }),
          signal: controller.signal,
          keepalive: true
        });
      } catch (_) {
        // Telemetry must never affect the site or retry aggressively.
      } finally {
        clearTimeout(timeout);
      }
    } catch (_) {
      // localStorage/crypto/privacy-mode failures are intentionally ignored.
    }
  }

  pingOncePerDay();
})();
