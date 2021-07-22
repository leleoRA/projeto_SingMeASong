import * as recommRepository from "../repositories/recommRepository";

export async function newMusic(name: string, youtubeLink: string){
    const result = await recommRepository.repeatedLink(youtubeLink);
    if (result) return false;
    else {
        await recommRepository.newMusic(name, youtubeLink)
        return true;
    }
}