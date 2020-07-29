function sizer(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i += 1) {
    total += arr[i].quantity;
  }
  return total;
}

export default sizer;
