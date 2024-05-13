const isProduction = process.env.NODE_ENV === "production";

module.exports = {
    styledComponents: {
        displayName: !isProduction,
        minify: isProduction
    },
};