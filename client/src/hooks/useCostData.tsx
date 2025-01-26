import { useQuery } from "@tanstack/react-query";
import UsageData from "../api/fetchCostData";

const mockUsData = new UsageData();

export function useCostData() {
  return useQuery({
    queryKey: ["CostData"],
    queryFn: mockUsData.fetchCostData,
  });
}
