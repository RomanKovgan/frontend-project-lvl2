import _ from 'lodash';

const buildTree = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2));
  return _.sortBy(keys).map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (_.isObject(value1) && _.isObject(value2)) {
      return { type: 'nested', key, children: buildTree(value1, value2) };
    }
    if (!_.has(data1, key)) {
      return { type: 'added', key, newValue: value2 };
    }
    if (!_.has(data2, key)) {
      return { type: 'removed', key, oldValue: value1 };
    }
    if (!_.isEqual(value1, value2)) {
      return {
        type: 'changed', key, oldValue: value1, newValue: value2,
      };
    }
    return { type: 'unchanged', key, oldValue: value1 };
  });
};

export default buildTree;
