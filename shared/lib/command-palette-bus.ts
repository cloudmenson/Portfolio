"use client";

export const COMMAND_PALETTE_EVENT = "portfolio:open-command-palette";

export const openCommandPalette = () => {
  window.dispatchEvent(new CustomEvent(COMMAND_PALETTE_EVENT));
};
