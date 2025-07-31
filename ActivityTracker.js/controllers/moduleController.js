const { Module } = require('../models');

exports.createModule = async (req, res) => {
  try {
    const module = await Module.create(req.body);
    res.status(201).json(module);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getModules = async (req, res) => {
  try {
    const modules = await Module.findAll();
    res.status(200).json(modules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getModuleById = async (req, res) => {
  try {
    const module = await Module.findByPk(req.params.id);
    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }
    res.status(200).json(module);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateModule = async (req, res) => {
  try {
    const [updated] = await Module.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) {
      return res.status(404).json({ error: 'Module not found' });
    }
    res.status(200).json({ message: 'Module updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteModule = async (req, res) => {
  try {
    const deleted = await Module.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) {
      return res.status(404).json({ error: 'Module not found' });
    }
    res.status(200).json({ message: 'Module deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};