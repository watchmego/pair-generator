import{ useContext } from 'react';

import { ConvertFile } from './convertFile/convertFile';
import { SelectFile } from './pairsMain/selectFile';
import { PairsContext } from '../App';
import './pairs.css';

export const Pairs = () => {

    const {file} = useContext(PairsContext);

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
