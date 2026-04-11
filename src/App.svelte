<script lang="ts">
  import ExistingHalfFareForm from "./lib/ExistingHalfFareForm.svelte";
</script>

<header>
  <h1>SBB Half Fare Plus</h1>
  <div class="description">
    <p class="subtitle">
      This tool helps you to find the best Half Fare Plus subscription based on
      the consumption of your current one.
    </p>
    <p class="subtitle">
      If you don't already have one, enter your yearly estimate and set 0
      remaining days.
    </p>
  </div>
</header>

<main>
  <div class="card">
    <ExistingHalfFareForm />
  </div>
</main>

<footer>
  <p class="disclaimer">
    <strong>Disclaimer</strong>: This tool is a personal project and may not
    always provide accurate or complete calculations. Please use it at your own
    discretion and risk.
  </p>
</footer>

<style>
  header {
    width: 100%;
    padding: var(--space-12) var(--space-4) var(--space-8);
  }

  .subtitle {
    color: var(--color-text-secondary);
    margin: var(--space-3) 0 0;
    font-size: 0.9375rem;
    line-height: 1.6;
  }

  main {
    width: 100%;
  }

  footer {
    width: 100%;
    padding: var(--space-8) var(--space-4) var(--space-6);
  }

  .disclaimer {
    font-size: 0.8125rem;
    color: var(--color-text-disabled);
    line-height: 1.6;
    border-top: 1px solid var(--color-border);
    padding-top: var(--space-4);
    margin: 0;
  }

  @media (max-width: 480px) {
    header {
      padding-top: var(--space-8);
      padding-bottom: var(--space-6);
    }
  }
</style>
