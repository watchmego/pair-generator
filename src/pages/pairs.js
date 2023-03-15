import{ useContext } from 'react';

import { ConvertFile } from '../components/convertFile/convertFile';
import { SelectFile } from '../components/pairsMain/selectFile';
import { PairsContext } from '../App';
import './pairs.css';

export const Pairs = () => {

    //initalise file context
    const {file} = useContext(PairsContext);

    //if a file has been selected, the upload box will show    
    return(
        <div className="importMain">
            <div className="importInnerContainer">
                <h1 className="heading">Pair Generator</h1>
                {!file ?
                    <SelectFile /> : <ConvertFile />}
                    
            </div>
        </div>
    )
}
