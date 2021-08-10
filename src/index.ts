import express from 'express';
import axios from 'axios';

import cors from 'cors';
import  createTextVersion from "textversionjs";

const app = express();
const AxiosInstance = axios.create(); // Create a new Axios Instance
var textVersion:string;


var result=new Map<string,number>();
var history:string[]=[];
const style=function(href:string, linkText:string){
                    return linkText + " " + "(" + href + ")";
                    };
var styleConfig:Object={linkStyle:style};




app.use(cors({
  origin: 'http://localhost:3000'
}));

app.get("/wordprocessor", async(req,res)=>{
var text: any;
result.clear();
const url:any=req.query.url;
if(url&&typeof url== "string"){
history.push(url);
text=await getNumberOfOccurenceOfEveryWordFromUrl(url);
}
res.send(text);
});

app.get("/wordprocessor/history", async(req,res)=>{
var uniqueHistory = history.filter((v, i, a:string[]) => a.indexOf(v) === i);
res.send(uniqueHistory);
});

app.listen(4000, () => {
    console.log(countWords("Tell the 'audience,what' you're go-ing---- to say. Say it. Then tell them what you've said."));

  console.log(`server running on port 4000`);
});

export function countWords(s:string){

    s = s.replace(/(^\s*)|(\s*$)/gi,"");//exclude  start and end white-space
    s = s.replace(/[ ]{2,}/gi," ");//2 or more space to 1
    s = s.replace(/\n /,"\n"); // exclude newline with a start spacing
    //s = s.replace(/[.=,#*+!--";_:?^${}()|[\]\\]/g, ""); //exclude special characters
     s=s.replace(/[^\w'-\s]/gi," ");
     s = s.replace(/[-]{2,}/gi," ");//2 or more space to 1
    s = s.toLowerCase(); //To ignore case sensitive
    var totalWords:string[]= s.split(' ').filter(function(str:string){return str!="";});
    for(let word of totalWords){

    let count:number | undefined=result.has(word)?result.get(word):0;
        if(count|| count==0)
        result.set(word,++count)
        }



    return {"result":[...result]};
}

async function getNumberOfOccurenceOfEveryWordFromUrl(url:string){
return AxiosInstance.get(url)
  .then(
    response => {
       textVersion = createTextVersion(response.data,styleConfig);
       return countWords(textVersion);
    }
  )
  .catch(console.error);
  }