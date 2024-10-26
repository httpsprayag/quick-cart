/* eslint-disable no-useless-catch */

const { ERROR_CODE } = require("../../utils/errorCode");

exports.paginationAndSearch = async (req, res, model, match, lookup) => {
  try {
    const requestDataBody = req.body;
    const numberOfRecord = Number(requestDataBody.numberOfRecord) || 50;
    const page = Number(requestDataBody.page) || 1;
    const searchField = requestDataBody.searchField;
    let searchValue = requestDataBody.searchValue;
    const sort = { $sort: {} };
    sort.$sort.uniqueId = parseInt(1);
    let count = {
      $group: { _id: null, count: { $sum: 1 }, data: { $push: "$data" } },
    };
    const skip = {};
    skip.$skip = page * numberOfRecord - numberOfRecord;
    const limit = {};
    limit.$limit = numberOfRecord;

    const start = page * numberOfRecord - numberOfRecord;
    const end = numberOfRecord;

    const aggregatePipeline = [];

    count = {
      $group: { _id: null, count: { $sum: 1 }, result: { $push: "$$ROOT" } },
    };
    const project1 = {
      $project: { count: 1, data: { $slice: ["$result", start, end] } },
    };

    const match1 = {};

    if (match) {
      match1.$match = match;
    }

    const lookup1 = {};
    if (lookup) {
      lookup1.$lookup = lookup;
    }

    if (Object.keys(match1).length !== 0) aggregatePipeline.push(match1);

    if (Object.keys(lookup1).length !== 0) aggregatePipeline.push(lookup1);

    if (
      searchField !== undefined &&
      searchField !== "" &&
      searchValue !== undefined &&
      searchValue !== ""
    ) {
      searchValue = searchValue.replace(/^\s+|\s+$/g, "");
      searchValue = searchValue.replace(/ +(?= )/g, "");
      const query = {};
      query[searchField] = { $regex: new RegExp(searchValue, "i") };
      const search = { $match: query };
      aggregatePipeline.push(search);
    }

    aggregatePipeline.push(sort, count, project1);
    const data = await model.aggregate(aggregatePipeline);
    if (data.length === 0) throw { errorCode: ERROR_CODE.DATA_NOT_FOUND };
    return {
      responseData: data[0].data,
      count: data[0].count,
    };
  } catch (error) {
    throw error;
  }
};
