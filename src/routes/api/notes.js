import { Router } from "express";

import * as noteService from "../../services/notes";
import logger from "../../helpers/logger";
import auth from "../../helpers/auth";

const router = Router();
router.use(auth.authenticate("local", { session: false }));

router.get("/", async (req, res) => {
  const notes = await noteService.getAll();
  await res.send(notes);
});

router.post("/", async (req, res) => {
  const { note: newNote } = req.body;
  if (newNote) {
    const note = await noteService.add(newNote);
    if (note.error) {
      res.status(400);
    }
    res.send(note);
  } else {
    res.status(400).send({ msg: "Bad Status" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const note = await noteService.getById(id);

  if (note) {
    res.send(note);
  } else {
    logger.warn(`Note ${id} doesnt exist`);
    res.status(404).send({});
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { note: updatedNote } = req.body;
  const response = await noteService.update(id, updatedNote);
  if (response.error) {
    res.status(400);
  }
  res.send(response);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  res.send(await noteService.remove(id));
});

export default router;
