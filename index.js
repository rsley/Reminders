const app = require("express")()
const Profile = require("./db/model")

global.logger = console.log
                    
function getFormattedDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  //const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  //const year = today.getFullYear();

  return `${day}`;
}

app.get("/", (rq, rs) => {
  rs.send("v1.0.0 - api ready...")
})

app.get("/delete/:id", async (rq, rs) => {
  const userId = rq.params.id

  let reminder = await Profile.findOne({ where: { id: userId }})

  if(reminder) await Profile.destroy({ where: { id: userId }})

  rs.status(200).send("ok")
})

app.get("/new/:id", async (rq, rs) => {
  rq.params.id = rq.params.id.replace("<@", "")
  rq.params.id = rq.params.id.replace(">", "")
  const userId = rq.params.id
  const price = rq.headers.price
  const date = getFormattedDate()

  let reminder = await Profile.findOne({ where: { id: userId } })

  if (!reminder) {
    reminder = await Profile.create({
      id: userId,
      price,
      date
    })
  } else {
    reminder.price = price
    reminder.date = date
    await reminder.save()
  }

  rs.send(reminder)
})
app.get("/getdate/", async (rq, rs) => {
  rs.send(getFormattedDate())
})
app.get("/dated/:date", async (rq, rs) => {
  const date = rq.params.date
  const reminders = await Profile.findAll({ where: { date } })

  rs.send(reminders)
})

app.listen(process.env.PORT, () => {
  console.log("App is serving and ready.")
})
