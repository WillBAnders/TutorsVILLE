import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { ThreeDots } from "react-loader-spinner";
import Utils from "../Utils";

export default function ProfilePage({ profile }) {
  const [updated, setUpdated] = React.useState({});

  function onSubmit(event) {
    event.preventDefault();
    Utils.fetchJson("/profile", {
      method: "PATCH",
      body: JSON.stringify(updated),
    })
      .then((r) => {
        //TODO: Refresh/confirm?
      })
      .catch((error) => {
        alert(`Error ${error.status ?? "(Unexpected)"}: ${error.message}`);
      });
  }

  function update(field, value) {
    setUpdated((fields) => ({ ...fields, [field]: value }));
  }

  if (profile === null) {
    return (
      <div className="loadingContainer">
        <ThreeDots type="ThreeDots" color="#00b22d" height={100} width={100} />
      </div>
    );
  } else {
    return (
      <div>
        <Typography
          className="main-text"
          align="center"
          justifyContent="center"
          sx={{
            fontWeight: 525,
            paddingTop: {
              xs: "30px",
              md: "0px",
            },
          }}
          variant="h2"
        >
          Edit Profile
        </Typography>
        <Box
          alignItems="center"
          justifyContent="center"
          display="flex"
          width="100%"
        >
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
            <Grid container>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  required
                  title="firstname"
                  id="firstname"
                  label="First Name"
                  defaultValue={profile.firstname ?? ""}
                  onChange={(e) => update("firstname", e.target.value)}
                  sx={{ m: 1 }}
                />
                <TextField
                  fullWidth
                  required
                  title="email"
                  id="email"
                  label="Email Address"
                  defaultValue={profile.email ?? ""}
                  onChange={(e) => update("email", e.target.value)}
                  sx={{ m: 1 }}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  required
                  title="lastname"
                  id="lastname"
                  label="Last Name"
                  defaultValue={profile.lastname ?? ""}
                  onChange={(e) => update("lastname", e.target.value)}
                  sx={{ m: 1, pl: 1 }}
                />

                <TextField
                  required
                  fullWidth
                  title="phone"
                  id="phone"
                  label="Phone Number"
                  defaultValue={profile.phone ?? ""}
                  onChange={(e) => update("phone", e.target.value)}
                  sx={{ m: 1, pl: 1 }}
                />
              </Grid>
            </Grid>
            <Button type="submit" title="submit" variant="contained">
              Update
            </Button>
          </Box>
        </Box>
      </div>
    );
  }
}
