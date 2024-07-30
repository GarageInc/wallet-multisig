import { get as _get } from 'lodash';

const get = (path: string | Array<string>, defaultValue?: any): any => {
  return _get(CONFIG, path, defaultValue);
};

export default { get };
