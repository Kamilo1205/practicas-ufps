"use client"

import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import { CaptionProps, DayPicker, useNavigation } from "react-day-picker"

import { format } from 'date-fns'
import { es } from 'date-fns/locale'

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

interface CustomHeaderProps {
  buttonPreviousDisabled?: boolean;
  buttonNextLabeDisabled?: boolean;
  onToggleView: () => void;
  label?: string;
  onPrevClick?: () => void;
  onNextClick?: () => void;
}

interface MonthSelectionProps {
  onMonthSelect: (month: number) => void;
  selectedDate: Date;
  onYearSelect: (year: number) => void;
  onToggleView: () => void;
}

interface YearSelectionProps {
  selectedDate: Date;
  onToggleView: () => void;
  onYearSelect: (year: number) => void;
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {

  const [viewMode, setViewMode] = React.useState('normal');
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const toggleViewMode = () => {
    if (viewMode === 'normal') {
      setViewMode('monthSelection');
    } else if (viewMode === 'monthSelection') {
      setViewMode('yearSelection');
    } else {
      setViewMode('normal');
    }
  };

  const changeYear = (nuevoYear: number) => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(nuevoYear);
    setSelectedDate(newDate);
    setViewMode('monthSelection');
  };

  const changeMonth = (newMonth: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newMonth);
    setSelectedDate(newDate);
    setViewMode('normal');
  };

  if (viewMode === 'yearSelection') {
    return (
      <div className="p-3">
        <YearSelection
          selectedDate={selectedDate}
          onYearSelect={changeYear}
          onToggleView={toggleViewMode}
        />
      </div>
    )
  }

  if (viewMode === 'monthSelection') {
    return (
      <div className="p-3">
        <MonthSelection
          selectedDate={selectedDate}
          onYearSelect={changeYear}
          onToggleView={toggleViewMode}
          onMonthSelect={changeMonth}
        />
      </div>
    )
  }

  return (
    <DayPicker
      locale={es}
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      month={selectedDate}
      onMonthChange={setSelectedDate}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeftIcon className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRightIcon className="h-4 w-4" />,
        Caption: (props) => <CustomCaption {...props} onToggleView={toggleViewMode} />
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }


function CustomCaption(props: CaptionProps & { onToggleView: () => void }) {
  const { displayMonth, onToggleView } = props;
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  return (
    <CustomHeader
      onToggleView={onToggleView}
      buttonNextLabeDisabled={!previousMonth}
      buttonPreviousDisabled={!nextMonth}
      label={format(displayMonth, 'MMMM yyy', { locale: es })}
      onNextClick={() => previousMonth && goToMonth(previousMonth)}
      onPrevClick={() => nextMonth && goToMonth(nextMonth)}
    />
  );
}

const CustomHeader = ({
  buttonPreviousDisabled = false,
  buttonNextLabeDisabled = false,
  onToggleView,
  label = '',
  onPrevClick,
  onNextClick
}: CustomHeaderProps) => {
  return (
    <div className="flex justify-between pt-1 items-center">
      <Button
        variant="outline"
        className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        disabled={buttonPreviousDisabled}
        onClick={onPrevClick}
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        className="text-sm font-medium h-7 capitalize"
        onClick={onToggleView}
      >
        {label}
      </Button>

      <Button
        variant="outline"
        className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        disabled={buttonNextLabeDisabled}
        onClick={onNextClick}
      >
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}

const MonthSelection = ({ onToggleView, onMonthSelect, selectedDate, onYearSelect }: MonthSelectionProps) => {
  const months = Array.from({ length: 12 }, (_, i) => i);

  const handlePrevClick = () => {
    const newYear = selectedDate.getFullYear() - 1;
    onYearSelect(newYear);
  };

  const handleNextClick = () => {
    const newYear = selectedDate.getFullYear() + 1;
    onYearSelect(newYear);
  };

  return (
    <>
      <CustomHeader
        onToggleView={onToggleView}
        label={selectedDate.getFullYear().toString()}
        onPrevClick={handlePrevClick}
        onNextClick={handleNextClick}
      />
      <div className="grid grid-cols-4 p-2 gap-x-1 gap-y-2">
        {months.map((month) => (
          <button
            key={month}
            className="col-span-1 text-sm font-medium capitalize hover:bg-slate-200 py-2 px-3 rounded-md"
            onClick={() => onMonthSelect(month)}
          >
            {format(new Date(0, month), 'MMM', { locale: es })}
          </button>
        ))}
      </div>
    </>
  );
};

const YearSelection = ({ selectedDate, onYearSelect, onToggleView }: YearSelectionProps) => {
  const [startYear, setStartYear] = React.useState(selectedDate.getFullYear() - 6);

  const handlePrevClick = () => {
    setStartYear(startYear - 12);
  };

  const handleNextClick = () => {
    setStartYear(startYear + 12);
  };

  const handleYearSelect = (year: number) => {
    onYearSelect(year);
  };

  const endYear = startYear + 11;
  const label = `${startYear} - ${endYear}`;

  const years = Array.from({ length: 12 }, (_, i) => startYear + i);

  return (
    <div>
      <CustomHeader
        onToggleView={onToggleView}
        label={label}
        onPrevClick={handlePrevClick}
        onNextClick={handleNextClick}
      />
      <div className="grid grid-cols-4 p-2 gap-x-1 gap-y-2">
        {years.map((year) => (
          <button
            key={year}
            className="col-span-1 text-sm font-medium capitalize hover:bg-slate-200 py-2 px-3 rounded-md"
            onClick={() => handleYearSelect(year)}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
};