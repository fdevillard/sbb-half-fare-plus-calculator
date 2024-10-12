<script lang="ts">
  import ResultDisplay from "./ResultDisplay.svelte";
  import { onMount } from "svelte";

  let creditUsed: number = 0;
  let remainingDays: number = 0;

  const localStorageKey = "existingHalfFareForm";

  onMount(() => {
    const raw = localStorage.getItem(localStorageKey) || "{}";
    const data = JSON.parse(raw);
    creditUsed = data.creditUsed || 0;
    remainingDays = data.remainingDays || 0;
  });

  $: if (creditUsed || remainingDays) {
    localStorage.setItem(
      localStorageKey,
      JSON.stringify({ creditUsed, remainingDays }),
    );
  }

  $: passedDays = 365 - remainingDays;
  $: pricePerDay = creditUsed / passedDays;
  $: yearlyPrice = pricePerDay * 365;
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
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  div {
    margin-bottom: 1rem;
  }

  label {
    margin-right: 0.5rem;
  }

  input {
    padding: 0.5rem;
    font-size: 1rem;
  }
</style>
