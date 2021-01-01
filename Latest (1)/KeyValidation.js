const keyExists = (reqId, result) => {
    return  result.hasOwnProperty(reqId);
}

module.exports = keyExists;