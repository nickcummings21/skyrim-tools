const { ingredient_controller: ing_ctl } = require('./ingredient_controller');

const getProps = () => {
  const props = ing_ctl.getProps();

  if (props.length == 0) {
    // Should never happen
    return `No properties found.`;
  }
    
  return props;
};

const getIngs = () => {
  const all_ings = ing_ctl.getIngs();

  if (all_ings.length == 0) {
    // Should never happen
    return `No ingredients found.`;
  }
    
  return all_ings;
};

const getCombosForIng = (target_ing) => {
  const error = ing_ctl.validateIng(target_ing);
  if (error) {
    console.log(error);
    return;
  }

  const combos = ing_ctl.getCombosForIng(target_ing);

  if (combos.length == 0) {
    // Should never happen
    return `No ingredient combinations found for '${target_ing}'`;
  }
    
  return combos;
};

const getIngsWithProp = (target_prop) => {
  const error = ing_ctl.validateProp(target_prop);
  if (error) {
    console.log(error);
    return;
  }

  const combos = ing_ctl.getIngsWithProp(target_prop);

  if (combos.length == 0) {
    // Should never happen
    return `No ingredient combinations found for '${target_prop}'`;
  }

  return combos;
};

const main = () => {
  // console.log('ARGS', process.argv);

  const method = process.argv[2];
  if (method == undefined) {
    console.log('Command is undefined.');
    return;
  }

  let target_ing, target_prop;
  let ings, props, combos;
  switch(method) {
    case '--properties':
    case '-p':
      props = getProps();
      console.log("Properties:", props);
      break;
    case '--ingredients':
    case '-i':
      ings = getIngs();
      console.log("Ingredients:", ings);
      break;
    case '--get-combos':
    case '-gc':
      target_ing = process.argv[3];
      combos = getCombosForIng(target_ing);
      console.log("Combinations:", combos);
      break;
    case '--get-prop':
    case '-gp':
      target_prop = process.argv[3];
      ings = getIngsWithProp(target_prop);
      console.log("Ingredients:", ings);
      break;
    default:
      console.log(`Command '${method}' not recognized.`);
  }
  // END main
};

main();
