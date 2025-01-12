'use client'

import { useQuery } from "@tanstack/react-query";
import { API } from "../lib/api";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon"

const api = new API(BASE_URL, "/ditto");

export function useDemo() {
    return useQuery(
        {
            queryKey: ["demo"],
            queryFn: async () => api.GET(),
            staleTime: 1000 * 60 * 5,
            retry: 3,
        }
    )
}