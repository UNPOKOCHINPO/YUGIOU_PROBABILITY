document.getElementById("sumForm").addEventListener("input", function () {
    validateNumber();
});
function validateNumber() {
    const errorContainer = document.getElementById("errorContainer");
    const inputs = document.querySelectorAll("input[type='number']");


    let hasError = false;

    yuhatsu_min = parseInt(document.getElementById("yuhatsu_min").value);
    yuhatsu_max = parseInt(document.getElementById("yuhatsu_max").value);
    makuri_min = parseInt(document.getElementById("makuri_min").value);
    makuri_max = parseInt(document.getElementById("makuri_max").value);
    if (yuhatsu_min > yuhatsu_max) {
        hasError = true;
    }
    if (makuri_min > makuri_max) {
        hasError = true;
    }


    inputs.forEach(input => {
        const inputValue = parseInt(input.value);
        const min = parseInt(input.getAttribute("min"));
        const max = parseInt(input.getAttribute("max"));

        if (isNaN(inputValue) || inputValue < min || inputValue > max) {
            hasError = true;
        }
    });


    if (hasError) {
        errorContainer.textContent = "入力が異常だよ。";
        document.getElementById("button").style.display = "none";
    } else {
        errorContainer.textContent = "";
        document.getElementById("button").style.display = "block";
    }
}