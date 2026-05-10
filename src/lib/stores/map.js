import { writable } from 'svelte/store';

export const selectedDistillery = writable(null);
export const activeFilter = writable('ALL');
export const showSuggestForm = writable(false);
export const showAbout = writable(false);
export const sidebarOpen = writable(false);
export const mapReady = writable(false);
