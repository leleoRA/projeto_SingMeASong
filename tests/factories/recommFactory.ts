import connection from "../../src/database";

export async function insertVideo() {
    await connection.query(`
        INSERT 
        INTO items 
        (name,"youtubeLink",score) 
        VALUES ('Name', 'https://www.youtube.com/watch?v=EbvtGsrk-7c', 2)`
      );
      await connection.query(`
        INSERT 
        INTO items 
        (name,"youtubeLink",score) 
        VALUES ('Name2', 'https://www.youtube.com/watch?v=JhXagtxvDKY', 200)`
      );
  }