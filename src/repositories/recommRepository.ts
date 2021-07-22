import "../setup";
import connection from "../database";

export async function newVideo(name: string, youtubeLink: string){
    await connection.query(`
        INSERT INTO items
        (name, "youtubeLink")
        VALUES ($1,$2)`,
        [name, youtubeLink]
    );
}

export async function repeatedLink(youtubeLink: string):Promise<boolean>{
    const result = await connection.query(`
        SELECT * 
        FROM items
        WHERE "youtubeLink" = $1`,
        [youtubeLink]
    );
    if (result.rowCount !== 0) return true;
    else return false;
}

export async function verifyingId(id: number):Promise<{id:number;name:string;youtubeLink:string;score:number;review:string}> {
    const result = await connection.query(`
        SELECT *
        FROM items
        WHERE id = $1`,
        [id]
    );
    return result.rows[0];
}

export async function assigningScore(id:number,score:number) {
    const result = await connection.query(`
        UPDATE items
        SET score=$1
        WHERE id=$2`,
        [score,id]
    );
}

export async function removeRecommendation(id:number) {
    const result = await connection.query(`
        DELETE
        FROM items
        WHERE id=$1`,
        [id]
    );
}