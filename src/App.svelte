<script>
  let weight = '';
  let unit = 'kilograms';
  let doneness = 'medium';
  let result = '';
  let temperature = '';

  function calculateRoastTime() {
    const floatWeight = parseFloat(weight);
    const weightInKg = unit === 'grams' ? floatWeight / 1000 : floatWeight;
    let timePerKg, targetTemp;

    switch (doneness) {
      case 'rare':
        timePerKg = 30;
        targetTemp = '120-125°F (49-52°C)';
        break;
      case 'medium':
        timePerKg = 45;
        targetTemp = '145°F (63°C)';
        break;
      case 'well':
        timePerKg = 60;
        targetTemp = '160-165°F (71-74°C)';
        break;
      default:
        timePerKg = 45;
        targetTemp = '145°F (63°C)';
    }

    result = `${(weightInKg * timePerKg).toFixed(2)} minutes`;
    temperature = targetTemp;
  }
</script>

<main>
  <h1>Roast Calculator</h1>
  <form on:submit|preventDefault={calculateRoastTime}>
    <div class="form-group">
      <label for="weight">Weight:</label>
      <div class="input-group">
        <input type="number" step="0.01" id="weight" bind:value={weight} required />
        <select bind:value={unit}>
          <option value="kilograms">Kilograms</option>
          <option value="grams">Grams</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label for="doneness">Doneness:</label>
      <div class="radio-group">
        <label>
          <input type="radio" name="doneness" value="rare" bind:group={doneness} /> Rare
        </label>
        <label>
          <input type="radio" name="doneness" value="medium" bind:group={doneness} checked /> Medium
        </label>
        <label>
          <input type="radio" name="doneness" value="well" bind:group={doneness} /> Well Done
        </label>
      </div>
    </div>
    <button type="submit">Calculate</button>
  </form>
  {#if result}
    <div class="result">
      <h2>Roasting Time: {result}</h2>
      <h3>Internal Temperature: {temperature}</h3>
    </div>
  {/if}
</main>

<style>
  main {
    font-family: 'Arial', sans-serif;
    max-width: 600px;
    margin: auto;
    padding: 2rem;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  h1 {
    text-align: center;
    color: #b22222;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  .input-group, .radio-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .radio-group {
    flex-wrap: wrap;
  }

  label {
    font-weight: bold;
    color: #333;
  }

  input[type="number"], select, button {
    padding: 0.5rem;
    font-size: 1rem;
    border: 2px solid #ddd;
    border-radius: 5px;
  }

  input[type="radio"] {
    margin-right: 0.5rem;
  }

  button {
    background-color: #b22222;
    color: white;
    border: none;
    cursor: pointer;
    align-self: flex-start;
  }

  button:hover {
    background-color: #8b0000;
  }

  .result {
    margin-top: 2rem;
    padding: 1rem;
    background-color: #ffe4c4;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  .result h2 {
    color: #8b0000;
  }

  .result h3 {
    color: #b22222;
  }
</style>
