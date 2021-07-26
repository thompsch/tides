# XML-CSV

## Install

```javascript
npm install xml-csv --save
```

## Usage

### Input XML

```xml
<?xml version="1.0" encoding="utf-8"?>
<ArrayOfRoute>
  <Route>
    <Iso2>AD</Iso2>
    <ZipFrom>60000</ZipFrom>
    <ZipTo>60005</ZipTo>
    <Agent>6000</Agent>
    <Ruta></Ruta>
    <Color>VERDE</Color>
    <AvailableService>1110000</AvailableService>
    <Airport>1110000</Airport>
  </Route>
  <Route>
    <Iso2>AD</Iso2>
    <ZipFrom>60002</ZipFrom>
    <ZipTo>60001</ZipTo>
    <Agent>6000</Agent>
    <Ruta>2A</Ruta>
    <Color>VERDE</Color>
    <AvailableService>1110000</AvailableService>
    <Airport>1110000</Airport>
  </Route>
</ArrayOfRoute>
```

```javascript
const fs = require("fs");
const xmlcsv = require("xml-csv");

xmlcsv({
	source: fs.createReadStream("./sample.xml"),
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
}).pipe(fs.createWriteStream("./sample_1.csv"));
```

### Output CSV

```csv
ISO2,ZIP,AgentCode,Route,Color,AvailableService,GatewayAirport
AD,60000,6000,,VERDE,1110000,1110000
AD,60002,6000,2A,VERDE,1110000,1110000
```

### License

MIT

## Support

[Prabhay Gupta](mailto:guptaprabhay@yahoo.com)

**Free Software, Hell Yeah!**
