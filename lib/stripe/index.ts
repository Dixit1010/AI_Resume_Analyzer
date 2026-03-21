export type StripeCustomer = {
  id: string;
};

export async function ensureStripeCustomer(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _user: any,
): Promise<StripeCustomer | null> {
  // TODO: implement Stripe integration.
  return null;
}

