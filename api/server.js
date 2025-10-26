const jsonServer = require("json-server");
const fs = require("fs");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Function to update counts in db.json
const updateCounts = async () => {
  const dbFilePath = path.join(__dirname, "db.json");
  const db = JSON.parse(fs.readFileSync(dbFilePath, "utf-8"));

  const uncompleted = db.tasks.filter(
    (task) => !task.completed && !task.deleted
  ).length;
  const completed = db.tasks.filter(
    (task) => task.completed && !task.deleted
  ).length;
  const deleted = db.tasks.filter((task) => task.deleted).length;

  db.counts = { uncompleted, completed, deleted };

  await router.db.setState(db);
  await fs.writeFileSync(dbFilePath, JSON.stringify(db, null, 2), "utf-8");
};

// Custom middleware for paginated tasks endpoint
server.get("/tasks", (req, res) => {
  const db = JSON.parse(
    fs.readFileSync(path.join(__dirname, "db.json"), "utf-8")
  );
  let tasks = db.tasks;

  const page = parseInt(req.query._page) || 1;
  const limit = parseInt(req.query._limit) || 10;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const totalTasks = tasks.filter((task) => !task.deleted).length;

  const filteredTasks = tasks
    .filter((task) => !task.deleted)
    .slice(startIndex, endIndex);

  const response = {
    data: filteredTasks,
    totalPages: Math.ceil(totalTasks / limit),
  };

  res.jsonp(response);
});

// Middleware to update counts on task changes
server.use(async (req, res, next) => {
  // Convert DELETE requests to PATCH requests that set deleted=true
  if (req.method === "DELETE" && req.url.startsWith("/tasks/")) {
    req.method = "PATCH";
    req.body = { deleted: true };
  }

  // Listen for when the response is sent
  res.on("finish", async () => {
    if (
      ["POST", "PUT", "PATCH", "DELETE"].includes(req.method) &&
      req.url.startsWith("/tasks")
    ) {
      await updateCounts();
    }
  });

  next();
});

server.use(router);

updateCounts();

server.listen(3001, () => {
  console.log("JSON Server is running on port 3001");
});
