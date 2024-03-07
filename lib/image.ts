export async function resizeAndNoiseImage(
  file: File,
  max: number = 512,
  noiseLevel: number = 0.3
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Failed to get 2d context");
  }

  const image = await loadImage(file);

  const targetSize = Math.min(max, Math.max(image.width, image.height));

  const targetWidth =
    image.width > image.height
      ? targetSize
      : Math.round((image.width / image.height) * targetSize);
  const targetHeight =
    image.height > image.width
      ? targetSize
      : Math.round((image.height / image.width) * targetSize);

  canvas.width = targetWidth;
  canvas.height = targetHeight;

  ctx.drawImage(
    image,
    0,
    0,
    image.width,
    image.height,
    0,
    0,
    targetWidth,
    targetHeight
  );

  if (noiseLevel > 0) {
    addNoise(ctx, targetWidth, targetHeight, noiseLevel);
  }

  return await canvasToImage(canvas);
}

function addNoise(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  noiseLevel: number
) {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const random = Math.random();
    const noise = Math.round(random * noiseLevel * 255);

    data[i] = Math.min(data[i] + noise, 255); // Red
    data[i + 1] = Math.min(data[i + 1] + noise, 255); // Green
    data[i + 2] = Math.min(data[i + 2] + noise, 255); // Blue
  }

  ctx.putImageData(imageData, 0, 0);
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

async function canvasToImage(canvas: HTMLCanvasElement): Promise<Blob> {
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
      0.7
    );
  });
}
