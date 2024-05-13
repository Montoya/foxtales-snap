import type { OnHomePageHandler } from '@metamask/snaps-sdk';
import { panel, heading, text, divider } from '@metamask/snaps-sdk';
import { InternalError } from '@metamask/snaps-sdk';

async function getLatestFoxTales() { 
  return (await fetch("https://foxtales.vercel.app/api/tales")).json(); 
}

export const onHomePage: OnHomePageHandler = async () => {
  return getLatestFoxTales().then(rows => {
    // format data! 
    try { 
      const feed = rows.map((row:any) => { 
        const tale = JSON.parse(row.tale); 
        return [
          divider(),
          text(`**${tale.title}**`), 
          text(`by ${tale.author.display_name} [ ](https://warpcast.com/~/compose?text=Play%20this%20FoxTale!&embeds[]=https://foxtales.vercel.app/api/${row.id})`),
        ]; 
      }); 
      
      return { content:  panel([
        heading("Latest FoxTales"), 
        ...feed.flat(),
        divider(),
        text("[Make Your Own](https://foxtales.vercel.app)"),
      ]) };
    }
    catch (error) { 
      console.log(error); 
      throw new InternalError(); 
    }
  }); 
};
