import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import {Grid, Container, Typography, Box} from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import {useEffect, useState} from "react";

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
      getCloudflareJSON().then((data) => {
          console.log(data);
          setData(data);
      })
  }, [])

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
          <Box>
              <Typography variant="body1">IP address: {data?.ip}</Typography>
              <Typography variant="body1">Location: {data?.loc}</Typography>
          </Box>
      </Container>
    </>
  );
}

async function getCloudflareJSON() {
    let data = await fetch('https://1.1.1.1/cdn-cgi/trace').then(res=>res.text())
    let arr = data.trim().split('\n').map(e=>e.split('='))
    return Object.fromEntries(arr)
}
