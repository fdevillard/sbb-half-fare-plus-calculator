<script lang="ts">
  import { subscriptionsFromYearlyExpenses } from "./compute";

  export let yearlyPrice: number;

  $: subscriptions = subscriptionsFromYearlyExpenses(yearlyPrice);
  $: best = subscriptions.reduce((lowest, item) =>
    item.yearlyPrice < lowest.yearlyPrice ? item : lowest,
  );
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
  <table>
    <thead>
      <tr>
        <th>Subscription</th>
        <th>Renewals for year</th>
        <th>Yearly Price</th>
        <th>Monthly Price</th>
      </tr>
    </thead>
    <tbody>
      {#each subscriptions as { name, yearlyPrice, expectedYearlyRenewals }}
        <tr class:best-row={name === best?.name}>
          <td>{name}</td>
          <td>{expectedYearlyRenewals.toFixed(2)}</td>
          <td>{yearlyPrice.toFixed()} CHF</td>
          <td>{(yearlyPrice / 12).toFixed()} CHF</td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}

<style>
  table {
    margin-left: auto;
    margin-right: auto;
    border-collapse: collapse;
    border: 2px solid #818181;
  }
  th,
  td {
    border: 1px solid #818181;
    padding: 8px;
    text-align: center;
  }

  .the-best {
    font-weight: bold;
    font-size: larger;
    color: #40c428;
  }

  .best-row {
    color: #40c428;
    font-weight: bold;
  }

  .best-row td:first-child::before {
    content: "🏆 ";
  }

  .best-row td:first-child::after {
    content: " 🌟";
  }
</style>
