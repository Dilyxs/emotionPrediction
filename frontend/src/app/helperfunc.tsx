export async function ClickAnalyzeEmotion(file: File): Promise<any> {
  let data = new FormData();
  data.append("image", file);
  try {
    const response = await fetch("http://localhost:8000/getprediction", {
      method: "POST",
      body: data,
    });
    return await response.json();
  } catch (error) {
    console.log("error, cannot accept this");
    return new Error("backend did not accept");
  }
}
