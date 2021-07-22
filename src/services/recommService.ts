import * as recommRepository from "../repositories/recommRepository";

export async function validData(name: string, youtubeLink: string) {
    if (!name || !isYoutubeVideo(youtubeLink)) return false;
    else return true;
}

function isYoutubeVideo(youtubeLink: string) {
    var v = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return (youtubeLink.match(v)) ? true : false;
}

export async function newVideo(name: string, youtubeLink: string){
    const result = await recommRepository.repeatedLink(youtubeLink);
    if (result) return false;
    else {
        await recommRepository.newVideo(name, youtubeLink)
        return true;
    }
}

export async function assigningScore(id: number, review: string) {
    const result = await recommRepository.verifyingId(id);
    if (!result) return false;
    else{
        if (review === "yes"){
            result.score+=1
            await recommRepository.assigningScore(id, result.score);
        } else if (review === "no"){
            result.score-=1
            if (result.score >= -5){
                await recommRepository.assigningScore(id, result.score);
            } else{
                await recommRepository.removeRecommendation(id);
            }
        }
        return true;
    }

    
}