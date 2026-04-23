import { redirect } from "next/navigation";
import { QUOTE_URL } from "@/lib/site-data";

export default function GetAQuotePage() {
  redirect(QUOTE_URL);
}
