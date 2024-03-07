"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export interface Model {
  shortname: string;
  name: string;
  model: string;
  link: string;
  meta?: Record<string, any>;
}

export const UPSCALE_MODELS: Model[] = [
  {
    shortname: "CCSR",
    name: "CCSR Upscaler",
    model: "fal-ai/ccsr",
    link: "https://fal.ai/models/ccsr",
  },
  {
    shortname: "ESRGANx4P",
    name: "ESRGAN x4 Plus",
    model: "fal-ai/esrgan",
    link: "https://fal.ai/models/esrgan",
    meta: {
      model: "RealESRGAN_x4plus",
    },
  },
  {
    shortname: "ESRGANx2P",
    name: "ESRGAN x2 Plus",
    model: "fal-ai/esrgan",
    link: "https://fal.ai/models/esrgan",
    meta: {
      model: "RealESRGAN_x2plus",
    },
  },
  {
    shortname: "ESRGANx4PA6B",
    name: "ESRGAN x4 Plus Anime 6B",
    model: "fal-ai/esrgan",
    link: "https://fal.ai/models/esrgan",
    meta: {
      model: "RealESRGAN_x4plus_anime_6B",
    },
  },
  {
    shortname: "ESRGANx4v3",
    name: "ESRGAN x4 v3",
    model: "fal-ai/esrgan",
    link: "https://fal.ai/models/esrgan",
    meta: {
      model: "RealESRGAN_x4_v3",
    },
  },
  {
    shortname: "ESRGANx4WdnV3",
    name: "ESRGAN x4 Wdn v3",
    model: "fal-ai/esrgan",
    link: "https://fal.ai/models/esrgan",
    meta: {
      model: "RealESRGAN_x4_wdn_v3",
    },
  },
  {
    shortname: "ESRGANx4Av3",
    name: "ESRGAN x4 Anime v3",
    model: "fal-ai/esrgan",
    link: "https://fal.ai/models/esrgan",
    meta: {
      model: "RealESRGAN_x4_anime_v3",
    },
  },
  {
    shortname: "SUPIR",
    name: "SUPIR Upscaler",
    model: "fal-ai/supir",
    link: "https://fal.ai/models/supir",
  },
  {
    shortname: "CREATIVE",
    name: "Creative Upscaler",
    model: "fal-ai/creative-upscaler",
    link: "https://fal.ai/models/creative-upscaler",
  },
];

export function ModelDropdown({
  disableList,
  onSelect,
  value,
}: {
  value: Model | null;
  onSelect: (model: Model) => void;
  disableList: Array<string | undefined>;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="rounded-lg">
          <span className="mr-1">{value ? value.name : "Select Model"}</span>
          <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {UPSCALE_MODELS.map((model) => (
          <DropdownMenuItem
            key={model.name}
            disabled={disableList.includes(model.shortname)}
            onClick={() => onSelect(model)}
          >
            {model.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
