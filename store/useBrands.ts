import { create } from 'zustand'
import {Brand} from "./types"

type Brands={
    brands:Brand[],
    setBrands:(brands:Brand[])=>void,
}

export const useBrands=create<Brands>()((set) => ({
    brands: [], 
  setBrands: (brands) => set({ brands }),

}))