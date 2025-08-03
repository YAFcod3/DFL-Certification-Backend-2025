
export const EnvConfiguration = () => ({
    mongodb: process.env.MONGO_URI,
    port: process.env.PORT || 8000,
});
