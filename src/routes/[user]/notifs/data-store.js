import { writable } from 'svelte/store';

// Create an table but can overwrite later
export const successfulArray = writable([])
export const pendingArray = writable([])
export const unsentArray = writable([])
export const failedArray = writable([])

// need to sync data for notifications, hardcoded for now
