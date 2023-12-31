function calculateBMI() {
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const ageInput = document.getElementById('age');
    const genderInput = document.getElementById('gender');
    const unitsInput = document.getElementById('units');
    
    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value);
    const age = parseInt(ageInput.value);
    const gender = genderInput.value;
    const units = unitsInput.value;

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0 || age <= 0) {
        document.getElementById('result').innerHTML = 'Invalid input. Please enter valid values for weight and height.';
        return;
    }

    fetch('/calculateBMI', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ weight, height, units }),
    })
    .then(response => response.json())
    .then(data => {
        if(age < 14){
            data.bmi = data.bmi * 1.1; 
        }
        else if(age < 21){
            data.bmi = data.bmi * 1.05; 
        }
        else if(age < 55){
            data.bmi = data.bmi;
        }
        else{
            data.bmi = data.bmi * 1.1; 
        }
        if(gender == 'female'){
            data.bmi = data.bmi * 1.15;
        }
        if(units != 'metric'){
            data.bmi = data.bmi * 703/144;
        }
        if(data.bmi < 18.5){
            document.getElementById("result").innerHTML=`Underweight. Your BMI is: ${data.bmi.toFixed(2)}`;
        }
        else if(data.bmi >= 18.5 && data.bmi < 24.9){
            document.getElementById("result").innerHTML=`normal weight. Your BMI is: ${data.bmi.toFixed(2)}`;
        }
        else{
            document.getElementById("result").innerHTML=`Overweight. Your BMI is: ${data.bmi.toFixed(2)}`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
