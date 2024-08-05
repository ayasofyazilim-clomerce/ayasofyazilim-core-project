import { env } from "node:process";
import Charts from "./charts";

export default function Page() {
  if (env.APPLICATION_NAME === "UPWITHCROWD") {
    return (
      <div className="h-full flex justify-center items-center">
        <p className="font-bold text-2xl text-muted-foreground text-center">
          UPWITHCROWD!
        </p>
      </div>
    );
  }
  return <Charts />;
}
