import React from 'react';
import { Moment } from 'moment';
import PickerPanel from '../src/PickerPanel';
import momentGenerateConfig from '../src/generate/moment';
import zhCN from '../src/locale/zh_CN';
import '../assets/index.less';

export default () => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <PickerPanel<Moment>
        locale={zhCN}
        picker="fullMonth"
        mode="fullMonth"
        // value={momentGenerateConfig.getNow()}
        generateConfig={momentGenerateConfig}
      />
    </div>
  );
};
