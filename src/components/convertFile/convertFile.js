import axios from "axios";
import PropTypes from "prop-types";
import { Button, Stack, CircularProgress, Box, Typography } from "@mui/material";
import { useContext, useState } from 'react';
import { PairCreator, exportCSV } from "../pairCreator";
import { PairsContext } from "../../App";
import "./convertFile.css";

//const url = 'http://192.168.178.33:8000/upload';
const url = 'https://httpbin.org/post';
const fileData = new FormData();
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

    const errorCheck = (file) => {
      console.log('error check');
    }
    const handleUploadClick = async (e) => {
        e.preventDefault();
        if (!file) {
            return;
        }
        // 👇 Uploading the file using the fetch API to the server
        errorCheck(file);
        fileData.set('csv', file);
        const response = await axios.post(url, fileData, {
            ...config,
            onUploadProgress: (progressEvent) => {
                setProgress(progressEvent.loaded / progressEvent.total * 100);
            }
        });
        
        let rows = response.data.files.csv.split(/\r?\n/);
        
        let data = rows.reduce((allRows, currRow) => {
          console.log(currRow);
          if (currRow.indexOf("@") > -1) {
            let split = currRow.split(",");
            console.log(split);
            return [
              ...allRows,
              split
            ]
          }
          return allRows;
        },[])

        let pairs = await PairCreator(data);
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