import axios from 'axios';

export async function getNeighbors(country) {
    return await axios.get(`https://travelbriefing.org/${country}?format=json`);
};