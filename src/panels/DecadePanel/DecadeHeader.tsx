import * as React from 'react';
import wareki from 'wareki';
import Header from '../Header';
import type { GenerateConfig } from '../../generate';
import { DECADE_DISTANCE_COUNT } from '.';
import PanelContext from '../../PanelContext';

export type YearHeaderProps<DateType> = {
  prefixCls: string;
  viewDate: DateType;
  generateConfig: GenerateConfig<DateType>;
  localeCode?: string;
  onPrevDecades: () => void;
  onNextDecades: () => void;
};

function DecadeHeader<DateType>(props: YearHeaderProps<DateType>) {
  const { prefixCls, generateConfig, viewDate, onPrevDecades, onNextDecades, localeCode } = props;
  const { hideHeader } = React.useContext(PanelContext);
  if (hideHeader) {
    return null;
  }

  const headerPrefixCls = `${prefixCls}-header`;
  const isJa = localeCode === 'ja';

  const yearNumber = generateConfig.getYear(viewDate);
  const startYear = Math.floor(yearNumber / DECADE_DISTANCE_COUNT) * DECADE_DISTANCE_COUNT;
  const endYear = startYear + DECADE_DISTANCE_COUNT - 1;

  return (
    <Header
      {...props}
      prefixCls={headerPrefixCls}
      onSuperPrev={onPrevDecades}
      onSuperNext={onNextDecades}
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
    </Header>
  );
}

export default DecadeHeader;
