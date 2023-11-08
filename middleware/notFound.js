const notFoundMiddleware = (req, res) => {
    res.status(404).send('You are looking for the resource which we don\'t have!');
}

export default notFoundMiddleware;