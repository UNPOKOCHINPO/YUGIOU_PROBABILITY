document.getElementById("sumForm").addEventListener("input", function () {
    validateNumber();
});
function validateNumber() {
    const errorContainer = document.getElementById("errorContainer");
    const inputs = document.querySelectorAll("input[type='number']");


    let hasError = false;

    deck_num = -1;

    inputs.forEach(input => {
        const inputValue = parseInt(input.value);
        const min = parseInt(input.getAttribute("min"));
        const max = parseInt(input.getAttribute("max"));
        if (deck_num == -1) {
            deck_num = inputValue;
        } else {
            if (deck_num < inputValue) {
                hasError = true;
            }
        }

        if (isNaN(inputValue) || inputValue < min || inputValue > max) {
            hasError = true;
            input.setCustomValidity("遊戯王のルールを満たさないよ！");
        } else {
            input.setCustomValidity("");
        }
    });


    if (hasError) {
        errorContainer.textContent = "遊戯王のルールを満たさないよ！";
        document.getElementById("button").style.display = "none";
    } else {
        errorContainer.textContent = "";
        document.getElementById("button").style.display = "block";
    }
}