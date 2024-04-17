import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Spinner from "@repo/ayasofyazilim-ui/molecules/spinner";
import { getAccountServiceClient } from "src/lib";

export default async function Page() {
  return (
    <Spinner
      className="stroke-purple-900"
      variant="transparent"
      fullScreen={false}
    />
  );
}
