import axios from "axios";
import PropTypes from "prop-types";
import { Button, Stack, CircularProgress, Box, Typography } from "@mui/material";
import { useContext, useState } from 'react';
import { PairCreator } from "../pairCreator/pairCreator";
import { exportCSV } from '../exportCSV/exportCSV'
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

//function to show a circular progress box for the file upload
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
  
//function used to upload and convert file
export const ConvertFile = () => {
    
    const {file} = useContext(PairsContext);
    const [progress, setProgress] = useState(0);

    //Future feature to error check file:
    const errorCheck = (file) => {
    }

    //when upload is clicked...
    const handleUploadClick = async (e) => {
        //not sure if necessary, using to prevent unexpected behaviour
        e.preventDefault();

        //error check (future feature)
        errorCheck(file);
        //set formData to include file
        fileData.set('csv', file);
        // 👇 Uploading the file using the fetch API to the server
        const response = await axios.post(url, fileData, {
            ...config,
            onUploadProgress: (progressEvent) => {
                setProgress(progressEvent.loaded / progressEvent.total * 100);
            }
        });

        //split csv into array of arrays, discard rows without an email address
        let data = response.data.files.csv
                    .split(/\r?\n/)
                    .filter(row => row.includes('@'))
                    .map(row => row.split(','));

        //create pairs from data
        let pairs = await PairCreator(data);

        //export/download CSV
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