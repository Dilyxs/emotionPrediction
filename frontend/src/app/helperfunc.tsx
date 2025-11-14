import { useRouter } from "next/router";
export function ClickHistory(e: any) {
  const rounter = useRouter();
  e.preventDefault();
  rounter.push("/history");
}

export async function ClickAnalyzeEmotion(file: File): Promise<any> {
  let data = new FormData();
  data.append("image", file);
  try {
    const response = await fetch("http://0.0.0.0:8000", {
      method: "POST",
      body: data,
    });
    return await response.json();
  } catch (error) {
    console.log("error, cannot accept this");
    return new Error("backend did not accept");
  }
}
