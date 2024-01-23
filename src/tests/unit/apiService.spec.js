import apiService from "@services/apiService";

// Mock the global fetch function
global.fetch = jest.fn();

describe("apiService", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("getData should fetch and return data successfully", async () => {
    const mockResponse = { some: "data" };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const data = await apiService.getData();
    expect(data).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(process.env.VUE_APP_API_URL);
  });

  it("getData should throw an error on fetch failure", async () => {
    fetch.mockRejectedValueOnce(new Error("Fetch failed"));

    await expect(apiService.getData()).rejects.toThrow("Fetch failed");
  });

  it("postData should post data successfully", async () => {
    const mockResponse = { result: "success" };
    const postData = { some: "data" };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const response = await apiService.postData(postData);
    expect(response).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(process.env.VUE_APP_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });
  });

  it("postData should throw an error on response not ok", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      statusText: "Server error",
    });

    await expect(apiService.postData({})).rejects.toThrow("Error posting data");
  });
});
