import * as recommRepository from "../repositories/recommRepository";

export async function validData(name: string, youtubeLink: string) {
    if (!name || !isYoutubeVideo(youtubeLink)) return false;
    else return true;
}

export async function newVideo(name: string, youtubeLink: string){
    const result = await recommRepository.repeatedLink(youtubeLink);
    if (result) return false;
    else {
        await recommRepository.newVideo(name, youtubeLink)
        return true;
    }
}

function isYoutubeVideo(youtubeLink: string) {
    var v = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return (youtubeLink.match(v)) ? true : false;
  }