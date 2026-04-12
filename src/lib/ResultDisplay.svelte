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
  <p class="summary">
    Based on your expected yearly credit usage of <strong
      >{yearlyPrice.toFixed(2)} CHF</strong
    >, the best subscription is:
  </p>
  <div class="best-card">
    <span class="best-badge">Best Value</span>
    <p class="best-name">{best.name}</p>
    <p class="best-price">
      {(best.yearlyPrice / 12).toFixed()} CHF<span class="per-month"
        >/month</span
      >
    </p>
  </div>
{/if}

{#if subscriptions}
  <h3>Details</h3>
  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>Subscription</th>
          <th>Renewals/year <Helper text={renewalHelp} /></th>
          <th>Yearly Price</th>
          <th>Monthly Price</th>
        </tr>
      </thead>
      <tbody>
        {#each subscriptions as { name, yearlyPrice, expectedYearlyRenewals, hint }}
          <tr class:best-row={name === best?.name}>
            <td data-label="Subscription"
              >{name}{#if hint}
                &nbsp;<Helper text={hint} />{/if}</td
            >
            <td data-label="Renewals/year"
              >{expectedYearlyRenewals.toFixed(2)}</td
            >
            <td data-label="Yearly Price">{yearlyPrice.toFixed()} CHF</td>
            <td data-label="Monthly Price"
              >{(yearlyPrice / 12).toFixed()} CHF</td
            >
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}

<style>
  h3 {
    font-size: 1.1rem;
    color: var(--color-text-primary);
    margin: var(--space-xl) 0 var(--space-sm);
    font-weight: 600;
  }

  .summary {
    color: var(--color-text-secondary);
    font-size: 0.9rem;
    margin-bottom: var(--space-lg);
  }

  /* === Best Subscription Card === */

  .best-card {
    background: var(--color-success-bg);
    border: 1px solid var(--color-success-border);
    border-radius: var(--radius-md);
    padding: var(--space-lg);
    text-align: center;
  }

  .best-badge {
    display: inline-block;
    background: var(--color-success);
    color: #fff;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: var(--space-xs) var(--space-sm);
    border-radius: var(--radius-sm);
  }

  .best-name {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-success);
    margin: var(--space-sm) 0 var(--space-xs);
  }

  .best-price {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-text-primary);
    margin: 0;
  }

  .per-month {
    font-size: 0.85rem;
    font-weight: 400;
    color: var(--color-text-secondary);
  }

  /* === Table (Desktop) === */

  .table-wrapper {
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    border-radius: var(--radius-md);
    overflow: hidden;
    border: 1px solid var(--color-border);
  }

  th {
    background: var(--color-table-header-bg);
    color: var(--color-text-secondary);
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: var(--space-sm) var(--space-md);
    text-align: left;
    border-bottom: 1px solid var(--color-border);
  }

  td {
    padding: var(--space-sm) var(--space-md);
    border-bottom: 1px solid var(--color-border);
    color: var(--color-text-primary);
    font-size: 0.9rem;
    text-align: left;
  }

  tbody tr:nth-child(even) {
    background: var(--color-table-row-alt);
  }

  tbody tr:hover {
    background: var(--color-table-row-hover);
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  .best-row {
    background: var(--color-success-bg) !important;
  }

  .best-row td {
    color: var(--color-success);
    font-weight: 600;
  }

  /* === Table → Cards (Mobile) === */

  @media (max-width: 639px) {
    table,
    thead,
    tbody,
    tr,
    th,
    td {
      display: block;
    }

    table {
      border: none;
      border-radius: 0;
      overflow: visible;
    }

    thead {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
    }

    tr {
      background: var(--color-bg-secondary);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      padding: var(--space-md);
      margin-bottom: var(--space-md);
      box-shadow: var(--shadow-sm);
    }

    td {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-xs) 0;
      border-bottom: 1px solid var(--color-border);
      text-align: right;
    }

    td:last-child {
      border-bottom: none;
    }

    td::before {
      content: attr(data-label);
      font-weight: 600;
      font-size: 0.75rem;
      color: var(--color-text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.03em;
      flex-shrink: 0;
      margin-right: var(--space-md);
      text-align: left;
    }

    .best-row {
      border-color: var(--color-success-border);
      background: var(--color-success-bg) !important;
    }
  }
</style>
