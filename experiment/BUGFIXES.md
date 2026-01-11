# Bug Fixes and Code Review Summary

This document summarizes all bugs, errors, and bad practices that were identified and fixed in the codebase.

## Backend Fixes

### 1. **Deprecated `datetime.utcnow()` Usage**
**Problem:** Python's `datetime.utcnow()` is deprecated. Should use `datetime.now(timezone.utc)` for timezone-aware datetimes.

**Fixed in:**
- `backend/app/auth.py`: Token creation functions
- `backend/app/routers/auth.py`: Refresh token expiration checks
- `backend/app/routers/blog.py`: Published timestamp
- `backend/app/routers/subscriptions.py`: Subscription update timestamps
- `backend/app/routers/lessons.py`: Subscription balance calculations
- `backend/app/services/calendar.py`: Slot generation date comparisons
- `backend/app/tasks/subscriptions.py`: Subscription expiration checks

**Impact:** Ensures proper timezone handling and prevents deprecation warnings.

---

### 2. **Synchronous Google Calendar API Calls in Async Context**
**Problem:** Google Calendar API client is synchronous but was being called directly in async functions, blocking the event loop.

**Fix:** Wrapped synchronous Google API calls in `loop.run_in_executor()` to run in a thread pool.

**File:** `backend/app/services/calendar.py`
- Method `_get_calendar_events()` now properly executes synchronous calls in thread pool

**Impact:** Prevents blocking the async event loop, improving performance and responsiveness.

---

### 3. **Celery Task Async Event Loop Handling**
**Problem:** Using `asyncio.run()` in Celery tasks can conflict with existing event loops, causing runtime errors.

**Fix:** Improved event loop detection and handling:
- Check if event loop exists and is closed
- Use `run_until_complete()` for existing loops
- Fall back to `asyncio.run()` only when no loop exists

**File:** `backend/app/tasks/subscriptions.py`
- Function `check_subscription_expiration()` now properly handles event loops

**Impact:** Prevents event loop conflicts in Celery tasks, ensuring scheduled tasks run correctly.

---

### 4. **Refresh Token Timezone Comparison**
**Problem:** Comparing timezone-aware and timezone-naive datetimes can cause incorrect expiration checks.

**Fix:** Normalize timezone handling before comparison:
- Check if `expires_at` is timezone-aware
- Normalize to UTC for consistent comparison

**File:** `backend/app/routers/auth.py`
- Method `refresh_token()` now properly compares timezone-aware datetimes

**Impact:** Ensures refresh tokens are validated correctly regardless of database timezone settings.

---

### 5. **Unused Import**
**Problem:** `os` module imported but never used in config.

**Fix:** Removed unused import.

**File:** `backend/app/config.py`

**Impact:** Cleaner code, no unused imports.

---

### 6. **CORS Configuration**
**Problem:** CORS allowed origins didn't include all necessary URLs for Docker setup.

**Fix:** Added additional allowed origins:
- `http://localhost`
- `http://nginx`
- Kept wildcard for development

**File:** `backend/app/main.py`

**Impact:** Frontend can properly communicate with backend API in all environments.

---

## Frontend Fixes

### 7. **Axios Refresh Token Interceptor Using Wrong Client**
**Problem:** Refresh token interceptor used `axios` directly instead of `apiClient`, causing missing interceptors and auth headers.

**Fix:** Changed to use `apiClient` for refresh token requests and update Zustand store.

**File:** `frontend/lib/api.ts`
- Refresh interceptor now uses `apiClient` 
- Updates Zustand store on successful refresh

**Impact:** Refresh token flow works correctly with proper error handling and state synchronization.

---

### 8. **Zustand Persist SSR Handling**
**Problem:** Zustand persist can cause hydration mismatches in Next.js SSR.

**Fix:**
- Added SSR-safe storage getter
- Added `skipHydration: true` to prevent hydration issues
- Proper client-side rehydration in account page

**Files:**
- `frontend/store/authStore.ts`: SSR-safe storage configuration
- `frontend/app/account/page.tsx`: Proper client-side hydration

**Impact:** Prevents hydration errors and ensures auth state persists correctly.

---

### 9. **Frontend Dockerfile Production Mode**
**Problem:** Dockerfile was using `npm run dev` which is for development, not production.

**Fix:** Changed to use Next.js standalone output mode:
- Uses `output: 'standalone'` from next.config.js
- Copies standalone build artifacts
- Runs with `node server.js`

**Files:**
- `frontend/Dockerfile`: Production-ready build
- `frontend/next.config.js`: Conditional standalone output based on NODE_ENV

**Impact:** Proper production builds with smaller image size and better performance.

---

### 10. **Nginx Static Assets Routing**
**Problem:** Static assets path was hardcoded to a specific directory that doesn't exist in standalone mode.

**Fix:** Changed to proxy static assets through Next.js frontend service instead of trying to serve from a fixed path.

**File:** `docker/nginx.conf`

**Impact:** Static assets are properly served in Docker production setup.

---

### 11. **Duplicate Dependency in requirements.txt**
**Problem:** `httpx` was listed twice in requirements.txt.

**Fix:** Removed duplicate entry.

**File:** `backend/requirements.txt`

**Impact:** Cleaner dependency management.

---

## Summary of Architectural Improvements

1. **Async/Await Patterns**: All async code now properly handles blocking operations
2. **Timezone Handling**: Consistent UTC usage throughout the application
3. **Error Handling**: Improved error handling in async contexts
4. **State Management**: SSR-safe state management with Zustand
5. **Docker Configuration**: Production-ready Docker setup
6. **API Integration**: Proper token refresh with state synchronization

## Testing Recommendations

1. **Backend Tests**: Verify all datetime comparisons work with timezone-aware datetimes
2. **Frontend Tests**: Test auth flow and token refresh in SSR context
3. **Integration Tests**: Verify Google Calendar integration with async patterns
4. **Docker Tests**: Verify all services start correctly and communicate properly

## Notes

- SQLAlchemy 2.0 async `db.delete()` syntax is correct and doesn't need changes
- Blog post page is currently client-side rendered; consider SSR for better SEO if needed
- All fixes maintain backward compatibility where possible
- No breaking changes to API contracts

