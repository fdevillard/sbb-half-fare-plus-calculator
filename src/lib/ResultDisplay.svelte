<script lang="ts">
  import { subscriptionsFromYearlyExpenses } from "./compute";
  import Helper from "./Helper.svelte";

  interface Props {
    yearlyPrice: number;
  }

  let { yearlyPrice }: Props = $props();

  let subscriptions = $derived(subscriptionsFromYearlyExpenses(yearlyPrice));
  let best = $derived(
    subscriptions.reduce((lowest, item) =>
      item.yearlyPrice < lowest.yearlyPrice ? item : lowest,
    ),
  );

  const renewalHelp =
    "The number of time the subscription should be done per year. " +
    "It's a number greater or equal to 1. It can be fractional if you should " +
    "contract another subscription within the year.";
</script>

{#if best}
  <h3>Results</h3>
  <p>
    Based on your expected yearly credit usage of {yearlyPrice.toFixed(2)} CHF, the
    best subscriptions is:
  </p>
  <div class="card">
    <p class="the-best">
      {best.name}<br />(monthly price: {(best.yearlyPrice / 12).toFixed()} CHF)
    </p>
  </div>
{/if}

{#if subscriptions}
  <h3>Details:</h3>
  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>Subscription</th>
          <th>Renewals per year <Helper text={renewalHelp} /></th>
          <th>Yearly Price</th>
          <th>Monthly Price</th>
        </tr>
      </thead>
      <tbody>
        {#each subscriptions as { name, yearlyPrice, expectedYearlyRenewals, hint }}
          <tr class:best-row={name === best?.name}>
            <td
              >{name}{#if hint}
                <Helper text={hint} />{/if}</td
            >
            <td>{expectedYearlyRenewals.toFixed(2)}</td>
            <td>{yearlyPrice.toFixed()} CHF</td>
            <td>{(yearlyPrice / 12).toFixed()} CHF</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}

<style>
  /* ─── Best-option callout card ───────────────────────── */
  .card {
    background: var(--color-success-bg);
    border: 1px solid var(--color-success);
    border-radius: var(--radius-lg);
    padding: var(--space-6) var(--space-8);
    position: relative;
    overflow: hidden;
    margin-bottom: var(--space-6);
  }

  .card::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: var(--color-success);
  }

  .the-best {
    margin: 0;
    font-weight: 700;
    font-size: clamp(1.1rem, 2.5vw + 0.4rem, 1.375rem);
    color: var(--color-success-text);
    line-height: 1.4;
  }

  /* ─── Table wrapper (enables horizontal scroll on mobile) */
  .table-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-x: contain;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
  }

  @media (max-width: 600px) {
    .table-wrapper {
      margin-left: calc(-1 * var(--space-4));
      margin-right: calc(-1 * var(--space-4));
      border-radius: 0;
      border-left: none;
      border-right: none;
      box-shadow: inset -24px 0 16px -8px var(--color-bg);
    }
  }

  /* ─── Table ──────────────────────────────────────────── */
  table {
    width: 100%;
    min-width: 480px;
    border-collapse: collapse;
    font-size: 0.9375rem;
  }

  thead {
    background: var(--color-surface-raised);
  }

  th {
    padding: var(--space-3) var(--space-4);
    text-align: left;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--color-text-secondary);
    border-bottom: 1px solid var(--color-border-strong);
    white-space: nowrap;
  }

  td {
    padding: var(--space-3) var(--space-4);
    border-bottom: 1px solid var(--color-border);
    text-align: left;
    vertical-align: middle;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  tbody tr {
    transition: background var(--transition-fast);
  }

  tbody tr:hover {
    background: var(--color-surface-raised);
  }

  /* Tabular numbers for CHF columns */
  td:nth-child(2),
  td:nth-child(3),
  td:nth-child(4) {
    font-variant-numeric: tabular-nums;
    font-family: var(--font-mono);
    font-size: 0.875rem;
  }

  /* ─── Best row highlight ─────────────────────────────── */
  .best-row {
    background: var(--color-success-bg);
    font-weight: 600;
  }

  .best-row td {
    color: var(--color-success-text);
  }

  .best-row td:first-child {
    border-left: 3px solid var(--color-success);
    padding-left: calc(var(--space-4) - 3px);
  }
</style>
