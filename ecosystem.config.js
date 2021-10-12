module.exports = {
  apps: [
    {
      name: "CCSC Recruitments: Django Server",
      script: "chmod +x ./run.sh && . ./run.sh",
    },
    {
      name: "CCSC Recruitments: React Server",
      script: "chmod +x ./run_client.sh && . ./run_client.sh"
    }
  ]
};
