import axios from 'axios';

export default axios.create({
    baseURL: 'https://free-nba.p.rapidapi.com/teams',
    headers: {
        'X-RapidAPI-Key': '2c3d09c435msh4e1e09f0816ccb3p1a47afjsn16fa61930f58',
        'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
    },
})
