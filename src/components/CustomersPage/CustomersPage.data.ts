export type StatusType = "active" | "inactive" | "disabled"

function createData(
  firstName: string,
  surName: string,
  emailAddress: string,
  country: string,
  region: string,
  status: StatusType
) {
  return { firstName, surName, emailAddress, country, region, status }
}

export const rows = [
  createData(
    "John",
    "Snow",
    "johnsnow@gmail.com",
    "Great Britain",
    "Knowsley",
    "active"
  ),
  createData(
    "Fred",
    "Bobinsky",
    "fredbobinsk@gmail.com",
    "Great Britain",
    "Knowsley",
    "active"
  ),
  createData(
    "Phoebe",
    "Buffay",
    "phoebe@yahoo.com",
    "USA",
    "Los Angeles",
    "active"
  ),
  createData(
    "Monica",
    "Geller",
    "m.geller@gmail.com",
    "USA",
    "New York",
    "inactive"
  ),
  createData(
    "Rachel",
    "Green",
    "rachel123@gmail.com",
    "USA",
    "New York",
    "active"
  ),
  createData("Ross", "Geller", "ross@gmail.com", "USA", "New York", "inactive"),
  createData(
    "Elizabeth",
    "Brown",
    "beth.brown@gmail.com",
    "Great Britain",
    "Leyland",
    "disabled"
  ),
  createData("Joey", "Tribbiani", "joeyt@yahoo.com", "Italy", "Rome", "active"),
  createData(
    "Coraline",
    "Jones",
    "coraline@gmail.com",
    "Great Britain",
    "Manchester",
    "active"
  ),
]

export type CustomerData = typeof rows[0]
