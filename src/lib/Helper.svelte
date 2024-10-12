<script lang="ts">
  import Fa from "svelte-fa";
  import { faCircleInfo } from "@fortawesome/free-solid-svg-icons/faCircleInfo";
  import { createPopperActions } from "svelte-popperjs";

  export let text: string;

  const [popperRef, popperContent] = createPopperActions({
    placement: "bottom",
    strategy: "fixed",
  });
  let isOpen: boolean = false;

  const openIt = () => {
    isOpen = true;
  };
  const closeIt = () => {
    isOpen = false;
  };
</script>

<button
  use:popperRef
  on:mouseenter={openIt}
  on:mouseleave={closeIt}
  on:click={openIt}
>
  <Fa icon={faCircleInfo} /></button
>
{#if isOpen}
  <div use:popperContent class="popper">
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
