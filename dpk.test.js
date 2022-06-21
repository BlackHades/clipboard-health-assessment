const { deterministicPartitionKey, generateHash } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  describe("When partitionKey is not passed", () => {
    it("Returns value of length 128 when length is <= 256" , () => {
      const event = {
        foo: "bar"
      };
      const trivialKey = deterministicPartitionKey(event);
      expect(trivialKey.length).toBe(128);
    })

    it("Returns value of length 128 value when partitionKey.length is > 256" , () => {
      const event = {
        foo: "EEEkU9Ehp6L5pPpfyRRAM0Egie5TprPWXCdztrvoIla096LZV4AtmWq4VhYdNv4smCOsr3MfNuZiHh9Kd4QtfpItmydbe0EqPZSt2yBMGF69JjoXejagIAXoeyfQuILsGzJlFAGEeBXNwDJWG3VGCj37FiopXpJ2ZeEPKCKkLddIEvuEsXNllWGClfPcdADmYrXxiXc49GpK3QmsM9mhNmkiYtn7784qpXNoDBPZJnWwZ87E6QkycYZCC7MowZHsVC"
      };
      const trivialKey = deterministicPartitionKey(event);
      expect(trivialKey.length).toBe(128);
    })
  });

  describe("When partitionkey is passed", () => {
    it("Is Number: Returns same value when length is <= 256" , () => {
      const event = {
        partitionKey: 20
      };
      const trivialKey = deterministicPartitionKey(event);
      expect(trivialKey).toBe(event.partitionKey.toString());
    })
    it("Returns same value when length is <= 256" , () => {
      const event = {
        partitionKey: Math.random().toString()
      };
      const trivialKey = deterministicPartitionKey(event);
      expect(trivialKey).toBe(event.partitionKey);
    })

    it("Returns value of length 128 value when partitionKey.length is > 256" , () => {
      const event = {
        partitionKey: "EEEkU9Ehp6L5pPpfyRRAM0Egie5TprPWXCdztrvoIla096LZV4AtmWq4VhYdNv4smCOsr3MfNuZiHh9Kd4QtfpItmydbe0EqPZSt2yBMGF69JjoXejagIAXoeyfQuILsGzJlFAGEeBXNwDJWG3VGCj37FiopXpJ2ZeEPKCKkLddIEvuEsXNllWGClfPcdADmYrXxiXc49GpK3QmsM9mhNmkiYtn7784qpXNoDBPZJnWwZ87E6QkycYZCC7MowZHsVC"
      };
      const trivialKey = deterministicPartitionKey(event);
      expect(trivialKey.length).toBe(128);
    })
  });
});
describe("generateHash", () => {
  it("Should hash correctly", () => {
    const data = "EEEkU9Ehp6L5pPpfyRRAM0Egie5TprPWXCdztrvoIla096LZV4AtmWq4VhYdNv4smCOsr3MfNuZiHh9Kd4QtfpItmydbe0EqPZSt2yBMGF69JjoXejagIAXoeyfQuILsGzJlFAGEeBXNwDJWG3VGCj37FiopXpJ2ZeEPKCKkLddIEvuEsXNllWGClfPcdADmYrXxiXc49GpK3QmsM9mhNmkiYtn7784qpXNoDBPZJnWwZ87E6QkycYZCC7MowZHsVC"
    const testHashResult = crypto.createHash("sha3-512").update(data).digest("hex");
    const hashedData = generateHash(data);

    expect(hashedData).toBe(testHashResult);
  });
});
