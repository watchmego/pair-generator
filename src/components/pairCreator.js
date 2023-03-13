export const PairCreator = async (data) => {
    let pairs = [];
    
    //data.splice(0,1);
    pairs[0] = ["P1", "P1 Email", "P2", "P2 Email"];
    console.log(data[0], data.length);
    const len = data.length / 2;
    let random;
    let pair;
    for(let i = 1; i <= len; i++) {
        console.log(data)
        pairs[i] = data.splice(0, 1);
        for(let j = 0; j < len; j++) {
            random = Math.floor(Math.random() * data.length);
            try {
                if(data[random][1] !== data[0][2] && data[random].length > 10) {
                    pairs[i][1] = data[random];
                    data.splice(random, 1);
                    //data = data.slice(1, len);
                    break;
                }
            } catch (e) {console.log('errored')};
        }
        console.log('pairs', pairs)
        
        
    }
    return pairs;
}

export const exportCSV = (newPairs) => {
    let file;
    let fName = "pairs.csv";
    if(newPairs) {
        console.log(newPairs);
        file = newPairs.join("\r\n");
    } else {
        //file = ["P1", "P1 Email", "P2", "P2 Email\r\n" ]
        file = ["Name", "Email", "Previous Pair Email Address"]
        fName = "PairsTemplate.csv";
    }
    let hiddenElement = document.createElement('a');
    hiddenElement.href =  'data:text/csv;charset=utf-8,' + encodeURI(file);
    hiddenElement.target = '_blank';

    hiddenElement.download = fName;
    hiddenElement.click();
}
