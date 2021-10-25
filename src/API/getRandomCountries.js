import axios from 'axios';

export async function getRandomCountries() {
    return await axios.get('https://travelbriefing.org/countries.json');
};