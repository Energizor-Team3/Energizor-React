export const boardKeyFactory = {
  all: [{ scope: "board" }],
  list: (requestObj) => [{ ...boardKeyFactory.all, ...requestObj }],
  detail: (id) => [{ ...boardKeyFactory.all, id }],
  comment : [{scope :"comment"}],
  commentList : (id) => [{ ...boardKeyFactory.comment, id }],
};
