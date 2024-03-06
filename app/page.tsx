"use client";

/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import * as fal from "@fal-ai/serverless-client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { ModelIcon } from "@/components/icons/model-icon";
import { cn } from "@/lib/utils";
import ModelCompare from "@/components/model-compare";
import OriginalCompare from "@/components/original-compare";
import {
  type Model,
  ModelDropdown,
  UPSCALE_MODELS,
} from "@/components/model-dropdown";
import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";
import { resizeImage } from "@/lib/image";

fal.config({ proxyUrl: "/api/proxy" });

interface ModelResult {
  model: string;
  image: string;
  inferenceTime: number;
}

type CompareMode = "original" | "model";

export default function UpscalerBattleground() {
  const [mode, setMode] = useState<CompareMode>("original");
  const [position, setPosition] = useState<number>(50);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [firstModelLoading, setFirstModelLoading] = useState<boolean>(false);
  const [secondModelLoading, setSecondModelLoading] = useState<boolean>(false);
  const [firstModel, setFirstModel] = useState<Model | null>(UPSCALE_MODELS[0]);
  const [secondModel, setSecondModel] = useState<Model | null>(
    UPSCALE_MODELS[1]
  );
  const [firstModelOutput, setFirstModelOutput] = useState<ModelResult | null>(
    null
  );
  const [secondModelOutput, setSecondModelOutput] =
    useState<ModelResult | null>(null);

  const upscaleWithFirstModel = async (file: File) => {
    if (!firstModel) return;

    setFirstModelLoading(true);

    let inferenceTime;

    const resizedImage = await resizeImage(file);
    const result: Record<string, any> = await fal.subscribe(firstModel.model, {
      input: {
        image_url: resizedImage,
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "COMPLETED") {
          inferenceTime = update.metrics.inference_time as number;
        }
      },
    });

    if (result) {
      setFirstModelOutput({
        model: firstModel.model,
        image: result.image.url as string,
        inferenceTime,
      });
    }

    setFirstModelLoading(false);
  };

  const upscaleWithSecondModel = async (file: File) => {
    if (!secondModel) return;

    setSecondModelLoading(true);

    let inferenceTime;

    const resizedImage = await resizeImage(file);
    const result: Record<string, any> = await fal.subscribe(secondModel.model, {
      input: {
        image_url: resizedImage,
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "COMPLETED") {
          inferenceTime = update.metrics.inference_time as number;
        }
      },
    });

    if (result) {
      setSecondModelOutput({
        model: secondModel.model,
        image: result.image.url as string,
        inferenceTime,
      });
    }

    setSecondModelLoading(false);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target?.files?.[0];

    setFirstModelOutput(null);
    setSecondModelOutput(null);

    setImageFile(image || null);
    setPosition(50);

    if (image) {
      const blobUrl = URL.createObjectURL(image);
      setOriginalImage(blobUrl);
      handleCompare(image);
    }
  };

  const handleCompare = async (image) => {
    if (!image) return;

    upscaleWithFirstModel(image);
    upscaleWithSecondModel(image);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.document.cookie = "fal-app=true; path=/; samesite=strict; secure;";
    }
  }, []);

  return (
    <main>
      <div className="flex flex-col justify-between h-[calc(100vh-56px)]">
        <div className="py-4 px-0  mx-auto w-full max-w-5xl">
          <div className="container px-3 md:px-0 flex w-full items-center justify-between mt-4 md:mt-10 pb-3">
            <div className="flex flex-col px-3 w-full md:flex-row md:items-end justify-between space-x-3">
              <div className="flex flex-col md:flex-row space-x-4 space-y-4 md:space-y-0 mb-4 md:mb-0">
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 text-sm items-center justify-center">
                  <label className="text-neutral-500 md:mr-1 dark:text-neutral-400 uppercase text-xs">
                    Mode:
                  </label>
                  <div className="w-fit select-none text-neutral-600 dark:text-neutral-300 bg-neutral-200 dark:bg-neutral-900 p-1 rounded-full flex items-center justify-between space-x-2">
                    <span
                      onClick={() => setMode("original")}
                      className={cn(
                        mode === "original" &&
                          "bg-neutral-900 text-white dark:bg-neutral-200 dark:text-black",
                        "w-1/2 cursor-pointer text-sm  rounded-full h-8 px-3 flex items-center"
                      )}
                    >
                      Original
                    </span>
                    <span
                      onClick={() => setMode("model")}
                      className={cn(
                        mode === "model" &&
                          "bg-neutral-900 text-white dark:bg-neutral-200 dark:text-black",
                        "w-1/2 cursor-pointer text-sm  rounded-full h-8 px-3 flex items-center"
                      )}
                    >
                      Model
                    </span>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 text-sm items-center justify-center">
                  <label className="text-neutral-500 md:mr-1 dark:text-neutral-400 uppercase text-xs">
                    Image:
                  </label>
                  <Input
                    type="file"
                    onChange={handleImageSelect}
                    className={cn(
                      "font-light mx-auto rounded-full h-10 pr-10 truncate",
                      !imageFile && "border-indigo-700/70"
                    )}
                    accept="image/*"
                    placeholder="Choose file..."
                  />
                </div>
              </div>
              <Button
                size="lg"
                className="mx-auto md:mx-0"
                onClick={() => handleCompare(imageFile)}
                disabled={!imageFile || firstModelLoading || secondModelLoading}
              >
                Compare
                {(firstModelLoading || secondModelLoading) && (
                  <LoaderIcon className="animate-spin w-4 h-4 ml-2 text-neutral-200 dark:text-neutral-900" />
                )}
              </Button>
            </div>
          </div>
          <div className="flex w-full items-end justify-between border-y py-2 mb-3">
            <div className="w-1/2 flex justify-start">
              <ModelDropdown
                disableList={[secondModel?.model]}
                onSelect={(model) => setFirstModel(model)}
                value={firstModel}
              />
            </div>

            <div className="w-1/2 flex justify-end">
              <ModelDropdown
                disableList={[firstModel?.model]}
                onSelect={(model) => setSecondModel(model)}
                value={secondModel}
              />
            </div>
          </div>
          {mode === "model" && (
            <ModelCompare
              originalImage={originalImage}
              position={position}
              setPosition={setPosition}
              firstModel={firstModel}
              firstModelOutput={firstModelOutput}
              firstModelLoading={firstModelLoading}
              secondModel={secondModel}
              secondModelOutput={secondModelOutput}
              secondModelLoading={secondModelLoading}
            />
          )}
          {mode === "original" && (
            <OriginalCompare
              originalImage={originalImage}
              position={position}
              setPosition={setPosition}
              firstModel={firstModel}
              firstModelOutput={firstModelOutput}
              firstModelLoading={firstModelLoading}
              secondModel={secondModel}
              secondModelOutput={secondModelOutput}
              secondModelLoading={secondModelLoading}
            />
          )}
        </div>
        <div className="container flex flex-col items-center justify-center my-4">
          <p className="text-sm text-base-content/70 py-4 text-center text-neutral-400">
            This playground is hosted on{" "}
            <strong>
              <a href="https://fal.ai" className="underline" target="_blank">
                fal.ai
              </a>
            </strong>{" "}
            and is for demonstration purposes only.
          </p>
          <div className="flex flex-row items-center space-x-2">
            <span className="text-xs font-mono">powered by</span>
            <Link href="https://fal.ai" target="_blank">
              <ModelIcon />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
