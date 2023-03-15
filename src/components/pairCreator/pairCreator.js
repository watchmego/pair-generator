export const PairCreator = async (data) => {
    
    //create base array for CSV export
    let pairs = [["P1", "P1 Email", "P2", "P2 Email"]];
    //number of pairs that will be created
    const len = data.length / 2;

    let random, previousPair;

    //create pairs from input data
    for(let i = 1; i <= len; i++) {

        //select first person in data array
        pairs[i] = [data[0][0], data[0][1]];
        //set the previous pair so they aren't matched again
        previousPair = data[0][2];
        //remove the first person from the array
        data.splice(0, 1);

        //loop to get a random user. Try 10 times in case the same person is found (limited to prevent endless loop)
        for(let j = 0; j < 10; j++) {
            random = Math.floor(Math.random() * data.length);

            try {
                //conditional to check previous pairing, and that there is valid data
                if(data[random] && data[random][1] !== previousPair && data[random][1].length > 10) {
                    //create pair and remove person from data array
                    pairs[i].push(data[random][0], data[random][1]);
                    data.splice(random, 1);
                    break;
                }
            } catch (e) {console.log('errored',e)};
        }
        //in case there is a conflict (e.g. previous pairing)
        if(!pairs[i][3]) {
            [pairs[i][2], pairs[i][3]] = [pairs[1][2], pairs[1][3]];
            [pairs[1][2], pairs[1][3]] = [data[random][0], data[random][1]];
        }

    }
    //informational message if there are an odd number of people
    if(len % 1 > 0) {
        pairs.push([data[0][0], data[0][1], `Error: Uneven number of participants; unable to pair ${data[0][0]}`]);
    }

    return pairs;
}


