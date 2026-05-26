import "../test-setup.js";
import { describe, it, expect } from "vitest";
const User = require("../../src/models/User");
const Accommodation = require("../../src/models/Accommodation.js");

describe("Accommodation Model", () => {
  const createUser = () =>
    User.create({ username: "testuser", email: "test@test.com" });

  it("should create an accommodation", async () => {
    const user = await createUser();
    const acc = await Accommodation.create({
      address: "Testgatan 1",
      city: "Stockholm",
      country: "Sweden",
      postalCode: "12345",
      rent: 8000,
      rooms: 3,
      userId: user._id,
    });

    expect(acc).toBeDefined();
    expect(acc.city).toBe("Stockholm");
    expect(acc.userId.toString()).toBe(user._id.toString());
  });

  it("should require all fields", async () => {
    await expect(
      Accommodation.create({ city: "Stockholm" })
    ).rejects.toThrow();
  });

  it("should be deleted when the user is deleted", async () => {
    const user = await createUser();
    await Accommodation.create({
      address: "Testgatan 1",
      city: "Stockholm",
      country: "Sweden",
      postalCode: "12345",
      rent: 8000,
      rooms: 3,
      userId: user._id,
    });

    await User.findByIdAndDelete(user._id);

    const remaining = await Accommodation.find({ userId: user._id });
    expect(remaining).toHaveLength(0);
  });
});