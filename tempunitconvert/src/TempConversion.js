import * as R from 'ramda';

/**
 * Return new model object with converted temperature on the opposite side
 * of the input value
 * @param Object model
 */
function convert(model) {
  const { leftValue, rightValue, leftUnit, rightUnit } = model;

  //Determine the the unit conversion direction and the source temp
  const [fromUnit, toUnit, fromTemp] = model.inputLeft
    ? [leftUnit, rightUnit, leftValue]
    : [rightUnit, leftUnit, rightValue];

  //Convert given temp and round to one decimal place
  const convertedTemp = R.pipe(
    tempConversion,
    Math.round
  )(fromUnit, toUnit, fromTemp);

  //return the object with converted temperature on the opposite side of input value
  return model.inputLeft
    ? { ...model, rightValue: convertedTemp }
    : { ...model, leftValue: convertedTemp };
}

export default convert;

/**
 * Converts temperature from source unit into target unit
 * @param string fromUnit
 * @param string toUnit
 * @param string fromTemp
 */
function tempConversion(fromUnit, toUnit, fromTemp) {
  /**
   * Rather than writing large if statements, it's more terse to describe all
   * possible conditions as a decision tree represented as an object,
   * an then find possible paths within the object to return the desired action.
   * This is what R.pathOr does.If found it will returns the right function based
   * one given unit conversion. If not found it returns the R.identity function
   */
  const convertFn = R.pathOr(R.identity, [fromUnit, toUnit], UnitConversion);
  //If the path is not found, above function returns the R.identity function
  //when executing R.identity(fromTemp) it returns the same fromTemp value,
  //which means that convert from invalid paths like Kelvin to Kelvin returns the same
  //temp value.
  return convertFn(fromTemp);
}

/**
 * Converts Fahrenheit to Celsius
 * @param {*} temp
 */
function FtoC(temp) {
  return (5 / 9) * (temp - 32);
}

/**
 * Converts Celsius to Fahrenheit
 * @param number temp
 */
function CtoF(temp) {
  return (9 / 5) * temp + 32;
}

/**
 * Converts Kelvin to Celsius
 * @param number temp
 */
function KtoC(temp) {
  return temp - 273.15;
}

/**
 * Converts Celsius to Kelvin
 * @param number temp
 */
function CtoK(temp) {
  return temp + 273.15;
}

/**
 * Converts Fahrenheit to Celsius and then Celsius to Kelvin
 * By composing these two functions, we didn't have to create FtoK() function
 */
const FtoK = R.pipe(
  FtoC,
  CtoK
);

/**
 * Converts Kelvin to Celsius and then Celsius to Fahrenheit through function
 * composition
 */
const KtoF = R.pipe(
  KtoC,
  CtoF
);

/**
 * The following object represents all the conversion possibilities.
 * By traversing the object we can determine the conversion function to use
 * based on the given units. E.g. If the given units are Celsius and Kelvin
 * and if we can find a path in this object that starts with Celsius and ends
 * in Kelvin, we can return CtoK function
 */
const UnitConversion = {
  Celsius: {
    //if (fromUnit === 'Celsius')
    Fahrenheit: CtoF, //if (toUnit === 'Fahrenheit') return CtoF
    Kelvin: CtoK //else if (toUnit === 'Kelvin') return CtoK
  },
  Fahrenheit: {
    //else if (fromUnit === 'Fahrenheit')
    Celsius: FtoC, //if (toUnit === 'Celsius') return FtoC
    Kelvin: FtoK //else if (toUnit === 'Kelvin') return FtoK
  },
  Kelvin: {
    Celsius: KtoC,
    Fahrenheit: KtoF
  }
};
