import * as React from 'react';
import wareki from 'wareki';
import Header from '../Header';
import type { Locale, PanelMode } from '../../interface';
import type { GenerateConfig } from '../../generate';
import PanelContext from '../../PanelContext';
import { formatValue } from '../../utils/dateUtil';

export type DateHeaderProps<DateType> = {
  prefixCls: string;
  viewDate: DateType;
  value?: DateType | null;
  locale: Locale;
  localeCode?: string;
  generateConfig: GenerateConfig<DateType>;
  mergedMode?: PanelMode;

  onPrevYear: () => void;
  onNextYear: () => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onYearClick: () => void;
  onMonthClick: () => void;
};

function DateHeader<DateType>(props: DateHeaderProps<DateType>) {
  const {
    prefixCls,
    generateConfig,
    locale,
    localeCode,
    viewDate,
    onNextMonth,
    onPrevMonth,
    onNextYear,
    onPrevYear,
    onYearClick,
    onMonthClick,
    mergedMode,
  } = props;

  const { hideHeader } = React.useContext(PanelContext);
  if (hideHeader && mergedMode !== 'fullMonth') {
    return null;
  }

  const headerPrefixCls = `${prefixCls}-header`;

  const monthsLocale: string[] =
    locale.shortMonths ||
    (generateConfig.locale.getShortMonths
      ? generateConfig.locale.getShortMonths(locale.locale)
      : []);

  const month = generateConfig.getMonth(viewDate);

  const isJa = localeCode === 'ja';

  // =================== Month & Year ===================
  const yearNode: React.ReactNode = (
    <button
      type="button"
      key="year"
      onClick={onYearClick}
      tabIndex={-1}
      className={`${prefixCls}-year-btn`}
    >
      {formatValue(viewDate, {
        locale,
        format: isJa
          ? (value) =>
              wareki(String(generateConfig.getYear(value)), {
                unit: true,
              })
          : locale.yearFormat,
        generateConfig,
      })}
    </button>
  );
  const monthNode: React.ReactNode = (
    <button
      type="button"
      key="month"
      onClick={onMonthClick}
      tabIndex={-1}
      className={`${prefixCls}-month-btn`}
    >
      {locale.monthFormat
        ? formatValue(viewDate, {
            locale,
            format: locale.monthFormat,
            generateConfig,
          })
        : monthsLocale[month]}
    </button>
  );

  const monthYearNodes = locale.monthBeforeYear ? [monthNode, yearNode] : [yearNode, monthNode];

  return (
    <Header
      {...props}
      prefixCls={headerPrefixCls}
      onSuperPrev={onPrevYear}
      onPrev={onPrevMonth}
      onNext={onNextMonth}
      onSuperNext={onNextYear}
    >
      {monthYearNodes}
    </Header>
  );
}

export default DateHeader;
