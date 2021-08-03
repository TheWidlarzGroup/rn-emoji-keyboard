export const getHeight = (value: string | number, screenHeight: number) =>
  typeof value === 'number'
    ? value
    : (screenHeight / 100) * parseInt(value.replace('%', ''), 10);

export const exhaustiveTypeCheck = (arg: never, strict = true) => {
  console.log(`unhandled union case for : ${arg}`);
  if (strict) {
    throw new Error(`unhandled union case for : ${arg}`);
  }
};
