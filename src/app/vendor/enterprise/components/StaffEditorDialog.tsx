import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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

const staffSchema = z.object({
  name: z.string().min(1),
  profession: z.string().min(1),
  yearsOfExperience: z.coerce.number().min(0),
  phone: z.string().min(1),
  image: z.string().optional(),
});

type StaffFormValues = z.infer<typeof staffSchema>;

interface AddStaffDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: StaffFormValues; // Optional data prop for pre-filling form
}

export function StaffEditorDialog({ open, onOpenChange }: AddStaffDialogProps) {
  const t = useTranslations("staffs.addDialog");
  const form = useForm<StaffFormValues>({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      name: "",
      profession: "",
      yearsOfExperience: 0,
      phone: "+1",
      image: "",
    },
  });
  const [imageUrl, setImageUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      form.setValue("image", url);
    }
  }

  function onSubmit(_values: StaffFormValues) {
    form.reset();
    setImageUrl("");
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-3xl p-5">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            {t("title")}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mb-2">
            {t("subtitle")}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-start mb-4">
          <label className="w-28 h-20 rounded-full border border-dashed border-primary flex items-center justify-center bg-muted mb-2 focus:outline-none">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="Preview"
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
            ) : (
              <Camera className="size-6" />
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("fullNameLabel")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("fullNamePlaceholder") as string}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("professionLabel")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("professionPlaceholder") as string}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="yearsOfExperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("experienceLabel")}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={t("experiencePlaceholder") as string}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("phoneLabel")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("phonePlaceholder") as string}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-1 sm:col-span-2 mt-2">
              <Button
                type="submit"
                className="w-full rounded-full bg-primary text-primary-foreground text-lg h-12"
              >
                {useTranslations("staffs")("addStaffButton")}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
