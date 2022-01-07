import * as React from 'react';
import wareki from 'wareki';
import Header from '../Header';
import type { GenerateConfig } from '../../generate';
import { YEAR_DECADE_COUNT } from '.';
import PanelContext from '../../PanelContext';

export type YearHeaderProps<DateType> = {
  prefixCls: string;
  viewDate: DateType;
  value?: DateType | null;
  localeCode?: string;
  generateConfig: GenerateConfig<DateType>;
  hideDecade?: boolean;

  onPrevDecade: () => void;
  onNextDecade: () => void;
  onDecadeClick: () => void;
};

function YearHeader<DateType>(props: YearHeaderProps<DateType>) {
  const {
    prefixCls,
    generateConfig,
    viewDate,
    onPrevDecade,
    onNextDecade,
    onDecadeClick,
    hideDecade,
    localeCode,
  } = props;
  const { hideHeader } = React.useContext(PanelContext);
  if (hideHeader) {
    return null;
  }

  const headerPrefixCls = `${prefixCls}-header`;
  const isJa = localeCode === 'ja';

  const yearNumber = generateConfig.getYear(viewDate);
  const startYear = Math.floor(yearNumber / YEAR_DECADE_COUNT) * YEAR_DECADE_COUNT;
  const endYear = startYear + YEAR_DECADE_COUNT - 1;

  return (
    <Header
      {...props}
      prefixCls={headerPrefixCls}
      onSuperPrev={onPrevDecade}
      onSuperNext={onNextDecade}
    >
      <button
        type="button"
        onClick={hideDecade ? null : onDecadeClick}
        className={`${prefixCls}-decade-btn`}
      >
        {isJa
          ? wareki(String(startYear), {
              unit: true,
            })
          : startYear}
        -
        {isJa
          ? wareki(String(endYear), {
              unit: true,
            })
          : endYear}
      </button>
    </Header>
  );
}

export default YearHeader;
