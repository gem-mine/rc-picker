import * as React from 'react';
import { GenerateConfig } from '../../generate';
import {
  WEEK_DAY_COUNT,
  getMonthStartDate,
  isSameDate,
  isSameMonth,
  formatValue,
} from '../../utils/dateUtil';
import { Locale, PickerMode } from '../../interface';
import RangeContext from '../../RangeContext';
import useCellClassName from '../../hooks/useCellClassName';
import PanelBody from '../PanelBody';

export type DateRender<DateType> = (currentDate: DateType, today: DateType) => React.ReactNode;

export interface DateBodyPassProps<DateType> {
  dateRender?: DateRender<DateType>;
  disabledDate?: (date: DateType) => boolean;

  // Used for week panel
  prefixColumn?: (date: DateType) => React.ReactNode;
  rowClassName?: (date: DateType) => string;
}

export interface DateBodyProps<DateType> extends DateBodyPassProps<DateType> {
  prefixCls: string;
  generateConfig: GenerateConfig<DateType>;
  value?: DateType | null;
  viewDate: DateType;
  locale: Locale;
  rowCount: number;
  onSelect: (value: DateType) => void;
  picker?: PickerMode;
  mode?: PickerMode,
  firstDayOfMonth?: number,
}

function DateBody<DateType>(props: DateBodyProps<DateType>) {
  const {
    prefixCls,
    generateConfig,
    prefixColumn,
    locale,
    viewDate,
    value,
    dateRender,
    mode,
    picker,
    firstDayOfMonth,
  } = props;

  let { rowCount } = props
  const { rangedValue, hoverRangedValue } = React.useContext(RangeContext);
  const mergedMode = mode ?? picker
  // 获取基准的日期 也就是面板上的第一天
  let baseDate = getMonthStartDate(locale.locale, generateConfig, viewDate, firstDayOfMonth);
  if (mergedMode === 'calendarWeek') {
    // 将可视日期的周第一天设为基准日期
    baseDate = generateConfig.setWeekDay(viewDate, 0);
    rowCount = 1
  }

  const cellPrefixCls = `${prefixCls}-cell`;
  const weekFirstDay = generateConfig.locale.getWeekFirstDay(locale.locale);
  const today = generateConfig.getNow();

  // ============================== Header ==============================
  const headerCells: React.ReactNode[] = [];
  const weekDaysLocale: string[] =
    locale.shortWeekDays ||
    (generateConfig.locale.getShortWeekDays
      ? generateConfig.locale.getShortWeekDays(locale.locale)
      : []);

  if (prefixColumn) {
    headerCells.push(<th key="empty" aria-label="empty cell" />);
  }
  for (let i = 0; i < WEEK_DAY_COUNT; i += 1) {
    headerCells.push(<th key={i}>{weekDaysLocale[(i + weekFirstDay) % WEEK_DAY_COUNT]}</th>);
  }

  // =============================== Body ===============================
  const getCellClassName = useCellClassName({
    cellPrefixCls,
    today,
    value,
    generateConfig,
    rangedValue: prefixColumn ? null : rangedValue,
    hoverRangedValue: prefixColumn ? null : hoverRangedValue,
    isSameCell: (current, target) => isSameDate(generateConfig, current, target),
    // 月模式下上下个月的置灰，周模式不要有置灰
    isInView: mergedMode === 'calendarWeek' ?
      () => true :
        date => isSameMonth(
          generateConfig,
          generateConfig.addDate(date, -firstDayOfMonth + 1),
          viewDate
        ),
    offsetCell: (date, offset) => generateConfig.addDate(date, offset),
  });

  const getCellNode = dateRender ? (date: DateType) => dateRender(date, today) : undefined;

  return (
    <PanelBody
      {...props}
      rowNum={rowCount}
      colNum={WEEK_DAY_COUNT}
      baseDate={baseDate}
      getCellNode={getCellNode}
      getCellText={generateConfig.getDate}
      getCellClassName={getCellClassName}
      getCellDate={generateConfig.addDate}
      titleCell={date =>
        formatValue(date, {
          locale,
          format: 'YYYY-MM-DD',
          generateConfig,
        })
      }
      headerCells={headerCells}
    />
  );
}

export default DateBody;
