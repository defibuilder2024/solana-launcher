import { gather } from "@/lib/core/funding"
import { body, fail, ok, strings } from "@/lib/http"
import { launchApi } from "@/lib/settings"
import { walletStore } from "@/lib/wallets"

/** POST /api/wallets/gather { publicKeys } → sweep every lamport but the fee from each wallet back to the funding wallet. lib/core/funding.ts. */
export async function POST(req: Request) {
  const b = await body<{ publicKeys: string[] }>(req)
  try {
    return ok(await gather({ api: launchApi(), wallets: walletStore }, strings(b.publicKeys)))
  } catch (e) {
    return fail(e)
  }
}
