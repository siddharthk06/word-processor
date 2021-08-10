

import * as count from "index";

test("should return count",  () => {

  const response =  count.countWords("hi");
  expect(response.message).toBe("{\"result\":[[\"hi\",1]]}");
});

