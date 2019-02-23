const pageNotFound = (req, res) => res.status(404).json({ status: 404, error: 'Page not found!' });

const serverError = (error, req, res, next) => res.status(500).json({ status: 500, error: ` == Internal server error: ${error} ==` });

export { pageNotFound, serverError };
