const apiService = {
  async getData() {
    try {
      const response = await fetch(process.env.VUE_APP_API_URL);
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
      throw new Error();
    }
  },

  async postData(data) {
    try {
      const response = await fetch(process.env.VUE_APP_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error posting data");
      }

      // Handle the response as needed
      const responseData = await response.json();
      console.log("Data posted successfully:", responseData);
      return responseData;
    } catch (err) {
      console.error("Error posting data:", err);
      throw err;
    }
  },
};

export default apiService;
