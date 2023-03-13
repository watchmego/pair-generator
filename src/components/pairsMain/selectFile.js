import { useContext } from "react";
import { Button, Grid } from '@mui/material';
import { exportCSV } from "../pairCreator";
import { PairsContext } from "../../App";

export const SelectFile = () => {

    const [file, setFile] = useContext(PairsContext);
    const handleFileChange = (e) => {
        console.log('file selected');

        if (e.target.files) {
            setFile(e.target.files[0]);
            console.log(file);
        }
    };

    const exportTemplate = () => {
        exportCSV();
    }

    return (
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
    )

}