import Button from "../Button/Button";

type Props = {
  page: number;
  totalPages: number;
  totalItems: number;
  size: number;
  hasNext: boolean;
  hasPrevious: boolean;
  onPageChange: (page: number) => void;
  onSizeChange: (size: number) => void;
  disabled?: boolean;
};

export default function Pagination({
  page,
  totalPages,
  totalItems,
  size,
  hasNext,
  hasPrevious,
  onPageChange,
  onSizeChange,
  disabled = false,
}: Props) {
  const currentPageDisplay = totalPages === 0 ? 0 : page + 1;

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-gray-input/35 p-4 ring-1 ring-brown/10 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-sm text-gray-text/75">
        <span className="font-medium text-gray-text">{totalItems}</span> total
        items · page{" "}
        <span className="font-medium text-gray-text">{currentPageDisplay}</span>{" "}
        of <span className="font-medium text-gray-text">{totalPages}</span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <label className="flex items-center gap-2 text-sm text-gray-text/80">
          <span>Rows</span>
          <select
            className="rounded-xl bg-white px-3 py-2 text-gray-text ring-1 ring-brown/12 focus-ring"
            value={size}
            onChange={(e) => onSizeChange(Number(e.target.value))}
            disabled={disabled}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </label>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={disabled || !hasPrevious}
        >
          Previous
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={disabled || !hasNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
