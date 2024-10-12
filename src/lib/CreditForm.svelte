<script lang="ts">
  import ResultDisplay from "./ResultDisplay.svelte";
  import {onMount} from "svelte";

  let creditUsed: number = 0;
  let remainingDays: number = 0;

  const localStorageKey = "sbb-half-fare-plus";

  onMount(() => {
    const raw = localStorage.getItem(localStorageKey) || "{}";
    const data = JSON.parse(raw);
    creditUsed = data.creditUsed || 0;
    remainingDays = data.remainingDays || 0;
  })

  $: if (creditUsed || remainingDays) {
    localStorage.setItem(localStorageKey, JSON.stringify({creditUsed, remainingDays}));
  }

  function handleSubmit(event: Event) {
    event.preventDefault();
    console.log(`Credit Used: ${creditUsed}, Remaining Days: ${remainingDays}`);
  }
</script>

<main>
  <h2>Enter Credit Details</h2>
  <form on:submit={handleSubmit}>
    <div>
      <label for="creditUsed">Credit Used (CHF):</label>
      <input type="number" id="creditUsed" bind:value={creditUsed} />
    </div>
    <div>
      <label for="remainingDays">Remaining Days:</label>
      <input type="number" id="remainingDays" bind:value={remainingDays} />
    </div>
    <p>You can find these values in your SBB Half Far plus.</p>
  </form>

  <div class="card">
    <ResultDisplay {creditUsed} {remainingDays} />
  </div>
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

  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
  }
</style>