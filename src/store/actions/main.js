export const validateFindRegex = () => {
  let value = document.getElementById("expressionInput").value;
  if (null != value && 0 < value.length) {
    value = value.slice(1, value.length);
    let match = null;
    if (value[value.length - 1] !== "/") {
      match = value[value.length - 1];
      value = value.slice(0, value.length - 2);
    } else {
      value = value.slice(0, value.length - 1);
    }
    let regex = null;
    if (match) {
      try {
        regex = new RegExp(value, match);
      } catch (error) {}
    } else {
      try {
        regex = new RegExp(value);
      } catch (error) {}
    }
    let testString = document.getElementById("testInput");
    if (testString && testString.innerText) {
      let test = testString.innerText;
      let matches = test.match(regex);
      let finalAns = [];
      if (matches.length === 0) {
        return ["No pattern"];
      } else {
        if (matches.input === undefined) {
          for (let match of Object.values(matches)) {
            if (String(match).trim().length !== 0) {
              finalAns.push(match);
            }
          }
        } else {
          if (0 === matches[0].trim().length) {
            finalAns.push("No patterns matched");
          } else {
            finalAns.push(matches[0]);
          }
        }
        return finalAns;
      }
    } else {
      return new Array("Empty Test string");
    }
  } else {
    return new Array("Empty regex");
  }
};
