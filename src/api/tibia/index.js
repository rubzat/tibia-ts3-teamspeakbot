import axios from 'axios';

const TIBIA_DATA_API_URL = 'https://api.tibiadata.com/v2/';

export default class TibiaAPI {
  constructor(worldName) {
    this.worldName = worldName;
  }
  
  async getCharacterInformation(characterName) {
    const {
      data: {
        characters: {
          data: characterData,
          deaths: kills,
          other_characters: characters,
        }
      }
    } = await axios.get(`${TIBIA_DATA_API_URL}characters/${encodeURIComponent(characterName)}.json`);
    const status = await getWorld(characterName);
    return {
      info: { 
        ...characterData,
        status
      },
      kills,
      characters,
    };
  }

  async getWorld(characterName) {
   let onlines = await axios.get(`${TIBIA_DATA_API_URL}world/lobera.json`);
   const isOnline = onlines.find((online)=>{
    return online.name == characterName;
   })
   console.log('getWork',isOnline)
    return isOnline? 'online': 'offline'; 
  }

  async getGuildInformation(guildUrl) {
    const { data: { guild: { members } } } = await axios.get(`${TIBIA_DATA_API_URL}guild/${encodeURIComponent(guildUrl)}.json`);
    const response = [];
    members.forEach(({ characters }) => {
      response.push(...characters);
    });

    return response;
  }
}