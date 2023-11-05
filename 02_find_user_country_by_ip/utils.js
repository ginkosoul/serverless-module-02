import fs from "fs/promises";

const TEST_IP = [
  "127.0.0.1",
  "45.232.208.143",
  "185.182.120.34",
  "45.177.176.23",
  "5.44.80.51",
  "91.149.48.22",
  "83.229.33.3",
  "203.24.108.65",
  "23.43.23.15",
  "89.28.176.5",
  "77.83.248.211",
  "31.134.118.90",
  "172.71.142.63",
  "10.214.88.8",
];

export const createInstance = async () => {
  const convertIpToNumber = (text) =>
    text
      .split(".")
      .reduce(
        (acc, val, index) => Math.pow(256, 3 - index) * Number(val) + acc,
        0
      );

  const getData = (arr, val) => {
    if (arr.length === 1) return arr[0];
    const middle = Math.floor(arr.length / 2);
    if (arr[middle][0] > val) {
      return getData(arr.slice(0, middle), val);
    } else {
      return getData(arr.slice(middle), val);
    }
  };

  const file = await fs.readFile("IP2LOCATION-LITE-DB1.CSV", "utf-8");

  const data = file.split("\n").map((line) => {
    const arr = JSON.parse("[" + line + "]");
    return [Number(arr[0]), Number(arr[1]), arr[2], arr[3]];
  });

  return (ipAddress) => {
    const ipNumber = convertIpToNumber(ipAddress);
    if (Number.isNaN(ipNumber)) {
      return `Unknown IP - ${ipAddress}`;
    } else {
      return `${ipAddress} - ${getData(data, ipNumber)[3]}`;
    }
  };
};

// console.log("Type of data: ", parsedData.slice(0, 10));
// TEST_IP.forEach((line) => {
//   console.log(line.split(",")[0].trim());
//   console.log(convertIpToNumber(line));
//   console.log(getData(parsedData, convertIpToNumber(line)));
// });
// console.log("Time:", Date.now() - start);
