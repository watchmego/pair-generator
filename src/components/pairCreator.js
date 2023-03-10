export const PairCreator = async (data) => {
    
    //data.splice(0,1);
    let pairs = [["P1", "P1 Email", "P2", "P2 Email"]];
    const len = data.length / 2;
    let random, previousPair;

    for(let i = 1; i <= len; i++) {
        console.log(len);
        pairs[i] = [data[0][0], data[0][1]];
        previousPair = data[0][2];
        data.splice(0, 1);

        for(let j = 0; j < 10; j++) {
            random = Math.floor(Math.random() * data.length);

            try {
                if(data[random] && data[random][1] !== previousPair && data[random][1].length > 10) {
                    pairs[i].push(data[random][0], data[random][1]);
                    pairs[i].flat();
                    data.splice(random, 1);
                    break;
                }
            } catch (e) {console.log('errored',e)};
        }
        if(!pairs[i][3]) {
            [pairs[i][2], pairs[i][3]] = [pairs[1][2], pairs[1][3]];
            [pairs[1][2], pairs[1][3]] = [data[random][0], data[random][1]];
        }

    }
    if(len % 1 > 0) {
        pairs.push([data[0][0], data[0][1], `Error: Uneven number of participants; unable to pair ${data[0][0]}`]);
    }

    return pairs;
}

export const exportCSV = (newPairs) => {
    let file;
    let fName = "pairs.csv";
    if(newPairs) {
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
