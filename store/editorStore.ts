"use client";

import { create } from "zustand";

type EditorStore = {
  resumeText: string;
  setResumeText: (text: string) => void;
  jdText: string;
  setJDText: (text: string) => void;
};

export const useEditorStore = create<EditorStore>((set) => ({
  resumeText: "",
  setResumeText: (text) => set({ resumeText: text }),
  jdText: "",
  setJDText: (text) => set({ jdText: text }),
}));

