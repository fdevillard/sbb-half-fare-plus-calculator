export type Subscription = {
  name: string;
  yearlyPrice: number;
  expectedYearlyRenewals: number;
  hint?: string;
};

type HalfFarePlus = {
  name: string;
  price: number;
  credit: number;
};

const halfFarePlus: HalfFarePlus[] = [
  {
    name: "Half Fare Plus 1000",
    price: 800,
    credit: 1000,
  },
  {
    name: "Half Fare Plus 2000",
    price: 1500,
    credit: 2000,
  },
  {
    name: "Half Fare Plus 3000",
    price: 2100,
    credit: 3000,
  },
];

const sbbGa: Subscription[] = [
  {
    name: "SBB GA",
    yearlyPrice: 3995,
    expectedYearlyRenewals: 1,
  },
  {
    name: "SBB GA Duo",
    yearlyPrice: (3995 + 2860) / 2,
    expectedYearlyRenewals: 1,
    hint:
      "If you're living with your partner, you're eligible for the GA Duo. Here we consider the price of a normal " +
      "GA and a GA Duo divided by two. It isn't sure though that it'd be worth for your partner too.",
  },
];

export function subscriptionsFromYearlyExpenses(
  expectedYearlyExpenses: number,
): Subscription[] {
  const hfplus = halfFarePlus.map((halfFarePlus) => {
    const expectedYearlyRenewals = Math.max(
      1,
      expectedYearlyExpenses / halfFarePlus.credit,
    );
    return {
      name: halfFarePlus.name,
      yearlyPrice: halfFarePlus.price * expectedYearlyRenewals,
      expectedYearlyRenewals: expectedYearlyRenewals,
    };
  });

  return [...hfplus, ...sbbGa];
}
