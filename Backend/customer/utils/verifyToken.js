import jwt from "jsonwebtoken";
import { createError } from "./error.js";

// export const verifyToken = (req, res, next) => {
//     const token = req.cookies.access_token;
//     if (!token) {
//         return next(createError(401, "You are not authenticated!"));
//     }

//     jwt.verify(token, process.env.jwt, (err, user) => {
//         if (err) return next(createError(403, "Token is not valid!"));
//         req.user = user;
//         //console.log(user);
//         next();
//     })
// }

export const verifyUser = (req, res, next) => {
    // verifyToken(req, res, next)
    //     .then(() => {
    //         if (req.user.id === req.params.id || req.user.isAdmin) {
    //             next();
    //         } else {
    //             if (err) return next(createError(403, "You are not authorized!"));
    //         }
    //     })
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "You are not authenticated!"));
    }

    jwt.verify(token, process.env.jwt, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        console.log(user);
        if (req.user.id ) { //=== req.params.id
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }

    })
}

export const verifyAdmin = (req, res, next) => {
    // verifyToken(req, res, next, () => {
    //     console.log(req.user);
    //     if (req.user.isAdmin) {
    //         next();
    //     } else {
    //         if (err) return next(createError(403, "You are not authorized!"));
    //     }
    // })
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "You are not authenticated!"));
    }

    jwt.verify(token, process.env.jwt, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        console.log(user);
        if (!req.user.isAdmin) {
            return next(createError(403, "You are not a admin"));
        }
        if (req.user.isAdmin) {
            next();
        } else {
            if (err) return next(createError(403, "You are not authorized!"));
        }

    })
}