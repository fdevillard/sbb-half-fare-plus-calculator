<script lang="ts">
  import { stopPropagation } from "svelte/legacy";

  import Fa from "svelte-fa";
  import { faCircleInfo } from "@fortawesome/free-solid-svg-icons/faCircleInfo";
  import { createPopperActions } from "svelte-popperjs";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";

  interface Props {
    text: string;
  }

  let { text }: Props = $props();

  const [popperRef, popperContent] = createPopperActions({
    placement: "bottom",
    strategy: "fixed",
  });

  const extraOpts = {
    modifiers: [
      { name: "preventOverflow", options: { padding: 16 } },
      {
        name: "flip",
        options: { fallbackPlacements: ["top", "right", "left"] },
      },
      { name: "offset", options: { offset: [0, 8] } },
    ],
  };

  let isOpen: boolean = $state(false);

  const openIt = () => {
    isOpen = true;
  };
  const closeIt = () => {
    isOpen = false;
  };

  let popperContentElement: HTMLElement | undefined = $state(undefined);

  function closeIfClickOutside(event: MouseEvent) {
    if (!isOpen) return;
    if (
      popperContentElement &&
      !popperContentElement.contains(event.target as Node)
    ) {
      closeIt();
    }
  }

  onMount(() => {
    document.addEventListener("click", closeIfClickOutside);
    return () => {
      document.removeEventListener("click", closeIfClickOutside);
    };
  });
</script>

<button
  use:popperRef
  onmouseenter={openIt}
  onmouseleave={closeIt}
  onclick={stopPropagation(openIt)}
>
  <Fa icon={faCircleInfo} /></button
>
{#if isOpen}
  <div
    use:popperContent={extraOpts}
    class="popper"
    bind:this={popperContentElement}
    transition:fade={{ duration: 150 }}
  >
    <span>{text}</span>
  </div>
{/if}

<style>
  button {
    background: none;
    border: none;
    padding: var(--space-2);
    margin: 0;
    font: inherit;
    color: var(--color-text-secondary);
    cursor: pointer;
    border-radius: var(--radius-sm);
    min-width: 32px;
    min-height: 32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    transition:
      color var(--transition-fast),
      background var(--transition-fast);
  }

  button:hover {
    color: var(--color-accent);
    background: var(--color-accent-subtle);
  }

  button:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  .popper {
    background: var(--color-surface);
    border: 1px solid var(--color-border-strong);
    color: var(--color-text-primary);
    padding: var(--space-4);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    max-width: min(30em, calc(100vw - 32px));
    font-size: 0.875rem;
    line-height: 1.6;
    z-index: var(--z-tooltip);
  }
</style>
