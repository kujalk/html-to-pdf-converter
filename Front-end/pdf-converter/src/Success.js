import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

const SuccessMessage = (props) => {
  const config = require("./Config.json");

  const handleSubmit = (event) => {
    console.log("Resetting");
    props.reset();
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}></Grid>

      <Grid item xs={4}>
        <Box sx={{ width: "100%" }}>
          <Stack spacing={2}>
            <Alert severity="success">Your File submission is success.</Alert>
          </Stack>

          <br></br>
          <br></br>

          <Stack spacing={2}>
            <Alert severity="info">
              You can access your pdf file at{" "}
              <a
                href={config["s3_bucket_url"] + "/" + props.pdffile}
                target="_blank"
              >
                {config["s3_bucket_url"]}/{props.pdffile}
              </a>
              .
            </Alert>
          </Stack>

          <br></br>
          <br></br>
          <br></br>
          <br></br>

          <Button
            variant="contained"
            onClick={() => {
              handleSubmit();
            }}
          >
            Go To Submission Page
          </Button>
        </Box>
      </Grid>

      <Grid item xs={4}></Grid>
    </Grid>
  );
};

export default SuccessMessage;
