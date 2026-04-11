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

<section>
  <h2>Enter Credit Details</h2>
  <form>
    <div class="form-group">
      <label for="creditUsed">Credit Used (CHF)</label>
      <input
        type="number"
        id="creditUsed"
        bind:value={creditUsed}
        placeholder="e.g. 500"
      />
    </div>
    <div class="form-group">
      <label for="remainingDays">Remaining Days</label>
      <input
        type="number"
        id="remainingDays"
        bind:value={remainingDays}
        placeholder="e.g. 180"
      />
    </div>
    <p class="hint">You can find these values in your SBB application.</p>
  </form>

  {#if yearlyPrice}
    <ResultDisplay {yearlyPrice} />
  {/if}
</section>

<style>
  h2 {
    font-size: 1.25rem;
    color: var(--color-text-primary);
    margin-bottom: var(--space-lg);
    font-weight: 600;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    text-align: left;
  }

  label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text-secondary);
  }

  input[type="number"] {
    width: 100%;
  }

  .hint {
    font-size: 0.8rem;
    color: var(--color-text-muted);
    margin: 0;
  }

  @media (min-width: 640px) {
    .form-group {
      flex-direction: row;
      align-items: center;
      gap: var(--space-md);
    }

    label {
      min-width: 160px;
      text-align: right;
      flex-shrink: 0;
    }
  }
</style>
