"use client";

export const COMMAND_PALETTE_EVENT = "portfolio:open-command-palette";

/**
 * Asks the palette to open from anywhere in the tree. A tiny event beats
 * synthesising a fake ⌘K keydown, which relied on the palette's shortcut
 * handler happening to accept forged events.
 */
export const openCommandPalette = () => {
  window.dispatchEvent(new CustomEvent(COMMAND_PALETTE_EVENT));
};
