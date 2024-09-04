import { env } from "node:process";
import Charts from "./charts";

export default function Page() {
  if (env.APPLICATION_NAME === "UPWITHCROWD") {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground text-center text-2xl font-bold">
          UPWITHCROWD!
        </p>
      </div>
    );
  }
  return <Charts />;
}
