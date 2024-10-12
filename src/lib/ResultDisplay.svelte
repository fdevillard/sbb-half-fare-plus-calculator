<script lang="ts">
    export let creditUsed: number;
    export let remainingDays: number;

    $: passedDays = 365 - remainingDays
    $: pricePerDay = creditUsed / passedDays
    $: yearlyPrice = pricePerDay * 365
    $: monthlyPrice = yearlyPrice / 12
</script>

<h3>Results</h3>
<p>Your monthly average expenses: {Math.round(monthlyPrice)} CHF</p>