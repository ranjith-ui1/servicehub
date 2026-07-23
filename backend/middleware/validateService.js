const validateService = (req, res, next) => {
  const { provider, service, city, price, experience, phone } = req.body;

  if (!provider || !service || !city || price === undefined || !experience || !phone) {
    return res.status(400).json({
      success: false,
      message: "Provider, service, city, price, experience and phone are required",
    });
  }

  next();
};

export default validateService;
