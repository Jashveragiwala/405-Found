import matchers from '@testing-library/jest-dom/matchers';
import fc from 'fast-check';
import { expect, vi } from 'vitest';

expect.extend(matchers);

// For fuzzing
// TODO: Implement an easier way to toggle fuzzing
// fc.configureGlobal({ numRuns: 100000 })

// setupTest.js for Vitest
vi.mock('$app/stores', async () => {
  const { readable, writable } = await import('svelte/store');
  /**
   * @type {import('$app/stores').getStores}
   */
  const getStores = () => ({
    navigating: readable(null),
    page: readable({ url: new URL('http://localhost'), params: {} }),
    session: writable(null),
    updated: readable(false)
  });
  /** @type {typeof import('$app/stores').page} */
  const page = {
    subscribe(fn) {
      return getStores().page.subscribe(fn);
    }
  };
  /** @type {typeof import('$app/stores').navigating} */
  const navigating = {
    subscribe(fn) {
      return getStores().navigating.subscribe(fn);
    }
  };
  /** @type {typeof import('$app/stores').session} */
  const session = {
    subscribe(fn) {
      return getStores().session.subscribe(fn);
    }
  };
  /** @type {typeof import('$app/stores').updated} */
  const updated = {
    subscribe(fn) {
      return getStores().updated.subscribe(fn);
    }
  };
  return {
    getStores,
    navigating,
    page,
    session,
    updated
  };
});
