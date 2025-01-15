export function transformStateData(data: any) {
  // Transform the data to the format required by the chart
  try {
    if (!data) {
      console.error("Data is undefined or in an incorrect format");
      return [];
    }
    return data.data.map((item: any) => ({
      state: item.State,
      population: item.Population,
    }));
  } catch (error) {
    console.error(error);
  }
}

export function transformUSData(data: any) {
  // Transform the data to the format required by the chart
  const usPopulationList = data.data;
  try {
    if (!data) {
      console.error("Data is undefined or in an incorrect format");
      return [];
    }
    const returnData = usPopulationList.map((item: any) => ({
      year: item.Year,
      population: item.Population,
    }));
    // Sort the data by year in ascending order
    returnData.sort((a, b) => a.year - b.year);

    console.log("Transformed US Data", returnData);
    return returnData;
  } catch (error) {
    console.error(error);
  }
}
