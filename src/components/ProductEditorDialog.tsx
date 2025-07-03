"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const productSchema = z.object({
  category: z.string().min(1),
  name: z.string().min(1),
  size: z.string().optional(),
  price: z.string().min(1),
  description: z.string().optional(),
  images: z.array(z.any()).max(3).optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

const PRODUCT_CATEGORIES = [
  "Vegetables & Fruits",
  "Dairy Products",
  "Home Care",
  "Chips and Beverages",
  "Other",
];

interface ProductEditorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: Partial<ProductFormValues>;
}

export function ProductEditorDialog({
  open,
  onOpenChange,
  data = {},
}: ProductEditorDialogProps) {
  const t = useTranslations("editor");
  const mode = data && Object.keys(data).length > 0 ? "update" : "add";
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: data,
  });
  const { setValue, watch } = form;
  const images = watch("images") || [];

  const handleSubmit = (values: ProductFormValues) => {
    console.log(values);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg w-full rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            {mode === "add" ? t("addProductTitle") : t("updateProductTitle")}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("productCategory")}</FormLabel>
                  <div className="relative mt-1">
                    <select
                      className="w-full border rounded-md bg-muted px-3 py-2 text-muted-foreground"
                      id="category"
                      value={field.value || ""}
                      onChange={(e) => setValue("category", e.target.value)}
                    >
                      <option value="" disabled>
                        {t("selectCategory")}
                      </option>
                      {PRODUCT_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("productName")}</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-muted mt-1" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("size")}</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-muted mt-1" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("price")}</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-muted mt-1" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("description")}</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="bg-muted mt-1" rows={3} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="images"
              render={() => (
                <FormItem>
                  <FormLabel>{t("productImages")}</FormLabel>
                  <div className="flex gap-3" id="product-images-group">
                    {[0, 1, 2].map((idx) => (
                      <label
                        key={idx}
                        className="w-28 h-28 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer bg-muted"
                        htmlFor={`product-image-${idx}`}
                      >
                        {images[idx] && (
                          <span className="w-full h-full flex items-center justify-center">
                            {/** biome-ignore lint/performance/noImgElement: <explanation> */}
                            <img
                              src={
                                typeof images[idx] === "string"
                                  ? images[idx]
                                  : URL.createObjectURL(images[idx] as File)
                              }
                              alt="Product"
                              className="object-cover w-full h-full rounded-lg"
                            />
                          </span>
                        )}
                        {!images[idx] && (
                          <PlusIcon className="w-6 h-6 text-primary" />
                        )}
                        <input
                          id={`product-image-${idx}`}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const newImages = [...images];
                              newImages[idx] = file;
                              setValue("images", newImages as File[], {
                                shouldValidate: true,
                              });
                            }
                          }}
                        />
                      </label>
                    ))}
                  </div>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full mt-4 bg-black text-white py-2 rounded-md font-semibold"
            >
              {mode === "add" ? t("addButton") : t("updateButton")}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
