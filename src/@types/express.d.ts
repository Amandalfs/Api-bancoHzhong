import express from "express"

declare global {
    declare namespace Express {
        export interface Request {
            user: id,
            
        }
    }
}