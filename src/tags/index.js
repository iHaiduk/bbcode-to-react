import Tag from '../tag';
import createSimpleTag from './simple';

export default {
  b: createSimpleTag('strong'),
  i: createSimpleTag('em'),
  u: createSimpleTag('u'),
  s: createSimpleTag('strike'),
};
