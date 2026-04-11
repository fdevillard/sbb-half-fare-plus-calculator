<script lang="ts">
  import Fa from "svelte-fa";
  import { faSun } from "@fortawesome/free-solid-svg-icons/faSun";
  import { faMoon } from "@fortawesome/free-solid-svg-icons/faMoon";
  import { onMount } from "svelte";

  let theme: "dark" | "light" = $state("dark");

  function getSystemPreference(): "dark" | "light" {
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }

  function applyTheme(t: "dark" | "light") {
    document.documentElement.setAttribute("data-theme", t);
  }

  onMount(() => {
    const stored = localStorage.getItem("theme") as "dark" | "light" | null;
    theme = stored ?? getSystemPreference();
    applyTheme(theme);

    const mql = window.matchMedia("(prefers-color-scheme: light)");
    const handler = () => {
      if (!localStorage.getItem("theme")) {
        theme = getSystemPreference();
        applyTheme(theme);
      }
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  });

  function toggle() {
    theme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", theme);
    applyTheme(theme);
  }
</script>

<button class="theme-toggle" onclick={toggle} aria-label="Toggle theme">
  <Fa icon={theme === "dark" ? faSun : faMoon} />
</button>

<style>
  .theme-toggle {
    background: var(--color-bg-tertiary);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    padding: var(--space-sm);
    cursor: pointer;
    color: var(--color-text-primary);
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    transition:
      background-color 0.2s ease,
      border-color 0.2s ease;
  }

  .theme-toggle:hover {
    background: var(--color-accent-subtle);
    border-color: var(--color-accent);
  }
</style>
