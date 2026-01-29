// Centralized animation configuration for consistent timing across the app

export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 700,
} as const

export const ANIMATION_DELAYS = {
  stagger: 50,
  short: 100,
  medium: 200,
  long: 300,
} as const

export const EASING = {
  default: "ease-out",
  smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
} as const

// Tailwind class helpers
export const transitionClasses = {
  colors: "transition-colors duration-300 ease-out",
  transform: "transition-transform duration-300 ease-out",
  opacity: "transition-opacity duration-300 ease-out",
  all: "transition-all duration-300 ease-out",
  allSlow: "transition-all duration-500 ease-out",
} as const

// Scroll animation threshold
export const SCROLL_THRESHOLD = 50

// Mobile menu animation delay multiplier
export const MENU_STAGGER_DELAY = 50

// Image loading placeholder
export const IMAGE_BLUR_DATA_URL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAA8AFADASIAAhEBAxEB/8QAGQABAQADAQAAAAAAAAAAAAAAAAECAwQF/8QAHBAAAwEBAAMBAAAAAAAAAAAAAAECAxEhEiIx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD0gA8j0igAlqoCWgJaAloAPY9IoAJaoCWqAJaoCWgJaoCWgA9j0igAloAP/9k="
