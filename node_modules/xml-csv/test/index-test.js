'use strict';

const fs = require('fs');
const should = require('should');
const xmlcsv = require('../src/index');


describe('src/index', () => {
  it('Should process the file successfully', done => {
    const response = xmlcsv({
      source: fs.createReadStream("./test/data/sample.xml"),
      rootXMLElement: "Route",
      headerMap: [
        ["Iso2", "ISO2", "string"],
        ["ZipFrom", "ZIP", "string"],
        ["Agent", "AgentCode", "string"],
        ["Ruta", "Route", "string"],
        ["Color", "Color", "string"],
        ["AvailableService", "AvailableService", "string"],
        ["Airport", "GatewayAirport", "string"]
      ]
    }).pipe(require("fs").createWriteStream("./test/data/sample.csv"));

    response.on('close', res => {
      should(res).be.undefined();
      done();
    })
  });
});