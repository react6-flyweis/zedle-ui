"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const SIZE_OPTIONS = ["Small", "Medium", "Large"];
const INGREDIENT_OPTIONS = [
  "Salt",
  "Chicken",
  "Onion",
  "Garlic",
  "Peppers",
  "Ginger",
  "Broccoli",
  "Olive",
  "Cheese",
  "Mushroom",
  "Sweet Corn",
];

const foodMenuSchema = z.object({
  category: z.string().min(1),
  name: z.string().min(1),
  size: z.string().min(1),
  price: z.coerce.string().min(1),
  description: z.string().optional(),
  ingredients: z.array(z.string()).min(1),
  images: z.array(z.any()).max(3).optional(),
});

export type FoodMenuCategory =
  | "Pizza"
  | "Burger"
  | "Biryani"
  | "Chicken"
  | "Rolls";

export interface IFoodMenu {
  id: string;
  category: FoodMenuCategory;
  name: string;
  size?: string;
  price: string;
  quantity?: number;
  description?: string;
  images?: string[];
  ingredients?: string[];
}

type ProductFormValues = z.infer<typeof foodMenuSchema>;

const PRODUCT_CATEGORIES = ["Pizza", "Burger", "Biryani", "Chicken", "Rolls"];

interface ProductEditorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: IFoodMenu;
}

export function FoodMenuEditorDialog({
  open,
  onOpenChange,
  data,
}: ProductEditorDialogProps) {
  const t = useTranslations("menuEditor");
  const mode = data && Object.keys(data).length > 0 ? "update" : "add";
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(foodMenuSchema),
    defaultValues: {
      category: "",
      name: "",
      size: SIZE_OPTIONS[0],
      price: "",
      description: "",
      ingredients: [],
      images: [],
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        category: data.category || "",
        name: data.name || "",
        size: data.size || SIZE_OPTIONS[0],
        price: data.price || "",
        description: data.description || "",
        ingredients: data.ingredients || [],
        images: data.images || [],
      });
    }
  }, [data, form]);

  const { setValue, watch } = form;
  const images = watch("images") || [];
  const ingredients = watch("ingredients") || [];

  const handleSubmit = (values: ProductFormValues) => {
    console.log(values);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-full rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
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
            {/* Food Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("foodCategory")}</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value || ""}
                      onValueChange={(value) => setValue("category", value)}
                    >
                      <SelectTrigger className="w-full bg-muted text-muted-foreground">
                        <SelectValue placeholder={t("selectCategory")} />
                      </SelectTrigger>
                      <SelectContent>
                        {PRODUCT_CATEGORIES.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Food Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("foodName")}</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-muted mt-1" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Size Dropdown */}
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("size")}</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value || SIZE_OPTIONS[0]}
                      onValueChange={(value) => setValue("size", value)}
                    >
                      <SelectTrigger className="w-full bg-muted text-muted-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {SIZE_OPTIONS.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            {/* Price with $ prefix */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("price")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        $
                      </span>
                      <Input
                        {...field}
                        className="bg-muted pl-5"
                        type="text"
                        inputMode="decimal"
                        pattern="^\\$?\\d+(\\.\\d{0,2})?$"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Description */}
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
            {/* Ingredients Checkbox Group */}
            <FormField
              control={form.control}
              name="ingredients"
              render={() => (
                <FormItem>
                  <FormLabel>{t("ingredients")}</FormLabel>
                  <div className="flex flex-wrap gap-3 mt-1">
                    {INGREDIENT_OPTIONS.map((ingredient, idx) => {
                      const checked = ingredients.includes(ingredient);
                      const checkboxId = `ingredient-checkbox-${idx}`;
                      return (
                        <div
                          key={ingredient}
                          className="flex items-center gap-1 cursor-pointer select-none"
                        >
                          <Checkbox
                            id={checkboxId}
                            checked={checked}
                            onCheckedChange={(checked) => {
                              const newIngredients = checked
                                ? [...ingredients, ingredient]
                                : ingredients.filter(
                                    (i: string) => i !== ingredient,
                                  );
                              setValue("ingredients", newIngredients, {
                                shouldValidate: true,
                              });
                            }}
                            className="accent-primary w-4 h-4 rounded border"
                          />
                          <label
                            htmlFor={checkboxId}
                            className="text-sm cursor-pointer"
                          >
                            {t(ingredient.replace(/\s/g, "").toLowerCase())}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Food Images */}
            <FormField
              control={form.control}
              name="images"
              render={() => (
                <FormItem>
                  <FormLabel>{t("foodImages")}</FormLabel>
                  <div className="flex gap-3" id="product-images-group">
                    {[0, 1, 2].map((idx) => (
                      <label
                        key={idx}
                        className="w-28 h-28 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer bg-muted"
                        htmlFor={`product-image-${idx}`}
                      >
                        {images[idx] && (
                          <span className="w-full h-full flex items-center justify-center">
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
