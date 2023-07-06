
import mockAxios from "jest-mock-axios";

import { API_URL, fetchUserData } from "./components/api-routes";

describe("fetchUserData", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  describe("when API call is successful", () => {
    it("should return user data", async () => {
      // given
      const users = { id: 1, name: "John" }
      mockAxios.get.mockResolvedValueOnce(users);

      // when
      const result = await fetchUserData();

      // then
      expect(mockAxios.get).toHaveBeenCalledWith(`${API_URL}`);
      expect(result).toEqual(users);
    });
  });

  describe("when API call fails", () => {
    it("should return empty user data", async () => {
      // given
      const message = "Network Error";
      mockAxios.get.mockRejectedValueOnce(new Error(message));

      // when
      const result = await fetchUserData();

      // then
      expect(mockAxios.get).toHaveBeenCalledWith(`${API_URL}`);
      expect(result).toEqual([]);
    });
  });
});