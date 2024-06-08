import React from "react";
import Typography from "@mui/material/Typography";
import "./dashboard.css";
import { Gauge } from "@mui/x-charts/Gauge";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

export const DashboardContent = () => {
  const chartSetting = {
    yAxis: [
      {
        label: "rainfall (mm)",
      },
    ],
    width: 500,
    height: 300,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-20px, 0)",
      },
    },
  };
  const dataset = [

    {

      question: "question 1",
    },
    {

      question: "question 2",
    },
    {

      question: "question 3",
    },
    {

      question: "question 4",
    },
    {

      question: "question 5",
    },
    {

      question: "question 61",
    },
  ];
  const listeexams = [
    {
      examin: "examin A",
    },
    {
      examin: "examin B ",
    },
    {
      examin: "examin C",
    },
    {
      examin: "examin D",
    },
    {
      examin: "examin E",
    },
    {
      examin: "examin F",
    },
  ];
  const mounth = [
    {
      month: "Jan",
    },
    {
      month: "Fev",
    },
    {
      month: "Mar",
    },
    {
      month: "Apr",
    },
    {
      month: "May",
    },
    {
      month: "June",
    },
    {
      month: "July",
    },
    {
      month: "Aug",
    },
    {
      month: "Sept",
    },
    {
      month: "Oct",
    },
    {
      month: "Nov",
    },
    {
      month: "Dec",
    },
  ];
  const exams = [
    {
      value: "Exam1",
      label: "Exam1",
    },
    {
      value: "Exam2",
      label: "Exam2",
    },
    {
      value: "Exam3",
      label: "Exam3",
    },
  ];
  const years = [
    {
      value: "2022",
      label: "2022",
    },
    {
      value: "2023",
      label: "2023",
    },
    {
      value: "2024",
      label: "2024",
    },
  ];
  return (
    <Grid className="dashboard-content" container spacing={5}>
      <Grid item xs={6}>
        <Typography className="title" variant="h5" component="div">
          Pourcentage de reussite:
        </Typography>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Grid container spacing={[1, 5]}>
              <Grid item xs={6}>
                <Gauge
                  className="custom-gauge"
                  value={75}
                  startAngle={0}
                  endAngle={360}
                  innerRadius="77%"
                  outerRadius="100%"
                  height={390}
                  // ...
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="select-exam"
                  select
                  label="Exams"
                  helperText="Please select your Exam"
                >
                  {exams.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid className="custom-items" item xs={6}>
        <Typography className="title" variant="h5" component="div">
          Nombre des examens passé par mois:
        </Typography>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Grid container spacing={[5, 1]}>
              <Grid item xs={12}>
                <Grid container spacing={5}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="select-exam"
                      select
                      label="Exams"
                      helperText="Please select your Exam"
                    >
                      {exams.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="select-year"
                      select
                      label="year"
                      helperText="Please select the year"
                    >
                      {years.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <LineChart
                  dataset={mounth}
                  xAxis={[{ scaleType: "band", dataKey: "month" }]}
                  series={[
                    {
                      data: [2, 5.5, 2, 8.5, 1.5, 5],
                    },
                  ]}
                  width={500}
                  height={300}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Typography className="title" variant="h5" component="div">
          Participation des Étudiants aux Examens et Pourcentage de Réussite:
        </Typography>

        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <BarChart
              dataset={listeexams}
              xAxis={[{ scaleType: "band", dataKey: "examin" }]}
              series={[
                {
                  data: [3, 4, 1, 6, 5, 7],
                  stack: "A",
                  label: "Pourcentage de réeeusite",
                },
                {
                  data: [4, 3, 1, 5, 8, 6],
                  stack: "A",
                  label: "Pourcentage d'echec ",
                },
              ]}
              width={600}
              height={350}
            />
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Typography className="title" variant="h5" component="div">
           Pourcentage de Réussite de chaque question pour un examin:
        </Typography>

        <Card sx={{ minWidth: 275 }}>
          <CardContent>
          <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="select-exam"
                  select
                  label="Exams"
                  helperText="Please select your Exam"
                >
                  {exams.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            <BarChart
              dataset={dataset}
              xAxis={[{ scaleType: "band", dataKey: "question" }]}
              series={[
                
                  {
                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                  },
                
              ]}
              {...chartSetting}
            />
          </CardContent>

        </Card>
      </Grid>
    </Grid>
  );
};
