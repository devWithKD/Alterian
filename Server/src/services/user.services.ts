import axios from "axios";
import { User } from "../model/user.model";

// Export a function to get the Google Token
export const getTokenGoogle = async (code: any) => {
  // Get the Google Token API URL from the environment variable
  const googleTokenAPI = process.env.GOOGLE_TOKEN_API as string;
  // Create an options object for the request
  const options = {
    method: "POST",
    url: googleTokenAPI,
    headers: {
      Accept: "*/*",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      code: code,
      redirect_uri: process.env.GOOGLE_REDIRECT_URL,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      grant_type: "authorization_code",
    },
  };

  try {
    // Make the request and return the response
    const res = await axios.request(options);
    return res.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

// Create an interface for the Google User Result
interface GoogleUserResult {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

// Export a function to get the Google User
export const getGoogleUser = async ({
  id_token,
  access_token,
}: {
  id_token: string;
  access_token: string;
}): Promise<GoogleUserResult> => {
  try {
    // Make a request to the Google API to get the user info
    const res = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: { Authorization: `Bearer ${id_token}` },
      }
    );
    // Return the response data as the Google User Result
    return res.data as GoogleUserResult;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

// Export a function to get the Github Token
export const getTokenGithub = async (code: any) => {
  // Create an options object for the request
  const options = {
    method: "POST",
    url: process.env.GITHUB_TOKEN_API,
    data: {
      code: code,
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      redirect_uri: process.env.GITHUB_REDIRECT_URL,
    },
  };
  try {
    // Make the request and return the response
    const res = await axios.request(options);
    // Get the raw data from the response
    const rawData = res.data as string;
    // Find the access token in the raw data
    const token =
      rawData
        .split("&")
        .find((pair) => pair.startsWith("access_token="))
        ?.split("=")[1] || "";
    // Return the access token
    return token;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

// Create an interface for the Github User Result
interface GithubUserResult {
  id: string;
  email: string;
  name: string;
  avatar: string;
  verified_email: boolean;
}

// Create an interface for the Github Email
interface githubEmail {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string;
}

// Export a function to get the Github User
export const getGithubUser = async (
  token: string
): Promise<GithubUserResult> => {
  try {
    // Make a request to the Github API to get the user's emails
    const email = await axios.get("https://api.github.com/user/emails", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Make a request to the Github API to get the user info
    const user = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Find the primary email in the user's emails
    const userEmail: githubEmail = email.data.find(
      (_email: githubEmail) => _email.primary === true
    );

    // Create the user data object
    const userData: GithubUserResult = {
      id: user.data.id,
      email: userEmail.email,
      name: user.data.name,
      avatar: user.data.avatar_url,
      verified_email: userEmail.verified,
    };

    // Return the user data
    return userData;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

// Export a function to find or create a user
export const findOneOrCreateUser = async (userObj: any, provider: string) => {
  // Find the user in the database
  const user = await User.findOne({ email: userObj.email });
  // If the user is found, return the user
  if (user) return user;
  // If the user is not found, create a new user
  if (provider == "google") {
    const newUser = new User({
      email: userObj.email,
      firstName: userObj.given_name,
      lastName: userObj.family_name,
      provider: provider,
      authID: userObj.id,
    });

    // Return the new user
    return await newUser.save();
  } else {
    // Get the user's name from the name string
    const userName = userObj.name.split(" ");
    const newUser = new User({
      email: userObj.email,
      firstName: userName[0],
      lastName: userName[1],
      provider: provider,
      authID: userObj.id,
    });
    // Return the new user
    return await newUser.save()
  }
};