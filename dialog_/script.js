const updateButton = document.getElementById('updateDetails');
const cancelButton = document.getElementById('cancel');
const selectBrowser = document.getElementById('browser');
const result = document.getElementById('result');
const dialog = document.getElementById('browserDialog');

updateButton.addEventListener('click', function () {
    dialog.showModal();
    console.log('asdasdasd');
});

selectBrowser.addEventListener('change', function (e) {
    dialog.returnValue = e.target.value;
});

dialog.addEventListener('close', function () {
    result.innerHTML = dialog.returnValue;
});

cancelButton.addEventListener('click', function () {
    dialog.close('Browser not chosen');
});
