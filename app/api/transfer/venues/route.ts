import { fail, ok } from "@/lib/http"
import { launchApi } from "@/lib/settings"

export const dynamic = "force-dynamic"

/** GET /api/transfer/venues → the API's GET /api/transfer/venues (which exchange venues are open right now). */
export async function GET() {
  try {
    return ok(await launchApi().transferVenues())
  } catch (e) {
    return fail(e)
  }
}
