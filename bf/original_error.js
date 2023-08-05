document.getElementById("sumForm").addEventListener("input", function () {
    validateNumber();
});
function validateNumber() {
    const errorContainer = document.getElementById("errorContainer");
    const inputs = document.querySelectorAll("input[type='number']");


    let hasError = false;

    deck_num = -1;
    sum_of_inputs = 0;
    inputs.forEach(input => {
        const inputValue = parseInt(input.value);
        if (deck_num == -1) {
            deck_num = inputValue;
        } else {
            sum_of_inputs += inputValue;
        }

        if (deck_num < sum_of_inputs) {
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