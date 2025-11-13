import { useRouter } from "next/router";
export function ClickHistory(e: any) {
  const rounter = useRouter();
  e.preventDefault();
  rounter.push("/history");
}
