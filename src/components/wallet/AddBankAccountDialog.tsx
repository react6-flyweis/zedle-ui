import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Button } from "../ui/button";

const addBankSchema = z.object({
  bankName: z.string().min(1, "required"),
  branch: z.string().min(1, "required"),
  accountHolder: z.string().min(1, "required"),
  accountNumber: z.string().min(1, "required"),
  reAccountNumber: z.string().min(1, "required"),
  ifsc: z.string().min(1, "required"),
});

type AddBankFormValues = z.infer<typeof addBankSchema>;

interface AddBankAccountDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (data: AddBankFormValues) => void;
}

export function AddBankAccountDialog({
  open,
  onClose,
  onAdd,
}: AddBankAccountDialogProps) {
  const t = useTranslations("bank");
  const form = useForm<AddBankFormValues>({
    resolver: zodResolver(addBankSchema),
    defaultValues: {
      bankName: "",
      branch: "",
      accountHolder: "",
      accountNumber: "",
      reAccountNumber: "",
      ifsc: "",
    },
  });

  const handleSubmit = (values: AddBankFormValues) => {
    onAdd(values);
    onClose();
    form.reset();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg rounded-2xl bg-white p-8 max-h-[95vh] overflow-hidden">
        <DialogHeader className="">
          <DialogTitle className="text-2xl font-semibold text-left">
            {t("addBankTitle")}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            {t("addBankDescription")}
          </p>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-2"
          >
            <FormField
              control={form.control}
              name="bankName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">{t("bankName")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-0 border-b rounded-none border-b-black focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-primary px-0 shadow-none"
                      placeholder={t("bankName")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="branch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">{t("branch")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-0 border-b rounded-none border-b-black focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-primary px-0 shadow-none"
                      placeholder={t("branch")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accountHolder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">
                    {t("accountHolder")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-0 border-b rounded-none border-b-black focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-primary px-0 shadow-none"
                      placeholder={t("accountHolder")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">
                    {t("accountNumber")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-0 border-b rounded-none border-b-black focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-primary px-0 shadow-none"
                      placeholder={t("accountNumber")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reAccountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">
                    {t("reAccountNumber")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-0 border-b rounded-none border-b-black focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-primary px-0 shadow-none"
                      placeholder={t("reAccountNumber")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ifsc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">{t("ifsc")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-0 border-b rounded-none border-b-black focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-primary px-0 shadow-none"
                      placeholder={t("ifsc")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full rounded-full bg-primary text-white text-lg font-semibold py-3 mt-4"
            >
              {t("add")}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
