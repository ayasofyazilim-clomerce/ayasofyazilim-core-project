import Spinner from "@repo/ayasofyazilim-ui/molecules/spinner";

export default async function Page() {
  return (
    <Spinner
      className="stroke-purple-900"
      variant="transparent"
      fullScreen={false}
    />
  );
}
