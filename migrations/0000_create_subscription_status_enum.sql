CREATE TYPE subscription_status AS ENUM (
  'unpaid',
  'past_due',
  'incomplete_expired',
  'incomplete',
  'canceled',
  'active',
  'trialing'
);
