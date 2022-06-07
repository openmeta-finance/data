const axios = require('axios');
axios.defaults.timeout = 60000;
//axios
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./constractTypeList.json')
const db = low(adapter)
//
const url = 'https://farm.openmeta.name/nftAirdrop?chain_id=56&page=1&pageSize=20&sortBy=createdTime&sortDirection=DESC&queryType=started'

async function getairdorpType() {
  const { data } = await axios.get(url)
  const airdrop = data.result;
  const saveData = db.get(`data`).value()
  airdrop.forEach(val => {
    if(val?.seriesContractAddress) {
      const addr = String(val?.seriesContractAddress).toLowerCase();
      if(!saveData[addr]) {
        db.set(`data.${addr}`, 3).write()
      }
    }
  })
}

getairdorpType()