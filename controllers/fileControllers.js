const File = require('../models/file');
const mongoose = require('mongoose');



const getFileById = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
    res.status(200).json(file);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const createFile = async (req, res) => {
  try {
    const { name, fileType, path, parentFolder, owner, url, size } = req.body;

    const ownerObjectId = mongoose.Types.ObjectId(owner);
    const parentFolderObjectId = mongoose.Types.ObjectId(parentFolder);

    const file = new File({ 
      name, 
      fileType, 
      path, 
      parentFolder:parentFolderObjectId, 
      owner: ownerObjectId, 
      url, 
      size 
    });
    await file.save();
    res.status(201).json({ message: 'File created successfully', file });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};


const updateFileById = async (req, res) => {
    try {
      const { name, fileType, path, parentFolder, owner, url, size } = req.body;
      const ownerObjectId = owner ? mongoose.Types.ObjectId(owner) : undefined;
      
      const file = await File.findByIdAndUpdate(
        req.params.id,
        { 
          name, 
          fileType, 
          path, 
          parentFolder, 
          owner: ownerObjectId, 
          url, 
          size 
        },
        { new: true }
      );
      
      if (!file) {
        return res.status(404).json({ message: 'File not found' });
      }
      res.status(200).json({ message: 'File updated successfully', file });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const deleteFileById = async (req, res) => {
    try {
      const file = await File.findByIdAndDelete(req.params.id);
      if (!file) {
        return res.status(404).json({ message: 'File not found' });
      }
      res.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


exports.getFileById = getFileById;
exports.createFile = createFile;