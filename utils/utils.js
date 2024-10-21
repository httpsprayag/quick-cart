/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const myUtils = require("./utils");
const utils = require("./utils");
const { ERROR_CODE } = require("./errorCode");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");
const fs = require("fs");
const { IMAGE_EXTENSION, FOLDER_NAME } = require("./constant");
const path = require("path");

exports.middleware = function (lang, response, isSuccess) {
  try {
    const langCode = lang;
    let json;
    if (langCode !== undefined) {
      json = require(`../languages/${langCode}.json`);
    } else {
      json = require("../languages/en.json");
    }
    let responseString = "";
    if (isSuccess) {
      json[langCode] !== undefined
        ? (responseString = json[langCode].successCode[response])
        : (responseString = json.en.successCode[response]);
    } else {
      json[langCode] !== undefined
        ? (responseString = json[langCode].errorCode[response])
        : (responseString = json.en.errorCode[response]);
    }
    return {
      description: responseString,
      code: response,
    };
  } catch (error) {
    console.log(error);
  }
};

exports.checkRequestParams = function (requestDataBody, paramsArray) {
  let missingParam = "";
  let isMissing = false;
  let invalidParam = "";
  let isInvalidParam = false;
  paramsArray.forEach(function (param) {
    if (requestDataBody[param.name] === undefined) {
      missingParam = param.name;
      isMissing = true;
    } else {
      if (param.type && typeof requestDataBody[param.name] !== param.type) {
        isInvalidParam = true;
        invalidParam = param.name;
      }
    }
  });
  if (isMissing)
    throw { errorDescription: missingParam + " " + "parameter missing" };
  else if (isInvalidParam)
    throw { errorDescription: invalidParam + " " + "parameter invalid" };
};

exports.catchBlockErrors = function (lang, error, res) {
  if (error.errorCode || error.errorDescription) {
    const response = error.errorCode
      ? { success: false, ...myUtils.middleware(lang, error.errorCode, false) }
      : {
          success: false,
          description: error.errorDescription,
          errorCode: error.code,
        };
    return res.json(response);
  }
  return res.json({
    success: false,
    ...myUtils.middleware(
      (lang = "en"),
      ERROR_CODE.SOMETHING_WENT_WRONG,
      false
    ),
  });
};

exports.successResponse = (
  lang = "en",
  statusCode,
  data = {},
  res,
  isDynamicResponse = false
) => {
  const response = {
    success: true,
    responseData: data,
    ...(isDynamicResponse
      ? { description: statusCode.statusCode }
      : utils.middleware(lang, statusCode, true)),
  };

  return res.json(response);
};

exports.encryptPassword = function (password) {
  const crypto = require("crypto");
  try {
    return crypto.createHash("md5").update(password).digest("hex");
  } catch (error) {
    console.error(error);
  }
};

exports.generateAuthToken = function (
  email,
  adminType = true,
  rememberMe = false
) {
  const payload = { subject: email, adminType };
  const expiresIn = rememberMe ? "7d" : "1h";
  const options = { expiresIn };
  const token = jwt.sign(payload, process.env.PROJECT_NAME, options);
  return token;
};

exports.generateOtp = function () {
  try {
    const OTP = Math.floor(100000 + Math.random() * 900000);
    return OTP;
  } catch (error) {
    console.log(error);
  }
};

exports.mailNotification = async function (to, sub, text, html) {
  try {
    // const settingDetails = await findSettings();

    const email = process.env.NODEMAILER_EMAIL;
    const password = process.env.NODEMAILER_PASSWORD;

    if (email !== "" && password !== "") {
      if (process.env.DOMAIN === "gmail") {
        smtpConfiguration = {
          service: process.env.DOMAIN,
          auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD,
          },
        };
      }
      const transporter = nodeMailer.createTransport(smtpConfiguration);

      const mailOptions = {
        from: email, // sender address
        to, // list of receivers
        subject: sub, // Subject line
        text, //, /// plaintext body
        html,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.log(error);
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getImageFolderName = function (id) {
  switch (id) {
    case FOLDER_NAME.CATEGORIES:
      return "/uploads/categories/";
    case FOLDER_NAME.SUB_CATEGORIES:
      return "/uploads/sub-categories/";
    case FOLDER_NAME.PAGES:
      return "/uploads/pages/";
    case FOLDER_NAME.SECTIONS:
      return "/uploads/sections/";
    default:
      break;
  }
};

exports.storeImageToFolder = async function (
  localImagePath,
  imageExtension,
  id
) {
  const fileNewPath =
    myUtils.getImageFolderName(id) + Date.now() + imageExtension;
  try {
    const data = await fs.promises.readFile(localImagePath, "binary");
    await fs.promises.writeFile(
      path.join(__dirname, `../..${fileNewPath}`),
      data,
      "binary"
    );
    if (fs.existsSync(localImagePath)) {
      await fs.promises.unlink(localImagePath);
    }
    return fileNewPath;
  } catch (error) {
    throw error;
  }
};

exports.getFileType = (mimetype) => {
  switch (mimetype) {
    case "image/jpeg":
    case "image/jpg":
      return IMAGE_EXTENSION.JPG;
    case "image/png":
      return IMAGE_EXTENSION.JPG;
    case "image/webp":
      return IMAGE_EXTENSION.JPG;
    case "application/pdf":
      return IMAGE_EXTENSION.PDF;
    case "application/msword":
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return IMAGE_EXTENSION.DOC;
    case "application/json":
      return IMAGE_EXTENSION.JSON;
    case "text/plain":
      return IMAGE_EXTENSION.TEXT;
    case "image/svg+xml":
      return "svg";
    case "video/mp4":
      return IMAGE_EXTENSION.video;
    default:
      return null;
  }
};

exports.parseDate = (dateString) => {
  const [day, month, year] = dateString.split("/");
  return new Date(`${year}-${month}-${day}T00:00:00Z`); // Convert to ISO format
};

exports.getLastMonthDateRange = () => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth(), 0); // Last day of last month
  return { start: startOfMonth, end: endOfMonth };
};

exports.getTodayDateRange = () => {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const currentTime = now; // Current moment
  return { start: startOfDay, end: currentTime };
};
