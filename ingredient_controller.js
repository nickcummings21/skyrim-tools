const { ingredients } = require('./ingredients');
const { PROPS } = require('./ingredient_props');

const ings_dict = ingredients;
const ing_props = Object.values(PROPS);
const ings = Object.values(ings_dict);

exports.ingredient_controller = {
  validateIng: ing_name => {
    if (ing_name == undefined) 
      return 'Ingredient is undefined';
    if (ings_dict[ing_name] == undefined) 
      return `Ingredient '${ing_name}' not found.`
    return null;
  },

  validateProp: prop => {
    if (prop == undefined) 
      return 'Property is undefined';
    if (!ing_props.includes(prop)) 
      return `Property '${ing_name}' not found.`
    return null;
  },

  getProps: () => {
    // console.log("Getting all properties...");
    return ing_props;
  },

  getIngs: () => {
    // console.log("Getting all ingredients...");
    return ings.map(ing => ing.name);
  },

  getCombosForIng: target_ing_name => {
    // console.log(`Getting combos for '${target_ing_name}...'`);
    console.log('Target Ingredient:', ings_dict[target_ing_name]);

    const target_ing = ings_dict[target_ing_name];
    const combos = [];
    const ings = Object.values(ings_dict);

    for (let i = 0; i < ings.length; i++) {
      // if (target_ing.name === ings[i].name) continue;

      let common_props = [];
      ings[i].props.map(prop => {
        if (target_ing.props.includes(prop)) {
          common_props.push(prop);
        }
      });

      if (common_props.length > 0) {
        combos.push({ 
          name: ings[i].name, 
          props: common_props, 
          weight: common_props.length
        });
      }
    }

    return combos
      .sort((a, b) => a.weight - b.weight)
      .map(i => [i.name, {props: i.props.join(" - ")}]);
  },

  getIngsWithProp: target_prop_name => {
    // console.log(`Getting ingredients for '${target_prop_name}...'`);
    console.log('Target property:', target_prop_name);

    const ings_w_prop = ings.filter(
      ing => ing.props.includes(target_prop_name)
    ).map(ing => ing.name);

    return ings_w_prop;
  },
};
