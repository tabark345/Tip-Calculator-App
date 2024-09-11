const inpBill = document.getElementById('bill'),
    inpPeople = document.getElementById('people'),
    resultTip = document.getElementById('tip-amount'),
    resultTotal = document.getElementById('total-amount'),
    inpReset = document.getElementById('reset'),
    errorPeople = document.getElementById('error-people'); // Add this line

const inpCustom = document.getElementById('custom-tip'),
    tip5 = document.getElementById('tip-5'),
    tip10 = document.getElementById('tip-10'),
    tip15 = document.getElementById('tip-15'),
    tip25 = document.getElementById('tip-25'),
    tip50 = document.getElementById('tip-50')

// Define tipButtons array
const tipButtons = [tip5, tip10, tip15, tip25, tip50];

let currentTipPercentage = 0;

function displayError() {
    errorPeople.style.display = 'block';
    resultTip.textContent = '$0.00';
    resultTotal.textContent = '$0.00';
}

function youCanReset() {
    const billFilled = inpBill.value.trim() !== '';
    const peopleFilled = inpPeople.value.trim() !== '';
    const tipSelected = currentTipPercentage > 0;

    if (billFilled && peopleFilled && tipSelected) {
        inpReset.classList.add('can-reset');
    } else {
        inpReset.classList.remove('can-reset');
    }
}

function calculateTip() {
    const billAmount = parseFloat(inpBill.value);
    const numberOfPeople = parseInt(inpPeople.value);
    
    if (isNaN(billAmount) || isNaN(numberOfPeople) || numberOfPeople <= 0) {
        displayError();
        return;
    }
    
    errorPeople.style.display = 'none';
    
    const tipAmount = (billAmount * currentTipPercentage) / 100;
    const totalAmount = billAmount + tipAmount;
    const tipPerPerson = tipAmount / numberOfPeople;
    const totalPerPerson = totalAmount / numberOfPeople;
    
    resultTip.textContent = `$${tipPerPerson.toFixed(2)}`;
    resultTotal.textContent = `$${totalPerPerson.toFixed(2)}`;

    youCanReset();
}

function setTipPercentage(percentage, button = null) {
    currentTipPercentage = percentage;
    inpCustom.value = '';
    calculateTip();

    // Remove 'active' class from all buttons
    tipButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add 'active' class to the clicked button if provided
    if (button) {
        button.classList.add('active');
    }

    youCanReset();
}

tipButtons.forEach((button, index) => {
    const percentage = (index + 1) * 5;
    button.addEventListener('click', () => setTipPercentage(percentage, button));
});

inpCustom.addEventListener('input', () => {
    currentTipPercentage = parseFloat(inpCustom.value) || 0;
    calculateTip();
    // Remove 'active' class from all buttons when custom input is used
    tipButtons.forEach(btn => btn.classList.remove('active'));
    youCanReset();
});

[inpBill, inpPeople].forEach(input => {
    input.addEventListener('input', () => {
        calculateTip();
        youCanReset();
    });
});

inpReset.addEventListener('click', () => {
    // ... existing reset code ...
    inpBill.value = '';
    inpPeople.value = '';
    inpCustom.value = '';
    currentTipPercentage = 0;
    resultTip.textContent = '$0.00';
    resultTotal.textContent = '$0.00';
    errorPeople.style.display = 'none';
    tipButtons.forEach(btn => btn.classList.remove('active'));
    inpReset.classList.remove('can-reset');
});

youCanReset();
calculateTip();
