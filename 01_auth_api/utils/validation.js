const user = {
  email: {
    type: "string",
    min: 0,
    max: 120,
    regex: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    message: `Invalid Email`,
  },
  password: {
    type: "string",
    min: 3,
    max: 50,
    regex: /\w+/,
    message: `Password must be len min 3, max 50, min 1 letter`,
  },
};

export const validate = (scheme) => (data) => {
  try {
    if (typeof data !== "object") {
      throw new Error("Invalid body data");
    }
    const entries = Object.entries(data);

    entries.forEach(([key, value]) => {
      if (!scheme[key]) {
        throw new Error("Invalid field " + key);
      }
      const isValid =
        typeof value === scheme[key]["type"] &&
        value.length >= scheme[key]["min"] &&
        value.length <= scheme[key]["max"] &&
        value.match(scheme[key]["regex"]);

      if (!isValid) {
        throw new Error(scheme[key]["message"]);
      }
    });

    if (Object.keys(scheme).length !== entries.length)
      throw new Error("Missing required fields");
    return {};
  } catch (error) {
    return { error };
  }
};

export const validateUser = validate(user);
