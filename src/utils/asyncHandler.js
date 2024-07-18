// higher order function
const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    res.status(error.code || 5000).json({
      succuss: false,
      message: error.message,
    });
  }
};
export { asyncHandler };
