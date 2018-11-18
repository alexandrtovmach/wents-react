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


export const lorem = 'Etiam quis turpis a urna vestibulum tincidunt eget at nunc. Sed commodo luctus tellus, sit amet gravida orci. Mauris nec congue urna, ac lacinia augue. Nunc elit neque, mollis sit amet erat at, vestibulum mattis sem. Sed luctus tincidunt lacus in euismod. Praesent pellentesque cursus enim eget cursus. Quisque nibh odio, accumsan sed faucibus vitae, laoreet quis lorem. Fusce aliquet iaculis rutrum. Donec sed rhoncus elit, vitae consectetur urna. Pellentesque eu sem tristique, porta ex eu, imperdiet lectus. Aliquam et ligula hendrerit tellus facilisis porttitor. Aenean ac nisi egestas, viverra nulla eu, rhoncus massa. Sed eu tristique libero, vel venenatis neque. Integer volutpat blandit magna in hendrerit. Morbi a orci a turpis pretium tristique malesuada eget eros.';
