function finder(arr, item) {
  let listId = -1;
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i].id === item.id) {
      listId = i;
    }
  }
  return listId;
}

export default finder;
