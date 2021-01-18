const router = require("express").Router();
const serviceRouter = require("./services");
const emailRouter = require("./emails");
const textRouter = require("./texts");
const { ERROR_CODE_404, errorMessage404 } = require("../utils/errors");

router.use("/email", emailRouter);
router.use("/services", serviceRouter);
router.use("/texts", textRouter);

router.use("*", (req, res) => {
  res.status(ERROR_CODE_404).send({ message: errorMessage404 });
});

module.exports = router;
