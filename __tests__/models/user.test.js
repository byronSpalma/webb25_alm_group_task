require("../test-setup");
const { describe, it, expect, beforeEach } = require("vitest");
const User = require("../../src/models/User");

describe("User Model", () => {
  it("should create a user", async () => {
    const user = await User.create({
      username: "testuser",
      email: "test@test.com",
    });

    expect(user).toBeDefined();
    expect(user.username).toBe("testuser");
    expect(user.email).toBe("test@test.com");
  });

  // TODO 1: Tests that email must be unique
  it("should not allow duplicate emails", async () => {
    await User.create({ username: "user1", email: "same@test.com" });

    await expect(
      User.create({ username: "user2", email: "same@test.com" })
    ).rejects.toThrow();
  });

  // TODO 2: Tests that username must be unique
  it("should not allow duplicate usernames", async () => {
    await User.create({ username: "sameuser", email: "first@test.com" });

    await expect(
      User.create({ username: "sameuser", email: "second@test.com" })
    ).rejects.toThrow();
  });

  // TODO 3: Tests that email format is validated
  it("should not allow invalid email format", async () => {
    await expect(
      User.create({ username: "testuser2", email: "not-an-email" })
    ).rejects.toThrow();
  });

  // TODO 4: Tests that profileImage is a valid URL
  it("should accept a valid URL as profileImage", async () => {
    const user = await User.create({
      username: "testuser3",
      email: "img@test.com",
      profileImage: "https://example.com/avatar.jpg",
    });

    expect(user.profileImage).toBe("https://example.com/avatar.jpg");
  });

  it("should not allow invalid URL as profileImage", async () => {
    await expect(
      User.create({
        username: "testuser4",
        email: "img2@test.com",
        profileImage: "not-a-url",
      })
    ).rejects.toThrow();
  });
});

  // TODO: Test that email must be unique
  // TODO: Test that username must be unique
  // TODO: Test that email format is validated
  // TODO: Test that profileImage is a valid URL
