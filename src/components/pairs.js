import React, { useState } from 'react';
import axios from 'axios';
import {Button, Grid} from '@mui/material';

import { exportCSV, PairCreator } from './pairCreator';
import { ConvertFile } from './convertFile/convertFile';
import './pairs.css';

export const Pairs = () => {

    const [ file, setFile ] = useState("");
    const handleFileChange = (e) => {
        console.log('file selected');
        if (e.target.files) {
            setFile(e.target.files[0]);
            console.log(file);
            //ConvertFile(file)
        }
    };





    const exportTemplate = () => {
        exportCSV();
    }


    const handlePairGenerate = (data) => {

    }

    return(
        <div className="importMain">
            <div className="importInnerContainer">
                <h1 className="heading">Pair Generator</h1>
                {!file ?
                    <div>
                        <Grid container spacing={2}>
                            <Grid item sm={7}>
                                <Button variant="contained" component="label" fullWidth>
                                    Choose File
                                    <input hidden accept=".csv" multiple type="file" onChange={handleFileChange}/>
                                </Button>
                            </Grid>
                            <Grid item sm={5}>
                                <Button variant="contained" fullWidth onClick={exportTemplate}>
                                    Download Template
                                </Button>
                            </Grid>
                        </Grid>
                        
                    </div>
                    : <div>
                        <ConvertFile file={file}/>
                        
                    </div>}
                    
            </div>
        </div>
    )
}
