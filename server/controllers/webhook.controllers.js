const webhook = async (req, res, next) => {
  try {
    const secret = process.env.SIGNING_SECRET;
    const rawBody = req.body;
  } catch (error) {
    next(error);
  }
};

export default webhook;
