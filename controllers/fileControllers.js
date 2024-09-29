const mongoose = require('mongoose');
const User = require('../models/user');
const Folder = require('../models/folder');
const File = require('../models/file');
//const { handleUpload } = require('../cloudinaryService');
const handleUpload = require('../util/cloudinary');

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
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;
    const cldRes = await handleUpload(dataURI);
    console.log(cldRes);

    const { secure_url, format, bytes } = cldRes;
    const { name, parentFolder, owner, sharedwith } = req.body;

    const ownerObjectId = owner ? new mongoose.Types.ObjectId(owner) : undefined;
    const parentFolderObjectId = parentFolder ? new mongoose.Types.ObjectId(parentFolder) : undefined;

    const newFile = new File({
      name,
      fileType: format,
      path: secure_url,
      parentFolder: parentFolderObjectId,
      owner: ownerObjectId,
      size: bytes.toString(),
      sharedWith: sharedwith || []
    });

    await newFile.save();
    
    res.status(201).json({ message: 'File created successfully', file: newFile });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//   try {
//     const { name, fileType, path, parentFolder, owner, url, size, sharedwith } = req.body;

//     const ownerObjectId = owner ? mongoose.Types.ObjectId(owner) : undefined;
//     const parentFolderObjectId = parentFolder ? mongoose.Types.ObjectId(parentFolder) : undefined;

//     const file = new File({ 
//       name, 
//       fileType, 
//       path, 
//       parentFolder: parentFolderObjectId, 
//       owner: ownerObjectId, 
//       url, 
//       size,
//       sharedWith: sharedwith || []
//     });
//     await file.save();
//     res.status(201).json({ message: 'File created successfully', file });
//   } catch (error) {
//     console.log(error.message);
//     res.status(400).json({ error: error.message });
//   }


const updateFileById = async (req, res) => {
  try {
    const { name, fileType, path, parentFolder, owner, url, size } = req.body;
    const ownerObjectId = owner ? mongoose.Types.ObjectId(owner) : undefined;
    const parentFolderObjectId = parentFolder ? mongoose.Types.ObjectId(parentFolder) : undefined;
    
    const file = await File.findByIdAndUpdate(
      req.params.id,
      { 
        name, 
        fileType, 
        path, 
        parentFolder: parentFolderObjectId, 
        owner: ownerObjectId, 
        url, 
        size,
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

const shareFileWithUser = async (req, res) => {
  try {
    const fileId = req.params.fileId;
    const { userId } = req.body;
  
    // Check if the file exists
    const file = await File.findById(fileId);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
  
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    // Ensure the user is not the owner of the file
    if (file.owner.toString() === userId) {
      return res.status(400).json({ message: 'Cannot share a file with the owner' });
    }
  
    // Add the user to the sharedWith array if not already present
    if (!file.sharedWith.includes(userId)) {
      file.sharedWith.push(userId);
      await file.save();
    }
  
    res.status(200).json({ message: 'File shared successfully', file });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSharedFilesForUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find all files shared with the user
    const sharedFiles = await File.find({ sharedWith: userId });

    if (!sharedFiles.length) {
      return res.status(404).json({ message: 'No files shared with this user' });
    }

    res.status(200).json(sharedFiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  shareFileWithUser,
  getFileById,
  createFile,
  updateFileById,
  deleteFileById,
  getSharedFilesForUser,
};
