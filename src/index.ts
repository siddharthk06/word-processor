import express from 'express';
import axios from 'axios';

import cors from 'cors';
// convert html to word
import  createTextVersion from "textversionjs";

const app = express();
const AxiosInstance = axios.create(); // Create a new Axios Instance
var textVersion:string;


var result=new Map<string,number>();
var history:string[]=[];



const linkStyle=function(href:string, linkText:string){
                    return linkText;
                    };
const imageStyle=function(href:string, linkText:string){
                    return linkText;
                    };
// Ignore link and image link for word count
var styleConfig:Object={linkStyle:linkStyle,imageStyle:imageStyle};

//Allow cross-Origin Resource Sharing
app.use(cors({
  origin: 'http://localhost:3000'
}));

//api to get word count for given url
app.get("/wordprocessor", async(req,res)=>{
var text: any;
result.clear();
const url:any=req.query.url;
if(url&&typeof url== "string"){
history.push(url);
text=await getNumberOfOccurenceOfEveryWordFromUrl(url)
}
res.send(text);
});


//api to get history of url
app.get("/wordprocessor/history", async(req,res)=>{
var uniqueHistory = history.filter((v, i, a:string[]) => a.indexOf(v) === i);
res.send(uniqueHistory);
});

app.listen(4000, () => {
  console.log(`server running on port 4000`);
});



//function to count number of occurence
 function countWords(s:string){
    s = s.replace(/(^\s*)|(\s*$)/gi,"");//exclude  start and end white-space
    s = s.replace(/[ ]{2,}/gi," ");//2 or more space to 1
    s = s.replace(/\n /,"\n"); // exclude newline with a start spacing
    s=s.replace(/[^\w'-\s]/gi," ");
    s = s.replace(/[-]{2,}/gi," ");//2 or more space to 1
    s = s.replace(/\n/g, " ");
    s = s.replace(/\s+/g, ' ');
    s = s.toLowerCase(); //To ignore case sensitive
    var totalWords:string[]= s.split(' ').filter(function(str:string){return str!=""});
    for(let word of totalWords){

    let count:number | undefined=result.has(word)?result.get(word):0;
        if(count|| count==0)
        result.set(word,++count)
        }
     const sortedResult = new Map([...result.entries()].sort((a, b) => b[1] - a[1]));

    return {"result":[...sortedResult]};
}



 async function getNumberOfOccurenceOfEveryWordFromUrl(url:string){
return AxiosInstance.get(url).then(
     response => {
                //html to text
             textVersion = createTextVersion(response.data,styleConfig);
              return countWords(textVersion);
                }
               )
               .catch(console.error);

  }


// for test
 module.exports = app;
 module.exports.countWords=countWords;