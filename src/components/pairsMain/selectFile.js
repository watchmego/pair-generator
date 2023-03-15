import { useContext, useState } from "react";
import { Button, Grid, Dialog, DialogContent, DialogContentText } from '@mui/material';
import { exportCSV } from "../pairCreator";
import { PairsContext } from "../../App";

export const SelectFile = () => {

    const [setFile] = useContext(PairsContext);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleFileChange = (e) => {
        const regex = /.*csv$/;
        if(!e.target.files[0].name.match(regex)) {
          setError("Please choose a valid CSV file");
          setOpen(true);
        } else if (e.target.files) {
            setFile(e.target.files[0]);
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
            <div>No data is stored or cached by the server. Source code available here: <a href="https://github.com/watchmego/pair-generator/">source</a></div>
            <Dialog 
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {error}
                    </DialogContentText>
                </DialogContent>
                </Dialog>

        </div>
    )

}