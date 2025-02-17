import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  
  // TODO: GET weather data from city name
  try {
    const cityName = req.body.city;
    const weatherData = await WeatherService.getWeatherForCity(cityName);
    await HistoryService.addCity(cityName);
    // TODO: save city to search history
    return res.status(200).json(weatherData);

    
  }catch(error) {
   return res.status(500).json({ error: 'Failed to fetch weather data'});
  }
});

// TODO: GET search history
router.get('/history', async (req, res) => {
try {
  const history = await HistoryService.getCities();
  return res.status(200).json(history);
}catch(error){
  return res.status(500).json({ error: 'Failed to retrieve search history' });
}
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  const id = req.params.id;
  await HistoryService.removeCity(id);
  res.status(202).send();
});

export default router;
