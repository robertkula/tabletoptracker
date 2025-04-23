const data = [ 
  { 
    Joe: 859.120540426913,
    Bobby: 1000,
    Tyler: 1140.8794595730872,
    date: '2-3-2024'
  },
  {
    Joe: 849.9780762315426,
    Bobby: 1000,
    Tyler: 1150.0219237684576,
    date: '2-3-2024'
  }
];

if (Array.isArray(data)) {
  const result = data.flatMap(entry => [entry.Joe, entry.Bobby, entry.Tyler]);
  console.log(result);
} else {
  console.log("data is not an array:", typeof data);
}
