const playerList = ['Joe', 'Bobby', 'Tyler'];
const ELO = {
  "Bobby": 1100
};

playerList.forEach(player => {
  if (!(player in ELO)) {
    ELO[player] = 1000;
  }
});

console.log(ELO);