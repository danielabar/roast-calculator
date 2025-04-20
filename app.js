document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("roastForm");
  const output = document.getElementById("output");
  const cookTimeEl = document.getElementById("cookTime");
  const targetTempEl = document.getElementById("targetTemp");
  const pullTempEl = document.getElementById("pullTemp");

  const donenessData = {
    Rare: { f: 125, c: 52, minPerLb: 15, minPerKg: 33 },
    "Medium Rare": { f: 135, c: 57, minPerLb: 20, minPerKg: 44 },
    Medium: { f: 145, c: 63, minPerLb: 25, minPerKg: 55 },
    "Medium Well": { f: 150, c: 66, minPerLb: 30, minPerKg: 66 },
    "Well Done": { f: 160, c: 71, minPerLb: 35, minPerKg: 77 },
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const weight = parseFloat(form.weight.value);
    const unit = form.unit.value;
    const doneness = form.doneness.value;
    const tempUnit = form.tempUnit.value;

    if (!weight || weight <= 0) {
      alert("Please enter a valid roast weight.");
      return;
    }

    const data = donenessData[doneness];
    const minutesPerUnit = unit === "kg" ? data.minPerKg : data.minPerLb;
    const totalMinutes = weight * minutesPerUnit;

    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);
    const readableTime =
      hours > 0
        ? `${hours} hour${hours !== 1 ? "s" : ""} and ${minutes} minute${
            minutes !== 1 ? "s" : ""
          }`
        : `${minutes} minute${minutes !== 1 ? "s" : ""}`;

    const targetTemp = tempUnit === "C" ? data.c : data.f;
    const pullTemp = targetTemp - (tempUnit === "C" ? 3 : 5);

    cookTimeEl.textContent = `Estimated Cook Time: ${readableTime}`;
    targetTempEl.textContent = `Target Internal Temp: ${targetTemp}°${tempUnit}`;
    pullTempEl.textContent = `Remove from oven at: ${pullTemp}°${tempUnit}`;

    output.classList.remove("hidden");
  });

  form.addEventListener("reset", () => {
    output.classList.add("hidden");
  });
});
