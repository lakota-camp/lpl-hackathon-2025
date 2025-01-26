import { useCostData } from "../../hooks/useCostData";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function InvoiceData() {
  const { data: apiData, isLoading, isError } = useCostData();
  console.log("Cost Data:", apiData);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  if (!apiData || apiData.length === 0) {
    return <div>No data available</div>;
  }

  // Extract keys and reorder `cost` and `interaction`
  const tableHeaders = Object.keys(apiData[0]).sort((a, b) => {
    if (a === "cost") return 1; // Move `cost` to appear after `interaction`
    if (b === "cost") return -1;
    return 0;
  });

  return (
    <div>
      <Collapsible className="mt-4">
        <CollapsibleTrigger
          className={cn(
            buttonVariants({ variant: "secondary", size: "default" }),
            "w-full", // Additional custom styles if needed
          )}
        >
          Table
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                {tableHeaders.map((key, index) => (
                  <TableHead
                    key={index}
                    className={
                      ["cost", "interaction"].includes(key) ? "text-right" : ""
                    }
                  >
                    <span className="font-bold">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </span>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiData.map((data, index) => (
                <TableRow key={index}>
                  {tableHeaders.map((key, colIndex) => (
                    <TableCell
                      key={colIndex}
                      className={
                        ["cost", "interaction"].includes(key)
                          ? "text-right"
                          : ""
                      }
                    >
                      {key === "date"
                        ? new Date(data[key]).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : key === "cost"
                          ? `$${data[key].toFixed(2)}`
                          : typeof data[key] === "number"
                            ? data[key].toFixed(2)
                            : data[key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
