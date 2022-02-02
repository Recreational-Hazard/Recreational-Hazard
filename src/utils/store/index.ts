import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

export const notice: Writable<{ show: boolean, message?: any, type?: "notice" | "warning" | "error", [key: string]: any }> = writable({ show: false })