import * as React from 'react';
import type { GenerateConfig } from '../../generate';
import type { Locale } from '../../interface';
import { formatValue } from '../../utils/dateUtil';
import RangeContext from '../../RangeContext';
import useCellClassName from '../../hooks/useCellClassName';
import PanelBody from '../PanelBody';

export const MONTH_COL_COUNT = 3;
const MONTH_ROW_COUNT = 4;

export type MonthCellRender<DateType> = (currentDate: DateType, locale: Locale) => React.ReactNode;

export interface MonthBodyProps<DateType> {
  prefixCls: string;
  locale: Locale;
  generateConfig: GenerateConfig<DateType>;
  value?: DateType | null;
  viewDate: DateType;
  disabledDate?: (date: DateType) => boolean;
  monthCellRender?: MonthCellRender<DateType>;
  onSelect: (value: DateType) => void;
}

function MonthBody<DateType>(props: MonthBodyProps<DateType>) {
  const { prefixCls, locale, value, viewDate, generateConfig, monthCellRender } = props;

  const { rangedValue, hoverRangedValue } = React.useContext(RangeContext);

  const cellPrefixCls = `${prefixCls}-full-month`;

  const getCellClassName = useCellClassName({
    cellPrefixCls: `${cellPrefixCls}-cell`,
    value,
    generateConfig,
    rangedValue,
    hoverRangedValue,
    // 移除掉，否则 hover 在月份上会高亮
    // isSameCell: (current, target) => isSameMonth(generateConfig, current, target),
    isSameCell: () => false,
    isInView: () => true,
    offsetCell: (date, offset) => generateConfig.addMonth(date, offset),
  });

  const monthsLocale: string[] =
    locale.shortMonths ||
    (generateConfig.locale.getShortMonths
      ? generateConfig.locale.getShortMonths(locale.locale)
      : []);

  const baseMonth = generateConfig.setMonth(viewDate, 0);

  const getCellNode = monthCellRender
    ? (date: DateType) => monthCellRender(date, locale)
    : undefined;

  return (
    <PanelBody
      {...props}
      prefixCls={cellPrefixCls}
      rowNum={MONTH_ROW_COUNT}
      colNum={MONTH_COL_COUNT}
      baseDate={baseMonth}
      getCellNode={getCellNode}
      getCellText={(date) =>
        locale.monthFormat
          ? formatValue(date, {
              locale,
              format: locale.monthFormat,
              generateConfig,
            })
          : monthsLocale[generateConfig.getMonth(date)]
      }
      getCellClassName={getCellClassName}
      getCellDate={generateConfig.addMonth}
      titleCell={(date) =>
        formatValue(date, {
          locale,
          format: 'YYYY-MM',
          generateConfig,
        })
      }
    />
  );
}

export default MonthBody;
