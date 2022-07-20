const bmiForm = document.getElementById("bmi-form");
const result = document.getElementById("result");

const heightElem = bmiForm.querySelector("#height");
const weightElem = bmiForm.querySelector("#weight");

const tableGuide = document.querySelector(".bmi-guide table");

// find and select row that given bmi belongs to
const selectGuideRow = (bmi) => {
  const rows = tableGuide.tBodies[0].children;

  let rowIndex = Array.from(rows).findIndex((row) => {
    const range = row.children[1];
    const min = +range.dataset.minrange;
    const max = +range.dataset.maxrange;

    return bmi >= min && bmi <= max;
  });

  if (rowIndex > -1) {
    rows[rowIndex].classList.add("selected");
  }
};

// calculate bmi and select row in bmi-guide table
bmiForm.addEventListener("submit", (event) => {
  event.preventDefault();

  result.textContent = "";

  tableGuide
    .querySelectorAll(".selected")
    .forEach((row) => row.classList.remove("selected"));

  const height = Number.parseFloat(heightElem.value.replace(",", ".")) / 100; // convert to meters
  const weight = Number.parseFloat(weightElem.value.replace(",", "."));

  if (!Number.isNaN(height) && !Number.isNaN(weight)) {
    const bmi = (weight / (height * height)).toFixed(1);
    result.textContent = bmi;
    result.innerHTML = `&raquo ${bmi} &laquo;`;
    selectGuideRow(bmi);
  }
});
