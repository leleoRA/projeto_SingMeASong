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

export async function verifyList() {
    const emptyList = await recommRepository.verifyList()
    if (emptyList === 0) return true;
}

export async function randomRecomm() {
    let aleatoryRecomm = Math.random();
    let result = [];

    if (aleatoryRecomm > 0.7){
        result = await recommRepository.moreThan10Points()
    } else{
        result = await recommRepository.lessThan10points()
    }

    let recommendationNumber = getRandomIntInclusive(0, result.length-1);
    return result[recommendationNumber];
}

function getRandomIntInclusive(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}