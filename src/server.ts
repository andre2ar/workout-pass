import {app} from "@/app.js";
import {env} from "@/env/index.js";

const start = async () => {
    try {
        console.log(`HTTP server starting on port ${env.PORT}`)
        await app.listen({
            host: '0.0.0.0',
            port: env.PORT
        })
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}
start()
