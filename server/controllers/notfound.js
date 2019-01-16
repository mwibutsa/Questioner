const pageNotFound = (req, res) => {
  res.json({
    status: 404,
    error: 'Page not found!',
  });
};
export default pageNotFound;
