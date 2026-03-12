import ratelimit from "../config/upstash.js"

const rateLimiter = async (req, res, next) => {

    try {
        const ip =req.headers["x-forwarded-for"]?.split(",")[0] ||req.socket.remoteAddress ||"anonymous";
        /* this will get the ip address of the user, if the user is behind a proxy then it will get the ip address from the x-forwarded-for header, 
        if not then it will get the ip address from the socket, if both are not available then it will return anonymous */
        /*
        many a times there are multiple proxy sergvers on which frontend is deployed(vercel, cloudflare etc) with x-forwarded-for we can get ip of original user, 
        without it we will get ip of proxy server which is not useful for rate limiting.
        */
        const {success} = await ratelimit.limit(ip) 
        // this will limit the requests based on the ip address of the user, it will fail if uattacker uses vpn to change ip addresses
        if (!success) {
            return res.status(429).json({ message: "Too many requests, please try again later." })
        }
        next()
        }
            catch (error) {
        console.error("Error in rate limiter middleware:", error)
        res.status(500).json({ message: "Internal server error" })
    }





}

export default rateLimiter