import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * מחבר בין מחלקות CSS בצורה חכמה, עם תמיכה ב־Tailwind
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs))
}
