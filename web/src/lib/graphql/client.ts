/**
 * Minimal GraphQL client for WPGraphQL.
 *
 * UNUSED during the fixtures-first phase — this is the seam that `content.ts`
 * will switch to once WordPress is live. Kept tiny on purpose; swap for a typed
 * client + GraphQL Codegen when wiring real data. See docs/02-architecture.md.
 */
const endpoint = import.meta.env.WPGRAPHQL_URL;

export async function gqlQuery<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  if (!endpoint) {
    throw new Error('WPGRAPHQL_URL is not set — see web/.env.example.');
  }
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) {
    throw new Error(`GraphQL request failed: HTTP ${res.status}`);
  }
  const json = (await res.json()) as { data?: T; errors?: Array<{ message: string }> };
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join('; '));
  }
  return json.data as T;
}
