import React from 'react';
import type { Moment } from 'moment';
import Picker from '../src/Picker';
import PickerPanel from '../src/PickerPanel';
import momentGenerateConfig from '../src/generate/moment';
import zhCN from '../src/locale/zh_CN';
import '../assets/index.less';

function dateRender(date: Moment, today: Moment) {
  return (
    <div
      style={{
        width: 80,
        height: 80,
        borderTop: '3px solid #CCC',
        borderTopColor: date.isSame(today, 'date') ? 'blue' : '#CCC',
      }}
    >
      {date.date()}
    </div>
  );
}

export default () => (
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    <div>
      <PickerPanel<Moment>
        locale={zhCN}
        // picker="month"
        firstDayOfMonth={21}
        generateConfig={momentGenerateConfig}
        dateRender={dateRender}
      />
    </div>
    <div>
      <Picker<Moment> locale={zhCN} generateConfig={momentGenerateConfig} dateRender={dateRender} />
    </div>
  </div>
);
