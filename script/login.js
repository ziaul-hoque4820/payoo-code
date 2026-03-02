document.getElementById('login-btn').addEventListener('click', (event) => {
    event.preventDefault();

    // 1. get the mobile number from input value
    const numberInput = document.getElementById('input-number');
    const contactNumber = numberInput.value.trim();
    console.log(contactNumber);

    // 2. get the pin number from pin valie
    const inputPin = document.getElementById('input-pin');
    const pin = inputPin.value.trim();
    console.log(pin);

    if (!contactNumber || !pin) {
        alert('Please fill in both Mobile Number and Pin.');
        return;
    }
    if (contactNumber.length !== 11 || pin.length !== 4) {
        alert('Mobile Number must be 11 characters and Pin must be 4 digits.');
        return;
    }

    if (contactNumber == '01234567890' && pin == '1234') {
        alert('Login Success!');
        window.location.href = '../home.html';
    } else {
        alert("Invalid Mobile Number or Pin!");
    }

})