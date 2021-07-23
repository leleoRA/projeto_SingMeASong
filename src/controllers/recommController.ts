import { Request, Response } from "express";

import * as recommService from "../services/recommService";

export async function newVideo(req: Request, res: Response) {
    try{
        const { name, youtubeLink } = req.body;

        const validData = await recommService.validData(name, youtubeLink)
        if (!validData) return res.sendStatus(400);

        const repeatedLink = await recommService.newVideo(name, youtubeLink);
        if (!repeatedLink) return res.sendStatus(409);

        res.sendStatus(201);

    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
}

export async function like(req: Request, res: Response) {
    try{
        const id = Number(req.params.id);

        const result = await recommService.assigningScore(id, "yes");
        if (!result) return res.sendStatus(404);

        res.sendStatus(200);

    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
}

export async function dislike(req: Request, res: Response) {
    try{
        const id = Number(req.params.id);

        const result = await recommService.assigningScore(id, "no");
        if (!result) return res.sendStatus(404);

        res.sendStatus(200);

    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
}

export async function random(req: Request, res: Response) {
    try{
        const verifyList = await recommService.verifyList();
        if (verifyList) return res.sendStatus(404);
        
        const recommendation = await recommService.randomRecomm();
        res.send(recommendation);

    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
}

export async function mostLiked(req: Request, res: Response) {
    try{
        const amount = Number(req.params.amount);

        const result = await recommService.mostLiked(amount);
        if (!result) return res.sendStatus(404);
        else res.send(result);

    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
}