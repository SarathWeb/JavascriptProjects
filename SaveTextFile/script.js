const textarea = document.querySelector("textarea"),
fileNameInput = document.querySelector(".file-name input"),
selectMenu = document.querySelector(".save-as select"),
saveBtn = document.querySelector(".save-btn");

selectMenu.addEventListener('change',()=>{
    selectedOption = selectMenu.options[selectMenu.selectedIndex].text;
    optionName = selectedOption.split(' ')[0];
    saveBtn.innerHTML = `Save as ${optionName} File`;
})

saveBtn.addEventListener('click',()=>{
    const blob = new Blob([textarea.value],{type:selectMenu.value});
    url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.download = fileNameInput.value;
    a.href = url;
    a.click();
})