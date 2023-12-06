import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const BACKEND_API = 'https://scscanapi.azurewebsites.net';
export const BACKEND_SUMMARY_API = 'https://scscansummary.azurewebsites.net';
export const IPFS_GATEWAY = 'https://api.universalprofile.cloud/ipfs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isAddress(address: string): boolean {
  const addressRegex = /^(0x)?[0-9a-fA-F]{40}$/;
  return addressRegex.test(address);
}