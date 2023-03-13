import axios from "axios";
import { useEffect } from 'react';
import { PairCreator, exportCSV } from "../pairCreator";
import "./convertFile.css";

export const ConvertFile = ({file}) => {
    const handleUploadClick = async (e) => {
        e.preventDefault();
        console.log('upload called', e)
        if (!file) {
            return;
        }
        console.log('converting', file);
        // 👇 Uploading the file using the fetch API to the server
        const url = 'http://192.168.178.33:8000/upload';
        const formData = new FormData();
        formData.append('csv', file);
        //formData.append('fileName', file.name);
        const config = {
        headers: {
            'content-type': 'multipart/form-data',
        },
        };
        console.log('before response is created');
        const response = await axios.post(url, formData);
        console.log('after');
        let records = (response.data);
        let index = records.indexOf("\n");
        //const header = records.slice(0,index);
        records = records.slice(index+1, records.length);
        let array = records.split("\r\n");
        console.log("records", array);
        let pairs = await PairCreator(array);
        exportCSV(pairs);

        
        
      
        
        };

    return(
        <div className="convertContainer">
            <button className="button" onClick={handleUploadClick}>Upload</button>
        </div>
    )
}