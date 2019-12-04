const request = require("request-promise");
require("dotenv").config();

const darkskyKey = process.env.DARKSKY_SECRET_KEY;

module.exports = async (latitude, longitude) => {
  const darkskyBaseUrl = `https://api.darksky.net/forecast/${darkskyKey}/${latitude},${longitude}`;

  // request(darkskyBaseUrl, function(error, response, body) {
  //   if (error) throw new Error(error);

  //   if (response.statusCode === 401) {
  //     const newError = {};
  //     newError.message = "not key";
  //     throw new Error(newError);
  //   }
  //   console.log("body :", body);
  //   resBody.body = body;
  // });

  // return resBody;
  try {
    const body = await request(darkskyBaseUrl, { json: true });
    return body;
  } catch (error) {
    throw new Error(error);
  }
};
