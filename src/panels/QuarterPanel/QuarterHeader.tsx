import * as React from 'react';
import wareki from 'wareki';
import Header from '../Header';
import type { Locale } from '../../interface';
import type { GenerateConfig } from '../../generate';
import PanelContext from '../../PanelContext';
import { formatValue } from '../../utils/dateUtil';

export type QuarterHeaderProps<DateType> = {
  prefixCls: string;
  viewDate: DateType;
  locale: Locale;
  localeCode?: string;
  generateConfig: GenerateConfig<DateType>;

  onPrevYear: () => void;
  onNextYear: () => void;
  onYearClick: () => void;
};

function QuarterHeader<DateType>(props: QuarterHeaderProps<DateType>) {
  const {
    prefixCls,
    generateConfig,
    locale,
    viewDate,
    onNextYear,
    onPrevYear,
    onYearClick,
    localeCode,
  } = props;
  const { hideHeader } = React.useContext(PanelContext);
  if (hideHeader) {
    return null;
  }

  const headerPrefixCls = `${prefixCls}-header`;
  const isJa = localeCode === 'ja';

  return (
    <Header
      {...props}
      prefixCls={headerPrefixCls}
      onSuperPrev={onPrevYear}
      onSuperNext={onNextYear}
    >
      <button type="button" onClick={onYearClick} className={`${prefixCls}-year-btn`}>
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
    </Header>
  );
}

export default QuarterHeader;
