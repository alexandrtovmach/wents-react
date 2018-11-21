export const dateToInputFormat = (date) => {
  date = date || 0;
  return new Date(date).toISOString().slice(0, 10);
}

export const generateHashWithDate = () => {
  return `${Date.now()}-${Math.random().toString().slice(-5)}`
};

export const extractFromProvidersData = (user, key) => {
  return user && user.providerData && user.providerData.reduce((prev, el) => {
    return prev || el[key]
  }, null);
};

export const debounce = (fn, time) => {
  let timeout;

  return function() {
    const functionCall = () => fn.apply(this, arguments);
    
    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  }
}

export const filterPostsByParameters = (posts, p) => {
  console.log(p);
  return Object.keys(posts).reduce((prev, el) => {
    const post = posts[el];
    if (
      (post.title.toLowerCase().includes(p.title.toLowerCase()) || p.title === undefined) &&
      (post.unlimitedDate === p.unlimitedDate || p.unlimitedDate === undefined) &&
      ((p.startDate && p.endDate <= post.endDate) || p.startDate === undefined) &&
      ((p.endDate && p.startDate >= post.startDate) || p.startDate === undefined) &&
      // (post.startDate >= p.startDate || p.startDate === undefined) &&
      // ((post.endDate <= p.endDate || post.unlimitedDate) || p.endDate === undefined) &&
      (post.apartmentsType === p.apartmentsType || p.apartmentsType === undefined) &&
      (post.rentType === p.rentType || p.rentType === undefined) &&
      ((p.benefitList && p.benefitList.some(benefit => post.benefitList.includes(benefit))) || p.benefitList === undefined || !p.benefitList.length)
    ) {
      prev[el] = post;
    }
    return prev;
  }, {})
}


export const lorem = 'Etiam quis turpis a urna vestibulum tincidunt eget at nunc. Sed commodo luctus tellus, sit amet gravida orci. Mauris nec congue urna, ac lacinia augue. Nunc elit neque, mollis sit amet erat at, vestibulum mattis sem. Sed luctus tincidunt lacus in euismod. Praesent pellentesque cursus enim eget cursus. Quisque nibh odio, accumsan sed faucibus vitae, laoreet quis lorem. Fusce aliquet iaculis rutrum. Donec sed rhoncus elit, vitae consectetur urna. Pellentesque eu sem tristique, porta ex eu, imperdiet lectus. Aliquam et ligula hendrerit tellus facilisis porttitor. Aenean ac nisi egestas, viverra nulla eu, rhoncus massa. Sed eu tristique libero, vel venenatis neque. Integer volutpat blandit magna in hendrerit. Morbi a orci a turpis pretium tristique malesuada eget eros.';
