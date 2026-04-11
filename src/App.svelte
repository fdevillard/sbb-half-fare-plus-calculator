<script lang="ts">
  import ExistingHalfFareForm from "./lib/ExistingHalfFareForm.svelte";
  import ThemeToggle from "./lib/ThemeToggle.svelte";
</script>

<header>
  <div class="header-bar">
    <h1>SBB Half Fare Plus</h1>
    <ThemeToggle />
  </div>
  <div class="description">
    <p>
      This tool helps you find the best Half Fare Plus subscription based on the
      consumption of your current one.
    </p>
    <p>
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
  <p>
    <strong>Disclaimer</strong>: This tool is a personal project and may not
    always provide accurate or complete calculations. Please use it at your own
    discretion and risk.
  </p>
</footer>

<style>
  header {
    margin-bottom: var(--space-2xl);
  }

  .header-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-md);
  }

  .description {
    color: var(--color-text-secondary);
    font-size: 0.95rem;
    margin-top: var(--space-sm);
    text-align: left;
  }

  .description p {
    margin: var(--space-xs) 0;
  }

  footer {
    margin-top: var(--space-2xl);
    padding-top: var(--space-lg);
    border-top: 1px solid var(--color-border);
    color: var(--color-text-muted);
    font-size: 0.85rem;
  }
</style>
