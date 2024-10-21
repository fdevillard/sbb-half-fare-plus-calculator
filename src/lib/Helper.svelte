<script lang="ts">
  import { stopPropagation } from "svelte/legacy";

  import Fa from "svelte-fa";
  import { faCircleInfo } from "@fortawesome/free-solid-svg-icons/faCircleInfo";
  import { createPopperActions } from "svelte-popperjs";
  import { onMount } from "svelte";

  interface Props {
    text: string;
  }

  let { text }: Props = $props();

  const [popperRef, popperContent] = createPopperActions({
    placement: "bottom",
    strategy: "fixed",
  });
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
  <div use:popperContent class="popper" bind:this={popperContentElement}>
    <span>{text}</span>
  </div>
{/if}

<style>
  button {
    background: none;
    border: none;
    padding: 0.2em;
    margin: 0;
    font: inherit;
    color: inherit;
    outline: none;
  }

  .popper {
    background-color: black;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 30em;
  }

  @media (prefers-color-scheme: light) {
    .popper {
      background-color: white;
    }
  }
</style>
