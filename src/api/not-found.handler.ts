export function notFoundHandler(req, res) {
  return res.status(404).json("Resource not found");
}
