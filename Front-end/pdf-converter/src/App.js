import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Form from "./Form.js";
import Footer from "./Footer.js";
export default function App() {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense" sx={{ justifyContent: "center" }}>
            <Typography variant="h6" color="inherit" component="div">
              HTML String to PDF Converter
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <div>
        <br></br> <br></br>
      </div>

      <Form></Form>
      <Footer></Footer>
    </div>
  );
}
