export const fetchPlanets = async (url) => {
  try {
      const response = await fetch(url);
      const res = await response.json();
      localStorage.setItem("swapi-planets", JSON.stringify(res));
      return res;
  } catch (error) {
    console.log(error);
  }
};
