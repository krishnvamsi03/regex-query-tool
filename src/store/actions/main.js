export const validateFindRegex = (event) => {
  if (null != event) {
    if (null != event.target.value) {
      let value = event.target.value;
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
        let i = 0,
          j = 0;
        let span = "<span style='background-color:yellow;'>";
        let finalText = "";
        let word = "";
        while (regex && matches && j < matches.length) {
          if (matches[j].length === 0) {
            j += 1;
          }
          while (i < test.length) {
            if (test[i].trim().length > 0) {
              word += test[i];
            } else {
              word = "";
            }
            if (test[i] === matches[j]) {
              finalText += span + test[i] + "</span>";
              i += 1;
              break;
            } else if (matches[j] === word) {
              finalText += span + word + "</span>";
              i += 1;
              break;
            } else {
              if (test[i].trim().length <= 0) {
                finalText += test[i];
              }
              i += 1;
            }
          }
          if (i < test.length && test[i].trim().length <= 0) {
            word = "";
            finalText += test[i];
            i += 1;
          }
          j += 1;
        }
        while (i < test.length) {
          finalText += test[i];
          i += 1;
        }
        testString.innerHTML = finalText;
      }
    }
  }
};
