import { useTranslations } from "next-intl";
import { type PropsWithChildren, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DescribeReasonDialog } from "./DescribeReasonDialog";

export const HavingIssueDialog = ({ children }: PropsWithChildren) => {
  const t = useTranslations("issueDialog");
  const [open, setOpenChange] = useState(false);
  const issueKeys = [
    "badWeather",
    "trafficJams",
    "vehicleProblems",
    "wrongAddress",
    "accidents",
    "customerUnreachable",
    "other",
  ];
  return (
    <Dialog open={open} onOpenChange={setOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg rounded-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("havingIssueTitle")}</DialogTitle>
          <DialogDescription>{t("havingIssueDesc")}</DialogDescription>
        </DialogHeader>
        <ul className="divide-y divide-muted bg-background rounded-lg">
          {issueKeys.map((key, idx) => {
            const title = t(`issues.${key}.title`);
            const desc = t(`issues.${key}.desc`);
            return (
              <li key={key} className="">
                <DescribeReasonDialog selectedIssue={title}>
                  <button
                    type="button"
                    className="w-full text-left py-2 px-2 hover:bg-muted/40 text-base focus:outline-none focus:ring-2 focus:ring-primary rounded"
                    aria-label={title}
                  >
                    <span className="font-semibold mr-2">{idx + 1}.</span>
                    <span className="font-semibold">{title}</span>
                    {desc && (
                      <span className="font-normal mt-1"> - {desc}</span>
                    )}
                  </button>
                </DescribeReasonDialog>
              </li>
            );
          })}
        </ul>
      </DialogContent>
    </Dialog>
  );
};
