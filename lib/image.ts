export async function resizeImage(
  file: File,
  max: number = 1024,
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Failed to get 2d context");
  }

  const image = await loadImage(file);

  const targetSize = Math.min(max, Math.max(image.width, image.height));
  console.log("targetSize", targetSize);
  const targetWidth =
    image.width > image.height
      ? targetSize
      : Math.round((image.width / image.height) * targetSize);
  const targetHeight =
    image.height > image.width
      ? targetSize
      : Math.round((image.height / image.width) * targetSize);

  ctx.drawImage(image, 0, 0, targetWidth, targetHeight);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Failed to convert canvas to blob"));
          return;
        }
        resolve(blob);
      },
      "image/jpeg",
      0.7,
    );
  });
}

async function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = reader.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
