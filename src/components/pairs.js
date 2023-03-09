import React, { useState } from 'react';
import { exportCSV, PairCreator } from './pairCreator';
import './pairs.css';

export const Pairs = () => {

    let data;
    const [ file, setFile ] = useState();
    const handleFileChange = (e) => {
  if (e.target.files) {
        setFile(e.target.files[0]);
      }
    };

    const handleUploadClick = async () => {
        if (!file) {
            return;
    }
        // 👇 Uploading the file using the fetch API to the server
    const data = await fetch('https://httpbin.org/post', {
      method: 'POST',
      body: file,
      // 👇 Set headers manually for single file upload
      headers: {
        'content-type': file.type,
        'content-length': `${file.size}`, // 👈 Headers need to be a string
      },
    })
    const response = await data.json();
    let records = (response.data);
    console.log(records);
    let index = records.indexOf("\n");
    const header = records.slice(0,index);
    records = records.slice(index+1, records.length);
    let array = records.split("\r\n");
    let i = 0;
    // while (records.length > 0) {
    //     index = records.indexOf("\n") || records.length;
    //     if(index === -1) {
    //         index = records.length+5;
    //     }
    //     console.log('index', index);
    //     array.push(records.slice(0, index));
    //     records = records.slice(index+1, records.length);
    // }
    console.log("records", array);
    let pairs = await PairCreator(array);
    exportCSV(pairs);

    };

    const handlePairGenerate = (data) => {

    }

    return(
        <div className="importMain">
            <div className="importInnerContainer">
                <h1 className="heading">Pair Generator</h1>
                <div>
                    <input 
                        className="joinInput mt-20"
                        type="file"
                        onChange={handleFileChange}/>
                    <button className="button" onClick={handleUploadClick}>Upload</button>
                </div>
                <div>
                    <button className="button" onClick={handlePairGenerate}>Generate</button>
                </div>
            </div>
        </div>
    )
}
