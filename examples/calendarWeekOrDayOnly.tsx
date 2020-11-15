import React from 'react';
import { Moment } from 'moment';
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

export default () => {
  const [date, setDate] = React.useState(momentGenerateConfig.getNow());
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          onClick={() => {
            setDate(momentGenerateConfig.addWeek(date, -1));
          }}
        >
          prev
        </div>
        <PickerPanel<Moment>
          locale={zhCN}
          picker="weekOnly"
          value={date}
          generateConfig={momentGenerateConfig}
          dateRender={dateRender}
        />
        <div
          onClick={() => {
            setDate(momentGenerateConfig.addWeek(date, 1));
          }}
        >
          next
        </div>
      </div>
      <div>
        <Picker<Moment>
          locale={zhCN}
          picker="weekOnly"
          generateConfig={momentGenerateConfig}
          dateRender={dateRender}
        />
      </div>
    </div>
  );
};
