import React from 'react';
import { Moment } from 'moment';
import Picker from '../src/Picker';
import PickerPanel from '../src/PickerPanel';
import momentGenerateConfig from '../src/generate/moment';
import zhCN from '../src/locale/zh_CN';
import '../assets/index.less';
import { PickerMode } from '../src/interface';

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
  const picker: PickerMode = 'calendarWeek';
  // let picker: PickerMode = 'calendarDay'
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          onClick={() => {
            if (picker === 'calendarWeek') {
              setDate(momentGenerateConfig.addWeek(date, -1));
            } else {
              setDate(momentGenerateConfig.addDate(date, -1));
            }
          }}
        >
          prev
        </div>
        <PickerPanel<Moment>
          locale={zhCN}
          picker={picker}
          value={date}
          generateConfig={momentGenerateConfig}
          dateRender={dateRender}
        />
        <div
          onClick={() => {
            if (picker === 'calendarWeek') {
              setDate(momentGenerateConfig.addWeek(date, 1));
            } else {
              setDate(momentGenerateConfig.addDate(date, 1));
            }
          }}
        >
          next
        </div>
      </div>
      <div>
        <Picker<Moment>
          locale={zhCN}
          picker="calendarWeek"
          generateConfig={momentGenerateConfig}
          dateRender={dateRender}
        />
      </div>
    </div>
  );
};
