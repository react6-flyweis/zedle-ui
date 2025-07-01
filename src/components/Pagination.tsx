import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import type { FC } from "react";
import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as ShadcnPagination,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const t = useTranslations("Pagination");
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center py-6 bg-muted">
      <ShadcnPagination>
        <PaginationContent className="gap-4">
          <PaginationItem>
            <PaginationPrevious
              aria-label={t("previous")}
              onClick={
                currentPage === 1
                  ? undefined
                  : () => onPageChange(currentPage - 1)
              }
              className={cn(
                "rounded bg-white shadow-none size-10",
                currentPage === 1 && "pointer-events-none opacity-50",
              )}
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </PaginationPrevious>
          </PaginationItem>
          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => onPageChange(page)}
                aria-label={t("page", { page })}
                isActive={page === currentPage}
                className={cn(
                  "rounded size-10 text-xl font-semibold transition-all bg-white shadow-none",
                  page === currentPage &&
                    "bg-primary scale-120 text-primary-foreground hover:bg-primary/90 shadow-none hover:text-primary-foreground",
                  page !== currentPage &&
                    "text-muted-foreground hover:bg-accent hover:text-accent-foreground text-shadow-sm",
                )}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              aria-label={t("next")}
              onClick={
                currentPage === totalPages
                  ? undefined
                  : () => onPageChange(currentPage + 1)
              }
              className={cn(
                "rounded bg-white shadow-none size-10",
                currentPage === totalPages && "pointer-events-none opacity-50",
              )}
            >
              <ChevronRight className="w-6 h-6 text-foreground" />
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </ShadcnPagination>
    </div>
  );
};

export default Pagination;
