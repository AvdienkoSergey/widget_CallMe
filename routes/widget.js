const router = require("express-promise-router")();

const { Widget } = require("../controllers");

const { foo } = require("../middleware/widget");

router.route("/:id").get(Widget.get);
router.route("/").get(foo, Widget.get_all);
router.route("/").post(Widget.create);
router.route("/:id").put(Widget.update);
router.route("/:id").delete(Widget.delete);

module.exports = router;