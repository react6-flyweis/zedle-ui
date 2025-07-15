import { Bath, ChevronDown, Flame, Utensils, Waves, Wifi } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const facilitiesKeys = [
  { icon: Wifi, labelKey: "wifi" },
  { icon: Flame, labelKey: "heater" },
  { icon: Utensils, labelKey: "dinner" },
  { icon: Bath, labelKey: "tub" },
  { icon: Waves, labelKey: "pool" },
];

function DescriptionSection() {
  const t = useTranslations("");
  return (
    <div className="">
      <div className="mb-2">
        <p className="text-muted-foreground text-semibold font-semibold">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="px-0 text-primary font-medium flex items-center gap-1"
      >
        {t("actions.readMore")} <ChevronDown className="w-4 h-4" />
      </Button>
    </div>
  );
}

export function FacilitiesSection() {
  const t = useTranslations("facilities");
  return (
    <section className="p-8 py-12 container mx-auto space-y-8">
      <DescriptionSection />
      <div>
        <h2 className="text-2xl font-semibold mb-4">{t("title")}</h2>
        <div className="flex flex-wrap gap-4">
          {facilitiesKeys.map(({ icon: Icon, labelKey }) => (
            <Card
              key={labelKey}
              className="w-36 h-36 flex flex-col items-center justify-center border-2 rounded border-muted-foreground bg-transparent hover:bg-primary hover:border-primary hover:text-white group transition"
            >
              <CardContent className="flex flex-col items-center justify-center p-4">
                <Icon
                  className="w-12 h-12 text-primary mb-3 group-hover:text-white transition-colors"
                  strokeWidth={2.2}
                />
                <span className="text-base font-medium text-muted-foreground group-hover:text-white transition-colors">
                  {t(`facilities.${labelKey}`)}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
