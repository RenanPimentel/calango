import ITime from '../db/ITime';

function getTimeLeft(time: ITime, joinStr = ', '): string {
  const values = Object.entries(time).filter(([, value]) => value !== 0);

  const outputValues = values
    .map(([key, value]) => `${value} ${value === 1 ? key.slice(0, -1) : key}`)
    .join(joinStr);

  const lastCommaIndex = outputValues.lastIndexOf(joinStr);
  const output =
    outputValues.slice(0, lastCommaIndex) +
    ' and ' +
    outputValues.slice(lastCommaIndex + joinStr.length) +
    ' left';

  return output;
}

export default getTimeLeft;
