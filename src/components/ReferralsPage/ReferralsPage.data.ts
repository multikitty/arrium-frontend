function createData(
  referralCode: string,
  region: string,
  station: string,
  assignedTo: string,
  dateGenerated: string,
  active: "Yes" | "No"
) {
  return { referralCode, region, station, assignedTo, dateGenerated, active }
}

const referralsData = [
  createData(
    "123456",
    "London - Bow",
    "Canning Town",
    "John Snow",
    "Oct 10, 2021",
    "Yes"
  ),
  createData(
    "789012",
    "London - Bow",
    "Canning Town",
    "Mr.Bobinsky",
    "Oct 10, 2021",
    "Yes"
  ),
  createData(
    "098765",
    "London - Bow",
    "Dartford",
    "Phoebe Buffay",
    "Oct 10, 2021",
    "Yes"
  ),
  createData(
    "432109",
    "London - Bow",
    "Canning Town",
    "Monica Geller",
    "Oct 10, 2021",
    "No"
  ),
  createData(
    "321654",
    "London - Bow",
    "Dartford",
    "Rachel Green",
    "Oct 10, 2021",
    "Yes"
  ),
  createData(
    "876321",
    "Manchester",
    "Trafford Centre",
    "Ross Geller",
    "Oct 10, 2021",
    "Yes"
  ),
  createData(
    "341970",
    "Manchester",
    "Trafford Centre",
    "Elizabeth Brown",
    "Oct 10, 2021",
    "Yes"
  ),
  createData(
    "527943",
    "Manchester",
    "Trafford Centre",
    "Coraline Jones",
    "Oct 10, 2021",
    "No"
  ),
]

export default referralsData
