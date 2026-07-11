import { redirect } from "next/navigation";
import { getAffiliateHomeLink } from "@/lib/affiliate";

/** Legacy booking URLs redirect to our affiliate partner. */
export default async function BookingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await params;
  redirect(getAffiliateHomeLink());
}
