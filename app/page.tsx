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

fal.config({ proxyUrl: "/api/proxy" });

interface ModelResult {
  name: string;
  image: string;
  inferenceTime: number;
}

type CompareMode = "original" | "model";

export default function Lightning() {
  const [mode, setMode] = useState<CompareMode>("original");
  const [position, setPosition] = useState<number>(50);
  const [originalImage, setOriginalImage] = useState<string | null>(null);

  const [modelOne, setModelOne] = useState<ModelResult | null>(null);
  const [modelOneLoading, setModelOneLoading] = useState<boolean>(false);
  const [modelTwo, setModelTwo] = useState<ModelResult | null>(null);
  const [modelTwoLoading, setModelTwoLoading] = useState<boolean>(false);

  const upscaleWithModelOne = async (file: File) => {
    let inferenceTime;
    setModelOneLoading(true);

    const result: Record<string, any> = await fal.subscribe("fal-ai/ccsr", {
      input: {
        image_url: file,
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "COMPLETED") {
          inferenceTime = update.metrics.inference_time as number;
        }
      },
    });

    if (result) {
      setModelOne({
        name: "CCSR",
        image: result.image.url as string,
        inferenceTime,
      });
    }

    setModelOneLoading(false);
  };

  const upscaleWithModelTwo = async (file: File) => {
    let inferenceTime;

    setModelTwoLoading(true);

    const result: Record<string, any> = await fal.subscribe("fal-ai/supir", {
      input: {
        image_url: file,
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "COMPLETED") {
          inferenceTime = update.metrics.inference_time as number;
        }
      },
    });

    if (result) {
      setModelTwo({
        name: "SUPIR",
        image: result.image.url as string,
        inferenceTime,
      });
    }

    setModelTwoLoading(false);
  };

  const handleOnChange = async (file: File) => {
    const blobUrl = URL.createObjectURL(file);
    setOriginalImage(blobUrl);

    setModelOne(null);
    setModelTwo(null);

    upscaleWithModelOne(file);
    upscaleWithModelTwo(file);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.document.cookie = "fal-app=true; path=/; samesite=strict; secure;";
    }
  }, []);

  return (
    <main>
      <div className="flex flex-col justify-between h-[calc(100vh-56px)]">
        <div className="py-4 md:pb-10 px-0 space-y-4 lg:space-y-8 mx-auto w-full max-w-5xl">
          <div className="container px-3 md:px-0 flex flex-col mt-10">
            <div className="flex flex-row items-center justify-center space-x-3">
              <div className="w-80 flex flex-col justify-center items-center space-y-2">
                <label className="text-neutral-500 dark:text-neutral-400 ml-4 uppercase text-xs">
                  Image
                </label>
                <Input
                  type="file"
                  onChange={(e) => {
                    if (e.target?.files?.[0]) {
                      handleOnChange(e.target?.files?.[0]);
                    }
                  }}
                  className="font-light mx-auto rounded-full h-10 pr-10 truncate"
                  placeholder="Type something..."
                />
              </div>
              <div className="flex flex-col space-y-2 text-sm items-center justify-center">
                <label className="text-neutral-500 dark:text-neutral-400 uppercase text-xs">
                  Compare Mode
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
            </div>
          </div>
          {mode === "model" && (
            <ModelCompare
              originalImage={originalImage}
              position={position}
              setPosition={setPosition}
              modelOne={modelOne}
              modelTwo={modelTwo}
            />
          )}
          {mode === "original" && (
            <OriginalCompare
              originalImage={originalImage}
              position={position}
              setPosition={setPosition}
              modelOne={modelOne}
              modelTwo={modelTwo}
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
