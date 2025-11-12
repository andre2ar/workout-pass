import {app} from "@/app.js";
import {config} from "@/config/index.js";

const start = async () => {
    try {
        console.log(`HTTP server starting on port ${config.PORT}`)
        await app.listen({
            host: '0.0.0.0',
            port: config.PORT
        })
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}
start()
