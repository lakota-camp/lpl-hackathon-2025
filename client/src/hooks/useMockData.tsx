import { useQuery } from "@tanstack/react-query";
import MockUSData from "../api/fetchMockData";

const mockUsData = new MockUSData();

export function useStateData() {
  return useQuery({
    queryKey: ["StateData"],
    queryFn: mockUsData.fetchStateData,
  });
}

export function useUSData() {
  return useQuery({
    queryKey: ["UsData"],
    queryFn: mockUsData.fetchUSData,
  });
}
