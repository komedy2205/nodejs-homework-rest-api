const Jimp = require("jimp");
const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const avatarName = `${id}_${originalname}`;
  try {
    const resultUpload = path.join(avatarsDir, avatarName);
    (async function () {
      const image = await Jimp.read(tempUpload);
      image.resize(250, 250);
      image.write(resultUpload);
    })();
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", avatarName);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        avatarURL: `${avatarURL}`,
      },
    });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;
