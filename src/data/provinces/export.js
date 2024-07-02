const XLSX = require('xlsx');
const fs = require('fs');
//https://danhmuchanhchinh.gso.gov.vn/
const path = 'Danh sách cấp xã ___12_07_2023.xlsx';

const workbook = XLSX.readFile(path);

const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 'A' });
// remove first item
jsonData.shift();
//
//console.log(jsonData);
let provinces = {};
let locationList = [];
for(i = 0; i< jsonData.length; i++){
  item = jsonData[i];
  if (provinces[item.G] == null){
    provinces[item.G] = {name:item.H, districts:{}};
    locationList.push({code:item.G,name:item.H,parent:'0'});
  }
  if (provinces[item.G].districts[item.E] == null){
    provinces[item.G].districts[item.E] = {name: item.F};
    locationList.push({code:item.E,name:item.F,parent:item.G});
  }
  locationList.push({code:item.A,name:item.B,parent:item.E});
}
console.log(locationList);
fs.writeFileSync('location-data.json',JSON.stringify(locationList));