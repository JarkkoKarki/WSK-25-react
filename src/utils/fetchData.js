const fetchData = async (url, options = {}) => {
  const response = await fetch(url, options);
  const json = await response.json();
  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error(json.message || `Error ${response.status} occurred`);
  }
  return json;
};

export {fetchData};
