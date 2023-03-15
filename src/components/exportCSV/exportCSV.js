export const exportCSV = (newPairs) => {
    let file;
    let fName = "pairs.csv";
    if(newPairs) {
        file = newPairs.join("\r\n");
    } else {
        file = ["Name", "Email", "Previous Pair Email Address"]
        fName = "PairsTemplate.csv";
    }
    let hiddenElement = document.createElement('a');
    hiddenElement.href =  'data:text/csv;charset=utf-8,' + encodeURI(file);
    hiddenElement.target = '_blank';

    hiddenElement.download = fName;
    hiddenElement.click();
}