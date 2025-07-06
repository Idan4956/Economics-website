const metrics = {
  rentToIncome: {
    title: "🏠 Median Rent-to-Income Ratio",
    description: "Annual rent as a percentage of median income by province.",
    unit: "%",
    color: "#1a73e8",
    calculate: (entry) => ((entry.medianRent * 12) / entry.medianIncome * 100).toFixed(1),
  },
  gasAffordability: {
    title: "⛽ Gas Affordability (L/hour)",
    description: "How many liters of gas you can buy with 1 hour of minimum wage.",
    unit: "L",
    color: "#e91e63",
    calculate: (entry) => (entry.minWage / entry.gasPrice).toFixed(1),
  },
  groceryIndex: {
    title: "🛒 Grocery Cost Index",
    description: "Relative cost of a basic grocery basket (milk, eggs, bread, etc.).",
    unit: "pts",
    color: "#ff9800",
    calculate: (entry) => entry.groceryIndex,
  },
  taxBurden: {
    title: "📊 Tax Burden",
    description: "Total estimated taxes as % of income (income + sales + property).",
    unit: "%",
    color: "#4caf50",
    calculate: (entry) => entry.taxBurden,
  },
  educationSpending: {
    title: "🎓 Education Spending per Student",
    description: "Average public spending on education per student.",
    unit: "$",
    color: "#9c27b0",
    calculate: (entry) => entry.educationSpending,
  }
};

const data = [
  {
    province: "Ontario",
    medianRent: 1900,
    medianIncome: 65000,
    minWage: 16.55,
    gasPrice: 1.67,
    groceryIndex: 102,
    taxBurden: 34,
    educationSpending: 13000
  },
  {
    province: "Quebec",
    medianRent: 1400,
    medianIncome: 55000,
    minWage: 15.25,
    gasPrice: 1.55,
    groceryIndex: 95,
    taxBurden: 37,
    educationSpending: 12500
  },
  {
    province: "Alberta",
    medianRent: 1500,
    medianIncome: 72000,
    minWage: 15.00,
    gasPrice: 1.45,
    groceryIndex: 101,
    taxBurden: 29,
    educationSpending: 13200
  },
  {
    province: "British Columbia",
    medianRent: 2200,
    medianIncome: 60000,
    minWage: 17.40,
    gasPrice: 1.90,
    groceryIndex: 109,
    taxBurden: 35,
    educationSpending: 12000
  },
  {
    province: "Nova Scotia",
    medianRent: 1300,
    medianIncome: 48000,
    minWage: 15.20,
    gasPrice: 1.60,
    groceryIndex: 100,
    taxBurden: 33,
    educationSpending: 11800
  }
];

const chart = document.getElementById("chart");
const metricSelector = document.getElementById("metric");
const metricDesc = document.getElementById("metric-desc");

function renderChart(metricKey) {
  const metric = metrics[metricKey];
  chart.innerHTML = "";
  metricDesc.textContent = metric.description;

  const values = data.map(entry => parseFloat(metric.calculate(entry)));
  const max = Math.max(...values);

  data.forEach(entry => {
    const value = metric.calculate(entry);
    const percent = (value / max) * 100;

    const bar = document.createElement("div");
    bar.className = "bar";

    const label = document.createElement("div");
    label.className = "bar-label";
    label.textContent = entry.province;

    const barBg = document.createElement("div");
    barBg.className = "bar-bg";

    const barFill = document.createElement("div");
    barFill.className = "bar-fill";
    barFill.style.width = `${percent}%`;
    barFill.style.background = metric.color;
    barFill.textContent = `${value}${metric.unit}`;

    barBg.appendChild(barFill);
    bar.appendChild(label);
    bar.appendChild(barBg);
    chart.appendChild(bar);
  });
}

metricSelector.addEventListener("change", (e) => {
  renderChart(e.target.value);
});

renderChart("rentToIncome");
 