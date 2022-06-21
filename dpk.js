const crypto = require("crypto");

exports.generateHash = (data) => {
  return crypto.createHash("sha3-512").update(data).digest("hex");
}

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  ///if there is no data in event, then TRIVIAL_PARTITION_KEY
  if(!event) return TRIVIAL_PARTITION_KEY;

  let candidate = event.partitionKey

  //if candidate is empty, stringify the whole event payload and generate a hash
  if(!candidate){
    const data = JSON.stringify(event);
    candidate = this.generateHash(data);
  }

  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  if (candidate.length <= MAX_PARTITION_KEY_LENGTH) return candidate;

  return this.generateHash(candidate);
};

