<script lang="ts">
  import ExistingHalfFareForm from "./lib/ExistingHalfFareForm.svelte";
</script>

<header>
  <h1>SBB Half Fare Plus</h1>
  <div class="description">
    <p>
      This tool helps you to find the best Half Fare Plus subscription based on
      the consumption of your current one.
    </p>
    <p>If you don't already have one, enter your yearly estimate and set 0 remaining days.</p>
  </div>
</header>

<main>
  <div class="card">
    <ExistingHalfFareForm />
  </div>
</main>

<style>
</style>
