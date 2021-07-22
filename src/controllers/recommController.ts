import { Request, Response } from 'express';

import * as recommService from "../services/recommService";

export async function newVideo(req: Request, res: Response) {
    try{
        const { name, youtubeLink } = req.body;

        if (!name || !isYoutubeVideo(youtubeLink)) return res.sendStatus(400);

        const result = await recommService.newMusic(name, youtubeLink);
        if (!result) return res.sendStatus(409);

        res.sendStatus(201);

    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
}

function isYoutubeVideo(youtubeLink: string) {
  var v = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  return (youtubeLink.match(v)) ? true : false;
}