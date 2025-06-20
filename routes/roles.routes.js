const express = require('express');
const router = express.Router();
const roleController = require("../controllers/roles.controller");

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: API for managing user roles
 */

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: Role created successfully
 *       400:
 *         description: Validation error
 */
router.post("/", roleController.create);

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: List of roles
 *       500:
 *         description: Server error
 */
router.get("/", roleController.getAll);

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Get a role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Role ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Role found
 *       404:
 *         description: Role not found
 */
router.get("/:id", roleController.getById);

/**
 * @swagger
 * /api/roles/{id}:
 *   put:
 *     summary: Update a role
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Role ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: Role updated
 *       400:
 *         description: Update failed
 */
router.put("/:id", roleController.update);

/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     summary: Delete a role
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Role ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Role deleted
 *       404:
 *         description: Role not found
 */
router.delete("/:id", roleController.remove);

module.exports = router;
