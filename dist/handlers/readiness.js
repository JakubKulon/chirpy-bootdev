export const handlerReadiness = (req, res) => {
    res.send("healthy as fk");
    res.contentType("text/plain");
    res.status(200);
};
