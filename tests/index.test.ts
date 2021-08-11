
import request from "supertest";
var app=require("../src/index");
import axios from "axios";
describe("GET /wordprocessor", () => {
    //make sure this count the number of words correctly
    test("count words",  () => {

        const data = "hello,how             are!   <>       you?";
         const expected={"result":[["hello",1],["how",1],["are",1],["you",1]]};
        const actual=app.countWords(data);
         expect(actual).toStrictEqual(expected);

    });


});

