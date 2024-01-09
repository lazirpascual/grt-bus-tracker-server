const express = require('express');
const app = express();
const GtfsRealtimeBindings = require('gtfs-realtime-bindings');
const axios = require('axios');

async function fetchRealtimeData() {
  try {
    const response = await axios.get(
      'http://webapps.regionofwaterloo.ca/api/grt-routes/api/vehiclepositions',
      { responseType: 'arraybuffer' }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching GTFS Realtime data:', error);
    return null;
  }
}

app.get('/', async (req, res) => {
  const response = await fetchRealtimeData();
  var feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(response);
  res.send(feed);
});

app.listen(3000, async () => {
  console.log('server started');
});
