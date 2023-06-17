export function convertOzToMetric(oz: number) {
  const ml = oz * 29.5735;
  if (ml > 1000) {
    const l = ml / 1000;
    return l.toFixed(1) + " L";
  } else if (ml > 100) {
    const dl = ml / 100;
    return dl.toFixed(1) + " dl";
  }

  const cl = Math.round(ml / 10);
  return cl + " cl";
}

export function convertToCentiliters(input: string) {
  const regex = /([\d\s\/]+)\s*([a-z]+)\s*(.+)/i;
  const matches = input.match(regex);

  if (!matches || matches.length !== 4) {
    throw new Error(
      'Invalid input format. Expected format: "<numeric value> <unit> <description>".'
    );
  }

  const numericValue = matches[1].replace(/\s/g, "");
  const unit = matches[2].toLowerCase();
  const description = matches[3].trim();

  const [whole, numerator, denominator] = numericValue.split(/[\s\/]+/);

  let convertedValue = parseFloat(whole);
  if (numerator && denominator) {
    convertedValue += parseFloat(numerator) / parseFloat(denominator);
  }

  let centiliters = 0;
  if (unit === "oz") {
    const conversionFactor = 2.95735;
    centiliters = convertedValue * conversionFactor;
  } else {
    throw new Error(`Unsupported unit: ${unit}.`);
  }

  return centiliters + description;
}
