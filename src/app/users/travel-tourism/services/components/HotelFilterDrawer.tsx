"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { type PropsWithChildren, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const propertyOptions = [
  { value: "hotel", label: "property.hotel" },
  { value: "apartment", label: "property.apartment" },
  { value: "hostel", label: "property.hostel" },
  { value: "resort", label: "property.resort" },
  { value: "villa", label: "property.villa" },
  { value: "lodge", label: "property.lodge" },
];

const customerRatingOptions = [
  { value: "50", label: "customerRatings.50orMore" },
  { value: "40", label: "customerRatings.40orMore" },
  { value: "30", label: "customerRatings.30orMore" },
  { value: "20", label: "customerRatings.20orMore" },
  { value: "10", label: "customerRatings.10orMore" },
];

const dealsOptions = [
  { value: "freeWiFi", label: "deals.freeWiFi" },
  { value: "parking", label: "deals.parking" },
  { value: "breakfastIncluded", label: "deals.breakfastIncluded" },
  { value: "swimmingPool", label: "deals.swimmingPool" },
  { value: "airConditioning", label: "deals.airConditioning" },
  { value: "fitnessCenter", label: "deals.fitnessCenter" },
  { value: "kitchenKitchenette", label: "deals.kitchenKitchenette" },
  { value: "petFriendly", label: "deals.petFriendly" },
  { value: "restaurantBar", label: "deals.restaurantBar" },
];

const discountOptions = [
  { value: "freeCancellation", label: "discounts.freeCancellation" },
  { value: "payAtProperty", label: "discounts.payAtProperty" },
  { value: "specialDiscounts", label: "discounts.specialDiscounts" },
];

const starRatingOptions = [
  { value: "3", label: "starRating.3stars" },
  { value: "4", label: "starRating.4stars" },
  { value: "5", label: "starRating.5starsOnly" },
];

const sortOptions = [
  { value: "relevance", label: "sortBy.relevance" },
  { value: "popularity", label: "sortBy.popularity" },
  { value: "priceLowToHigh", label: "sortBy.priceLowToHigh" },
  { value: "priceHighToLow", label: "sortBy.priceHighToLow" },
  { value: "discount", label: "sortBy.discount" },
];

const filterSchema = z.object({
  property: z.array(z.string()).optional(),
  customerRating: z.array(z.string()).optional(),
  deals: z.array(z.string()).optional(),
  discounts: z.array(z.string()).optional(),
  starRating: z.array(z.string()).optional(),
  sortBy: z.string().optional(),
});

type FilterValues = z.infer<typeof filterSchema>;

