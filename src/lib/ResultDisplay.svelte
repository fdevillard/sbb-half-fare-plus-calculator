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
    <h4>
      {best.name} (monthly price: {(best.yearlyPrice / 12).toFixed(2)} CHF)
    </h4>
  </div>
{/if}

{#if subscriptions}
  <h3>Details:</h3>
  <table>
    <thead>
      <tr>
        <th>Subscription</th>
        <th>Renewals</th>
        <th>Yearly Price</th>
        <th>Monthly Price</th>
      </tr>
    </thead>
    <tbody>
      {#each subscriptions as { name, yearlyPrice, expectedYearlyRenewals }}
        <tr>
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
    border: 2px solid white;
  }
  th,
  td {
    border: 1px solid white;
    padding: 8px;
    text-align: center;
  }
</style>
