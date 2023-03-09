export const PairCreator = async (data) => {
    let pairs = [];
    
    //data.splice(0,1);
    pairs[0] = ["P1", "P1 Email", "P2", "P2 Email"];
    console.log(data[0], data.length);
    const len = data.length / 2;
    let random;

    for(let i = 1; i <= len; i++) {
        console.log(data)
        pairs[i] = data.splice(0, 1);
        random = Math.floor(Math.random() * data.length);
        pairs[i][1] = data[random];
        data.splice(random, 1);
        console.log('pairs', pairs)
        
        
    }
    return pairs;
}

export const exportCSV = (newPairs) => {
    let file = newPairs.join("\r\n");
    let hiddenElement = document.createElement('a');
    hiddenElement.href =  'data:text/csv;charset=utf-8,' + encodeURI(file);
    hiddenElement.target = '_blank';

    hiddenElement.download = 'pairs.csv';
    hiddenElement.click();
}