export default function HotelFilterDrawer({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("hotelsFilter");
  const form = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: { property: [] },
  });

  const onApply = (values: FilterValues) => {
    console.log("Applied filters:", values);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent
        className="max-w-xs p-0 flex flex-col gap-0"
        showCloseButton={false}
      >
        <div className="flex items-center justify-between border-b px-4 py-3 bg-muted">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              aria-label={t("close")}
              className="rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
            <SheetTitle className="text-lg font-medium">
              {t("title")}
            </SheetTitle>
          </div>
          <Button
            variant="link"
            size="sm"
            className="text-muted-foreground px-0"
            type="button"
          >
            {t("clear")}
          </Button>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onApply)}
            className="flex flex-col flex-1 min-h-0"
          >
            <div className="flex flex-1 min-h-0">
              <Tabs
                defaultValue="property"
                orientation="vertical"
                className="flex w-full h-full"
              >
                <div className="flex w-full h-full">
                  <div className="bg-accent w-36">
                    <TabsList className="flex flex-col items-stretch justify-start p-0 w-full shadow-none">
                      <TabsTrigger
                        value="property"
                        className="justify-start rounded-none text-left shadow-none! p-3 py-5"
                      >
                        {t("tabs.property")}
                      </TabsTrigger>
                      <TabsTrigger
                        value="ratings"
                        className="justify-start rounded-none text-left shadow-none! p-3 py-5"
                      >
                        {t("tabs.customerRatings")}
                      </TabsTrigger>
                      <TabsTrigger
                        value="deals"
                        className="justify-start rounded-none text-left shadow-none! p-3 py-5"
                      >
                        {t("tabs.deals")}
                      </TabsTrigger>
                      <TabsTrigger
                        value="discounts"
                        className="justify-start rounded-none text-left shadow-none! p-3 py-5"
                      >
                        {t("tabs.discounts")}
                      </TabsTrigger>
                      <TabsTrigger
                        value="amenities"
                        className="justify-start rounded-none text-left shadow-none! p-3 py-5"
                      >
                        {t("tabs.amenities")}
                      </TabsTrigger>
                      <TabsTrigger
                        value="sort"
                        className="justify-start rounded-none text-left shadow-none! p-3 py-5"
                      >
                        {t("tabs.sortBy")}
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  <div className="relative flex-1 flex flex-col overflow-y-auto h-full">
                    <div className="flex-1 p-2">
                      <TabsContent value="property">
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="property"
                            render={({ field }) => (
                              <FormItem>
                                {propertyOptions.map((option) => (
                                  <FormControl key={option.value}>
                                    <div className="flex items-center space-x-3 py-1">
                                      <Checkbox
                                        checked={field.value?.includes(
                                          option.value,
                                        )}
                                        onCheckedChange={(checked) => {
                                          if (checked) {
                                            field.onChange([
                                              ...(field.value || []),
                                              option.value,
                                            ]);
                                          } else {
                                            field.onChange(
                                              (field.value || []).filter(
                                                (v) => v !== option.value,
                                              ),
                                            );
                                          }
                                        }}
                                        id={`property-${option.value}`}
                                      />
                                      <FormLabel
                                        htmlFor={`property-${option.value}`}
                                        className="font-normal cursor-pointer"
                                      >
                                        {t(option.label)}
                                      </FormLabel>
                                    </div>
                                  </FormControl>
                                ))}
                              </FormItem>
                            )}
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="ratings">
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="customerRating"
                            render={({ field }) => (
                              <FormItem>
                                {customerRatingOptions.map((option) => (
                                  <FormControl key={option.value}>
                                    <div className="flex items-center space-x-3 py-1">
                                      <Checkbox
                                        checked={field.value?.includes(
                                          option.value,
                                        )}
                                        onCheckedChange={(checked) => {
                                          if (checked) {
                                            field.onChange([
                                              ...(field.value || []),
                                              option.value,
                                            ]);
                                          } else {
                                            field.onChange(
                                              (field.value || []).filter(
                                                (v) => v !== option.value,
                                              ),
                                            );
                                          }
                                        }}
                                        id={`rating-${option.value}`}
                                      />
                                      <FormLabel
                                        htmlFor={`rating-${option.value}`}
                                        className="font-normal cursor-pointer"
                                      >
                                        {t(option.label)}
                                      </FormLabel>
                                    </div>
                                  </FormControl>
                                ))}
                              </FormItem>
                            )}
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="deals">
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="deals"
                            render={({ field }) => (
                              <FormItem>
                                {dealsOptions.map((option) => (
                                  <FormControl key={option.value}>
                                    <div className="flex items-center space-x-3 py-1">
                                      <Checkbox
                                        checked={field.value?.includes(
                                          option.value,
                                        )}
                                        onCheckedChange={(checked) => {
                                          if (checked) {
                                            field.onChange([
                                              ...(field.value || []),
                                              option.value,
                                            ]);
                                          } else {
                                            field.onChange(
                                              (field.value || []).filter(
                                                (v) => v !== option.value,
                                              ),
                                            );
                                          }
                                        }}
                                        id={`deals-${option.value}`}
                                      />
                                      <FormLabel
                                        htmlFor={`deals-${option.value}`}
                                        className="font-normal cursor-pointer"
                                      >
                                        {t(option.label)}
                                      </FormLabel>
                                    </div>
                                  </FormControl>
                                ))}
                              </FormItem>
                            )}
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="discounts">
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="discounts"
                            render={({ field }) => (
                              <FormItem>
                                {discountOptions.map((option) => (
                                  <FormControl key={option.value}>
                                    <div className="flex items-center space-x-3 py-1">
                                      <Checkbox
                                        checked={field.value?.includes(
                                          option.value,
                                        )}
                                        onCheckedChange={(checked) => {
                                          if (checked) {
                                            field.onChange([
                                              ...(field.value || []),
                                              option.value,
                                            ]);
                                          } else {
                                            field.onChange(
                                              (field.value || []).filter(
                                                (v) => v !== option.value,
                                              ),
                                            );
                                          }
                                        }}
                                        id={`discounts-${option.value}`}
                                      />
                                      <FormLabel
                                        htmlFor={`discounts-${option.value}`}
                                        className="font-normal cursor-pointer"
                                      >
                                        {t(option.label)}
                                      </FormLabel>
                                    </div>
                                  </FormControl>
                                ))}
                              </FormItem>
                            )}
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="amenities">
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="starRating"
                            render={({ field }) => (
                              <FormItem>
                                {starRatingOptions.map((option) => (
                                  <FormControl key={option.value}>
                                    <div className="flex items-center space-x-3 py-1">
                                      <Checkbox
                                        checked={field.value?.includes(
                                          option.value,
                                        )}
                                        onCheckedChange={(checked) => {
                                          if (checked) {
                                            field.onChange([
                                              ...(field.value || []),
                                              option.value,
                                            ]);
                                          } else {
                                            field.onChange(
                                              (field.value || []).filter(
                                                (v) => v !== option.value,
                                              ),
                                            );
                                          }
                                        }}
                                        id={`star-${option.value}`}
                                      />
                                      <FormLabel
                                        htmlFor={`star-${option.value}`}
                                        className="font-normal cursor-pointer flex items-center space-x-2"
                                      >
                                        <span>{t(option.label)}</span>
                                        <div className="flex">
                                          {Array.from(
                                            { length: parseInt(option.value) },
                                            (_, i) => (
                                              <Star
                                                key={`star-${option.value}-${i}`}
                                                className="w-4 h-4 fill-yellow-400 text-yellow-400"
                                              />
                                            ),
                                          )}
                                        </div>
                                      </FormLabel>
                                    </div>
                                  </FormControl>
                                ))}
                              </FormItem>
                            )}
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="sort">
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="sortBy"
                            render={({ field }) => (
                              <FormItem>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  value={field.value}
                                  className="space-y-1"
                                >
                                  {sortOptions.map((option) => (
                                    <FormControl key={option.value}>
                                      <div className="flex items-center space-x-3 py-1">
                                        <RadioGroupItem
                                          value={option.value}
                                          id={`sort-${option.value}`}
                                        />
                                        <FormLabel
                                          htmlFor={`sort-${option.value}`}
                                          className="font-normal cursor-pointer"
                                        >
                                          {t(option.label)}
                                        </FormLabel>
                                      </div>
                                    </FormControl>
                                  ))}
                                </RadioGroup>
                              </FormItem>
                            )}
                          />
                        </div>
                      </TabsContent>
                    </div>
                    {/* ...other tab contents... */}
                    <div className="p-4 border-t bg-background sticky bottom-0 left-0 w-full z-10">
                      <Button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground"
                      >
                        {t("apply")}
                      </Button>
                    </div>
                  </div>
                </div>
              </Tabs>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
