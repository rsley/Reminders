const app = require("express")()
const Profile = require("./db/model")

global.logger = console.log

app.get("/", (rq, rs) => {
  rs.send("v1.0.0 - api ready...")
})

function generateDNI() {
  const min = 10000;
    const max = 99999;
    return Math.floor(Math.random() * (max - min + 1) + min);
}

app.get("/delete/:id", async (rq, rs) => {
  const userId = rq.params.id

  let reminder = await Profile.findOne({ where: { id: userId }})

  if(reminder) await Profile.destroy({ where: { id: userId }})

  rs.status(200).send("ok")
})

app.get("/new/:id", async (rq, rs) => {
  rq.params.id = rq.params.id.replace("<@", "")
  rq.params.id = rq.params.id.replace(">", "")
  rq.params.id = rq.params.id.replace("!", "")
  const userId = rq.params.id
  const date = rq.headers.date
  const name = rq.headers.name
  const username = rq.headers.username

  if(!userId || !date || !name || !username) return rs.status(502).send("No values.")

  let reminder = await Profile.findOne({ where: { id: userId } })
  let dni = generateDNI()

  if (!reminder) {
    reminder = await Profile.create({
      id: userId,
      date,
      username,
      dni,
      name
    })
  } else {
    reminder.date = date
    reminder.username = username
    await reminder.save()
  }

  rs.send(reminder)
})
app.get("/:id", async (rq, rs) => {
  rq.params.id = rq.params.id.replace("<@", "")
  rq.params.id = rq.params.id.replace(">", "")
  rq.params.id = rq.params.id.replace("!", "")
  const reminders = await Profile.findOne({ where: { id: rq.params.id } })
  if(!reminders) rs.status(404)

  rs.send(reminders)
})

app.listen(process.env.PORT, () => {
  console.log("App is serving and ready.")
})
