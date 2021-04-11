import { Request, Response } from "express";
import Axios from "axios";
import * as functions from "firebase-functions";

type RequestParams = {
  eventType: string;
};

type RequestBody = {
  event_type: string;
};

type ResponseBody = {};

type RequestQuery = {};

export const staticGithubActionBuild = async (
  req: Request<RequestParams, ResponseBody, RequestBody, RequestQuery>,
  res: Response
) => {
  let eventType: string = req.body.event_type;
  let githubDispatchToken: string =
    functions.config().githubActions.token || "";
  let responseMessage: string;
  let repositoryOwner: string = "";
  let repositoryName: string = "";

  if (!req.body.event_type) {
    eventType = "default";

    responseMessage =
      "Authorization was successful, but you no event type was provided, only the testing build will be triggered";
  } else {
    eventType = req.body.event_type;
    responseMessage = "Build process started successfully";
  }

  Axios.post(
    `https://api.github/repos/${repositoryOwner}/${repositoryName}/dispatches`,
    { event_type: eventType },
    {
      headers: {
        Authorization: `Bearer ${githubDispatchToken}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3+json",
      },
    }
  )
    .then((result) => {
      console.log(result.data);

      res.json({ message: responseMessage }).status(200);
    })
    .catch((error) => {
      res.json({ error: error, message: error.message }).status(500);
    });
};

// (req as any).name
