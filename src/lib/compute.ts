export type Subscription = {
  name: string;
  yearlyPrice: number;
  expectedYearlyRenewals: number;
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
    name: "SBB GA Duo (half of two GAs with Duo)",
    yearlyPrice: (3995 + 2860) / 2,
    expectedYearlyRenewals: 1,
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
