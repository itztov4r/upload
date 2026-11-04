# Repository audit — 4 November 2026

Source reviewed: `be180f2438edb3d2230da507c51f3cba5b8b82f1` on `main`. Changes are proposed on `audit/repository-improvements-2026-11-04`; nothing was merged or deployed.

## Changes

- Migrate legacy plaintext local passwords to salted PBKDF2-SHA-256 records; store only public profile fields in the active session.
- Handle corrupt/blocked storage and reject duplicate profile emails; preserve password records during profile edits.
- Validate avatar type/size and render stored/preview avatars through safe DOM APIs.
- Serialize file imports so a shared progress indicator does not race; discard imports from a former session and release its video URLs on logout.
- Add keyboard video activation, dialog focus handling, announcements and reduced-motion styles.
- Add password migration/verification regressions and CI.

## Verification

3 automated behavioral tests passed. All 5 recorded source/test checks passed. Local verification used Node.js 26.12.0 and Python 3.15.0; CI should also confirm the configured deployment versions.

- `node --test tests\accounts.test.js`
- `node --check for repository JavaScript files`
- `node --check for executable inline HTML scripts`

Local HTML asset references were compared with the complete GitHub file inventory. Real desktop/mobile visual verification was blocked in this environment: the in-app preview could not reach the local server and the desktop browser did not expose a usable window. No claim of browser/device acceptance is made. Automated DOM/canvas simulations, where present, do not replace that check.

## Remaining limits and rollout

- This is a local demonstration, not secure server authentication or hosted video sharing. Anyone controlling the browser can alter local account data. Do not use a real password.
- Videos stay in browser memory and are not uploaded or persisted; reload/logout releases the session library.
- Legacy account migration needs Web Crypto (HTTPS or localhost). If browser storage is unwritable, migrated records cannot replace old stored data; clear that site storage manually after exporting any needed profiles.
- The standalone app.js is a separate older video-only example; index.html runs its own complete script plus accounts.js.
