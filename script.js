const data = {
  ON: { province: "Ontario", medianRent:1900, medianIncome:65000, minWage:16.55, gasPrice:1.67, groceryIndex:102, taxBurden:34, educationSpending:13000 },
  QC: { province: "Quebec", medianRent:1400, medianIncome:55000, minWage:15.25, gasPrice:1.55, groceryIndex:95, taxBurden:37, educationSpending:12500 },
  AB: { province: "Alberta", medianRent:1500, medianIncome:72000, minWage:15.00, gasPrice:1.45, groceryIndex:101, taxBurden:29, educationSpending:13200 },
  BC: { province: "British Columbia", medianRent:2200, medianIncome:60000, minWage:17.40, gasPrice:1.90, groceryIndex:109, taxBurden:35, educationSpending:12000 },
  NS: { province: "Nova Scotia", medianRent:1300, medianIncome:48000, minWage:15.20, gasPrice:1.60, groceryIndex:100, taxBurden:33, educationSpending:11800 },
  NB: { province: "New Brunswick", medianRent:1200, medianIncome:50000, minWage:15.00, gasPrice:1.65, groceryIndex:98, taxBurden:32, educationSpending:11500 },
  MB: { province: "Manitoba", medianRent:1100, medianIncome:54000, minWage:15.00, gasPrice:1.60, groceryIndex:99, taxBurden:30, educationSpending:12500 },
  SK: { province: "Saskatchewan", medianRent:1100, medianIncome:56000, minWage:15.00, gasPrice:1.58, groceryIndex:100, taxBurden:31, educationSpending:12200 },
  NL: { province: "Newfoundland and Labrador", medianRent:1000, medianIncome:52000, minWage:15.00, gasPrice:1.75, groceryIndex:97, taxBurden:36, educationSpending:11900 },
  PE: { province: "Prince Edward Island", medianRent: 950, medianIncome:50000, minWage:15.00, gasPrice:1.70, groceryIndex:96, taxBurden:32, educationSpending:11700 },
  YT: { province: "Yukon", medianRent:1400, medianIncome:65000, minWage:15.70, gasPrice:1.85, groceryIndex:110, taxBurden:33, educationSpending:13000 },
  NT: { province: "Northwest Territories", medianRent:1600, medianIncome:85000, minWage:15.70, gasPrice:1.95, groceryIndex:115, taxBurden:30, educationSpending:14000 },
  NU: { province: "Nunavut", medianRent:1800, medianIncome:105000, minWage:15.70, gasPrice:2.05, groceryIndex:130, taxBurden:29, educationSpending:15000 }
};

const metrics = {
  rentToIncome: {
    label: "Rent-to-Income (%)",
    calc: (d) => (d.medianRent * 12 / d.medianIncome * 100),
    unit: "%",
  },
  gasAffordability: {
    label: "Gas Affordability (L/hour)",
    calc: (d) => (d.minWage / d.gasPrice),
    unit: "L",
  },
  groceryIndex: {
    label: "Grocery Cost (index)",
    calc: (d) => d.groceryIndex,
    unit: "",
  },
  taxBurden: {
    label: "Tax Burden (%)",
    calc: (d) => d.taxBurden,
    unit: "%",
  },
  educationSpending: {
    label: "Education Spending ($)",
    calc: (d) => d.educationSpending,
    unit: "$",
  },
};

const svg = document.getElementById("canada-map");
const tooltip = document.getElementById("tooltip");
const legend = document.getElementById("legend");
const selector = document.getElementById("metric");

function updateMap() {
  const metricKey = selector.value;
  const metric = metrics[metricKey];
  const values = Object.values(data).map(d => metric.calc(d));
  const min = Math.min(...values);
  const max = Math.max(...values);

  Object.keys(data).forEach(id => {
    const val = metric.calc(data[id]);
    const norm = (val - min) / (max - min);
    const color = `hsl(${120 - norm * 120}, 70%, 60%)`;
    const path = document.getElementById(id);
    if(path) {
      path.style.fill = color;
      path.onmousemove = (e) => {
        const pct = ((e.offsetX / svg.clientWidth)*100).toFixed(1);
        tooltip.style.left = `${e.pageX + 10}px`;
        tooltip.style.top = `${e.pageY + 10}px`;
        tooltip.innerHTML = `<strong>${data[id].province}</strong><br>${metric.label}: ${metric.calc(data[id]).toFixed(2)}${metric.unit}`;
        tooltip.style.opacity = 1;
      };
      path.onmouseout = () => { tooltip.style.opacity = 0; };
    }
  });

  // Legend
  legend.innerHTML = "";
  const steps = 5;
  for(let i = 0; i <= steps; i++){
    const val = min + (max - min) * (i / steps);
    const color = `hsl(${120 - (i/steps)*120}, 70%, 60%)`;
    const box = document.createElement("div");
    box.className = "legend-item";
    box.innerHTML = `<div class="legend-color" style="background:${color}"></div>${val.toFixed(1)}${metric.unit}`;
    legend.appendChild(box);
  }
}

selector.addEventListener("change", updateMap);
window.addEventListener("resize", updateMap);

// Initial
updateMap();
