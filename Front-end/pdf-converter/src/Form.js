import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import axios from "axios";
import SuccessMessage from "./Success.js";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";

export default function Form() {
  const config = require("./Config.json");
  const [pdfname, setPdfName] = React.useState("");
  const [status, setStatus] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [formerror, setFormError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setFormError("");
    setValue("");
    setStatus(false);
    setPdfName("");
  }, []);

  const resetValues = () => {
    setFormError("");
    setPdfName("");
    setStatus(false);
    setValue("");
    setLoading(false);
  };

  const handleContent = (event) => {
    setValue(event.target.value);
    setFormError("");
  };

  const handlePDF = (event) => {
    setPdfName(event.target.value);
    setFormError("");
  };

  const callAPI = () => {
    const data = { pdf_name: pdfname, html_string: value };
    setLoading(true);

    axios
      .post(config["api_gw_url"], data)
      .then((response) => {
        console.log(response.data);

        if (response.data === "Success") {
          setStatus(true);
        } else {
          setFormError(response.data);
        }
      })
      .catch((error) => {
        console.log("Error is : " + error);
        setLoading(false);
        setStatus(false);
        setFormError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = (event) => {
    setFormError("");
    setStatus(false);

    console.log("Button Clicked : ");
    console.log("PDF Name is : " + pdfname + " and Content is : " + value);

    let pattern = /.pdf$/;

    if (pattern.test(pdfname)) {
      console.log("Check content");
      if (value === "" || value === null) {
        setFormError("Content cannot be empty");
      } else {
        //call the axios function
        callAPI();
      }
    } else {
      setFormError("Make sure file name ends with .pdf");
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {!status ? (
        <Grid container spacing={2}>
          <Grid item xs={4}></Grid>

          <Grid item xs={4}>
            <Box sx={{ width: "100%" }}>
              <Stack spacing={2}>
                <TextField
                  required
                  id="pdf-name"
                  label="PDF Name"
                  defaultValue=""
                  //variant="standard"
                  onChange={handlePDF}
                />
              </Stack>

              <br></br>
              <br></br>

              <Stack spacing={2}>
                <TextField
                  required
                  id="text-area"
                  label="Contents"
                  placeholder=""
                  multiline
                  //variant="standard"
                  inputProps={{ spellCheck: "false" }}
                  onChange={handleContent}
                />
              </Stack>

              <br></br>
              <br></br>
              <br></br>
              <br></br>

              <Stack spacing={2}>
                <LoadingButton
                  onClick={handleSubmit}
                  endIcon={<SendIcon />}
                  loading={loading}
                  loadingPosition="center"
                  //loadingIndicator="Processing"
                  variant="contained"
                >
                  Convert
                </LoadingButton>
              </Stack>
            </Box>

            <br></br>
            <br></br>
            <br></br>

            {formerror === "" ? (
              ""
            ) : (
              <Alert severity="error">{formerror}</Alert>
            )}
          </Grid>

          <Grid item xs={4}></Grid>
        </Grid>
      ) : (
        <SuccessMessage reset={resetValues} pdffile={pdfname}></SuccessMessage>
      )}
    </Box>
  );
}
