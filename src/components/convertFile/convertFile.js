import axios from "axios";
import PropTypes from "prop-types";
import { Button, Stack, CircularProgress, Box, Typography } from "@mui/material";
import { useContext, useState, useEffect } from 'react';
import { PairCreator, exportCSV } from "../pairCreator";
import { PairsContext } from "../../App";
import "./convertFile.css";

const url = 'http://192.168.178.33:8000/upload';
const formData = new FormData();
const config = {
    headers: {
        'content-type': 'multipart/form-data',
    },
};

function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" sx={{color:"white"}} {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" component="div">
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    );
  }
  
  CircularProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     * @default 0
     */
    value: PropTypes.number.isRequired,
  };
  

export const ConvertFile = () => {
    
    const [file] = useContext(PairsContext);
    const [progress, setProgress] = useState(0);

    const handleUploadClick = async (e) => {
        e.preventDefault();
        if (!file) {
            return;
        }
        // 👇 Uploading the file using the fetch API to the server
        
        formData.set('csv', file);
        const response = await axios.post(url, formData, {
            onUploadProgress: (progressEvent) => {
                setProgress(progressEvent.loaded / progressEvent.total * 100);
            }
        });
        let records = (response.data);
        let index = records.indexOf("\n");
        //const header = records.slice(0,index);
        records = records.slice(index+1, records.length);
        let rows = records.split("\r\n");
        let test = rows.map(row => {
          if(row.indexOf("@") > -1) {
            return row.split(",");
          }
        })
        console.table(test);
        let pairs = await PairCreator(test);
        exportCSV(pairs);
        
        
      
        
        };

    return(
        <div className="convertContainer">
            <Button variant="contained" component="label" fullWidth
                onClick={handleUploadClick}>
                    <Stack direction="row" sx={{
                        justifyContent:"space-between",
                        width: "100%",
                        alignItems:"center"
                    }}>
                        <div>
                            {file.name}
                        </div>
                        <CircularProgressWithLabel className="progress" value={progress} />
                        <div>Upload</div>
                    </Stack>
            </Button>
        </div>
    )
}