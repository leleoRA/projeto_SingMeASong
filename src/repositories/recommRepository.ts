import connection from "../database";

export async function newMusic(name: string, youtubeLink: string){
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