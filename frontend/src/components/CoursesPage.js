import React from "react";
import {
  Box,
  Card,
  CardHeader,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import AsyncWrapper from "./AsyncWrapper";
import Utils from "../Utils";

export default function CoursesPage() {
  async function loadData() {
    const response = await Utils.fetchJson("/courses");
    return response.body;
  }

  function Component({ data }) {
    const [filter, setFilter] = React.useState({ original: "", uppercase: "" });

    return (
      <div className="Courses">
        <Stack direction="column" alignItems="center" justifyContent="center">
          <Typography className="main-text" variant="h2">
            Courses
          </Typography>
        </Stack>
        <Box
          display="flex"
          width="100%"
          alignItems="center"
          justifyContent="center"
        >
          <Paper
            elevation={0}
            sx={{
              width: "400px",
              margin: "10px",
              maxWidth: "750px",
            }}
          >
            <TextField
              value={filter.original}
              fullWidth
              title="SearchBar"
              className="SearchBar"
              id="SearchBar"
              label="Search Courses"
              variant="outlined"
              name="SearchBar"
              onChange={(e) =>
                setFilter({
                  original: e.target.value,
                  uppercase: e.target.value.toUpperCase(),
                })
              }
              inputProps={{
                "data-testid": "SearchBarin",
                title: "SearchBarInput",
              }}
            />
          </Paper>
        </Box>
        <Box
          display="flex"
          width="100%"
          alignSelf="center"
          alignItems="center"
          justifyContent="center"
        >
          <Paper
            elevation={0}
            sx={{
              width: { xs: "95%", md: "28%" },
            }}
          >
            <Stack
              direction="column"
              spacing={{ xs: 1, sm: 2, md: 2.5 }}
              data-testid="buttonStack"
              title="buttonStack"
            >
              {data.courses
                .filter((c) =>
                  (c.code + c.name).toUpperCase().includes(filter.uppercase)
                )
                .map((c) => (
                  <Link
                    key={c.code}
                    to={`/courses/${c.code}`}
                    style={{ textDecoration: "none", color: "blue" }}
                  >
                    <Card>
                      <CardHeader
                        title={c.code.toUpperCase()}
                        subheader={c.name}
                      />
                    </Card>
                  </Link>
                ))}
            </Stack>
          </Paper>
        </Box>
      </div>
    );
  }

  return <AsyncWrapper handler={loadData} component={Component} />;
}
