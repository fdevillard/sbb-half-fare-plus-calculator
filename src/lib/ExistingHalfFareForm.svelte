<script lang="ts">
  import { run } from "svelte/legacy";

  import ResultDisplay from "./ResultDisplay.svelte";
  import { onMount } from "svelte";

  let creditUsed: number = $state(0);
  let remainingDays: number = $state(0);

  const localStorageKey = "existingHalfFareForm";

  onMount(() => {
    const raw = localStorage.getItem(localStorageKey) || "{}";
    const data = JSON.parse(raw);
    creditUsed = data.creditUsed || 0;
    remainingDays = data.remainingDays || 0;
  });

  run(() => {
    if (creditUsed || remainingDays) {
      localStorage.setItem(
        localStorageKey,
        JSON.stringify({ creditUsed, remainingDays }),
      );
    }
  });

  let passedDays = $derived(365 - remainingDays);
  let pricePerDay = $derived(creditUsed / passedDays);
  let yearlyPrice = $derived(pricePerDay * 365);
</script>

<main>
  <h2>Enter Credit Details</h2>
  <form>
    <div>
      <label for="creditUsed">Credit Used (CHF):</label>
      <input type="number" id="creditUsed" bind:value={creditUsed} />
    </div>
    <div>
      <label for="remainingDays">Remaining Days:</label>
      <input type="number" id="remainingDays" bind:value={remainingDays} />
    </div>
    <p>You can find these values in your SBB Application.</p>
  </form>

  {#if yearlyPrice}
    <div class="card">
      <ResultDisplay {yearlyPrice} />
    </div>
  {/if}
</main>

<style>
  main {
    margin: 0;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
    margin-bottom: var(--space-8);
  }

  form > div {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    margin-bottom: 0;
  }

  label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text-secondary);
    letter-spacing: 0.01em;
    margin-right: 0;
  }

  input[type="number"] {
    width: 100%;
    min-height: 44px;
    padding: var(--space-3) var(--space-4);
    font-size: 1rem;
    font-family: inherit;
    color: var(--color-text-primary);
    background: var(--color-surface-raised);
    border: 1px solid var(--color-border-strong);
    border-radius: var(--radius-sm);
    transition:
      border-color var(--transition-fast),
      box-shadow var(--transition-fast),
      background var(--transition-fast);
    appearance: textfield;
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"]:hover {
    border-color: var(--color-accent);
  }

  input[type="number"]:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px var(--color-accent-subtle);
  }

  form > p {
    font-size: 0.8125rem;
    color: var(--color-text-disabled);
    margin: calc(-1 * var(--space-3)) 0 0;
  }

  .card {
    margin-top: var(--space-6);
  }
</style>
